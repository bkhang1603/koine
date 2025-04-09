'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Package,
  BookOpen,
  Calendar,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  PackageX,
  FilterX,
  ShoppingBasket,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCcw,
  Banknote,
  Trash2
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useGetAccountOrders } from '@/queries/useAccount'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Pagination } from '@/components/pagination'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { OrderStatus, OrderStatusValues } from '@/constants/type'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Define a custom type for our extended status options
type OrderStatusWithAll = (typeof OrderStatusValues)[number] | 'ALL'

// Cập nhật statusColorMap và statusTextMap để bao gồm tất cả trạng thái từ OrderStatus
const statusConfig: Record<OrderStatusWithAll, { color: string; text: string; icon: React.ReactNode }> = {
  [OrderStatus.PENDING]: {
    color: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
    text: 'Chờ xác nhận',
    icon: <Clock className='h-4 w-4 mr-1.5' />
  },
  [OrderStatus.PROCESSING]: {
    color: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    text: 'Đang xử lý',
    icon: <Package className='h-4 w-4 mr-1.5' />
  },
  [OrderStatus.DELIVERING]: {
    color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    text: 'Đang giao hàng',
    icon: <Truck className='h-4 w-4 mr-1.5' />
  },
  [OrderStatus.DELIVERED]: {
    color: 'bg-teal-100 text-teal-800 hover:bg-teal-200',
    text: 'Đã giao hàng',
    icon: <Truck className='h-4 w-4 mr-1.5' />
  },
  [OrderStatus.COMPLETED]: {
    color: 'bg-green-100 text-green-800 hover:bg-green-200',
    text: 'Hoàn thành',
    icon: <CheckCircle className='h-4 w-4 mr-1.5' />
  },
  [OrderStatus.CANCELLED]: {
    color: 'bg-red-100 text-red-800 hover:bg-red-200',
    text: 'Đã hủy',
    icon: <Trash2 className='h-4 w-4 mr-1.5' />
  },
  [OrderStatus.FAILED_PAYMENT]: {
    color: 'bg-rose-100 text-rose-800 hover:bg-rose-200',
    text: 'Thanh toán thất bại',
    icon: <AlertTriangle className='h-4 w-4 mr-1.5' />
  },
  [OrderStatus.REFUND_REQUEST]: {
    color: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
    text: 'Yêu cầu hoàn tiền',
    icon: <Banknote className='h-4 w-4 mr-1.5' />
  },
  [OrderStatus.REFUNDING]: {
    color: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    text: 'Đang hoàn tiền',
    icon: <RefreshCcw className='h-4 w-4 mr-1.5' />
  },
  [OrderStatus.REFUNDED]: {
    color: 'bg-lime-100 text-lime-800 hover:bg-lime-200',
    text: 'Đã hoàn tiền',
    icon: <Banknote className='h-4 w-4 mr-1.5' />
  },
  [OrderStatus.FAILED]: {
    color: 'bg-red-100 text-red-800 hover:bg-red-200',
    text: 'Thất bại',
    icon: <XCircle className='h-4 w-4 mr-1.5' />
  },
  ALL: {
    color: 'bg-lime-100 text-lime-800 hover:bg-lime-200',
    text: 'Tất cả đơn hàng',
    icon: <ShoppingBag className='h-4 w-4 mr-1.5' />
  }
}

// Nhóm các trạng thái để UI gọn gàng hơn
const statusGroups = [
  {
    name: 'Chính',
    statuses: [
      'ALL' as const, // Add "ALL" option at the beginning
      OrderStatus.PENDING,
      OrderStatus.PROCESSING,
      OrderStatus.DELIVERING
    ]
  },
  {
    name: 'Khác',
    statuses: [
      OrderStatus.COMPLETED,
      OrderStatus.DELIVERED,
      OrderStatus.FAILED_PAYMENT,
      OrderStatus.REFUND_REQUEST,
      OrderStatus.REFUNDING,
      OrderStatus.REFUNDED,
      OrderStatus.FAILED,
      OrderStatus.CANCELLED
    ]
  }
]

