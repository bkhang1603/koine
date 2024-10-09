import courseApiRequest from '@/apiRequests/course'
import { Separator } from '@/components/ui/separator'
import { CoursesResType } from '@/schemaValidations/course.schema'
import { AlarmClock, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

async function CourseList() {
  let courseData: CoursesResType['data'] = []

  try {
    const { payload } = await courseApiRequest.getCourses()
    courseData = payload.data
  } catch (error) {
    console.log(error)
  }

  if (!courseData.length) {
    return <p>Không có khóa học nào</p>
  }

  return (
    <section className='space-y-14'>
      <div>
        <h2 className='text-4xl'>Khóa học hàng đầu</h2>

        <div className='grid grid-cols-5 gap-4 mt-10'>
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
                      <Star className='w-4 h-4' />
                      <p className='text-sm'>{course.aveRating === 0 ? 5 : course.aveRating}</p>
                    </div>

                    <div className='flex justify-center items-center gap-1'>
                      <AlarmClock className='w-4 h-4' />
                      <p className='text-sm'>{course.durations}</p>
                    </div>

                    <div className='flex justify-center items-center gap-1'>
                      <Users className='w-4 h-4' />
                      <p className='text-sm'>{course.totalOfStudent.toLocaleString()}</p>
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

export default CourseList
