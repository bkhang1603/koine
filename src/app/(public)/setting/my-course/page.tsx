'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Clock, Search, BarChart2, PlayCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Course {
  id: number
  title: string
  description: string
  progress: number
  totalLessons: number
  completedLessons: number
  duration: string
  status: 'in-progress' | 'not-started' | 'completed'
  image: string
  lastAccessed?: string
  category: string
  instructor: string
  nextLesson: string
}

export default function MyCoursesPage() {
  const [courses] = useState<Course[]>([
    {
      id: 1,
      title: 'Kỹ năng giao tiếp hiệu quả',
      description: 'Khóa học giúp bạn phát triển kỹ năng giao tiếp trong môi trường công việc và cuộc sống.',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      duration: '4h 30m',
      status: 'in-progress',
      image: '/placeholder.svg?height=200&width=300',
      lastAccessed: '2 giờ trước',
      category: 'Kỹ năng mềm',
      instructor: 'Nguyễn Văn A',
      nextLesson: 'Bài 16: Kỹ năng thuyết trình'
    },
    {
      id: 2,
      title: 'Quản lý thời gian và năng suất',
      description: 'Khóa học giúp bạn quản lý thời gian hiệu quả và tăng năng suất làm việc.',
      progress: 0,
      totalLessons: 15,
      completedLessons: 0,
      duration: '5h',
      status: 'not-started',
      image: '/placeholder.svg?height=200&width=300',
      lastAccessed: 'Chưa bắt đầu',
      category: 'Kỹ năng mềm',
      instructor: 'Nguyễn Văn B',
      nextLesson: 'Bài 1: Giới thiệu khóa học'
    }
  ])

  return (
    <div className='space-y-8'>
      {/* Header Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-primary/10 rounded-xl p-6 space-y-2'>
          <div className='flex items-center gap-2 text-primary'>
            <PlayCircle className='h-5 w-5' />
            <h4 className='font-medium'>Đang học</h4>
          </div>
          <p className='text-2xl font-bold'>{courses.filter((c) => c.status === 'in-progress').length} khóa học</p>
          <p className='text-sm text-muted-foreground'>
            {courses.filter((c) => c.status === 'not-started').length} khóa học sắp hoàn thành
          </p>
        </div>
        <div className='bg-green-50 rounded-xl p-6 space-y-2'>
          <div className='flex items-center gap-2 text-green-600'>
            <BarChart2 className='h-5 w-5' />
            <h4 className='font-medium'>Tiến độ</h4>
          </div>
          <p className='text-2xl font-bold'>
            {Math.round(courses.reduce((total, c) => total + c.progress, 0) / courses.length)}%
          </p>
          <p className='text-sm text-muted-foreground'>Tăng 12% so với tuần trước</p>
        </div>
        <div className='bg-orange-50 rounded-xl p-6 space-y-2'>
          <div className='flex items-center gap-2 text-orange-600'>
            <Clock className='h-5 w-5' />
            <h4 className='font-medium'>Thời gian học</h4>
          </div>
          <p className='text-2xl font-bold'>
            {Math.round(
              courses.reduce((total, c) => {
                const hours = parseInt(c.duration.split('h')[0]) || 0
                const mins = parseInt(c.duration.split('m')[0]) || 0
                return total + hours * 60 + mins
              }, 0) /
                courses.length /
                60
            )}{' '}
            giờ
          </p>
          <p className='text-sm text-muted-foreground'>Trong tháng này</p>
        </div>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1 flex gap-4'>
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input placeholder='Tìm khóa học...' className='pl-9' />
          </div>
          <Select defaultValue='all'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Danh mục' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả danh mục</SelectItem>
              <SelectItem value='soft-skills'>Kỹ năng mềm</SelectItem>
              <SelectItem value='technical'>Kỹ thuật</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Tabs defaultValue='all' className='w-full sm:w-auto'>
          <TabsList className='grid w-full sm:w-auto grid-cols-3'>
            <TabsTrigger value='all'>Tất cả</TabsTrigger>
            <TabsTrigger value='in-progress'>Đang học</TabsTrigger>
            <TabsTrigger value='completed'>Đã xong</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Course List */}
      <div className='grid gap-6'>
        {courses.map((course) => (
          <div
            key={course.id}
            className='group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all'
          >
            <div className='flex flex-col md:flex-row'>
              {/* Course Image */}
              <div className='relative h-48 md:h-auto md:w-72 xl:w-96'>
                <Image
                  src={course.image}
                  alt={course.title}
                  layout='fill'
                  objectFit='cover'
                  className='group-hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />
                <Badge className='absolute top-4 left-4' variant={course.status === 'completed' ? 'green' : 'default'}>
                  {course.status === 'completed' ? 'Hoàn thành' : `${course.progress}% hoàn thành`}
                </Badge>
              </div>

              {/* Course Content */}
              <div className='flex-1 p-6'>
                <div className='flex flex-col h-full'>
                  <div className='space-y-4'>
                    {/* Header */}
                    <div>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
                        <Badge variant='outline'>{course.category}</Badge>
                        <span>•</span>
                        <span className='flex items-center gap-1'>
                          <Clock className='h-4 w-4' />
                          {course.duration}
                        </span>
                      </div>
                      <h3 className='text-xl font-semibold group-hover:text-primary transition-colors'>
                        {course.title}
                      </h3>
                      <p className='text-sm text-muted-foreground mt-1'>Giảng viên: {course.instructor}</p>
                    </div>

                    {/* Progress */}
                    <div className='space-y-2'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>Tiến độ khóa học</span>
                        <span className='font-medium'>
                          {course.completedLessons}/{course.totalLessons} bài học
                        </span>
                      </div>
                      <Progress value={course.progress} className='h-2' />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className='mt-6 pt-6 border-t flex items-center justify-between'>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>Bài học tiếp theo</p>
                      <p className='text-sm text-muted-foreground'>{course.nextLesson}</p>
                    </div>
                    <Button>
                      <PlayCircle className='mr-2 h-4 w-4' />
                      Tiếp tục học
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
