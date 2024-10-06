import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Clock, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import images from '@/assets/images'
import { handleErrorApi } from '@/lib/utils'
import courseApiRequest from '@/apiRequests/course'
import { CourseResType } from '@/schemaValidations/course.schema'
import BreadCrumbCustom from '@/components/breadcrumb-custom'

const data = {
  bannerImage: images.courseSkinCareBanner,
  title: 'Chăm sóc da cơ bản',
  description:
    'Một khóa học về chăm sóc da cơ bản, giúp bạn hiểu rõ hơn về cấu trúc da, cách chăm sóc da đúng cách và chọn lựa sản phẩm phù hợp với làn da của mình.',
  duration: '1 giờ 30 phút',
  chapters: 4,
  lessons: 12,
  tags: ['Chăm sóc da', 'Làm đẹp', 'Sức khỏe', 'Dậy thì'],
  price: 0,
  courseContent: [
    {
      title: 'Những điều cơ bản về da',
      lessons: ['Cấu trúc da', 'Chức năng của da', 'Cách chăm sóc da đúng cách']
    },
    {
      title: 'Dinh dưỡng cho làn da',
      lessons: ['Thực phẩm tốt cho da', 'Thực phẩm không tốt cho da', 'Cách chăm sóc da từ bên trong']
    },
    {
      title: 'Chăm sóc da mặt',
      lessons: ['Cách chăm sóc da mặt hằng ngày', 'Cách chăm sóc da mặt đúng cách', 'Chọn lựa sản phẩm phù hợp']
    },
    {
      title: 'Bảo vệ da khỏi tác động bên ngoài',
      lessons: ['Cách chống nắng', 'Cách chống ô nhiễm', 'Cách chống lão hóa']
    }
  ]
}

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
              <CardTitle className='text-xl'>{courseData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>{courseData.description}</p>
              <div className='flex flex-wrap gap-2 mb-4'>
                {data.tags.map((tag, index) => (
                  <Badge key={index} variant='default'>
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div className='flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  <span>{data.duration}</span>
                </div>

                <div className='flex items-center gap-2'>
                  <BookOpen className='w-4 h-4' />
                  <span>
                    {data.chapters} chương và {data.lessons} bài học
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Nội dung khóa học</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type='multiple' className='w-full'>
                {data.courseContent.map((content, index) => (
                  <AccordionItem key={index} value={`module-${index + 1}`}>
                    <AccordionTrigger>
                      <div className='flex justify-between items-center'>
                        <div>{content.title}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className='pl-4 space-y-2 list-disc list-inside text-sm text-gray-500'>
                        {content.lessons.map((lesson, index) => (
                          <li key={index}>{lesson}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-6'>
          <Card className='sticky top-28'>
            <CardHeader>
              <CardTitle className='text-3xl font-bold'>
                {courseData.price === 0 ? 'Miễn phí' : `$${data.price}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant={'default'} className='w-full mb-4' size='lg'>
                Đăng ký ngay
              </Button>

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
