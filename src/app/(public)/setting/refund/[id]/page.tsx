'use client'

import { use } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Calendar,
  RefreshCcw,
  Receipt,
  User,
  CheckCircle2,
  XCircle,
  CircleDot,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import configRoute from '@/config/route'
import { useGetRefundAndReturnDetailRequestsQuery } from '@/queries/useOrder'
import Loading from '@/components/loading'
import { formatCurrency } from '@/lib/utils'
import { GetRefundAndReturnResType } from '@/schemaValidations/order.schema'
import { OrderStatus, OrderStatusValues } from '@/constants/type'

const statusColorMap: Record<string, string> = {
  [OrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [OrderStatus.PROCESSING]: 'bg-blue-100 text-blue-800',
  [OrderStatus.DELIVERING]: 'bg-blue-100 text-blue-800',
  [OrderStatus.DELIVERED]: 'bg-green-100 text-green-800',
  [OrderStatus.COMPLETED]: 'bg-green-100 text-green-800',
  [OrderStatus.CANCELLED]: 'bg-red-100 text-red-800',
  [OrderStatus.FAILED_PAYMENT]: 'bg-red-100 text-red-800',
  [OrderStatus.REFUND_REQUEST]: 'bg-yellow-100 text-yellow-800',
  [OrderStatus.REFUNDING]: 'bg-blue-100 text-blue-800',
  [OrderStatus.REFUNDED]: 'bg-green-100 text-green-800',
  [OrderStatus.FAILED]: 'bg-red-100 text-red-800'
}

const statusTextMap: Record<string, string> = {
  [OrderStatus.PENDING]: 'Chờ xác nhận',
  [OrderStatus.PROCESSING]: 'Đang xử lý',
  [OrderStatus.DELIVERING]: 'Đang giao hàng',
  [OrderStatus.DELIVERED]: 'Đã giao hàng',
  [OrderStatus.COMPLETED]: 'Hoàn thành',
  [OrderStatus.CANCELLED]: 'Đã hủy',
  [OrderStatus.FAILED_PAYMENT]: 'Thanh toán thất bại',
  [OrderStatus.REFUND_REQUEST]: 'Yêu cầu hoàn tiền',
  [OrderStatus.REFUNDING]: 'Đang hoàn tiền',
  [OrderStatus.REFUNDED]: 'Đã hoàn tiền',
  [OrderStatus.FAILED]: 'Thất bại'
}

const orderStatusTextMap: Record<string, string> = {
  [OrderStatus.PENDING]: 'Chờ xác nhận',
  [OrderStatus.PROCESSING]: 'Đang xử lý',
  [OrderStatus.DELIVERING]: 'Đang giao hàng',
  [OrderStatus.DELIVERED]: 'Đã giao hàng',
  [OrderStatus.COMPLETED]: 'Hoàn thành',
  [OrderStatus.CANCELLED]: 'Đã hủy',
  [OrderStatus.FAILED_PAYMENT]: 'Thanh toán thất bại',
  [OrderStatus.REFUND_REQUEST]: 'Yêu cầu hoàn tiền',
  [OrderStatus.REFUNDING]: 'Đang hoàn tiền',
  [OrderStatus.REFUNDED]: 'Đã hoàn tiền',
  [OrderStatus.FAILED]: 'Thất bại'
}

export default function RefundDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { data: refundData, isLoading } = useGetRefundAndReturnDetailRequestsQuery({ orderId: params.id })

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[calc(100vh-10rem)]'>
        <Loading />
      </div>
    )
  }

  if (!refundData?.payload?.data) {
    return (
      <div className='container max-w-7xl mx-auto py-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-destructive'>Không tìm thấy thông tin yêu cầu</h1>
          <Button variant='ghost' asChild className='mt-4'>
            <Link href={configRoute.setting.refund} className='flex items-center gap-2'>
              <ArrowLeft className='h-4 w-4' />
              Quay lại danh sách
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const refund = refundData.payload.data

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-6'>
      {/* Breadcrumb */}
      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
        <Link href={configRoute.setting.refund} className='hover:text-primary'>
          Hoàn tiền & Đổi trả
        </Link>
        <ChevronRight className='h-4 w-4' />
        <span className='text-foreground'>Chi tiết yêu cầu #{refund.orderCode}</span>
      </div>

      {/* Header */}
      <div className='mt-6 mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-3xl font-bold'>Chi tiết yêu cầu #{refund.orderCode}</h1>
          <Badge className={statusColorMap[refund.status]}>{statusTextMap[refund.status]}</Badge>
        </div>
        <div className='flex items-center gap-6 text-sm text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <Receipt className='h-4 w-4' />
            Đơn hàng: #{refund.orderCode}
          </div>
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4' />
            Ngày đặt: {refund.orderDateFormatted}
          </div>
          <div className='flex items-center gap-2'>
            <RefreshCcw className='h-4 w-4' />
            Ngày yêu cầu: {refund.returnRequestDateFormatted}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm yêu cầu hoàn tiền</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {refund.orderDetails.map((item) => (
                <div key={item.id} className='flex gap-4 p-4 rounded-lg bg-muted/30'>
                  <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted'>
                    {item.itemImageUrl ? (
                      <Image
                        src={item.itemImageUrl}
                        alt={item.itemName}
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
                        <ImageIcon className='h-8 w-8' />
                      </div>
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Badge variant='outline' className='capitalize'>
                        {item.itemType === 'COURSE' ? 'Khóa học' : 'Sản phẩm'}
                      </Badge>
                    </div>
                    <h3 className='font-medium text-lg'>{item.itemName}</h3>
                    <p className='text-sm text-muted-foreground mt-1'>{item.itemDescription}</p>
                    <div className='flex justify-between items-center mt-2'>
                      <div className='text-sm'>
                        <span className='text-muted-foreground'>Số lượng: </span>
                        {item.quantity}
                      </div>
                      <p className='text-primary font-medium'>{formatCurrency(item.totalPrice)}</p>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className='flex justify-between items-center'>
                <span className='font-medium'>Số tiền hoàn trả</span>
                <span className='text-xl font-bold text-primary'>{formatCurrency(refund.totalAmount)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Họ tên</h4>
                  <p>{refund.customerInfo.fullName}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Email</h4>
                  <p>{refund.customerInfo.email}</p>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-muted-foreground'>Số điện thoại</h4>
                  <p>{refund.customerInfo.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái yêu cầu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='relative space-y-6'>
                {refund.orderStatusHistory.map((item, index) => (
                  <div key={index} className='flex gap-4'>
                    <div className='flex flex-col items-center'>
                      {getStatusIcon(item.status)}
                      {index !== refund.orderStatusHistory.length - 1 && <div className='w-px h-full bg-border mt-2' />}
                    </div>
                    <div className='flex-1 pb-6'>
                      <div className='text-sm text-muted-foreground'>{item.timestampFormatted}</div>
                      <div className='font-medium mt-1'>{orderStatusTextMap[item.status] || item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reason */}
          <Card>
            <CardHeader>
              <CardTitle>Lý do yêu cầu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm'>{refund.returnReason || 'Không có lý do'}</p>
            </CardContent>
          </Card>

          {/* Images */}
          {refund.returnRequestImages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh đính kèm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-4'>
                  {refund.returnRequestImages.map((image: string, index: number) => (
                    <div key={index} className='aspect-square rounded-lg overflow-hidden bg-muted relative'>
                      <Image
                        src={image}
                        alt={`Hình ảnh ${index + 1}`}
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          {refund.returnStatus === 'PENDING' && (
            <Button variant='destructive' className='w-full'>
              Hủy yêu cầu
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function getStatusIcon(status: string) {
  const commonClasses = 'h-4 w-4'

  switch (status.toUpperCase()) {
    case 'PENDING':
      return <RefreshCcw className={`${commonClasses} text-primary`} />
    case 'PROCESSING':
      return <CircleDot className={`${commonClasses} text-primary`} />
    case 'APPROVED':
      return <CheckCircle2 className={`${commonClasses} text-primary`} />
    case 'REJECTED':
      return <XCircle className={`${commonClasses} text-destructive`} />
    default:
      return <CircleDot className={`${commonClasses} text-primary`} />
  }
}
