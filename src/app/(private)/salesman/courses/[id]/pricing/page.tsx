'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { mockCourses } from '../../../_mock/data'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CoursePricingPage({ params }: { params: { id: string } }) {
  const course = mockCourses.find((c) => c.id === params.id)
  const [price, setPrice] = useState(course?.price || '')
  const [discount, setDiscount] = useState(course?.discount || '')

  if (!course) {
    return <div>Không tìm thấy khóa học</div>
  }

  const handleSubmit = async () => {
    // API call to update price
    // Update status to pending_review
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' asChild>
          <Link href={`/salesman/courses/${params.id}`}>
            <ArrowLeft className='w-4 h-4' />
          </Link>
        </Button>
        <div>
          <h1 className='text-2xl font-bold'>Thiết lập giá khóa học</h1>
          <p className='text-sm text-muted-foreground'>Thiết lập giá bán và chương trình giảm giá cho khóa học</p>
        </div>
      </div>

      <div className='max-w-xl'>
        <Card>
          <CardHeader>
            <CardTitle>Thông tin giá</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Giá bán</label>
              <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Nhập giá bán...' />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Giảm giá (%)</label>
              <Input value={discount} onChange={(e) => setDiscount(e.target.value)} type='number' min={0} max={100} />
            </div>

            <div className='pt-4 space-x-2'>
              <Button onClick={handleSubmit}>Gửi duyệt</Button>
              <Button variant='outline' asChild>
                <Link href={`/salesman/courses/${params.id}`}>Hủy</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
