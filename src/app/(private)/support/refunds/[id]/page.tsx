'use client'
import { use, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, Clock, User, Phone, MapPin, DollarSign } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { useGetRefundAndReturnDetailRequestsQuery, useUpdateRefundRequestMutation } from '@/queries/useOrder'
import { Skeleton } from '@/components/ui/skeleton'
import { formatOrderStatus, formatPaymentStatus, formatPrice, handleErrorApi } from '@/lib/utils'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export default function RefundDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const refundId = params.id
  const router = useRouter()
  const [note, setNote] = useState('')

  const { isLoading, error, data } = useGetRefundAndReturnDetailRequestsQuery({ orderId: refundId })
  const updateRefundMutation = useUpdateRefundRequestMutation()

  const handleApproveRefund = () => {
    try {
      if (updateRefundMutation.isPending) return

      updateRefundMutation.mutate(
        {
          id: refundId,
          body: {
            action: 'APPROVE',
            note: note.trim() || undefined
          }
        },
        {
          onSuccess: () => {
            toast({
              title: 'Thành công',
              description: 'Đã chấp nhận hoàn tiền thành công',
              variant: 'success'
            })
            router.push('/support/refunds')
          },
          onError: (error) => {
            handleErrorApi({ error })
          }
        }
      )
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const handleRejectRefund = () => {
    try {
      if (updateRefundMutation.isPending) return

      if (!note.trim()) {
        toast({
          title: 'Lỗi',
          description: 'Vui lòng nhập lý do từ chối hoàn tiền',
          variant: 'destructive'
        })
        return
      }

      updateRefundMutation.mutate(
        {
          id: refundId,
          body: {
            action: 'REJECT',
            note: note
          }
        },
        {
          onSuccess: () => {
            toast({
              title: 'Thành công',
              description: 'Đã từ chối yêu cầu hoàn tiền',
              variant: 'success'
            })
            router.push('/support/refunds')
          },
          onError: (error) => {
            handleErrorApi({ error })
          }
        }
      )
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  if (isLoading) {
    return (
      <div className='container max-w-7xl mx-auto py-6 space-y-8'>
        <Skeleton className='w-[200px] h-10' />
        <div>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='w-[300px] h-8' />
            <Skeleton className='w-[100px] h-6' />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-2'>
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-[200px]' />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-[150px]' />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data?.payload?.data) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null
          ? JSON.stringify(error)
          : 'Unknown error occurred'

    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>Không tìm thấy yêu cầu hoàn tiền</h3>
          <p className='text-gray-500'>Yêu cầu không tồn tại hoặc đã bị xóa</p>
          {error && (
            <div className='mt-4 p-4 bg-red-50 text-red-800 rounded-md max-w-md mx-auto text-left text-sm'>
              <p className='font-semibold'>Lỗi:</p>
              <p className='break-words'>{errorMessage}</p>
            </div>
          )}
        </div>
        <Button variant='outline' asChild>
          <Link href='/support/refunds'>Quay lại danh sách hoàn tiền</Link>
        </Button>
      </div>
    )
  }

  const refundData = data.payload.data
  const orderDetails = refundData.orderDetails || []

  // Refund status configuration for badge variants
  const refundStatusVariants = {
    REFUND_REQUEST: 'default',
    REFUNDING: 'warning',
    REFUNDED: 'success',
    REFUND_FAILED: 'destructive'
  } as const

  const formatStatus = (status: string) => {
    const variant = refundStatusVariants[status as keyof typeof refundStatusVariants] || 'default'
    return <Badge variant={variant as any}>{formatOrderStatus(status)}</Badge>
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

  const breadcrumbItems = [
    {
      title: 'Yêu cầu hoàn tiền',
      href: '/support/refunds'
    },
    {
      title: `Đơn #${refundData.orderCode}` || 'Chi tiết hoàn tiền'
    }
  ]

  const isProcessingMutation = updateRefundMutation.isPending
  const canApproveOrReject = refundData.status === 'REFUND_REQUEST'

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Breadcrumb component */}
      <div className='mb-6'>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>Chi tiết hoàn tiền - Đơn #{refundData.orderCode || ''}</h1>
          <div>{formatStatus(refundData.status || 'UNKNOWN')}</div>
        </div>
        <div className='flex items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            {format(new Date(refundData.returnRequestDate), 'HH:mm - dd/MM/yyyy', {
              locale: vi
            })}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2 space-y-6'>
          {/* Refund Reason */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Package className='w-5 h-5' />
                Lý do hoàn tiền
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='p-4 bg-gray-50 rounded-md'>
                <p className='whitespace-pre-line'>{refundData.returnReason || refundData.note || 'Không có lý do'}</p>
              </div>

              {/* Display images if available */}
              {refundData.returnRequestImages && refundData.returnRequestImages.length > 0 && (
                <div className='mt-4'>
                  <h4 className='font-medium mb-2'>Hình ảnh đính kèm</h4>
                  <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                    {refundData.returnRequestImages.map((imageUrl, index) => (
                      <div key={index} className='relative aspect-square rounded-md overflow-hidden border'>
                        <Image
                          src={imageUrl}
                          alt={`Ảnh đính kèm ${index + 1}`}
                          fill
                          className='object-cover hover:scale-105 transition-transform'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Package className='w-5 h-5' />
                Sản phẩm
              </CardTitle>
            </CardHeader>
            <CardContent className='divide-y'>
              {orderDetails.length > 0 ? (
                orderDetails.map((item) => (
                  <div key={item.id} className='py-4 first:pt-0 last:pb-0'>
                    <div className='flex gap-4'>
                      <div className='relative w-16 h-16'>
                        <Image
                          src={item.itemImageUrl || '/placeholder.jpg'}
                          alt={item.itemName || 'Item'}
                          fill
                          className='object-cover rounded-lg'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-medium'>{item.itemName || 'Sản phẩm'}</h3>
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

          {/* Processing Note - Only show if the request has been processed */}
          {refundData.returnNote && refundData.status !== 'REFUND_REQUEST' && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Clock className='w-5 h-5' />
                  Kết quả xử lý
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='p-4 bg-gray-50 rounded-md'>
                    <p className='whitespace-pre-line'>{refundData.returnNote}</p>
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    Xử lý vào:{' '}
                    {refundData.returnProcessedDateFormatted ||
                      (refundData.returnProcessedDate &&
                        format(new Date(refundData.returnProcessedDate), 'HH:mm - dd/MM/yyyy', { locale: vi }))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action box - Only show if status is REFUND_REQUEST */}
          {canApproveOrReject && (
            <Card>
              <CardHeader>
                <CardTitle>Xử lý hoàn tiền</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Textarea
                  placeholder='Nhập ghi chú xử lý...'
                  className='min-h-[100px]'
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={isProcessingMutation}
                />
                <div className='flex justify-end gap-2'>
                  <Button variant='outline' onClick={handleRejectRefund} disabled={isProcessingMutation}>
                    {isProcessingMutation ? 'Đang xử lý...' : 'Từ chối'}
                  </Button>
                  <Button onClick={handleApproveRefund} disabled={isProcessingMutation}>
                    {isProcessingMutation ? 'Đang xử lý...' : 'Chấp nhận hoàn tiền'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Tổng tiền hàng</span>
                  <span>{formatPrice(refundData.totalAmount || 0)}</span>
                </div>
                {(refundData.deliAmount || 0) > 0 && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Phí vận chuyển</span>
                    <span>{formatPrice(refundData.deliAmount || 0)}</span>
                  </div>
                )}
                <div className='flex justify-between text-sm font-medium'>
                  <span>Tổng thanh toán</span>
                  <span className='text-red-600'>
                    {formatPrice((refundData.totalAmount || 0) + (refundData.deliAmount || 0))}
                  </span>
                </div>
              </div>

              <Separator />

              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Mã đơn hàng</span>
                  <span className='font-medium'>#{refundData.orderCode || 'N/A'}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày đặt hàng</span>
                  <span>{format(new Date(refundData.orderDate), 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Trạng thái đơn</span>
                  <span>{formatOrderStatus(refundData.status || 'UNKNOWN')}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Phương thức thanh toán</span>
                  <span>{formatPaymentMethod(refundData.payment?.payMethod || 'UNKNOWN')}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Phương thức giao hàng</span>
                  <span>{formatDeliveryMethod(refundData.deliMethod || 'UNKNOWN')}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày yêu cầu hoàn tiền</span>
                  <span>
                    {format(new Date(refundData.returnRequestDate), 'dd/MM/yyyy', {
                      locale: vi
                    })}
                  </span>
                </div>
              </div>

              {refundData.note && (
                <>
                  <Separator />
                  <div>
                    <h3 className='text-sm font-medium mb-2'>Ghi chú đơn hàng</h3>
                    <p className='text-sm text-muted-foreground p-3 bg-gray-50 rounded-md'>{refundData.note}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Delivery Info - if available */}
          {refundData.delivery && Object.keys(refundData.delivery).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <MapPin className='w-5 h-5' />
                  Thông tin người nhận
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {refundData.customerInfo && (
                    <>
                      <div className='flex items-start gap-3'>
                        <User className='h-5 w-5 text-muted-foreground shrink-0 mt-0.5' />
                        <div>
                          <div className='font-medium'>{refundData.customerInfo.fullName || 'Không có thông tin'}</div>
                        </div>
                      </div>
                      <div className='flex items-start gap-3'>
                        <Phone className='h-5 w-5 text-muted-foreground shrink-0 mt-0.5' />
                        <div>
                          <div className='font-medium'>{refundData.customerInfo.phone || 'Không có thông tin'}</div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className='flex items-start gap-3'>
                    <MapPin className='h-5 w-5 text-muted-foreground shrink-0 mt-0.5' />
                    <div>
                      <div className='font-medium'>
                        {(refundData.delivery as any).address || 'Không có thông tin địa chỉ'}
                      </div>
                      {(refundData.delivery as any).status && (
                        <div className='text-sm text-muted-foreground mt-1'>
                          Trạng thái:{' '}
                          <span className='capitalize'>
                            {formatOrderStatus((refundData.delivery as any).status.toLowerCase())}
                          </span>
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
                  <span>{formatPaymentMethod(refundData.payment?.payMethod || 'UNKNOWN')}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Trạng thái</span>
                  <span>{formatPaymentStatus(refundData.payment?.payStatus || 'N/A')}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Số tiền</span>
                  <span>{formatPrice(refundData.payment?.payAmount || 0)}</span>
                </div>
                {refundData.payment?.payDate && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Ngày thanh toán</span>
                    <span>{format(new Date(refundData.payment.payDate), 'dd/MM/yyyy', { locale: vi })}</span>
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
