import images from '@/assets/images'
import { Separator } from '@/components/ui/separator'
import { AlarmClock, Sparkle, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const courseData = [
  {
    id: 2,
    title: 'Khóa học hàng đầu',
    courses: [
      {
        id: 3,
        title: 'Mộng tinh là gì?',
        price: 0,
        image: images.courseMongTinh
      },
      {
        id: 4,
        title: 'Rụng trứng ra sao?',
        price: 0,
        image: images.courseRungTrung
      },
      {
        id: 5,
        title: 'Da đẹp, dáng xinh',
        price: 0,
        image: images.courseSkinCare
      }
    ]
  },
  {
    id: 1,
    title: 'Khóa học có phí',
    courses: [
      {
        id: 1,
        title: 'Khám phá cuộc sống',
        price: 100000,
        image: images.course1
      },
      {
        id: 2,
        title: 'Trở về tuổi thơ',
        price: 200000,
        image: images.course2
      }
    ]
  },
  {
    id: 3,
    title: 'Khóa học sắp ra mắt',
    courses: [
      {
        id: 6,
        title: 'Bùng nổ cảm xúc',
        price: 0,
        image: images.course5
      },
      {
        id: 7,
        title: 'Vượt ngàn thử thách',
        price: 0,
        image: images.course6
      },
      {
        id: 8,
        title: 'Chìm vào giấc mơ',
        price: 0,
        image: images.course7
      },
      {
        id: 9,
        title: 'Rung động đầu đời',
        price: 0,
        image: images.course8
      },
      {
        id: 10,
        title: 'Nụ cười kết nối',
        price: 0,
        image: images.course3
      },
      {
        id: 11,
        title: 'Khám phá cuộc sống',
        price: 0,
        image: images.course4
      }
    ]
  }
]

function CourseList() {
  return (
    <section className='space-y-14'>
      {courseData.map((category) => (
        <div key={category.id}>
          <h2 className='text-4xl'>{category.title}</h2>

          <div className='grid grid-cols-5 gap-4 mt-10'>
            {category.courses.map((course) => (
              <Link href={`/course/${course.id}`} passHref key={course.id}>
                <article
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
      ))}
    </section>
  )
}

export default CourseList
