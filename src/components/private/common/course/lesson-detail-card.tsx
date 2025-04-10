'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, FileText, Video, ExternalLink, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LessonTypeDisplay } from './lesson-type-display'
import Link from 'next/link'
import { ReactNode } from 'react'

interface LessonDetailCardProps {
  lesson: {
    id: string
    title: string
    description: string
    type: string
    content: string | null
    videoUrl: string | null
    durations: number
    durationsDisplay?: string
  }
  lessonNumber?: number | string
  editUrl?: string
  previewUrl?: string
  renderExtraActions?: () => ReactNode
}

export function LessonDetailCard({
  lesson,
  lessonNumber,
  editUrl,
  previewUrl,
  renderExtraActions
}: LessonDetailCardProps) {
  return (
    <Card className='mb-8'>
      <CardHeader className='border-b'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <FileText className='w-5 h-5 text-primary' />
            <CardTitle>Thông tin bài học</CardTitle>
          </div>
          <div className='flex items-center gap-2'>
            {editUrl && (
              <Button variant='outline' size='sm' asChild>
                <Link href={editUrl}>Chỉnh sửa</Link>
              </Button>
            )}
            {previewUrl && (
              <Button size='sm' asChild>
                <a href={previewUrl} target='_blank' rel='noopener noreferrer'>
                  <ExternalLink className='w-4 h-4 mr-2' />
                  Xem trước
                </a>
              </Button>
            )}
            {renderExtraActions && renderExtraActions()}
          </div>
        </div>
      </CardHeader>

      <CardContent className='pt-6'>
        <div className='flex flex-wrap items-center gap-3 mb-4'>
          <h2 className='text-2xl font-bold'>{lesson.title}</h2>
          <LessonTypeDisplay type={lesson.type} />
        </div>

        <div className='flex items-center gap-4 mb-6 text-sm'>
          <div className='flex items-center'>
            <Clock className='w-4 h-4 mr-1 text-muted-foreground' />
            <span>{lesson.durationsDisplay || `${lesson.durations}s`}</span>
          </div>
          {lessonNumber && (
            <div className='flex items-center'>
              <FileText className='w-4 h-4 mr-1 text-muted-foreground' />
              <span>Bài {lessonNumber}</span>
            </div>
          )}
        </div>

        <p className='text-muted-foreground mb-6'>{lesson.description}</p>

        <Tabs defaultValue={lesson.type === 'DOCUMENT' ? 'content' : 'video'} className='mt-6'>
          <TabsList>
            {(lesson.type === 'VIDEO' || lesson.type === 'BOTH') && (
              <TabsTrigger value='video'>
                <Video className='w-4 h-4 mr-2' />
                Video
              </TabsTrigger>
            )}
            {(lesson.type === 'DOCUMENT' || lesson.type === 'BOTH') && (
              <TabsTrigger value='content'>
                <FileText className='w-4 h-4 mr-2' />
                Nội dung
              </TabsTrigger>
            )}
          </TabsList>

          {(lesson.type === 'VIDEO' || lesson.type === 'BOTH') && (
            <TabsContent value='video' className='pt-4'>
              {lesson.videoUrl ? (
                <div className='relative rounded-lg overflow-hidden aspect-video bg-black'>
                  <iframe
                    src={lesson.videoUrl}
                    className='absolute inset-0 w-full h-full'
                    allowFullScreen
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    title={lesson.title}
                  />
                </div>
              ) : (
                <div className='relative rounded-lg overflow-hidden aspect-video bg-muted flex items-center justify-center'>
                  <div className='text-center'>
                    <Play className='w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20' />
                    <p className='font-medium'>Chưa có video</p>
                    <p className='text-sm text-muted-foreground mt-1'>Video chưa được thêm vào bài học này</p>
                  </div>
                </div>
              )}
            </TabsContent>
          )}

          {(lesson.type === 'DOCUMENT' || lesson.type === 'BOTH') && (
            <TabsContent value='content' className='pt-4'>
              {lesson.content ? (
                <div
                  className='prose prose-sm sm:prose max-w-none'
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
              ) : (
                <div className='p-6 text-center border rounded-lg'>
                  <FileText className='w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20' />
                  <p className='font-medium'>Chưa có nội dung</p>
                  <p className='text-sm text-muted-foreground mt-1'>Nội dung bài học chưa được thêm vào</p>
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
