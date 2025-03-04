'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { useGetCourseProgressQuery } from '@/queries/useCourse'
import { BookOpen, Clock, CheckCircle2, LockKeyhole, ChevronRight, Home } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const { courseId } = params
  const { data, isLoading } = useGetCourseProgressQuery({ id: courseId })
  const course = data?.payload.data || null

  // Breadcrumb component
  const Breadcrumb = () => (
    <div className='mb-6 flex items-center gap-1 text-sm'>
      <Link
        href='/kid/dashboard'
        className='flex items-center gap-1 text-gray-500 hover:text-primary transition-colors'
      >
        <Home className='h-4 w-4' />
        <span className='hidden sm:inline'>Trang chính</span>
      </Link>
      <ChevronRight className='h-4 w-4 text-gray-400' />
      <Link href='/kid/course' className='text-gray-500 hover:text-primary transition-colors'>
        Khóa học
      </Link>
      {!isLoading && course && (
        <>
          <ChevronRight className='h-4 w-4 text-gray-400' />
          <span className='text-gray-800 font-medium truncate max-w-[180px]'>{course.title}</span>
        </>
      )}
    </div>
  )

  // Render skeleton while loading
  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Breadcrumb />

        {/* Course Header Skeleton */}
        <div className='flex flex-col md:flex-row gap-8 mb-12'>
          {/* Course Image Skeleton */}
          <div className='relative w-full md:w-1/2 h-[300px] rounded-2xl overflow-hidden'>
            <Skeleton className='h-full w-full' />
          </div>

          {/* Course Progress Skeleton */}
          <div className='w-full md:w-1/2 bg-white rounded-2xl p-6 shadow-lg'>
            <div className='mb-6'>
              <Skeleton className='h-7 w-48 mb-2' />
              <Skeleton className='h-3 w-full mb-2' />
              <Skeleton className='h-5 w-36 mt-2' />
            </div>

            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='bg-primary/10 rounded-xl p-4'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-5 w-5 rounded-full' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <Skeleton className='h-8 w-12 mt-2' />
              </div>
              <div className='bg-green-100 rounded-xl p-4'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-5 w-5 rounded-full' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <Skeleton className='h-8 w-12 mt-2' />
              </div>
            </div>

            <Skeleton className='h-12 w-full rounded-full' />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-4 h-12'>
            <Skeleton className='h-full w-full rounded-full' />
            <Skeleton className='h-full w-full rounded-full' />
          </div>

          {/* Chapters Skeleton */}
          <div className='space-y-6'>
            {[1, 2, 3].map((i) => (
              <Card key={`chapter-skeleton-${i}`} className='p-6'>
                <div className='mb-4'>
                  <Skeleton className='h-7 w-3/4 mb-2' />
                  <div className='flex items-center gap-4 text-sm'>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4 rounded-full' />
                      <Skeleton className='h-4 w-16' />
                    </div>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4 rounded-full' />
                      <Skeleton className='h-4 w-20' />
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  {[1, 2, 3].map((j) => (
                    <div key={`lesson-skeleton-${i}-${j}`} className='flex items-center gap-4 p-4 rounded-lg'>
                      <Skeleton className='h-6 w-6 rounded-full flex-shrink-0' />
                      <div className='flex-1 min-w-0'>
                        <Skeleton className='h-5 w-3/4 mb-1' />
                        <Skeleton className='h-4 w-1/2' />
                      </div>
                      <div className='flex items-center gap-2'>
                        <Skeleton className='h-4 w-4 rounded-full' />
                        <Skeleton className='h-4 w-16' />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Breadcrumb />
        <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
          <h3 className='text-lg font-medium text-gray-900'>Không tìm thấy khóa học</h3>
          <p className='text-gray-500'>Khóa học không tồn tại hoặc đã bị xóa</p>
          <Button asChild>
            <Link href='/kid/course'>Quay lại danh sách khóa học</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb />

      {/* Course Header */}
      <div className='flex flex-col md:flex-row gap-8 mb-12'>
        <div className='relative w-full md:w-1/2 h-[300px] rounded-2xl overflow-hidden'>
          <Image src={course.imageUrl} alt={course.title} fill className='object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
          <div className='absolute bottom-6 left-6 text-white'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='bg-white/20 px-3 py-1 rounded-full text-sm'>{course.status}</span>
            </div>
            <h1 className='text-3xl font-bold mb-2'>{course.title}</h1>
            <p className='text-lg opacity-90'>{course.description}</p>
          </div>
        </div>
        <div className='w-full md:w-1/2 bg-white rounded-2xl p-6 shadow-lg'>
          <div className='mb-6'>
            <h3 className='text-xl font-bold mb-2'>Tiến độ của bạn</h3>
            <Progress value={course.courseCompletionPercentage} className='h-3' />
            <p className='text-sm text-gray-600 mt-2'>
              {course.totalCompletedLessonsInCourse}/{course.totalLessonsInCourse} bài học đã hoàn thành
            </p>
          </div>
          <div className='grid grid-cols-2 gap-4 mb-6'>
            <div className='bg-primary/10 rounded-xl p-4'>
              <div className='flex items-center gap-2'>
                <BookOpen className='h-5 w-5 text-primary' />
                <p className='text-sm text-gray-600'>Tổng số bài học</p>
              </div>
              <p className='text-2xl font-bold text-primary mt-2'>{course.totalLessonsInCourse}</p>
            </div>
            <div className='bg-green-100 rounded-xl p-4'>
              <div className='flex items-center gap-2'>
                <CheckCircle2 className='h-5 w-5 text-green-600' />
                <p className='text-sm text-gray-600'>Đã hoàn thành</p>
              </div>
              <p className='text-2xl font-bold text-green-600 mt-2'>{course.totalCompletedLessonsInCourse}</p>
            </div>
          </div>
          <Button size='lg' className='w-full rounded-full' asChild>
            <Link href={`/kid/course/${courseId}/learn`}>Tiếp tục học 🚀</Link>
          </Button>
        </div>
      </div>

      {/* Course Content */}
      <Tabs defaultValue='chapters' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-2 gap-4 bg-transparent h-12'>
          <TabsTrigger
            value='chapters'
            className='data-[state=active]:bg-primary data-[state=active]:text-white rounded-full bg-slate-100 h-full'
          >
            Chương học 📚
          </TabsTrigger>
          <TabsTrigger
            value='progress'
            className='data-[state=active]:bg-primary data-[state=active]:text-white rounded-full bg-slate-100 h-full'
          >
            Tiến độ 📊
          </TabsTrigger>
        </TabsList>

        {/* Content unchanged */}
        <TabsContent value='chapters' className='space-y-6'>
          {course.chapters.map((chapter) => (
            <Card key={chapter.id} className='p-6'>
              <div className='mb-4'>
                <h3 className='text-xl font-bold mb-2'>
                  Chương {chapter.sequence}: {chapter.title}
                </h3>
                <div className='flex items-center gap-4 text-sm text-gray-600'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4' />
                    <span>{chapter.durationsDisplay}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <BookOpen className='h-4 w-4' />
                    <span>{chapter.lessons.length} bài học</span>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                {chapter.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-lg transition-colors',
                      lesson.status === 'YET' ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-70'
                    )}
                    onClick={() => {
                      if (lesson.status === 'YET') {
                        // Navigate to lesson
                        window.location.href = `/kid/course/${courseId}/lesson/${lesson.id}`
                      }
                    }}
                  >
                    <div className='flex-shrink-0'>
                      {lesson.status === 'YET' ? (
                        <CheckCircle2 className='h-6 w-6 text-green-500' />
                      ) : (
                        <LockKeyhole className='h-6 w-6 text-gray-400' />
                      )}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h4 className='font-medium text-gray-900'>
                        Bài {lesson.sequence}: {lesson.title}
                      </h4>
                      <p className='text-sm text-gray-500'>{lesson.description}</p>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-gray-500'>
                      <Clock className='h-4 w-4' />
                      <span>{lesson.durationsDisplay}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value='progress' className='grid gap-6'>
          {/* Progress content unchanged */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CourseDetailPage
