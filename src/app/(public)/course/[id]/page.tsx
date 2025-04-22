import courseApiRequest from '@/apiRequests/course'
import { FileText, Video, MonitorPlay, Clock, Users2, BarChart, HelpCircle } from 'lucide-react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import EnrollButton from '@/components/public/parent/course/enroll-button'
import CourseButton from '@/components/public/parent/course/course-button'
import CourseReviews from '@/components/public/parent/course/course-reviews'
import { wrapServerApi } from '@/lib/server-utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import RecommendedCourses from '@/components/public/parent/course/recommended-courses'
import { searchParams } from '@/types/query'
import BuyNowButton from '@/components/public/parent/course/buy-now-button'
import { Breadcrumb } from '@/components/public/parent/setting/Breadcrumb'
import configRoute from '@/config/route'
import { formatDuration } from '@/lib/utils'
import PreviewButton from '@/components/public/parent/course/preview-button'
import { ReportCourseButton } from '@/components/public/parent/report-button'

// const formatDuration = (minutes: number) => {
//   const hours = Math.floor(minutes / 60)
//   const remainingMinutes = minutes % 60
//   if (hours === 0) return `${remainingMinutes} phút`
//   if (remainingMinutes === 0) return `${hours} giờ`
//   return `${hours} giờ ${remainingMinutes} phút`
// }

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

