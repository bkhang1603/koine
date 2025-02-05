import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Clock, BookOpen, Star, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { handleErrorApi } from '@/lib/utils'
import courseApiRequest from '@/apiRequests/course'
import { CourseResType } from '@/schemaValidations/course.schema'
import BreadCrumbCustom from '@/components/breadcrumb-custom'
import EnrollButton from '@/app/(public)/course/[id]/components/enroll-button'
import CourseButton from '@/app/(public)/course/[id]/components/course-button'

export default async function CourseDetail({ params: { id } }: { params: { id: string } }) {
  let courseData: CourseResType['data'] | null = null

  try {
    const { payload } = await courseApiRequest.getCourse(id)
    courseData = payload.data
  } catch (error) {
    handleErrorApi({ error })
  }

  if (!courseData) {
    return <p>Không tìm thấy khóa học</p>
  }

  return (
    <div className='container'>
      <div className='h-80 rounded-lg overflow-hidden shadow-md'>
        <Image
          src={courseData.imageBanner}
          alt='Course banner'
          width={2000}
          height={2000}
          quality={100}
          className='w-full h-full object-cover'
        />
      </div>

      <BreadCrumbCustom className='my-6' />

      <div className='grid gap-6 md:grid-cols-3'>
        <div className='md:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl'>{courseData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>{courseData.description}</p>
              <div className='flex flex-wrap gap-2 mb-4'>
                {courseData.categories.map((category, index) => (
                  <Badge key={index} variant='default'>
                    {category.name}
                  </Badge>
                ))}
              </div>
              <div className='grid grid-cols-4 gap-4 text-sm'>
                <div className='flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  <span>{courseData.durations}</span>
                </div>

                <div className='flex items-center gap-2'>
                  <BookOpen className='w-4 h-4' />
                  <span>
                    {courseData.chapters.length} {courseData.chapters.length > 1 ? 'chương' : 'chương'}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <Star className='w-4 h-4' />
                  <span>{courseData.aveRating === 0 ? 5 : courseData.aveRating} sao</span>
                </div>

                <div className='flex items-center gap-2'>
                  <Users className='w-4 h-4' />
                  <span>{courseData.totalEnrollment} học viên</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Nội dung khóa học</CardTitle>
            </CardHeader>
            <CardContent>
              {courseData.chapters.length !== 0 && (
                <Accordion type='multiple' className='w-full'>
                  {courseData.chapters.map((chapter, index) => (
                    <AccordionItem key={index} value={`module-${index + 1}`}>
                      <AccordionTrigger>
                        <div className='flex justify-between items-center'>
                          <div>{chapter.title}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className='pl-4 space-y-2 list-disc list-inside text-sm text-gray-500'>
                          {chapter.lessons.map((lesson, index) => (
                            <li key={index}>{lesson.title}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}

              {courseData.chapters.length === 0 && <p>Không có dữ liệu</p>}
            </CardContent>
          </Card>
        </div>

        <div className='space-y-6'>
          <Card className='sticky top-28'>
            <CardHeader>
              <CardTitle className='text-2xl font-semibold'>
                {courseData.price === 0 ? 'Miễn phí' : `${courseData.price.toLocaleString()}đ`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {courseData.price === 0 && <EnrollButton id={courseData.id} />}

              {courseData.price !== 0 && <CourseButton id={courseData.id} />}

              <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
                Trải nghiệm miễn phí khóa học chăm sóc da cơ bản.
              </p>

              <ul className='space-y-2 text-sm'>
                <li className='flex items-center'>
                  <svg
                    className='w-4 h-4 mr-2 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                  </svg>
                  Thời gian linh hoạt
                </li>
                <li className='flex items-center'>
                  <svg
                    className='w-4 h-4 mr-2 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                  </svg>
                  Cải thiện kĩ năng mềm
                </li>
                <li className='flex items-center'>
                  <svg
                    className='w-4 h-4 mr-2 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                  </svg>
                  Nội dung sinh động
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
