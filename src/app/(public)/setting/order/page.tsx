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

interface OrderItem {
  id: string
  name: string
  price: string
  quantity: number
  image: string
}

interface Order {
  id: string
  date: string
  total: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  courses: OrderItem[]
  products: OrderItem[]
  paymentMethod: string
}

const statusColorMap = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

const statusTextMap = {
  pending: 'Chờ xử lý',
  processing: 'Đang xử lý',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy'
}

// Mock data
const orders: Order[] = [
  {
    id: 'ORD-001',
    date: '15/03/2024',
    total: '1,200,000đ',
    status: 'completed',
    courses: [
      {
        id: 'COURSE-1',
        name: 'Kỹ năng giao tiếp cho trẻ 6-8 tuổi',
        price: '800,000đ',
        quantity: 1,
        image: '/courses/communication.jpg'
      }
    ],
    products: [
      {
        id: 'PROD-1',
        name: 'Sách hướng dẫn giới tính lứa tuổi thiếu niên',
        price: '400,000đ',
        quantity: 1,
        image: '/products/book.jpg'
      }
    ],
    paymentMethod: 'Thẻ tín dụng'
  }
  // Thêm các đơn hàng khác...
]

export default function OrderPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

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

      {/* Orders List */}
      <div className='space-y-4'>
        {orders.map((order) => (
          <Card key={order.id} className='overflow-hidden hover:border-primary/50 transition-colors'>
            <Link href={`/setting/order/${order.id}`}>
              <CardContent className='p-6'>
                <div className='flex flex-col gap-6'>
                  {/* Order Header */}
                  <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-medium'>Đơn hàng #{order.id}</h3>
                        <Badge className={statusColorMap[order.status]}>{statusTextMap[order.status]}</Badge>
                      </div>
                      <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          {order.date}
                        </div>
                        <div className='flex items-center gap-1'>
                          <CreditCard className='h-4 w-4' />
                          {order.paymentMethod}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className='h-5 w-5 text-muted-foreground' />
                  </div>

                  <Separator />

                  {/* Order Items */}
                  <div className='grid gap-4'>
                    {/* Courses */}
                    {order.courses.length > 0 && (
                      <div className='space-y-3'>
                        <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                          <BookOpen className='h-4 w-4' />
                          <span>Khóa học ({order.courses.length})</span>
                        </div>
                        <div className='grid gap-3'>
                          {order.courses.map((course) => (
                            <div key={course.id} className='flex items-center gap-3'>
                              <div className='w-12 h-12 rounded-lg bg-muted' />
                              <div>
                                <div className='font-medium'>{course.name}</div>
                                <div className='text-sm text-primary'>{course.price}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Products */}
                    {order.products.length > 0 && (
                      <div className='space-y-3'>
                        <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                          <Package className='h-4 w-4' />
                          <span>Sản phẩm ({order.products.length})</span>
                        </div>
                        <div className='grid gap-3'>
                          {order.products.map((product) => (
                            <div key={product.id} className='flex items-center gap-3'>
                              <div className='w-12 h-12 rounded-lg bg-muted' />
                              <div>
                                <div className='font-medium'>{product.name}</div>
                                <div className='text-sm text-primary'>{product.price}</div>
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
                    <div className='text-lg font-bold text-primary'>{order.total}</div>
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
