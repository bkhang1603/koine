import { handleErrorApi } from '@/lib/utils'
import courseApiRequest from '@/apiRequests/course'
import { CourseResType } from '@/schemaValidations/course.schema'
import {
  AlarmClock,
  BookOpen,
  GraduationCap,
  PlayCircle,
  Star,
  Users,
  FileText,
  Video,
  File,
  MonitorPlay
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import EnrollButton from './components/enroll-button'
import CourseButton from './components/course-button'

// Thêm hàm format duration
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
      return <Video className='w-4 h-4 text-primary/70' />
    case 'DOCUMENT':
      return <FileText className='w-4 h-4 text-primary/70' />
    case 'BOTH':
      return <MonitorPlay className='w-4 h-4 text-primary/70' />
    default:
      return <FileText className='w-4 h-4 text-primary/70' />
  }
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
      {/* Banner (giữ nguyên) */}
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

      {/* Main Content */}
      <div className='mt-8 grid gap-8 grid-cols-1 lg:grid-cols-3'>
        {/* Left Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Course Header */}
          <div className='space-y-4'>
            <div className='flex flex-wrap gap-2'>
              {courseData.categories.map((category) => (
                <span
                  key={category.id}
                  className='bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium'
                >
                  {category.name}
                </span>
              ))}
            </div>
            <h1 className='text-3xl font-bold'>{courseData.title}</h1>
            <p className='text-gray-600 text-lg leading-relaxed'>{courseData.description}</p>
          </div>

          {/* Course Stats - Thiết kế mới */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                  <Users className='w-5 h-5 text-primary' />
                </div>
                <div className='text-sm text-gray-500'>Học viên</div>
              </div>
              <div className='text-2xl font-bold text-gray-900'>{courseData.totalEnrollment.toLocaleString()}</div>
            </div>

            <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center'>
                  <Star className='w-5 h-5 text-yellow-500' fill='currentColor' />
                </div>
                <div className='text-sm text-gray-500'>Đánh giá</div>
              </div>
              <div className='flex items-baseline gap-2'>
                <span className='text-2xl font-bold text-gray-900'>
                  {courseData.aveRating === 0 ? '5' : courseData.aveRating.toFixed(1)}
                </span>
                <span className='text-sm text-gray-500'>/ 5</span>
              </div>
            </div>

            <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center'>
                  <AlarmClock className='w-5 h-5 text-blue-500' />
                </div>
                <div className='text-sm text-gray-500'>Thời lượng</div>
              </div>
              <div className='text-2xl font-bold text-gray-900'>{formatDuration(Number(courseData.durations))}</div>
            </div>

            <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-10 h-10 rounded-full bg-green-50 flex items-center justify-center'>
                  <BookOpen className='w-5 h-5 text-green-500' />
                </div>
                <div className='text-sm text-gray-500'>Bài học</div>
              </div>
              <div className='flex items-baseline gap-1'>
                <span className='text-2xl font-bold text-gray-900'>{courseData.chapters.length}</span>
                <span className='text-sm text-gray-500'>chương</span>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold flex items-center gap-2'>
              <BookOpen className='w-6 h-6 text-primary' />
              Nội dung khóa học
            </h2>
            <div className='space-y-4'>
              {courseData.chapters.map((chapter, index) => (
                <div key={chapter.id} className='border rounded-xl overflow-hidden'>
                  <div className='flex items-center justify-between p-4 bg-gray-50'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium'>
                        {index + 1}
                      </div>
                      <h3 className='font-medium'>{chapter.title}</h3>
                    </div>
                    <span className='px-3 py-1 bg-primary/5 text-primary rounded-full text-sm'>
                      {chapter.lessons.length} bài học
                    </span>
                  </div>
                  <div className='divide-y'>
                    {chapter.lessons.map((lesson) => (
                      <div key={lesson.id} className='p-4 flex items-center gap-3 text-gray-600'>
                        {getLessonIcon(lesson.type)}
                        <span>{lesson.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div>
          <Card className='p-6 sticky top-6'>
            {/* Price Section */}
            <div className='space-y-8'>
              <div>
                {courseData.price === 0 ? (
                  <div className='flex items-center gap-3'>
                    <span className='text-3xl font-bold text-primary'>Miễn phí</span>
                    <span className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium'>
                      Học ngay
                    </span>
                  </div>
                ) : (
                  <div>
                    {/* Price Display */}
                    <div className='flex items-baseline gap-3'>
                      <div className='text-3xl font-bold text-gray-900'>
                        {(courseData.price * (1 - courseData.discount)).toLocaleString()}đ
                      </div>
                      {courseData.discount > 0 && (
                        <div className='text-base text-gray-500 line-through'>{courseData.price.toLocaleString()}đ</div>
                      )}
                    </div>

                    {/* Discount Tag - Option 1: Percentage */}
                    {courseData.discount > 0 && (
                      <div className='mt-2 flex items-center gap-2'>
                        <span className='px-2.5 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium'>
                          Giảm {courseData.discount * 100}%
                        </span>
                        <span className='text-sm text-gray-500 animate-pulse'>⏰ Ưu đãi có hạn</span>
                      </div>
                    )}

                    {/* Discount Tag - Option 2: Savings Amount */}
                    {/* {courseData.discount > 0 && (
                      <div className='mt-2 flex items-center gap-2'>
                        <span className='px-2.5 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium'>
                          Tiết kiệm {(courseData.price * courseData.discount).toLocaleString()}đ
                        </span>
                        <span className='text-sm text-gray-500 animate-pulse'>⏰ Ưu đãi có hạn</span>
                      </div>
                    )} */}
                  </div>
                )}
              </div>

              {/* Action Button */}
              {courseData.price === 0 ? (
                <EnrollButton id={courseData.id} />
              ) : (
                <div className='space-y-3'>
                  <CourseButton id={courseData.id} />
                  <p className='text-center text-sm text-gray-500'>Hoàn tiền trong 30 ngày nếu không hài lòng ✨</p>
                </div>
              )}

              {/* Course Features */}
              <div className='pt-6 border-t space-y-4'>
                <h3 className='font-medium'>Khóa học bao gồm:</h3>
                <div className='space-y-3'>
                  {[
                    { text: 'Truy cập trọn đời', icon: '🔒' },
                    { text: 'Giáo trình chi tiết', icon: '📚' },
                    { text: 'Bài tập thực hành', icon: '✍️' },
                    { text: 'Chứng chỉ hoàn thành', icon: '🎓' },
                    { text: 'Hỗ trợ trực tuyến', icon: '💬' }
                  ].map((feature) => (
                    <div key={feature.text} className='flex items-center gap-3 text-gray-600'>
                      <span className='text-lg'>{feature.icon}</span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
