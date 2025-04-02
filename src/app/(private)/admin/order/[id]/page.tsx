'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, ArrowLeft, Clock, BookOpen, AlertCircle, Package2, User, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import Loading from '@/components/loading'
import { Badge } from '@/components/ui/badge'
import { useGetAdminOrderQuery } from '@/queries/useOrder'
import { Skeleton } from '@/components/ui/skeleton'

export default function AdminOrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { isLoading, error, data } = useGetAdminOrderQuery({ id: params.id })
  const order = data?.payload.data

  if (isLoading) {
    return (
      <div className='container max-w-7xl mx-auto py-6 space-y-8'>
        {/* Back button skeleton */}
        <Skeleton className='w-[200px] h-10' />

        {/* Header skeleton */}
        <div>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='w-[300px] h-8' />
            <Skeleton className='w-[100px] h-6' />
          </div>
          <div className='flex items-center gap-6'>
            <Skeleton className='w-[200px] h-5' />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-2 space-y-6'>
            {/* Products skeleton */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Package className='w-5 h-5' />
                  <Skeleton className='w-[100px] h-6' />
                </CardTitle>
              </CardHeader>
              <CardContent className='divide-y'>
                {[1, 2].map((item) => (
                  <div key={item} className='py-4 first:pt-0 last:pb-0'>
                    <div className='flex gap-4'>
                      <Skeleton className='w-16 h-16 rounded-lg' />
                      <div className='flex-1 space-y-2'>
                        <Skeleton className='w-[200px] h-5' />
                        <div className='flex items-center justify-between'>
                          <Skeleton className='w-[100px] h-4' />
                          <Skeleton className='w-[80px] h-4' />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Courses skeleton */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <BookOpen className='w-5 h-5' />
                  <Skeleton className='w-[100px] h-6' />
                </CardTitle>
              </CardHeader>
              <CardContent className='divide-y'>
                {[1, 2].map((item) => (
                  <div key={item} className='py-4 first:pt-0 last:pb-0'>
                    <div className='flex gap-4'>
                      <Skeleton className='w-16 h-16 rounded-lg' />
                      <div className='flex-1 space-y-2'>
                        <Skeleton className='w-[200px] h-5' />
                        <div className='flex items-center justify-between'>
                          <Skeleton className='w-[100px] h-4' />
                          <Skeleton className='w-[80px] h-4' />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary skeleton */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className='w-[150px] h-6' />
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <Skeleton className='w-[100px] h-4' />
                    <Skeleton className='w-[80px] h-4' />
                  </div>
                  <div className='flex justify-between'>
                    <Skeleton className='w-[100px] h-4' />
                    <Skeleton className='w-[80px] h-4' />
                  </div>
                  <div className='flex justify-between'>
                    <Skeleton className='w-[100px] h-4' />
                    <Skeleton className='w-[80px] h-4' />
                  </div>
                </div>

                <Separator />

                <div className='space-y-2'>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className='flex justify-between'>
                      <Skeleton className='w-[120px] h-4' />
                      <Skeleton className='w-[100px] h-4' />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className='w-[150px] h-6' />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[1, 2, 3].map((item) => (
                    <div key={item} className='flex items-start gap-3'>
                      <Skeleton className='w-5 h-5 rounded-full' />
                      <div className='flex-1'>
                        <Skeleton className='w-[200px] h-5' />
                        {item === 3 && <Skeleton className='w-[150px] h-4 mt-1' />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action buttons skeleton */}
            <div className='space-y-3'>
              <Skeleton className='w-full h-10' />
              <Skeleton className='w-full h-10' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <AlertCircle className='w-12 h-12 text-red-500' />
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>Không tìm thấy đơn hàng</h3>
          <p className='text-gray-500'>Đơn hàng không tồn tại hoặc đã bị xóa</p>
        </div>
        <Button variant='outline' asChild>
          <Link href='/admin/order'>Quay lại danh sách đơn hàng</Link>
        </Button>
      </div>
    )
  }

  // Group order details by type
  const courseItems = order.orderDetails.filter(
    (item) => item.courseId && item.course
  ) as ((typeof order.orderDetails)[0] & { course: NonNullable<(typeof order.orderDetails)[0]['course']> })[]

  const productItems = order.orderDetails.filter(
    (item) => item.productId && item.product
  ) as ((typeof order.orderDetails)[0] & { product: NonNullable<(typeof order.orderDetails)[0]['product']> })[]

  const comboItems = order.orderDetails.filter(
    (item) => item.comboId && item.combo
  ) as ((typeof order.orderDetails)[0] & { combo: NonNullable<(typeof order.orderDetails)[0]['combo']> })[]

  // Cấu hình màu sắc và nhãn cho trạng thái
  const orderStatusConfig = {
    PROCESSING: { label: 'Đang xử lý', variant: 'default' },
    DELIVERING: { label: 'Đang giao', variant: 'primary' },
    COMPLETED: { label: 'Hoàn thành', variant: 'secondary' },
    CANCELLED: { label: 'Đã hủy', variant: 'destructive' }
  } as const

  const formatStatus = (status: string) => {
    const config = orderStatusConfig[status as keyof typeof orderStatusConfig] || {
      label: status,
      variant: 'default'
    }
    return <Badge variant={config.variant as any}>{config.label}</Badge>
  }

  // Format delivery method
  const formatDeliveryMethod = (method: string): string => {
    switch (method) {
      case 'STANDARD':
        return 'Tiêu chuẩn'
      case 'EXPEDITED':
        return 'Nhanh'
      case 'NONESHIP':
        return 'Không giao hàng'
      default:
        return method
    }
  }

  // Format payment method
  const formatPaymentMethod = (method: string): string => {
    switch (method) {
      case 'COD':
        return 'Thanh toán khi nhận hàng'
      case 'BANKING':
        return 'Chuyển khoản ngân hàng'
      default:
        return method
    }
  }

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Back button */}
      <Button variant='ghost' asChild className='gap-2 hover:bg-gray-100'>
        <Link href='/admin/order'>
          <ArrowLeft className='h-4 w-4' />
          Quay lại danh sách đơn hàng
        </Link>
      </Button>

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>Chi tiết đơn hàng #{order.orderCode}</h1>
          <div>{formatStatus(order.status)}</div>
        </div>
        <div className='flex items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            {format(new Date(order.orderDate), 'HH:mm - dd/MM/yyyy', { locale: vi })}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2 space-y-6'>
          {/* Products */}
          {productItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Package className='w-5 h-5' />
                  Sản phẩm
                </CardTitle>
              </CardHeader>
              <CardContent className='divide-y'>
                {productItems.map((item) => (
                  <div key={item.id} className='py-4 first:pt-0 last:pb-0'>
                    <div className='flex gap-4'>
                      <div className='relative w-16 h-16'>
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className='object-cover rounded-lg'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-medium'>{item.product.name}</h3>
                        <div className='flex items-center justify-between mt-2'>
                          <div className='text-sm text-muted-foreground'>
                            Số lượng: <span className='font-medium'>{item.quantity}</span>
                          </div>
                          <div className='font-medium'>{item.totalPrice.toLocaleString()}đ</div>
                        </div>
                        {item.discount > 0 && (
                          <div className='text-xs text-red-500 mt-1'>Giảm giá: {(item.discount * 100).toFixed(0)}%</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Courses */}
          {courseItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <BookOpen className='w-5 h-5' />
                  Khóa học
                </CardTitle>
              </CardHeader>
              <CardContent className='divide-y'>
                {courseItems.map((item) => (
                  <div key={item.id} className='py-4 first:pt-0 last:pb-0'>
                    <div className='flex gap-4'>
                      <div className='relative w-16 h-16'>
                        <Image
                          src={item.course.imageUrl}
                          alt={item.course.title}
                          fill
                          className='object-cover rounded-lg'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-medium'>{item.course.title}</h3>
                        <div className='flex items-center justify-between mt-2'>
                          <div className='text-sm text-muted-foreground'>
                            Số lượng: <span className='font-medium'>{item.quantity}</span>
                          </div>
                          <div className='font-medium'>{item.totalPrice.toLocaleString()}đ</div>
                        </div>
                        {item.discount > 0 && (
                          <div className='text-xs text-red-500 mt-1'>Giảm giá: {(item.discount * 100).toFixed(0)}%</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Combos */}
          {comboItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Package2 className='w-5 h-5' />
                  Combo
                </CardTitle>
              </CardHeader>
              <CardContent className='divide-y'>
                {comboItems.map((item) => (
                  <div key={item.id} className='py-4 first:pt-0 last:pb-0'>
                    <div className='flex gap-4'>
                      <div className='flex-1'>
                        <h3 className='font-medium'>{item.combo.name}</h3>
                        <div className='flex items-center justify-between mt-2'>
                          <div className='text-sm text-muted-foreground'>
                            Số lượng: <span className='font-medium'>{item.quantity}</span>
                          </div>
                          <div className='font-medium'>{item.totalPrice.toLocaleString()}đ</div>
                        </div>
                        {item.discount > 0 && (
                          <div className='text-xs text-red-500 mt-1'>Giảm giá: {(item.discount * 100).toFixed(0)}%</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Tổng tiền hàng</span>
                  <span>{(order.totalAmount - order.deliAmount).toLocaleString()}đ</span>
                </div>
                {order.deliAmount > 0 && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Phí vận chuyển</span>
                    <span>{order.deliAmount.toLocaleString()}đ</span>
                  </div>
                )}
                <div className='flex justify-between text-sm font-medium'>
                  <span>Tổng thanh toán</span>
                  <span className='text-red-600'>{order.totalAmount.toLocaleString()}đ</span>
                </div>
              </div>

              <Separator />

              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Mã đơn hàng</span>
                  <span className='font-medium'>#{order.orderCode}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày đặt hàng</span>
                  <span>{format(new Date(order.orderDate), 'dd/MM/yyyy HH:mm', { locale: vi })}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Phương thức thanh toán</span>
                  <span>{formatPaymentMethod(order.payMethod)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Phương thức giao hàng</span>
                  <span>{formatDeliveryMethod(order.deliMethod)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày tạo</span>
                  <span>{order.createdAtFormatted}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Cập nhật lần cuối</span>
                  <span>{order.updatedAtFormatted}</span>
                </div>
              </div>

              {order.note && (
                <>
                  <Separator />
                  <div>
                    <h3 className='text-sm font-medium mb-2'>Ghi chú đơn hàng</h3>
                    <p className='text-sm text-muted-foreground p-3 bg-gray-50 rounded-md'>{order.note}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Thông tin người nhận */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin người nhận</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <User className='h-5 w-5 text-muted-foreground shrink-0 mt-0.5' />
                  <div>
                    <div className='font-medium'>{order.deliveryInfo.name}</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <Phone className='h-5 w-5 text-muted-foreground shrink-0 mt-0.5' />
                  <div>
                    <div className='font-medium'>{order.deliveryInfo.phone}</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <MapPin className='h-5 w-5 text-muted-foreground shrink-0 mt-0.5' />
                  <div>
                    <div className='font-medium'>{order.deliveryInfo.address}</div>
                    <div className='text-sm text-muted-foreground'>
                      Trạng thái: <span className='capitalize'>{order.deliveryInfo.status.toLowerCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Các nút hành động */}
          <div className='space-y-3'>
            <Button className='w-full' variant='default' disabled={order.status === 'CANCELLED'}>
              Cập nhật trạng thái
            </Button>
            <Button className='w-full' variant='outline' disabled={order.status === 'CANCELLED'}>
              In đơn hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
