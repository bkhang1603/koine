'use client'

import { useState } from 'react'
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
  ShoppingBasket
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useGetAccountOrders } from '@/queries/useAccount'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Pagination } from '@/components/pagination'

type OrderStatus = 'PROCESSING' | 'DELIVERING' | 'CANCELLED' | 'COMPLETED'

const statusColorMap = {
  PROCESSING: 'bg-blue-100 text-blue-800',
  DELIVERING: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800'
} as const

const statusTextMap = {
  PROCESSING: 'Đang xử lý',
  DELIVERING: 'Đang giao hàng',
  COMPLETED: 'Hoàn thành',
  CANCELLED: 'Đã hủy'
} as const

export default function OrderPage() {
  const [status, setStatus] = useState<OrderStatus>('PROCESSING')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const { data, isFetching, isError } = useGetAccountOrders({
    status,
    page_index: currentPage,
    page_size: pageSize
  })

  const orders = data?.payload.data.orders || []
  const totalPages = data?.payload.pagination.totalPage ?? 1

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleClearFilters = () => {
    setStatus('PROCESSING')
  }

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      <div className='flex justify-between items-center'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold'>Đơn hàng của tôi</h1>
          <p className='text-muted-foreground mt-1'>Quản lý và theo dõi các đơn hàng của bạn</p>
        </div>

        {/* Status Filter Buttons */}
        <div className='flex gap-2'>
          {(Object.entries(statusTextMap) as [OrderStatus, string][]).map(([statusKey, text]) => (
            <Button
              key={statusKey}
              variant={status === statusKey ? 'default' : 'outline'}
              onClick={() => {
                setStatus(statusKey)
                setCurrentPage(1)
              }}
              className={cn(
                'min-w-[120px]',
                status === statusKey
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : `${statusColorMap[statusKey]} hover:opacity-90`
              )}
            >
              {text}
            </Button>
          ))}
        </div>
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
        {!isFetching && !isError && orders.length === 0 && (
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
        {!isFetching && !isError && orders.length > 0 && orders.length === 0 && (
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
          orders.length > 0 &&
          orders.map((order) => (
            <Card key={order.id}>
              <Link href={`/setting/order/${order.id}`}>
                <CardContent className='p-6'>
                  <div className='space-y-6'>
                    {/* Order Header */}
                    <div className='flex justify-between items-start'>
                      <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                          <h3 className='font-medium'>Đơn hàng #{order.orderCode}</h3>
                          <Badge className={statusColorMap[order.status as keyof typeof statusColorMap]}>
                            {statusTextMap[order.status as keyof typeof statusTextMap]}
                          </Badge>
                        </div>
                        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='h-4 w-4' />
                            {order.createdAtFormatted}
                          </div>
                          <div className='flex items-center gap-1'>
                            <CreditCard className='h-4 w-4' />
                            {order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'Thanh toán online'}
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
                      {order.orderDetails.filter((detail) => !!detail.courseId).length > 0 && (
                        <div className='space-y-3'>
                          <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                            <BookOpen className='h-4 w-4' />
                            <span>Khóa học ({order.orderDetails.filter((detail) => !!detail.courseId).length})</span>
                          </div>
                          <div className='grid gap-3'>
                            {order.orderDetails
                              .filter((detail) => !!detail.courseId)
                              .map((detail) => (
                                <div key={detail.id} className='flex items-center gap-3'>
                                  {/* <div className='w-12 h-12 rounded-lg bg-muted' /> */}
                                  <div className='w-12 h-12 rounded-lg overflow-hidden'>
                                    <Image
                                      src={detail.itemImageUrl}
                                      alt={detail.itemTitle}
                                      width={50}
                                      height={50}
                                      className='object-cover w-full h-full'
                                    />
                                  </div>
                                  <div>
                                    <div className='font-medium'>{detail.itemTitle}</div>
                                    <div className='text-sm text-muted-foreground'>
                                      {detail.totalPrice.toLocaleString()}đ
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Products */}
                      {order.orderDetails.filter((detail) => !!detail.productId).length > 0 && (
                        <div className='space-y-3'>
                          <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                            <Package className='h-4 w-4' />
                            <span>Sản phẩm ({order.orderDetails.filter((detail) => !!detail.productId).length})</span>
                          </div>
                          <div className='grid gap-3'>
                            {order.orderDetails
                              .filter((detail) => !!detail.productId)
                              .map((detail) => (
                                <div key={detail.id} className='flex items-center gap-3'>
                                  {/* <div className='w-12 h-12 rounded-lg bg-muted' /> */}
                                  <div className='w-12 h-12 rounded-lg overflow-hidden'>
                                    <Image
                                      src={detail.itemImageUrl}
                                      alt={detail.itemTitle}
                                      width={50}
                                      height={50}
                                      className='object-cover w-full h-full'
                                    />
                                  </div>
                                  <div>
                                    <div className='font-medium'>{detail.itemTitle}</div>
                                    <div className='text-sm text-muted-foreground'>
                                      {detail.totalPrice.toLocaleString()}đ
                                    </div>
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
                      <div className='text-lg font-bold text-primary'>{order.totalAmount.toLocaleString()}đ</div>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
      </div>

      {/* Pagination */}
      {!isFetching && !isError && orders.length > 0 && totalPages > 1 && (
        <div className='flex justify-center'>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  )
}
