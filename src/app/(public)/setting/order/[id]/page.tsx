'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Package,
  Clock,
  BookOpen,
  AlertCircle,
  Package2,
  Tag,
  ShoppingCart,
  CreditCard,
  Wallet,
  BanknoteIcon,
  CheckCircle,
  XCircle,
  Truck,
  FileEdit,
  RefreshCcw
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useGetOrder, useUpdatePaymentMethodMutation, useRePurchaseOrderMutation } from '@/queries/useOrder'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { OrderDetailSkeleton } from '@/components/public/parent/setting/order/OrderDetailSkeleton'
import { Badge } from '@/components/ui/badge'
import { CancelOrderDialog } from '@/components/public/parent/setting/order/CancelOrderDialog'
import { toast } from '@/components/ui/use-toast'
import configRoute from '@/config/route'
import { SettingBreadcrumb } from '@/components/public/parent/setting/SettingBreadcrumb'
import { handleErrorApi, translateOrderStatus } from '@/lib/utils'
import { RefundOrderDialog } from '@/components/public/parent/setting/order/RefundOrderDialog'
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

export default function OrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { isLoading, error, data } = useGetOrder({ id: params.id })
  const updatePaymentMethodMutation = useUpdatePaymentMethodMutation({ id: params.id })
  const rePurchaseOrderMutation = useRePurchaseOrderMutation()

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
          <Link href='/setting/order'>Quay lại danh sách đơn hàng</Link>
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
  const canCancel = order.status === 'PROCESSING'

  const handleUpdatePaymentMethod = async () => {
    try {
      if (updatePaymentMethodMutation.isPending) return

      await updatePaymentMethodMutation.mutateAsync({
        id: order.id,
        body: { payMethod: order.payment.payMethod === 'COD' ? 'BANKING' : 'COD' }
      })

      toast({
        description: 'Phương thức thanh toán đã được cập nhật'
      })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const handleRePurchase = async () => {
    try {
      if (rePurchaseOrderMutation.isPending) return

      const res = await rePurchaseOrderMutation.mutateAsync({
        id: order.id
      })

      if (res?.payload?.data) {
        window.location.href = res.payload.data
      }
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const hasOnlyCourses = order.orderDetails ? order.orderDetails.every((item) => item.courseId && item.course) : false

  const orderBreadcrumbItems = [
    { label: 'Đơn hàng', href: configRoute.setting.order },
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
                      <div className='relative w-16 h-16'>
                        <Image
                          src={(item.combo as any).imageUrl || (item as any).itemImageUrl || '/placeholder.svg'}
                          alt={item.combo.name}
                          fill
                          className='object-cover rounded-lg'
                        />
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center gap-4'>
                          <h3 className='font-medium'>{item.combo.name}</h3>
                          <div className='flex flex-wrap items-center gap-2'>
                            <span className='text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full'>
                              Combo
                            </span>
                          </div>
                        </div>
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
              {order.orderStatusHistory && order.orderStatusHistory.length > 0 ? (
                <div className='space-y-6'>
                  {order.orderStatusHistory
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((history, index) => {
                      // Choose icon and color based on status
                      let statusIconColor = 'text-blue-500'
                      let StatusIcon = Clock

                      switch (history.status) {
                        case OrderStatus.COMPLETED:
                          statusIconColor = 'text-green-500'
                          StatusIcon = CheckCircle
                          break
                        case OrderStatus.DELIVERED:
                          statusIconColor = 'text-green-500'
                          StatusIcon = Truck
                          break
                        case OrderStatus.REFUNDED:
                          statusIconColor = 'text-green-500'
                          StatusIcon = CheckCircle
                          break
                        case OrderStatus.CANCELLED:
                          statusIconColor = 'text-red-500'
                          StatusIcon = XCircle
                          break
                        case OrderStatus.FAILED:
                          statusIconColor = 'text-red-500'
                          StatusIcon = XCircle
                          break
                        case OrderStatus.FAILED_PAYMENT:
                          statusIconColor = 'text-red-500'
                          StatusIcon = XCircle
                          break
                        case OrderStatus.PENDING:
                          statusIconColor = 'text-yellow-500'
                          StatusIcon = Clock
                          break
                        case OrderStatus.DELIVERING:
                          statusIconColor = 'text-blue-500'
                          StatusIcon = Truck
                          break
                        case OrderStatus.PROCESSING:
                          statusIconColor = 'text-indigo-500'
                          StatusIcon = FileEdit
                          break
                        case OrderStatus.REFUNDING:
                          statusIconColor = 'text-purple-500'
                          StatusIcon = RefreshCcw
                          break
                        case OrderStatus.REFUND_REQUEST:
                          statusIconColor = 'text-red-500'
                          StatusIcon = RefreshCcw
                          break
                        default:
                          break
                      }

                      return (
                        <div key={index} className='relative'>
                          {/* Status card */}
                          <div className='bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow'>
                            <div className='flex items-start gap-3'>
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-${statusIconColor.split('-')[1]}-50`}
                              >
                                <StatusIcon className={`h-5 w-5 ${statusIconColor}`} />
                              </div>

                              <div className='flex-1 space-y-1'>
                                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                                  <p className='font-medium text-base'>{translateOrderStatus(history.status)}</p>
                                  <time className='text-sm text-muted-foreground'>
                                    {format(new Date(history.timestamp), 'HH:mm - dd/MM/yyyy', { locale: vi })}
                                  </time>
                                </div>

                                {/* Add status-specific messages */}
                                <p className='text-sm text-muted-foreground'>
                                  {history.status === OrderStatus.PROCESSING && 'Đơn hàng của bạn đang được xử lý'}
                                  {history.status === OrderStatus.COMPLETED && 'Đơn hàng đã được hoàn thành thành công'}
                                  {history.status === OrderStatus.CANCELLED && 'Đơn hàng đã bị hủy'}
                                  {history.status === OrderStatus.PENDING && 'Đơn hàng đang chờ xử lý'}
                                  {history.status === OrderStatus.DELIVERING && 'Đơn hàng đang được giao đến bạn'}
                                  {history.status === OrderStatus.DELIVERED && 'Đơn hàng đã được giao thành công'}
                                  {history.status === OrderStatus.REFUND_REQUEST && 'Yêu cầu hoàn tiền đã được gửi'}
                                  {history.status === OrderStatus.REFUNDING && 'Đơn hàng đang được hoàn tiền'}
                                  {history.status === OrderStatus.REFUNDED && 'Đơn hàng đã được hoàn tiền thành công'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center py-8 text-center'>
                  <div className='h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3'>
                    <Clock className='h-6 w-6 text-gray-400' />
                  </div>
                  <p className='text-muted-foreground'>Không có lịch sử trạng thái</p>
                </div>
              )}
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
                {!hasOnlyCourses && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Phí vận chuyển</span>
                    <span>{order.deliAmount.toLocaleString()}đ</span>
                  </div>
                )}
                <div className='flex justify-between text-sm font-medium'>
                  <span>Tổng thanh toán</span>
                  <span className='text-red-600'>
                    {(order.totalAmount + (hasOnlyCourses ? 0 : order.deliAmount)).toLocaleString()}đ
                  </span>
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
                {/* {order.note && (
                  <div className='flex flex-col gap-1 mt-2 pt-2 border-t'>
                    <span className='text-muted-foreground'>Lý do hủy</span>
                    <span className='text-red-600'>{order.note}</span>
                  </div>
                )} */}
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

              {canCancel && (
                <div className='pt-2 space-y-3'>
                  {/* Nút thanh toán ngay khi phương thức là Banking */}
                  {order.payment.payMethod === 'BANKING' && (
                    <>
                      <Button
                        className='w-full'
                        onClick={handleRePurchase}
                        disabled={rePurchaseOrderMutation.isPending}
                      >
                        {rePurchaseOrderMutation.isPending ? (
                          <>
                            <span className='h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent mr-2'></span>
                            <span>Đang xử lý...</span>
                          </>
                        ) : (
                          <>
                            <BanknoteIcon className='w-4 h-4 mr-2' />
                            Thanh toán ngay
                          </>
                        )}
                      </Button>

                      <div className='relative flex items-center w-full gap-3'>
                        <div className='h-[1px] flex-1 bg-gray-200'></div>
                        <span className='text-sm text-gray-500 flex-shrink-0'>hoặc</span>
                        <div className='h-[1px] flex-1 bg-gray-200'></div>
                      </div>
                    </>
                  )}

                  {/* Nút đổi phương thức thanh toán */}
                  {/* Chỉ cho phép đổi sang COD nếu đơn hàng có product */}
                  {(!hasOnlyCourses || (hasOnlyCourses && order.payment.payMethod === 'COD')) && (
                    <Button
                      className='w-full border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:text-primary/80 text-primary flex items-center justify-center gap-2'
                      variant='outline'
                      onClick={handleUpdatePaymentMethod}
                      disabled={updatePaymentMethodMutation.isPending}
                    >
                      {updatePaymentMethodMutation.isPending ? (
                        <>
                          <span className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent'></span>
                          <span>Đang cập nhật...</span>
                        </>
                      ) : (
                        <>
                          {order.payment.payMethod === 'COD' ? (
                            <>
                              <CreditCard className='w-4 h-4 mr-2' />
                              <span>Đổi sang chuyển khoản</span>
                            </>
                          ) : (
                            <>
                              <Wallet className='w-4 h-4 mr-2' />
                              <span>Đổi sang thanh toán COD</span>
                            </>
                          )}
                        </>
                      )}
                    </Button>
                  )}

                  <CancelOrderDialog orderId={order.id} orderCode={order.orderCode} onCancelSuccess={() => {}} />
                </div>
              )}

              {/* Nút yêu cầu hoàn tiền khi đơn hàng đã hoàn thành */}
              {order.status === 'COMPLETED' && (
                <div className='pt-2'>
                  {(() => {
                    // Tính thời gian đã trôi qua kể từ khi hoàn thành đơn hàng
                    const completedHistoryEntry = order.orderStatusHistory?.find(
                      (history) => history.status === OrderStatus.COMPLETED
                    )
                    const completedDate = completedHistoryEntry
                      ? new Date(completedHistoryEntry.timestamp)
                      : new Date(order.updatedAt)

                    const currentDate = new Date()
                    const daysPassed = Math.floor(
                      (currentDate.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24)
                    )
                    const isWithinRefundPeriod = daysPassed <= 3

                    if (isWithinRefundPeriod) {
                      return (
                        <RefundOrderDialog
                          orderId={order.id}
                          orderDetails={order.orderDetails || []}
                          buttonText={hasOnlyCourses ? 'Yêu cầu hoàn tiền' : 'Yêu cầu hoàn tiền/đổi trả'}
                        />
                      )
                    } else {
                      return (
                        <div className='p-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500'>
                          <div className='flex items-start gap-2'>
                            <AlertCircle className='h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5' />
                            <div>
                              Thời hạn yêu cầu hoàn tiền/đổi trả đã kết thúc. Bạn chỉ được phép yêu cầu trong vòng 3
                              ngày kể từ khi đơn hàng hoàn thành ({format(completedDate, 'dd/MM/yyyy', { locale: vi })}
                              ).
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })()}
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
