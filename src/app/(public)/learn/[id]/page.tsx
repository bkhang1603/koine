'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useGetCourseProgressQuery,
  useGetLessonQuery,
  useGetPreviewLessonsQuery,
  useUpdateCourseProgressMutation
} from '@/queries/useCourse'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { useCallback, use, useEffect, useRef } from 'react'
import { UserCourseProgressResType } from '@/schemaValidations/course.schema'
import { LessonContent } from '@/components/learn/LessonContent'
import { LoadingSkeleton } from '@/components/learn/LoadingSkeleton'
import { AlertTriangle } from 'lucide-react'
import { useGetStillLearningCourse } from '@/queries/useAccount'
import { toast } from '@/components/ui/use-toast'
import { BreadcrumbParent } from '@/components/learn/BreadcrumbParent'
import configRoute from '@/config/route'
import { LearnPageContent } from '@/components/learn/LearnPageContent'

type Lesson = UserCourseProgressResType['data']['chapters'][0]['lessons'][0]

// Thêm helper function để check bài học có thể truy cập
const canAccessLesson = (lesson: any, course: any) => {
  // Nếu lesson đã hoàn thành thì có thể truy cập
  if (lesson.status === 'YET') return true

  // Tìm chapter chứa lesson này
  const currentChapter = course.chapters.find((c: any) => c.lessons.some((l: any) => l.id === lesson.id))
  if (!currentChapter) return false

  // Nếu là lesson đầu tiên của chapter
  const isFirstLesson = currentChapter.lessons[0].id === lesson.id

  // Nếu là lesson đầu tiên của chapter đầu tiên, có thể truy cập
  if (isFirstLesson && course.chapters[0].id === currentChapter.id) return true

  // Nếu là lesson đầu tiên của chapter khác, cần kiểm tra quiz của chapter trước
  if (isFirstLesson) {
    const currentChapterIndex = course.chapters.findIndex((c: any) => c.id === currentChapter.id)
    const previousChapter = course.chapters[currentChapterIndex - 1]

    // Nếu chapter trước có quiz và chưa hoàn thành thì không thể truy cập
    if (previousChapter.isQuestion && !previousChapter.isTakeQuiz) return false
  }

  // Nếu không phải lesson đầu tiên, kiểm tra lesson trước đó đã hoàn thành chưa
  const lessonIndex = currentChapter.lessons.findIndex((l: any) => l.id === lesson.id)
  if (lessonIndex > 0) {
    const previousLesson = currentChapter.lessons[lessonIndex - 1]
    return previousLesson.status === 'YET'
  }

  return false
}

