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
import { getAccessTokenFromLocalStorage, handleErrorApi } from '@/lib/utils'
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
import socket from '@/lib/socket'

type Lesson = UserCourseProgressResType['data']['chapters'][0]['lessons'][0]

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

  const stillLearningIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Socket handlers
  const handleLearningKicked = useCallback(() => {
    toast({
      title: 'Phiên học bị chấm dứt',
      description: 'Tài khoản của bạn đang được sử dụng trên thiết bị khác',
      variant: 'destructive'
    })
    // Có thể thêm redirect về trang danh sách khóa học
    router.push(configRoute.setting.myCourse)
  }, [router])

  const handleLearningTimeout = useCallback(() => {
    toast({
      title: 'Phiên học hết hạn',
      description: 'Phiên học của bạn đã hết hạn do không có hoạt động',
      variant: 'destructive'
    })
  }, [])

  const token = getAccessTokenFromLocalStorage()

  // Socket connection cho learning session
  useEffect(() => {
    // Chỉ kết nối socket khi không ở chế độ preview và đã có course id
    if (isPreviewMode || !id) return

    function onConnect() {
      login()
    }

    function login() {
      socket.emit(
        'login',
        {
          token: token
        },
        (response: any) => {
          if (response?.statusCode === 200) {
            startLearningSession()
            setupStillLearningInterval()
          }
        }
      )
    }

    // Định nghĩa các hàm emit sự kiện
    const startLearningSession = () => {
      socket.emit('startLearning', { courseId: id }, (response: any) => {
        if (response?.statusCode !== 200) {
          toast({
            description: 'Không thể bắt đầu phiên học. Vui lòng thử lại sau.',
            variant: 'destructive'
          })
        }
      })
    }

    const setupStillLearningInterval = () => {
      // Xóa interval cũ nếu có
      if (stillLearningIntervalRef.current) {
        clearInterval(stillLearningIntervalRef.current)
      }

      // Thiết lập interval mới để gửi stillLearning mỗi 2 phút
      stillLearningIntervalRef.current = setInterval(
        () => {
          socket.emit('stillLearning', { courseId: id })
        },
        2 * 60 * 1000
      )
    }

    // Kết nối socket
    if (!socket.connected) {
      socket.connect()
    } else {
      onConnect()
    }

    // Lắng nghe các sự kiện
    socket.on('learningKicked', handleLearningKicked)
    socket.on('learningTimeout', handleLearningTimeout)

    // Cleanup
    return () => {
      if (stillLearningIntervalRef.current) {
        clearInterval(stillLearningIntervalRef.current)
        stillLearningIntervalRef.current = null
      }

      socket.off('learningKicked', handleLearningKicked)
      socket.off('learningTimeout', handleLearningTimeout)

      // Emit kết thúc phiên học khi rời trang
      if (socket.connected) {
        socket.emit('stopLearning', { courseId: id })
      }
    }
  }, [id, isPreviewMode, handleLearningKicked, handleLearningTimeout, token])

  const handleUpdate = useCallback(
    async ({ lessonId, courseId, status }: { lessonId: string; courseId: string; status: Lesson['status'] }) => {
      try {
        if (status === 'NOTYET') {
          await updateCourseMutation.mutateAsync({ lessonId, courseId })
        }
      } catch (error) {
        handleErrorApi({ error })
      }
    },
    [updateCourseMutation]
  )

  const handleLessonClick = useCallback(
    (lesson: any) => {
      router.push(`/learn/${id}?lessonId=${lesson.id}`)
    },
    [id, router]
  )

  const handleQuizClick = useCallback(
    (chapter: any) => {
      router.push(`/learn/${id}?quizId=${chapter.id}`)
    },
    [id, router]
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
                  <Link href={`${configRoute.course}/${id}`}>Quay lại trang khóa học</Link>
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
                        <Link href={`${configRoute.course}/${id}`}>Quay lại trang khóa học</Link>
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
                      <Link href={`${configRoute.course}/${id}`}>Ghi danh khóa học</Link>
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
        handleUpdate={handleUpdate}
        isUpdating={updateCourseMutation.isPending}
        backUrl={configRoute.learn}
        backLabel='Quay lại danh sách khóa học'
      />
    </div>
  )
}
export default LearnPage
