'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useMemo } from 'react'
import { Plus, ArrowLeft, BookOpen, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { CustomChapterList } from '@/components/public/parent/custom-course/custom-chapter-list'
import { ChapterPickerDialog } from '@/components/public/parent/custom-course/chapter-picker-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CoursesResType } from '@/schemaValidations/course.schema'
import { useGetAllCoursesForCustomQuery } from '@/queries/useCourse'
import { useToast } from '@/components/ui/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useAppStore } from '@/components/app-provider'

type Chapter = CoursesResType['data'][0]['chapters'][0]

export default function CustomCoursePage() {
  const { toast } = useToast()
  const [openChapterPicker, setOpenChapterPicker] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Query data once
  const { data, isLoading } = useGetAllCoursesForCustomQuery()

  // Get Zustand state with guaranteed initialization
  const chapters = useAppStore((state) => state.customCourse.chapters || [])
  const setCustomCourse = useAppStore((state) => state.setCustomCourse)

  // Memoize courses to prevent unnecessary recalculations
  const courses = useMemo(() => data?.payload.data || [], [data?.payload.data])

  // Derived values - memoized for performance
  const totalChapters = chapters.length
  const totalLessons = useMemo(
    () => chapters.reduce((sum, chapter) => sum + (chapter.lessons?.length || 0), 0),
    [chapters]
  )

  // Apply default alphabetical sorting to chapters
  const formattedChaptersForList = useMemo(() => {
    return [...chapters]
      .sort((a, b) => {
        // Sort alphabetically by title
        const titleA = (a.title || '').toLowerCase()
        const titleB = (b.title || '').toLowerCase()
        return titleA.localeCompare(titleB)
      })
      .map((chapter) => ({
        id: chapter.id,
        title: chapter.title || 'Chương không có tiêu đề',
        description: chapter.description || '',
        durations: chapter.durations || 0,
        durationsDisplay: chapter.durationsDisplay || '0 phút',
        sequence: chapter.sequence || 0,
        lessons:
          chapter.lessons?.map((lesson) => ({
            ...lesson,
            type: lesson.type || 'VIDEO',
            title: lesson.title || '',
            description: lesson.description || '',
            videoUrl: lesson.videoUrl || null
          })) || []
      }))
  }, [chapters])

  // UI interaction handlers
  const handleAddChapter = () => setOpenChapterPicker(true)

  const handleClearAll = () => {
    setCustomCourse({ chapters: [] })
    toast({
      title: 'Đã xóa tất cả các chương',
      description: 'Danh sách các chương đã được làm trống'
    })
  }

  const handleSelectChapters = (selectedChapters: any[]) => {
    if (!selectedChapters.length) return

    // Normalize incoming chapters
    const formattedChapters = selectedChapters.map((chapter) => ({
      ...chapter,
      description: chapter.description || '',
      durations: chapter.durations || 0,
      durationsDisplay: chapter.durationsDisplay || '0',
      sequence: chapter.sequence || 0
    }))

    // Avoid duplicates
    const existingIds = new Set(chapters.map((c) => c.id))
    const newChapters = formattedChapters.filter((c) => !existingIds.has(c.id))

    // Update state if we have new chapters
    if (newChapters.length) {
      setCustomCourse({
        chapters: [...chapters, ...newChapters]
      })
    }
  }

  const handleChaptersChange = (updatedChapters: Chapter[]) => {
    setCustomCourse({ chapters: updatedChapters })
  }

  const handleSubmit = async () => {
    if (!chapters.length) {
      toast({
        title: 'Vui lòng chọn ít nhất một chương',
        description: 'Bạn cần chọn nội dung cho khóa học của mình',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)

    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('chapters', chapters)

      toast({
        title: 'Yêu cầu đã được gửi thành công',
        description: 'Chúng tôi sẽ tiến hành xử lý và thông báo cho bạn sớm nhất'
      })

      setCustomCourse({ chapters: [] })
    } catch (error) {
      toast({
        title: 'Có lỗi xảy ra',
        description: 'Không thể gửi yêu cầu. Vui lòng thử lại sau.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='container py-8 space-y-6'>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' asChild>
          <Link href='/course'>
            <ArrowLeft className='w-4 h-4' />
          </Link>
        </Button>
        <div>
          <h1 className='text-2xl font-bold'>Tạo khóa học theo yêu cầu</h1>
          <p className='text-muted-foreground mt-1'>Tự do thiết kế nội dung học tập theo nhu cầu của bạn</p>
        </div>
      </div>

      <Alert>
        <BookOpen className='h-4 w-4' />
        <AlertTitle>Hướng dẫn sử dụng</AlertTitle>
        <AlertDescription>
          Chọn các chương từ các khóa học hiện có để tạo khóa học riêng của bạn. Hệ thống sẽ tự động tạo tên và hình ảnh
          cho khóa học dựa trên nội dung bạn chọn.
        </AlertDescription>
      </Alert>

      <div className='grid md:grid-cols-3 gap-6'>
        <div className='md:col-span-2'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>Nội dung khóa học</CardTitle>
              <div className='flex gap-2'>
                {chapters.length > 0 && (
                  <Button variant='outline' size='sm' onClick={handleClearAll}>
                    <Trash2 className='w-4 h-4 mr-2' />
                    Xóa tất cả
                  </Button>
                )}
                <Button size='sm' onClick={handleAddChapter} disabled={isLoading}>
                  <Plus className='w-4 h-4 mr-2' />
                  Thêm chương
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {chapters.length === 0 ? (
                <div className='text-center py-12 border-2 border-dashed rounded-lg'>
                  <BookOpen className='mx-auto h-12 w-12 text-muted-foreground/60' />
                  <h3 className='mt-4 font-medium text-gray-700'>Chưa có chương nào được chọn</h3>
                  <p className='mt-2 text-sm text-muted-foreground max-w-xs mx-auto'>
                    Nhấn vào nút &quot;Thêm chương&quot; để chọn nội dung từ các khóa học có sẵn
                  </p>
                  <Button onClick={handleAddChapter} className='mt-4' disabled={isLoading}>
                    {isLoading ? (
                      'Đang tải...'
                    ) : (
                      <>
                        <Plus className='w-4 h-4 mr-2' />
                        Thêm chương
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <CustomChapterList chapters={formattedChaptersForList} onChange={handleChaptersChange} />
              )}
            </CardContent>
          </Card>
        </div>

        <Card className='h-fit sticky top-24'>
          <CardHeader>
            <CardTitle>Tóm tắt yêu cầu</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              <h3 className='font-medium mb-3'>Thông tin khóa học</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Tổng số chương</span>
                  <span className='font-medium'>{totalChapters} chương</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Tổng số bài học</span>
                  <span className='font-medium'>{totalLessons} bài</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className='font-medium mb-3'>Thứ tự các chương</h3>
              <ScrollArea className='h-[200px]'>
                <div className='space-y-2 text-sm pr-4'>
                  {chapters.map((chapter, index) => (
                    <div key={chapter.id} className='flex gap-2'>
                      <span className='text-muted-foreground min-w-[20px]'>{index + 1}.</span>
                      <div>
                        <div>{chapter.title}</div>
                        <div className='text-muted-foreground text-xs'>{chapter.lessons?.length || 0} bài học</div>
                      </div>
                    </div>
                  ))}
                  {chapters.length === 0 && (
                    <div className='text-muted-foreground italic'>Chưa có chương nào được thêm vào</div>
                  )}
                </div>
              </ScrollArea>
            </div>

            <Button className='w-full' onClick={handleSubmit} disabled={isSubmitting || chapters.length === 0}>
              {isSubmitting ? (
                <span className='flex items-center'>
                  <svg
                    className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Đang xử lý...
                </span>
              ) : (
                'Gửi yêu cầu'
              )}
            </Button>
            <p className='text-xs text-muted-foreground text-center'>
              Sau khi gửi yêu cầu, chúng tôi sẽ liên hệ với bạn để trao đổi chi tiết về giá và nội dung khóa học
            </p>
          </CardContent>
        </Card>
      </div>

      <ChapterPickerDialog
        open={openChapterPicker}
        onOpenChange={setOpenChapterPicker}
        onSelect={handleSelectChapters}
        courses={courses}
        existingChapterIds={chapters.map((chapter) => chapter.id)}
      />
    </main>
  )
}
