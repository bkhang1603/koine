import courseApiRequest from '@/apiRequests/course'
import icons from '@/assets/icons'
import { Separator } from '@/components/ui/separator'
import { CoursesResType } from '@/schemaValidations/course.schema'
import { AlarmClock, Sparkle, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

async function Recommend() {
  let courseData: CoursesResType['data'] = []
  try {
    const { payload } = await courseApiRequest.getCourses({
      page_index: 1,
      page_size: 3,
      sort: 'pa',
      keyword: '',
      range: 0,
      category: ''
    })
    courseData = payload.data
  } catch (error) {
    console.log(error)
  }

  if (!courseData.length) {
    return <p>Không có khóa học nào</p>
  }

  return (
    <section className='container flex items-center justify-center flex-col py-16 sm:pt-28 sm:pb-32 relative'>
      <h3 className='font-medium sm:text-lg'>Các khóa học của chúng tôi</h3>
      <h2
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
        text-transparent bg-clip-text text-2xl md:text-3xl lg:text-5xl lg:h-14 font-bold mt-5 text-center'
      >
        Những khóa học hàng đầu
      </h2>
      <Image
        src={icons.pinkStars}
        alt='pink-stars'
        width={200}
        height={200}
        className='hidden sm:block absolute bottom-0 left-24 mt-32 h-48 w-48'
      />

      <div className='grid grid-cols-5 mt-10'>
        <div className='col-start-2 col-span-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4'>
          {courseData.map((course) => (
            <Link href={`/course/${course.id}`} passHref key={course.id}>
              <article
                className='rounded-xl overflow-hidden shadow-lg
                  group/course cursor-pointer'
              >
                <div className='w-full aspect-square overflow-hidden'>
                  <Image
                    src={course.imageUrl}
                    alt='koine course'
                    width={1000}
                    height={1000}
                    quality={100}
                    className='w-full h-full object-cover group-hover/course:scale-110 ease-linear duration-300 transition-all'
                  />
                </div>

                <div className='p-4'>
                  <h3 className='text-lg'>{course.title}</h3>
                  <p className='text-base text-secondary font-semibold'>
                    {course.price === 0 ? 'Miễn phí' : `${course.price.toLocaleString()}đ`}
                  </p>

                  <Separator className='my-4 h-[2px]' />

                  <div className='flex justify-between items-center text-primary/80 font-medium'>
                    <div className='flex justify-center items-center gap-1'>
                      <Users className='w-4 h-4' />
                      <p className='text-sm'>1.000</p>
                    </div>

                    <div className='flex justify-center items-center gap-1'>
                      <AlarmClock className='w-4 h-4' />
                      <p className='text-sm'>1h</p>
                    </div>

                    <div className='flex justify-center items-center gap-1'>
                      <Sparkle className='w-4 h-4' />
                      <p className='text-sm'>Teen</p>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Recommend
