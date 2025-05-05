/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { QuizContent } from './QuizContent'
import { LessonContent } from './LessonContent'
import { WelcomeScreen } from './WelcomeScreen'
import { NavigationButtons } from './NavigationButtons'
import { Sidebar } from './Sidebar'

interface LearnPageContentProps {
  quizId: string | null
  course: any
  lesson: any
  lessonId: string | null
  courseId: string
  isLoading: boolean
  isFetching?: boolean
  onLessonClick: (lesson: any) => void
  onQuizClick: (chapter: any) => void
  handleUpdate: ({ lessonId, courseId, status }: { lessonId: string; courseId: string; status: string }) => void
  isUpdating: boolean
  forKid?: boolean
  backUrl: string
  backLabel: string
}

export function LearnPageContent({
  quizId,
  course,
  lesson,
  lessonId,
  courseId,
  isLoading,
  isFetching,
  onLessonClick,
  onQuizClick,
  handleUpdate,
  isUpdating,
  forKid,
  backUrl,
  backLabel
}: LearnPageContentProps) {
  if (!course) {
    return (
      <div className='py-8'>
        <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
          <h3 className='text-lg font-medium text-gray-900'>Không tìm thấy khóa học</h3>
          <p className='text-gray-500'>Khóa học không tồn tại hoặc đã bị xóa</p>
          <Button asChild>
            <Link href={backUrl}>{backLabel}</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Helper function to check if a lesson is accessible
  const canAccessLesson = (targetLesson: any, currentCourse: any) => {
    // Find the chapter containing this lesson
    const chapter = currentCourse.chapters.find((c: any) => c.lessons.some((l: any) => l.id === targetLesson.id))
    if (!chapter) return false

    // Get all lessons in this chapter
    const chapterLessons = chapter.lessons.sort((a: any, b: any) => a.sequence - b.sequence)
    const currentLessonIndex = chapterLessons.findIndex((l: any) => l.id === targetLesson.id)

    // Check if this is the first lesson in the chapter
    if (currentLessonIndex === 0) {
      // If it's the first lesson, check if previous chapter's quiz is completed
      const chapterIndex = currentCourse.chapters.findIndex((c: any) => c.id === chapter.id)
      if (chapterIndex > 0) {
        const prevChapter = currentCourse.chapters[chapterIndex - 1]
        // If previous chapter has quiz, check if it's completed
        if (prevChapter.questions && prevChapter.questions.length > 0) {
          return prevChapter.isTakeQuiz
        }
        // If previous chapter has no quiz, check if all lessons are completed
        return prevChapter.lessons.every((l: any) => l.status === 'YET')
      }
      // If this is the first chapter, always allow access to its first lesson
      return true
    }

    // For other lessons, check if previous lesson is completed
    const prevLesson = chapterLessons[currentLessonIndex - 1]
    return prevLesson.status === 'YET'
  }

  // Helper function to check if a quiz is accessible
  const canAccessQuiz = (chapter: any, currentCourse: any) => {
    // Check if all lessons in this chapter are completed
    const allLessonsCompleted = chapter.lessons.every((l: any) => l.status === 'YET')
    if (!allLessonsCompleted) return false

    // Check if previous chapter's quiz is completed (if exists)
    const chapterIndex = currentCourse.chapters.findIndex((c: any) => c.id === chapter.id)
    if (chapterIndex > 0) {
      const prevChapter = currentCourse.chapters[chapterIndex - 1]
      if (prevChapter.questions && prevChapter.questions.length > 0) {
        return prevChapter.isTakeQuiz
      }
      // If previous chapter has no quiz, check if all lessons are completed
      return prevChapter.lessons.every((l: any) => l.status === 'YET')
    }

    return true // For first chapter, only check if all lessons are completed
  }

  // Helper function to get next accessible lesson
  const getNextAccessibleLesson = (currentLesson: any) => {
    const chapter = course.chapters.find((c: any) => c.lessons.some((l: any) => l.id === currentLesson.id))
    if (!chapter) return null

    const chapterLessons = chapter.lessons.sort((a: any, b: any) => a.sequence - b.sequence)
    const currentIndex = chapterLessons.findIndex((l: any) => l.id === currentLesson.id)

    // Check next lesson in same chapter
    if (currentIndex < chapterLessons.length - 1) {
      const nextLesson = chapterLessons[currentIndex + 1]
      if (canAccessLesson(nextLesson, course)) return nextLesson
    }

    // If this is the last lesson in the chapter
    if (currentIndex === chapterLessons.length - 1) {
      // If chapter has quiz, return quiz
      if (chapter.questions && chapter.questions.length > 0) {
        if (canAccessQuiz(chapter, course)) {
          return { type: 'QUIZ', id: chapter.id }
        }
        return null // Don't allow moving to next chapter if quiz is not completed
      }

      // If chapter has no quiz, check first lesson of next chapter
      const chapterIndex = course.chapters.findIndex((c: any) => c.id === chapter.id)
      const nextChapter = course.chapters[chapterIndex + 1]
      if (nextChapter && nextChapter.lessons.length > 0) {
        const firstLesson = nextChapter.lessons[0]
        if (canAccessLesson(firstLesson, course)) return firstLesson
      }
    }

    return null
  }

  // Helper function to get previous accessible lesson
  const getPreviousAccessibleLesson = (currentLesson: any) => {
    const chapter = course.chapters.find((c: any) => c.lessons.some((l: any) => l.id === currentLesson.id))
    if (!chapter) return null

    const chapterLessons = chapter.lessons.sort((a: any, b: any) => a.sequence - b.sequence)
    const currentIndex = chapterLessons.findIndex((l: any) => l.id === currentLesson.id)

    // Check previous lesson in same chapter
    if (currentIndex > 0) {
      return chapterLessons[currentIndex - 1]
    }

    // Check quiz in previous chapter
    const chapterIndex = course.chapters.findIndex((c: any) => c.id === chapter.id)
    if (chapterIndex > 0) {
      const prevChapter = course.chapters[chapterIndex - 1]
      if (prevChapter.questions && prevChapter.questions.length > 0) {
        return { type: 'QUIZ', id: prevChapter.id }
      }
      // Return last lesson of previous chapter
      return prevChapter.lessons[prevChapter.lessons.length - 1]
    }

    return null
  }

  // Update getNextItem and getPreviousItem to use new helper functions
  const getNextItem = () => {
    if (quizId) {
      const chapter = course?.chapters.find((c: any) => c.id === quizId)
      if (!chapter) return null

      const chapterIndex = course.chapters.findIndex((c: any) => c.id === quizId)
      const nextChapter = course.chapters[chapterIndex + 1]
      if (nextChapter && nextChapter.lessons.length > 0) {
        const firstLesson = nextChapter.lessons[0]
        if (canAccessLesson(firstLesson, course)) return firstLesson
      }
      return null
    }

    if (lessonId) {
      const currentLesson = course?.chapters.flatMap((c: any) => c.lessons).find((l: any) => l.id === lessonId)
      if (!currentLesson) return null

      return getNextAccessibleLesson(currentLesson)
    }

    return null
  }

  const getPreviousItem = () => {
    if (quizId) {
      const chapter = course?.chapters.find((c: any) => c.id === quizId)
      if (!chapter) return null

      const lastLesson = chapter.lessons[chapter.lessons.length - 1]
      if (lastLesson) return lastLesson
      return null
    }

    if (lessonId) {
      const currentLesson = course?.chapters.flatMap((c: any) => c.lessons).find((l: any) => l.id === lessonId)
      if (!currentLesson) return null

      return getPreviousAccessibleLesson(currentLesson)
    }

    return null
  }

  // Handle navigation click
  const handleNavigationClick = (item: any) => {
    if (!item) return

    if (item.type === 'QUIZ') {
      onQuizClick(course.chapters.find((c: any) => c.id === item.id))
    } else {
      onLessonClick(item)
    }
  }

  // Check if current lesson is completed
  const isCurrentLessonCompleted = () => {
    if (quizId) {
      const chapter = course?.chapters.find((c: any) => c.id === quizId)
      return chapter?.isTakeQuiz || false
    }
    if (lessonId) {
      const currentLesson = course?.chapters.flatMap((c: any) => c.lessons).find((l: any) => l.id === lessonId)
      return currentLesson?.status === 'YET'
    }
    return false
  }

  // Check if all lessons in current chapter are completed
  const areAllLessonsInChapterCompleted = () => {
    if (lessonId) {
      const currentLesson = course?.chapters.flatMap((c: any) => c.lessons).find((l: any) => l.id === lessonId)
      if (!currentLesson) return false

      const chapter = course?.chapters.find((c: any) => c.lessons.some((l: any) => l.id === currentLesson.id))
      if (!chapter) return false

      return chapter.lessons.every((l: any) => l.status === 'YET')
    }
    return false
  }

  // Check if next item is accessible
  const isNextItemAccessible = () => {
    const nextItem = getNextItem()
    if (!nextItem) return false

    if (nextItem.type === 'QUIZ') {
      return areAllLessonsInChapterCompleted()
    }

    if (lessonId) {
      const currentLesson = course?.chapters.flatMap((c: any) => c.lessons).find((l: any) => l.id === lessonId)
      if (!currentLesson) return false

      const chapter = course?.chapters.find((c: any) => c.lessons.some((l: any) => l.id === currentLesson.id))
      if (!chapter) return false

      // If this is the last lesson in the chapter and chapter has quiz
      if (currentLesson.sequence === chapter.lessons.length && chapter.questions && chapter.questions.length > 0) {
        return false // Force user to take quiz
      }

      // If next item is first lesson of next chapter, check if current chapter's quiz is completed
      if (nextItem.sequence === 1) {
        const chapterIndex = course.chapters.findIndex((c: any) => c.id === chapter.id)
        const nextChapter = course.chapters[chapterIndex + 1]
        if (nextChapter && nextChapter.lessons[0].id === nextItem.id) {
          if (chapter.questions && chapter.questions.length > 0) {
            return chapter.isTakeQuiz
          }
        }
      }
    }

    return true
  }

  return (
    <div className='grid lg:grid-cols-[340px_1fr] gap-8'>
      <Sidebar
        quizId={quizId}
        course={course}
        courseId={courseId}
        lessonId={lessonId}
        onLessonClick={onLessonClick}
        canAccessLesson={canAccessLesson}
        canAccessQuiz={canAccessQuiz}
        onQuizClick={onQuizClick}
        forKid={forKid}
      />

      <Card className='bg-white backdrop-blur-sm border-none shadow-lg flex flex-col min-h-[calc(100vh-10rem)] overflow-hidden'>
        <div className='flex-1 overflow-y-auto'>
          <div className='p-8'>
            <div className='max-w-4xl mx-auto'>
              {isLoading ? (
                <div className='space-y-6'>
                  <Skeleton className='h-10 w-2/3' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                  <div className='aspect-video'>
                    <Skeleton className='h-full w-full rounded-2xl' />
                  </div>
                </div>
              ) : quizId ? (
                <QuizContent
                  chapter={course?.chapters.find((c: any) => c.id === quizId)}
                  onPrevClick={() => handleNavigationClick(getPreviousItem())}
                  onNextClick={() => handleNavigationClick(getNextItem())}
                  canAccessNext={!!getNextItem() && isCurrentLessonCompleted()}
                  prevLesson={getPreviousItem()}
                  nextLesson={getNextItem()}
                />
              ) : lesson ? (
                <LessonContent lesson={lesson} />
              ) : (
                <WelcomeScreen />
              )}
            </div>
          </div>
        </div>

        {/* Navigation Footer - Always at the bottom */}
        {lesson && (
          <div className='flex-shrink-0 bg-white py-6'>
            <div className='max-w-4xl mx-auto px-8'>
              <NavigationButtons
                course={course}
                lesson={lesson}
                prevLesson={getPreviousItem()}
                nextLesson={getNextItem()}
                canAccessNext={!!getNextItem() && isCurrentLessonCompleted() && isNextItemAccessible()}
                onPrevClick={() => handleNavigationClick(getPreviousItem())}
                onNextClick={() => handleNavigationClick(getNextItem())}
                onComplete={() => handleUpdate({ lessonId: lesson.id, courseId: course.id, status: lesson.status })}
                isUpdating={Boolean(isUpdating || isFetching)}
                canAccessLesson={canAccessLesson}
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
