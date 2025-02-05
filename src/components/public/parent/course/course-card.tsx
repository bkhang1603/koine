import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CoursesResType } from '@/schemaValidations/course.schema'
import { Clock, Rocket, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function CourseCard({ course }: { course: CoursesResType['data'][0] }) {
  const discountedPrice = course.price - (course.price * course.discount) / 100

  return (
    <Link href={`/course/${course.slug}`} className='group'>
      <article className='bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl'>
        <div className='relative overflow-hidden'>
          <Image
            src={course.imageUrl || '/placeholder.svg'}
            alt={course.title}
            width={600}
            height={400}
            className='w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110'
          />
          <div className='absolute top-2 left-2 flex gap-2 flex-wrap'>
            {course.categories.map((category) => (
              <Badge key={category.id} className='bg-blue-500 text-white'>
                {category.name}
              </Badge>
            ))}
          </div>
          <div className='absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold'>
            {course.price === 0 ? (
              'Miễn phí'
            ) : (
              <>
                {discountedPrice.toLocaleString()}đ
                {course.discount > 0 && (
                  <span className='ml-2 line-through text-gray-400'>{course.price.toLocaleString()}đ</span>
                )}
              </>
            )}
          </div>
        </div>

        <div className='p-4'>
          <h3 className='text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
            {course.title}
          </h3>
          <p className='text-sm text-gray-600 mb-4 line-clamp-2'>{course.description}</p>

          <div className='pb-4'>
            <div className='flex items-center text-sm text-gray-600 gap-2'>
              <Rocket className='w-4 h-4' />
              <span>Sơ cấp</span>
            </div>
          </div>

          <Separator className='mb-4' />

          <div className='flex items-center justify-between text-sm text-gray-600 mb-2'>
            <div className='flex items-center'>
              <Star className='w-4 h-4 text-yellow-400 mr-1' />
              <span className='font-medium'>{course.aveRating === 0 ? 5 : course.aveRating}</span>
            </div>
            <div className='flex items-center'>
              <Clock className='w-4 h-4 mr-1' />
              <span>{course.durationsDisplay}</span>
            </div>
            <div className='flex items-center'>
              <Users className='w-4 h-4 mr-1' />
              <span>{course.totalEnrollment.toLocaleString()}</span>
            </div>
          </div>
        </div>
        {/* <div className='px-4 pb-4 flex items-center justify-between text-sm'>
          <div className='flex items-center text-primary'>
            <Tag className='w-4 h-4 mr-1' />
            <span>{course.creator.username}</span>
          </div>
          <span className='text-gray-500'>Cập nhật: {new Date(course.updatedAt).toLocaleDateString('vi-VN')}</span>
        </div> */}
      </article>
    </Link>
  )
}

export default CourseCard
