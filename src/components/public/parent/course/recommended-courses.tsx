import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import configRoute from '@/config/route'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import courseApiRequest from '@/apiRequests/course'
import { wrapServerApi } from '@/lib/server-utils'

type RecommendedCoursesProps = {
  currentCourseId: string
  categoryIds?: string[] | string
}

export default async function RecommendedCourses({ currentCourseId, categoryIds }: RecommendedCoursesProps) {
  // Xử lý categoryIds
  const formatCategories = () => {
    if (!categoryIds) return ''

    if (typeof categoryIds === 'string') return categoryIds

    return categoryIds.join('a%a')
  }

  // Lấy dữ liệu từ server
  const data = await wrapServerApi(() =>
    courseApiRequest.getCourses({
      page_size: 12,
      page_index: 1,
      category: formatCategories()
    })
  )

  // Lọc khóa học
  const recommendedCourses = data?.payload?.data
    ? data.payload.data.filter((course) => course.id !== currentCourseId)
    : []

  if (!data) {
    return null
  }

  return (
    <div className='mt-16 mb-10 relative'>
      <div>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Khóa học liên quan</h2>
          <Link
            href={configRoute.course}
            className='flex items-center text-primary hover:text-primary/70 duration-300 gap-1'
          >
            <span>Xem tất cả</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        {recommendedCourses.length === 0 ? (
          <p className='text-gray-500 italic'>Không có khóa học liên quan</p>
        ) : (
          <Carousel
            opts={{
              align: 'start',
              loop: true
            }}
            className='w-full'
          >
            <CarouselContent className='-ml-2 md:-ml-3'>
              {recommendedCourses.map((course) => (
                <CarouselItem key={course.id} className='pl-2 md:pl-3 basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/6'>
                  <Link href={`${configRoute.course}/${course.id}`}>
                    <article className='cursor-pointer group/product h-full'>
                      <div className='w-full aspect-square rounded-lg overflow-hidden relative'>
                        <Image
                          src={course.imageUrl ?? '/images/course-placeholder.jpg'}
                          alt={course.title}
                          width={400}
                          height={400}
                          className='w-full h-full object-cover rounded-lg'
                          priority={true}
                        />

                        {/* Discount Tag */}
                        {course.discount > 0 && (
                          <div
                            className='absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-red-500 to-rose-500 
                            text-white py-1 px-12 text-sm font-medium shadow-lg transform transition-transform'
                          >
                            {course.discount * 100}% OFF
                          </div>
                        )}

                        <div
                          className='absolute w-full h-10 bg-black/50 opacity-0 -bottom-10
                          group-hover/product:bottom-0 group-hover/product:opacity-100
                          flex justify-center items-center transition-all duration-500'
                        >
                          <p className='text-fourth'>Xem thêm</p>
                        </div>
                      </div>

                      <div className='p-2'>
                        {course.categories?.length > 0 ? (
                          <p className='text-xs text-gray-500 truncate'>
                            {course.categories.map((category) => category.name).join(', ')}
                          </p>
                        ) : (
                          <p className='text-xs text-gray-500 truncate'>Khóa học</p>
                        )}
                        <h3 className='text-lg font-semibold line-clamp-1'>{course.title}</h3>

                        <div className='flex items-center gap-2 mt-2'>
                          {course.price === 0 ? (
                            <span className='text-base font-semibold text-primary'>Miễn phí</span>
                          ) : course.discount > 0 ? (
                            <>
                              <span className='text-base font-semibold'>
                                {(course.price * (1 - course.discount)).toLocaleString()}đ
                              </span>
                              <span className='text-sm text-gray-500 line-through'>
                                {course.price.toLocaleString()}đ
                              </span>
                            </>
                          ) : (
                            <span className='text-base font-semibold'>{course.price.toLocaleString()}đ</span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className='bg-white hover:bg-white border border-gray-200 shadow-md' />
            <CarouselNext className='bg-white hover:bg-white border border-gray-200 shadow-md' />
          </Carousel>
        )}
      </div>
    </div>
  )
}
