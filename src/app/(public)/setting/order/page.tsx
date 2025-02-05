'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Package, DollarSign, Clock } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'

interface Order {
  id: string
  date: string
  total: number
  status: 'processing' | 'shipped' | 'delivered'
  items: { name: string; quantity: number }[]
}

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    date: '2023-06-15',
    total: 599000,
    status: 'delivered',
    items: [{ name: 'Kỹ năng giao tiếp hiệu quả', quantity: 1 }]
  },
  {
    id: 'ORD002',
    date: '2023-06-20',
    total: 1048000,
    status: 'processing',
    items: [
      { name: 'Quản lý thời gian và năng suất', quantity: 1 },
      { name: 'Bộ sách kỹ năng mềm', quantity: 1 }
    ]
  },
  {
    id: 'ORD003',
    date: '2023-06-25',
    total: 799000,
    status: 'shipped',
    items: [{ name: 'Kỹ năng thuyết trình chuyên nghiệp', quantity: 1 }]
  },
  {
    id: 'ORD004',
    date: '2023-06-30',
    total: 1299000,
    status: 'processing',
    items: [
      { name: 'Kỹ năng lãnh đạo', quantity: 1 },
      { name: 'Kỹ năng giải quyết vấn đề', quantity: 1 }
    ]
  },
  {
    id: 'ORD005',
    date: '2023-07-05',
    total: 499000,
    status: 'delivered',
    items: [{ name: 'Kỹ năng quản lý cảm xúc', quantity: 1 }]
  }
]

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | undefined>()

  const filteredOrders = orders.filter(
    (order) =>
      (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      (!statusFilter || order.status === statusFilter)
  )

  const totalOrders = filteredOrders.length
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0)
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Đơn hàng của bạn</h3>
        <p className='text-sm text-muted-foreground'>
          Xem thông tin đơn hàng, trạng thái và chi tiết của đơn hàng của bạn.
        </p>
      </div>
      <Separator />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Tổng số đơn hàng</CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Tổng doanh thu</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalRevenue.toLocaleString('vi-VN')} VNĐ</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Giá trị đơn hàng trung bình</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{averageOrderValue.toLocaleString('vi-VN')} VNĐ</div>
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0'>
        <div className='relative w-[350px]'>
          <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
          <Input
            className='pl-8'
            placeholder='Tìm kiếm đơn hàng...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className='w-full sm:w-40'>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'all'}>Tất cả</SelectItem>
            <SelectItem value='processing'>Đang xử lý</SelectItem>
            <SelectItem value='shipped'>Đã gửi hàng</SelectItem>
            <SelectItem value='delivered'>Đã giao hàng</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow className='h-16'>
              <TableHead className='pl-4'>Mã</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead className='text-right pr-4'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className='h-16'>
                <TableCell className='font-medium pl-4'>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total.toLocaleString('vi-VN')} VNĐ</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === 'processing' ? 'default' : order.status === 'shipped' ? 'secondary' : 'green'
                    }
                  >
                    {order.status === 'processing'
                      ? 'Đang xử lý'
                      : order.status === 'shipped'
                        ? 'Đã gửi hàng'
                        : 'Đã giao hàng'}
                  </Badge>
                </TableCell>
                <TableCell>{order.items.map((item) => `${item.name} (x${item.quantity})`).join(', ')}</TableCell>
                <TableCell className='text-right pr-4'>
                  <Button variant='outline' size='sm'>
                    Chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className='mt-4 flex justify-center'>
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
