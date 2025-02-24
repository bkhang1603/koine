'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { Plus, ArrowLeft, ImagePlus, X } from 'lucide-react'
import Link from 'next/link'
import { CustomChapterList } from '@/components/public/custom-course/custom-chapter-list'
import Image from 'next/image'
import { ChapterPickerDialog } from '@/components/public/custom-course/chapter-picker-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface Chapter {
  id: string
  name: string
  description: string
  lessons: number
  courseId: string
  courseName: string
}

export default function CustomCoursePage() {
  const [image, setImage] = useState('')
  const [openChapterPicker, setOpenChapterPicker] = useState(false)
  const [chapters, setChapters] = useState<Chapter[]>([])

  const handleAddChapter = () => {
    setOpenChapterPicker(true)
  }

  const handleSelectChapters = (selectedChapters: Chapter[]) => {
    setChapters(prev => [...prev, ...selectedChapters])
  }

  const totalChapters = chapters.length
  const totalLessons = chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0)
  const coursesUsed = [...new Set(chapters.map(chapter => chapter.courseName))]

  return (
    <main className='container py-8 space-y-6'>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' asChild>
          <Link href='/course'>
            <ArrowLeft className='w-4 h-4' />
          </Link>
        </Button>
        <div>
          <h1 className='text-2xl font-bold'>Tạo khóa học theo yêu cầu</h1>
          <p className='text-muted-foreground mt-1'>Tự do thiết kế nội dung học tập theo nhu cầu của bạn</p>
        </div>
      </div>

      <div className='grid md:grid-cols-3 gap-6'>
        <div className='md:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khóa học</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <label className='text-sm font-medium'>Ảnh khóa học</label>
                <div className='mt-2'>
                  {image ? (
                    <div className='relative w-40 h-40 rounded-lg overflow-hidden'>
                      <Image 
                        src={image}
                        alt='Course image'
                        fill
                        className='object-cover'
                      />
                      <Button
                        variant='destructive'
                        size='icon'
                        className='absolute top-2 right-2'
                        onClick={() => setImage('')}
                      >
                        <X className='w-4 h-4' />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant='outline' 
                      className='w-40 h-40'
                      onClick={() => setImage('https://picsum.photos/400')} // Tạm thời dùng ảnh mẫu
                    >
                      <ImagePlus className='w-6 h-6' />
                    </Button>
                  )}
                </div>
                <p className='text-xs text-muted-foreground mt-2'>
                  Tải lên ảnh đại diện cho khóa học của bạn
                </p>
              </div>
              <div>
                <label className='text-sm font-medium'>Tên khóa học</label>
                <Input className='mt-2' placeholder='VD: IELTS Advanced Writing' />
              </div>
              <div>
                <label className='text-sm font-medium'>Mô tả</label>
                <Textarea 
                  className='mt-2' 
                  placeholder='Mô tả ngắn về mục tiêu và nội dung khóa học...'
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>Nội dung khóa học</CardTitle>
              <Button size='sm' onClick={handleAddChapter}>
                <Plus className='w-4 h-4 mr-2' />
                Thêm chương
              </Button>
            </CardHeader>
            <CardContent>
              <CustomChapterList chapters={chapters} onChange={setChapters} />
            </CardContent>
          </Card>
        </div>

        <Card className='h-fit'>
          <CardHeader>
            <CardTitle>Tóm tắt yêu cầu</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              <h3 className='font-medium mb-3'>Thông tin khóa học</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Tổng số chương</span>
                  <span className='font-medium'>{totalChapters} chương</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Tổng số bài học</span>
                  <span className='font-medium'>{totalLessons} bài</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className='font-medium mb-3'>Khóa học tham khảo</h3>
              <ScrollArea className='h-[100px]'>
                <div className='space-y-2 text-sm pr-4'>
                  {coursesUsed.map((course, index) => (
                    <div key={index} className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-primary' />
                      <span>{course}</span>
                    </div>
                  ))}
                  {coursesUsed.length === 0 && (
                    <div className='text-muted-foreground italic'>
                      Chưa có khóa học nào được chọn
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            <Separator />

            <div>
              <h3 className='font-medium mb-3'>Thứ tự các chương</h3>
              <ScrollArea className='h-[200px]'>
                <div className='space-y-2 text-sm pr-4'>
                  {chapters.map((chapter, index) => (
                    <div key={chapter.id} className='flex gap-2'>
                      <span className='text-muted-foreground min-w-[20px]'>{index + 1}.</span>
                      <div>
                        <div>{chapter.name}</div>
                        <div className='text-muted-foreground text-xs'>
                          {chapter.lessons.length} bài học
                        </div>
                      </div>
                    </div>
                  ))}
                  {chapters.length === 0 && (
                    <div className='text-muted-foreground italic'>
                      Chưa có chương nào được thêm vào
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            <Button className='w-full'>Gửi yêu cầu</Button>
            <p className='text-xs text-muted-foreground text-center'>
              Sau khi gửi yêu cầu, chúng tôi sẽ liên hệ với bạn để trao đổi chi tiết về giá và nội dung khóa học
            </p>
          </CardContent>
        </Card>
      </div>

      <ChapterPickerDialog 
        open={openChapterPicker}
        onOpenChange={setOpenChapterPicker}
        onSelect={handleSelectChapters}
      />
    </main>
  )
} 