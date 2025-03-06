'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { mockOrders } from '../../_mock/data'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { OrderInfo } from '@/components/private/salesman/order-detail/order-info'
import { OrderSidebar } from '@/components/private/salesman/order-detail/order-sidebar'

const orderStatusConfig = {
  pending: { label: 'Chờ xử lý', color: 'text-yellow-600' },
  processing: { label: 'Đang xử lý', color: 'text-blue-600' },
  completed: { label: 'Hoàn thành', color: 'text-green-600' },
  cancelled: { label: 'Đã hủy', color: 'text-red-600' }
} as const

export default function OrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const order = mockOrders.find((o) => o.id === params.id)

  if (!order) {
    return <div>Không tìm thấy đơn hàng</div>
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild>
            <Link href='/salesman/orders'>
              <ArrowLeft className='w-4 h-4' />
            </Link>
          </Button>
          <div>
            <h1 className='text-2xl font-bold'>Chi tiết đơn hàng #{order.id}</h1>
            <p className='text-sm text-muted-foreground'>Quản lý thông tin đơn hàng</p>
          </div>
        </div>
        <Badge className={orderStatusConfig[order.status].color}>{orderStatusConfig[order.status].label}</Badge>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <OrderInfo order={order} />
        <OrderSidebar order={order} />
      </div>
    </div>
  )
}
