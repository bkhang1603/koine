'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  PlayCircle,
  FileText,
  BarChart3,
  Timer,
  Calendar as CalendarIcon,
  CheckCheck,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CoursesDetailSkeleton } from '@/components/public/parent/setting/child-account/detail/course/course-detail-skeleton'
import { cn } from '@/lib/utils'
import { useGetCourseDetailForChild } from '@/queries/useAccount'

// Tạo component trang chi tiết khóa học
export default function ChildCourseDetailPage(props: { params: Promise<{ childId: string; courseId: string }> }) {
  const params = use(props.params)
  const childId = params.childId as string
  const courseId = params.courseId as string

  const { data, isLoading } = useGetCourseDetailForChild({ courseId, childId })
  const courseData = data?.payload.data || null

  const [activeChapter, setActiveChapter] = useState<string | null>(null)

  // Format thời gian
  const formatDate = (dateString: string) => {
    try {
      const date = dateString.includes(' ') ? new Date(dateString.replace(' ', 'T')) : new Date(dateString)
      return format(date, 'dd/MM/yyyy', { locale: vi })
    } catch (e) {
      return dateString
    }
  }

  // Lấy màu sắc cho trạng thái chương
  const getChapterStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'INPROGRESS':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Lấy tên hiển thị cho trạng thái chương
  const getChapterStatusLabel = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'Hoàn thành'
      case 'INPROGRESS':
        return 'Đang học'
      default:
        return 'Chưa học'
    }
  }

  if (isLoading) {
    return <CoursesDetailSkeleton />
  }

  if (!courseData) {
    return (
      <div className='max-w-6xl mx-auto py-8'>
        <div className='flex justify-center'>
          <Card className='p-8 max-w-md text-center'>
            <AlertCircle className='mx-auto h-12 w-12 text-red-500 mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Không tìm thấy thông tin khóa học</h3>
            <p className='text-gray-500 mb-6'>Khóa học không tồn tại hoặc bạn không có quyền truy cập.</p>
            <Button asChild>
              <Link href={`/setting/child-account/${childId}`}>Quay lại</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  // Tính toán số liệu thống kê
  const stats = {
    completedLessons: courseData.totalLessonFinished || 0,
    totalLessons: courseData.totalLesson || 0,
    completionPercentage: courseData.courseCompletionRate || 0,
    inProgressLessons: Math.min(
      5, // Giả sử tối đa 5 bài đang học
      courseData.chapters.flatMap((c: any) => c.lessons).filter((l: any) => l.lessonStatus === 'INPROGRESS').length
    ),
    completedChapters: courseData.chapters.filter((c: any) => c.chapterStatus === 'COMPLETED').length,
    totalChapters: courseData.chapters.length
  }

  return (
    <div className='max-w-6xl mx-auto py-6 space-y-6'>
      {/* Header với breadcrumb và toolbar */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2'>
        <div className='flex items-center gap-2 text-sm'>
          <Link href='/setting/child-account' className='text-muted-foreground hover:text-foreground'>
            Tài khoản con
          </Link>
          <ChevronRight className='h-4 w-4 text-muted-foreground' />
          <Link href={`/setting/child-account/${childId}`} className='text-muted-foreground hover:text-foreground'>
            Chi tiết
          </Link>
          <ChevronRight className='h-4 w-4 text-muted-foreground' />
          <span className='font-medium truncate max-w-[150px] sm:max-w-xs'>{courseData.courseTitle}</span>
        </div>
      </div>

      {/* Banner khóa học */}
      <div className='relative w-full h-48 md:h-64 lg:h-80 overflow-hidden rounded-lg mb-6'>
        <Image
          src={courseData.courseImageUrl || '/placeholder-course.jpg'}
          alt={courseData.courseTitle}
          fill
          className='object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10'></div>

        <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
          <h1 className='text-2xl md:text-3xl font-bold mb-2'>{courseData.courseTitle}</h1>
          <div className='flex flex-wrap items-center gap-3'>
            <Badge className='bg-primary/20 text-white border-0 gap-1 px-2 py-1'>
              <BookOpen className='h-3.5 w-3.5' />
              <span>{courseData.totalLesson} bài học</span>
            </Badge>

            <Badge className='bg-primary/20 text-white border-0 gap-1 px-2 py-1'>
              <Clock className='h-3.5 w-3.5' />
              <span>{courseData.totalLearningTime}</span>
            </Badge>

            <Badge className='bg-primary/20 text-white border-0 gap-1 px-2 py-1'>
              <CalendarIcon className='h-3.5 w-3.5' />
              <span>Ghi danh: {formatDate(courseData.enrollmentDate)}</span>
            </Badge>
          </div>
        </div>
      </div>

      <div className='space-y-6'>
        {/* Thẻ tiến độ */}
        <Card className='shadow-sm border'>
          <CardHeader className='pb-0'>
            <CardTitle className='text-xl'>Tiến độ học tập</CardTitle>
            <CardDescription>Theo dõi quá trình học tập của bé</CardDescription>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='space-y-6'>
              {/* Progress Bar */}
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Hoàn thành khóa học</span>
                  <span className='font-medium'>{stats.completionPercentage}%</span>
                </div>
                <Progress value={stats.completionPercentage} className='h-2.5' />
              </div>

              {/* Stats Cards */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <Card className='bg-blue-50 border-blue-100'>
                  <CardContent className='p-4 flex gap-3 items-center'>
                    <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0'>
                      <BookOpen className='h-5 w-5 text-blue-600' />
                    </div>
                    <div>
                      <p className='text-xs text-blue-700'>Bài học đã học</p>
                      <p className='text-lg font-semibold text-blue-800'>
                        {stats.completedLessons}/{stats.totalLessons}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className='bg-green-50 border-green-100'>
                  <CardContent className='p-4 flex gap-3 items-center'>
                    <div className='h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0'>
                      <CheckCheck className='h-5 w-5 text-green-600' />
                    </div>
                    <div>
                      <p className='text-xs text-green-700'>Chương đã hoàn thành</p>
                      <p className='text-lg font-semibold text-green-800'>
                        {stats.completedChapters}/{stats.totalChapters}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className='bg-amber-50 border-amber-100'>
                  <CardContent className='p-4 flex gap-3 items-center'>
                    <div className='h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0'>
                      <Timer className='h-5 w-5 text-amber-600' />
                    </div>
                    <div>
                      <p className='text-xs text-amber-700'>Tổng thời gian học</p>
                      <p className='text-lg font-semibold text-amber-800'>{courseData.totalLearningTime || '0h 0m'}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className='bg-purple-50 border-purple-100'>
                  <CardContent className='p-4 flex gap-3 items-center'>
                    <div className='h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0'>
                      <Activity className='h-5 w-5 text-purple-600' />
                    </div>
                    <div>
                      <p className='text-xs text-purple-700'>Trạng thái</p>
                      <p className='text-lg font-semibold text-purple-800'>
                        {stats.completionPercentage === 100 ? 'Hoàn thành' : 'Đang học'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nội dung khóa học */}
        <Card className='shadow-sm border'>
          <CardHeader>
            <CardTitle className='text-xl'>Nội dung khóa học</CardTitle>
            <CardDescription>Tất cả chương và bài học trong khóa học này</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion
              type='single'
              collapsible
              className='space-y-2'
              value={activeChapter || ''}
              onValueChange={setActiveChapter}
            >
              {courseData.chapters.map((chapter: any) => (
                <AccordionItem
                  key={chapter.chapterId}
                  value={chapter.chapterId}
                  className='border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white'
                >
                  <AccordionTrigger className='px-6 py-4 hover:bg-gray-50/80 [&[data-state=open]]:bg-gray-50/80 hover:no-underline'>
                    <div className='flex items-start text-left'>
                      <div className='mr-3 mt-0.5 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                        <span className='text-sm font-medium text-primary'>{chapter.chapterSequence}</span>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-3'>
                          <h3 className='font-medium truncate'>{chapter.chapterTitle}</h3>
                          <Badge
                            variant='outline'
                            className={cn('px-2 py-0.5', getChapterStatusColor(chapter.chapterStatus))}
                          >
                            {getChapterStatusLabel(chapter.chapterStatus)}
                          </Badge>
                        </div>
                        <div className='flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500'>
                          <span className='flex items-center gap-1'>
                            <BookOpen className='h-3.5 w-3.5' />
                            {chapter.lessons.length} bài học
                          </span>
                          <span className='flex items-center gap-1'>
                            <Clock className='h-3.5 w-3.5' />
                            {chapter.totalDuration || '0h 0m'}
                          </span>
                          <span className='flex items-center gap-1'>
                            <BarChart3 className='h-3.5 w-3.5' />
                            {chapter.chapterCompletionRate}% hoàn thành
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className='border-t border-gray-100'>
                    <div className='bg-gray-50/70 px-6 py-3 text-sm text-gray-700'>{chapter.chapterDescription}</div>

                    <div className='divide-y border-t border-gray-100'>
                      {chapter.lessons.map((lesson: any) => (
                        <div key={lesson.lessonId} className='px-6 py-4 hover:bg-gray-50/60 transition-colors'>
                          <div className='flex items-center gap-4'>
                            <div className='flex-shrink-0'>
                              {lesson.lessonStatus === 'COMPLETED' ? (
                                <div className='h-7 w-7 rounded-full bg-green-100 flex items-center justify-center'>
                                  <CheckCircle2 className='h-4 w-4 text-green-600' />
                                </div>
                              ) : lesson.lessonStatus === 'INPROGRESS' ? (
                                <div className='h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center'>
                                  <PlayCircle className='h-4 w-4 text-blue-600' />
                                </div>
                              ) : (
                                <div className='h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center'>
                                  {lesson.lessonType === 'VIDEO' ? (
                                    <PlayCircle className='h-4 w-4 text-gray-500' />
                                  ) : (
                                    <FileText className='h-4 w-4 text-gray-500' />
                                  )}
                                </div>
                              )}
                            </div>

                            <div className='flex-1 min-w-0'>
                              <div className='flex items-center'>
                                <span className='text-sm font-medium text-gray-400 mr-2'>{lesson.lessonSequence}.</span>
                                <h4 className='text-sm font-medium text-gray-800'>{lesson.lessonTitle}</h4>
                              </div>
                              <div className='flex items-center mt-1 text-xs text-gray-500'>
                                <span className='flex items-center gap-1'>
                                  <Clock className='h-3 w-3' />
                                  {lesson.lessonDurationDisplay}
                                </span>
                                {lesson.lessonType && (
                                  <>
                                    <span className='mx-2'>•</span>
                                    <span>{lesson.lessonType === 'VIDEO' ? 'Video' : 'Tài liệu'}</span>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className='flex-shrink-0'>
                              {lesson.lessonStatus === 'COMPLETED' ? (
                                <Badge
                                  variant='outline'
                                  className='bg-green-50 text-green-700 border-green-200 whitespace-nowrap'
                                >
                                  Hoàn thành
                                </Badge>
                              ) : lesson.lessonStatus === 'INPROGRESS' ? (
                                <Badge
                                  variant='outline'
                                  className='bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap'
                                >
                                  Đang học
                                </Badge>
                              ) : (
                                <Badge
                                  variant='outline'
                                  className='bg-gray-50 text-gray-700 border-gray-200 whitespace-nowrap'
                                >
                                  Chưa học
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
