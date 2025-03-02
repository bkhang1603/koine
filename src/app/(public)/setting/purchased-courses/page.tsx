'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Search, Filter, PlayCircle, Users2, Clock, BookOpen, Gift, Sparkles, Calendar } from 'lucide-react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

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
      {/* Header */}
      <div>
        <h3 className='text-2xl font-semibold'>Khóa học đã mua</h3>
        <p className='text-sm text-gray-500 mt-1'>Quản lý và kích hoạt các khóa học bạn đã mua</p>
      </div>

      {/* Stats Overview */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='relative overflow-hidden border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10'>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-4'>
              <div className='h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center'>
                <BookOpen className='h-7 w-7 text-primary' />
              </div>
              <div className='relative'>
                <p className='text-sm text-gray-600 font-medium'>Tổng khóa học</p>
                <div className='flex items-baseline gap-1 mt-1'>
                  <span className='text-2xl font-bold text-gray-900'>{courses.length}</span>
                  <span className='text-sm text-gray-500'>khóa học</span>
                </div>
              </div>
            </div>
            <div className='absolute right-4 bottom-4 opacity-10'>
              <BookOpen className='h-16 w-16 text-primary' />
            </div>
          </CardContent>
        </Card>

        <Card className='relative overflow-hidden border-none shadow-md bg-gradient-to-br from-green-50 to-green-100/50'>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-4'>
              <div className='h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center'>
                <Sparkles className='h-7 w-7 text-green-600' />
              </div>
              <div className='relative'>
                <p className='text-sm text-gray-600 font-medium'>Tổng giá trị</p>
                <div className='flex items-baseline gap-1 mt-1'>
                  <span className='text-2xl font-bold text-gray-900'>
                    {courses.reduce((sum, course) => sum + course.price, 0).toLocaleString('vi-VN')}
                  </span>
                  <span className='text-sm text-gray-500'>VNĐ</span>
                </div>
              </div>
            </div>
            <div className='absolute right-4 bottom-4 opacity-10'>
              <Sparkles className='h-16 w-16 text-green-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='relative overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-50 to-blue-100/50'>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-4'>
              <div className='h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center'>
                <Clock className='h-7 w-7 text-blue-600' />
              </div>
              <div className='relative'>
                <p className='text-sm text-gray-600 font-medium'>Thời lượng</p>
                <div className='flex items-baseline gap-1 mt-1'>
                  <span className='text-2xl font-bold text-gray-900'>15.5</span>
                  <span className='text-sm text-gray-500'>giờ</span>
                </div>
              </div>
            </div>
            <div className='absolute right-4 bottom-4 opacity-10'>
              <Clock className='h-16 w-16 text-blue-600' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className='border-none shadow-md'>
        <CardContent className='p-6'>
          <div className='flex-1 flex justify-between gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                placeholder='Tìm kiếm khóa học...'
                className='pl-9 border-gray-200 focus:border-primary/30 focus:ring-primary/20'
              />
            </div>
            <Button variant='outline' size='icon' className='border-gray-200 hover:bg-gray-100'>
              <Filter className='h-4 w-4 text-gray-500' />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className='grid gap-6 md:grid-cols-2'>
        {courses.map((course) => (
          <Card
            key={course.id}
            className={cn(
              'group border-none shadow-md overflow-hidden transition-all duration-300',
              'hover:shadow-xl hover:shadow-primary/10'
            )}
          >
            <CardContent className='p-0 flex flex-col h-full'>
              {/* Course Header */}
              <div className='relative h-48 flex-shrink-0'>
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' />
                <div className='absolute inset-0 p-6 flex flex-col justify-between'>
                  <div className='flex justify-between items-start'>
                    <Badge variant='outline' className='bg-black/50 text-white border-none backdrop-blur-sm'>
                      {course.category}
                    </Badge>
                    <Badge variant={getStatusConfig(course.status).variant} className='shadow-sm backdrop-blur-sm'>
                      {getStatusConfig(course.status).label}
                    </Badge>
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-white line-clamp-2 group-hover:text-primary/90 transition-colors'>
                      {course.title}
                    </h3>
                    <p className='text-sm text-gray-200 mt-2 line-clamp-2'>
                      Khóa học {course.totalLessons} bài • {course.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className='flex-1 flex flex-col p-6 bg-gradient-to-b from-gray-50 to-white'>
                {/* Info Grid */}
                <div className='grid grid-cols-2 gap-6 p-4 bg-white rounded-xl border border-gray-100'>
                  <div className='space-y-1'>
                    <p className='text-xs font-medium text-gray-500 uppercase tracking-wider'>Ngày mua</p>
                    <p className='font-medium text-gray-700 flex items-center gap-2'>
                      <Clock className='w-4 h-4 text-gray-400' />
                      {course.purchaseDate}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-xs font-medium text-gray-500 uppercase tracking-wider'>Thời hạn</p>
                    <p className='font-medium text-gray-700 flex items-center gap-2'>
                      <Calendar className='w-4 h-4 text-gray-400' />
                      {course.validUntil || 'Vĩnh viễn'}
                    </p>
                  </div>
                </div>

                {/* Status Content */}
                <div className='flex-1 py-6'>
                  {course.status === 'activated' ? (
                    <div className='space-y-4'>
                      <div className='flex items-center gap-4 p-3 rounded-lg bg-primary/5 border border-primary/10'>
                        <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
                          <Users2 className='w-5 h-5 text-primary' />
                        </div>
                        <div>
                          <p className='text-sm font-medium text-gray-900'>{course.activatedFor}</p>
                          <p className='text-sm text-gray-500'>Đã kích hoạt khóa học</p>
                        </div>
                      </div>
                      {course.activationType === 'self' && (
                        <div className='space-y-2'>
                          <div className='flex justify-between text-sm'>
                            <span className='font-medium text-gray-900'>Tiến độ học tập</span>
                            <span className='text-primary font-semibold'>45%</span>
                          </div>
                          <Progress value={45} className='h-2 bg-primary/10' />
                        </div>
                      )}
                    </div>
                  ) : course.status === 'expired' ? (
                    <div className='p-4 rounded-lg bg-red-50 border border-red-100 space-y-3'>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-full bg-red-100 flex items-center justify-center'>
                          <Clock className='w-5 h-5 text-red-600' />
                        </div>
                        <div>
                          <p className='font-medium text-red-900'>Khóa học đã hết hạn</p>
                          <p className='text-sm text-red-600'>Hết hạn vào ngày {course.validUntil}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='p-4 rounded-lg bg-blue-50 border border-blue-100 space-y-3'>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center'>
                          <Gift className='w-5 h-5 text-blue-600' />
                        </div>
                        <div>
                          <p className='font-medium text-blue-900'>Chưa kích hoạt</p>
                          <p className='text-sm text-blue-600'>Có thể kích hoạt cho bản thân hoặc tài khoản con</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className='pt-4 border-t border-dashed'>
                  {course.status === 'not_activated' ? (
                    <div className='flex gap-2'>
                      <Button
                        className='flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary
                          shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20'
                      >
                        <Gift className='w-4 h-4 mr-2' />
                        Kích hoạt cho bản thân
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='outline'
                            size='icon'
                            className='border-gray-200 hover:border-primary/30 hover:bg-primary/5'
                          >
                            <Users2 className='w-4 h-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-56'>
                          <DropdownMenuItem disabled className='text-gray-500 font-medium'>
                            Kích hoạt cho con
                          </DropdownMenuItem>
                          {mockChildAccounts.map((child) => (
                            <DropdownMenuItem
                              key={child.id}
                              className='flex items-center gap-2 cursor-pointer hover:bg-primary/5'
                            >
                              <div className='h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center'>
                                <Users2 className='w-3 h-3 text-primary' />
                              </div>
                              {child.name} ({child.age} tuổi)
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : course.status === 'activated' ? (
                    course.activationType === 'self' ? (
                      <Button
                        className='w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary
                          shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20'
                      >
                        <PlayCircle className='w-4 h-4 mr-2' />
                        Vào học ngay
                      </Button>
                    ) : (
                      <div className='flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-100'>
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                          <Users2 className='w-4 h-4' />
                          Đã kích hoạt cho {course.activatedFor}
                        </div>
                        <Badge variant='outline' className='bg-white border-gray-200'>
                          Không thể truy cập
                        </Badge>
                      </div>
                    )
                  ) : (
                    <Button
                      className='w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary
                        shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20'
                    >
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
