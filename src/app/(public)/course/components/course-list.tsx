import images from '@/assets/images'
import { Separator } from '@/components/ui/separator'
import { AlarmClock, Crosshair, Users } from 'lucide-react'
import Image from 'next/image'

const courseData = [
  {
    id: 1,
    title: 'Khóa học có phí',
    courses: [
      {
        id: 1,
        title: 'Khóa học 1',
        price: 100000,
        image: images.course1
      },
      {
        id: 2,
        title: 'Khóa học 2',
        price: 200000,
        image: images.course2
      }
    ]
  },
  {
    id: 2,
    title: 'Khóa học miễn phí',
    courses: [
      {
        id: 1,
        title: 'Khóa học 5',
        price: 0,
        image: images.course5
      },
      {
        id: 2,
        title: 'Khóa học 6',
        price: 0,
        image: images.course6
      },
      {
        id: 3,
        title: 'Khóa học 7',
        price: 0,
        image: images.course7
      },
      {
        id: 4,
        title: 'Khóa học 8',
        price: 0,
        image: images.course8
      },
      {
        id: 5,
        title: 'Khóa học 3',
        price: 0,
        image: images.course3
      },
      {
        id: 6,
        title: 'Khóa học 4',
        price: 0,
        image: images.course4
      }
    ]
  }
]

function CourseList() {
  return (
    <section className='py-16 space-y-14'>
      {courseData.map((category) => (
        <div key={category.id}>
          <h2 className='text-4xl'>{category.title}</h2>

          <div className='grid grid-cols-5 gap-4 mt-8'>
            {category.courses.map((course) => (
              <article
                key={course.id}
                className='rounded-xl overflow-hidden shadow-lg
              group/course cursor-pointer'
              >
                <div className='w-full aspect-square overflow-hidden'>
                  <Image
                    src={course.image}
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

                  <div className='flex justify-between items-center'>
                    <div className='flex justify-center items-center gap-1'>
                      <Users className='w-4 h-4' />
                      <p className='text-sm'>100</p>
                    </div>

                    <div className='flex justify-center items-center gap-1'>
                      <AlarmClock className='w-4 h-4' />
                      <p className='text-sm'>1h</p>
                    </div>

                    <div className='flex justify-center items-center gap-1'>
                      <Crosshair className='w-4 h-4' />
                      <p className='text-sm'>Dậy thì</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default CourseList
