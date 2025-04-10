'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, Clock, User, Phone, MapPin, DollarSign } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { useGetAdminOrderQuery } from '@/queries/useOrder'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate, formatOrderStatus, formatPaymentStatus, formatPrice } from '@/lib/utils'
import { Breadcrumb } from '@/components/private/common/breadcrumb'

type OrderItemType = {
  orderDetailId: string
  quantity: number
  unitPrice: number
  discount: number
  totalPrice: number
  type: string
  itemId: string
  name: string
  description: string
  imageUrl: string
}

export default function SupportOrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const orderId = params.id
  console.log('Order ID:', orderId)

  const { isLoading, error, data } = useGetAdminOrderQuery({ id: orderId })

  console.log('API Response Data:', data)

  if (isLoading) {
    return (
      <div className='container max-w-7xl mx-auto py-6 space-y-8'>
        {/* Loading skeleton - existing code */}
        <Skeleton className='w-[200px] h-10' />
        <div>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='w-[300px] h-8' />
            <Skeleton className='w-[100px] h-6' />
          </div>
        </div>
        {/* Additional skeleton elements */}
      </div>
    )
  }

  if (error || !data?.payload) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null
          ? JSON.stringify(error)
          : 'Unknown error occurred'

    console.error('Error or missing data:', errorMessage)

    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>Không tìm thấy đơn hàng</h3>
          <p className='text-gray-500'>Đơn hàng không tồn tại hoặc đã bị xóa</p>
          {error && (
            <div className='mt-4 p-4 bg-red-50 text-red-800 rounded-md max-w-md mx-auto text-left text-sm'>
              <p className='font-semibold'>Lỗi:</p>
              <p className='break-words'>{errorMessage}</p>
            </div>
          )}
        </div>
        <Button variant='outline' asChild>
          <Link href='/support/order'>Quay lại danh sách đơn hàng</Link>
        </Button>
      </div>
    )
  }

  // The response structure follows the schema with data property
  const orderData = data.payload.data
  const orderInfo = orderData.orderInfo || {}
  const customerInfo = orderData.customerInfo || {}
  const deliveryInfo = orderData.deliveryInfo || {}
  const paymentInfo = orderData.paymentInfo || {}
  const orderItems = orderData.orderItems || []
  // eslint-disable-next-line no-unused-vars
  const orderHistory = orderData.orderHistory || []

  // Cấu hình màu sắc và nhãn cho trạng thái
  const orderStatusConfig = {
    PROCESSING: { label: 'Đang xử lý', variant: 'default' },
    DELIVERING: { label: 'Đang giao', variant: 'primary' },
    COMPLETED: { label: 'Hoàn thành', variant: 'secondary' },
    CANCELLED: { label: 'Đã hủy', variant: 'destructive' }
  } as const

  const formatStatus = (status: string) => {
    const config = orderStatusConfig[status as keyof typeof orderStatusConfig] || {
      label: formatOrderStatus(status),
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

  const breadcrumbItems = [
    {
      title: 'Đơn hàng',
      href: '/support/order'
    },
    {
      title: orderData.orderInfo.orderCode || 'Chi tiết đơn hàng'
    }
  ]

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Breadcrumb component */}
      <div className='mb-6'>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>Chi tiết đơn hàng #{orderInfo.orderCode || ''}</h1>
          <div>{formatStatus(orderInfo.status || 'UNKNOWN')}</div>
        </div>
        <div className='flex items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            {orderInfo.orderDate ? format(new Date(orderInfo.orderDate), 'HH:mm - dd/MM/yyyy', { locale: vi }) : 'N/A'}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2 space-y-6'>
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Package className='w-5 h-5' />
                Sản phẩm
              </CardTitle>
            </CardHeader>
            <CardContent className='divide-y'>
              {orderItems.length > 0 ? (
                orderItems.map((item: OrderItemType) => (
                  <div key={item.orderDetailId} className='py-4 first:pt-0 last:pb-0'>
                    <div className='flex gap-4'>
                      <div className='relative w-16 h-16'>
                        <Image src={item.imageUrl} alt={item.name} fill className='object-cover rounded-lg' />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-medium'>{item.name}</h3>
                        <div className='flex items-center justify-between mt-2'>
                          <div className='text-sm text-muted-foreground'>
                            Số lượng: <span className='font-medium'>{item.quantity}</span>
                          </div>
                          <div className='font-medium'>{formatPrice(item.totalPrice)}</div>
                        </div>
                        {item.discount > 0 && (
                          <div className='text-xs text-red-500 mt-1'>Giảm giá: {(item.discount * 100).toFixed(0)}%</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='py-4 text-center text-muted-foreground'>Không có sản phẩm</div>
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
                  <span>{formatPrice(orderInfo.totalAmount || 0)}</span>
                </div>
                {(orderInfo.deliAmount || 0) > 0 && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Phí vận chuyển</span>
                    <span>{formatPrice(orderInfo.deliAmount || 0)}</span>
                  </div>
                )}
                <div className='flex justify-between text-sm font-medium'>
                  <span>Tổng thanh toán</span>
                  <span className='text-red-600'>{formatPrice(orderInfo.grandTotal || 0)}</span>
                </div>
              </div>

              <Separator />

              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Mã đơn hàng</span>
                  <span className='font-medium'>#{orderInfo.orderCode || 'N/A'}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày đặt hàng</span>
                  <span>{orderInfo.orderDateFormatted || 'N/A'}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Trạng thái</span>
                  <span>{formatOrderStatus(orderInfo.status || 'UNKNOWN')}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Phương thức thanh toán</span>
                  <span>{formatPaymentMethod(paymentInfo.payMethod || 'UNKNOWN')}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Phương thức giao hàng</span>
                  <span>{formatDeliveryMethod(orderInfo.deliMethod || 'UNKNOWN')}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày tạo</span>
                  <span>{orderInfo.createdAtFormatted || 'N/A'}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Cập nhật lần cuối</span>
                  <span>{orderInfo.updatedAtFormatted || 'N/A'}</span>
                </div>
              </div>

              {orderInfo.note && (
                <>
                  <Separator />
                  <div>
                    <h3 className='text-sm font-medium mb-2'>Ghi chú đơn hàng</h3>
                    <p className='text-sm text-muted-foreground p-3 bg-gray-50 rounded-md'>{orderInfo.note}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='w-5 h-5' />
                Thông tin khách hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <User className='h-5 w-5 text-muted-foreground shrink-0 mt-0.5' />
                  <div>
                    <div className='font-medium'>{customerInfo.fullName || 'N/A'}</div>
                    <div className='text-sm text-muted-foreground'>{customerInfo.email || 'Không có email'}</div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <Phone className='h-5 w-5 text-muted-foreground shrink-0 mt-0.5' />
                  <div>
                    <div className='font-medium'>{customerInfo.phone || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin người nhận - Only show for COD orders */}
          {paymentInfo.payMethod === 'COD' && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <MapPin className='w-5 h-5' />
                  Thông tin người nhận
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-start gap-3'>
                    <User className='h-5 w-5 text-muted-foreground shrink-0 mt-0.5' />
                    <div>
                      <div className='font-medium'>{deliveryInfo.name || 'Không có thông tin'}</div>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Phone className='h-5 w-5 text-muted-foreground shrink-0 mt-0.5' />
                    <div>
                      <div className='font-medium'>{deliveryInfo.phone || 'Không có thông tin'}</div>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <MapPin className='h-5 w-5 text-muted-foreground shrink-0 mt-0.5' />
                    <div>
                      <div className='font-medium'>{deliveryInfo.address || 'Không có thông tin'}</div>
                      {deliveryInfo.status && (
                        <div className='text-sm text-muted-foreground mt-1'>
                          Trạng thái:{' '}
                          <span className='capitalize'>{formatOrderStatus(deliveryInfo.status.toLowerCase())}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <DollarSign className='w-5 h-5' />
                Thông tin thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Phương thức</span>
                  <span>{formatPaymentMethod(paymentInfo.payMethod || 'UNKNOWN')}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Trạng thái</span>
                  <span>{formatPaymentStatus(paymentInfo.payStatus || 'N/A')}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Số tiền</span>
                  <span>{formatPrice(paymentInfo.payAmount || 0)}</span>
                </div>
                {paymentInfo.payDate && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Ngày thanh toán</span>
                    <span>{paymentInfo.payDateFormatted || formatDate(paymentInfo.payDate)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
