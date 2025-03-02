'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Clock, Search, PlayCircle, BookOpen, GraduationCap, Trophy } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useCourseByAccount } from '@/queries/useAccount'
import Link from 'next/link'

export default function MyCoursesPage() {
  const { data } = useCourseByAccount()
  const courses = data?.payload.data || []

  // const [courses] = useState<Course[]>([
  //   {
  //     id: 1,
  //     title: 'Kỹ năng giao tiếp hiệu quả',
  //     description: 'Khóa học giúp bạn phát triển kỹ năng giao tiếp trong môi trường công việc và cuộc sống.',
  //     progress: 75,
  //     totalLessons: 20,
  //     completedLessons: 15,
  //     duration: '4h 30m',
  //     status: 'in-progress',
  //     image: '/placeholder.svg?height=200&width=300',
  //     lastAccessed: '2 giờ trước',
  //     category: 'Kỹ năng mềm',
  //     nextLesson: 'Bài 16: Kỹ năng thuyết trình'
  //   },
  //   {
  //     id: 2,
  //     title: 'Quản lý thời gian và năng suất',
  //     description: 'Khóa học giúp bạn quản lý thời gian hiệu quả và tăng năng suất làm việc.',
  //     progress: 0,
  //     totalLessons: 15,
  //     completedLessons: 0,
  //     duration: '5h',
  //     status: 'not-started',
  //     image: '/placeholder.svg?height=200&width=300',
  //     lastAccessed: 'Chưa bắt đầu',
  //     category: 'Kỹ năng mềm',
  //     nextLesson: 'Bài 1: Giới thiệu khóa học'
  //   }
  // ])

  return (
    <div className='space-y-8'>
      <div>
        <h3 className='text-2xl font-semibold'>Khóa học của tôi</h3>
        <p className='text-sm text-gray-500 mt-1'>Quản lý và theo dõi tiến độ học tập của bạn</p>
      </div>

      {/* Stats Cards */}
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
                  <span className='text-2xl font-bold text-gray-900'>
                    {/* {courses.filter((c) => c.status === 'in-progress').length} */}
                    {courses.length}
                  </span>
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
                  <span className='text-2xl font-bold text-gray-900'>
                    {Math.round(courses.reduce((total, c) => total + c.completionRate, 0) / courses.length)}%
                  </span>
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
                  <span className='text-2xl font-bold text-gray-900'>
                    {Math.round(
                      courses.reduce((total, c) => {
                        const hours = parseInt(c.durationDisplay.split('h')[0]) || 0
                        const mins = parseInt(c.durationDisplay.split('m')[0]) || 0
                        return total + hours * 60 + mins
                      }, 0) / 60
                    )}
                  </span>
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

      {/* Filters */}
      <Card className='border-none shadow-md'>
        <CardContent className='p-6'>
          <div className='flex-1 flex justify-between gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                placeholder='Tìm khóa học...'
                className='pl-9 border-gray-200 focus:border-primary/30 focus:ring-primary/20'
              />
            </div>
            <Select defaultValue='all'>
              <SelectTrigger className='w-[180px] border-gray-200'>
                <SelectValue placeholder='Danh mục' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả danh mục</SelectItem>
                <SelectItem value='soft-skills'>Kỹ năng mềm</SelectItem>
                <SelectItem value='technical'>Kỹ thuật</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Course List */}
      <div className='grid gap-6'>
        {courses.map((course) => (
          <Card
            key={course.id}
            className={cn(
              'group border-none shadow-md overflow-hidden transition-all duration-300',
              'hover:shadow-xl hover:shadow-primary/10'
            )}
          >
            <div className='flex flex-col md:flex-row'>
              {/* Course Image Section */}
              <div className='relative h-48 md:h-auto md:w-72 xl:w-80 bg-gray-100 overflow-hidden'>
                <Image src={course.imageUrl} alt={course.title} layout='fill' objectFit='cover' />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' />
                <div className='absolute inset-0 p-6 flex flex-col justify-between'>
                  {/* <Badge variant='outline' className='self-start bg-black/50 text-white border-none backdrop-blur-sm'>
                    {course.category}
                  </Badge> */}
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
                      <Badge variant={'completed' === 'completed' ? 'default' : 'secondary'} className='shadow-sm'>
                        {'completed' === 'completed' ? 'Hoàn thành' : `${course.completionRate}% hoàn thành`}
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
                          {/* {course.completedLessons}/{course.totalLessons} bài */}
                          10/20 bài
                        </p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-xs font-medium text-gray-500 uppercase tracking-wider'>Truy cập</p>
                        <p className='font-medium text-gray-700 flex items-center gap-2'>
                          <Clock className='w-4 h-4 text-gray-400' />
                          {/* {course.lastAccessed || 'Chưa học'} */}2 giờ trước
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
                          {/* <p className='text-sm text-blue-600'>{course.nextLesson}</p> */}
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
                        {'not-started' === 'not-started' ? 'Bắt đầu học' : 'Tiếp tục học'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
