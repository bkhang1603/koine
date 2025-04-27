'use client'

import { use } from 'react'
import { useGetChaptersQuery, useGetCourseQuery, useGetChapterQuestionListQuery } from '@/queries/useCourse'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { FileText, Clock, BookOpen, LayoutList, Video, File, HelpCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { MoreOptions } from '@/components/private/common/more-options'

// Skeleton component for the chapter detail
const ChapterDetailSkeleton = () => {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-6'>
        <Skeleton className='h-8 w-48 mb-6' />

        <Skeleton className='h-[300px] w-full mb-8' />
        <Skeleton className='h-[400px] w-full' />
      </div>
    </div>
  )
}

// Function to render lesson type display badge
function LessonTypeDisplay({ type }: { type: string }) {
  const iconSize = 'w-3 h-3 mr-1'

  switch (type) {
    case 'VIDEO':
      return (
        <Badge variant='outline' className='border-blue-500/50 text-blue-500'>
          <Video className={iconSize} />
          Video
        </Badge>
      )
    case 'DOCUMENT':
      return (
        <Badge variant='outline' className='border-green-500/50 text-green-500'>
          <File className={iconSize} />
          Bài đọc
        </Badge>
      )
    case 'BOTH':
      return (
        <Badge variant='outline' className='border-purple-500/50 text-purple-500'>
          <Video className={iconSize} />
          Video & Bài đọc
        </Badge>
      )
    default:
      return (
        <Badge variant='outline' className='border-gray-500/50 text-gray-500'>
          <FileText className={iconSize} />
          Khác
        </Badge>
      )
  }
}

