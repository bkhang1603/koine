'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useCourseByAccount, useSuggestCoursesFree } from '@/queries/useAccount'
import { Clock, BookOpen, ChevronRight, Sparkles, GraduationCap } from 'lucide-react'

function KidCoursesPage() {
  const { data, isLoading } = useCourseByAccount({ page_size: 10, page_index: 1 })
  const courses = data?.payload.data ?? []

  const { data: suggestCoursesData } = useSuggestCoursesFree()
  const suggestCourses = suggestCoursesData?.payload.data ?? []

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent mb-12 pb-8 pt-12'>
        <div className='container mx-auto px-4'>
          <div className='max-w-2xl'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'>
              Khám phá hành trình học tập
            </h1>
            <p className='text-lg text-gray-600 mb-8'>
              Bắt đầu cuộc phiêu lưu tri thức của bạn với những khóa học thú vị và bổ ích 🚀
            </p>
            <div className='flex gap-4'>
              <Button size='lg' className='rounded-full gap-2'>
                <Sparkles className='h-4 w-4' /> Bắt đầu học ngay
              </Button>
              <Button size='lg' variant='outline' className='rounded-full gap-2'>
                <GraduationCap className='h-4 w-4' /> Xem hướng dẫn
              </Button>
            </div>
          </div>
        </div>
        <div className='absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]' />
      </div>

      <div className='container mx-auto px-4'>
        {/* Categories Filter */}
        <div className='mb-12'>
          <h2 className='text-xl font-semibold mb-6'>Chọn chủ đề yêu thích 🎯</h2>
          {isLoading ? (
            <div className='flex gap-4 overflow-x-auto pb-4'>
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={`category-skeleton-${i}`} className='w-24 h-10 rounded-full flex-shrink-0' />
              ))}
            </div>
          ) : (
            <div className='flex gap-4 overflow-x-auto pb-4'>
              <Button variant='default' className='rounded-full gap-2 flex-shrink-0'>
                <Sparkles className='h-4 w-4' /> Tất cả
              </Button>
              {['Toán học', 'Ngoại ngữ', 'Khoa học', 'Nghệ thuật'].map((category) => (
                <Button
                  key={category}
                  variant='outline'
                  className='rounded-full whitespace-nowrap flex-shrink-0 hover:bg-primary hover:text-white transition-colors'
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* My Courses Section */}
        <div className='mb-16'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold'>Khóa học của tôi</h2>
            <Button variant='ghost' className='gap-2 text-primary'>
              Xem tất cả <ChevronRight className='h-4 w-4' />
            </Button>
          </div>

          {/* Course Grid */}
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

        {/* Suggested Courses Section */}
        <div className='mb-16'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h2 className='text-2xl font-bold'>Khóa học gợi ý cho bạn</h2>
              <p className='text-gray-500 mt-1'>Được chọn lọc phù hợp với trình độ của bạn</p>
            </div>
            <Button variant='outline' className='rounded-full hidden sm:flex gap-2 hover:bg-primary hover:text-white'>
              Xem tất cả <ChevronRight className='h-4 w-4' />
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {suggestCourses.map((course) => (
              <Card
                key={course.id}
                className='group overflow-hidden bg-white hover:shadow-lg transition-all duration-300'
              >
                <div className='aspect-[2/1] relative'>
                  <Image src={course.imageUrl} alt={course.title} fill className='object-cover' />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

                  <div className='absolute inset-0 p-6 flex flex-col justify-end text-white'>
                    <div className='flex flex-wrap gap-2 mb-3'>
                      {course.categories.map((category) => (
                        <span
                          key={category.id}
                          className='bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full'
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                    <h3 className='text-xl font-bold mb-2'>{course.title}</h3>
                    <p className='text-sm text-white/90 line-clamp-2'>{course.description}</p>
                  </div>

                  <div className='absolute top-4 right-4 bg-white/95 shadow-sm backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium'>
                    {course.level === 'ALL' ? (
                      <span className='text-yellow-500 flex items-center gap-1'>
                        <Sparkles className='h-3 w-3' /> Tất cả
                      </span>
                    ) : course.level === 'EASY' ? (
                      <span className='text-green-500 flex items-center gap-1'>
                        <span className='w-1.5 h-1.5 rounded-full bg-green-500' /> Dễ
                      </span>
                    ) : (
                      <span className='text-red-500 flex items-center gap-1'>
                        <span className='w-1.5 h-1.5 rounded-full bg-red-500' /> Khó
                      </span>
                    )}
                  </div>
                </div>

                <div className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4 text-sm text-gray-600'>
                      <div className='flex items-center gap-1.5'>
                        <Clock className='h-4 w-4 text-primary' />
                        <span>{course.durationsDisplay}</span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <BookOpen className='h-4 w-4 text-primary' />
                        <span>{course.durations} bài học</span>
                      </div>
                    </div>

                    <Link href={`/kid/course/${course.id}`}>
                      <Button
                        variant='outline'
                        size='sm'
                        className='rounded-full group-hover:bg-primary group-hover:text-white transition-colors'
                      >
                        Xem chi tiết
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KidCoursesPage
