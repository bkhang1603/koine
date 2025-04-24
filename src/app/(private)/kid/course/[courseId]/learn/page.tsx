'use client'

import { Button } from '@/components/ui/button'
import { useGetCourseProgressQuery, useGetLessonQuery, useUpdateCourseProgressMutation } from '@/queries/useCourse'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { use, useCallback, useEffect } from 'react'
import { UserCourseProgressResType } from '@/schemaValidations/course.schema'
import { Breadcrumb } from '@/components/learn/Breadcrumb'
import { LoadingSkeletonForKid } from '@/components/learn/LoadingSkeletonForKid'
import { LearnPageContent } from '@/components/learn/LearnPageContent'
import configRoute from '@/config/route'

type Lesson = UserCourseProgressResType['data']['chapters'][0]['lessons'][0]

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

function LearnPage(props: { params: Promise<{ courseId: string }> }) {
  const params = use(props.params)
  const { courseId } = params
  const router = useRouter()
  const searchParams = useSearchParams()
  const lessonId = searchParams.get('lessonId')
  const quizId = searchParams.get('quizId')

  const updateCourseMutation = useUpdateCourseProgressMutation()
  const { data: courseData, isLoading: courseLoading } = useGetCourseProgressQuery({ id: courseId })
  const { data: lessonData, isLoading: lessonLoading } = useGetLessonQuery({
    id: lessonId!,
    enabled: !!lessonId
  })

  const course = courseData?.payload.data || null

  // Auto-select first lesson when course data is loaded and no lessonId is provided
  useEffect(() => {
    if (quizId) {
      const chapter = course?.chapters.find((c: any) => c.id === quizId)
      if (chapter) {
        router.push(`/kid/course/${courseId}/learn?quizId=${chapter.id}`)
      }
      return
    }

    if (!lessonId && course && !courseLoading) {
      const firstLesson = findFirstAccessibleLesson(course)
      if (firstLesson) {
        router.push(`/kid/course/${courseId}/learn?lessonId=${firstLesson.id}`)
      }
      return
    }
  }, [course, courseLoading, lessonId, router, quizId, courseId])

  // Auto redirect to first lesson if no lessonId
  useEffect(() => {
    if (quizId) {
      const chapter = course?.chapters.find((c: any) => c.id === quizId)
      if (chapter) {
        router.push(`/kid/course/${courseId}/learn?lessonId=${chapter.lessons[0].id}`)
      }
      return
    }
    if (!lessonId && !courseLoading && course) {
      const firstLesson = findFirstAccessibleLesson(course)
      if (firstLesson) {
        router.push(`/kid/course/${courseId}/learn?lessonId=${firstLesson.id}`)
      }
      return
    }
  }, [lessonId, courseLoading, course, courseId, router, quizId])

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

  const handleLessonClick = useCallback(
    (lesson: any) => {
      router.push(`/kid/course/${courseId}/learn?lessonId=${lesson.id}`)
    },
    [courseId, router]
  )

  const handleQuizClick = useCallback(
    (chapter: any) => {
      router.push(`/kid/course/${courseId}/learn?quizId=${chapter.id}`)
    },
    [courseId, router]
  )

  if (courseLoading) return <LoadingSkeletonForKid />

  if (!course) {
    return (
      <div className='py-8'>
        <Breadcrumb />
        <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
          <h3 className='text-lg font-medium text-gray-900'>Không tìm thấy khóa học</h3>
          <p className='text-gray-500'>Khóa học không tồn tại hoặc đã bị xóa</p>
          <Button asChild>
            <Link href={configRoute.kid.course}>Quay lại danh sách khóa học</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='pt-6 pb-14'>
      <Breadcrumb courseTitle={course.title} courseId={courseId} />

      <LearnPageContent
        quizId={quizId}
        course={course}
        lesson={lessonData?.payload.data}
        lessonId={lessonId}
        courseId={courseId}
        isLoading={lessonLoading}
        onLessonClick={handleLessonClick}
        onQuizClick={handleQuizClick}
        handleUpdate={handleUpdate}
        isUpdating={updateCourseMutation.isPending}
        forKid
        backUrl='/kid/course'
        backLabel='Quay lại danh sách khóa học'
      />
    </div>
  )
}

export default LearnPage
