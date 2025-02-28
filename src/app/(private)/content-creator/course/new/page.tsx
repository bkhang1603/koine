'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CourseBasicInfo } from '@/components/private/content-creator/course/course-basic-info'
import { CourseMedia } from '@/components/private/content-creator/course/course-media'
import { CourseContent } from '@/components/private/content-creator/course/course-content'
import { Course, Lesson } from '../types'

const initialCourse: Course = {
  id: `course-${Date.now()}`,
  title: '',
  description: '',
  thumbnail: '',
  banner: '',
  categories: [],
  level: '',
  ageGroup: '',
  status: 'draft',
  totalLessons: 0,
  duration: 0,
  durationDisplay: '0 phút',
  creatorId: 'creator-1', // Tạm thời hardcode
  creator: {
    id: 'creator-1',
    username: 'Teacher Anna'
  },
  chapters: []
}

export default function NewCoursePage() {
  const router = useRouter()
  const [course, setCourse] = useState<Course>(initialCourse)
  const [, setSelectedLesson] = useState<{ chapterId: string; lesson: Lesson } | null>(null)

  const handleBasicInfoChange = (field: keyof Course, value: any) => {
    setCourse((prev) => ({ ...prev, [field]: value }))
  }

  const handleChapterAdd = () => {
    setCourse((prev) => {
      const newChapter = {
        id: `chapter-${Date.now()}`,
        courseId: prev.id,
        title: 'Chương mới',
        description: '',
        duration: 0,
        durationDisplay: '0 phút',
        sequence: prev.chapters.length + 1,
        lessons: [],
        creatorId: prev.creatorId,
        creator: prev.creator
      }
      return { ...prev, chapters: [...prev.chapters, newChapter] }
    })
  }

  const handleChapterDelete = (chapterId: string) => {
    setCourse((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((chapter) => chapter.id !== chapterId)
    }))
  }

  const handleChapterChange = (chapterId: string, field: string, value: string) => {
    setCourse((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter) => (chapter.id === chapterId ? { ...chapter, [field]: value } : chapter))
    }))
  }

  const handleLessonAdd = (chapterId: string, type: 'text' | 'video' | 'quiz') => {
    setCourse((prev) => {
      const chapter = prev.chapters.find((c) => c.id === chapterId)
      if (!chapter) return prev

      const newLesson: Lesson = {
        id: `lesson-${Date.now()}`,
        chapterId: chapterId,
        type,
        title: 'Bài học mới',
        description: '',
        content: type === 'text' ? '<p>Nội dung bài học</p>' : null,
        videoUrl: type === 'video' ? '' : null,
        duration: 0,
        durationDisplay: '0 phút',
        sequence: chapter.lessons.length + 1,
        status: 'draft',
        creator: prev.creator
      }

      return {
        ...prev,
        chapters: prev.chapters.map((c) => (c.id === chapterId ? { ...c, lessons: [...c.lessons, newLesson] } : c))
      }
    })
  }

  const handleLessonDelete = (chapterId: string, lessonId: string) => {
    setCourse((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, lessons: chapter.lessons.filter((lesson) => lesson.id !== lessonId) }
          : chapter
      )
    }))
  }

  const handleLessonChange = (chapterId: string, lessonId: string, field: string, value: any) => {
    setCourse((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lessons: chapter.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
              )
            }
          : chapter
      )
    }))
  }

  const handleLessonEdit = (chapterId: string, lesson: Lesson) => {
    setSelectedLesson({ chapterId, lesson })
  }

  const handleImageUpload = (field: 'thumbnail' | 'banner', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleBasicInfoChange(field, reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = (status: string = 'draft') => {
    // Tính toán lại totalLessons và duration
    const totalLessons = course.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)
    const totalDuration = course.chapters.reduce(
      (total, chapter) => total + chapter.lessons.reduce((sum, lesson) => sum + lesson.duration, 0),
      0
    )

    const updatedCourse = {
      ...course,
      status,
      totalLessons,
      duration: totalDuration,
      durationDisplay: `${Math.floor(totalDuration / 60)} giờ ${totalDuration % 60} phút`
    }

    console.log('Saving course:', updatedCourse)
    router.push('/content-creator/course')
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4'>
        {/* Back Button */}
        <div className='mb-6'>
          <Link href='/content-creator/course'>
            <Button variant='ghost'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Quay lại
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-2xl font-bold'>Tạo khóa học mới</h1>
            <p className='text-sm text-muted-foreground mt-1'>Tạo và thiết kế nội dung cho khóa học</p>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={() => handleSave('draft')}>
              Lưu nháp
            </Button>
            <Button onClick={() => handleSave('published')}>Xuất bản</Button>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-6'>
          {/* Main Content */}
          <div className='col-span-2 space-y-6'>
            <CourseBasicInfo
              title={course.title}
              description={course.description}
              categories={course.categories}
              level={course.level}
              ageGroup={course.ageGroup}
              onFieldChange={handleBasicInfoChange}
            />

            <CourseContent
              chapters={course.chapters}
              onChapterAdd={handleChapterAdd}
              onChapterDelete={handleChapterDelete}
              onChapterChange={handleChapterChange}
              onLessonAdd={handleLessonAdd}
              onLessonChange={handleLessonChange}
              onLessonDelete={handleLessonDelete}
              onLessonEdit={handleLessonEdit}
            />
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            <CourseMedia banner={course.banner} thumbnail={course.thumbnail} onImageUpload={handleImageUpload} />
          </div>
        </div>
      </div>
    </div>
  )
}
