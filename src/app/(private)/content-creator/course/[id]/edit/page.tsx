'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { courses } from '../../../_mock/data'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CourseBasicInfo } from '../../../../../../components/private/content-creator/course/course-basic-info'
import { CourseMedia } from '../../../../../../components/private/content-creator/course/course-media'
import { CourseContent } from '../../../../../../components/private/content-creator/course/course-content'
import { Course, Lesson } from '../../types'

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [, setSelectedLesson] = useState<{ chapterId: string; lesson: Lesson } | null>(null)

  useEffect(() => {
    const courseData = courses.find((c) => c.id === params.id)
    if (courseData) {
      setCourse(courseData)
    }
  }, [params.id])

  if (!course) return null

  const handleBasicInfoChange = (field: keyof Course, value: any) => {
    setCourse((prev) => {
      if (!prev) return prev
      return { ...prev, [field]: value }
    })
  }

  const handleChapterAdd = () => {
    setCourse((prev) => {
      if (!prev) return prev
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
    setCourse((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        chapters: prev.chapters.filter((chapter) => chapter.id !== chapterId)
      }
    })
  }

  const handleChapterChange = (chapterId: string, field: string, value: string) => {
    setCourse((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        chapters: prev.chapters.map((chapter) => (chapter.id === chapterId ? { ...chapter, [field]: value } : chapter))
      }
    })
  }

  const handleLessonAdd = (chapterId: string, type: 'text' | 'video' | 'quiz') => {
    setCourse((prev) => {
      if (!prev) return prev
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
    setCourse((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        chapters: prev.chapters.map((chapter) =>
          chapter.id === chapterId
            ? { ...chapter, lessons: chapter.lessons.filter((lesson) => lesson.id !== lessonId) }
            : chapter
        )
      }
    })
  }

  const handleLessonChange = (chapterId: string, lessonId: string, field: string, value: any) => {
    setCourse((prev) => {
      if (!prev) return prev
      return {
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
      }
    })
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

  const handleSave = () => {
    if (!course) return

    // Tính toán lại totalLessons và duration
    const totalLessons = course.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)
    const totalDuration = course.chapters.reduce(
      (total, chapter) => total + chapter.lessons.reduce((sum, lesson) => sum + lesson.duration, 0),
      0
    )

    const updatedCourse = {
      ...course,
      totalLessons,
      duration: totalDuration,
      durationDisplay: `${Math.floor(totalDuration / 60)} giờ ${totalDuration % 60} phút`
    }

    console.log('Saving course:', updatedCourse)
    router.push(`/content-creator/course/${params.id}`)
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4'>
        {/* Back Button */}
        <div className='mb-6'>
          <Link href={`/content-creator/course/${params.id}`}>
            <Button variant='ghost'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Quay lại
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-2xl font-bold'>Chỉnh sửa khóa học</h1>
            <p className='text-sm text-muted-foreground mt-1'>Chỉnh sửa thông tin và nội dung khóa học</p>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={() => handleBasicInfoChange('status', 'draft')}>
              Lưu nháp
            </Button>
            <Button onClick={handleSave}>Lưu thay đổi</Button>
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
