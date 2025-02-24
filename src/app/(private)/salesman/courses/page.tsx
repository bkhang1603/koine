'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { CourseTable } from '@/components/private/salesman/course-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, DollarSign, Users, Star } from 'lucide-react'

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Khóa học</h1>
        <p className='text-muted-foreground mt-1'>Quản lý danh sách khóa học</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Tổng khóa học</CardTitle>
            <GraduationCap className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>24</div>
            <p className='text-xs text-muted-foreground'>+3 khóa học mới</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Doanh thu</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>35.500.000đ</div>
            <p className='text-xs text-muted-foreground'>+20% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Học viên</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>580</div>
            <p className='text-xs text-muted-foreground'>+45 học viên mới</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Đánh giá</CardTitle>
            <Star className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>4.8</div>
            <p className='text-xs text-muted-foreground'>+125 đánh giá mới</p>
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Tìm kiếm khóa học...'
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
            <SelectItem value='language'>Ngoại ngữ</SelectItem>
            <SelectItem value='skill'>Kỹ năng</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Khoảng giá' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả</SelectItem>
            <SelectItem value='0-1000000'>Dưới 1 triệu</SelectItem>
            <SelectItem value='1000000-2000000'>1-2 triệu</SelectItem>
            <SelectItem value='2000000+'>Trên 2 triệu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CourseTable search={search} category={category} priceRange={priceRange} />
    </div>
  )
}
