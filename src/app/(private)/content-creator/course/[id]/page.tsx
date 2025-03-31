'use client'
import { use } from 'react'
import { useGetCourseQuery } from '@/queries/useCourse'

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
  Video,
  File,
  MessageCircle,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn, formatLevel } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { MoreOptions } from '@/components/private/common/more-options'

// Skeleton component cho course detail
const CourseDetailSkeleton = () => {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-4'>
        <Skeleton className='h-8 w-48 mb-6' />
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

// Hiển thị loại lesson
const LessonTypeDisplay = ({ type }: { type: string }) => {
  switch (type) {
    case 'VIDEO':
      return (
        <Badge variant='outline' className='border-blue-500/50 text-blue-500'>
          <Video className='w-3 h-3 mr-1' />
          Video
        </Badge>
      )
    case 'DOCUMENT':
      return (
        <Badge variant='outline' className='border-green-500/50 text-green-500'>
          <File className='w-3 h-3 mr-1' />
          Bài đọc
        </Badge>
      )
    case 'BOTH':
      return (
        <Badge variant='outline' className='border-purple-500/50 text-purple-500'>
          <Video className='w-3 h-3 mr-1' />
          Video & Bài đọc
        </Badge>
      )
    default:
      return (
        <Badge variant='outline' className='border-gray-500/50 text-gray-500'>
          <FileText className='w-3 h-3 mr-1' />
          Khác
        </Badge>
      )
  }
}

export default function CourseDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { data: courseData, isLoading } = useGetCourseQuery({ id: params.id })
  const router = useRouter()

  const course = courseData?.payload?.data

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

  // Format dates
  const createdAt = new Date(course.createdAt)
  const updatedAt = new Date(course.updatedAt)

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-4'>
        {/* Breadcrumb - Tách riêng và đặt ở trên cùng */}
        <div className='flex items-center justify-between mb-6'>
          <nav className='flex items-center text-sm'>
            <Link href='/content-creator/course' className='text-muted-foreground hover:text-primary transition-colors'>
              Khóa học
            </Link>
            <ChevronRight className='w-4 h-4 mx-2 text-muted-foreground' />
            <span className='font-medium line-clamp-1 max-w-[240px] md:max-w-md'>{course.title}</span>
          </nav>
        </div>

        <div className='w-full aspect-[21/9] relative'>
          <Image
            src={course.imageBanner || '/placeholders/course-banner.jpg'}
            alt={course.title}
            fill
            priority
            className='object-cover'
          />
        </div>
      </div>

      <div className='container mx-auto px-4 -mt-32 md:-mt-20 relative z-10'>
        {/* Course Info Card */}
        <Card className='shadow-lg mb-8 overflow-hidden border-0'>
          <div className='p-6 md:p-8 relative'>
            <div className='flex flex-col md:flex-row gap-6'>
              <div className='relative w-20 h-20 md:w-28 md:h-28 rounded-lg overflow-hidden border-4 border-white shadow-lg bg-white flex-shrink-0 mx-auto md:mx-0'>
                <Image
                  src={course.imageUrl || '/placeholders/course-thumb.jpg'}
                  alt={course.title}
                  fill
                  className='object-cover'
                />
              </div>

              <div className='flex-1 text-center md:text-left'>
                <div className='flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2'>
                  <Badge variant={course.isBanned ? 'destructive' : 'default'} className='uppercase'>
                    {course.isBanned ? 'Đã chặn' : 'Đã xuất bản'}
                  </Badge>
                  <Badge variant='outline' className='bg-primary/10'>
                    {formatLevel(course.level)}
                  </Badge>
                  {course.categories.map((category) => (
                    <Badge key={category.id} variant='outline' className='bg-secondary/10'>
                      {category.name}
                    </Badge>
                  ))}
                </div>

                <h1 className='text-xl md:text-2xl font-bold mb-2 mt-2'>{course.title}</h1>
                <p className='text-muted-foreground mb-4 text-sm'>{course.description}</p>

                <div className='flex flex-wrap justify-center md:justify-start gap-4 text-sm'>
                  <div className='flex items-center gap-1'>
                    <Clock className='w-4 h-4 text-muted-foreground' />
                    <span>{course.durationsDisplay}</span>
                  </div>

                  <div className='flex items-center gap-1'>
                    <LayoutList className='w-4 h-4 text-muted-foreground' />
                    <span>{course.chapters.length} chương</span>
                  </div>

                  <div className='flex items-center gap-1'>
                    <FileText className='w-4 h-4 text-muted-foreground' />
                    <span>{totalLessons} bài học</span>
                  </div>

                  <div className='flex items-center gap-1'>
                    <Users className='w-4 h-4 text-muted-foreground' />
                    <span>{course.totalEnrollment} học viên</span>
                  </div>

                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 text-amber-500' />
                    <span>{course.aveRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='md:col-span-2 space-y-8'>
            <Card>
              <CardHeader className='border-b'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <LayoutList className='w-5 h-5 text-primary' />
                    <CardTitle>Nội dung khóa học</CardTitle>
                  </div>
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
                              </div>
                            </div>
                          </div>
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
                              href={`/content-creator/course/${params.id}/lesson/${lesson.id}`}
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
                <CardTitle>Thông tin khóa học</CardTitle>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='space-y-4'>
                  <p className='text-sm text-muted-foreground'>{course.description}</p>

                  <div className='grid grid-cols-2 gap-4 mt-4'>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-4 h-4 text-muted-foreground' />
                      <span className='text-sm'>{course.durationsDisplay}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BookOpen className='w-4 h-4 text-muted-foreground' />
                      <span className='text-sm'>{course.chapters.length} chương</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <FileText className='w-4 h-4 text-muted-foreground' />
                      <span className='text-sm'>{totalLessons} bài học</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Users className='w-4 h-4 text-muted-foreground' />
                      <span className='text-sm'>{course.totalEnrollment} học viên</span>
                    </div>
                  </div>

                  <div className='pt-4 border-t'>
                    <h4 className='font-medium mb-2'>Thể loại</h4>
                    <div className='flex flex-wrap gap-2'>
                      {course.categories.map((category) => (
                        <Badge key={category.id} variant='secondary'>
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className='pt-4 border-t'>
                    <h4 className='font-medium mb-2'>Cấp độ</h4>
                    <Badge variant='outline' className='bg-primary/10'>
                      {formatLevel(course.level)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='border-b'>
                <div className='flex items-center gap-2'>
                  <Clock className='w-5 h-5 text-primary' />
                  <CardTitle>Thông tin thời gian</CardTitle>
                </div>
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
                  <div>
                    <h3 className='text-sm font-medium text-muted-foreground mb-1'>Người tạo</h3>
                    <span className='font-medium'>{course.creatorId}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
