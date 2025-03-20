'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useCourseByAccount, useSuggestCoursesFree } from '@/queries/useAccount'
import { Clock, BookOpen, ChevronRight, Sparkles, GraduationCap, Target } from 'lucide-react'

function KidCoursesPage() {
  const { data, isLoading } = useCourseByAccount({ page_size: 10, page_index: 1 })
  const courses = data?.payload.data ?? []

  const { data: suggestCoursesData } = useSuggestCoursesFree()
  const suggestCourses = suggestCoursesData?.payload.data ?? []

  return (
    <div className='min-h-screen bg-gray-50/50'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-b from-primary/5 to-background mb-12'>
        <div className='container mx-auto px-4 py-12'>
          <div className='max-w-2xl mx-auto text-center'>
            <div className='inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6'>
              <Sparkles className='w-4 h-4' />
              <span>Khám phá khóa học mới</span>
            </div>
            <h1 className='text-3xl md:text-4xl font-bold mb-4'>Bắt đầu hành trình học tập của bạn 🚀</h1>
            <p className='text-gray-600 mb-8 max-w-xl mx-auto'>
              Khám phá các khóa học được thiết kế riêng cho lứa tuổi của bạn, giúp phát triển toàn diện
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className='container mx-auto px-4 mb-12'>
        <div className='bg-white rounded-2xl p-6 shadow-sm'>
          <div className='flex items-center gap-3 mb-6'>
            <Target className='w-5 h-5 text-primary' />
            <h2 className='text-lg font-semibold'>Chọn chủ đề yêu thích</h2>
          </div>

          {isLoading ? (
            <div className='flex gap-3 overflow-x-auto pb-2'>
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className='w-32 h-10 rounded-full flex-shrink-0' />
              ))}
            </div>
          ) : (
            <div className='flex gap-3 overflow-x-auto pb-2'>
              <Button variant='default' className='rounded-full gap-2 flex-shrink-0'>
                <Sparkles className='h-4 w-4' /> Tất cả
              </Button>
              {['Toán học', 'Ngoại ngữ', 'Khoa học', 'Nghệ thuật', 'Kỹ năng sống'].map((category) => (
                <Button
                  key={category}
                  variant='outline'
                  className='rounded-full flex-shrink-0 hover:bg-primary hover:text-white transition-colors'
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* My Courses Section */}
      <div className='container mx-auto px-4 mb-16'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <GraduationCap className='w-5 h-5 text-primary' />
              <h2 className='text-xl font-bold'>Khóa học của tôi</h2>
            </div>
            <p className='text-gray-500 text-sm'>Tiếp tục hành trình học tập của bạn</p>
          </div>
          <Button variant='outline' className='rounded-full gap-2'>
            Xem tất cả <ChevronRight className='h-4 w-4' />
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {courses.map((course) => (
            <Link href={`/kid/course/${course.id}`} key={course.id}>
              <Card className='group h-full hover:shadow-lg transition-all duration-300 overflow-hidden bg-white'>
                <div className='relative h-48'>
                  <Image src={course.imageUrl} alt={course.title} fill className='object-cover' />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  <div className='absolute top-4 right-4 bg-white/95 shadow-sm backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium'>
                    {course.level === 'ALL' ? (
                      <span className='text-yellow-500 flex items-center gap-1'>
                        <Sparkles className='h-4 w-4' /> Tất cả
                      </span>
                    ) : course.level === 'EASY' ? (
                      <span className='text-green-500 flex items-center gap-1'>
                        <span className='w-2 h-2 rounded-full bg-green-500' /> Dễ
                      </span>
                    ) : (
                      <span className='text-red-500 flex items-center gap-1'>
                        <span className='w-2 h-2 rounded-full bg-red-500' /> Khó
                      </span>
                    )}
                  </div>
                </div>
                <div className='p-6'>
                  <div className='flex flex-wrap items-center gap-2 mb-3'>
                    {course.categories.map((category) => (
                      <span
                        key={category.id}
                        className='bg-primary/5 text-primary text-sm px-3 py-1 rounded-full font-medium'
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <h3 className='text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors'>
                    {course.title}
                  </h3>
                  <p className='text-gray-600 mb-4 line-clamp-2'>{course.description}</p>

                  {/* Progress Section */}
                  <div className='space-y-2 mb-4'>
                    <div className='w-full bg-gray-100 rounded-full h-2.5 overflow-hidden'>
                      <div
                        className='bg-primary h-full rounded-full transition-all duration-300'
                        style={{ width: `${course.completionRate}%` }}
                      />
                    </div>
                    <div className='flex justify-between text-sm text-gray-600'>
                      <span>
                        {course.totalLessonFinished}/{course.totalLesson} bài học
                      </span>
                      <span>{course.completionRate}% hoàn thành</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className='flex items-center justify-between pt-4 border-t'>
                    <div className='flex items-center gap-4 text-sm text-gray-600'>
                      <div className='flex items-center gap-1.5'>
                        <Clock className='h-4 w-4 text-primary' />
                        <span>{course.durationDisplay}</span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <BookOpen className='h-4 w-4 text-primary' />
                        <span>{course.totalLesson} bài học</span>
                      </div>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='rounded-full opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'
                    >
                      Tiếp tục <ChevronRight className='h-4 w-4 ml-1' />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Suggested Courses */}
      <div className='container mx-auto px-4 mb-16'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <Sparkles className='w-5 h-5 text-primary' />
              <h2 className='text-xl font-bold'>Khóa học gợi ý</h2>
            </div>
            <p className='text-gray-500 text-sm'>Được chọn lọc phù hợp với trình độ của bạn</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {suggestCourses.map((course) => (
            <Link href={`/kid/course/${course.id}`} key={course.id}>
              <Card className='group h-full hover:shadow-lg transition-all duration-300 overflow-hidden bg-white'>
                <div className='relative h-48'>
                  <Image src={course.imageUrl} alt={course.title} fill className='object-cover' />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  <div className='absolute top-4 right-4 bg-white/95 shadow-sm backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium'>
                    {course.level === 'ALL' ? (
                      <span className='text-yellow-500 flex items-center gap-1'>
                        <Sparkles className='h-4 w-4' /> Tất cả
                      </span>
                    ) : course.level === 'EASY' ? (
                      <span className='text-green-500 flex items-center gap-1'>
                        <span className='w-2 h-2 rounded-full bg-green-500' /> Dễ
                      </span>
                    ) : (
                      <span className='text-red-500 flex items-center gap-1'>
                        <span className='w-2 h-2 rounded-full bg-red-500' /> Khó
                      </span>
                    )}
                  </div>
                </div>

                <div className='p-6'>
                  <div className='flex flex-wrap items-center gap-2 mb-3'>
                    {course.categories.map((category) => (
                      <span
                        key={category.id}
                        className='bg-primary/5 text-primary text-sm px-3 py-1 rounded-full font-medium'
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>

                  <h3 className='text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors'>
                    {course.title}
                  </h3>
                  <p className='text-gray-600 mb-4 line-clamp-2'>{course.description}</p>

                  {/* Thay thế phần progress bằng nút đăng ký */}
                  {/* <div className='mb-4'>
                    <Button
                      className='w-full rounded-full bg-primary/10 hover:bg-primary hover:text-white text-primary transition-colors'
                      variant='ghost'
                    >
                      Đăng ký học ngay
                    </Button>
                  </div> */}

                  {/* Stats */}
                  <div className='flex items-center justify-between pt-4 border-t'>
                    <div className='flex items-center gap-4 text-sm text-gray-600'>
                      <div className='flex items-center gap-1.5'>
                        <Clock className='h-4 w-4 text-primary' />
                        <span>{course.durationsDisplay}</span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <BookOpen className='h-4 w-4 text-primary' />
                        <span>10 bài học</span>
                      </div>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='rounded-full opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'
                    >
                      Xem chi tiết <ChevronRight className='h-4 w-4 ml-1' />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default KidCoursesPage
