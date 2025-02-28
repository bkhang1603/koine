'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, ArrowUpDown, DollarSign, Package } from 'lucide-react'
import { useState } from 'react'
import { OrderTable } from '@/components/private/salesman/order-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function OrdersPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold'>Đơn hàng</h1>
        <p className='text-muted-foreground mt-1'>Quản lý danh sách đơn hàng</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Tổng đơn hàng</CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>123</div>
            <p className='text-xs text-muted-foreground'>+8% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Doanh thu</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>45.500.000đ</div>
            <p className='text-xs text-muted-foreground'>+12% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Đơn chờ xử lý</CardTitle>
            <ArrowUpDown className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>4 đơn mới hôm nay</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Tỷ lệ hoàn thành</CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>95%</div>
            <p className='text-xs text-muted-foreground'>+2% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Tìm kiếm đơn hàng...'
              className='pl-8'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả</SelectItem>
            <SelectItem value='pending'>Chờ xử lý</SelectItem>
            <SelectItem value='processing'>Đang xử lý</SelectItem>
            <SelectItem value='completed'>Hoàn thành</SelectItem>
            <SelectItem value='cancelled'>Đã hủy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <OrderTable search={search} status={status} />
    </div>
  )
}
