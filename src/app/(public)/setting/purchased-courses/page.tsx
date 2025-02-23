'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Search, Filter, PlayCircle, Users2, ChevronDown, Clock, BookOpen, Gift, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

interface PurchasedCourse {
  id: number
  title: string
  thumbnail: string
  price: number
  purchaseDate: string
  status: 'not_activated' | 'activated' | 'expired'
  activatedFor?: string
  activationType?: 'self' | 'child'
  duration: string
  totalLessons: number
  category: string
  validUntil?: string
}

const mockCourses: PurchasedCourse[] = [
  {
    id: 1,
    title: 'Kỹ năng giao tiếp hiệu quả',
    thumbnail: '/placeholder.svg?height=100&width=200',
    price: 599000,
    purchaseDate: '15/03/2024',
    status: 'not_activated',
    duration: '4h 30m',
    totalLessons: 20,
    category: 'Kỹ năng mềm'
  },
  {
    id: 2,
    title: 'Quản lý thời gian và năng suất',
    thumbnail: '/placeholder.svg?height=100&width=200',
    price: 799000,
    purchaseDate: '14/03/2024',
    status: 'activated',
    activatedFor: 'Nguyễn Văn A (Bản thân)',
    activationType: 'self',
    duration: '5h',
    totalLessons: 15,
    category: 'Kỹ năng mềm',
    validUntil: '14/03/2025'
  },
  {
    id: 3,
    title: 'Tư duy phản biện',
    thumbnail: '/placeholder.svg?height=100&width=200',
    price: 699000,
    purchaseDate: '13/03/2024',
    status: 'activated',
    activatedFor: 'Bé Na (Con)',
    activationType: 'child',
    duration: '6h',
    totalLessons: 18,
    category: 'Tư duy',
    validUntil: '13/03/2025'
  }
]

const mockChildAccounts = [
  { id: 1, name: 'Bé Na', age: 8 },
  { id: 2, name: 'Bé Bin', age: 10 }
]

