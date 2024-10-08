'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Artplayer from 'artplayer'
import { ChevronDown, ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { useGetCourseQuery } from '@/queries/useCourse'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import LearnSidebar from '@/app/(learn)/learn/[id]/components/sidebar'
import Image from 'next/image'
import icons from '@/assets/icons'
import Link from 'next/link'
import configRoute from '@/config/route'

export default function CoursePage() {
  const { id } = useParams()
  const search = useSearchParams()
  const rId = search.get('rId')
  const router = useRouter()
  const { data, isLoading } = useGetCourseQuery({ id: id as string })
  const courseData = data?.payload.data

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)

  const resource =
    courseData?.lessons.flatMap((lesson) => lesson.courseResources).find((resource) => resource.id === rId) ??
    courseData?.lessons.flatMap((lesson) => lesson.courseResources)[0]

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    if (playerRef.current && (resource?.type === 'VIDEO' || resource?.type === 'BOTH') && resource?.videoUrl) {
      const art = new Artplayer({
        container: playerRef.current,
        url: resource?.videoUrl,
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
  }, [resource?.type, resource?.videoUrl])

  const navigateResource = useCallback(
    (direction: 'prev' | 'next') => {
      const resources = courseData?.lessons.flatMap((lesson) => lesson.courseResources) || []
      const currentIndex = resources.findIndex((r) => r.id === rId)
      const nextIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1

      if (resources[nextIndex]) {
        router.push(`/learn/${id}?rId=${resources[nextIndex].id}`)
      }
    },
    [courseData?.lessons, id, rId, router]
  )

  if (isLoading) return <div className='flex items-center justify-center h-screen'>Loading...</div>

  const totalResources = courseData?.lessons.reduce((sum, lesson) => sum + lesson.courseResources.length, 0) || 0
  const completedResources: string[] = [] // You'll need to implement this based on your data structure
  const progress = (completedResources.length / totalResources) * 100

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

          <h1 className='text-xl font-medium truncate'>{courseData?.title}</h1>
        </div>
        <div className='flex items-center space-x-2 md:space-x-4'>
          <div className='text-sm hidden md:block'>
            Tiến trình: {completedResources.length}/{totalResources}
          </div>
          <Progress value={progress} className='w-[60px] md:w-[100px]' />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => {
              navigateResource('prev')
            }}
            disabled={!rId}
          >
            <ArrowLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => {
              navigateResource('next')
            }}
            disabled={!rId}
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
          <ScrollArea className='h-[calc(100vh-4rem)] bg-gray-200'>
            {(resource?.type === 'VIDEO' || resource?.type === 'BOTH') && (
              <div className='aspect-video relative z-0 max-w-4xl mx-auto'>
                <div ref={playerRef} className='w-full h-full'></div>
              </div>
            )}

            <div className='p-6 max-w-4xl mx-auto bg-white'>
              <h2 className='text-2xl font-medium'>{resource?.title}</h2>
              <p className='text-gray-500'>{resource?.description}</p>

              {(resource?.type === 'DOCUMENT' || resource?.type === 'BOTH') && (
                <div className='mt-4'>{resource?.content}</div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Sidebar */}
        {courseData && <LearnSidebar courseData={courseData} sidebarOpen={sidebarOpen} />}
      </div>
    </div>
  )
}
