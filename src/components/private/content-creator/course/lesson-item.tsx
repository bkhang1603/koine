/* eslint-disable no-unused-vars */
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FileText, Video, HelpCircle, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { TextLessonContent } from '@/components/private/content-creator/course/text-lesson-content'
import { VideoLessonContent } from '@/components/private/content-creator/course/video-lesson-content'
import { QuizLessonContent } from '@/components/private/content-creator/course/quiz-lesson-content'

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

interface LessonItemProps {
  lesson: Lesson
  chapterIndex: number
  lessonIndex: number
  handleLessonChange: (
    chapterIndex: number,
    lessonIndex: number,
    field: string,
    value: string | QuizQuestion[] | File | 'url' | 'file' | string
  ) => void
  removeLesson: (chapterIndex: number, lessonIndex: number) => void
}

export function LessonItem({ lesson, chapterIndex, lessonIndex, handleLessonChange, removeLesson }: LessonItemProps) {
  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className='h-4 w-4 text-blue-500' />
      case 'video':
        return <Video className='h-4 w-4 text-green-500' />
      case 'quiz':
        return <HelpCircle className='h-4 w-4 text-yellow-500' />
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`space-y-2 p-4 rounded-md shadow-sm border`}
    >
      <div className='flex items-center mb-2'>
        <div className='flex items-center space-x-2 flex-grow'>
          {getLessonTypeIcon(lesson.type)}
          <Input
            placeholder='Lesson Title'
            value={lesson.title}
            onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, 'title', e.target.value)}
            className='w-[300px]'
          />
          <Select
            value={lesson.type}
            onValueChange={(value) =>
              handleLessonChange(chapterIndex, lessonIndex, 'type', value as 'text' | 'video' | 'quiz')
            }
          >
            <SelectTrigger className='w-[110px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='text'>Text</SelectItem>
              <SelectItem value='video'>Video</SelectItem>
              <SelectItem value='quiz'>Quiz</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='icon' onClick={() => removeLesson(chapterIndex, lessonIndex)}>
                <X className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove lesson</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {lesson.type === 'text' && (
        <TextLessonContent
          lesson={lesson}
          chapterIndex={chapterIndex}
          lessonIndex={lessonIndex}
          handleLessonChange={handleLessonChange}
        />
      )}
      {lesson.type === 'video' && (
        <VideoLessonContent
          lesson={lesson}
          chapterIndex={chapterIndex}
          lessonIndex={lessonIndex}
          handleLessonChange={handleLessonChange}
        />
      )}
      {lesson.type === 'quiz' && (
        <QuizLessonContent
          lesson={lesson}
          chapterIndex={chapterIndex}
          lessonIndex={lessonIndex}
          handleLessonChange={handleLessonChange}
        />
      )}
    </motion.div>
  )
}
