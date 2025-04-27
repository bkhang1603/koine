import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  FileText,
  LayoutList,
  Users,
  Star,
  Calendar,
  Info,
  AlertCircle,
  BookOpen,
  Tag,
  HelpCircle
} from 'lucide-react'
import Image from 'next/image'
import { formatLevel } from '@/lib/utils'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { LessonTypeDisplay } from '@/components/private/common/course/lesson-type-display'
import { MoreOptions } from '@/components/private/common/more-options'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface CourseDetailProps {
  course: {
    id: string
    title: string
    description: string
    imageUrl: string
    imageBanner: string
    isBanned: boolean
    level: string
    ageStage: string
    categories: Array<{ id: string; name: string }>
    durationsDisplay: string
    chapters: Array<{
      id: string
      title: string
      description: string
      durations: number
      durationsDisplay: string
      sequence: number
      lessons: Array<{
        id: string
        type: 'VIDEO' | 'DOCUMENT' | 'BOTH'
        title: string
        description: string
        chapterId: string
        durations: number
        content: string | null
        videoUrl: string | null
        durationsDisplay: string
        sequence: number
      }>
      questions?: Array<{
        id: string
        title: string
        description: string
        chapterId: string
        sequence: number
      }>
    }>
    totalEnrollment: number
    aveRating: number
    createdAt: string
    updatedAt: string
  }
}

export function CourseDetail({ course }: CourseDetailProps) {
  const router = useRouter()
  const totalLessons = course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)
  const createdAt = new Date(course.createdAt)
  const updatedAt = new Date(course.updatedAt)

  return (
    <div className='space-y-6'>
      {/* Course stats and details */}
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

            <Separator className='my-3' />

            {/* Course stats section */}
            <div className='grid grid-cols-4 gap-2 mb-2'>
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
                <Star className='h-4 w-4 text-amber-500 mb-1' />
                <span className='text-base font-bold'>{course.aveRating.toFixed(1)}</span>
                <span className='text-xs text-muted-foreground'>Đánh giá</span>
              </div>
            </div>

            <Separator className='my-3' />

            {/* Course attributes in a compact grid */}
            <div className='grid grid-cols-2 gap-x-6 gap-y-4'>
              <div>
                <div className='flex items-center gap-1.5 mb-1.5'>
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
                <div className='flex items-center gap-1.5 mb-1.5'>
                  <BookOpen className='h-3.5 w-3.5 text-muted-foreground' />
                  <span className='text-sm font-medium'>Cấp độ</span>
                </div>
                <Badge variant='secondary' className='text-xs'>
                  {formatLevel(course.level)}
                </Badge>
              </div>

              <div>
                <div className='flex items-center gap-1.5 mb-1.5'>
                  <Users className='h-3.5 w-3.5 text-muted-foreground' />
                  <span className='text-sm font-medium'>Độ tuổi</span>
                </div>
                <Badge variant='secondary' className='text-xs'>
                  {course.ageStage}
                </Badge>
              </div>

              <div>
                <div className='flex items-center gap-1.5 mb-1.5'>
                  <Clock className='h-3.5 w-3.5 text-muted-foreground' />
                  <span className='text-sm font-medium'>Thời lượng</span>
                </div>
                <span className='text-sm text-muted-foreground'>{course.durationsDisplay}</span>
              </div>

              <div>
                <div className='flex items-center gap-1.5 mb-1.5'>
                  <Calendar className='h-3.5 w-3.5 text-muted-foreground' />
                  <span className='text-sm font-medium'>Ngày tạo</span>
                </div>
                <span className='text-sm text-muted-foreground'>{format(createdAt, 'dd/MM/yyyy', { locale: vi })}</span>
              </div>

              <div>
                <div className='flex items-center gap-1.5 mb-1.5'>
                  <Info className='h-3.5 w-3.5 text-muted-foreground' />
                  <span className='text-sm font-medium'>Cập nhật lần cuối</span>
                </div>
                <span className='text-sm text-muted-foreground'>{format(updatedAt, 'dd/MM/yyyy', { locale: vi })}</span>
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
              <div className='text-sm text-muted-foreground'>Banner</div>
              <div className='aspect-[21/9] relative rounded-md overflow-hidden'>
                <Image
                  src={course.imageBanner || '/placeholders/course-banner.jpg'}
                  alt={`${course.title} banner`}
                  fill
                  className='object-cover'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div className='text-sm text-muted-foreground'>Thumbnail</div>
              <div className='aspect-square w-full relative rounded-md overflow-hidden'>
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

      {/* Course content */}
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
              <AlertCircle className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-lg font-medium mb-2'>Chưa có chương nào</h3>
              <p className='text-muted-foreground mb-4'>Khóa học này chưa có nội dung</p>
              <Button variant='default' onClick={() => router.push(`/support/course/${course.id}/content/new`)}>
                Thêm chương
              </Button>
            </div>
          ) : (
            <div className='divide-y'>
              {course.chapters.map((chapter, index) => (
                <div key={chapter.id} className='border-b last:border-0'>
                  {/* Chapter header */}
                  <div className='p-4 md:p-6 bg-card hover:bg-muted/20 transition-colors cursor-pointer'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                      <div className='flex items-start md:items-center gap-4'>
                        <div className='w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center font-medium text-primary shrink-0 shadow-sm'>
                          {index + 1}
                        </div>
                        <div>
                          <div className='flex flex-wrap items-center gap-1'>
                            <h3 className='font-medium text-lg'>{chapter.title}</h3>
                          </div>
                          <div className='flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground'>
                            <div className='flex items-center gap-1'>
                              <FileText className='w-4 h-4' />
                              <span>{chapter.lessons.length} bài học</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <Clock className='w-4 h-4' />
                              <span>{chapter.durationsDisplay}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <HelpCircle className='w-4 h-4' />
                              <span>{chapter.questions?.length || 0} câu hỏi</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <MoreOptions
                          item={{
                            id: chapter.id,
                            title: chapter.title,
                            status: 'VISIBLE',
                            slug: chapter.title.toLowerCase().replace(/\s+/g, '-')
                          }}
                          itemType='chapter'
                          onView={() => router.push(`/support/course/${course.id}/chapter/${chapter.id}`)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lessons */}
                  {chapter.lessons.length > 0 && (
                    <div className='border-t bg-muted/5'>
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className='p-4 md:p-6 pl-12 md:pl-16 border-t first:border-t-0 hover:bg-muted/10 transition-colors'
                        >
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                              <div className='w-6 h-6 rounded-md bg-primary/5 flex items-center justify-center text-xs text-muted-foreground font-medium'>
                                {lessonIndex + 1}
                              </div>
                              <LessonTypeDisplay type={lesson.type} />
                              <div>
                                <h4 className='font-medium'>{lesson.title}</h4>
                                <div className='flex items-center gap-2 mt-1'>
                                  <Clock className='w-4 h-4 text-muted-foreground' />
                                  <span className='text-sm text-muted-foreground'>{lesson.durationsDisplay}</span>
                                </div>
                              </div>
                            </div>
                            <MoreOptions
                              item={{
                                id: lesson.id,
                                title: lesson.title,
                                status: 'VISIBLE',
                                slug: lesson.title.toLowerCase().replace(/\s+/g, '-')
                              }}
                              itemType='lesson'
                              onView={() =>
                                router.push(`/support/course/${course.id}/chapter/${chapter.id}/lesson/${lesson.id}`)
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
