'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { blogCategories } from '@/app/(private)/content-creator/_mock/data'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import RichTextEditor from '@/components/rich-text-editor'
import { useState, useRef } from 'react'
import Image from 'next/image'

export default function NewBlogPage() {
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreview(imageUrl)
    }
  }

  const removeImage = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      {/* Back Button */}
      <Button variant='ghost' asChild className='mb-6'>
        <Link href='/content-creator/blog'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Quay lại
        </Link>
      </Button>

      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Tạo bài viết mới</h1>
          <p className='text-sm text-muted-foreground mt-1'>Tạo và xuất bản bài viết của bạn</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='outline'>Lưu nháp</Button>
          <Button>Xuất bản</Button>
        </div>
      </div>

      <div className='grid gap-6'>
        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin bài viết</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Tiêu đề</label>
              <Input placeholder='Nhập tiêu đề bài viết' />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>Mô tả ngắn</label>
              <Textarea placeholder='Nhập mô tả ngắn về bài viết' />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>Nội dung</label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt bài viết</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Ảnh đại diện</label>
              <div className='border-2 border-dashed rounded-lg p-4'>
                {preview ? (
                  <div className='relative aspect-video'>
                    <Image src={preview} alt='Preview' fill className='object-cover rounded-md' />
                    <Button variant='destructive' size='icon' className='absolute top-2 right-2' onClick={removeImage}>
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                ) : (
                  <div className='text-center'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleFileChange}
                      className='hidden'
                      ref={fileInputRef}
                    />
                    <Button variant='outline' onClick={() => fileInputRef.current?.click()}>
                      <Upload className='w-4 h-4 mr-2' />
                      Tải ảnh lên
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>Danh mục</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn danh mục' />
                </SelectTrigger>
                <SelectContent>
                  {blogCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
