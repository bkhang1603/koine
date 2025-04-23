'use client'

import { use, useMemo } from 'react'
import { useGetProductsQuery } from '@/queries/useProduct'
import { Plus, Settings } from 'lucide-react'
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
import { Breadcrumb } from '@/components/private/common/breadcrumb'

function AdminProduct(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()

  const currentPageSize = Number(searchParams.page_size) || 10
  const currentPageIndex = Number(searchParams.page_index) || 1
  const currentKeyword = (searchParams.keyword as string) || ''

  const { data: responseData, isLoading } = useGetProductsQuery({
    page_index: currentPageIndex,
    page_size: currentPageSize,
    search: currentKeyword
  })

  const products = responseData?.payload.data || []
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
    { id: 1, name: 'Tên sản phẩm' },
    { id: 2, name: 'Ngày tạo' },
    { id: 3, name: 'Giá' },
    { id: 4, name: 'Đánh giá' },
    { id: 5, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (product: any) => (
          <div className='flex items-center gap-3 min-w-[300px] max-w-[400px]'>
            <div className='relative h-12 w-12 flex-shrink-0'>
              <Image
                src={product.images[0]?.imageUrl}
                alt={`Hình ảnh sản phẩm ${product.name}`}
                fill
                className='rounded-md object-cover'
                sizes='48px'
                priority={false}
              />
            </div>
            <div className='space-y-0.5 overflow-hidden'>
              <div className='font-medium truncate'>{product.name}</div>
              <div className='text-xs text-muted-foreground line-clamp-1'>{product.description}</div>
            </div>
          </div>
        )
      },
      {
        id: 2,
        render: (product: any) => {
          const createdDate = new Date(product.createdAt)
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
        render: (product: any) => (
          <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</div>
        )
      },
      {
        id: 4,
        render: (product: any) => (
          <div className='flex items-center gap-1'>
            <span>{product.averageRating}</span>
            <span className='text-xs text-muted-foreground'>({product.totalRating})</span>
          </div>
        )
      },
      {
        id: 5,
        render: (product: any) => (
          <MoreOptions
            itemType='product'
            item={{
              id: product.id,
              title: product.name,
              status: 'Hoạt động',
              slug: product.slug
            }}
            onView={() => router.push(`${configRoute.support.product}/${product.id}`)}
            onManageComments={() => router.push(`${configRoute.support.product}/${product.id}/comment`)}
          />
        )
      }
    ],
    [router]
  )

  const tableData: dataListType = {
    data: products,
    message,
    pagination
  }

  const breadcrumbItems = [
    {
      title: 'Sản phẩm'
    }
  ]

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý sản phẩm</h1>
          <p className='text-muted-foreground mt-1'>Quản lý danh sách sản phẩm trong hệ thống</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='outline' asChild>
            <Link href='/salesman/product/categories'>
              <Settings className='w-4 h-4 mr-2' />
              Quản lý danh mục
            </Link>
          </Button>
          <Button asChild>
            <Link href={configRoute.salesman.productNew} className='flex items-center gap-2'>
              <Plus className='h-4 w-4' />
              Thêm sản phẩm mới
            </Link>
          </Button>
        </div>
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.salesman.product}
        loading={isLoading}
        showSearch={true}
        searchParamName='keyword'
        searchPlaceholder='Tìm kiếm sản phẩm...'
      />
    </div>
  )
}

export default AdminProduct
