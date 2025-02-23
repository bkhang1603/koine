'use client'

import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import Artplayer from 'artplayer'
import { ChevronDown, ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import LearnSidebar from '@/app/(learn)/learn/[id]/components/sidebar'
import Image from 'next/image'
import icons from '@/assets/icons'
import Link from 'next/link'
import configRoute from '@/config/route'
import { useGetCourseProgressQuery, useGetLessonQuery, useUpdateCourseProgressMutation } from '@/queries/useCourse'
import { handleErrorApi } from '@/lib/utils'
import { UserCourseProgressResType } from '@/schemaValidations/course.schema'

type Lesson = UserCourseProgressResType['data']['chapters'][0]['lessons'][0]

export default function CoursePage() {
  const { id } = useParams()
  const search = useSearchParams()
  const router = useRouter()

  const { data: courseProgress } = useGetCourseProgressQuery({ id: id as string })
  const courseProgressData = useMemo(() => courseProgress?.payload?.data?.chapters ?? [], [courseProgress])
  const progress = courseProgress?.payload.data.courseCompletionPercentage
  const totalLesson = courseProgress?.payload.data.totalLessonsInCourse
  const totalCompletedLesson = courseProgress?.payload.data.totalCompletedLessonsInCourse

  const rId = search.get('rId') ?? courseProgressData[0]?.lessons[0]?.id

  const { data: lesson } = useGetLessonQuery({ id: rId, enabled: !!rId })
  const lessonData = lesson?.payload.data

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)

  const updateCourseProgressMutation = useUpdateCourseProgressMutation()

  const handleUpdate = useCallback(
    async ({ lessonId, status }: { lessonId: string; status: Lesson['status'] }) => {
      try {
        if (status === 'NOTYET') {
          await updateCourseProgressMutation.mutateAsync(lessonId)
        }
      } catch (error) {
        handleErrorApi({ error })
      }
    },
    [updateCourseProgressMutation]
  )

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    if (playerRef.current && (lessonData?.type === 'VIDEO' || lessonData?.type === 'BOTH') && lessonData?.videoUrl) {
      const art = new Artplayer({
        container: playerRef.current,
        url: lessonData?.videoUrl,
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
  }, [lessonData?.type, lessonData?.videoUrl])

  const navigateLesson = useCallback(
    (direction: 'prev' | 'next') => {
      const currentLessonIndex = courseProgressData
        .flatMap((chapter) => chapter.lessons)
        .findIndex((lesson) => lesson.id === rId)

      const nextLessonIndex = direction === 'next' ? currentLessonIndex + 1 : currentLessonIndex - 1
      const nextLessonId = courseProgressData.flatMap((chapter) => chapter.lessons)[nextLessonIndex]?.id

      if (nextLessonId) {
        router.replace(`?rId=${nextLessonId}`)
      }
    },
    [courseProgressData, rId, router]
  )

  return (
    <div className='flex flex-col h-screen bg-background'>
      {/* Header */}
      <header className='h-16 border-b flex items-center justify-between px-4'>
        <div className='flex items-center gap-2'>
          <Button size={'icon'} variant={'ghost'} onClick={() => router.push(configRoute.home)}>
            <ChevronLeft className='h-5 w-5' />
          </Button>

          <Link href={configRoute.home}>
            <Image src={icons.logo} alt='Koine logo' width={80} height={80} />
          </Link>

          <h1 className='text-xl font-medium truncate'>{lessonData?.title}</h1>
        </div>
        <div className='flex items-center space-x-2 md:space-x-4'>
          <div className='text-sm hidden md:block'>
            Tiến trình: {totalCompletedLesson}/{totalLesson}
          </div>
          <Progress value={progress} className='w-[60px] md:w-[100px]' />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => {
              navigateLesson('prev')
            }}
            disabled={
              courseProgressData.flatMap((chapter) => chapter.lessons).findIndex((lesson) => lesson.id === rId) === 0
            }
          >
            <ArrowLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => {
              navigateLesson('next')
            }}
            disabled={
              lessonData?.status === 'NOTYET' ||
              courseProgressData.flatMap((chapter) => chapter.lessons).findIndex((lesson) => lesson.id === rId) ===
                courseProgressData.flatMap((chapter) => chapter.lessons).length - 1
            }
          >
            <ArrowRight className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' onClick={toggleSidebar} className='md:hidden' aria-label='Toggle sidebar'>
            <ChevronDown className='h-4 w-4' />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Content area */}
        <div className='flex-1 overflow-hidden'>
          <ScrollArea className='h-[calc(100vh-4rem)] bg-gray-100'>
            <div className='max-w-4xl mx-auto bg-white min-h-[calc(100vh-4rem)] flex justify-between items-end flex-col'>
              <div className='w-full'>
                {(lessonData?.type === 'VIDEO' || lessonData?.type === 'BOTH') && (
                  <div className='aspect-video relative z-0'>
                    <div ref={playerRef} className='w-full h-full'></div>
                  </div>
                )}
                <div className='p-6'>
                  <h2 className='text-2xl font-medium'>{lessonData?.title}</h2>
                  <p className='text-gray-500'>{lessonData?.description}</p>

                  {(lessonData?.type === 'DOCUMENT' || lessonData?.type === 'BOTH') && (
                    <div className='mt-4'>{lessonData?.content}</div>
                  )}
                </div>
              </div>

              {lessonData && (
                <div className='flex items-center justify-between p-6 w-full'>
                  <Button
                    variant='default'
                    onClick={() => navigateLesson('prev')}
                    disabled={
                      courseProgressData
                        .flatMap((chapter) => chapter.lessons)
                        .findIndex((lesson) => lesson.id === rId) === 0
                    }
                  >
                    Quay lại
                  </Button>

                  <Button
                    variant='default'
                    onClick={() => handleUpdate({ lessonId: lessonData?.id, status: lessonData?.status })}
                    disabled={lessonData?.status === 'YET'}
                  >
                    Hoàn thành bài học
                  </Button>

                  <Button
                    variant='default'
                    onClick={() => navigateLesson('next')}
                    disabled={
                      lessonData?.status === 'NOTYET' ||
                      courseProgressData
                        .flatMap((chapter) => chapter.lessons)
                        .findIndex((lesson) => lesson.id === rId) ===
                        courseProgressData.flatMap((chapter) => chapter.lessons).length - 1
                    }
                  >
                    Tiếp theo
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Sidebar */}
        {courseProgressData.length !== 0 && (
          <LearnSidebar courseProgressData={courseProgressData} sidebarOpen={sidebarOpen} />
        )}
      </div>
    </div>
  )
}
