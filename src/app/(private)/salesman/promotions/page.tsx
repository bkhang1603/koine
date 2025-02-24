'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, Percent, Calendar, Users, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { PromotionTable } from '@/components/private/salesman/promotion-table'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function PromotionsPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [status, setStatus] = useState('all')

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold'>Khuyến mãi</h1>
        <p className='text-muted-foreground mt-1'>Quản lý chương trình khuyến mãi</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Tổng khuyến mãi</CardTitle>
            <Percent className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>+3 chương trình mới</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Đang hoạt động</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>5</div>
            <p className='text-xs text-muted-foreground'>2 sắp kết thúc</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Lượt sử dụng</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,234</div>
            <p className='text-xs text-muted-foreground'>+256 lượt mới</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Doanh thu tăng</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>25%</div>
            <p className='text-xs text-muted-foreground'>+5% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Tìm kiếm khuyến mãi...'
              className='pl-8'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Loại' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả</SelectItem>
            <SelectItem value='percent'>Giảm theo %</SelectItem>
            <SelectItem value='fixed'>Giảm số tiền</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả</SelectItem>
            <SelectItem value='active'>Đang hoạt động</SelectItem>
            <SelectItem value='upcoming'>Sắp diễn ra</SelectItem>
            <SelectItem value='ended'>Đã kết thúc</SelectItem>
          </SelectContent>
        </Select>
        <Button asChild className='w-full sm:w-auto'>
          <Link href='/salesman/promotions/new'>
            <Plus className='w-4 h-4 mr-2' />
            Thêm khuyến mãi
          </Link>
        </Button>
      </div>

      {/* Table */}
      <PromotionTable search={search} type={type} status={status} />
    </div>
  )
}
