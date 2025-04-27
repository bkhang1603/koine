'use client'
import { use } from 'react'
import { useGetCourseQuery, useDeleteChapterMutation } from '@/queries/useCourse'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  FileText,
  LayoutList,
  BookOpen,
  Users,
  Star,
  Plus,
  Calendar,
  Info,
  Tag,
  GraduationCap,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn, formatLevel } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { MoreOptions } from '@/components/private/common/more-options'
import { LessonTypeDisplay } from '@/components/private/common/course/lesson-type-display'
import { handleErrorApi } from '@/lib/utils'
import { CourseEnrollmentsChart } from '@/components/private/common/course/course-enrollments-chart'
import { Separator } from '@/components/ui/separator'
import { useDashboardCourseDetailQuery } from '@/queries/useDashboard'

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
            <Card>
              <CardHeader>
                <Skeleton className='h-7 w-48' />
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>

          <div className='space-y-6'>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardContent className='p-6'>
                    <Skeleton className='h-36 w-full' />
                  </CardContent>
                </Card>
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
  const router = useRouter()
  const deleteChapterMutation = useDeleteChapterMutation({ courseId: params.id })
  // eslint-disable-next-line no-unused-vars
  const { data: dashboardData, isLoading: isDashboardLoading } = useDashboardCourseDetailQuery({ courseId: params.id })

  const course = courseData?.payload?.data
  const courseEnrollments = dashboardData?.payload?.data?.courseEnrollments || []

  const handleDeleteChapter = async (chapterId: string) => {
    try {
      await deleteChapterMutation.mutateAsync(chapterId)
      toast({
        title: 'Xóa chương thành công',
        description: 'Chương đã được xóa',
        variant: 'default'
      })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  if (isLoading) return <CourseDetailSkeleton />
  if (!course)
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <FileText className='w-16 h-16 text-muted-foreground mb-4' />
        <h2 className='text-2xl font-bold mb-2'>Không tìm thấy khóa học</h2>
        <p className='text-muted-foreground mb-6'>Khóa học này không tồn tại hoặc đã bị xóa</p>
        <Link href='/content-creator/course'>
          <Button>Quay lại danh sách khóa học</Button>
        </Link>
      </div>
    )

  // Tính tổng số bài học từ tất cả các chương
  const totalLessons = course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)

  // Tính tổng số câu hỏi từ tất cả các chương
  const totalQuestions = course.chapters.reduce((acc, chapter) => acc + (chapter.questions?.length || 0), 0)

  // Format dates
  const createdAt = new Date(course.createdAt)
  const updatedAt = new Date(course.updatedAt)

  const breadcrumbItems = [
    {
      title: 'Khóa học',
      href: '/content-creator/course'
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

        {/* Charts section */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Thống kê khóa học</h2>
          <div className='w-full mx-auto'>
            <CourseEnrollmentsChart data={courseEnrollments} />
          </div>
        </div>

        {/* Course Detailed Information */}
        <div className='space-y-6 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <Card className='md:col-span-2'>
              <CardHeader className='pb-3'>
                <CardTitle>Thông tin khóa học</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 pt-0'>
                {/* Basic information */}
                <div>
                  <div className='flex justify-between items-start mb-2'>
                    <div className='text-lg font-medium'>{course.title}</div>
                    <Badge variant={course.isBanned ? 'destructive' : 'default'}>
                      {course.isBanned ? 'Bị chặn' : 'Đang hoạt động'}
                    </Badge>
                  </div>
                  <p className='text-muted-foreground text-sm'>{course.description}</p>
                </div>

                <Separator className='my-2' />

                {/* Course stats section */}
                <div className='grid grid-cols-2 md:grid-cols-5 gap-2 mb-0'>
                  <div className='flex flex-col items-center p-2 bg-muted/30 rounded-lg'>
                    <Users className='h-4 w-4 text-primary mb-1' />
                    <span className='text-base font-bold'>{course.totalEnrollment}</span>
                    <span className='text-xs text-muted-foreground'>Học viên</span>
                  </div>
                  <div className='flex flex-col items-center p-2 bg-muted/30 rounded-lg'>
                    <LayoutList className='h-4 w-4 text-primary mb-1' />
                    <span className='text-base font-bold'>{course.chapters.length}</span>
                    <span className='text-xs text-muted-foreground'>Chương</span>
                  </div>
                  <div className='flex flex-col items-center p-2 bg-muted/30 rounded-lg'>
                    <FileText className='h-4 w-4 text-primary mb-1' />
                    <span className='text-base font-bold'>{totalLessons}</span>
                    <span className='text-xs text-muted-foreground'>Bài học</span>
                  </div>
                  <div className='flex flex-col items-center p-2 bg-muted/30 rounded-lg'>
                    <HelpCircle className='h-4 w-4 text-primary mb-1' />
                    <span className='text-base font-bold'>{totalQuestions}</span>
                    <span className='text-xs text-muted-foreground'>Câu hỏi</span>
                  </div>
                  <div className='flex flex-col items-center p-2 bg-muted/30 rounded-lg'>
                    <Star className='h-4 w-4 text-amber-500 mb-1' />
                    <span className='text-base font-bold'>{course.aveRating.toFixed(1)}</span>
                    <span className='text-xs text-muted-foreground'>Đánh giá</span>
                  </div>
                </div>

                <Separator className='my-2' />

                {/* Course attributes in a compact grid */}
                <div className='grid grid-cols-2 gap-x-4 gap-y-3'>
                  <div>
                    <div className='flex items-center gap-1.5 mb-1'>
                      <Tag className='h-3.5 w-3.5 text-muted-foreground' />
                      <span className='text-sm font-medium'>Phân loại</span>
                    </div>
                    <div className='flex flex-wrap gap-1.5'>
                      {course.categories && course.categories.length > 0 ? (
                        course.categories.map((category) => (
                          <Badge key={category.id} variant='outline' className='text-xs'>
                            {category.name}
                          </Badge>
                        ))
                      ) : (
                        <span className='text-xs text-muted-foreground'>Không có danh mục</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className='flex items-center gap-1.5 mb-1'>
                      <BookOpen className='h-3.5 w-3.5 text-muted-foreground' />
                      <span className='text-sm font-medium'>Cấp độ</span>
                    </div>
                    <Badge variant='secondary' className='text-xs'>
                      {formatLevel(course.level)}
                    </Badge>
                  </div>

                  <div>
                    <div className='flex items-center gap-1.5 mb-1'>
                      <Clock className='h-3.5 w-3.5 text-muted-foreground' />
                      <span className='text-sm font-medium'>Thời lượng</span>
                    </div>
                    <span className='text-sm text-muted-foreground'>{course.durationsDisplay}</span>
                  </div>

                  <div>
                    <div className='flex items-center gap-1.5 mb-1'>
                      <GraduationCap className='h-3.5 w-3.5 text-muted-foreground' />
                      <span className='text-sm font-medium'>Nhóm tuổi</span>
                    </div>
                    <span className='text-sm text-muted-foreground'>{course.ageStage}</span>
                  </div>

                  <div>
                    <div className='flex items-center gap-1.5 mb-1'>
                      <Calendar className='h-3.5 w-3.5 text-muted-foreground' />
                      <span className='text-sm font-medium'>Ngày tạo</span>
                    </div>
                    <span className='text-sm text-muted-foreground'>
                      {format(createdAt, 'dd/MM/yyyy', { locale: vi })}
                    </span>
                  </div>

                  <div>
                    <div className='flex items-center gap-1.5 mb-1'>
                      <Info className='h-3.5 w-3.5 text-muted-foreground' />
                      <span className='text-sm font-medium'>Cập nhật lần cuối</span>
                    </div>
                    <span className='text-sm text-muted-foreground'>
                      {format(updatedAt, 'dd/MM/yyyy', { locale: vi })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <CardTitle>Hình ảnh khóa học</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 pt-0'>
                <div className='space-y-2'>
                  <div className='text-sm text-muted-foreground font-medium'>Banner</div>
                  <div className='aspect-[21/9] relative rounded-md overflow-hidden border'>
                    <Image
                      src={course.imageBanner || '/placeholders/course-banner.jpg'}
                      alt={`${course.title} banner`}
                      fill
                      className='object-cover'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='text-sm text-muted-foreground font-medium'>Thumbnail</div>
                  <div className='aspect-square w-full max-w-[220px] mx-auto relative rounded-md overflow-hidden border'>
                    <Image
                      src={course.imageUrl || '/placeholders/course-thumb.jpg'}
                      alt={`${course.title} thumbnail`}
                      fill
                      className='object-cover'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='md:col-span-2'>
            <Card>
              <CardHeader className='border-b'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <LayoutList className='w-5 h-5 text-primary' />
                    <CardTitle>Nội dung khóa học</CardTitle>
                  </div>
                  <Button asChild>
                    <Link href={`/content-creator/course/${params.id}/chapter/new`}>
                      <Plus className='w-4 h-4 mr-2' />
                      Thêm chương mới
                    </Link>
                  </Button>
                </div>
              </CardHeader>

              <CardContent className='p-0'>
                {course.chapters.length === 0 ? (
                  <div className='p-8 text-center'>
                    <LayoutList className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                    <h3 className='text-lg font-medium mb-2'>Chưa có chương nào</h3>
                    <p className='text-muted-foreground mb-4'>Khóa học này chưa có nội dung</p>
                  </div>
                ) : (
                  course.chapters.map((chapter, index) => (
                    <div key={chapter.id} className='border-b last:border-0'>
                      <div className='p-4 md:p-6 bg-muted/30'>
                        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                          <div className='flex items-start md:items-center gap-4'>
                            <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-medium text-primary shrink-0'>
                              {index + 1}
                            </div>
                            <div>
                              <div className='flex flex-wrap items-center gap-1'>
                                <h3 className='font-medium text-lg'>{chapter.title}</h3>
                              </div>
                              <div className='flex flex-wrap items-center gap-2 mt-1'>
                                <Badge variant='outline' className='ml-0'>
                                  {chapter.lessons.length} bài học
                                </Badge>
                                <Badge variant='outline' className='ml-0'>
                                  <Clock className='w-3 h-3 mr-1' />
                                  {chapter.durationsDisplay}
                                </Badge>
                                <Badge variant='outline' className='ml-0'>
                                  <HelpCircle className='w-3 h-3 mr-1' />
                                  {chapter.questions?.length || 0} câu hỏi
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <MoreOptions
                            item={{
                              id: chapter.id,
                              title: chapter.title,
                              status: 'VISIBLE',
                              slug: ''
                            }}
                            itemType='chapter'
                            onView={() => router.push(`/content-creator/course/${params.id}/chapter/${chapter.id}`)}
                            onEdit={() =>
                              router.push(`/content-creator/course/${params.id}/chapter/${chapter.id}/edit`)
                            }
                            onDelete={() => handleDeleteChapter(chapter.id)}
                          />
                        </div>
                      </div>

                      <div>
                        {chapter.lessons.length === 0 ? (
                          <div className='p-4 pl-20 text-muted-foreground italic'>
                            Chưa có bài học nào trong chương này
                          </div>
                        ) : (
                          chapter.lessons.map((lesson, lessonIndex) => (
                            <Link
                              href={`/content-creator/course/${params.id}/chapter/${chapter.id}`}
                              key={lesson.id}
                              className='p-4 pl-10 md:pl-20 hover:bg-muted/50 transition-colors border-b last:border-0 block'
                            >
                              <div className='flex items-center gap-4'>
                                <div
                                  className={cn(
                                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                                    lesson.type === 'VIDEO' && 'bg-blue-500/10 text-blue-500',
                                    lesson.type === 'DOCUMENT' && 'bg-green-500/10 text-green-500',
                                    lesson.type === 'BOTH' && 'bg-purple-500/10 text-purple-500'
                                  )}
                                >
                                  {lessonIndex + 1}
                                </div>
                                <div className='flex-1 min-w-0'>
                                  <div className='flex items-center gap-2 flex-wrap'>
                                    <span className='font-medium'>{lesson.title}</span>
                                    <LessonTypeDisplay type={lesson.type} />
                                  </div>
                                  <div className='flex items-center gap-4 mt-1 text-sm text-muted-foreground'>
                                    <div className='flex items-center whitespace-nowrap'>
                                      <Clock className='w-3.5 h-3.5 mr-1 shrink-0' />
                                      <span>{lesson.durationsDisplay}</span>
                                    </div>
                                    <p className='line-clamp-1 overflow-hidden text-ellipsis'>{lesson.description}</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            <Card>
              <CardHeader className='border-b'>
                <CardTitle>Thông tin thời gian</CardTitle>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='space-y-4'>
                  <div>
                    <h3 className='text-sm font-medium text-muted-foreground mb-1'>Ngày tạo</h3>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>{format(createdAt, 'dd/MM/yyyy', { locale: vi })}</span>
                      <span className='text-xs text-muted-foreground'>
                        ({format(createdAt, 'HH:mm', { locale: vi })})
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className='text-sm font-medium text-muted-foreground mb-1'>Cập nhật lần cuối</h3>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>{format(updatedAt, 'dd/MM/yyyy', { locale: vi })}</span>
                      <span className='text-xs text-muted-foreground'>
                        ({format(updatedAt, 'HH:mm', { locale: vi })})
                      </span>
                    </div>
                  </div>
                  {course.censorId && (
                    <div>
                      <h3 className='text-sm font-medium text-muted-foreground mb-1'>Người kiểm duyệt</h3>
                      <span className='font-medium'>{course.censorId}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
