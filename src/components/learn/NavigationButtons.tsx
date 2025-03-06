import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'

type NavigationButtonsProps = {
  course: any
  lesson: any
  prevLesson: any
  nextLesson: any
  canAccessNext: boolean
  onPrevClick: () => void
  onNextClick: () => void
  onComplete: () => void
  isUpdating: boolean
  // eslint-disable-next-line no-unused-vars
  canAccessLesson: (lesson: any, course: any) => boolean
}

export const NavigationButtons = ({
  course,
  lesson,
  prevLesson,
  canAccessNext,
  onPrevClick,
  onNextClick,
  onComplete,
  isUpdating,
  canAccessLesson
}: NavigationButtonsProps) => {
  return (
    <div className='pt-6 border-t'>
      <div className='flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto'>
        <Button
          variant='outline'
          className='w-full sm:w-[160px] h-12 rounded-xl border-2 hover:bg-gray-50'
          onClick={onPrevClick}
          disabled={!prevLesson || !canAccessLesson(prevLesson, course)}
        >
          <ChevronLeft className='w-5 h-5 mr-2' />
          <span className='font-medium'>Bài trước</span>
        </Button>

        {lesson?.status === 'NOTYET' ? (
          <Button
            className='w-full sm:flex-1 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all duration-200'
            onClick={onComplete}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <div className='flex items-center'>
                <Loading color='bg-white' />
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <CheckCircle2 className='w-5 h-5' />
                <span className='font-medium'>Hoàn thành bài học</span>
              </div>
            )}
          </Button>
        ) : (
          <div className='w-full sm:flex-1 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400'>
            <CheckCircle2 className='w-5 h-5 mr-2' />
            <span className='font-medium'>Đã hoàn thành</span>
          </div>
        )}

        <Button
          className='w-full sm:w-[160px] h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200'
          onClick={onNextClick}
          disabled={!canAccessNext}
        >
          <span className='font-medium'>Bài tiếp theo</span>
          <ChevronRight className='w-5 h-5 ml-2' />
        </Button>
      </div>

      <div className='mt-6 flex items-center justify-center gap-2 text-sm text-gray-500'>
        <div className='flex items-center gap-1.5'>
          <CheckCircle2 className='w-4 h-4 text-green-500' />
          <span>{course.totalCompletedLessonsInCourse} bài đã học</span>
        </div>
        <span>•</span>
        <div className='flex items-center gap-1.5'>
          <BookOpen className='w-4 h-4 text-primary' />
          <span>{course.totalLessonsInCourse - course.totalCompletedLessonsInCourse} bài còn lại</span>
        </div>
      </div>
    </div>
  )
}
