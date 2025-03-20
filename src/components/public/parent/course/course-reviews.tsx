'use client'

import { useGetCourseReviewQuery } from '@/queries/useCourse'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Star, StarHalf } from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface CourseReviewsProps {
  courseId: string
}

export default function CourseReviews({ courseId }: CourseReviewsProps) {
  const { data, isLoading, isError } = useGetCourseReviewQuery({ id: courseId })

  const reviews = data?.payload.data || []
  //   const averageRating = data?.payload.data?.averageRating || 0
  const averageRating = 0
  //   const totalReviews = data?.payload.data?.totalReviews || 0
  const totalReviews = 0

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className='w-4 h-4 fill-amber-400 text-amber-400' />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarHalf key={i} className='w-4 h-4 fill-amber-400 text-amber-400' />)
      } else {
        stars.push(<Star key={i} className='w-4 h-4 text-gray-300' />)
      }
    }

    return stars
  }

  if (isLoading) {
    return (
      <div className='mt-12 space-y-8'>
        <div className='space-y-4'>
          <Skeleton className='h-8 w-40' />
          <div className='flex items-center gap-2'>
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-5 w-20 ml-2' />
          </div>
        </div>

        {[1, 2, 3].map((i) => (
          <div key={i} className='space-y-3 pb-6 border-b'>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-10 w-10 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-24' />
              </div>
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return <div className='mt-12 text-center text-gray-500'>Không thể tải đánh giá. Vui lòng thử lại sau.</div>
  }

  if (reviews.length === 0) {
    return (
      <div className='mt-12'>
        <h2 className='text-xl sm:text-2xl font-bold mb-6'>Đánh giá từ học viên</h2>
        <div className='text-center py-10 bg-gray-50 rounded-lg'>
          <p className='text-gray-500'>Chưa có đánh giá nào cho khóa học này</p>
        </div>
      </div>
    )
  }

  return (
    <div className='mt-12'>
      <h2 className='text-xl sm:text-2xl font-bold mb-6'>Đánh giá từ học viên</h2>

      {/* Rating summary */}
      <div className='bg-gray-50 p-6 rounded-xl mb-8'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8'>
          <div className='text-center sm:text-left'>
            <div className='text-3xl sm:text-4xl font-bold text-gray-900'>{averageRating.toFixed(1)}</div>
            <div className='flex justify-center sm:justify-start mt-2'>{renderStars(averageRating)}</div>
            <p className='text-sm text-gray-500 mt-1'>{totalReviews} đánh giá</p>
          </div>

          <div className='flex-1 space-y-2'>
            {/* Here you could add rating distribution bars (5 star, 4 star, etc) */}
          </div>
        </div>
      </div>

      {/* Individual reviews */}
      <div className='space-y-8'>
        {reviews.map((review, index) => (
          <div key={index} className='pb-6 border-b last:border-b-0 last:pb-0'>
            <div className='flex items-start gap-4 mb-3'>
              <Avatar className='h-10 w-10 border'>
                <AvatarFallback>{review.userId.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className='font-medium'>User {review.userId.substring(0, 8)}</div>
                <div className='flex items-center gap-2 mt-1'>
                  <div className='flex'>{renderStars(review.rating)}</div>
                  <span className='text-xs text-gray-500'>
                    {format(new Date(review.createdAt), 'dd/MM/yyyy', { locale: vi })}
                  </span>
                </div>
              </div>
            </div>
            <p className='text-gray-700'>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