export default function PurchasedCoursesPage() {
  const [courses] = useState(mockCourses)

  return (
    <div className='space-y-8'>
      {/* Stats Overview */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Tổng khóa học</CardTitle>
            <BookOpen className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{courses.length}</div>
            <p className='text-xs text-muted-foreground'>
              {courses.filter((c) => c.status === 'activated').length} khóa học đã kích hoạt
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Tổng giá trị</CardTitle>
            <Sparkles className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {courses.reduce((sum, course) => sum + course.price, 0).toLocaleString('vi-VN')} VNĐ
            </div>
            <p className='text-xs text-muted-foreground'>Đã đầu tư cho việc học</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Thời lượng</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>15.5 giờ</div>
            <p className='text-xs text-muted-foreground'>Tổng thời lượng học tập</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold tracking-tight'>Khóa học của bạn</h2>
          <Tabs defaultValue='all' className='w-[400px]'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='all'>Tất cả</TabsTrigger>
              <TabsTrigger value='activated'>Đã kích hoạt</TabsTrigger>
              <TabsTrigger value='not_activated'>Chưa kích hoạt</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className='flex gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input className='pl-9' placeholder='Tìm kiếm khóa học...' />
          </div>
          <Button variant='outline' size='icon'>
            <Filter className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Course Grid - New Design */}
      <div className='grid gap-6 md:grid-cols-2'>
        {courses.map((course) => (
          <Card key={course.id} className='overflow-hidden hover:shadow-lg transition-shadow'>
            <CardContent className='p-0 flex flex-col h-full'>
              {/* Course Header */}
              <div className='relative h-40 flex-shrink-0'>
                <Image src={course.thumbnail} alt={course.title} fill className='object-cover' />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent' />
                <div className='absolute inset-0 p-4 flex flex-col justify-between'>
                  <div className='flex justify-between items-start'>
                    <Badge variant='outline' className='bg-black/50 text-white border-none'>
                      {course.category}
                    </Badge>
                    <Badge variant={getStatusConfig(course.status).variant} className='shadow-sm'>
                      {getStatusConfig(course.status).label}
                    </Badge>
                  </div>
                  <h3 className='text-lg font-semibold text-white line-clamp-2'>{course.title}</h3>
                </div>
              </div>

              {/* Course Content Wrapper */}
              <div className='flex-1 flex flex-col p-4'>
                {/* Basic Info */}
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div className='space-y-1'>
                    <p className='text-muted-foreground'>Thời lượng</p>
                    <p className='font-medium flex items-center gap-1'>
                      <Clock className='w-4 h-4' />
                      {course.duration}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-muted-foreground'>Số bài học</p>
                    <p className='font-medium flex items-center gap-1'>
                      <BookOpen className='w-4 h-4' />
                      {course.totalLessons} bài
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-muted-foreground'>Ngày mua</p>
                    <p className='font-medium'>{course.purchaseDate}</p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-muted-foreground'>Thời hạn</p>
                    <p className='font-medium'>{course.validUntil || 'Vĩnh viễn'}</p>
                  </div>
                </div>

                {/* Status Specific Content */}
                <div className='flex-1 py-4'>
                  {course.status === 'activated' ? (
                    <div className='space-y-3'>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                          <Users2 className='w-4 h-4 text-primary' />
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>Đã kích hoạt cho</p>
                          <p className='font-medium'>{course.activatedFor}</p>
                        </div>
                      </div>
                      <div className='space-y-1.5'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-muted-foreground'>Tiến độ học tập</span>
                          <span className='font-medium'>45%</span>
                        </div>
                        <Progress value={45} className='h-1.5' />
                      </div>
                    </div>
                  ) : course.status === 'expired' ? (
                    <div className='space-y-3'>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center'>
                          <Clock className='w-4 h-4 text-destructive' />
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>Trạng thái</p>
                          <p className='font-medium text-destructive'>Khóa học đã hết hạn</p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <Clock className='w-4 h-4' />
                        <span>Hết hạn vào ngày {course.validUntil}</span>
                      </div>
                    </div>
                  ) : (
                    <div className='space-y-3'>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                          <Gift className='w-4 h-4 text-primary' />
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>Trạng thái</p>
                          <p className='font-medium'>Chưa kích hoạt</p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground pt-2'>
                        <Users2 className='w-4 h-4' />
                        <span>Có thể kích hoạt cho bản thân hoặc tài khoản con</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions - Will always stay at bottom */}
                <div className='flex items-center gap-2 pt-2 border-t mt-auto'>
                  {course.status === 'not_activated' ? (
                    <>
                      <Button className='flex-1' variant='default'>
                        <Gift className='w-4 h-4 mr-2' />
                        Kích hoạt cho bản thân
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='outline' size='icon'>
                            <Users2 className='w-4 h-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-48'>
                          <DropdownMenuItem disabled className='text-muted-foreground font-medium'>
                            Kích hoạt cho con
                          </DropdownMenuItem>
                          {mockChildAccounts.map((child) => (
                            <DropdownMenuItem key={child.id}>
                              {child.name} ({child.age} tuổi)
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  ) : course.status === 'activated' ? (
                    course.activationType === 'self' ? (
                      <Button className='flex-1' variant='default'>
                        <PlayCircle className='w-4 h-4 mr-2' />
                        Vào học ngay
                      </Button>
                    ) : (
                      <div className='flex-1 flex items-center justify-between px-4 py-2 bg-muted rounded-md'>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                          <Users2 className='w-4 h-4' />
                          Đã kích hoạt cho {course.activatedFor}
                        </div>
                        <Badge variant='outline'>Không thể truy cập</Badge>
                      </div>
                    )
                  ) : (
                    <Button className='flex-1' variant='default'>
                      <Sparkles className='w-4 h-4 mr-2' />
                      Gia hạn khóa học
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function getStatusConfig(status: PurchasedCourse['status']) {
  switch (status) {
    case 'activated':
      return { variant: 'green' as const, label: 'Đã kích hoạt' }
    case 'expired':
      return { variant: 'destructive' as const, label: 'Hết hạn' }
    default:
      return { variant: 'secondary' as const, label: 'Chưa kích hoạt' }
  }
}
