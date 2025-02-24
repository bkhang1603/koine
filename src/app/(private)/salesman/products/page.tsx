'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { ProductTable } from '@/components/private/salesman/product-table'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Package, DollarSign, ShoppingCart, Archive } from 'lucide-react'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold'>Quản lý sản phẩm</h1>
        <p className='text-muted-foreground mt-1'>Quản lý danh sách sản phẩm</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Tổng sản phẩm</CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>45</div>
            <p className='text-xs text-muted-foreground'>+5 sản phẩm mới</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Doanh số</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>25.500.000đ</div>
            <p className='text-xs text-muted-foreground'>+15% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Số lượng bán</CardTitle>
            <ShoppingCart className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>156</div>
            <p className='text-xs text-muted-foreground'>+23 đơn hàng mới</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Tồn kho</CardTitle>
            <Archive className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>324</div>
            <p className='text-xs text-muted-foreground'>12 sản phẩm sắp hết</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Tìm kiếm sản phẩm...'
              className='pl-8'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Danh mục' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả</SelectItem>
            <SelectItem value='book'>Sách</SelectItem>
            <SelectItem value='equipment'>Thiết bị</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Khoảng giá' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả</SelectItem>
            <SelectItem value='0-500000'>Dưới 500k</SelectItem>
            <SelectItem value='500000-1000000'>500k - 1 triệu</SelectItem>
            <SelectItem value='1000000+'>Trên 1 triệu</SelectItem>
          </SelectContent>
        </Select>
        <Button asChild className='w-full sm:w-auto'>
          <Link href='/salesman/products/new'>
            <Plus className='w-4 h-4 mr-2' />
            Thêm sản phẩm
          </Link>
        </Button>
      </div>

      {/* Table */}
      <ProductTable search={search} category={category} priceRange={priceRange} />
    </div>
  )
}
