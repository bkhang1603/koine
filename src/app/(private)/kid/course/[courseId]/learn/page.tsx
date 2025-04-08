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

const canAccessQuiz = (chapter: any, course: any) => {
  if (chapter.isQuestion) return true
  return false
}

// Thêm helper function để kiểm tra quiz của chapter
const canAccessNextChapter = (currentChapter: any) => {
  if (!currentChapter.questions || currentChapter.questions.length === 0) return true
  return currentChapter.questions.every((q: any) => q.status === 'COMPLETED')
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

  // Get first accessible lesson
  const getFirstAccessibleLesson = useCallback(() => {
    if (!course) return null

    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        if (canAccessLesson(lesson, course)) {
          return lesson
        }
      }
    }
    return null
  }, [course])

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
      const firstLesson = getFirstAccessibleLesson()
      if (firstLesson) {
        router.push(`/kid/course/${courseId}/learn?lessonId=${firstLesson.id}`)
      }
      return
    }
  }, [lessonId, courseLoading, course, courseId, router, getFirstAccessibleLesson])

  // Cập nhật getNextLesson để hỗ trợ quiz
  const getNextLesson = useCallback(() => {
    if (!course || !lessonData?.payload.data) return null

    const currentChapter = course.chapters.find((chapter) =>
      chapter.lessons.some((l) => l.id === lessonData.payload.data.id)
    )
    const currentLessonIndex = currentChapter?.lessons.findIndex((l) => l.id === lessonData.payload.data.id)

    if (currentChapter && currentLessonIndex !== undefined) {
      if (currentLessonIndex < currentChapter.lessons.length - 1) {
        return currentChapter.lessons[currentLessonIndex + 1]
      }

      // Nếu là bài cuối cùng của chapter và chapter có quiz chưa hoàn thành
      if (
        currentLessonIndex === currentChapter.lessons.length - 1 &&
        currentChapter.questions &&
        currentChapter.questions.length > 0 &&
        !currentChapter.questions.every((q: any) => q.status === 'COMPLETED')
      ) {
        return 'QUIZ'
      }

      const nextChapterIndex = course.chapters.findIndex((c) => c.id === currentChapter.id) + 1
      if (nextChapterIndex < course.chapters.length) {
        const nextChapter = course.chapters[nextChapterIndex]

        // Chỉ cho phép truy cập chapter tiếp theo nếu đã hoàn thành quiz của chapter hiện tại
        if (canAccessNextChapter(currentChapter)) {
          return nextChapter.lessons[0]
        }
      }
    }
    return null
  }, [course, lessonData])

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
    if (!course || !lessonData?.payload.data) return null

    const currentChapter = course.chapters.find((chapter) =>
      chapter.lessons.some((l) => l.id === lessonData.payload.data.id)
    )
    const currentLessonIndex = currentChapter?.lessons.findIndex((l) => l.id === lessonData.payload.data.id)

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
  }, [course, lessonData])

  const handleLessonClick = useCallback(
    (lesson: any) => {
      if (canAccessLesson(lesson, course)) {
        router.push(`/kid/course/${courseId}/learn?lessonId=${lesson.id}`)
      }
    },
    [courseId, router, course]
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
            <Link href='/kid/course'>Quay lại danh sách khóa học</Link>
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
        canAccessLesson={canAccessLesson}
        canAccessQuiz={canAccessQuiz}
        handleUpdate={handleUpdate}
        getNextLesson={getNextLesson}
        getPreviousLesson={getPreviousLesson}
        isUpdating={updateCourseMutation.isPending}
        forKid
        backUrl='/kid/course'
        backLabel='Quay lại danh sách khóa học'
      />
    </div>
  )
}

export default LearnPage
