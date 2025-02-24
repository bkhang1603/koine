/* eslint-disable no-unused-vars */
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Chapter, Lesson } from '../../../../app/(private)/content-creator/course/types'
import { FileText, Plus, MoreVertical, Video, ListChecks, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface CourseContentProps {
  chapters: Chapter[]
  onChapterAdd: () => void
  onChapterDelete: (chapterId: string) => void
  onChapterChange: (chapterId: string, field: string, value: string) => void
  onLessonAdd: (chapterId: string, type: 'text' | 'video' | 'quiz') => void
  onLessonChange: (chapterId: string, lessonId: string, field: string, value: any) => void
  onLessonDelete: (chapterId: string, lessonId: string) => void
  onLessonEdit: (chapterId: string, lesson: Lesson) => void
}

const getLessonIcon = (type: string) => {
  switch (type) {
    case 'text':
      return <FileText className='w-4 h-4 text-blue-500' />
    case 'video':
      return <Video className='w-4 h-4 text-green-500' />
    case 'quiz':
      return <ListChecks className='w-4 h-4 text-orange-500' />
    default:
      return null
  }
}

export function CourseContent({
  chapters,
  onChapterAdd,
  onChapterDelete,
  onChapterChange,
  onLessonAdd,
  onLessonChange,
  onLessonDelete
}: CourseContentProps) {
  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between'>
        <div>
          <CardTitle>Nội dung khóa học</CardTitle>
          <p className='text-sm text-muted-foreground mt-1'>Thêm các chương và bài học cho khóa học</p>
        </div>
        <Button onClick={onChapterAdd}>
          <Plus className='w-4 h-4 mr-2' />
          Thêm chương
        </Button>
      </CardHeader>
      <CardContent>
        {chapters.length === 0 ? (
          <div className='text-center py-12 border-2 border-dashed rounded-lg'>
            <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4'>
              <FileText className='w-8 h-8 text-primary' />
            </div>
            <h3 className='text-lg font-medium mb-2'>Chưa có nội dung</h3>
            <p className='text-sm text-muted-foreground mb-4 max-w-sm mx-auto'>
              Bắt đầu tạo nội dung cho khóa học bằng cách thêm chương mới
            </p>
            <Button onClick={onChapterAdd}>
              <Plus className='w-4 h-4 mr-2' />
              Thêm chương đầu tiên
            </Button>
          </div>
        ) : (
          <div className='space-y-8'>
            {chapters.map((chapter, index) => (
              <div key={chapter.id} className='space-y-4'>
                {/* Chapter Header */}
                <div className='flex items-center gap-4 bg-muted/40 p-4 rounded-lg'>
                  <div className='flex-1 space-y-1.5'>
                    <div className='text-sm font-medium text-muted-foreground'>Chương {index + 1}</div>
                    <Input
                      placeholder='Tên chương'
                      value={chapter.title}
                      onChange={(e) => onChapterChange(chapter.id, 'title', e.target.value)}
                      className='text-lg font-medium border-none bg-transparent px-0 h-auto focus-visible:ring-0'
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <MoreVertical className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem
                        onClick={() => onChapterDelete(chapter.id)}
                        className='text-destructive focus:text-destructive'
                      >
                        <Trash2 className='w-4 h-4 mr-2' />
                        Xóa chương
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Chapter Description */}
                <Textarea
                  placeholder='Mô tả về nội dung của chương học này'
                  value={chapter.description}
                  onChange={(e) => onChapterChange(chapter.id, 'description', e.target.value)}
                  className='min-h-[80px] resize-none'
                />

                {/* Lessons */}
                <div className='space-y-3 pl-4 border-l-2'>
                  {chapter.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className='flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors group'
                    >
                      {getLessonIcon(lesson.type)}
                      <div className='flex-1'>
                        <Input
                          placeholder='Tên bài học'
                          value={lesson.title}
                          onChange={(e) => onLessonChange(chapter.id, lesson.id, 'title', e.target.value)}
                          className='border-none bg-transparent px-0 h-auto focus-visible:ring-0'
                        />
                      </div>
                      <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <Button variant='ghost' size='icon' className='h-8 w-8 hover:bg-accent/20' asChild>
                          <Link href={`/content-creator/course/${chapter.courseId}/lesson/${lesson.id}`}>
                            <Pencil className='w-4 h-4' />
                          </Link>
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 hover:bg-destructive/10 hover:text-destructive'
                          onClick={() => onLessonDelete(chapter.id, lesson.id)}
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Add Lesson Button */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' className='w-full border-dashed'>
                        <Plus className='w-4 h-4 mr-2' />
                        Thêm bài học
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-56'>
                      <DropdownMenuItem onClick={() => onLessonAdd(chapter.id, 'text')}>
                        <FileText className='w-4 h-4 mr-4 text-blue-500' />
                        <div>
                          <div className='font-medium'>Bài học văn bản</div>
                          <p className='text-xs text-muted-foreground'>Tạo bài học dạng văn bảng</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onLessonAdd(chapter.id, 'video')}>
                        <Video className='w-4 h-4 mr-4 text-green-500' />
                        <div>
                          <div className='font-medium'>Bài học video</div>
                          <p className='text-xs text-muted-foreground'>Tải lên video bài giảng</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onLessonAdd(chapter.id, 'quiz')}>
                        <ListChecks className='w-4 h-4 mr-4 text-orange-500' />
                        <div>
                          <div className='font-medium'>Bài kiểm tra</div>
                          <p className='text-xs text-muted-foreground'>Tạo bài kiểm tra đánh giá</p>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
