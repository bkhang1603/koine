'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText, Plus, Eye, EyeOff, Trash2, Clock, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { MOCK_ACCOUNT } from '../page'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'

export default function CoursesPage() {
  const [account] = useState(MOCK_ACCOUNT)

  return (
    <div className='space-y-6'>
      {/* Course Management Controls */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Select defaultValue='all'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả khóa học</SelectItem>
              <SelectItem value='active'>Đang học</SelectItem>
              <SelectItem value='hidden'>Đang ẩn</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline'>
            <FileText className='w-4 h-4 mr-2' />
            Xuất báo cáo
          </Button>
        </div>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          Thêm khóa học mới
        </Button>
      </div>

      {/* Course List */}
      <div className='space-y-4'>
        {account.currentCourses.map((course) => (
          <Card key={course.id}>
            <CardContent className='p-6'>
              <div className='flex gap-6'>
                <div className='relative w-48 aspect-video rounded-lg overflow-hidden'>
                  <Image src={course.thumbnail} alt={course.title} fill className='object-cover' />
                  <Badge className='absolute top-2 right-2 bg-black/50'>Đang hiển thị</Badge>
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3 className='font-medium'>{course.title}</h3>
                      <p className='text-sm text-gray-500 mt-1'>
                        {course.completedLessons}/{course.totalLessons} bài học • Cập nhật{' '}
                        {course.lastAccessed.toLocaleDateString()}
                      </p>
                    </div>
                    <div className='flex gap-2'>
                      <Button variant='outline' size='sm'>
                        <Eye className='w-4 h-4 mr-2' />
                        Ẩn khóa học
                      </Button>
                      <Button variant='ghost' size='sm' className='text-red-500'>
                        <Trash2 className='w-4 h-4 mr-2' />
                        Xóa
                      </Button>
                    </div>
                  </div>
                  <div className='mt-4 space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>Tiến độ học tập</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className='h-2' />
                  </div>
                  <div className='mt-4 grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg text-sm'>
                    <div>
                      <p className='text-gray-500'>Thời gian học</p>
                      <p className='font-medium'>12h 30m</p>
                    </div>
                    <div>
                      <p className='text-gray-500'>Điểm trung bình</p>
                      <p className='font-medium'>8.5/10</p>
                    </div>
                    <div>
                      <p className='text-gray-500'>Trạng thái</p>
                      <p className='font-medium text-green-600'>Đang học</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
