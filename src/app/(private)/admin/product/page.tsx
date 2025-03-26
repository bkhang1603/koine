'use client'

import { use, useEffect, useMemo } from 'react'
import { useGetProductListAdminQuery } from '@/queries/useProduct'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, DollarSign, Plus } from 'lucide-react'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter, usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { MoreOptions } from '@/components/private/admin/product/more-options'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function AdminProduct(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()
  const pathname = usePathname()

  const currentPageSize = Number(searchParams.page_size) || 5
  const currentPageIndex = Number(searchParams.page_index) || 1
  const currentKeyword = (searchParams.keyword as string) || ''

  const updateSearchParams = (newParams: { page_size?: number; page_index?: number; keyword?: string }) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)

    if (newParams.keyword !== undefined) {
      if (newParams.keyword === '') {
        params.delete('keyword')
      } else {
        params.set('keyword', newParams.keyword)
      }
    }

    if (newParams.page_size !== undefined) {
      params.set('page_size', newParams.page_size.toString())
    }

    if (newParams.page_index !== undefined) {
      params.set('page_index', newParams.page_index.toString())
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const {
    data: responseData,
    isLoading,
    error
  } = useGetProductListAdminQuery({
    page_index: currentPageIndex,
    page_size: currentPageSize,
    keyword: currentKeyword
  })

  useEffect(() => {
    if (responseData) {
      console.log('Dữ liệu sản phẩm từ admin:', responseData)
    }
    if (error) {
      console.error('Lỗi khi tải sản phẩm:', error)
    }
  }, [responseData, error])

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
    { id: 2, name: 'Giá' },
    { id: 3, name: 'Giảm giá' },
    { id: 4, name: 'Tồn kho' },
    { id: 5, name: 'Đánh giá' },
    { id: 6, name: 'Ngày tạo' },
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
        render: (product: any) => (
          <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</div>
        )
      },
      {
        id: 3,
        render: (product: any) => <span>{product.discount}%</span>
      },
      {
        id: 4,
        render: (product: any) => <span>{product.stockQuantity}</span>
      },
      {
        id: 5,
        render: (product: any) => (
          <div className='flex items-center gap-1'>
            <span>{product.averageRating}</span>
            <span className='text-xs text-muted-foreground'>({product.totalRating})</span>
          </div>
        )
      },
      {
        id: 6,
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
        id: 7,
        render: (product: any) => (
          <MoreOptions
            type='product'
            onView={() => router.push(`${configRoute.admin.product}/${product.id}`)}
            productId={product.id}
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

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý sản phẩm</h1>
          <p className='text-muted-foreground mt-1'>Quản lý danh sách sản phẩm trong hệ thống</p>
        </div>
        <Button asChild>
          <Link href={configRoute.admin.productNew} className='flex items-center gap-2'>
            <Plus className='h-4 w-4' />
            Thêm sản phẩm mới
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {isLoading ? (
          // Stats Cards Skeleton
          [...Array(3)].map((_, i) => (
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
                <div className='text-2xl font-bold'>{pagination.totalItem}</div>
                <p className='text-xs text-muted-foreground'>Sản phẩm trong hệ thống</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Tổng doanh thu</CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                    products.reduce((total, product) => total + product.price * product.stockQuantity, 0)
                  )}
                </div>
                <p className='text-xs text-muted-foreground'>Giá trị hàng tồn kho</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Đánh giá trung bình</CardTitle>
                <Package className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {(
                    products.reduce((total, product) => total + product.averageRating, 0) / products.length || 0
                  ).toFixed(1)}
                </div>
                <p className='text-xs text-muted-foreground'>Điểm đánh giá sản phẩm</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Search */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <Input
          placeholder='Tìm kiếm sản phẩm...'
          className='w-full sm:w-[300px]'
          value={currentKeyword}
          onChange={(e) => updateSearchParams({ keyword: e.target.value, page_index: 1 })}
        />
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.admin.product}
        loading={isLoading}
      />
    </div>
  )
}

export default AdminProduct
