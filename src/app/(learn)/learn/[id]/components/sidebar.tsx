import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CourseResType } from '@/schemaValidations/course.schema'
import { Check, FileText, MonitorPlay } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

type CourseResource = CourseResType['data']['lessons'][0]['courseResources'][0]
type Lesson = CourseResType['data']['lessons'][0]

function LearnSidebar({ courseData, sidebarOpen }: { courseData: CourseResType['data']; sidebarOpen: boolean }) {
  const { id } = useParams()
  const search = useSearchParams()
  const rId = search.get('rId')
  const router = useRouter()

  const completedResources: string[] = [] // You'll need to implement this based on your data structure

  return (
    <div
      className={`absolute md:relative z-10 w-full md:w-80 bg-card transition-all duration-300 ease-in-out ${sidebarOpen ? 'left-0' : '-left-full md:left-0'}`}
    >
      <ScrollArea className='h-[calc(100vh-4rem)]'>
        <Accordion
          type='multiple'
          className='w-full border-l'
          defaultValue={
            rId
              ? [
                  courseData?.lessons.find((lesson) => lesson.courseResources.some((resource) => resource.id === rId))
                    ?.id || ''
                ]
              : [courseData?.lessons.map((lesson) => lesson.id)[0]]
          }
        >
          {courseData?.lessons.map((lesson: Lesson) => (
            <AccordionItem value={lesson.id} key={lesson.id}>
              <AccordionTrigger className='px-4'>{lesson.title}</AccordionTrigger>
              <AccordionContent className='px-4'>
                <ul>
                  {lesson.courseResources.map((resource: CourseResource) => (
                    <li key={resource.id} className='flex items-center'>
                      <Button
                        variant={rId === resource.id ? 'linkNoUnderline' : 'ghostBlur'}
                        className='w-full justify-start px-4 pr-8 py-2 h-12 text-sm font-normal'
                        onClick={() => {
                          router.push(`/learn/${id}?rId=${resource.id}`)
                        }}
                      >
                        <div className='flex items-center'>
                          {resource.type === 'VIDEO' && <MonitorPlay className='h-5 w-5 mr-2' />}
                          {resource.type === 'DOCUMENT' && <FileText className='h-5 w-5 mr-2' />}
                          {resource.type === 'BOTH' && <MonitorPlay className='h-5 w-5 mr-2' />}
                          <span className='truncate'>{resource.title}</span>
                        </div>
                        {completedResources.includes(resource.id) && <Check className='h-5 w-5 ml-2 flex-shrink-0' />}
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
