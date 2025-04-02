/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { Accordion } from '@/components/ui/accordion'
import { Plus } from 'lucide-react'
import { ChapterItem } from '@/components/private/content-creator/course/chapter-item'

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

interface ChapterListProps {
  chapters: Chapter[]
  handleChapterChange: (index: number, field: string, value: string) => void
  addChapter: () => void
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

export function ChapterList({
  chapters,
  handleChapterChange,
  addChapter,
  removeChapter,
  addLesson,
  handleLessonChange,
  removeLesson
}: ChapterListProps) {
  return (
    <div className='space-y-4'>
      <Accordion type='single' collapsible className='w-full'>
        {chapters.map((chapter, chapterIndex) => (
          <ChapterItem
            key={chapter.id}
            chapter={chapter}
            chapterIndex={chapterIndex}
            handleChapterChange={handleChapterChange}
            removeChapter={removeChapter}
            addLesson={addLesson}
            handleLessonChange={handleLessonChange}
            removeLesson={removeLesson}
          />
        ))}
      </Accordion>
      <Button onClick={addChapter} className='mt-4 w-full'>
        <Plus className='h-4 w-4 mr-2' />
        Add Chapter
      </Button>
    </div>
  )
}
