/* eslint-disable no-unused-vars */
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Plus, BookOpen, Clock } from 'lucide-react'
import { useState } from 'react'
import { mockCourses } from '@/app/(private)/salesman/_mock/data'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CoursesResType } from '@/schemaValidations/course.schema'

type Chapter = CoursesResType['data'][0]['chapters'][0]

interface ChapterPickerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (chapters: Chapter[]) => void
}

export function ChapterPickerDialog({ open, onOpenChange, onSelect }: ChapterPickerDialogProps) {
  const [search, setSearch] = useState('')
  const [selectedChapters, setSelectedChapters] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('all')

  const filteredCourses = mockCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.categories[0]?.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (chapterId: string) => {
    if (selectedChapters.includes(chapterId)) {
      setSelectedChapters(selectedChapters.filter((id) => id !== chapterId))
    } else {
      setSelectedChapters([...selectedChapters, chapterId])
    }
  }

  const handleAddSelected = () => {
    const selectedChapterDetails = selectedChapters
      .map((id) => {
        const [courseId, chapterNum] = id.split('-chapter-')
        const course = mockCourses.find((c) => c.id === courseId)
        const chapter = course?.chapters.find((ch) => ch.id === id)

        if (!chapter) return null

        return {
          id: chapter.id,
          title: chapter.title,
          description: chapter.description,
          durations: chapter.durations,
          durationsDisplay: chapter.durationsDisplay,
          sequence: chapter.sequence,
          lessons: chapter.lessons.map((lesson) => ({
            id: lesson.id,
            type: lesson.type,
            title: lesson.title,
            content: lesson.content,
            description: lesson.description,
            durations: lesson.durations,
            durationsDisplay: lesson.durationsDisplay,
            sequence: lesson.sequence,
            videoUrl: lesson.videoUrl
          }))
        }
      })
      .filter((chapter): chapter is Chapter => chapter !== null)

    onSelect(selectedChapterDetails)
    onOpenChange(false)
    setSelectedChapters([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-5xl max-h-[85vh] flex flex-col p-0 gap-0'>
        <DialogHeader className='p-6 pb-4'>
          <DialogTitle>Thêm chương từ khóa học có sẵn</DialogTitle>
        </DialogHeader>

        <div className='px-6 flex gap-4 items-center'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
            <Input
              placeholder='Tìm kiếm theo tên khóa học hoặc danh mục...'
              className='pl-9'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className='w-[200px]'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='all'>Tất cả</TabsTrigger>
              <TabsTrigger value='selected'>Đã chọn</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className='flex-1 overflow-hidden'>
          <ScrollArea className='h-[calc(85vh-220px)]'>
            <div className='p-6'>
              <Tabs value={activeTab} className='h-full'>
                <TabsContent value='all' className='mt-0'>
                  <div className='grid grid-cols-1 gap-4'>
                    {filteredCourses.map((course) => (
                      <div key={course.id} className='rounded-lg border bg-card'>
                        <div className='flex gap-4 p-4'>
                          <div className='relative w-32 h-24 rounded-md overflow-hidden flex-shrink-0'>
                            <Image src={course.imageUrl} alt={course.title} fill className='object-cover' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <h3 className='font-semibold text-lg line-clamp-1'>{course.title}</h3>
                            <div className='flex items-center gap-3 mt-1 text-sm text-muted-foreground'>
                              <Badge variant='secondary' className='rounded-sm'>
                                {course.categories[0]?.name}
                              </Badge>
                              <div className='flex items-center gap-1'>
                                <BookOpen className='w-4 h-4' />
                                <span>{course.chapters.length} chương</span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Clock className='w-4 h-4' />
                                <span>{course.durationsDisplay}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='border-t divide-y'>
                          {course.chapters.map((chapter, index) => (
                            <div key={chapter.id} className='flex items-center gap-4 p-4'>
                              <Checkbox
                                checked={selectedChapters.includes(chapter.id)}
                                onCheckedChange={() => handleSelect(chapter.id)}
                              />
                              <div className='flex-1 min-w-0'>
                                <div className='font-medium'>
                                  Chương {index + 1}: {chapter.title}
                                </div>
                                <div className='text-sm text-muted-foreground mt-1'>
                                  {chapter.lessons.length} bài học • {chapter.durationsDisplay}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value='selected' className='mt-0'>
                  <div className='space-y-4'>
                    {selectedChapters.map((id) => {
                      const [courseId, chapterNum] = id.split('-chapter-')
                      const course = mockCourses.find((c) => c.id === courseId)
                      const chapter = course?.chapters.find((ch) => ch.id === id)

                      if (!course || !chapter) return null

                      return (
                        <div key={id} className='flex items-center gap-4 p-4 border rounded-lg'>
                          <div className='relative w-16 h-12 rounded overflow-hidden flex-shrink-0'>
                            <Image src={course.imageUrl} alt={course.title} fill className='object-cover' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='text-sm text-muted-foreground'>{course.title}</div>
                            <div className='font-medium mt-1'>
                              Chương {chapterNum}: {chapter.title}
                            </div>
                          </div>
                          <Button variant='ghost' size='sm' onClick={() => handleSelect(id)}>
                            <Plus className='w-4 h-4' />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </div>

        <div className='flex items-center justify-between gap-4 p-6 border-t bg-muted/40'>
          <div className='text-sm text-muted-foreground'>Đã chọn {selectedChapters.length} chương</div>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddSelected} disabled={selectedChapters.length === 0}>
              <Plus className='w-4 h-4 mr-2' />
              Thêm vào khóa học
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
