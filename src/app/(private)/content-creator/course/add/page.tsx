'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft } from 'lucide-react'
import { CourseDetailsForm } from '@/components/private/content-creator/course/course-details-form'
import { ContentPreview } from '@/components/private/content-creator/course/content-preview'
import { ChapterList } from '@/components/private/content-creator/course/chapter-list'
import configRoute from '@/config/route'

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

export default function AddNewCourse() {
  const router = useRouter()
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    level: '',
    category: '',
    duration: '',
    price: '',
    isPublished: false
  })
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: '1',
      title: '',
      lessons: [
        {
          id: '1',
          title: '',
          type: 'text',
          content: '',
          videoSource: 'url',
          videoUrl: '',
          videoFile: undefined,
          quizQuestions: []
        }
      ]
    }
  ])

  const handleCourseDataChange = (field: string, value: string | boolean) => {
    setCourseData((prev) => ({ ...prev, [field]: value }))
  }

  const handleChapterChange = (index: number, field: string, value: string) => {
    const newChapters = [...chapters]
    newChapters[index] = { ...newChapters[index], [field]: value }
    setChapters(newChapters)
  }

  const addChapter = () => {
    setChapters([
      ...chapters,
      {
        id: Date.now().toString(),
        title: '',
        lessons: [
          {
            id: Date.now().toString(),
            title: '',
            type: 'text',
            content: '',
            videoSource: 'url',
            videoUrl: '',
            videoFile: undefined,
            quizQuestions: []
          }
        ]
      }
    ])
  }

  const removeChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index))
  }

  const addLesson = (chapterIndex: number) => {
    const newChapters = [...chapters]
    newChapters[chapterIndex].lessons.push({
      id: Date.now().toString(),
      title: '',
      type: 'text',
      content: '',
      videoSource: 'url',
      videoUrl: '',
      videoFile: undefined,
      quizQuestions: []
    })
    setChapters(newChapters)
  }

  const handleLessonChange = (
    chapterIndex: number,
    lessonIndex: number,
    field: string,
    value: string | QuizQuestion[] | File | 'url' | 'file' | string
  ) => {
    const newChapters = [...chapters]
    newChapters[chapterIndex].lessons[lessonIndex] = {
      ...newChapters[chapterIndex].lessons[lessonIndex],
      [field]: value
    }
    setChapters(newChapters)
  }

  const removeLesson = (chapterIndex: number, lessonIndex: number) => {
    const newChapters = [...chapters]
    newChapters[chapterIndex].lessons = newChapters[chapterIndex].lessons.filter((_, i) => i !== lessonIndex)
    setChapters(newChapters)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ ...courseData, chapters })
    // Redirect to the course management page
    router.push('/content-creator/courses')
  }

  return (
    <div className='max-w-5xl mx-auto py-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Add New Course</h1>
        <Button variant='outline' asChild>
          <Link href={configRoute.contentCreator.course}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Courses
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <CourseDetailsForm courseData={courseData} handleCourseDataChange={handleCourseDataChange} />

        <Card className='mb-6'>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue='chapters' className='w-full'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='chapters'>Chapters & Lessons</TabsTrigger>
                <TabsTrigger value='preview'>Content Preview</TabsTrigger>
              </TabsList>
              <TabsContent value='chapters'>
                <ChapterList
                  chapters={chapters}
                  handleChapterChange={handleChapterChange}
                  addChapter={addChapter}
                  removeChapter={removeChapter}
                  addLesson={addLesson}
                  handleLessonChange={handleLessonChange}
                  removeLesson={removeLesson}
                />
              </TabsContent>
              <TabsContent value='preview'>
                <ContentPreview chapters={chapters} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className='flex justify-end space-x-4'>
          <Button variant='outline' onClick={() => router.push(configRoute.contentCreator.course)}>
            Cancel
          </Button>
          <Button type='submit'>Create Course</Button>
        </div>
      </form>
    </div>
  )
}
