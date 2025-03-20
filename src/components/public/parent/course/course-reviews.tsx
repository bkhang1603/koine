'use client'

import { useGetCourseReviewQuery } from '@/queries/useCourse'
import { Skeleton } from '@/components/ui/skeleton'
import { Star, MessageSquare, CheckCircle, Award, ThumbsUp, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface CourseReviewsProps {
  courseId: string
}

export default function CourseReviews({ courseId }: CourseReviewsProps) {
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null)
  const { data, isLoading } = useGetCourseReviewQuery({
    id: courseId
  })

  const stars = data?.payload?.data?.stars || {
    averageRating: 0,
    totalRating: 0,
    ratings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  }
  const averageRating = stars.averageRating || 0
  const totalReviews = stars.totalRating || 0
  const ratingsDistribution = stars.ratings || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

  // Move the entire filtering logic into the useMemo
  const filteredReviews = useMemo(() => {
    const allReviews = data?.payload?.data?.ratingInfos || []
    if (selectedFilter === null) return allReviews
    return allReviews.filter((review) => review.rating === selectedFilter)
  }, [data, selectedFilter])

  const handleFilterClick = (rating: number) => {
    setSelectedFilter(rating === selectedFilter ? null : rating)
  }

  // Render star rating component
  const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClass = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }

    return (
      <div className='flex gap-0.5'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizeClass[size],
              star <= rating ? 'fill-primary text-primary' : 'fill-slate-200 text-slate-200'
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className='w-full'>
      {/* Reviews Header */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-end space-y-4 md:space-y-0 mb-8'>
        <div>
          <h2 className='text-xl font-semibold tracking-tight'>Đánh giá khóa học</h2>
          <div className='flex items-center gap-4 mt-2'>
            <div className='flex items-center gap-2'>
              <div className='text-3xl font-bold text-primary'>{averageRating.toFixed(1)}</div>
              <StarRating rating={Math.round(averageRating)} size='md' />
            </div>
            <Separator orientation='vertical' className='h-6' />
            <div className='text-sm text-muted-foreground whitespace-nowrap'>{totalReviews} đánh giá</div>
          </div>
        </div>

        <div className='flex flex-wrap gap-2 items-center md:justify-end'>
          <span className='text-sm text-muted-foreground hidden md:inline-block'>Lọc đánh giá:</span>
          <div className='flex flex-wrap gap-2'>
            <Button
              variant={selectedFilter === null ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSelectedFilter(null)}
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
      </div>

      {/* Reviews Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        <div className='bg-card rounded-lg border p-4 flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
            <Star className='w-5 h-5 text-primary' />
          </div>
          <div>
            <div className='text-sm text-muted-foreground'>Điểm đánh giá</div>
            <div className='font-medium'>{averageRating.toFixed(1)}/5</div>
          </div>
        </div>

        <div className='bg-card rounded-lg border p-4 flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
            <Award className='w-5 h-5 text-primary' />
          </div>
          <div>
            <div className='text-sm text-muted-foreground'>Tỷ lệ hài lòng</div>
            <div className='font-medium'>
              {totalReviews > 0
                ? Math.round(((ratingsDistribution[4] + ratingsDistribution[5]) / totalReviews) * 100)
                : 0}
              %
            </div>
          </div>
        </div>

        <div className='bg-card rounded-lg border p-4 flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
            <ThumbsUp className='w-5 h-5 text-primary' />
          </div>
          <div>
            <div className='text-sm text-muted-foreground'>Khuyến nghị</div>
            <div className='font-medium'>{totalReviews > 0 ? 'Đáng học' : 'Chưa có'}</div>
          </div>
        </div>

        <div className='bg-card rounded-lg border p-4 flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
            <Clock className='w-5 h-5 text-primary' />
          </div>
          <div>
            <div className='text-sm text-muted-foreground'>Thời gian phản hồi</div>
            <div className='font-medium'>Dưới 24 giờ</div>
          </div>
        </div>
      </div>

      <Separator className='mb-8' />

      {/* Reviews List */}
      {isLoading ? (
        <div className='space-y-6'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='p-6 rounded-lg bg-card border shadow-sm flex items-start gap-4'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='flex-1 space-y-4'>
                <div className='flex justify-between'>
                  <Skeleton className='h-5 w-32' />
                  <Skeleton className='h-5 w-24' />
                </div>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
              </div>
            </div>
          ))}
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className='bg-card border border-dashed rounded-lg p-12 text-center'>
          <MessageSquare className='w-12 h-12 mx-auto text-muted-foreground/40 mb-4' />
          <h3 className='text-lg font-medium mb-2'>Không tìm thấy đánh giá phù hợp</h3>
          <p className='text-sm text-muted-foreground'>
            {selectedFilter ? `Không có đánh giá nào với ${selectedFilter} sao` : 'Khóa học này chưa có đánh giá'}
          </p>
        </div>
      ) : (
        <div className='space-y-6'>
          {filteredReviews.map((review, index) => (
            <div
              key={index}
              className='p-6 rounded-lg bg-card border shadow-sm hover:shadow-md transition-shadow duration-300'
            >
              <div className='flex items-start gap-4'>
                {/* User Avatar */}
                <div className='shrink-0'>
                  <div className='w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/10 flex items-center justify-center font-medium text-primary text-lg shadow-sm'>
                    {review.user.username.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Review Content */}
                <div className='flex-1 min-w-0'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <div className='font-medium text-lg'>{review.user.username}</div>
                      <div className='flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full text-xs text-emerald-600 font-medium'>
                        <CheckCircle className='w-3 h-3' />
                        Đã học
                      </div>
                    </div>
                    <div className='flex items-center gap-2 mt-1 mb-4'>
                      <StarRating rating={review.rating} />
                    </div>

                    {/* Plain Review Content */}
                    <p className='text-gray-700 leading-relaxed mb-3'>{review.review}</p>

                    {/* Timestamp at bottom right */}
                    <div className='flex justify-end'>
                      <div className='text-xs text-muted-foreground italic'>
                        Đánh giá vào {review.createdAtFormatted}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
