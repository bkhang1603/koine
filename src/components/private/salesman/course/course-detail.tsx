import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, FileText, LayoutList, Users, Star } from 'lucide-react'
import Image from 'next/image'
import { formatLevel } from '@/lib/utils'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { LessonTypeDisplay } from '@/components/private/common/course/lesson-type-display'
import { MoreOptions } from '@/components/private/common/more-options'
import { useRouter } from 'next/navigation'

interface CourseDetailProps {
  course: {
    id: string
    title: string
    description: string
    imageUrl: string
    imageBanner: string
    isBanned: boolean
    level: string
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
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-4'>
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
          <div className='md:col-span-2'>
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
                              onView={() => router.push(`/salesman/course/${course.id}/chapter/${chapter.id}`)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='divide-y'>
                        {chapter.lessons.map((lesson) => (
                          <div key={lesson.id} className='p-4 md:p-6'>
                            <div className='flex items-center gap-4'>
                              <LessonTypeDisplay type={lesson.type} />
                              <div>
                                <h4 className='font-medium'>{lesson.title}</h4>
                                <div className='flex items-center gap-2 mt-1'>
                                  <Clock className='w-4 h-4 text-muted-foreground' />
                                  <span className='text-sm text-muted-foreground'>{lesson.durationsDisplay}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chi tiết</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <div className='text-sm text-muted-foreground'>Ngày tạo</div>
                  <div className='font-medium'>
                    {format(createdAt, 'dd/MM/yyyy', { locale: vi })}
                    <span className='text-muted-foreground ml-2'>{format(createdAt, 'HH:mm', { locale: vi })}</span>
                  </div>
                </div>
                <div>
                  <div className='text-sm text-muted-foreground'>Cập nhật lần cuối</div>
                  <div className='font-medium'>
                    {format(updatedAt, 'dd/MM/yyyy', { locale: vi })}
                    <span className='text-muted-foreground ml-2'>{format(updatedAt, 'HH:mm', { locale: vi })}</span>
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
