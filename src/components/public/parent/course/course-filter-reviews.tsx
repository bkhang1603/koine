'use client'

import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'

interface CourseFilterReviewsProps {
  ratingsDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
  totalReviews: number
  selectedFilter: number | null
  courseId: string
}

export default function CourseFilterReviews({
  ratingsDistribution,
  totalReviews,
  selectedFilter
}: CourseFilterReviewsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleFilterClick = (rating: number | null) => {
    if (rating === null) {
      // Remove the star parameter
      router.push(pathname)
    } else {
      // Add or update the star parameter
      router.push(`${pathname}?star=${rating}`)
    }
  }

  return (
    <div className='flex flex-wrap gap-2 items-center md:justify-end'>
      <span className='text-sm text-muted-foreground hidden md:inline-block'>Lọc đánh giá:</span>
      <div className='flex flex-wrap gap-2'>
        <Button
          variant={selectedFilter === null ? 'default' : 'outline'}
          size='sm'
          onClick={() => handleFilterClick(null)}
          className='rounded-full'
        >
          Tất cả ({totalReviews})
        </Button>
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingsDistribution[rating as keyof typeof ratingsDistribution]
          return (
            <Button
              key={rating}
              variant={selectedFilter === rating ? 'default' : 'outline'}
              size='sm'
              onClick={() => handleFilterClick(rating)}
              className='rounded-full'
            >
              {rating} sao ({count})
            </Button>
          )
        })}
      </div>
    </div>
  )
}
