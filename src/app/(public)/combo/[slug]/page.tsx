import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import courseApiRequest from '@/apiRequests/course'
import { Gift, ChevronRight, Layers, Clock, Users, Check, Star, BookOpen, Sparkles, Activity } from 'lucide-react'
import { wrapServerApi } from '@/lib/server-utils'
import { searchParams } from '@/types/query'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import CourseButton from '@/components/public/parent/course/course-button'
import BuyNowButton from '@/components/public/parent/course/buy-now-button'

export default async function ComboDetailPage(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<searchParams>
}) {
  const { slug } = await props.params

  const data = await wrapServerApi(() => courseApiRequest.getCourseComboDetail(slug))
  const combo = data?.payload.data

  if (!combo) {
    return notFound()
  }

  const discountedPrice = combo.price - combo.price * combo.discount
  const totalOriginalPrice = combo.courseInfos.reduce(
    (total: number, course: (typeof combo.courseInfos)[0]) => total + course.price,
    0
  )
  const saveAmount = totalOriginalPrice - combo.price
  const savePercentage = Math.round((saveAmount / totalOriginalPrice) * 100)

  return (
    <section className='container py-8'>
      <Breadcrumb
        items={[
          { title: 'Khóa học', href: '/course' },
          { title: combo.name, href: `/combo/${combo.slug}` }
        ]}
      />

      {/* Combo details */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-6'>
        {/* Combo image */}
        <div className='relative aspect-video rounded-lg overflow-hidden'>
          <Image src={combo.imageUrl || '/no-image.png'} alt={combo.name} fill className='object-cover' />
          {/* Discount Tag */}
          {combo.discount > 0 && (
            <div className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium'>
              -{combo.discount * 100}% OFF
            </div>
          )}
        </div>

        {/* Combo info */}
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <Badge variant='secondary' className='flex items-center gap-1 bg-primary/90 hover:bg-primary text-white'>
              <Gift className='w-3 h-3' />
              <span>Combo</span>
            </Badge>
            <span className='text-sm text-gray-500'>Bao gồm {combo.courseInfos.length} khóa học</span>
          </div>

          <h1 className='text-3xl font-bold mb-4'>{combo.name}</h1>

          <div className='mb-4 flex items-center gap-2'>
            <p className='text-2xl font-semibold'>{discountedPrice.toLocaleString()}đ</p>
            {combo.discount > 0 && (
              <span className='text-lg text-gray-500 line-through'>{combo.price.toLocaleString()}đ</span>
            )}
          </div>

          {saveAmount > 0 && (
            <div className='bg-green-50 text-green-800 p-3 rounded-md text-sm mb-4'>
              <span className='font-medium'>Tiết kiệm {saveAmount.toLocaleString()}đ</span> so với mua{' '}
              {combo.courseInfos.length} khóa học riêng lẻ ({savePercentage}%)
            </div>
          )}

          <p className='text-gray-700 mb-6'>{combo.description}</p>

          <div className='space-y-2 mb-6'>
            <div className='flex items-center gap-2'>
              <Layers className='w-5 h-5 text-primary' />
              <span>{combo.courseInfos.length} khóa học đầy đủ</span>
            </div>
            <div className='flex items-center gap-2'>
              <Clock className='w-5 h-5 text-primary' />
              <span>Truy cập vĩnh viễn</span>
            </div>
          </div>

          <div className='flex items-center justify-between gap-2'>
            <BuyNowButton
              course={{
                id: combo.id,
                title: combo.name,
                imageUrl: combo.imageUrl || '/no-image.png',
                price: combo.price,
                discount: combo.discount
              }}
              className='w-full'
            />
            <CourseButton
              id={combo.id}
              course={{
                id: combo.id,
                title: combo.name,
                imageUrl: combo.imageUrl || '/no-image.png',
                price: combo.price,
                discount: combo.discount
              }}
              className='w-full'
              variant='outline'
            />
          </div>
        </div>
      </div>

      {/* Separator between detail and courses */}
      <div className='my-16 flex items-center justify-center'>
        <div className='w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center z-10 border-4 border-white'>
          <BookOpen className='w-8 h-8 text-blue-500' />
        </div>
        <div className='h-0.5 bg-gradient-to-r from-indigo-100 via-blue-100 to-sky-100 w-full absolute -z-10'></div>
      </div>

      {/* Courses included */}
      <div className='relative'>
        {/* Background decoration */}
        <div className='absolute inset-0 bg-blue-50 rounded-xl -z-10 -skew-y-1 transform'></div>

        <div className='px-6 py-8'>
          <div className='flex flex-col items-center mb-8'>
            <div className='w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-4 -rotate-12 transform'>
              <BookOpen className='w-8 h-8 text-blue-600 rotate-12 transform' />
            </div>
            <h2 className='text-2xl font-bold mb-2 text-center'>Khóa học bao gồm</h2>
            <div className='w-24 h-1 bg-blue-400 rounded-full'></div>
          </div>

          <div className='space-y-5'>
            {combo.courseInfos.map((course) => (
              <Link href={`/course/${course.slug}`} key={course.id} className='block group'>
                <div className='bg-white border border-blue-100 rounded-xl overflow-hidden transition-all hover:shadow-md hover:-translate-y-1'>
                  <div className='flex p-4 gap-5'>
                    <div className='w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0 shadow-sm'>
                      <Image
                        src={course.imageUrl || '/no-image.png'}
                        alt={course.title}
                        width={112}
                        height={112}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>

                    <div className='flex-1 min-w-0'>
                      <h3 className='font-semibold text-lg group-hover:text-blue-600 transition-colors'>
                        {course.title}
                      </h3>
                      <p className='text-gray-600 line-clamp-2 mt-1.5'>{course.description}</p>

                      <div className='flex flex-wrap items-center gap-4 mt-3'>
                        <div className='flex items-center gap-2'>
                          <div className='w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center'>
                            <Clock className='w-3.5 h-3.5 text-blue-600' />
                          </div>
                          <span className='text-sm text-gray-600'>{Math.round(course.durations / 60)} phút</span>
                        </div>

                        <div className='flex items-center gap-2'>
                          <div className='w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center'>
                            <Users className='w-3.5 h-3.5 text-blue-600' />
                          </div>
                          <span className='text-sm text-gray-600'>
                            {course.totalEnrollment.toLocaleString()} học viên
                          </span>
                        </div>

                        <div className='flex items-center gap-2'>
                          <div className='w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center'>
                            <Star className='w-3.5 h-3.5 text-blue-600 fill-current' />
                          </div>
                          <span className='text-sm text-gray-600'>
                            {course.aveRating > 0 ? course.aveRating.toFixed(1) : '5'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center ml-2'>
                      <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors'>
                        <ChevronRight className='w-5 h-5 text-blue-500 group-hover:text-white transition-colors' />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Separator between courses and benefits */}
      <div className='my-16 flex items-center justify-center'>
        <div className='w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center z-10 border-4 border-white'>
          <Gift className='w-8 h-8 text-purple-500' />
        </div>
        <div className='h-0.5 bg-gradient-to-r from-blue-100 via-purple-100 to-amber-100 w-full absolute -z-10'></div>
      </div>

      {/* Benefits */}
      <div className='mt-8 relative'>
        {/* Background decoration */}
        <div className='absolute inset-0 bg-purple-50 rounded-xl -z-10 skew-y-1 transform'></div>

        <div className='px-6 py-8'>
          <div className='flex flex-col items-center mb-8'>
            <div className='w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-4 rotate-12 transform'>
              <Sparkles className='w-8 h-8 text-purple-600 -rotate-12 transform' />
            </div>
            <h2 className='text-2xl font-bold mb-2 text-center'>Lợi ích khi mua combo</h2>
            <div className='w-24 h-1 bg-purple-400 rounded-full'></div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div className='bg-white rounded-xl border border-purple-100 overflow-hidden transition-all hover:shadow-md hover:-translate-y-1'>
              <div className='bg-purple-50 p-3 flex items-center gap-3 border-b border-purple-100'>
                <div className='w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center'>
                  <Check className='w-5 h-5 text-purple-600' />
                </div>
                <h3 className='font-semibold text-purple-800'>Tiết kiệm đến {savePercentage}%</h3>
              </div>
              <div className='p-4'>
                <p className='text-gray-600'>
                  Tiết kiệm {saveAmount.toLocaleString()}đ so với mua riêng lẻ, tối ưu ngân sách học tập của bạn.
                </p>
              </div>
            </div>

            <div className='bg-white rounded-xl border border-purple-100 overflow-hidden transition-all hover:shadow-md hover:-translate-y-1'>
              <div className='bg-purple-50 p-3 flex items-center gap-3 border-b border-purple-100'>
                <div className='w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center'>
                  <Clock className='w-5 h-5 text-purple-600' />
                </div>
                <h3 className='font-semibold text-purple-800'>Học mọi lúc mọi nơi</h3>
              </div>
              <div className='p-4'>
                <p className='text-gray-600'>Học nhiều khóa học từ 1 lần mua, truy cập không giới hạn thời gian.</p>
              </div>
            </div>

            <div className='bg-white rounded-xl border border-purple-100 overflow-hidden transition-all hover:shadow-md hover:-translate-y-1'>
              <div className='bg-purple-50 p-3 flex items-center gap-3 border-b border-purple-100'>
                <div className='w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center'>
                  <Layers className='w-5 h-5 text-purple-600' />
                </div>
                <h3 className='font-semibold text-purple-800'>Nội dung bổ sung</h3>
              </div>
              <div className='p-4'>
                <p className='text-gray-600'>
                  Các khóa học được thiết kế để bổ trợ lẫn nhau, tạo lộ trình học hoàn chỉnh.
                </p>
              </div>
            </div>

            <div className='bg-white rounded-xl border border-purple-100 overflow-hidden transition-all hover:shadow-md hover:-translate-y-1'>
              <div className='bg-purple-50 p-3 flex items-center gap-3 border-b border-purple-100'>
                <div className='w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center'>
                  <Activity className='w-5 h-5 text-purple-600' />
                </div>
                <h3 className='font-semibold text-purple-800'>Cập nhật liên tục</h3>
              </div>
              <div className='p-4'>
                <p className='text-gray-600'>
                  Tất cả khóa học đều được cập nhật với nội dung mới nhất và chất lượng cao.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
