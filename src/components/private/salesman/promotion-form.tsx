'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { DatePicker } from '@/components/ui/date-picker'

interface PromotionFormProps {
  initialData?: {
    name: string
    type: string
    discount: string
    appliedTo: string
    startDate: string
    endDate: string
    status: string
  }
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: any) => void
  isEdit?: boolean
}

export function PromotionForm({ initialData, onSubmit, isEdit }: PromotionFormProps) {
  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <Button variant='ghost' size='icon' asChild>
        <Link href='/salesman/promotions'>
          <ArrowLeft className='w-4 h-4' />
        </Link>
      </Button>

      <div>
        <h1 className='text-2xl font-bold'>{isEdit ? 'Chỉnh sửa khuyến mãi' : 'Thêm khuyến mãi mới'}</h1>
        <p className='text-muted-foreground mt-1'>
          {isEdit ? 'Cập nhật thông tin khuyến mãi' : 'Tạo một chương trình khuyến mãi mới'}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit({})
        }}
      >
        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Tên chương trình</label>
                <Input defaultValue={initialData?.name} />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Loại khuyến mãi</label>
                <Select defaultValue={initialData?.type}>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn loại khuyến mãi' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='percent'>Giảm theo phần trăm</SelectItem>
                    <SelectItem value='fixed'>Giảm số tiền cố định</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Mức giảm giá</label>
                <Input defaultValue={initialData?.discount} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Điều kiện áp dụng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Áp dụng cho</label>
                <Select defaultValue={initialData?.appliedTo}>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn đối tượng áp dụng' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Tất cả</SelectItem>
                    <SelectItem value='courses'>Khóa học</SelectItem>
                    <SelectItem value='products'>Sản phẩm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Thời gian bắt đầu</label>
                <DatePicker />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Thời gian kết thúc</label>
                <DatePicker />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='flex justify-end mt-6'>
          <div className='flex gap-2'>
            <Button variant='outline' asChild>
              <Link href='/salesman/promotions'>Hủy</Link>
            </Button>
            <Button type='submit'>{isEdit ? 'Cập nhật' : 'Tạo mới'}</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
