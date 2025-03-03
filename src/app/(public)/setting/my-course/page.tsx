'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Clock, Search, PlayCircle, BookOpen, GraduationCap, Trophy, BookOpenCheck, ShoppingBag } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useCourseByAccount } from '@/queries/useAccount'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

export default function MyCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')

  const { data, isLoading, isError } = useCourseByAccount()
  const allCourses = data?.payload.data || []

  // Filtered courses based on search query and category
  const courses = allCourses.filter((course) => {
    const matchesSearch =
      searchQuery.trim() === '' ? true : course.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = category === 'all' ? true : course.categories.some((c) => c.id === category)

    return matchesSearch && matchesCategory
  })

  // Stats calculation helpers
  const calculateAverageProgress = () => {
    if (courses.length === 0) return 0
    return Math.round(courses.reduce((total, c) => total + c.completionRate, 0) / courses.length)
  }

  const calculateTotalHours = () => {
    if (courses.length === 0) return 0
    return Math.round(
      courses.reduce((total, c) => {
        const hours = parseInt(c.durationDisplay.split('h')[0]) || 0
        const mins = parseInt(c.durationDisplay.split('m')[0].split(' ').pop() || '0') || 0
        return total + hours * 60 + mins
      }, 0) / 60
    )
  }

  return (
    <div className='space-y-8'>
      <div>
        <h3 className='text-2xl font-semibold'>Khóa học của tôi</h3>
        <p className='text-sm text-gray-500 mt-1'>Quản lý và theo dõi tiến độ học tập của bạn</p>
      </div>

      {/* Stats Cards - Loading State */}
      {isLoading ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[1, 2, 3].map((i) => (
            <Card key={`stat-skeleton-${i}`} className='relative overflow-hidden border-none shadow-md'>
              <CardContent className='pt-6'>
                <div className='flex items-center gap-4'>
                  <Skeleton className='h-14 w-14 rounded-xl' />
                  <div className='space-y-3'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-6 w-32' />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Stats Cards - Actual Content */
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card className='relative overflow-hidden border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10'>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-4'>
                <div className='h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center'>
                  <GraduationCap className='h-7 w-7 text-primary' />
                </div>
                <div className='relative'>
                  <p className='text-sm text-gray-600 font-medium'>Đang học</p>
                  <div className='flex items-baseline gap-1 mt-1'>
                    <span className='text-2xl font-bold text-gray-900'>{courses.length}</span>
                    <span className='text-sm text-gray-500'>khóa học</span>
                  </div>
                </div>
              </div>
              <div className='absolute right-4 bottom-4 opacity-10'>
                <GraduationCap className='h-16 w-16 text-primary' />
              </div>
            </CardContent>
          </Card>

          <Card className='relative overflow-hidden border-none shadow-md bg-gradient-to-br from-green-50 to-green-100/50'>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-4'>
                <div className='h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center'>
                  <Trophy className='h-7 w-7 text-green-600' />
                </div>
                <div className='relative'>
                  <p className='text-sm text-gray-600 font-medium'>Tiến độ trung bình</p>
                  <div className='flex items-baseline gap-2 mt-1'>
                    <span className='text-2xl font-bold text-gray-900'>{calculateAverageProgress()}%</span>
                    <span className='text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded'>+12%</span>
                  </div>
                </div>
              </div>
              <div className='absolute right-4 bottom-4 opacity-10'>
                <Trophy className='h-16 w-16 text-green-600' />
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
                  <p className='text-sm text-gray-600 font-medium'>Thời gian học</p>
                  <div className='flex items-baseline gap-1 mt-1'>
                    <span className='text-2xl font-bold text-gray-900'>{calculateTotalHours()}</span>
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
      )}

      {/* Filters */}
      <Card className='border-none shadow-md'>
        <CardContent className='p-6'>
          <div className='flex-1 flex flex-col sm:flex-row justify-between gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                placeholder='Tìm khóa học...'
                className='pl-9 border-gray-200 focus:border-primary/30 focus:ring-primary/20'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isLoading || allCourses.length === 0}
              />
            </div>
            <Select value={category} onValueChange={setCategory} disabled={isLoading || allCourses.length === 0}>
              <SelectTrigger className='w-full sm:w-[180px] border-gray-200'>
                <SelectValue placeholder='Danh mục' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả danh mục</SelectItem>
                {/* Thêm danh mục từ API nếu cần */}
                <SelectItem value='soft-skills'>Kỹ năng mềm</SelectItem>
                <SelectItem value='technical'>Kỹ thuật</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loading State for Courses */}
      {isLoading && (
        <div className='grid gap-6'>
          {[1, 2].map((i) => (
            <Card key={`course-skeleton-${i}`} className='border-none shadow-md overflow-hidden'>
              <div className='flex flex-col md:flex-row'>
                {/* Course Image Skeleton */}
                <div className='relative h-48 md:h-auto md:w-72 xl:w-80 bg-gray-100 overflow-hidden'>
                  <Skeleton className='h-full w-full' />
                </div>

                {/* Course Content Skeleton */}
                <CardContent className='flex-1 p-6'>
                  <div className='flex flex-col h-full space-y-6'>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <Skeleton className='h-6 w-3/4' />
                        <Skeleton className='h-5 w-24 rounded-full' />
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <Skeleton className='h-20 w-full rounded-xl' />
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <Skeleton className='h-4 w-32' />
                          <Skeleton className='h-4 w-16' />
                        </div>
                        <Skeleton className='h-2 w-full' />
                      </div>
                      <Skeleton className='h-16 w-full rounded-lg' />
                    </div>

                    <div className='pt-4'>
                      <Skeleton className='h-10 w-full rounded-md' />
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <Card className='border-none shadow-md'>
          <CardContent className='p-8 flex flex-col items-center justify-center text-center'>
            <div className='h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-4'>
              <BookOpenCheck className='h-8 w-8 text-red-500' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>Không thể tải khóa học</h3>
            <p className='text-gray-500 max-w-md mb-6'>
              Đã xảy ra lỗi khi tải danh sách khóa học của bạn. Vui lòng thử lại sau.
            </p>
            <Button onClick={() => window.location.reload()}>Tải lại trang</Button>
          </CardContent>
        </Card>
      )}

      {/* Empty State - No Courses */}
      {!isLoading && !isError && allCourses.length === 0 && (
        <Card className='border-dashed border-2 shadow-sm'>
          <CardContent className='p-12 flex flex-col items-center justify-center text-center'>
            <div className='h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6'>
              <BookOpenCheck className='h-10 w-10 text-primary' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-3'>Bạn chưa tham gia khóa học nào</h3>
            <p className='text-gray-500 max-w-md mb-8'>
              Hãy khám phá các khóa học hấp dẫn của chúng tôi để bắt đầu hành trình học tập và nâng cao kỹ năng của bạn.
            </p>
            <Button asChild size='lg'>
              <Link href='/course'>
                <ShoppingBag className='mr-2 h-5 w-5' />
                Khám phá khóa học
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No Results from Search/Filter */}
      {!isLoading && !isError && allCourses.length > 0 && courses.length === 0 && (
        <Card className='border-dashed border-2 shadow-sm'>
          <CardContent className='p-8 flex flex-col items-center justify-center text-center'>
            <div className='h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center mb-4'>
              <Search className='h-8 w-8 text-amber-500' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>Không tìm thấy khóa học</h3>
            <p className='text-gray-500 max-w-md mb-6'>
              Không có khóa học nào phù hợp với tiêu chí tìm kiếm của bạn. Vui lòng thử với từ khóa hoặc bộ lọc khác.
            </p>
            <Button
              variant='outline'
              onClick={() => {
                setSearchQuery('')
                setCategory('all')
              }}
            >
              Xóa bộ lọc
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Course List - Only show when there are courses */}
      {!isLoading && !isError && courses.length > 0 && (
        <div className='grid gap-6'>
          {courses.map((course) => (
            <Card
              key={course.id}
              className={cn(
                'group border-none shadow-md overflow-hidden transition-all duration-300',
                'hover:shadow-xl hover:shadow-primary/10'
              )}
            >
              {/* Existing course card content */}
              <div className='flex flex-col md:flex-row'>
                {/* Course Image Section */}
                <div className='relative h-48 md:h-auto md:w-72 xl:w-80 bg-gray-100 overflow-hidden'>
                  <Image src={course.imageUrl} alt={course.title} layout='fill' objectFit='cover' />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' />
                  <div className='absolute inset-0 p-6 flex flex-col justify-between'>
                    <div className='flex items-center gap-2'>
                      {course.categories.map((category) => (
                        <Badge
                          key={category.id}
                          variant='outline'
                          className='self-start bg-black/50 text-white border-none backdrop-blur-sm'
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      <p className='text-sm text-gray-200 flex items-center gap-2'>
                        <Clock className='w-4 h-4' />
                        {course.durationDisplay}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <CardContent className='flex-1 p-6 bg-gradient-to-b from-gray-50 to-white'>
                  <div className='flex flex-col h-full'>
                    {/* Header */}
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors'>
                          {course.title}
                        </h3>
                        <Badge variant={course.completionRate === 100 ? 'default' : 'secondary'} className='shadow-sm'>
                          {course.completionRate === 100 ? 'Hoàn thành' : `${course.completionRate}% hoàn thành`}
                        </Badge>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className='flex-1 py-6 space-y-4'>
                      {/* Course Stats */}
                      <div className='grid grid-cols-2 gap-6 p-4 bg-white rounded-xl border border-gray-100'>
                        <div className='space-y-1'>
                          <p className='text-xs font-medium text-gray-500 uppercase tracking-wider'>Bài học</p>
                          <p className='font-medium text-gray-700 flex items-center gap-2'>
                            <BookOpen className='w-4 h-4 text-gray-400' />
                            10/20 bài
                          </p>
                        </div>
                        <div className='space-y-1'>
                          <p className='text-xs font-medium text-gray-500 uppercase tracking-wider'>Truy cập</p>
                          <p className='font-medium text-gray-700 flex items-center gap-2'>
                            <Clock className='w-4 h-4 text-gray-400' />2 giờ trước
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span className='font-medium text-gray-900'>Tiến độ học tập</span>
                          <span className='text-primary font-semibold'>{course.completionRate}%</span>
                        </div>
                        <Progress value={course.completionRate} className='h-2 bg-primary/10' />
                      </div>

                      {/* Next Lesson */}
                      <div className='p-4 rounded-lg bg-blue-50 border border-blue-100'>
                        <div className='flex items-center gap-3'>
                          <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center'>
                            <PlayCircle className='w-5 h-5 text-blue-600' />
                          </div>
                          <div>
                            <p className='text-sm font-medium text-blue-900'>Bài học tiếp theo</p>
                            <p className='text-sm text-blue-600'>Bài 16: Kỹ năng thuyết trình</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className='pt-4 border-t border-dashed'>
                      <Button
                        className='w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary
                          shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20'
                        asChild
                      >
                        <Link href={`/learn/${course.id}`}>
                          <PlayCircle className='w-4 h-4 mr-2' />
                          {course.completionRate === 0 ? 'Bắt đầu học' : 'Tiếp tục học'}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
