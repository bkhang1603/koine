'use client'

import { use, useMemo, useCallback } from 'react'
import { useComboListQuery, useComboDeleteMutation } from '@/queries/useCombo'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MoreOptions } from '@/components/private/common/more-options'
import { Plus } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'

function ComboList(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()

  const currentPageSize = Number(searchParams.page_size) || 10
  const currentPageIndex = Number(searchParams.page_index) || 1
  const currentKeyword = (searchParams.keyword as string) || ''

  const { data: responseData, isLoading } = useComboListQuery({
    page_index: currentPageIndex,
    page_size: currentPageSize,
    keyword: currentKeyword
  })

  const deleteComboMutation = useComboDeleteMutation()

  const handleDelete = useCallback(
    async (comboId: string) => {
      try {
        await deleteComboMutation.mutateAsync(comboId)
        toast({
          description: 'Xóa combo thành công'
        })
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    },
    [deleteComboMutation]
  )

  const combos = responseData?.payload.data || []
  const pagination = responseData?.payload.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const message = responseData?.payload.message || ''

  // Cấu hình cột cho bảng
  const headerColumn = [
    { id: 1, name: 'Tên combo' },
    { id: 2, name: 'Ngày tạo' },
    { id: 3, name: 'Giá' },
    { id: 4, name: 'Số khóa học' },
    { id: 5, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (combo: any) => (
          <div className='flex items-center gap-3 min-w-[300px] max-w-[400px]'>
            <div className='relative h-12 w-12 flex-shrink-0'>
              <Image
                src={combo.imageUrl || '/placeholder.png'}
                alt={`Hình ảnh combo ${combo.name}`}
                fill
                className='rounded-md object-cover'
                sizes='48px'
                priority={false}
              />
            </div>
            <div className='space-y-0.5 overflow-hidden'>
              <div className='font-medium truncate'>{combo.name}</div>
              <div className='text-xs text-muted-foreground line-clamp-1'>{combo.description}</div>
            </div>
          </div>
        )
      },
      {
        id: 2,
        render: (combo: any) => {
          const createdDate = new Date(combo.createdAt)
          return (
            <div className='space-y-0.5'>
              <div className='text-sm font-medium'>{format(createdDate, 'dd/MM/yyyy', { locale: vi })}</div>
              <div className='text-xs text-muted-foreground'>{format(createdDate, 'HH:mm', { locale: vi })}</div>
            </div>
          )
        }
      },
      {
        id: 3,
        render: (combo: any) => (
          <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(combo.price)}</div>
        )
      },
      {
        id: 4,
        render: (combo: any) => <span>{combo.courseInfos?.length || 0}</span>
      },
      {
        id: 5,
        render: (combo: any) => (
          <MoreOptions
            itemType='course'
            item={{
              id: combo.id,
              title: combo.name,
              status: combo.status === 'active' ? 'Hoạt động' : 'Không hoạt động',
              slug: combo.slug
            }}
            onView={() => router.push(`${configRoute.salesman.combo}/${combo.id}`)}
            onEdit={() => router.push(`${configRoute.salesman.combo}/${combo.id}/edit`)}
            onDelete={() => handleDelete(combo.id)}
          />
        )
      }
    ],
    [router, handleDelete]
  )

  const tableData: dataListType = {
    data: combos,
    message,
    pagination
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý combo</h1>
          <p className='text-muted-foreground mt-1'>Quản lý danh sách combo trong hệ thống</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button asChild>
            <Link href={configRoute.salesman.comboNew} className='flex items-center gap-2'>
              <Plus className='h-4 w-4' />
              Thêm combo mới
            </Link>
          </Button>
        </div>
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.salesman.combo}
        loading={isLoading}
        showSearch={true}
        searchParamName='keyword'
        searchPlaceholder='Tìm kiếm combo...'
      />
    </div>
  )
}

export default ComboList
