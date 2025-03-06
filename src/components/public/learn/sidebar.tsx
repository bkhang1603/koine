import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { handleErrorApi, cn } from '@/lib/utils'
import { UserCourseProgressResType } from '@/schemaValidations/course.schema'
import { FileText, MonitorPlay, Lock, CheckCircle, Clock, BookOpen } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

type Lesson = UserCourseProgressResType['data']['chapters'][0]['lessons'][0]
type Chapter = UserCourseProgressResType['data']['chapters'][0]

function LearnSidebar({
  sidebarOpen,
  courseProgressData
}: {
  sidebarOpen: boolean
  courseProgressData: UserCourseProgressResType['data']['chapters']
}) {
  const search = useSearchParams()
  const rId = search.get('rId')
  const router = useRouter()

  // Tính toán tổng số bài học và số bài đã hoàn thành
  const totalLessons = courseProgressData.reduce((acc, chapter) => acc + chapter.lessons.length, 0)
  const completedLessons = courseProgressData.reduce(
    (acc, chapter) => acc + chapter.lessons.filter((lesson) => lesson.status === 'YET').length,
    0
  )
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  // Tìm resource NOTYET đầu tiên trong toàn bộ courseProgressData
  const firstNotYetChapterId = courseProgressData
    .flatMap((chapter) => chapter.lessons)
    .find((lesson) => lesson.status === 'NOTYET')?.id

  const firstLessonId = courseProgressData
    .flatMap((chapter) => chapter.lessons)
    .sort((a, b) => a.sequence - b.sequence)[0]?.id

  const handleUpdate = useCallback(
    async ({ lessonId }: { lessonId: string }) => {
      try {
        router.replace(`?rId=${lessonId}`)
      } catch (error) {
        handleErrorApi({ error })
      }
    },
    [router]
  )

  const defaultLessonId = rId
    ? [courseProgressData?.find((lesson) => lesson.lessons.some((resource) => resource.id === rId))?.id || '']
    : [courseProgressData?.map((lesson) => lesson.id)[0]]

  return (
    <div
      className={`absolute xl:relative z-[100] w-full xl:w-1/4 bg-white shadow-lg transition-all duration-300 ease-in-out 
      border-r ${sidebarOpen ? 'left-0' : '-left-full xl:left-0'}`}
    >
      <div className='p-4 border-b'>
        <div className='flex items-center gap-2 mb-3'>
          <BookOpen className='h-5 w-5 text-primary' />
          <h3 className='font-medium'>Nội dung khóa học</h3>
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>
              {completedLessons}/{totalLessons} bài học
            </span>
            <span className='font-medium'>{progressPercentage}% hoàn thành</span>
          </div>
          <Progress value={progressPercentage} className='h-2' />
        </div>
      </div>

      <ScrollArea className='h-[calc(100vh-10rem)]'>
        <Accordion type='multiple' className='w-full' defaultValue={defaultLessonId}>
          {courseProgressData?.map((chapter: Chapter, chapterIndex) => {
            // Tính % hoàn thành của chương
            const chapCompletedLessons = chapter.lessons.filter((l) => l.status === 'YET').length
            const chapTotalLessons = chapter.lessons.length
            const chapProgress = chapTotalLessons > 0 ? Math.round((chapCompletedLessons / chapTotalLessons) * 100) : 0

            return (
              <AccordionItem value={chapter.id} key={chapter.id} className='border-b'>
                <AccordionTrigger className='px-4 py-3 hover:bg-gray-50 transition-colors'>
                  <div className='flex flex-col items-start text-left'>
                    <div className='font-medium flex items-center'>
                      <span>
                        Chương {chapterIndex + 1}: {chapter.title}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 text-xs text-muted-foreground mt-1'>
                      <span>
                        {chapCompletedLessons}/{chapTotalLessons} bài học
                      </span>
                      {chapProgress === 100 && (
                        <Badge variant='outline' className='text-green-600 border-green-200 bg-green-50'>
                          <CheckCircle className='h-3 w-3 mr-1' />
                          Hoàn thành
                        </Badge>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className='pb-1'>
                  <ul className='space-y-1'>
                    {chapter.lessons.map((lesson: Lesson, lessonIndex) => {
                      const isActive = rId === lesson.id || (!rId && lesson.id === firstLessonId)
                      const isLocked = lesson.status === 'NOTYET' && lesson.id !== firstNotYetChapterId

                      return (
                        <li key={lesson.id} className='px-1'>
                          <Button
                            variant={isActive ? 'custom' : 'ghost'}
                            className={cn(
                              'w-full justify-start px-3 py-2 h-auto text-sm font-normal rounded-md',
                              isActive && 'bg-primary/10 text-primary',
                              isLocked && 'opacity-60'
                            )}
                            onClick={() => handleUpdate({ lessonId: lesson.id })}
                            disabled={isLocked}
                          >
                            <div className='flex items-start gap-3'>
                              <div className='flex-shrink-0 mt-0.5'>
                                {lesson.status === 'YET' ? (
                                  <div className='h-5 w-5 rounded-full bg-green-100 flex items-center justify-center'>
                                    <CheckCircle className='h-3.5 w-3.5 text-green-600' />
                                  </div>
                                ) : isLocked ? (
                                  <div className='h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center'>
                                    <Lock className='h-3.5 w-3.5 text-gray-400' />
                                  </div>
                                ) : (
                                  <div className='h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center'>
                                    <Clock className='h-3.5 w-3.5 text-blue-600' />
                                  </div>
                                )}
                              </div>

                              <div className='flex-1 flex flex-col'>
                                <span className='line-clamp-1'>
                                  {lessonIndex + 1}. {lesson.title}
                                </span>
                                <div className='flex items-center gap-2 text-xs text-muted-foreground mt-1'>
                                  {lesson.type === 'VIDEO' && <MonitorPlay className='h-3 w-3' />}
                                  {lesson.type === 'DOCUMENT' && <FileText className='h-3 w-3' />}
                                  {lesson.type === 'BOTH' && <MonitorPlay className='h-3 w-3' />}
                                  <span>
                                    {lesson.type === 'VIDEO'
                                      ? 'Video'
                                      : lesson.type === 'DOCUMENT'
                                        ? 'Tài liệu'
                                        : 'Video & Tài liệu'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Button>
                        </li>
                      )
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </ScrollArea>
    </div>
  )
}
export default LearnSidebar
