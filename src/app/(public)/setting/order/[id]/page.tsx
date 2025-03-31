'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Package,
  ArrowLeft,
  Clock,
  BookOpen,
  AlertCircle,
  Package2,
  Tag,
  ShoppingCart,
  CreditCard,
  Wallet,
  BanknoteIcon
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
import { handleErrorApi } from '@/lib/utils'
import { RefundOrderDialog } from '@/components/public/parent/setting/order/RefundOrderDialog'

// Helper để lấy màu và văn bản cho trạng thái đơn hàng
const getOrderStatusConfig = (status: string) => {
  switch (status) {
    case 'PROCESSING':
      return { color: 'bg-blue-100 text-blue-800', label: 'Đang xử lý' }
    case 'COMPLETED':
      return { color: 'bg-green-100 text-green-800', label: 'Hoàn thành' }
    case 'CANCELLED':
      return { color: 'bg-red-100 text-red-800', label: 'Đã hủy' }
    default:
      return { color: 'bg-gray-100 text-gray-800', label: status }
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
  const courseItems = order.orderDetails.filter(
    (item) => item.courseId && item.course
  ) as ((typeof order.orderDetails)[0] & { course: NonNullable<(typeof order.orderDetails)[0]['course']> })[]

  const productItems = order.orderDetails.filter(
    (item) => item.productId && item.product
  ) as ((typeof order.orderDetails)[0] & { product: NonNullable<(typeof order.orderDetails)[0]['product']> })[]

  const comboItems = order.orderDetails.filter(
    (item) => item.comboId && item.combo
  ) as ((typeof order.orderDetails)[0] & { combo: NonNullable<(typeof order.orderDetails)[0]['combo']> })[]

  const statusConfig = getOrderStatusConfig(order.status)
  const canCancel = order.status === 'PROCESSING'

  const handleUpdatePaymentMethod = async () => {
    try {
      if (updatePaymentMethodMutation.isPending) return

      await updatePaymentMethodMutation.mutateAsync({
        id: order.id,
        body: { payMethod: order.payMethod === 'COD' ? 'BANKING' : 'COD' }
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

      if (res?.payload?.data?.paymentLink) {
        window.location.href = res.payload.data.paymentLink
      }
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const hasOnlyCourses = order.orderDetails.every((item) => item.courseId && item.course)

  const orderBreadcrumbItems = [
    { label: 'Đơn hàng', href: configRoute.setting.order },
    { label: `Đơn hàng ${order.orderCode}`, isCurrent: true }
  ]

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Back button */}
      {/* <Button variant='ghost' asChild className='gap-2 hover:bg-gray-100'>
        <Link href='/setting/order'>
          <ArrowLeft className='h-4 w-4' />
          Quay lại danh sách đơn hàng
        </Link>
      </Button> */}
      <SettingBreadcrumb
        items={orderBreadcrumbItems}
        isLoading={isLoading}
        backButton={
          <Link href={configRoute.setting.order}>
            <Button variant='outline' size='sm' className='gap-2'>
              <ArrowLeft className='h-4 w-4' />
              Quay lại danh sách đơn hàng
            </Button>
          </Link>
        }
      />

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>Chi tiết đơn hàng #{order.orderCode}</h1>
          <Badge className={`px-2.5 py-1 ${statusConfig.color}`}>{statusConfig.label}</Badge>
        </div>
        <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            {format(new Date(order.orderDate), 'HH:mm - dd/MM/yyyy', { locale: vi })}
          </div>
          <div className='flex items-center gap-2'>
            <ShoppingCart className='h-4 w-4' />
            {order.orderDetails.length} sản phẩm
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
                  <span className='font-medium'>{order.payMethod === 'COD' ? 'COD' : 'Banking'}</span>
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
                  {order.payMethod === 'BANKING' && (
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
                  {(!hasOnlyCourses || (hasOnlyCourses && order.payMethod === 'COD')) && (
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
                          {order.payMethod === 'COD' ? (
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
                  <RefundOrderDialog orderId={order.id} orderCode={order.orderCode} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