export default function OrderPage() {
  const [status, setStatus] = useState<OrderStatusWithAll>('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Cải thiện cách xử lý setStatus để đảm bảo state được cập nhật đúng
  const handleStatusChange = (newStatus: OrderStatusWithAll) => {
    if (status !== newStatus) {
      setStatus(newStatus)
      setCurrentPage(1)
    }
  }

  const { data, isFetching, isError } = useGetAccountOrders({
    // @ts-ignore - API accepts undefined to return all orders
    status: status === 'ALL' ? undefined : status,
    page_index: currentPage,
    page_size: pageSize
  })

  const orders = data?.payload.data.orders || []
  const totalPages = data?.payload.pagination.totalPage ?? 1

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleClearFilters = () => {
    handleStatusChange('ALL')
  }

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold'>Đơn hàng của tôi</h1>
          <p className='text-muted-foreground mt-1'>Quản lý và theo dõi các đơn hàng của bạn</p>
        </div>
      </div>

      {/* Cải thiện hiển thị bộ lọc - Đưa tất cả vào cùng một flow */}
      <div className='space-y-4'>
        <ScrollArea className='-mx-1 px-1'>
          <div className='flex flex-wrap gap-2 pb-1'>
            {/* Các trạng thái chính */}
            {statusGroups[0].statuses.map((statusKey) => {
              // Kiểm tra xem button này có phải là trạng thái hiện tại không
              const isActive = status === statusKey

              return (
                <Button
                  key={statusKey}
                  variant='outline'
                  onClick={() => {
                    handleStatusChange(statusKey)
                  }}
                  className={cn(
                    'flex items-center gap-1',
                    isActive
                      ? 'bg-primary text-white hover:bg-primary/90 hover:text-white border-primary'
                      : `${statusConfig[statusKey].color} hover:opacity-90 border-0`
                  )}
                >
                  {statusConfig[statusKey].icon}
                  {statusConfig[statusKey].text}
                </Button>
              )
            })}

            {/* Thay thế dropdown bằng DropdownMenu component từ shadcn/ui */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'border-dashed gap-1 min-w-[130px]',
                    // Highlighting dropdown button if any status in its list is active
                    statusGroups[1].statuses.some((s) => s === status) ? 'bg-muted' : ''
                  )}
                >
                  <FilterX className='h-4 w-4' />
                  {statusGroups[1].statuses.some((s) => s === status)
                    ? statusConfig[status]?.text || 'Trạng thái khác'
                    : 'Trạng thái khác'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='w-56'>
                {statusGroups[1].statuses.map((statusKey) => {
                  const isActive = status === statusKey
                  return (
                    <DropdownMenuItem
                      key={statusKey}
                      onClick={() => {
                        handleStatusChange(statusKey)
                      }}
                      className={cn(isActive ? 'bg-muted' : '')}
                    >
                      <span
                        className={cn(
                          'flex items-center gap-2 rounded-full px-2 py-1 text-xs w-full',
                          statusConfig[statusKey].color
                        )}
                      >
                        {statusConfig[statusKey].icon}
                        {statusConfig[statusKey].text}
                      </span>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>

      {/* Order List */}
      <div className='grid gap-6'>
        {/* Loading State */}
        {isFetching && (
          <>
            {[1, 2, 3].map((i) => (
              <Card key={`skeleton-${i}`}>
                <CardContent className='p-6'>
                  <div className='space-y-6'>
                    {/* Order Header Skeleton */}
                    <div className='flex justify-between items-start'>
                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <Skeleton className='h-5 w-32' />
                          <Skeleton className='h-5 w-20 rounded-full' />
                        </div>
                        <div className='flex items-center gap-4'>
                          <Skeleton className='h-4 w-24' />
                          <Skeleton className='h-4 w-36' />
                        </div>
                      </div>
                      <Skeleton className='h-4 w-24' />
                    </div>

                    <Separator />

                    {/* Order Items Skeleton */}
                    <div className='space-y-4'>
                      <Skeleton className='h-5 w-40' />
                      <div className='space-y-3'>
                        {[1, 2].map((j) => (
                          <div key={`item-skeleton-${i}-${j}`} className='flex items-center gap-3'>
                            <Skeleton className='h-12 w-12 rounded-lg' />
                            <div className='space-y-2'>
                              <Skeleton className='h-4 w-40' />
                              <Skeleton className='h-3 w-16' />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Order Footer Skeleton */}
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-4 w-16' />
                      <Skeleton className='h-6 w-24' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {/* Error State */}
        {isError && (
          <Card className='bg-red-50'>
            <CardContent className='p-6 flex flex-col items-center justify-center py-10 text-center'>
              <div className='rounded-full bg-red-100 p-3 mb-4'>
                <PackageX className='h-8 w-8 text-red-600' />
              </div>
              <h3 className='text-xl font-medium text-red-700 mb-2'>Không thể tải đơn hàng</h3>
              <p className='text-red-600 mb-6 max-w-md'>
                Đã xảy ra lỗi khi tải danh sách đơn hàng. Vui lòng thử lại sau.
              </p>
              <Button variant='outline' onClick={() => window.location.reload()}>
                Tải lại trang
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Empty State - No Orders */}
        {!isFetching && !isError && orders?.length === 0 && status === 'ALL' && (
          <Card className='border-dashed'>
            <CardContent className='p-6 flex flex-col items-center justify-center py-16 text-center'>
              <div className='rounded-full bg-muted p-6 mb-4'>
                <ShoppingBag className='h-12 w-12 text-muted-foreground' />
              </div>
              <h3 className='text-xl font-medium mb-2'>Bạn chưa có đơn hàng nào</h3>
              <p className='text-muted-foreground mb-8 max-w-md'>
                Hãy khám phá các khóa học và sản phẩm của chúng tôi để bắt đầu học tập và nâng cao kỹ năng của bạn.
              </p>
              <Button asChild>
                <Link href='/course'>
                  <ShoppingBasket className='mr-2 h-4 w-4' />
                  Khám phá khóa học
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* No Results From Search/Filter */}
        {!isFetching && !isError && orders?.length === 0 && status !== 'ALL' && (
          <Card className='border-dashed'>
            <CardContent className='p-6 flex flex-col items-center justify-center py-12 text-center'>
              <div className='rounded-full bg-muted p-4 mb-4'>
                <FilterX className='h-8 w-8 text-muted-foreground' />
              </div>
              <h3 className='text-xl font-medium mb-2'>Không tìm thấy đơn hàng</h3>
              <p className='text-muted-foreground mb-6 max-w-md'>
                Không có đơn hàng nào phù hợp với tiêu chí tìm kiếm của bạn. Thử điều chỉnh bộ lọc để xem các đơn hàng
                khác.
              </p>
              <Button variant='outline' onClick={handleClearFilters}>
                Xóa bộ lọc
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Actual Orders */}
        {!isFetching &&
          !isError &&
          orders?.length > 0 &&
          orders.map((order, idx) => (
            <Card key={order?.id || `order-${idx}`}>
              <Link href={`/setting/order/${order?.id}`}>
                <CardContent className='p-6'>
                  <div className='space-y-6'>
                    {/* Order Header */}
                    <div className='flex justify-between items-start'>
                      <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                          <h3 className='font-medium'>Đơn hàng #{order?.orderCode}</h3>
                          <Badge
                            className={
                              statusConfig[order?.status as OrderStatusWithAll]?.color || 'bg-gray-100 text-gray-700'
                            }
                          >
                            <div className='flex items-center'>
                              {statusConfig[order?.status as OrderStatusWithAll]?.icon}
                              <span>{statusConfig[order?.status as OrderStatusWithAll]?.text || order?.status}</span>
                            </div>
                          </Badge>
                        </div>
                        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='h-4 w-4' />
                            {order?.createdAtFormatted ||
                              (order?.orderDate ? new Date(order.orderDate).toLocaleDateString('vi-VN') : '')}
                          </div>
                          <div className='flex items-center gap-1'>
                            <CreditCard className='h-4 w-4' />
                            {order?.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'Thanh toán online'}
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center gap-1 text-primary hover:underline'>
                        <span className='text-sm'>Xem chi tiết</span>
                        <ArrowRight className='h-4 w-4' />
                      </div>
                    </div>

                    <Separator />

                    {/* Order Items */}
                    <div className='grid gap-4'>
                      {/* Courses */}
                      {order?.orderDetails && order.orderDetails.filter((detail) => !!detail?.courseId).length > 0 && (
                        <div className='space-y-3'>
                          <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                            <BookOpen className='h-4 w-4' />
                            <span>Khóa học ({order.orderDetails.filter((detail) => !!detail?.courseId).length})</span>
                          </div>
                          <div className='grid gap-3'>
                            {order.orderDetails
                              .filter((detail) => !!detail?.courseId)
                              .map((detail, index) => (
                                <div key={detail?.id || index} className='flex items-center gap-3'>
                                  <div className='w-12 h-12 rounded-lg overflow-hidden'>
                                    <Image
                                      src={detail?.itemImageUrl || '/placeholder.svg'}
                                      alt={detail?.itemTitle || ''}
                                      width={50}
                                      height={50}
                                      className='object-cover w-full h-full'
                                    />
                                  </div>
                                  <div className='flex-1'>
                                    <div className='font-medium'>{detail?.itemTitle}</div>
                                    <div className='flex items-center text-sm text-muted-foreground mt-1'>
                                      <span>
                                        {(detail?.unitPrice || 0).toLocaleString()}đ x {detail?.quantity || 0}
                                      </span>
                                    </div>
                                  </div>
                                  <div className='text-sm font-medium'>
                                    {(
                                      detail?.totalPrice || (detail?.unitPrice || 0) * (detail?.quantity || 0)
                                    ).toLocaleString()}
                                    đ
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Products */}
                      {order?.orderDetails && order.orderDetails.filter((detail) => !!detail?.productId).length > 0 && (
                        <div className='space-y-3'>
                          <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                            <Package className='h-4 w-4' />
                            <span>Sản phẩm ({order.orderDetails.filter((detail) => !!detail?.productId).length})</span>
                          </div>
                          <div className='grid gap-3'>
                            {order.orderDetails
                              .filter((detail) => !!detail?.productId)
                              .map((detail, index) => (
                                <div key={detail?.id || index} className='flex items-center gap-3'>
                                  <div className='w-12 h-12 rounded-lg overflow-hidden'>
                                    <Image
                                      src={detail?.itemImageUrl || '/placeholder.svg'}
                                      alt={detail?.itemTitle || ''}
                                      width={50}
                                      height={50}
                                      className='object-cover w-full h-full'
                                    />
                                  </div>
                                  <div className='flex-1'>
                                    <div className='font-medium'>{detail?.itemTitle}</div>
                                    <div className='flex items-center text-sm text-muted-foreground mt-1'>
                                      <span>
                                        {(detail?.unitPrice || 0).toLocaleString()}đ x {detail?.quantity || 0}
                                      </span>
                                    </div>
                                  </div>
                                  <div className='text-sm font-medium'>
                                    {(
                                      detail?.totalPrice || (detail?.unitPrice || 0) * (detail?.quantity || 0)
                                    ).toLocaleString()}
                                    đ
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Order Footer */}
                    <div className='flex items-center justify-between'>
                      <div className='text-sm text-muted-foreground'>Tổng tiền</div>
                      <div className='text-lg font-bold text-primary'>
                        {(order?.totalAmount || 0).toLocaleString()}đ
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
      </div>

      {/* Pagination */}
      {!isFetching && !isError && orders?.length > 0 && totalPages > 1 && (
        <div className='flex justify-center'>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  )
}
