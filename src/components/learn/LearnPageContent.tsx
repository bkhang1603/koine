/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { QuizContent } from './QuizContent'
import { LessonContent } from './LessonContent'
import { WelcomeScreen } from './WelcomeScreen'
import { NavigationButtons } from './NavigationButtons'
import { Sidebar } from './Sidebar'

interface LearnPageContentProps {
  course: any
  lesson: any
  lessonId: string | null
  courseId: string
  isLoading: boolean
  isFetching?: boolean
  onLessonClick: (lesson: any) => void
  canAccessLesson: (lesson: any, course: any) => boolean
  handleUpdate: ({ lessonId, status }: { lessonId: string; status: string }) => void
  getNextLesson: () => any
  getPreviousLesson: () => any
  isUpdating: boolean
  forKid?: boolean
  backUrl: string
  backLabel: string
}

export function LearnPageContent({
  course,
  lesson,
  lessonId,
  courseId,
  isLoading,
  isFetching,
  onLessonClick,
  canAccessLesson,
  handleUpdate,
  getNextLesson,
  getPreviousLesson,
  isUpdating,
  forKid,
  backUrl,
  backLabel
}: LearnPageContentProps) {
  const [selectedChapterQuiz, setSelectedChapterQuiz] = useState<any>(null)

  useEffect(() => {
    setSelectedChapterQuiz(null)
  }, [lessonId])

  const handleQuizClick = (chapter: any) => {
    setSelectedChapterQuiz(chapter)
  }

  const handleQuizComplete = async (score: number) => {
    if (score >= 70 && course) {
      const currentChapterIndex = course.chapters.findIndex((c: any) => c.id === selectedChapterQuiz.id)
      if (currentChapterIndex < course.chapters.length - 1) {
        const nextChapter = course.chapters[currentChapterIndex + 1]
        const firstLesson = nextChapter.lessons[0]
        if (firstLesson) {
          onLessonClick(firstLesson)
        }
      }
    }
  }

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

  return (
    <div className='grid lg:grid-cols-[340px_1fr] gap-8'>
      <Sidebar
        course={course}
        courseId={courseId}
        lessonId={lessonId}
        onLessonClick={onLessonClick}
        canAccessLesson={canAccessLesson}
        onQuizClick={handleQuizClick}
        forKid={forKid}
      />

      <Card className='bg-white backdrop-blur-sm border-none shadow-lg flex flex-col overflow-hidden'>
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
              ) : selectedChapterQuiz ? (
                <QuizContent
                  chapter={selectedChapterQuiz}
                  onComplete={handleQuizComplete}
                  onRetry={() => setSelectedChapterQuiz(selectedChapterQuiz)}
                />
              ) : lesson ? (
                <LessonContent lesson={lesson} />
              ) : (
                <WelcomeScreen />
              )}
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        {lesson && !selectedChapterQuiz && (
          <div className='flex-shrink-0 bg-white py-6'>
            <NavigationButtons
              course={course}
              lesson={lesson}
              prevLesson={getPreviousLesson()}
              nextLesson={getNextLesson()}
              canAccessNext={(() => {
                const next = getNextLesson()
                if (!next) return false
                if (next === 'QUIZ') return true
                return canAccessLesson(next, course)
              })()}
              onPrevClick={() => {
                const prevLesson = getPreviousLesson()
                if (prevLesson) onLessonClick(prevLesson)
              }}
              onNextClick={() => {
                const next = getNextLesson()
                if (next === 'QUIZ') {
                  const currentChapter = course.chapters.find((chapter: any) =>
                    chapter.lessons.some((l: any) => l.id === lesson.id)
                  )
                  if (currentChapter) {
                    setSelectedChapterQuiz(currentChapter)
                  }
                } else if (next) {
                  onLessonClick(next)
                }
              }}
              onComplete={() => handleUpdate({ lessonId: lesson.id, status: lesson.status })}
              isUpdating={Boolean(isUpdating || isFetching)}
              canAccessLesson={canAccessLesson}
            />
          </div>
        )}
      </Card>
    </div>
  )
}
