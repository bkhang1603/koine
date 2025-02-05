'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { CourseDetailsForm } from '@/components/private/content-creator/course/course-details-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChapterList } from '@/components/private/content-creator/course/chapter-list'
import { ContentPreview } from '@/components/private/content-creator/course/content-preview'
import { useRouter } from 'next/navigation'

export default function EditCourse({ params }: { params: { id: string } }) {
  const router = useRouter()

  const courseData = [
    {
      id: '1',
      title: 'Course Title',
      description: 'Course Description',
      level: 'Beginner',
      category: 'Category',
      duration: '10 hours',
      price: '100',
      isPublished: false,
      chapters: [
        {
          id: '1',
          title: 'Chapter Title',
          lessons: [
            {
              id: '1',
              title: 'Lesson Title',
              type: 'text' as 'text',
              content: 'Lesson Content',
              videoSource: 'url' as 'url',
              videoUrl: '',
              videoFile: undefined,
              quizQuestions: []
            }
          ]
        }
      ]
    }
  ]

  const course = courseData.find((course) => course.id === params.id)

  const handleSubmit = () => {}

  const handleCourseDataChange = () => {}

  const updateChapter = () => {}

  const addChapter = () => {}

  const deleteChapter = () => {}

  const addLesson = () => {}

  const updateLesson = () => {}

  const deleteLesson = () => {}

  if (!course) {
    return <div>Loading...</div>
  }

  return (
    <div className='max-w-6xl mx-auto space-y-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Edit Course</h1>
        <Button variant='outline' asChild>
          <Link href={`/content-creator/courses/${course.id}`}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Course
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <CourseDetailsForm courseData={course} handleCourseDataChange={handleCourseDataChange} />

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
                  chapters={course.chapters}
                  handleChapterChange={updateChapter}
                  addChapter={addChapter}
                  removeChapter={deleteChapter}
                  addLesson={addLesson}
                  handleLessonChange={updateLesson}
                  removeLesson={deleteLesson}
                />
              </TabsContent>
              <TabsContent value='preview'>
                <ContentPreview chapters={course.chapters} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className='flex justify-end space-x-4'>
          <Button variant='outline' onClick={() => router.push(`/content-creator/courses/${course.id}`)}>
            Cancel
          </Button>
          <Button type='submit'>Update Course</Button>
        </div>
      </form>
    </div>
  )
}
