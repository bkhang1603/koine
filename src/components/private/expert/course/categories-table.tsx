import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { TableCustom, dataListType } from '@/components/table-custom'
import { MoreOptions } from '@/components/private/common/more-options'

interface CategoriesTableProps {
  data: Array<{
    id: string
    name: string
    description: string | null
    createdAt: string
    updatedAt: string
  }>
  pagination: {
    pageSize: number
    totalItem: number
    currentPage: number
    totalPage: number
    maxPageSize: number
  }
  isLoading: boolean
}

export function CategoriesTable({ data, pagination, isLoading }: CategoriesTableProps) {
  // Column configuration for the table
  const headerColumn = [
    { id: 1, name: 'Tên danh mục' },
    { id: 2, name: 'Mô tả' },
    { id: 3, name: 'Ngày tạo' },
    { id: 4, name: 'Ngày cập nhật' },
    { id: 5, name: '' }
  ]

  const bodyColumn = [
    {
      id: 1,
      render: (category: any) => <div className='font-medium'>{category.name}</div>
    },
    {
      id: 2,
      render: (category: any) => (
        <div className='text-muted-foreground text-sm'>
          <div className='truncate max-w-[400px]' title={category.description || 'Không có mô tả'}>
            {category.description || 'Không có mô tả'}
          </div>
        </div>
      )
    },
    {
      id: 3,
      render: (category: any) => (
        <div className='min-w-[120px]'>
          <div className='text-sm'>{format(new Date(category.createdAt), 'dd/MM/yyyy', { locale: vi })}</div>
          <div className='text-xs text-muted-foreground'>
            {format(new Date(category.createdAt), 'HH:mm', { locale: vi })}
          </div>
        </div>
      )
    },
    {
      id: 4,
      render: (category: any) => (
        <div className='min-w-[120px]'>
          <div className='text-sm'>{format(new Date(category.updatedAt), 'dd/MM/yyyy', { locale: vi })}</div>
          <div className='text-xs text-muted-foreground'>
            {format(new Date(category.updatedAt), 'HH:mm', { locale: vi })}
          </div>
        </div>
      )
    },
    {
      id: 5,
      render: (category: any) => (
        <div className='flex justify-end'>
          <MoreOptions
            item={{
              id: category.id,
              title: category.name,
              status: 'VISIBLE',
              slug: category.name.toLowerCase().replace(/\s+/g, '-')
            }}
            itemType='category'
          />
        </div>
      )
    }
  ]

  const tableData: dataListType = {
    data,
    message: '',
    pagination
  }

  return (
    <TableCustom
      data={tableData}
      headerColumn={headerColumn}
      bodyColumn={bodyColumn}
      loading={isLoading}
      href='/expert/course/categories'
      showSearch={true}
      searchParamName='keyword'
      searchPlaceholder='Tìm kiếm danh mục...'
    />
  )
}
