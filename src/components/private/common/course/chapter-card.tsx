'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, FileText, LayoutList, BookOpen } from 'lucide-react'

interface ChapterCardProps {
  chapter: {
    id: string
    title: string
    description: string
    durations: number
    sequence: number
    lessons?: any[]
  }
  lessonCountText?: string
  durationUnit?: string
}

export function ChapterCard({ chapter, lessonCountText = 'bài học', durationUnit = 'phút' }: ChapterCardProps) {
  return (
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
              <p className='font-medium'>
                {chapter.durations} {durationUnit}
              </p>
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
              <p className='font-medium'>
                {chapter.lessons?.length || 0} {lessonCountText}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
