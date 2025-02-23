'use client'

import { useState, useEffect, useMemo } from 'react'
import { TableCustom } from '@/components/table-custom'
import { Badge } from '@/components/ui/badge'
import { mockOrders, type Order } from '@/app/(private)/salesman/_mock/data'
import { MoreOptions } from './more-options'
import { useRouter } from 'next/navigation'
import { Package, GraduationCap, DollarSign } from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { EmptyState } from '@/components/empty-state'

interface OrderTableProps {
  search: string
  status: string
}

const orderStatusConfig = {
  pending: { label: 'Chờ xử lý', variant: 'outline' },
  processing: { label: 'Đang xử lý', variant: 'default' },
  completed: { label: 'Hoàn thành', variant: 'secondary' },
  cancelled: { label: 'Đã hủy', variant: 'destructive' }
} as const

const paymentMethodConfig = {
  cod: { label: 'Tiền mặt', icon: DollarSign },
  banking: { label: 'Chuyển khoản', icon: DollarSign },
  momo: { label: 'Ví MoMo', icon: DollarSign },
  vnpay: { label: 'VNPay', icon: DollarSign }
} as const

export function OrderTable({ search, status }: OrderTableProps) {
  const router = useRouter()
  const [data, setData] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(mockOrders)
    setLoading(false)
  }, [])

  const headerColumn = [
    { id: 1, name: 'Mã đơn hàng' },
    { id: 2, name: 'Thời gian' },
    { id: 3, name: 'Khách hàng' },
    { id: 4, name: 'Sản phẩm' },
    { id: 5, name: 'Khóa học' },
    { id: 6, name: 'Tổng tiền' },
    { id: 7, name: 'Thanh toán' },
    { id: 8, name: 'Trạng thái' },
    { id: 9, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (order: Order) => <span className='font-medium text-primary'>{order.id}</span>
      },
      {
        id: 2,
        render: (order: Order) => (
          <div className='space-y-0.5'>
            <div className='text-sm font-medium'>{format(order.date, 'dd/MM/yyyy', { locale: vi })}</div>
            <div className='text-xs text-muted-foreground'>{format(order.date, 'HH:mm', { locale: vi })}</div>
          </div>
        )
      },
      {
        id: 3,
        render: (order: Order) => (
          <div className='space-y-0.5'>
            <div className='font-medium'>{order.customerName}</div>
            <div className='text-xs text-muted-foreground'>{order.customerPhone}</div>
          </div>
        )
      },
      {
        id: 4,
        render: (order: Order) =>
          order.products ? (
            <div className='flex items-center gap-2'>
              <Package className='w-4 h-4 text-muted-foreground' />
              <span className='text-sm'>{order.products.length}</span>
            </div>
          ) : (
            <span className='text-xs text-muted-foreground'>Không có</span>
          )
      },
      {
        id: 5,
        render: (order: Order) =>
          order.courses ? (
            <div className='flex items-center gap-2'>
              <GraduationCap className='w-4 h-4 text-muted-foreground' />
              <span className='text-sm'>{order.courses.length}</span>
            </div>
          ) : (
            <span className='text-xs text-muted-foreground'>Không có</span>
          )
      },
      {
        id: 6,
        render: (order: Order) => (
          <div className='space-y-0.5'>
            <div className='font-medium text-primary'>{order.total}</div>
            {order.discount && <div className='text-xs text-red-500'>Giảm {order.discount}</div>}
          </div>
        )
      },
      {
        id: 7,
        render: (order: Order) => (
          <div className='flex items-center gap-1.5'>
            <DollarSign className='w-4 h-4 text-muted-foreground' />
            <span className='text-sm'>{paymentMethodConfig[order.paymentMethod].label}</span>
          </div>
        )
      },
      {
        id: 8,
        render: (order: Order) => (
          <Badge variant={orderStatusConfig[order.status].variant}>{orderStatusConfig[order.status].label}</Badge>
        )
      },
      {
        id: 9,
        render: (order: Order) => (
          <MoreOptions type='order' onView={() => router.push(`/salesman/orders/${order.id}`)} />
        )
      }
    ],
    [router]
  )

  const filteredData = data.filter(
    (order) =>
      (order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase())) &&
      (status === 'all' || order.status === status)
  )

  if (!loading && filteredData.length === 0) {
    return <EmptyState title='Không tìm thấy đơn hàng' description='Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm khác.' />
  }

  return (
    <TableCustom
      data={{
        data: filteredData.slice(0, 10),
        message: '',
        pagination: {
          pageSize: 10,
          totalItem: filteredData.length,
          currentPage: 1,
          totalPage: Math.ceil(filteredData.length / 10),
          maxPageSize: 10
        }
      }}
      loading={loading}
      headerColumn={headerColumn}
      bodyColumn={bodyColumn}
      href='/salesman/orders'
    />
  )
}
