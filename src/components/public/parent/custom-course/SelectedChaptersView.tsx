/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Check, X, BookOpen, Layers } from 'lucide-react'
import { Chapter, Course } from './chapter-picker-types'

interface SelectedChaptersViewProps {
  selectedChapters: { courseId: string; chapter: Chapter }[]
  courses: Course[]
  onClearAll: () => void
  onToggleChapter: (chapterId: string) => void
  onChangeTab: () => void
}

export const SelectedChaptersView = ({
  selectedChapters,
  courses,
  onClearAll,
  onToggleChapter,
  onChangeTab
}: SelectedChaptersViewProps) => (
  <ScrollArea className='h-full p-8'>
    {selectedChapters.length === 0 ? (
      <div className='flex items-center justify-center h-full'>
        <div className='text-center max-w-md'>
          <div className='w-16 h-16 bg-muted/40 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Layers className='h-7 w-7 text-muted-foreground' />
          </div>
          <h3 className='text-lg font-medium'>Chưa có chương nào được chọn</h3>
          <p className='text-muted-foreground mt-2'>
            Chuyển sang tab &quot;Duyệt nội dung&quot; để chọn các chương cho khóa học của bạn
          </p>
          <Button variant='outline' className='mt-4' onClick={onChangeTab}>
            <BookOpen className='h-4 w-4 mr-2' />
            Duyệt nội dung
          </Button>
        </div>
      </div>
    ) : (
      <div>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg font-medium'>Chương đã chọn ({selectedChapters.length})</h2>
          <Button variant='outline' size='sm' onClick={onClearAll}>
            <X className='h-4 w-4 mr-2' />
            Bỏ chọn tất cả
          </Button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {selectedChapters.map(({ chapter, courseId }) => {
            const course = courses.find((c) => c.id === courseId)

            return (
              <Card key={chapter.id} className='overflow-hidden border-primary/20 bg-primary/5'>
                <CardContent className='p-0'>
                  <div className='p-4 flex items-start gap-3'>
                    <div className='mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary flex-shrink-0'>
                      <Check className='h-3.5 w-3.5' />
                    </div>

                    <div className='flex-1 min-w-0'>
                      <h4 className='font-medium truncate'>{chapter.title}</h4>
                      <p className='text-xs text-muted-foreground mt-1'>
                        Từ khóa học: {course?.title || 'Không xác định'}
                      </p>

                      <div className='flex items-center gap-2 mt-2'>
                        <Badge variant='secondary' className='bg-primary/10 text-xs'>
                          {chapter.lessons?.length || 0} bài học
                        </Badge>

                        <Badge variant='secondary' className='bg-primary/10 text-xs'>
                          {chapter.durationsDisplay || '0 phút'}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0'
                      onClick={() => onToggleChapter(chapter.id)}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )}
  </ScrollArea>
)
