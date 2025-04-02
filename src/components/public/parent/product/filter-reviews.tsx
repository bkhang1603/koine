'use client'

import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'

interface FilterReviewsProps {
  ratingCounts: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
  totalReviews: number
  currentFilter: number
  productId: string
}

export default function FilterReviews({ ratingCounts, totalReviews, currentFilter }: FilterReviewsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleFilterClick = (rating: number | null) => {
    if (rating === null || rating === 0) {
      // Remove the star parameter
      router.push(pathname)
    } else {
      // Add or update the star parameter
      router.push(`${pathname}?star=${rating}`)
    }
  }

  return (
    <div className='flex flex-wrap gap-2 items-center'>
      <span className='text-sm text-muted-foreground hidden md:inline-block'>Lọc đánh giá:</span>
      <div className='flex flex-wrap gap-2'>
        <Button
          variant={currentFilter === 0 ? 'default' : 'outline'}
          size='sm'
          onClick={() => handleFilterClick(null)}
          className='rounded-full'
        >
          Tất cả ({totalReviews})
        </Button>
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingCounts[rating as keyof typeof ratingCounts]
          return (
            <Button
              key={rating}
              variant={currentFilter === rating ? 'default' : 'outline'}
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
