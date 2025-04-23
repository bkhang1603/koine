'use client'

import { use } from 'react'
import { useGetLessonQuery, useGetCourseQuery } from '@/queries/useCourse'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, FileText, Video } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRef, useEffect } from 'react'
import Artplayer from 'artplayer'

// Skeleton component for lesson detail
const LessonDetailSkeleton = () => {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-6'>
        <Skeleton className='h-8 w-48 mb-6' />

        <Card className='mb-8'>
          <CardHeader>
            <Skeleton className='h-7 w-48' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-16 w-full mb-6' />
            <Skeleton className='h-8 w-36 mb-6' />
            <Skeleton className='h-80 w-full' />
          </CardContent>
        </Card>
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
          <FileText className='w-3 h-3 mr-1' />
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

export default function LessonDetailPage(props: {
  params: Promise<{ id: string; chapterId: string; lessonId: string }>
}) {
  const params = use(props.params)
  const playerRef = useRef<HTMLDivElement>(null)

  // Fetch lesson data using useGetLessonQuery
  const { data: lessonData, isLoading: isLoadingLesson } = useGetLessonQuery({ id: params.lessonId, enabled: true })

  // Fetch course data for breadcrumb and context
  const { data: courseData, isLoading: isLoadingCourse } = useGetCourseQuery({ id: params.id })

  // Handle lesson deletion

  useEffect(() => {
    if (
      playerRef.current &&
      (lessonData?.payload?.data?.type === 'VIDEO' || lessonData?.payload?.data?.type === 'BOTH') &&
      lessonData?.payload?.data?.videoUrl
    ) {
      const art = new Artplayer({
        container: playerRef.current,
        url: lessonData.payload.data.videoUrl,
        volume: 0.5,
        autoplay: false,
        pip: true,
        autoSize: true,
        autoMini: true,
        screenshot: true,
        setting: true,
        loop: true,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        fullscreen: true,
        fullscreenWeb: true,
        subtitleOffset: true,
        miniProgressBar: true,
        mutex: true,
        backdrop: true,
        playsInline: true,
        autoPlayback: true,
        airplay: true
      })

      return () => {
        if (art && art.destroy) {
          art.destroy(false)
        }
      }
    }
  }, [lessonData])

  // Show skeleton while loading
  if (isLoadingLesson || isLoadingCourse) return <LessonDetailSkeleton />

  const lesson = lessonData?.payload?.data
  const course = courseData?.payload?.data

  // If no lesson found or no course found
  if (!lesson || !course) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <FileText className='w-16 h-16 text-muted-foreground mb-4' />
        <h2 className='text-2xl font-bold mb-2'>Không tìm thấy bài học</h2>
        <p className='text-muted-foreground mb-6'>Bài học này không tồn tại hoặc đã bị xóa</p>
        <Link href={`/manager/course/${params.id}/chapter/${params.chapterId}`}>
          <Button>Quay lại chương học</Button>
        </Link>
      </div>
    )
  }

  const chapter = course.chapters.find((ch) => ch.id === params.chapterId)

  if (!chapter) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <FileText className='w-16 h-16 text-muted-foreground mb-4' />
        <h2 className='text-2xl font-bold mb-2'>Không tìm thấy chương học</h2>
        <p className='text-muted-foreground mb-6'>Chương học của bài học này không tồn tại hoặc đã bị xóa</p>
        <Link href={`/manager/course/${params.id}`}>
          <Button>Quay lại khóa học</Button>
        </Link>
      </div>
    )
  }

  // Verify lesson belongs to chapter
  const lessonBelongsToChapter = chapter.lessons.some((l) => l.id === params.lessonId)

  if (!lessonBelongsToChapter) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <FileText className='w-16 h-16 text-muted-foreground mb-4' />
        <h2 className='text-2xl font-bold mb-2'>Bài học không thuộc chương này</h2>
        <p className='text-muted-foreground mb-6'>Bài học này không thuộc chương học đã chọn</p>
        <Link href={`/manager/course/${params.id}/chapter/${params.chapterId}`}>
          <Button>Quay lại chương học</Button>
        </Link>
      </div>
    )
  }

  // Prepare breadcrumb data
  const breadcrumbItems = [
    {
      title: 'Khóa học',
      href: '/manager/course'
    },
    {
      title: course.title,
      href: `/manager/course/${params.id}`
    },
    {
      title: chapter.title,
      href: `/manager/course/${params.id}/chapter/${chapter.id}`
    },
    {
      title: lesson.title
    }
  ]

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-6'>
        {/* Breadcrumb */}
        <div className='mb-6'>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Main Content Card */}
        <Card className='mb-8 overflow-hidden'>
          {/* Header with title and lesson info */}
          <CardHeader className='border-b pb-4'>
            <div className='flex flex-col space-y-4'>
              {/* Title and badges */}
              <div className='flex flex-wrap items-center gap-3'>
                <h1 className='text-3xl font-bold'>{lesson.title}</h1>
                <LessonTypeDisplay type={lesson.type} />
              </div>

              {/* Metadata */}
              <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                <div className='flex items-center'>
                  <Clock className='w-4 h-4 mr-1' />
                  <span>{(lesson as any).durationDisplay || `${lesson.durations}s`}</span>
                </div>
                <div className='flex items-center'>
                  <FileText className='w-4 h-4 mr-1' />
                  <span>
                    Bài{' '}
                    {chapter?.lessons.findIndex((l) => l.id === params.lessonId) !== -1
                      ? chapter?.lessons.findIndex((l) => l.id === params.lessonId) + 1
                      : '?'}
                    /{chapter?.lessons.length || '?'}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Content section */}
          <CardContent className='p-6'>
            {/* Description */}
            <p className='text-lg mb-8'>{lesson.description}</p>

            {/* Lesson Content Based on Type */}
            <div className='mt-8'>
              {(lesson.type === 'VIDEO' || lesson.type === 'BOTH') && (
                <div className='mb-8'>
                  <CardTitle className='mb-4 flex items-center'>
                    <Video className='w-5 h-5 mr-2' />
                    Nội dung Video
                  </CardTitle>
                  <div className='bg-muted/30 rounded-lg p-4'>
                    <div ref={playerRef} className='w-full aspect-video' />
                  </div>
                </div>
              )}

              {(lesson.type === 'DOCUMENT' || lesson.type === 'BOTH') && (
                <div className='mb-8'>
                  <CardTitle className='mb-4 flex items-center'>
                    <FileText className='w-5 h-5 mr-2' />
                    Nội dung Bài đọc
                  </CardTitle>
                  {lesson.content ? (
                    <div className='prose prose-lg max-w-none' dangerouslySetInnerHTML={{ __html: lesson.content }} />
                  ) : (
                    <div className='p-8 text-center border rounded-lg'>
                      <FileText className='w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20' />
                      <p className='font-medium'>Chưa có nội dung</p>
                      <p className='text-sm text-muted-foreground mt-1'>Nội dung bài học chưa được thêm vào</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