export default function ChapterDetailPage(props: { params: Promise<{ id: string; chapterId: string }> }) {
  const router = useRouter()
  const params = use(props.params)

  // Fetch chapter data using useGetChaptersQuery
  const { data: chaptersData, isLoading: isLoadingChapters } = useGetChaptersQuery({ id: params.id })

  // Fetch course data for breadcrumb and context
  const { data: courseData, isLoading: isLoadingCourse } = useGetCourseQuery({ id: params.id })

  // Fetch chapter questions data
  const { data: questionsData, isLoading: isLoadingQuestions } = useGetChapterQuestionListQuery({
    chapterId: params.chapterId,
    page_size: 99,
    page_index: 1
  })

  // Show skeleton while loading
  if (isLoadingChapters || isLoadingCourse || isLoadingQuestions) return <ChapterDetailSkeleton />

  // Find the specific chapter from the chapters data
  const chapter = chaptersData?.payload?.data?.find((ch) => ch.id === params.chapterId)
  const course = courseData?.payload?.data

  // If no chapter found or no course found
  if (!chapter || !course) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <FileText className='w-16 h-16 text-muted-foreground mb-4' />
        <h2 className='text-2xl font-bold mb-2'>Không tìm thấy chương học</h2>
        <p className='text-muted-foreground mb-6'>Chương học này không tồn tại hoặc đã bị xóa</p>
        <Link href={`/salesman/course/${params.id}`}>
          <Button>Quay lại khóa học</Button>
        </Link>
      </div>
    )
  }

  // Prepare breadcrumb data
  const breadcrumbItems = [
    {
      title: 'Khóa học',
      href: '/salesman/course'
    },
    {
      title: course.title,
      href: `/salesman/course/${params.id}`
    },
    {
      title: chapter.title
    }
  ]

  // Find chapter's lessons from the course data
  const chapterLessons = course.chapters.find((ch) => ch.id === params.chapterId)?.lessons || []

  // URL generators for lesson actions
  const getViewLessonUrl = (lessonId: string) =>
    `/salesman/course/${params.id}/chapter/${params.chapterId}/lesson/${lessonId}`

  // Default empty state for lessons
  const emptyLessonsState = (
    <div className='p-8 text-center'>
      <FileText className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
      <h3 className='text-lg font-medium mb-2'>Chưa có bài học nào</h3>
      <p className='text-muted-foreground mb-6'>Chương học này chưa có bài học nào</p>
    </div>
  )

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-6'>
        {/* Breadcrumb */}
        <div className='mb-6'>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Chapter Info Card (Previously ChapterCard component) */}
        <Card className='mb-8'>
          <CardHeader className='border-b'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <BookOpen className='w-5 h-5 text-primary' />
                <CardTitle>Thông tin chương học</CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className='pt-6'>
            <h2 className='text-2xl font-bold mb-4'>{chapter.title}</h2>

            <p className='text-muted-foreground mb-6'>{chapter.description}</p>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              <div className='flex items-center p-3 rounded-lg border bg-muted/30'>
                <Clock className='w-5 h-5 text-muted-foreground mr-3' />
                <div>
                  <p className='text-sm text-muted-foreground'>Thời lượng</p>
                  <p className='font-medium'>{chapter.durations} phút</p>
                </div>
              </div>

              <div className='flex items-center p-3 rounded-lg border bg-muted/30'>
                <LayoutList className='w-5 h-5 text-muted-foreground mr-3' />
                <div>
                  <p className='text-sm text-muted-foreground'>Số thứ tự</p>
                  <p className='font-medium'>{chapter.sequence}</p>
                </div>
              </div>

              <div className='flex items-center p-3 rounded-lg border bg-muted/30'>
                <FileText className='w-5 h-5 text-muted-foreground mr-3' />
                <div>
                  <p className='text-sm text-muted-foreground'>Bài học</p>
                  <p className='font-medium'>{chapterLessons.length || 0} bài học</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lessons List (Previously LessonsList component) */}
        <Card>
          <CardHeader className='border-b'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <FileText className='w-5 h-5 text-primary' />
                <CardTitle>Danh sách bài học</CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className='p-0'>
            {chapterLessons.length === 0
              ? emptyLessonsState
              : chapterLessons.map((lesson, index) => (
                  <div key={lesson.id} className='border-b last:border-0'>
                    <div className='p-4 md:p-6'>
                      <div className='flex items-center gap-4'>
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center font-medium shrink-0',
                            lesson.type === 'VIDEO' && 'bg-blue-500/10 text-blue-500',
                            lesson.type === 'DOCUMENT' && 'bg-green-500/10 text-green-500',
                            lesson.type === 'BOTH' && 'bg-purple-500/10 text-purple-500'
                          )}
                        >
                          {index + 1}
                        </div>

                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 flex-wrap'>
                            <h3 className='font-medium'>{lesson.title}</h3>
                            <LessonTypeDisplay type={lesson.type} />
                          </div>

                          <div className='flex items-center gap-4 mt-1 text-sm text-muted-foreground'>
                            <div className='flex items-center whitespace-nowrap'>
                              <Clock className='w-3.5 h-3.5 mr-1 shrink-0' />
                              <span>{lesson.durationsDisplay || `${lesson.durations}s`}</span>
                            </div>
                            <p className='line-clamp-1 overflow-hidden text-ellipsis'>{lesson.description}</p>
                          </div>
                        </div>

                        <MoreOptions
                          item={{
                            id: lesson.id,
                            title: lesson.title,
                            status: 'VISIBLE',
                            slug: ''
                          }}
                          itemType='lesson'
                          onView={() => router.push(getViewLessonUrl(lesson.id))}
                        />
                      </div>
                    </div>
                  </div>
                ))}
          </CardContent>
        </Card>

        {/* Chapter Questions */}
        <Card>
          <CardHeader className='border-b'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <HelpCircle className='w-5 h-5 text-primary' />
                <CardTitle>Câu hỏi</CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className='p-0'>
            {isLoadingQuestions ? (
              <div className='p-6'>
                <Skeleton className='h-12 w-full mb-4' />
                <Skeleton className='h-12 w-full mb-4' />
                <Skeleton className='h-12 w-full' />
              </div>
            ) : questionsData?.payload?.data?.length === 0 ? (
              <div className='p-8 text-center'>
                <HelpCircle className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>Chưa có câu hỏi nào</h3>
                <p className='text-muted-foreground mb-6'>Chương học này chưa có câu hỏi nào</p>
              </div>
            ) : (
              questionsData?.payload?.data?.map((question, index) => (
                <div key={question.id} className='border-b last:border-0'>
                  <div className='p-4 md:p-6'>
                    <div className='flex gap-4'>
                      <div className='w-10 h-10 rounded-lg flex items-center justify-center font-medium shrink-0 bg-amber-500/10 text-amber-500'>
                        {index + 1}
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-medium mb-2'>{question.content}</h3>
                        <div className='space-y-2'>
                          {question.questionOptions?.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border ${option.isCorrect ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                            >
                              <div className='flex items-start gap-2'>
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${option.isCorrect ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
                                >
                                  {String.fromCharCode(65 + optionIndex)}
                                </div>
                                <span>{option.optionData}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
