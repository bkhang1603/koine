'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourseProgressQuery, useGetLessonQuery, useUpdateCourseProgressMutation } from '@/queries/useCourse'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { useCallback, use } from 'react'
import { UserCourseProgressResType } from '@/schemaValidations/course.schema'
import { Breadcrumb } from '../../../../../../components/learn/Breadcrumb'
import { Sidebar } from '../../../../../../components/learn/Sidebar'
import { NavigationButtons } from '../../../../../../components/learn/NavigationButtons'
import { LessonContent } from '../../../../../../components/learn/LessonContent'
import { WelcomeScreen } from '../../../../../../components/learn/WelcomeScreen'
import { LoadingSkeletonForKid } from '@/components/learn/LoadingSkeletonForKid'

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

function LearnPage(props: { params: Promise<{ courseId: string }> }) {
  const params = use(props.params)
  const { courseId } = params
  const router = useRouter()
  const searchParams = useSearchParams()
  const lessonId = searchParams.get('lessonId')

  const updateCourseMutation = useUpdateCourseProgressMutation()
  const { data, isLoading } = useGetCourseProgressQuery({ id: courseId })
  const { data: lessonData, isLoading: lessonLoading } = useGetLessonQuery({ id: lessonId!, enabled: !!lessonId })

  const course = data?.payload.data || null
  const lesson = lessonData?.payload.data || null

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
          // const nextLesson = getNextLesson()
          // if (nextLesson) {
          //   router.push(`/kid/course/${courseId}/learn?lessonId=${nextLesson.id}`)
          // } else {
          //   router.push(`/kid/course/${courseId}`)
          // }
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
        router.push(`/kid/course/${courseId}/learn?lessonId=${lesson.id}`)
      }
    },
    [courseId, router, course]
  )

  if (isLoading) return <LoadingSkeletonForKid />

  if (!course) {
    return (
      <div className='py-8'>
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
    <div className='pt-6 pb-14'>
      <Breadcrumb courseTitle={course.title} courseId={courseId} />

      <div className='grid lg:grid-cols-[340px_1fr] gap-8'>
        <Sidebar
          course={course}
          courseId={courseId}
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
