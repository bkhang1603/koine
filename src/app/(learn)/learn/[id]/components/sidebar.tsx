import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { handleErrorApi } from '@/lib/utils'
import { useUpdateCourseProgressMutation } from '@/queries/useCourse'
import { UserCourseProgressResType } from '@/schemaValidations/course.schema'
import { Check, FileText, MonitorPlay } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

type CourseResource = UserCourseProgressResType['data'][0]['courseResources'][0]
type Lesson = UserCourseProgressResType['data'][0]

function LearnSidebar({
  sidebarOpen,
  courseProgressData
}: {
  sidebarOpen: boolean
  courseProgressData: UserCourseProgressResType['data']
}) {
  const { id } = useParams()
  const search = useSearchParams()
  const rId = search.get('rId')
  const router = useRouter()

  const updateCourseProgressMutation = useUpdateCourseProgressMutation()

  // Tìm resource NOTYET đầu tiên trong toàn bộ courseProgressData
  const firstNotYetResourceId = courseProgressData
    .flatMap((lesson) => lesson.courseResources)
    .find((resource) => resource.status === 'NOTYET')?.id

  const handleUpdate = async ({ resourceId, status }: { resourceId: string; status: string }) => {
    try {
      if (status === 'NOTYET') {
        await updateCourseProgressMutation.mutateAsync(resourceId)
      }

      router.push(`/learn/${id}?rId=${resourceId}`)
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const defaultLessonId = rId
    ? [courseProgressData?.find((lesson) => lesson.courseResources.some((resource) => resource.id === rId))?.id || '']
    : [courseProgressData?.map((lesson) => lesson.id)[0]]

  return (
    <div
      className={`absolute md:relative z-10 w-full md:w-80 bg-card transition-all duration-300 ease-in-out ${sidebarOpen ? 'left-0' : '-left-full md:left-0'}`}
    >
      <ScrollArea className='h-[calc(100vh-4rem)]'>
        <Accordion type='multiple' className='w-full border-l' defaultValue={defaultLessonId}>
          {courseProgressData?.map((lesson: Lesson) => (
            <AccordionItem value={lesson.id} key={lesson.id}>
              <AccordionTrigger className='px-4'>{lesson.title}</AccordionTrigger>
              <AccordionContent className='px-4'>
                <ul>
                  {lesson.courseResources.map((resource: CourseResource, index: number) => (
                    <li key={resource.id} className='flex items-center'>
                      <Button
                        variant={rId === resource.id || (!rId && index === 0) ? 'linkNoUnderline' : 'ghostBlur'}
                        className='w-full justify-start px-4 pr-8 py-2 h-12 text-sm font-normal'
                        onClick={() => handleUpdate({ resourceId: resource.id, status: resource.status })}
                        disabled={resource.status === 'NOTYET' && resource.id !== firstNotYetResourceId}
                      >
                        <div className='flex items-center'>
                          {resource.type === 'VIDEO' && <MonitorPlay className='h-5 w-5 mr-2' />}
                          {resource.type === 'DOCUMENT' && <FileText className='h-5 w-5 mr-2' />}
                          {resource.type === 'BOTH' && <MonitorPlay className='h-5 w-5 mr-2' />}
                          <span className='truncate'>{resource.title}</span>
                        </div>
                        {resource.status === 'YET' && <Check className='h-5 w-5 ml-2 flex-shrink-0' />}
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
