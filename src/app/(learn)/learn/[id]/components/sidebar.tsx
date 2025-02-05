import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { handleErrorApi } from '@/lib/utils'
import { useUpdateCourseProgressMutation } from '@/queries/useCourse'
import { UserCourseProgressResType } from '@/schemaValidations/course.schema'
import { Check, FileText, MonitorPlay } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

type Lesson = UserCourseProgressResType['data']['chapters'][0]['lessons'][0]
type Chapter = UserCourseProgressResType['data']['chapters'][0]

function LearnSidebar({
  sidebarOpen,
  courseProgressData
}: {
  sidebarOpen: boolean
  courseProgressData: UserCourseProgressResType['data']['chapters']
}) {
  const { id } = useParams()
  const search = useSearchParams()
  const rId = search.get('rId')
  const router = useRouter()

  const updateCourseProgressMutation = useUpdateCourseProgressMutation()

  // Tìm resource NOTYET đầu tiên trong toàn bộ courseProgressData
  const firstNotYetChapterId = courseProgressData
    .flatMap((chapter) => chapter.lessons)
    .find((lesson) => lesson.status === 'NOTYET')?.id

  const handleUpdate = async ({ lessonId, status }: { lessonId: string; status: string }) => {
    try {
      if (status === 'NOTYET') {
        await updateCourseProgressMutation.mutateAsync(lessonId)
      }

      router.push(`/learn/${id}?rId=${lessonId}`)
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const defaultLessonId = rId
    ? [courseProgressData?.find((lesson) => lesson.lessons.some((resource) => resource.id === rId))?.id || '']
    : [courseProgressData?.map((lesson) => lesson.id)[0]]

  return (
    <div
      className={`absolute md:relative z-10 w-full md:w-80 bg-card transition-all duration-300 ease-in-out ${sidebarOpen ? 'left-0' : '-left-full md:left-0'}`}
    >
      <ScrollArea className='h-[calc(100vh-4rem)]'>
        <Accordion type='multiple' className='w-full border-l' defaultValue={defaultLessonId}>
          {courseProgressData?.map((chapter: Chapter) => (
            <AccordionItem value={chapter.id} key={chapter.id}>
              <AccordionTrigger className='px-4'>{chapter.title}</AccordionTrigger>
              <AccordionContent className='px-4'>
                <ul>
                  {chapter.lessons.map((lesson: Lesson, index: number) => (
                    <li key={lesson.id} className='flex items-center'>
                      <Button
                        variant={rId === lesson.id || (!rId && index === 0) ? 'linkNoUnderline' : 'ghostBlur'}
                        className='w-full justify-start px-4 pr-8 py-2 h-12 text-sm font-normal'
                        onClick={() => handleUpdate({ lessonId: lesson.id, status: lesson.status })}
                        disabled={lesson.status === 'NOTYET' && lesson.id !== firstNotYetChapterId}
                      >
                        <div className='flex items-center'>
                          {lesson.type === 'VIDEO' && <MonitorPlay className='h-5 w-5 mr-2' />}
                          {lesson.type === 'DOCUMENT' && <FileText className='h-5 w-5 mr-2' />}
                          {lesson.type === 'BOTH' && <MonitorPlay className='h-5 w-5 mr-2' />}
                          <span className='truncate'>{lesson.title}</span>
                        </div>
                        {lesson.status === 'YET' && <Check className='h-5 w-5 ml-2 flex-shrink-0' />}
                      </Button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  )
}

export default LearnSidebar
