/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { X, ArrowLeft, Check } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Course } from './chapter-picker-types'

interface ChapterViewProps {
  activeCourse: Course
  selectedChapterIds: Set<string>
  onBackClick: () => void
  onToggleChapter: (chapterId: string) => void
  onSelectAll: (courseId: string, isSelected: boolean) => void
  isCourseFullySelected: (courseId: string) => boolean
}

export const ChapterView = ({
  activeCourse,
  selectedChapterIds,
  onBackClick,
  onToggleChapter,
  onSelectAll,
  isCourseFullySelected
}: ChapterViewProps) => (
  <div className='h-full flex flex-col'>
    <div className='px-8 py-4 border-b bg-muted/5 shrink-0'>
      <div className='flex items-center'>
        <Button variant='ghost' size='sm' className='mr-3 h-8 w-8 p-0' onClick={onBackClick}>
          <ArrowLeft className='h-4 w-4' />
        </Button>

        <div className='flex items-center'>
          <div className='w-10 h-10 relative rounded-md overflow-hidden mr-3 flex-shrink-0'>
            <Image
              src={activeCourse.imageUrl || 'https://placehold.co/600x400/jpeg'}
              alt={activeCourse.title}
              fill
              className='object-cover'
            />
          </div>
          <h3 className='font-medium text-lg'>{activeCourse.title}</h3>
        </div>

        <div className='ml-auto'>
          <Button
            variant='outline'
            size='sm'
            className='h-8'
            onClick={() => onSelectAll(activeCourse.id, !isCourseFullySelected(activeCourse.id))}
          >
            {isCourseFullySelected(activeCourse.id) ? (
              <>
                <X className='h-3.5 w-3.5 mr-1.5' />
                Bỏ chọn tất cả
              </>
            ) : (
              <>
                <Check className='h-3.5 w-3.5 mr-1.5' />
                Chọn tất cả
              </>
            )}
          </Button>
        </div>
      </div>
    </div>

    <div className='flex-1 overflow-auto px-8 py-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {activeCourse.chapters?.map((chapter, index) => (
          <Card
            key={chapter.id}
            className={cn(
              'border overflow-hidden transition-colors',
              selectedChapterIds.has(chapter.id) ? 'bg-primary/5 border-primary/30' : 'hover:border-muted-foreground/30'
            )}
          >
            <CardContent className='p-0'>
              <div className='p-4 border-b bg-muted/10 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0'>
                    <span className='text-sm font-medium'>{index + 1}</span>
                  </div>
                  <h4 className='font-medium'>{chapter.title || `Chương ${index + 1}`}</h4>
                </div>

                <Checkbox
                  checked={selectedChapterIds.has(chapter.id)}
                  onCheckedChange={() => onToggleChapter(chapter.id)}
                />
              </div>

              <div className='p-4'>
                <div className='flex items-center gap-4 mb-3'>
                  <Badge variant='outline' className='text-xs'>
                    {chapter.lessons?.length || 0} bài học
                  </Badge>

                  <Badge variant='outline' className='text-xs'>
                    {chapter.durationsDisplay || '0 phút'}
                  </Badge>
                </div>

                {chapter.description && (
                  <p className='text-sm text-muted-foreground line-clamp-2'>{chapter.description}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
)