const canAccessQuiz = (chapter: any) => {
  // Nếu chapter không có quiz thì không thể truy cập
  if (!chapter.isQuestion) return false

  // Nếu đã hoàn thành quiz thì không thể truy cập nữa
  if (chapter.isTakeQuiz) return false

  // Kiểm tra xem tất cả bài học trong chapter hiện tại đã hoàn thành chưa
  const allLessonsCompleted = chapter.lessons.every((lesson: any) => lesson.status === 'YET')
  return allLessonsCompleted
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
  const quizId = searchParams.get('quizId')
  const isPreviewMode = searchParams.get('preview') === 'true'

  const updateCourseMutation = useUpdateCourseProgressMutation()
  const { data, isLoading } = useGetCourseProgressQuery({ id })

  // Lesson data query chỉ gọi khi KHÔNG ở chế độ preview
  const {
    data: lessonData,
    isLoading: lessonLoading,
    isFetching: lessonFetching
  } = useGetLessonQuery({
    id: lessonId!,
    enabled: !!lessonId && !isPreviewMode
  })

  // Preview lessons data query chỉ gọi khi ở chế độ preview
  const { data: previewData, isLoading: previewLoading } = useGetPreviewLessonsQuery({
    id,
    limit: 3,
    enabled: isPreviewMode
  })

  const course = data?.payload.data || null

  // Nếu ở chế độ preview, lấy lesson từ previewData, ngược lại dùng lessonData
  const lesson = isPreviewMode
    ? previewData?.payload.data?.previewLessons?.find((lesson) => lesson.id === lessonId)
    : lessonData?.payload.data || null

  // Xác định trạng thái loading tổng hợp cho phần nội dung bài học
  const isLessonLoading = isPreviewMode ? previewLoading : lessonLoading

  const { refetch: refetchStillLearning, isError } = useGetStillLearningCourse({ enabled: !isPreviewMode })
  const refetchIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Chỉ setup interval và gọi refetch khi không ở chế độ preview
    if (!isPreviewMode) {
      // Gọi refetch ngay lập tức khi component mount
      refetchStillLearning()

      // Clear previous interval if exists
      if (refetchIntervalRef.current) {
        clearInterval(refetchIntervalRef.current)
      }

      // Set new interval 1 minute
      const intervalTime = 1 * 60 * 1000
      refetchIntervalRef.current = setInterval(() => {
        refetchStillLearning()
      }, intervalTime)
    }

    // Cleanup on unmount
    return () => {
      if (refetchIntervalRef.current) {
        clearInterval(refetchIntervalRef.current)
        refetchIntervalRef.current = null
      }
    }
  }, [refetchStillLearning, isPreviewMode])

  // Auto-select first lesson when course data is loaded and no lessonId is provided
  useEffect(() => {
    if (quizId) {
      const chapter = course?.chapters.find((c: any) => c.id === quizId)
      if (chapter) {
        router.push(`/learn/${id}?quizId=${chapter.id}`)
      }
      return
    }

    if (!lessonId && course && !isLoading) {
      const firstLesson = findFirstAccessibleLesson(course)
      if (firstLesson) {
        router.push(`/learn/${id}?lessonId=${firstLesson.id}`)
      }
      return
    }
  }, [course, isLoading, lessonId, id, router, quizId])

  const getNextLesson = useCallback(() => {
    if (!course || !lesson) return null

    // Tìm chapter hiện tại
    const currentChapter = course.chapters.find((c: any) => c.lessons.some((l: any) => l.id === lesson.id))
    if (!currentChapter) return null

    // Tìm index của lesson hiện tại trong chapter
    const currentLessonIndex = currentChapter.lessons.findIndex((l: any) => l.id === lesson.id)

    // Nếu lesson hiện tại không phải là lesson cuối cùng của chapter
    if (currentLessonIndex < currentChapter.lessons.length - 1) {
      return currentChapter.lessons[currentLessonIndex + 1]
    }

    // Nếu là lesson cuối cùng của chapter
    if (currentLessonIndex === currentChapter.lessons.length - 1) {
      // Nếu chapter có quiz và chưa hoàn thành quiz
      if (currentChapter.isQuestion && !currentChapter.isTakeQuiz) {
        return 'QUIZ' // Trả về 'QUIZ' để điều hướng đến quiz
      }

      // Nếu không có quiz hoặc đã hoàn thành quiz, tìm lesson đầu tiên của chapter tiếp theo
      const currentChapterIndex = course.chapters.findIndex((c: any) => c.id === currentChapter.id)
      const nextChapter = course.chapters[currentChapterIndex + 1]
      if (nextChapter && nextChapter.lessons.length > 0) {
        return nextChapter.lessons[0]
      }
    }

    return null
  }, [course, lesson])

  const getPreviousLesson = useCallback(() => {
    if (!course || !lesson) return null

    // Tìm chapter hiện tại
    const currentChapter = course.chapters.find((chapter) => chapter.lessons.some((l) => l.id === lesson.id))
    const currentLessonIndex = currentChapter?.lessons.findIndex((l) => l.id === lesson.id)

    if (currentChapter && currentLessonIndex !== undefined) {
      // Nếu đang ở lesson đầu tiên của chapter
      if (currentLessonIndex === 0) {
        const prevChapterIndex = course.chapters.findIndex((c) => c.id === currentChapter.id) - 1
        if (prevChapterIndex >= 0) {
          const prevChapter = course.chapters[prevChapterIndex]
          // Nếu chapter trước có quiz và đã hoàn thành quiz
          if (prevChapter.isQuestion && prevChapter.isTakeQuiz) {
            return 'QUIZ' // Trả về 'QUIZ' để điều hướng đến quiz của chapter trước
          }
          // Nếu không có quiz hoặc chưa hoàn thành quiz, trả về lesson cuối cùng
          return prevChapter.lessons[prevChapter.lessons.length - 1]
        }
      } else {
        // Nếu không phải lesson đầu tiên, trả về lesson trước đó
        return currentChapter.lessons[currentLessonIndex - 1]
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

  const handleLessonClick = useCallback(
    (lesson: any) => {
      if (canAccessLesson(lesson, course)) {
        router.push(`/learn/${id}?lessonId=${lesson.id}`)
      }
    },
    [id, router, course]
  )

  const handleQuizClick = useCallback(
    (chapter: any) => {
      router.push(`/learn/${id}?quizId=${chapter.id}`)
    },
    [id, router]
  )

  // Xử lý khi có lỗi
  useEffect(() => {
    if (isError) {
      toast({
        description: 'Hiện đang có thiết bị khác đang học khóa học này',
        variant: 'destructive'
      })
    }
  }, [isError, router])

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
                  {isLessonLoading ? (
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

  if (isLoading) return <LoadingSkeleton />

  return (
    <div className='pt-32 pb-14 container'>
      <BreadcrumbParent courseTitle={course?.title} />

      <LearnPageContent
        quizId={quizId}
        course={course}
        lesson={lesson}
        lessonId={lessonId}
        courseId={id}
        isLoading={isLessonLoading}
        isFetching={lessonFetching}
        onLessonClick={handleLessonClick}
        onQuizClick={handleQuizClick}
        canAccessLesson={canAccessLesson}
        canAccessQuiz={canAccessQuiz}
        handleUpdate={handleUpdate}
        getNextLesson={getNextLesson}
        getPreviousLesson={getPreviousLesson}
        isUpdating={updateCourseMutation.isPending}
        backUrl={configRoute.learn}
        backLabel='Quay lại danh sách khóa học'
      />
    </div>
  )
}
export default LearnPage
