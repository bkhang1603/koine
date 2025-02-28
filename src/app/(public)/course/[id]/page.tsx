import { handleErrorApi } from '@/lib/utils'
import courseApiRequest from '@/apiRequests/course'
import { CourseResType } from '@/schemaValidations/course.schema'
import { FileText, Video, MonitorPlay, Clock, Users2, BarChart, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import EnrollButton from './components/enroll-button'
import CourseButton from './components/course-button'
import { Params } from '@/types/query'

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (hours === 0) return `${remainingMinutes} phút`
  if (remainingMinutes === 0) return `${hours} giờ`
  return `${hours} giờ ${remainingMinutes} phút`
}

const getLessonIcon = (type: string) => {
  switch (type) {
    case 'VIDEO':
      return <Video className='w-4 h-4 text-primary' />
    case 'DOCUMENT':
      return <FileText className='w-4 h-4 text-primary' />
    case 'BOTH':
      return <MonitorPlay className='w-4 h-4 text-primary' />
    default:
      return <FileText className='w-4 h-4 text-primary' />
  }
}

export default async function CourseDetail(props: { params: Params }) {
  let courseData: CourseResType['data'] | null = null
  const { id } = await props.params

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
    <main className='min-h-screen bg-white'>
      {/* Banner */}
      <div className='relative h-[45vh] bg-gray-100'>
        <Image src={courseData.imageBanner} alt='Course banner' fill className='object-cover' priority />
      </div>

      {/* Course Content */}
      <div className='container'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-3 gap-8 lg:gap-12'>
            {/* Main Content - Left Column */}
            <div className='lg:col-span-2'>
              {/* Course Header */}
              <div className='relative -mt-24'>
                <Card className='p-8 bg-white/80 backdrop-blur-md border-none shadow-2xl'>
                  {/* Categories & Stats */}
                  <div className='flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b'>
                    <div className='flex flex-wrap gap-2'>
                      {courseData.categories.map((category) => (
                        <span
                          key={category.id}
                          className='px-4 py-1.5 bg-primary/5 text-primary rounded-full text-sm font-medium
                            hover:bg-primary/10 transition-colors'
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>

                    <div className='flex items-center divide-x divide-gray-200'>
                      <div className='flex items-center gap-2 px-4'>
                        <Users2 className='w-5 h-5 text-primary' />
                        <span className='font-medium'>{courseData.totalEnrollment.toLocaleString()}</span>
                        <span className='text-gray-500'>học viên</span>
                      </div>
                      <div className='flex items-center gap-2 px-4'>
                        <div className='flex items-center gap-1 text-amber-500'>
                          <BarChart className='w-5 h-5' />
                          <span className='font-medium'>
                            {courseData.aveRating === 0 ? '5.0' : courseData.aveRating.toFixed(1)}
                          </span>
                        </div>
                        <span className='text-gray-500'>đánh giá</span>
                      </div>
                      <div className='flex items-center gap-2 pl-4'>
                        <Clock className='w-5 h-5 text-blue-500' />
                        <span className='font-medium'>{formatDuration(Number(courseData.durations))}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h1
                      className='text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 
                      bg-clip-text text-transparent'
                    >
                      {courseData.title}
                    </h1>
                    <div className='flex gap-6 items-start'>
                      <p className='flex-1 text-gray-600 text-lg leading-relaxed'>{courseData.description}</p>
                      <div className='hidden lg:flex flex-col items-center gap-2 pt-2'>
                        <div className='p-3 rounded-full bg-primary/5'>
                          <PlayCircle className='w-6 h-6 text-primary' />
                        </div>
                        <span className='text-sm font-medium text-gray-600'>Xem giới thiệu</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Course Chapters */}
              <div className='mt-12'>
                <h2 className='text-2xl font-bold mb-8'>Nội dung khóa học</h2>
                <div className='space-y-4'>
                  {courseData.chapters.map((chapter, index) => (
                    <Card
                      key={chapter.id}
                      className='overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow'
                    >
                      <div className='p-6 bg-gray-50'>
                        <div className='flex items-center gap-4'>
                          <div
                            className='w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center 
                            font-bold text-xl text-primary'
                          >
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <h3 className='font-bold text-lg'>{chapter.title}</h3>
                            <p className='text-sm text-gray-500'>{chapter.lessons.length} bài học</p>
                          </div>
                        </div>
                      </div>
                      <div className='divide-y divide-gray-100'>
                        {chapter.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className='p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors'
                          >
                            {getLessonIcon(lesson.type)}
                            <span className='font-medium text-gray-700'>{lesson.title}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Card - Right Column */}
            <div className='relative lg:mt-[-9rem]'>
              <div className='lg:sticky lg:top-28'>
                <Card className='p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 border-none shadow-xl'>
                  <div className='space-y-8'>
                    {/* Price Display */}
                    {courseData.price === 0 ? (
                      <div>
                        <div className='text-3xl font-bold text-primary mb-2'>Khóa học miễn phí</div>
                        <p className='text-gray-500'>Bắt đầu học ngay hôm nay</p>
                      </div>
                    ) : (
                      <div>
                        <div className='flex items-baseline gap-3 mb-2'>
                          <div className='text-4xl font-bold text-gray-900'>
                            {(courseData.price * (1 - courseData.discount)).toLocaleString()}đ
                          </div>
                          {courseData.discount > 0 && (
                            <div className='text-lg text-gray-400 line-through'>
                              {courseData.price.toLocaleString()}đ
                            </div>
                          )}
                        </div>
                        {courseData.discount > 0 && (
                          <div className='inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-500 rounded-full text-sm font-medium'>
                            <span className='flex-shrink-0'>Giảm {courseData.discount * 100}%</span>
                            <span className='w-1 h-1 rounded-full bg-red-500'></span>
                            <span className='text-red-600'>Còn 3 ngày</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Features */}
                    <div className='space-y-3 py-6 border-y'>
                      <div className='flex items-center gap-3 text-gray-600'>
                        <div className='w-5 h-5 rounded-full bg-green-50 flex items-center justify-center'>
                          <div className='w-2 h-2 rounded-full bg-green-500'></div>
                        </div>
                        <span>Truy cập không giới hạn</span>
                      </div>
                      <div className='flex items-center gap-3 text-gray-600'>
                        <div className='w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center'>
                          <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                        </div>
                        <span>Giáo trình chi tiết</span>
                      </div>
                      <div className='flex items-center gap-3 text-gray-600'>
                        <div className='w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center'>
                          <div className='w-2 h-2 rounded-full bg-amber-500'></div>
                        </div>
                        <span>Chứng chỉ hoàn thành</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    {courseData.price === 0 ? (
                      <EnrollButton id={courseData.id} />
                    ) : (
                      <div className='space-y-4'>
                        <CourseButton id={courseData.id} />
                        <p className='text-center text-sm text-gray-500'>Hoàn tiền trong 30 ngày nếu không hài lòng</p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
