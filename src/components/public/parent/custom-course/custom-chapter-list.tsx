/* eslint-disable no-unused-vars */
'use client'

import { Button } from '@/components/ui/button'
import { Trash2, BookOpen, Clock } from 'lucide-react'
import { CoursesResType } from '@/schemaValidations/course.schema'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

// Use the same Chapter type as the parent component
type Chapter = CoursesResType['data'][0]['chapters'][0]

type CustomChapterListProps = {
  chapters: Chapter[]
  onChange: (chapters: Chapter[]) => void
}

export function CustomChapterList({ chapters, onChange }: CustomChapterListProps) {
  // Handle chapter removal
  const handleRemoveChapter = (chapterId: string) => {
    const updatedChapters = chapters.filter((chapter) => chapter.id !== chapterId)
    onChange(updatedChapters)
  }

  return (
    <div className='space-y-3'>
      {chapters.map((chapter, index) => (
        <Card key={chapter.id} className='overflow-hidden'>
          <CardContent className='p-0'>
            <div className='flex items-center p-3 bg-muted/20'>
              <div className='flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 text-primary mr-3'>
                <span className='text-sm font-medium'>{index + 1}</span>
              </div>
              <h3 className='font-medium flex-1 truncate'>{chapter.title}</h3>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => handleRemoveChapter(chapter.id)}
                className='h-8 w-8 text-muted-foreground hover:text-destructive ml-2'
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </div>

            <Separator />

            <div className='p-3 grid gap-3 sm:grid-cols-2'>
              <div className='flex items-center text-muted-foreground'>
                <BookOpen className='h-4 w-4 mr-2' />
                <span className='text-sm'>{chapter.lessons?.length || 0} bài học</span>
              </div>

              {chapter.description && (
                <div className='sm:col-span-2 text-sm text-muted-foreground line-clamp-1'>{chapter.description}</div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {chapters.length === 0 && (
        <div className='text-center py-8 border-2 border-dashed rounded-lg'>
          <BookOpen className='mx-auto h-10 w-10 text-muted-foreground/60' />
          <p className='mt-2 text-muted-foreground'>Chưa có chương nào được thêm vào</p>
        </div>
      )}
    </div>
  )
}
