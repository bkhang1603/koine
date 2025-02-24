'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, DollarSign, User, MapPin, Phone } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import type { Order } from '@/app/(private)/salesman/_mock/data'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

const paymentMethodConfig = {
  cod: 'Thanh toán khi nhận hàng',
  banking: 'Chuyển khoản ngân hàng',
  momo: 'Ví MoMo',
  vnpay: 'VNPay'
} as const

export function OrderSidebar({ order }: { order: Order }) {
  return (
    <div className='space-y-6'>
      {/* Thông tin thanh toán */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin thanh toán</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Tạm tính</span>
              <span>{order.subtotal}</span>
            </div>
            {order.discount && (
              <div className='flex justify-between text-sm'>
                <span className='text-muted-foreground'>Giảm giá</span>
                <span className='text-red-500'>-{order.discount}</span>
              </div>
            )}
            <Separator />
            <div className='flex justify-between font-medium'>
              <span>Tổng cộng</span>
              <span className='text-primary'>{order.total}</span>
            </div>
          </div>

          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <Clock className='w-4 h-4' />
              <span>Thời gian đặt hàng:</span>
            </div>
            <div>{format(order.date, 'HH:mm - dd/MM/yyyy', { locale: vi })}</div>
          </div>

          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <DollarSign className='w-4 h-4' />
              <span>Phương thức thanh toán:</span>
            </div>
            <div>{paymentMethodConfig[order.paymentMethod]}</div>
          </div>
        </CardContent>
      </Card>

      {/* Thông tin khách hàng */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin khách hàng</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <User className='w-4 h-4' />
              <span>Họ tên:</span>
            </div>
            <div>{order.customerName}</div>
          </div>

          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <Phone className='w-4 h-4' />
              <span>Số điện thoại:</span>
            </div>
            <div>{order.customerPhone}</div>
          </div>

          {order.products && order.products.length > 0 && (
            <div className='space-y-2 text-sm'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <MapPin className='w-4 h-4' />
                <span>Địa chỉ giao hàng:</span>
              </div>
              <div>{order.shippingAddress}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 