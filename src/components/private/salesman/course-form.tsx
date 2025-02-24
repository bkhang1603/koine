'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

interface CourseFormProps {
  initialData?: {
    name: string
    category: string
    price: string
    originalPrice: string
    status: string
    image: string
    description: string
    instructor: string
    duration: string
    level: string
  }
  onSubmit: (data: any) => void
  isEdit?: boolean
}

export function CourseForm({ initialData, onSubmit, isEdit }: CourseFormProps) {
  const [preview, setPreview] = useState<string | null>(initialData?.image || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreview(imageUrl)
    }
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' asChild>
          <Link href='/salesman/courses'>
            <ArrowLeft className='w-4 h-4' />
          </Link>
        </Button>
        <div>
          <h1 className='text-2xl font-bold'>{isEdit ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}</h1>
          <p className='text-sm text-muted-foreground'>
            {isEdit ? 'Cập nhật thông tin khóa học' : 'Tạo một khóa học mới'}
          </p>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className='space-y-6'>
        <div className='grid grid-cols-3 gap-6'>
          {/* Cột trái */}
          <Card className='col-span-2 space-y-6'>
            <CardHeader>
              <CardTitle>Thông tin khóa học</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Ảnh khóa học */}
              <div className='space-y-4'>
                <div>
                  <h3 className='font-medium mb-2'>Ảnh khóa học</h3>
                  <div className='flex items-center gap-6'>
                    <div className='relative w-40 h-40 rounded-lg overflow-hidden border'>
                      {preview ? (
                        <>
                          <Image src={preview} alt='Preview' fill className='object-cover' />
                          <Button
                            variant='ghost'
                            size='icon'
                            className='absolute top-2 right-2 bg-background/80 hover:bg-background/60'
                            onClick={() => setPreview(null)}
                          >
                            <X className='w-4 h-4' />
                          </Button>
                        </>
                      ) : (
                        <div className='w-full h-full flex items-center justify-center bg-muted'>
                          <Upload className='w-8 h-8 text-muted-foreground' />
                        </div>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <Button onClick={() => fileInputRef.current?.click()}>
                        Tải ảnh lên
                      </Button>
                      <p className='text-sm text-muted-foreground'>
                        Khuyến nghị kích thước 800x600px, tối đa 2MB
                      </p>
                    </div>
                    <input
                      type='file'
                      ref={fileInputRef}
                      className='hidden'
                      accept='image/*'
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Thông tin cơ bản */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Tên khóa học</label>
                  <Input defaultValue={initialData?.name} />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Giảng viên</label>
                  <Input defaultValue={initialData?.instructor} />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Danh mục</label>
                  <Select defaultValue={initialData?.category}>
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn danh mục' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='language'>Ngoại ngữ</SelectItem>
                      <SelectItem value='skill'>Kỹ năng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Trình độ</label>
                  <Select defaultValue={initialData?.level}>
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn trình độ' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='basic'>Cơ bản</SelectItem>
                      <SelectItem value='intermediate'>Trung cấp</SelectItem>
                      <SelectItem value='advanced'>Nâng cao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Thời lượng</label>
                  <Input defaultValue={initialData?.duration} />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Trạng thái</label>
                  <Select defaultValue={initialData?.status}>
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn trạng thái' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='active'>Đang mở</SelectItem>
                      <SelectItem value='inactive'>Tạm dừng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* Mô tả */}
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Mô tả khóa học</label>
                <Textarea 
                  defaultValue={initialData?.description} 
                  className='min-h-[120px]'
                  placeholder='Nhập mô tả chi tiết về khóa học...'
                />
              </div>

              {/* Nội dung học tập */}
              <div className='space-y-4'>
                <h3 className='font-medium'>Nội dung học tập</h3>
                <div className='grid grid-cols-2 gap-4'>
                  <Input placeholder='Số bài giảng' />
                  <Input placeholder='Số bài tập' />
                  <Input placeholder='Số tài liệu' />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Chứng chỉ' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='yes'>Có</SelectItem>
                      <SelectItem value='no'>Không</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cột phải */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Thông tin giá</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Giá bán</label>
                  <Input defaultValue={initialData?.price} />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Giá gốc</label>
                  <Input defaultValue={initialData?.originalPrice} />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Giảm giá (%)</label>
                  <Input type='number' min={0} max={100} />
                </div>
              </CardContent>
            </Card>

            <div className='flex flex-col gap-2'>
              <Button type='submit' onClick={() => onSubmit({})}>
                {isEdit ? 'Cập nhật khóa học' : 'Tạo khóa học'}
              </Button>
              <Button variant='outline' asChild>
                <Link href='/salesman/courses'>Hủy</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
} 