'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Clock } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface Course {
  id: number
  title: string
  progress: number
  totalLessons: number
  completedLessons: number
  duration: string
  status: 'in-progress' | 'not-started' | 'completed'
  image: string
}

export default function MyCoursesPage() {
  const [courses] = useState<Course[]>([
    {
      id: 1,
      title: 'Kỹ năng giao tiếp hiệu quả',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      duration: '4h 30m',
      status: 'in-progress',
      image: '/placeholder.svg?height=200&width=300'
    },
    {
      id: 2,
      title: 'Quản lý thời gian và năng suất',
      progress: 0,
      totalLessons: 15,
      completedLessons: 0,
      duration: '5h',
      status: 'not-started',
      image: '/placeholder.svg?height=200&width=300'
    },
    {
      id: 3,
      title: 'Kỹ năng thuyết trình chuyên nghiệp',
      progress: 100,
      totalLessons: 18,
      completedLessons: 18,
      duration: '6h',
      status: 'completed',
      image: '/placeholder.svg?height=200&width=300'
    },
    {
      id: 4,
      title: 'Kỹ năng giải quyết vấn đề',
      progress: 40,
      totalLessons: 12,
      completedLessons: 5,
      duration: '4h',
      status: 'in-progress',
      image: '/placeholder.svg?height=200&width=300'
    },
    {
      id: 5,
      title: 'Kỹ năng lãnh đạo',
      progress: 20,
      totalLessons: 25,
      completedLessons: 5,
      duration: '7h 30m',
      status: 'in-progress',
      image: '/placeholder.svg?height=200&width=300'
    }
  ])

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Khóa học của bạn</h3>
        <p className='text-sm text-muted-foreground'>
          Bạn có thể tiếp tục học hoặc bắt đầu học các khóa học mà bạn đã đăng ký tại đây.
        </p>
      </div>
      <Separator />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {courses.map((course) => (
          <Card key={course.id} className='flex flex-col overflow-hidden'>
            <div className='relative h-48'>
              <Image src={course.image} alt={course.title} layout='fill' objectFit='cover' />
            </div>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent className='flex-grow'>
              <div className='flex justify-between items-center mb-2'>
                <Badge
                  variant={
                    course.status === 'in-progress'
                      ? 'default'
                      : course.status === 'not-started'
                        ? 'secondary'
                        : 'green'
                  }
                >
                  {course.status === 'in-progress'
                    ? 'Đang học'
                    : course.status === 'not-started'
                      ? 'Chưa bắt đầu'
                      : 'Hoàn thành'}
                </Badge>
                <span className='text-sm text-muted-foreground'>
                  {course.completedLessons}/{course.totalLessons} bài học
                </span>
              </div>
              <Progress value={course.progress} className='mb-2' />
              <div className='flex justify-between text-sm text-muted-foreground'>
                <span>{course.progress}% hoàn thành</span>
                <span className='flex items-center'>
                  <Clock className='w-4 h-4 mr-1' />
                  {course.duration}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className='w-full' variant={course.status === 'not-started' ? 'default' : 'outline'}>
                <BookOpen className='w-4 h-4 mr-2' />
                {course.status === 'not-started' ? 'Bắt đầu học' : 'Tiếp tục học'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
