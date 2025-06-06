'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, Clock, BookOpen, AlertCircle, Package2, Tag, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useGetOrder } from '@/queries/useOrder'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { OrderDetailSkeleton } from '@/components/public/parent/setting/order/OrderDetailSkeleton'
import { Badge } from '@/components/ui/badge'
import configRoute from '@/config/route'
import { SettingBreadcrumb } from '@/components/public/parent/setting/SettingBreadcrumb'
import { translateOrderStatus } from '@/lib/utils'
import { OrderStatus } from '@/constants/type'
import { OrderStatusValues } from '@/constants/type'

// Helper để lấy màu và văn bản cho trạng thái đơn hàng
const getOrderStatusConfig = (status: (typeof OrderStatusValues)[number]) => {
  switch (status) {
    case OrderStatus.PROCESSING:
      return { color: 'bg-blue-100 text-blue-800 hover:bg-blue-200', label: 'Đang xử lý' }
    case OrderStatus.COMPLETED:
      return { color: 'bg-green-100 text-green-800 hover:bg-green-200', label: 'Hoàn thành' }
    case OrderStatus.CANCELLED:
      return { color: 'bg-red-100 text-red-800 hover:bg-red-200', label: 'Đã hủy' }
    case OrderStatus.FAILED:
      return { color: 'bg-red-100 text-red-800 hover:bg-red-200', label: 'Thất bại' }
    case OrderStatus.FAILED_PAYMENT:
      return { color: 'bg-red-100 text-red-800 hover:bg-red-200', label: 'Thất bại' }
    case OrderStatus.REFUND_REQUEST:
      return { color: 'bg-red-100 text-red-800 hover:bg-red-200', label: 'Yêu cầu hoàn tiền' }
    case OrderStatus.REFUNDING:
      return { color: 'bg-red-100 text-red-800 hover:bg-red-200', label: 'Đang hoàn tiền' }
    case OrderStatus.REFUNDED:
      return { color: 'bg-green-100 text-green-800 hover:bg-green-200', label: 'Đã hoàn tiền' }
    case OrderStatus.PENDING:
      return { color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200', label: 'Chờ xác nhận' }
    case OrderStatus.DELIVERING:
      return { color: 'bg-blue-100 text-blue-800 hover:bg-blue-200', label: 'Đang giao hàng' }
    case OrderStatus.DELIVERED:
      return { color: 'bg-green-100 text-green-800 hover:bg-green-200', label: 'Đã giao hàng' }
    default:
      return { color: 'bg-gray-100 text-gray-800 hover:bg-gray-200', label: status }
  }
}

export default function OrderReviewDetail(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { isLoading, error, data } = useGetOrder({ id: params.id })

  const order = data?.payload.data

  if (isLoading) {
    return <OrderDetailSkeleton />
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
          <Link href={configRoute.setting.review}>Quay lại danh sách đơn hàng</Link>
        </Button>
      </div>
    )
  }

  // Group order details by type
  const courseItems = order.orderDetails
    ? (order.orderDetails.filter((item) => item.courseId && item.course) as ((typeof order.orderDetails)[0] & {
        course: NonNullable<(typeof order.orderDetails)[0]['course']>
      })[])
    : []

  const productItems = order.orderDetails
    ? (order.orderDetails.filter((item) => item.productId && item.product) as ((typeof order.orderDetails)[0] & {
        product: NonNullable<(typeof order.orderDetails)[0]['product']>
      })[])
    : []

  const comboItems = order.orderDetails
    ? (order.orderDetails.filter((item) => item.comboId && item.combo) as ((typeof order.orderDetails)[0] & {
        combo: NonNullable<(typeof order.orderDetails)[0]['combo']>
      })[])
    : []

  const statusConfig = getOrderStatusConfig(order.status)

  const orderBreadcrumbItems = [
    { label: 'Cần đánh giá', href: configRoute.setting.review },
    { label: `Đơn hàng ${order.orderCode}`, isCurrent: true }
  ]

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      <SettingBreadcrumb items={orderBreadcrumbItems} isLoading={isLoading} />

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>Chi tiết đơn hàng #{order.orderCode}</h1>
          <Badge className={`px-2.5 py-1 ${statusConfig.color}`}>{translateOrderStatus(order.status)}</Badge>
        </div>
        <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            {format(new Date(order.orderDate), 'HH:mm - dd/MM/yyyy', { locale: vi })}
          </div>
          <div className='flex items-center gap-2'>
            <ShoppingCart className='h-4 w-4' />
            {order.orderDetails ? order.orderDetails.length : 0} sản phẩm
          </div>
          <div className='flex items-center gap-2'>
            <Tag className='h-4 w-4' />
            {order.totalAmount.toLocaleString()}đ
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
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
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Add Order History/Journey */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Clock className='w-5 h-5' />
                Quá trình đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {order.orderStatusHistory && order.orderStatusHistory.length > 0 ? (
                  order.orderStatusHistory
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((history, index) => (
                      <div key={index} className='flex items-start gap-4'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10'>
                          <Clock className='h-4 w-4 text-primary' />
                        </div>
                        <div className='space-y-1 flex-1'>
                          <div className='flex items-center justify-between'>
                            <p className='font-medium'>{translateOrderStatus(history.status)}</p>
                            <time className='text-sm text-muted-foreground'>
                              {format(new Date(history.timestamp), 'HH:mm - dd/MM/yyyy', { locale: vi })}
                            </time>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className='text-muted-foreground'>Không có lịch sử trạng thái</p>
                )}
              </div>
            </CardContent>
          </Card>
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
                  <span>{order.totalAmount.toLocaleString()}đ</span>
                </div>
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
                  <span className='text-muted-foreground'>Phương thức</span>
                  <span className='font-medium'>{order.payment.payMethod === 'COD' ? 'COD' : 'Banking'}</span>
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

              {order.status === 'CANCELLED' && order.note && (
                <div className='mt-4 p-3 bg-red-50 border border-red-100 rounded-md'>
                  <div className='flex items-start gap-2'>
                    <AlertCircle className='h-5 w-5 text-red-500 flex-shrink-0 mt-0.5' />

                    <div>
                      <h4 className='text-sm font-medium text-red-800'>Lý do hủy đơn</h4>

                      <p className='text-sm text-red-700 mt-1'>{order.note}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add recipient information if it exists */}
          {order.deliveryInfo && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>Thông tin giao hàng</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-1 text-sm'>
                  <p className='text-muted-foreground'>Người nhận</p>
                  <p className=''>{order.deliveryInfo.name}</p>
                </div>
                <div className='space-y-1 text-sm'>
                  <p className='text-muted-foreground'>Số điện thoại</p>
                  <p>{order.deliveryInfo.phone}</p>
                </div>
                <div className='space-y-1 text-sm'>
                  <p className='text-muted-foreground'>Địa chỉ</p>
                  <p>{order.deliveryInfo.address}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
