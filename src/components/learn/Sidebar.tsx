/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, BookOpen, HelpCircle, Lock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { LessonItem } from './LessonItem'
import { QuizItem } from './QuizItem'
import { cn } from '@/lib/utils'

type SidebarProps = {
  course: any
  courseId: string
  lessonId?: string | null
  onLessonClick: (lesson: any) => void
  canAccessLesson: (lesson: any, course: any) => boolean
  forKid?: boolean
  onQuizClick: (chapter: any) => void
}

// Thêm helper function để check quiz có thể truy cập
const canAccessQuiz = (chapter: any, course: any) => {
  // Kiểm tra xem tất cả bài học trong chapter hiện tại đã hoàn thành chưa
  const allLessonsCompleted = chapter.lessons.every((lesson: any) => lesson.status === 'DONE')

  // Nếu là chapter đầu tiên, chỉ cần kiểm tra các bài học trong chapter đó
  const isFirstChapter = course.chapters[0].id === chapter.id
  if (isFirstChapter) return allLessonsCompleted

  // Nếu không phải chapter đầu tiên, cần kiểm tra cả chapter trước đó
  const currentChapterIndex = course.chapters.findIndex((c: any) => c.id === chapter.id)
  const previousChapter = course.chapters[currentChapterIndex - 1]

  // Kiểm tra xem tất cả bài học và quiz của chapter trước đã hoàn thành chưa
  const previousChapterCompleted = previousChapter.lessons.every((lesson: any) => lesson.status === 'DONE')
  const previousQuizCompleted = !previousChapter.questions || previousChapter.questions.length === 0

  return allLessonsCompleted && (previousChapterCompleted || previousQuizCompleted)
}

export const Sidebar = ({
  course,
  courseId,
  lessonId,
  onLessonClick,
  canAccessLesson,
  forKid,
  onQuizClick
}: SidebarProps) => {
  return (
    <div className='space-y-5'>
      {forKid && (
        <Button variant='outline' size='lg' className='w-full rounded-xl gap-2 bg-white/50 backdrop-blur-sm' asChild>
          <Link href={`/kid/course/${courseId}`}>
            <ArrowLeft className='h-4 w-4' /> Quay lại khóa học
          </Link>
        </Button>
      )}

      <div className='sticky top-5'>
        <Card className='bg-white/50 backdrop-blur-sm border-none shadow-lg'>
          <div className='p-5 border-b'>
            <h3 className='font-semibold text-lg line-clamp-2'>{course.title}</h3>
            <div className='mt-4 space-y-3'>
              <Progress value={course.courseCompletionPercentage} className='h-2' />
              <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2 text-gray-600'>
                  <BookOpen className='w-4 h-4' />
                  <span>
                    {course.totalCompletedLessonsInCourse}/{course.totalLessonsInCourse} bài học
                  </span>
                </div>
                <span className='font-medium text-primary'>{course.courseCompletionPercentage}%</span>
              </div>
            </div>
          </div>

          <div className='max-h-[calc(100vh-280px)] overflow-y-auto'>
            {course.chapters.map((chapter: any, index: number) => (
              <div key={chapter.id} className='border-b last:border-none'>
                <div className='p-4 bg-gray-50/50'>
                  <div className='flex items-center gap-3'>
                    <span className='flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 text-primary text-sm font-medium'>
                      {index + 1}
                    </span>
                    <h4 className='font-medium line-clamp-1'>{chapter.title}</h4>
                  </div>
                </div>

                <div className='divide-y'>
                  {chapter.lessons.map((lesson: any) => (
                    <LessonItem
                      key={lesson.id}
                      lesson={lesson}
                      isActive={lessonId === lesson.id}
                      isAccessible={canAccessLesson(lesson, course)}
                      onClick={() => onLessonClick(lesson)}
                    />
                  ))}

                  {/* Thay thế phần quiz button cũ bằng QuizItem */}
                  {chapter.questions && chapter.questions.length > 0 && (
                    <QuizItem
                      chapter={chapter}
                      index={index}
                      isAccessible={canAccessQuiz(chapter, course)}
                      onClick={() => onQuizClick(chapter)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
