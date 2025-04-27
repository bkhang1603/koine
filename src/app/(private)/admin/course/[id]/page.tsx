'use client'
import { use } from 'react'
import { useGetCourseQuery } from '@/queries/useCourse'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { CourseDetail } from '@/components/private/admin/course/course-detail'
import { CourseEnrollmentsChart } from '@/components/private/common/course/course-enrollments-chart'
import { useDashboardCourseDetailQuery } from '@/queries/useDashboard'

// Adapter function to transform course data to match CourseDetail props
const adaptCourseForDetailView = (course: any) => {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    imageUrl: course.imageUrl,
    imageBanner: course.imageBanner,
    isBanned: course.isBanned,
    level: course.level,
    ageStage: course.ageStage,
    categories: course.categories,
    durationsDisplay: course.durationsDisplay,
    chapters: course.chapters.map((chapter: any) => ({
      ...chapter,
      questions: chapter.questions?.map((question: any) => ({
        id: question.id,
        title: question.content,
        description: question.content,
        chapterId: chapter.id,
        sequence: 0
      }))
    })),
    totalEnrollment: course.totalEnrollment,
    aveRating: course.aveRating,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
    creatorId: course.creatorId,
    creator: course.creator,
    censorId: course.censorId,
    censor: course.censor,
    price: course.price
  }
}

// Skeleton component cho course detail
const CourseDetailSkeleton = () => {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-4'>
        <Skeleton className='h-8 w-48 mb-6' />

        {/* Chart Skeletons - moved to top */}
        <div className='mb-8'>
          <Skeleton className='h-8 w-48 mb-4' />
          <div className='w-full mx-auto'>
            <div className='bg-card rounded-lg border shadow-sm'>
              <div className='p-6'>
                <Skeleton className='h-7 w-48 mb-2' />
                <Skeleton className='h-4 w-64 mb-6' />
                <Skeleton className='h-[300px] w-full' />
                <div className='mt-3 pt-3 border-t'>
                  <div className='flex justify-between'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-4 w-32' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Skeleton className='w-full aspect-[21/9] rounded-xl' />
      </div>

      <div className='container mx-auto px-4 mt-8'>
        <div className='grid grid-cols-3 gap-8'>
          <div className='col-span-2 space-y-8'>
            <div className='bg-card rounded-lg border shadow-sm'>
              <div className='p-6'>
                <Skeleton className='h-7 w-48 mb-6' />
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className='mb-6'>
                      <Skeleton className='h-16 w-full mb-4' />
                      {Array(2)
                        .fill(0)
                        .map((_, j) => (
                          <Skeleton key={j} className='h-12 w-full mb-2' />
                        ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className='bg-card rounded-lg border shadow-sm p-6'>
                  <Skeleton className='h-36 w-full' />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CourseDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { data: courseData, isLoading } = useGetCourseQuery({ id: params.id })
  // eslint-disable-next-line no-unused-vars
  const { data: dashboardData, isLoading: isDashboardLoading } = useDashboardCourseDetailQuery({ courseId: params.id })

  const course = courseData?.payload?.data
  const courseEnrollments = dashboardData?.payload?.data?.courseEnrollments || []

  if (isLoading) return <CourseDetailSkeleton />
  if (!course)
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <FileText className='w-16 h-16 text-muted-foreground mb-4' />
        <h2 className='text-2xl font-bold mb-2'>Không tìm thấy khóa học</h2>
        <p className='text-muted-foreground mb-6'>Khóa học này không tồn tại hoặc đã bị xóa</p>
        <Link href='/admin/course'>
          <Button>Quay lại danh sách khóa học</Button>
        </Link>
      </div>
    )

  const breadcrumbItems = [
    {
      title: 'Khóa học',
      href: '/admin/course'
    },
    {
      title: course.title
    }
  ]

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-4'>
        {/* Breadcrumb component */}
        <div className='mb-6'>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Charts section - moved to top */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Thống kê khóa học</h2>
          <div className='w-full mx-auto'>
            <CourseEnrollmentsChart data={courseEnrollments} />
          </div>
        </div>

        <CourseDetail course={adaptCourseForDetailView(course)} />
      </div>
    </div>
  )
}
