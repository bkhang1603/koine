'use client'

import { use, useEffect, useMemo } from 'react'
import { SearchParams } from '@/types/query'
import { handleErrorApi } from '@/lib/utils'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MessageCircle, User } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourseReviewQuery } from '@/queries/useCourse'
import configRoute from '@/config/route'

// Define interface for review structure based on the CourseReviewRes schema
interface ReviewUser {
  id: string
  username: string
}

interface Review {
  review: string
  rating: number
  createdAtFormatted: string
  updatedAtFormatted: string
  user: ReviewUser
}

interface CourseInfo {
  id: string
  title: string
}

function CommentList(props: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  // Use React.use() to properly unwrap the params and searchParams
  const params = use(props.params)
  // unwrap searchParams and cast to the right type (non-Promise version)

  const courseId = params.id

  // Use useGetCourseReviewQuery for reviews
  const {
    data: reviewsData,
    isLoading,
    error
  } = useGetCourseReviewQuery({
    id: courseId
  })

  useEffect(() => {
    if (error) {
      handleErrorApi({
        error
      })
    }
  }, [error])

  // Process reviews data
  const reviews = useMemo(() => {
    if (!reviewsData?.payload?.data?.ratingInfos) return []
    return reviewsData.payload.data.ratingInfos
  }, [reviewsData])

  // Course info data
  const courseInfo: CourseInfo = useMemo(
    () => ({
      id: courseId,
      title: 'Khóa học'
    }),
    [courseId]
  )

  const breadcrumbItems = [
    {
      title: 'Khóa học',
      href: configRoute.admin.course
    },
    {
      title: courseInfo.title,
      href: `${configRoute.admin.course}/${courseInfo.id}`
    },
    {
      title: 'Đánh giá',
      href: '#'
    }
  ]

  // Calculate total reviews count
  const totalReviews = reviewsData?.payload?.data?.stars?.totalRating || 0

  // Render a review
  const renderReview = (review: Review) => (
    <div key={`review-${review.user.id}-${review.createdAtFormatted}`} className='border-b border-slate-200 pb-3 mb-3'>
      <div className='flex items-start gap-3'>
        <Avatar className='h-9 w-9 mt-1'>
          <AvatarFallback>
            <User className='h-4 w-4' />
          </AvatarFallback>
        </Avatar>

        <div className='flex-1 space-y-1'>
          <div className='bg-slate-100 rounded-xl px-4 py-2'>
            <div className='font-semibold text-sm'>{review.user?.username || 'Người dùng'}</div>
            <p className='text-sm break-words'>{review.review}</p>
          </div>

          <div className='flex items-center text-xs text-slate-500'>
            <div>{review.createdAtFormatted}</div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Breadcrumb */}
      <div className='mb-4'>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>Đánh giá</h1>
        <p className='text-muted-foreground mt-1'>Đánh giá về khóa học: {courseInfo.title}</p>
      </div>

      {/* Reviews list */}
      <Card>
        <CardHeader className='pb-2 border-b'>
          <h2 className='text-lg font-medium'>Tất cả đánh giá ({totalReviews})</h2>
        </CardHeader>
        <CardContent className='pt-4'>
          {isLoading ? (
            <div className='space-y-4'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={`skeleton-${i}`} className='flex gap-3'>
                  <Skeleton className='h-9 w-9 rounded-full' />
                  <div className='flex-1 space-y-2'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-16 w-full' />
                    <div className='flex gap-2'>
                      <Skeleton className='h-3 w-16' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div className='space-y-1'>{reviews.map((review) => renderReview(review))}</div>
          ) : (
            <div className='text-center py-12'>
              <MessageCircle className='mx-auto h-12 w-12 text-muted-foreground/50' />
              <h3 className='text-lg font-medium mt-4'>Chưa có đánh giá nào</h3>
              <p className='text-sm text-muted-foreground mt-1'>Không có đánh giá nào để hiển thị</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CommentList
