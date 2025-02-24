/* eslint-disable no-unused-vars */
import { LessonItem } from '@/components/private/content-creator/course/lesson-item'
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GripVertical, Plus } from 'lucide-react'

interface Chapter {
  id: string
  title: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  type: 'text' | 'video' | 'quiz'
  content: string
  videoUrl?: string
  videoFile?: File
  videoSource: 'url' | 'file'
  videoContent?: string
  quizQuestions?: QuizQuestion[]
}

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

interface ChapterItemProps {
  chapter: Chapter
  chapterIndex: number
  handleChapterChange: (index: number, field: string, value: string) => void
  removeChapter: (index: number) => void
  addLesson: (chapterIndex: number) => void
  handleLessonChange: (
    chapterIndex: number,
    lessonIndex: number,
    field: string,
    value: string | QuizQuestion[] | File | 'url' | 'file' | string
  ) => void
  removeLesson: (chapterIndex: number, lessonIndex: number) => void
}

export function ChapterItem({
  chapter,
  chapterIndex,
  handleChapterChange,
  addLesson,
  handleLessonChange,
  removeLesson
}: ChapterItemProps) {
  return (
    <AccordionItem value={chapter.id}>
      <AccordionTrigger className='hover:no-underline'>
        <div className='flex items-center space-x-2'>
          <GripVertical className='h-4 w-4 text-gray-500' />
          <Input
            placeholder='Chapter Title'
            value={chapter.title}
            onChange={(e) => handleChapterChange(chapterIndex, 'title', e.target.value)}
            className='w-[300px]'
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className='pl-6 space-y-4'>
          {chapter.lessons.map((lesson, lessonIndex) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              chapterIndex={chapterIndex}
              lessonIndex={lessonIndex}
              handleLessonChange={handleLessonChange}
              removeLesson={removeLesson}
            />
          ))}
          <Button onClick={() => addLesson(chapterIndex)} variant='default' className='mt-4 w-full'>
            <Plus className='h-4 w-4 mr-2' />
            Add Lesson
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
