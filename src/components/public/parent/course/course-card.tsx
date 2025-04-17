import { CoursesResType } from '@/schemaValidations/course.schema'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Gift, Hash } from 'lucide-react'

function CourseCard({ course }: { course: CoursesResType['data'][0] }) {
  // Don't render card if course is not visible
  if (course.isVisible === false) {
    return null
  }

  const discountedPrice = course.price - course.price * course.discount

  // Get appropriate color and icon for age range
  const getAgeRangeBadgeProps = (ageStage: string) => {
    switch (ageStage) {
      case '3-6':
        return {
          bgColor: 'bg-pink-200 hover:bg-pink-300',
          textColor: 'text-pink-800',
          borderColor: 'border-pink-300',
          label: 'Mầm non',
          emoji: '🧸'
        }
      case '7-9':
        return {
          bgColor: 'bg-green-100 hover:bg-green-200',
          textColor: 'text-green-800',
          borderColor: 'border-green-300',
          label: 'Tiểu học',
          emoji: '✏️'
        }
      case '10-12':
        return {
          bgColor: 'bg-sky-100 hover:bg-sky-200',
          textColor: 'text-sky-800',
          borderColor: 'border-sky-300',
          label: 'Tiểu học',
          emoji: '📚'
        }
      case '13-15':
        return {
          bgColor: 'bg-violet-100 hover:bg-violet-200',
          textColor: 'text-violet-800',
          borderColor: 'border-violet-300',
          label: 'THCS',
          emoji: '🔬'
        }
      case '16-18':
        return {
          bgColor: 'bg-amber-100 hover:bg-amber-200',
          textColor: 'text-amber-800',
          borderColor: 'border-amber-300',
          label: 'THPT',
          emoji: '🎓'
        }
      case '18+':
        return {
          bgColor: 'bg-rose-100 hover:bg-rose-200',
          textColor: 'text-rose-800',
          borderColor: 'border-rose-300',
          label: 'Người lớn',
          emoji: '👨‍💼'
        }
      default:
        return {
          bgColor: 'bg-slate-100 hover:bg-slate-200',
          textColor: 'text-slate-800',
          borderColor: 'border-slate-300',
          label: 'Mọi lứa tuổi',
          emoji: '👪'
        }
    }
  }

  // Get category color based on category name
  const getCategoryColor = (categoryName: string) => {
    // Generate a consistent color based on the first character of the category name
    const colors = [
      'bg-blue-50 text-blue-600 border-blue-100',
      'bg-green-50 text-green-600 border-green-100',
      'bg-purple-50 text-purple-600 border-purple-100',
      'bg-amber-50 text-amber-600 border-amber-100',
      'bg-sky-50 text-sky-600 border-sky-100',
      'bg-indigo-50 text-indigo-600 border-indigo-100',
      'bg-rose-50 text-rose-600 border-rose-100',
      'bg-emerald-50 text-emerald-600 border-emerald-100'
    ]

    const index = categoryName.charCodeAt(0) % colors.length
    return colors[index]
  }

  const ageProps = course.ageStage ? getAgeRangeBadgeProps(course.ageStage) : null
  const link = course.isCombo ? `/combo/${course.slug}` : `/course/${course.slug}`

  return (
    <Link href={link}>
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

          {/* Tags container - top left */}
          <div className='absolute top-2 left-2 flex flex-col gap-1'>
            {/* Combo Badge */}
            {course.isCombo && (
              <Badge variant='secondary' className='flex items-center gap-1 bg-primary/90 hover:bg-primary'>
                <Gift className='w-3 h-3' />
                <span>Combo</span>
              </Badge>
            )}

            {/* Age Stage Badge */}
            {ageProps && (
              <Badge
                variant='outline'
                className={`flex items-center gap-1 ${ageProps.bgColor} ${ageProps.textColor} border ${ageProps.borderColor} shadow-sm`}
              >
                <span className='mr-0.5'>{ageProps.emoji}</span>
                <span>{course.ageStage}</span>
              </Badge>
            )}
          </div>

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
          <div className='flex flex-wrap gap-1 mb-1.5 min-h-[22px]'>
            {course.categories.slice(0, 3).map((cat) => (
              <span
                key={cat.id}
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${getCategoryColor(cat.name)}`}
              >
                <Hash className='w-2 h-2 mr-0.5' />
                {cat.name}
              </span>
            ))}
            {course.categories.length > 3 && (
              <span className='inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200'>
                +{course.categories.length - 3}
              </span>
            )}
          </div>

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
