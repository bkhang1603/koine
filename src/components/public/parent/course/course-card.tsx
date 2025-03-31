import { CoursesResType } from '@/schemaValidations/course.schema'
import Image from 'next/image'
import Link from 'next/link'

function CourseCard({ course }: { course: CoursesResType['data'][0] }) {
  const discountedPrice = course.price - course.price * course.discount

  return (
    <Link href={`/course/${course.slug}`}>
      <article className='cursor-pointer group/course'>
        {/* Image Container */}
        <div className='w-full aspect-square rounded-lg overflow-hidden relative'>
          <Image
            src={course.imageUrl ?? '/no-image.png'}
            alt={course.title}
            width={400}
            height={400}
            className='w-full h-full object-cover rounded-lg'
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

          {/* Hover Overlay */}
          <div
            className='absolute w-full h-10 bg-black/50 opacity-0 -bottom-10 
            group-hover/course:bottom-0 group-hover/course:opacity-100 
            flex justify-center items-center transition-all duration-500'
          >
            <p className='text-white'>Xem thêm</p>
          </div>
        </div>

        {/* Content */}
        <div className='p-2'>
          {/* Categories */}
          <p className='text-xs text-gray-500'>{course.categories.map((cat) => cat.name).join(', ')}</p>

          {/* Title */}
          <h3 className='text-lg font-semibold line-clamp-1'>{course.title}</h3>

          {/* Price */}
          <div className='flex items-center gap-2 mt-2'>
            {course.price === 0 ? (
              <span className='text-base font-semibold text-primary'>Miễn phí</span>
            ) : (
              <>
                <span className='text-base font-semibold'>{discountedPrice.toLocaleString()}đ</span>
                {course.discount > 0 && (
                  <span className='text-sm text-gray-500 line-through'>{course.price.toLocaleString()}đ</span>
                )}
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default CourseCard
