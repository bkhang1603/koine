'use client'

import { use, useEffect, useMemo } from 'react'
import { useGetAdminOrdersQuery } from '@/queries/useOrder'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpDown, DollarSign, Package, GraduationCap } from 'lucide-react'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter, usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { MoreOptions } from '@/components/private/common/more-options'
import { Skeleton } from '@/components/ui/skeleton'

function SupportOrder(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()
  const pathname = usePathname()

  const currentStatus = (searchParams.status as string) || 'ALL'
  const currentPageSize = Number(searchParams.page_size) || 10
  const currentPageIndex = Number(searchParams.page_index) || 1

  const updateSearchParams = (newParams: { status?: string; page_size?: number; page_index?: number }) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)

    if (newParams.status !== undefined) {
      if (newParams.status === 'ALL') {
        params.delete('status')
      } else {
        params.set('status', newParams.status)
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

  const handleStatusChange = (value: string) => {
    updateSearchParams({ status: value, page_index: 1 })
  }

  const getApiStatus = (uiStatus: string) => {
    return uiStatus === 'ALL' ? '' : uiStatus
  }

  const {
    data: responseData,
    isLoading,
    error
  } = useGetAdminOrdersQuery(currentPageSize, currentPageIndex, getApiStatus(currentStatus))

  useEffect(() => {
    if (responseData) {
      console.log('Dữ liệu đơn hàng từ admin:', responseData)
    }
    if (error) {
      console.error('Lỗi khi tải đơn hàng:', error)
    }
  }, [responseData, error])

  const orders = responseData?.payload.data.orders || []
  const statistics = responseData?.payload.data.statistics || {
    totalOrders: 0,
    totalCompletedAmount: 0,
    processingOrdersCount: 0,
    deliveryOrdersCount: 0
  }
  const pagination = responseData?.payload.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const message = responseData?.payload.message || ''

  // Cấu hình màu sắc và nhãn cho trạng thái
  const orderStatusConfig = {
    PROCESSING: { label: 'Đang xử lý', variant: 'default' },
    DELIVERING: { label: 'Đang giao', variant: 'primary' },
    COMPLETED: { label: 'Hoàn thành', variant: 'secondary' },
    CANCELLED: { label: 'Đã hủy', variant: 'destructive' }
  } as const

  // Cấu hình phương thức thanh toán
  const paymentMethodConfig = {
    COD: { label: 'Thanh toán khi nhận hàng', icon: DollarSign },
    BANKING: { label: 'Chuyển khoản', icon: DollarSign }
  } as const

  // Cấu hình cột cho bảng
  const headerColumn = [
    { id: 1, name: 'Mã đơn hàng' },
    { id: 2, name: 'Thời gian' },
    { id: 3, name: 'Khách hàng' },
    { id: 4, name: 'Sản phẩm' },
    { id: 5, name: 'Khóa học' },
    { id: 6, name: 'Tổng tiền' },
    { id: 7, name: 'Phương thức TT' },
    { id: 8, name: 'Trạng thái' },
    { id: 9, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (order: any) => <span>{order.orderCode}</span>
      },
      {
        id: 2,
        render: (order: any) => {
          const orderDate = new Date(order.orderDate)
          return (
            <div className='space-y-0.5'>
              <div className='text-sm font-medium'>{format(orderDate, 'dd/MM/yyyy', { locale: vi })}</div>
              <div className='text-xs text-muted-foreground'>{format(orderDate, 'HH:mm', { locale: vi })}</div>
            </div>
          )
        }
      },
      {
        id: 3,
        render: (order: any) => (
          <div className='space-y-0.5'>
            <div className='font-medium'>{order.deliveryInfo.name}</div>
            <div className='text-xs text-muted-foreground'>{order.deliveryInfo.phone}</div>
          </div>
        )
      },
      {
        id: 4,
        render: (order: any) => {
          const products = order.orderDetails.filter((item: any) => item.productId !== null)
          return products.length > 0 ? (
            <div className='flex items-center gap-2'>
              <Package className='w-4 h-4 text-muted-foreground' />
              <span className='text-sm'>{products.length}</span>
            </div>
          ) : (
            <span className='text-xs text-muted-foreground'>Không có</span>
          )
        }
      },
      {
        id: 5,
        render: (order: any) => {
          const courses = order.orderDetails.filter((item: any) => item.courseId !== null)
          return courses.length > 0 ? (
            <div className='flex items-center gap-2'>
              <GraduationCap className='w-4 h-4 text-muted-foreground' />
              <span className='text-sm'>{courses.length}</span>
            </div>
          ) : (
            <span className='text-xs text-muted-foreground'>Không có</span>
          )
        }
      },
      {
        id: 6,
        render: (order: any) => (
          <div className='space-y-0.5'>
            <div>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
            </div>
            {order.deliAmount > 0 && (
              <div className='text-xs text-muted-foreground'>
                Phí ship:{' '}
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.deliAmount)}
              </div>
            )}
          </div>
        )
      },
      {
        id: 7,
        render: (order: any) => {
          const method = order.paymentMethod
          const config = paymentMethodConfig[method as keyof typeof paymentMethodConfig] || {
            label: method,
            icon: DollarSign
          }
          const Icon = config.icon

          return (
            <div className='flex items-center gap-1.5'>
              <Icon className='w-4 h-4 text-muted-foreground' />
              <span className='text-sm'>{config.label}</span>
            </div>
          )
        }
      },
      {
        id: 8,
        render: (order: any) => {
          const status = order.status
          const config = orderStatusConfig[status as keyof typeof orderStatusConfig] || {
            label: status,
            variant: 'default'
          }

          return <Badge variant={config.variant as any}>{config.label}</Badge>
        }
      },
      {
        id: 9,
        render: (order: any) => (
          <MoreOptions item={order} itemType='order' onView={() => router.push(`/support/order/${order.id}`)} />
        )
      }
    ],
    [orderStatusConfig, paymentMethodConfig, router]
  )

  const tableData: dataListType = {
    data: orders,
    message,
    pagination
  }

  const totalOrders = statistics.totalOrders
  const totalRevenue = statistics.totalCompletedAmount
  const processingOrders = statistics.processingOrdersCount
  const deliveryOrders = statistics.deliveryOrdersCount

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold'>Quản lý đơn hàng</h1>
        <p className='text-muted-foreground mt-1'>Theo dõi và quản lý tất cả đơn hàng trong hệ thống</p>
      </div>

      {/* Stats Cards với Skeleton */}
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
          // Actual Stats Cards
          <>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Tổng đơn hàng</CardTitle>
                <Package className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{totalOrders}</div>
                <p className='text-xs text-muted-foreground'>Tất cả đơn hàng trong hệ thống</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Doanh thu</CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
                </div>
                <p className='text-xs text-muted-foreground'>Tổng doanh thu từ đơn hàng</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Đơn chờ xử lý</CardTitle>
                <ArrowUpDown className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{processingOrders}</div>
                <p className='text-xs text-muted-foreground'>Đơn hàng cần được xử lý</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Đơn đang giao</CardTitle>
                <Package className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{deliveryOrders}</div>
                <p className='text-xs text-muted-foreground'>Số đơn hàng đang giao</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <Select value={currentStatus} onValueChange={handleStatusChange}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ALL'>Tất cả</SelectItem>
            <SelectItem value='PROCESSING'>Đang xử lý</SelectItem>
            <SelectItem value='DELIVERING'>Đang giao</SelectItem>
            <SelectItem value='COMPLETED'>Hoàn thành</SelectItem>
            <SelectItem value='CANCELLED'>Đã hủy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.support.order}
        loading={isLoading}
      />
    </div>
  )
}

export default SupportOrder