export default async function CourseDetail(props: {
  params: Promise<{ id: string }>
  searchParams: Promise<searchParams>
}) {
  const { id } = await props.params
  const searchParams = await props.searchParams

  const data = await wrapServerApi(() => courseApiRequest.getCourseCache(id))
  const courseData = data?.payload?.data

  const limit = 2

  if (!courseData) {
    return <p>Không tìm thấy khóa học</p>
  }

  return (
    <main className='min-h-screen bg-white'>
      {/* Banner */}
      <div className='relative h-[30vh] sm:h-[40vh] lg:h-[45vh] bg-gray-100'>
        <Image src={courseData.imageBanner} alt='Course banner' fill className='object-cover' />
      </div>

      {/* Course Content */}
      <div className='container px-4 sm:px-6'>
        <div className='grid lg:grid-cols-3 gap-6 lg:gap-12'>
          {/* Main Content - Left Column */}
          <div className='lg:col-span-2'>
            {/* Course Header */}
            <div className='relative -mt-16 sm:-mt-20 lg:-mt-24'>
              {/* Breadcrumb - Added for navigation */}
              <div className='container pt-3 pb-1 sm:pt-5 sm:pb-3'>
                <Breadcrumb
                  items={[
                    { title: 'Khóa học', href: configRoute.course },
                    { title: courseData.title, href: `${configRoute.course}/${id}` }
                  ]}
                />
              </div>

              <Card className='p-5 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md border-none shadow-2xl'>
                {/* Categories & Stats */}
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 sm:pb-6 mb-4 sm:mb-6 border-b'>
                  <div className='flex flex-wrap gap-2 max-w-full overflow-hidden'>
                    {courseData.categories.map((category) => (
                      <span
                        key={category.id}
                        className='px-3 py-1 sm:px-4 sm:py-1.5 bg-primary/5 text-primary rounded-full text-xs sm:text-sm font-medium
                            hover:bg-primary/10 transition-colors truncate max-w-[150px]'
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>

                  <div className='flex flex-wrap items-center gap-3 text-sm sm:text-base'>
                    <div className='flex items-center gap-1.5'>
                      <Users2 className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
                      <span className='font-medium'>{courseData.totalEnrollment.toLocaleString()}</span>
                      <span className='text-gray-500'>học viên</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <div className='flex items-center gap-1 text-amber-500'>
                        <BarChart className='w-4 h-4 sm:w-5 sm:h-5' />
                        <span className='font-medium'>
                          {courseData.aveRating === 0 ? '5.0' : courseData.aveRating.toFixed(1)}
                        </span>
                      </div>
                      <span className='text-gray-500'>đánh giá</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <Clock className='w-4 h-4 sm:w-5 sm:h-5 text-blue-500' />
                      <span className='font-medium'>{formatDuration(Number(courseData.durations))}</span>
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <div className='flex justify-between items-start mb-3'>
                    <h1
                      className='text-2xl sm:text-3xl lg:text-4xl font-bold lg:mb-4 bg-gradient-to-r from-gray-900 to-gray-700 
                      bg-clip-text text-transparent'
                    >
                      {courseData.title}
                    </h1>
                    <ReportCourseButton courseId={courseData.id} courseName={courseData.title} buttonVariant='icon' />
                  </div>
                  <div>
                    <p className='text-gray-600 text-base sm:text-lg leading-relaxed'>{courseData.description}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Mobile Price Card Preview - For better UX on mobile */}
            <div className='mt-6 lg:hidden'>
              <Card className='p-5 border-none shadow-lg bg-gradient-to-br from-gray-50 via-white to-gray-50'>
                <div className='flex items-center justify-between'>
                  <div>
                    {courseData.price === 0 ? (
                      <div className='text-xl font-bold text-primary'>Khóa học miễn phí</div>
                    ) : (
                      <div className='space-y-1'>
                        <div className='flex items-baseline gap-2'>
                          <div className='text-2xl font-bold text-gray-900'>
                            {(courseData.price * (1 - courseData.discount)).toLocaleString()}đ
                          </div>
                          {courseData.discount > 0 && (
                            <div className='text-sm text-gray-400 line-through'>
                              {courseData.price.toLocaleString()}đ
                            </div>
                          )}
                        </div>
                        {courseData.discount > 0 && (
                          <div className='inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-50 text-red-500 rounded-full text-xs font-medium'>
                            <span>Giảm {courseData.discount * 100}%</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className='sm:hidden'>
                    {courseData.price === 0 ? (
                      <EnrollButton id={courseData.id} className='w-full h-12 text-base font-medium' />
                    ) : (
                      <CourseButton
                        id={courseData.id}
                        course={{
                          id: courseData.id,
                          title: courseData.title,
                          imageUrl: courseData.imageBanner,
                          price: courseData.price,
                          discount: courseData.discount,
                          isCombo: courseData.isCombo
                        }}
                        className='w-full h-12 text-base font-medium'
                      />
                    )}
                  </div>
                  <div className='hidden sm:block lg:hidden'>
                    {courseData.price === 0 ? (
                      <EnrollButton id={courseData.id} className='w-full h-12 text-base font-medium' />
                    ) : (
                      <CourseButton
                        id={courseData.id}
                        course={{
                          id: courseData.id,
                          title: courseData.title,
                          imageUrl: courseData.imageBanner,
                          price: courseData.price,
                          discount: courseData.discount,
                          isCombo: courseData.isCombo
                        }}
                        variant='outline'
                        className='w-full h-12 text-base font-medium'
                      />
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Course content and lessons */}
            <Tabs defaultValue='content' className='mt-10 pb-32'>
              <TabsList className='w-full grid grid-cols-2 mb-6'>
                <TabsTrigger value='content'>Nội dung khóa học</TabsTrigger>
                <TabsTrigger value='reviews'>Đánh giá từ học viên</TabsTrigger>
              </TabsList>

              <TabsContent value='content'>
                {/* Course Content/Lessons part */}
                <div className='space-y-4'>
                  <h2 className='text-xl font-semibold'>Nội dung bài học</h2>
                  <div className='space-y-3 sm:space-y-4'>
                    {courseData.chapters.map((chapter, chapterIndex) => {
                      // Đếm tổng số học liệu (bài học + câu hỏi)
                      const totalLessons = chapter.lessons.length
                      const totalQuestions = chapter.questions?.length || 0

                      return (
                        <Card
                          key={chapter.id}
                          className='overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow'
                        >
                          <div className='p-4 sm:p-6 bg-gray-50'>
                            <div className='flex items-center gap-3 sm:gap-4'>
                              <div
                                className='w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/5 flex items-center justify-center 
                                    font-bold text-lg sm:text-xl text-primary'
                              >
                                {String(chapterIndex + 1).padStart(2, '0')}
                              </div>
                              <div className='flex-1'>
                                <h3 className='font-bold text-base sm:text-lg'>{chapter.title}</h3>
                                <div className='flex items-center gap-4 text-xs sm:text-sm text-gray-500'>
                                  <span>{totalLessons} bài học</span>
                                  {totalQuestions > 0 && (
                                    <span className='flex items-center gap-1'>
                                      <HelpCircle className='w-3.5 h-3.5 text-amber-500' />
                                      {totalQuestions} câu hỏi
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='divide-y divide-gray-100'>
                            {/* Hiển thị bài học */}
                            {chapter.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lesson.id}
                                className={`p-3 sm:p-4 flex items-center justify-between gap-2 sm:gap-3 hover:bg-gray-50 transition-colors`}
                              >
                                <div className='flex items-center gap-2 sm:gap-3'>
                                  {getLessonIcon(lesson.type)}
                                  <span className='font-medium text-sm sm:text-base text-gray-700'>{lesson.title}</span>
                                </div>

                                {/* Chỉ hiển thị nút Học thử cho các bài học đầu của chapter đầu tiên */}
                                {chapterIndex === 0 && lessonIndex < limit && (
                                  <PreviewButton courseId={courseData.id} lessonId={lesson.id} />
                                )}
                              </div>
                            ))}

                            {/* Hiển thị ĐƠNG GIẢN về quiz - nếu có */}
                            {chapter.questions && chapter.questions.length > 0 && (
                              <div className='p-3 sm:p-4 flex items-center justify-between gap-2 sm:gap-3 hover:bg-amber-50/30 transition-colors'>
                                <div className='flex items-center gap-2 sm:gap-3'>
                                  <HelpCircle className='w-4 h-4 text-amber-500' />
                                  <div>
                                    <span className='font-medium text-sm sm:text-base text-gray-700'>
                                      Bài tập về {chapter.title}
                                    </span>
                                    <span className='text-xs text-muted-foreground block'>
                                      {chapter.questions.length} câu hỏi luyện tập
                                    </span>
                                  </div>
                                </div>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className='px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium'>
                                        Bài tập
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Bài tập luyện tập sau khi học</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            )}
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='reviews'>
                <CourseReviews courseId={id} searchParams={searchParams} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Price Card - Right Column */}
          <div className='relative mt-8 lg:mt-[-9rem]'>
            <div className='lg:sticky lg:top-28 hidden lg:block'>
              <Card className='p-6 lg:p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 border-none shadow-xl'>
                <div className='space-y-6 lg:space-y-8'>
                  {/* Price Display */}
                  {courseData.price === 0 ? (
                    <div>
                      <div className='text-2xl lg:text-3xl font-bold text-primary mb-2'>Khóa học miễn phí</div>
                      <p className='text-gray-500'>Bắt đầu học ngay hôm nay</p>
                    </div>
                  ) : (
                    <div>
                      <div className='flex items-baseline gap-3 mb-2'>
                        <div className='text-3xl lg:text-4xl font-bold text-gray-900'>
                          {(courseData.price * (1 - courseData.discount)).toLocaleString()}đ
                        </div>
                        {courseData.discount > 0 && (
                          <div className='text-lg text-gray-400 line-through'>{courseData.price.toLocaleString()}đ</div>
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
                  <div className='space-y-3 py-4 lg:py-6 border-y'>
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

                  {/* Action Buttons */}
                  {courseData.price === 0 ? (
                    <div className='space-y-4'>
                      <EnrollButton id={courseData.id} className='w-full h-12 text-base font-medium' />
                      <p className='text-center text-sm text-gray-500'>Học ngay hôm nay</p>
                    </div>
                  ) : (
                    <div className='space-y-4'>
                      <BuyNowButton
                        course={{
                          id: courseData.id,
                          title: courseData.title,
                          imageUrl: courseData.imageBanner,
                          price: courseData.price,
                          discount: courseData.discount
                        }}
                        className='w-full h-12 text-base font-medium'
                      />
                      <div className='relative flex items-center w-full gap-3'>
                        <div className='h-[1px] flex-1 bg-gray-200'></div>
                        <span className='text-sm text-gray-500 flex-shrink-0'>hoặc</span>
                        <div className='h-[1px] flex-1 bg-gray-200'></div>
                      </div>
                      <CourseButton
                        id={courseData.id}
                        course={{
                          id: courseData.id,
                          title: courseData.title,
                          imageUrl: courseData.imageBanner,
                          price: courseData.price,
                          discount: courseData.discount
                        }}
                        variant='outline'
                        className='w-full h-12 text-base font-medium'
                      />
                      <p className='text-center text-sm text-gray-500'>Hoàn tiền trong 30 ngày nếu không hài lòng</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Mobile Action Button - Only visible on smallest screens */}
      <div className='fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg sm:hidden z-50'>
        {courseData.price === 0 ? (
          <EnrollButton id={courseData.id} className='w-full h-12 text-base font-medium' />
        ) : (
          <div className='space-y-2'>
            <BuyNowButton
              course={{
                id: courseData.id,
                title: courseData.title,
                imageUrl: courseData.imageBanner,
                price: courseData.price,
                discount: courseData.discount
              }}
              className='w-full h-12 text-base font-medium'
            />
            <div className='relative flex items-center w-full gap-3'>
              <div className='h-[1px] flex-1 bg-gray-200'></div>
              <span className='text-sm text-gray-500 flex-shrink-0'>hoặc</span>
              <div className='h-[1px] flex-1 bg-gray-200'></div>
            </div>
            <CourseButton
              id={courseData.id}
              course={{
                id: courseData.id,
                title: courseData.title,
                imageUrl: courseData.imageBanner,
                price: courseData.price,
                discount: courseData.discount
              }}
              variant='outline'
              className='w-full h-12 text-base font-medium'
            />
          </div>
        )}
      </div>

      <div className='container'>
        <RecommendedCourses currentCourseId={courseData.id} categoryIds={courseData.categories?.map((cat) => cat.id)} />
      </div>
    </main>
  )
}
