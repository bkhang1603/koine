'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourseProgressQuery, useGetLessonQuery, useUpdateCourseProgressMutation } from '@/queries/useCourse'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { useCallback, use, useEffect } from 'react'
import { UserCourseProgressResType } from '@/schemaValidations/course.schema'
import { Breadcrumb } from '@/components/learn/Breadcrumb'
import { Sidebar } from '@/components/learn/Sidebar'
import { LessonContent } from '@/components/learn/LessonContent'
import { WelcomeScreen } from '@/components/learn/WelcomeScreen'
import { NavigationButtons } from '@/components/learn/NavigationButtons'
import { LoadingSkeleton } from '@/components/learn/LoadingSkeleton'
import { AlertTriangle } from 'lucide-react'

type Lesson = UserCourseProgressResType['data']['chapters'][0]['lessons'][0]

// Thêm helper function để check bài học có thể truy cập
const canAccessLesson = (lesson: any, course: any) => {
  if (lesson.status === 'YET') return true

  // Nếu là NOTYET, kiểm tra xem có phải là bài NOTYET đầu tiên không
  if (lesson.status === 'NOTYET') {
    // Tìm bài NOTYET đầu tiên trong tất cả các chương
    for (const chapter of course.chapters) {
      const firstNotyetLesson = chapter.lessons.find((l: any) => l.status === 'NOTYET')
      if (firstNotyetLesson) {
        return lesson.id === firstNotyetLesson.id
      }
    }
  }

  return false
}

// Helper function to find the first accessible lesson
const findFirstAccessibleLesson = (course: any) => {
  if (!course || !course.chapters || course.chapters.length === 0) return null

  // First look for lessons with 'YET' status
  for (const chapter of course.chapters) {
    if (!chapter.lessons || chapter.lessons.length === 0) continue

    const yetLesson = chapter.lessons.find((l: any) => l.status === 'YET')
    if (yetLesson) return yetLesson
  }

  // If no 'YET' lessons, look for the first 'NOTYET' lesson
  for (const chapter of course.chapters) {
    if (!chapter.lessons || chapter.lessons.length === 0) continue

    const notYetLesson = chapter.lessons.find((l: any) => l.status === 'NOTYET')
    if (notYetLesson) return notYetLesson
  }

  // If no lessons found with those statuses, return the very first lesson
  return course.chapters[0]?.lessons[0] || null
}

function LearnPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { id } = params
  const router = useRouter()
  const searchParams = useSearchParams()
  const lessonId = searchParams.get('lessonId')
  const isPreviewMode = searchParams.get('preview') === 'true'

  const updateCourseMutation = useUpdateCourseProgressMutation()
  const { data, isLoading } = useGetCourseProgressQuery({ id })
  const { data: lessonData, isLoading: lessonLoading } = useGetLessonQuery({ id: lessonId!, enabled: !!lessonId })

  const course = data?.payload.data || null
  const lesson = lessonData?.payload.data || null

  // Auto-select first lesson when course data is loaded and no lessonId is provided
  useEffect(() => {
    if (!lessonId && course && !isLoading) {
      const firstLesson = findFirstAccessibleLesson(course)
      if (firstLesson) {
        router.push(`/learn/${id}?lessonId=${firstLesson.id}`)
      }
    }
  }, [course, isLoading, lessonId, id, router])

  const getNextLesson = useCallback(() => {
    if (!course || !lesson) return null

    const currentChapter = course.chapters.find((chapter) => chapter.lessons.some((l) => l.id === lesson.id))
    const currentLessonIndex = currentChapter?.lessons.findIndex((l) => l.id === lesson.id)

    if (currentChapter && currentLessonIndex !== undefined) {
      if (currentLessonIndex < currentChapter.lessons.length - 1) {
        return currentChapter.lessons[currentLessonIndex + 1]
      }

      const nextChapterIndex = course.chapters.findIndex((c) => c.id === currentChapter.id) + 1
      if (nextChapterIndex < course.chapters.length) {
        const nextChapter = course.chapters[nextChapterIndex]
        return nextChapter.lessons[0]
      }
    }
    return null
  }, [course, lesson])

  const handleUpdate = useCallback(
    async ({ lessonId, status }: { lessonId: string; status: Lesson['status'] }) => {
      try {
        if (status === 'NOTYET') {
          await updateCourseMutation.mutateAsync(lessonId)
        }
      } catch (error) {
        handleErrorApi({ error })
      }
    },
    [updateCourseMutation]
  )

  const getPreviousLesson = useCallback(() => {
    if (!course || !lesson) return null

    const currentChapter = course.chapters.find((chapter) => chapter.lessons.some((l) => l.id === lesson.id))
    const currentLessonIndex = currentChapter?.lessons.findIndex((l) => l.id === lesson.id)

    if (currentChapter && currentLessonIndex !== undefined) {
      if (currentLessonIndex > 0) {
        return currentChapter.lessons[currentLessonIndex - 1]
      }

      const prevChapterIndex = course.chapters.findIndex((c) => c.id === currentChapter.id) - 1
      if (prevChapterIndex >= 0) {
        const prevChapter = course.chapters[prevChapterIndex]
        return prevChapter.lessons[prevChapter.lessons.length - 1]
      }
    }
    return null
  }, [course, lesson])

  const handleLessonClick = useCallback(
    (lesson: any) => {
      if (canAccessLesson(lesson, course)) {
        router.push(`/learn/${id}?lessonId=${lesson.id}`)
      }
    },
    [id, router, course]
  )

  // Render preview UI overlay when in preview mode
  if (isPreviewMode) {
    return (
      <div className='pt-32 pb-14 container'>
        <div className='grid lg:grid-cols-[340px_1fr] gap-8'>
          {/* Preview sidebar */}
          <div className='hidden lg:block'>
            <Card className='p-6 border-none shadow-lg bg-white/90 backdrop-blur-sm sticky top-28'>
              <div className='space-y-4'>
                <h3 className='font-semibold text-lg'>Bạn đang xem thử bài học</h3>
                <p className='text-sm text-muted-foreground'>
                  Đây là bản xem thử của bài học. Để truy cập toàn bộ khóa học, vui lòng ghi danh khóa học.
                </p>
                <Button asChild className='w-full'>
                  <Link href={`/course/${id}`}>Quay lại trang khóa học</Link>
                </Button>
              </div>
            </Card>
          </div>

          {/* Main content with preview notice */}
          <Card className='bg-white backdrop-blur-sm border-none shadow-lg flex flex-col overflow-hidden'>
            <div className='flex-1 overflow-y-auto'>
              <div className='p-8'>
                <div className='max-w-4xl mx-auto'>
                  {lessonLoading ? (
                    <div className='space-y-6'>
                      <Skeleton className='h-10 w-2/3' />
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-3/4' />
                      <div className='aspect-video'>
                        <Skeleton className='h-full w-full rounded-2xl' />
                      </div>
                    </div>
                  ) : lesson ? (
                    <>
                      <div className='bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3'>
                        <AlertTriangle className='text-amber-500 h-5 w-5 mt-0.5 flex-shrink-0' />
                        <div>
                          <h4 className='font-medium text-amber-700 mb-1'>Bạn đang xem thử bài học</h4>
                          <p className='text-sm text-amber-600'>
                            Đây là nội dung xem thử. Để truy cập đầy đủ khóa học, vui lòng ghi danh.
                          </p>
                        </div>
                      </div>
                      <LessonContent lesson={lesson} />
                    </>
                  ) : (
                    <div className='text-center py-12'>
                      <h3 className='text-lg font-medium text-gray-900 mb-2'>Không tìm thấy bài học</h3>
                      <p className='text-gray-500 mb-6'>Bài học này không khả dụng hoặc không tồn tại</p>
                      <Button asChild>
                        <Link href={`/course/${id}`}>Quay lại trang khóa học</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Preview footer */}
            {lesson && (
              <div className='flex-shrink-0 bg-white py-6 px-8 border-t'>
                <div className='max-w-4xl mx-auto'>
                  <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                    <p className='text-sm text-muted-foreground'>Để tiếp tục học, hãy ghi danh khóa học</p>
                    <Button asChild>
                      <Link href={`/course/${id}`}>Ghi danh khóa học</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    )
  }

  // Continue with regular UI for enrolled users
  if (isLoading) return <LoadingSkeleton />

  if (!course) {
    return (
      <div className='py-8'>
        <Breadcrumb />
        <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
          <h3 className='text-lg font-medium text-gray-900'>Không tìm thấy khóa học</h3>
          <p className='text-gray-500'>Khóa học không tồn tại hoặc đã bị xóa</p>
          <Button asChild>
            <Link href='/learn'>Quay lại danh sách khóa học</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='pt-32 pb-14 container'>
      <div className='grid lg:grid-cols-[340px_1fr] gap-8'>
        <Sidebar
          course={course}
          courseId={id}
          lessonId={lessonId}
          onLessonClick={handleLessonClick}
          canAccessLesson={canAccessLesson}
        />

        <Card className='bg-white backdrop-blur-sm border-none shadow-lg flex flex-col overflow-hidden'>
          <div className='flex-1 overflow-y-auto'>
            <div className='p-8'>
              <div className='max-w-4xl mx-auto'>
                {lessonLoading ? (
                  <div className='space-y-6'>
                    <Skeleton className='h-10 w-2/3' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-3/4' />
                    <div className='aspect-video'>
                      <Skeleton className='h-full w-full rounded-2xl' />
                    </div>
                  </div>
                ) : lesson ? (
                  <LessonContent lesson={lesson} />
                ) : (
                  <WelcomeScreen />
                )}
              </div>
            </div>
          </div>

          {/* Navigation Footer - Fixed at bottom */}
          {lesson && (
            <div className='flex-shrink-0 bg-white py-6'>
              <NavigationButtons
                course={course}
                lesson={lesson}
                prevLesson={getPreviousLesson()}
                nextLesson={getNextLesson()}
                canAccessNext={!!getNextLesson() && canAccessLesson(getNextLesson(), course)}
                onPrevClick={() => {
                  const prevLesson = getPreviousLesson()
                  if (prevLesson) handleLessonClick(prevLesson)
                }}
                onNextClick={() => {
                  const nextLesson = getNextLesson()
                  if (nextLesson) handleLessonClick(nextLesson)
                }}
                onComplete={() => handleUpdate({ lessonId: lesson.id, status: lesson.status })}
                isUpdating={updateCourseMutation.isPending}
                canAccessLesson={canAccessLesson}
              />
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default LearnPage
