'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Package, BookOpen, Calendar, CreditCard, ArrowRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { useGetAccountOrders } from '@/queries/useAccount'

const statusColorMap = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800'
} as const

const statusTextMap = {
  PENDING: 'Chờ xử lý',
  PROCESSING: 'Đang xử lý',
  COMPLETED: 'Hoàn thành',
  CANCELLED: 'Đã hủy'
} as const

export default function OrderPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const { data } = useGetAccountOrders()
  const orders = data?.payload.data || []
  console.log(data)

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold'>Đơn hàng của tôi</h1>
        <p className='text-muted-foreground mt-1'>Quản lý và theo dõi các đơn hàng của bạn</p>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Tìm kiếm đơn hàng...'
            className='pl-9'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả trạng thái</SelectItem>
            <SelectItem value='pending'>Chờ xử lý</SelectItem>
            <SelectItem value='processing'>Đang xử lý</SelectItem>
            <SelectItem value='completed'>Hoàn thành</SelectItem>
            <SelectItem value='cancelled'>Đã hủy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Order List */}
      <div className='grid gap-6'>
        {orders.map((order) => (
          <Card key={order.id}>
            <Link href={`/setting/order/${order.id}`}>
              <CardContent className='p-6'>
                <div className='space-y-6'>
                  {/* Order Header */}
                  <div className='flex justify-between items-start'>
                    <div className='space-y-1'>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-medium'>Đơn hàng #{order.id}</h3>
                        <Badge className={statusColorMap[order.status as keyof typeof statusColorMap]}>
                          {statusTextMap[order.status as keyof typeof statusTextMap]}
                        </Badge>
                      </div>
                      <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          {order.orderDate}
                        </div>
                        <div className='flex items-center gap-1'>
                          <CreditCard className='h-4 w-4' />
                          Thanh toán chuyển khoản
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-1 text-primary hover:underline'>
                      <span className='text-sm'>Xem chi tiết</span>
                      <ArrowRight className='h-4 w-4' />
                    </div>
                  </div>

                  <Separator />

                  {/* Order Items */}
                  <div className='grid gap-4'>
                    {/* Courses */}
                    {order.orderDetails.filter((detail) => !!detail.courseId).length > 0 && (
                      <div className='space-y-3'>
                        <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                          <BookOpen className='h-4 w-4' />
                          <span>Khóa học ({order.orderDetails.filter((detail) => !!detail.courseId).length})</span>
                        </div>
                        <div className='grid gap-3'>
                          {order.orderDetails
                            .filter((detail) => !!detail.courseId)
                            .map((detail) => (
                              <div key={detail.id} className='flex items-center gap-3'>
                                <div className='w-12 h-12 rounded-lg bg-muted' />
                                <div>
                                  <div className='font-medium'>Khóa học ID: {detail.courseId}</div>
                                  <div className='text-sm text-muted-foreground'>
                                    {detail.totalPrice.toLocaleString()}đ
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Products */}
                    {order.orderDetails.filter((detail) => !!detail.productId).length > 0 && (
                      <div className='space-y-3'>
                        <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                          <Package className='h-4 w-4' />
                          <span>Sản phẩm ({order.orderDetails.filter((detail) => !!detail.productId).length})</span>
                        </div>
                        <div className='grid gap-3'>
                          {order.orderDetails
                            .filter((detail) => !!detail.productId)
                            .map((detail) => (
                              <div key={detail.id} className='flex items-center gap-3'>
                                <div className='w-12 h-12 rounded-lg bg-muted' />
                                <div>
                                  <div className='font-medium'>Sản phẩm ID: {detail.productId}</div>
                                  <div className='text-sm text-muted-foreground'>
                                    {detail.totalPrice.toLocaleString()}đ
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Order Footer */}
                  <div className='flex items-center justify-between'>
                    <div className='text-sm text-muted-foreground'>Tổng tiền</div>
                    <div className='text-lg font-bold text-primary'>{order.totalAmount.toLocaleString()}đ</div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#' isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
