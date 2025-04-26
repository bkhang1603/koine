'use client'

import { use, useMemo } from 'react'
import { useGetProductListAdminQuery } from '@/queries/useProduct'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, BarChart, Star, PackageX } from 'lucide-react'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { MoreOptions } from '@/components/private/common/more-options'
import { Breadcrumb } from '@/components/private/common/breadcrumb'

function AdminProduct(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()

  const currentPageSize = Number(searchParams.page_size) || 10
  const currentPageIndex = Number(searchParams.page_index) || 1
  const currentKeyword = (searchParams.keyword as string) || ''

  const { data: responseData, isLoading } = useGetProductListAdminQuery({
    page_index: currentPageIndex,
    page_size: currentPageSize,
    keyword: currentKeyword
  })

  const products = responseData?.payload.data.products || []
  const pagination = responseData?.payload.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const statistics = responseData?.payload.data.statistics || {
    totalProducts: 0,
    totalProductCategories: 0,
    totalOutOfStockProducts: 0,
    totalProductReviews: 0
  }
  const message = responseData?.payload.message || ''

  // Cấu hình cột cho bảng
  const headerColumn = [
    { id: 1, name: 'Tên sản phẩm' },
    { id: 2, name: 'Ngày tạo' },
    { id: 3, name: 'Giá' },
    { id: 4, name: 'Giảm giá' },
    { id: 5, name: 'Tồn kho' },
    { id: 6, name: 'Đánh giá' },
    { id: 7, name: '' }
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
        render: (product: any) => <span>{product.discount}%</span>
      },
      {
        id: 5,
        render: (product: any) => <span>{product.stockQuantity}</span>
      },
      {
        id: 6,
        render: (product: any) => (
          <div className='flex items-center gap-1'>
            <span>{product.averageRating}</span>
            <span className='text-xs text-muted-foreground'>({product.totalRating})</span>
          </div>
        )
      },
      {
        id: 7,
        render: (product: any) => (
          <MoreOptions
            itemType='product'
            item={{
              id: product.id,
              title: product.name,
              status: 'Hoạt động',
              slug: product.slug
            }}
            onView={() => router.push(`${configRoute.manager.product}/${product.id}`)}
            onManageComments={() => router.push(`${configRoute.manager.product}/${product.id}/comment`)}
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
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {isLoading ? (
          // Stats Cards Skeleton
          [...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <Skeleton className='h-5 w-[120px]' />
                <Skeleton className='h-5 w-5 rounded-full' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-9 w-[80px] mb-2' />
                <Skeleton className='h-4 w-[160px]' />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Tổng sản phẩm</CardTitle>
                <Package className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.totalProducts}</div>
                <p className='text-xs text-muted-foreground'>Sản phẩm trong hệ thống</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Sản phẩm hết hàng</CardTitle>
                <PackageX className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.totalOutOfStockProducts}</div>
                <p className='text-xs text-muted-foreground'>Sản phẩm cần nhập thêm</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Danh mục</CardTitle>
                <BarChart className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.totalProductCategories}</div>
                <p className='text-xs text-muted-foreground'>Danh mục sản phẩm</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Đánh giá</CardTitle>
                <Star className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.totalProductReviews}</div>
                <p className='text-xs text-muted-foreground'>Đánh giá sản phẩm</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.manager.product}
        loading={isLoading}
        showSearch={true}
        searchParamName='keyword'
        searchPlaceholder='Tìm kiếm sản phẩm...'
      />
    </div>
  )
}

export default AdminProduct
