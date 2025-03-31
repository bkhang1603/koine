/* eslint-disable no-unused-vars */
import { Textarea } from '@/components/ui/textarea'

interface TextLessonContentProps {
  lesson: {
    content: string
  }
  chapterIndex: number
  lessonIndex: number
  handleLessonChange: (chapterIndex: number, lessonIndex: number, field: string, value: string) => void
}

export function TextLessonContent({ lesson, chapterIndex, lessonIndex, handleLessonChange }: TextLessonContentProps) {
  return (
    <Textarea
      placeholder='Lesson content'
      value={lesson.content}
      onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, 'content', e.target.value)}
      className='mt-2'
    />
  )
}
