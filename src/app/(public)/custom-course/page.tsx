'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useMemo, useRef } from 'react'
import { Plus, ArrowLeft, BookOpen, Trash2, Upload, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { CustomChapterList } from '@/components/public/parent/custom-course/custom-chapter-list'
import { ChapterPickerDialog } from '@/components/public/parent/custom-course/chapter-picker-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CoursesResType } from '@/schemaValidations/course.schema'
import { useCreateCourseCustomMutation, useGetAllCoursesForCustomQuery } from '@/queries/useCourse'
import { toast } from '@/components/ui/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useAppStore } from '@/components/app-provider'
import { handleErrorApi } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { useUploadImageMutation } from '@/queries/useUpload'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import configRoute from '@/config/route'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Breadcrumb } from '@/components/public/parent/setting/Breadcrumb'

type Chapter = CoursesResType['data'][0]['chapters'][0]

// Extend Chapter type to include pricePerChapter
type ChapterWithPrice = {
  id: string
  title?: string
  lessons: any[]
  description?: string
  durations?: number
  durationsDisplay?: string
  sequence?: number
  pricePerChapter?: number
  [key: string]: any
}

// Thêm schema validation
const customCourseSchema = z.object({
  customTitle: z.string().min(1, 'Vui lòng nhập tên khóa học'),
  customDescription: z.string().min(1, 'Vui lòng nhập mô tả khóa học'),
  customImageUrl: z.string().optional()
})

type CustomCourseFormValues = z.infer<typeof customCourseSchema>

export default function CustomCoursePage() {
  const [openChapterPicker, setOpenChapterPicker] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Query data once
  const { data, isLoading } = useGetAllCoursesForCustomQuery()
  const uploadImageMutation = useUploadImageMutation()

  const createCourseCustomMutation = useCreateCourseCustomMutation()

  const form = useForm<CustomCourseFormValues>({
    resolver: zodResolver(customCourseSchema),
    defaultValues: {
      customTitle: '',
      customDescription: '',
      customImageUrl: ''
    }
  })

  // Get Zustand state with guaranteed initialization
  const chapters: ChapterWithPrice[] = useAppStore((state) => state.customCourse.chapters || [])
  const setCustomCourse = useAppStore((state) => state.setCustomCourse)

  // Memoize courses to prevent unnecessary recalculations
  const courses = useMemo(() => data?.payload.data || [], [data?.payload.data])

  // Derived values - memoized for performance
  const totalChapters = chapters.length
  const totalLessons = useMemo(
    () => chapters.reduce((sum, chapter) => sum + (chapter.lessons?.length || 0), 0),
    [chapters]
  )

  // Calculate total price
  const totalPrice = useMemo(
    () => chapters.reduce((sum, chapter) => sum + (chapter.pricePerChapter || 0), 0),
    [chapters]
  )

  // Preview image from file or form value
  const previewImage = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
    return form.getValues('customImageUrl')
  }, [file, form])

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
      description: 'Danh sách các chương đã được làm trống'
    })
  }

  const handleSelectChapters = (selectedChapters: any[]) => {
    if (!selectedChapters.length) return

    // Attach pricePerChapter from parent course
    const formattedChapters = selectedChapters.map((chapter) => {
      // Find parent course
      const parentCourse = courses.find((course) => course.chapters.some((c: any) => c.id === chapter.id))
      return {
        ...chapter,
        pricePerChapter: parentCourse?.pricePerChapter || 0,
        description: chapter.description || '',
        durations: chapter.durations || 0,
        durationsDisplay: chapter.durationsDisplay || '0',
        sequence: chapter.sequence || 0
      }
    })

    // Update state with all selected chapters
    setCustomCourse({
      chapters: formattedChapters
    })
  }

  const handleChaptersChange = (updatedChapters: Chapter[]) => {
    setCustomCourse({ chapters: updatedChapters })
  }

  const handleSubmit = async () => {
    if (!chapters.length) {
      toast({
        description: 'Bạn cần chọn nội dung cho khóa học của mình',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)

    try {
      if (createCourseCustomMutation.isPending) return

      let imageUrl = form.getValues('customImageUrl')

      if (file) {
        const formData = new FormData()
        formData.append('images', file)
        const result = await uploadImageMutation.mutateAsync(formData)

        if (Array.isArray(result.payload.data)) {
          imageUrl = result.payload.data[0]
        } else {
          imageUrl = result.payload.data
        }
      }

      const res = await createCourseCustomMutation.mutateAsync({
        chapterIds: chapters.map((chapter) => chapter.id),
        customTitle: form.getValues('customTitle'),
        customDescription: form.getValues('customDescription'),
        customImageUrl: imageUrl ?? ''
      })

      toast({
        description: res.payload.message
      })

      setCustomCourse({ chapters: [] })
      form.reset()
      setFile(null)
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='container py-8 space-y-6'>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' asChild>
          <Link href={configRoute.course}>
            <ArrowLeft className='w-4 h-4' />
          </Link>
        </Button>
        <div>
          <h1 className='text-2xl font-bold'>Tạo khóa học theo yêu cầu</h1>
          <p className='text-muted-foreground mt-1'>Tự do thiết kế nội dung học tập theo nhu cầu của bạn</p>
        </div>
      </div>

      <Breadcrumb
        className='pt-2'
        items={[
          { title: 'Khóa học', href: configRoute.course },
          { title: 'Tạo khóa học theo yêu cầu', href: configRoute.customCourse }
        ]}
      />

      <Alert variant='notification'>
        {/* <BookOpen className='h-4 w-4' /> */}
        <AlertTitle>Hướng dẫn sử dụng</AlertTitle>
        <AlertDescription>Chọn các chương từ các khóa học hiện có để tạo khóa học riêng của bạn.</AlertDescription>
      </Alert>

      <div className='grid md:grid-cols-3 gap-6'>
        <div className='md:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khóa học</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
                  <div className='flex items-center gap-8 pb-8 mb-8 border-b'>
                    <div className='relative group'>
                      {previewImage ? (
                        <Avatar className='w-28 h-28 rounded-2xl border-2 border-primary/10 ring-4 ring-primary/5'>
                          <AvatarImage src={previewImage} className='object-cover' />
                        </Avatar>
                      ) : (
                        <div className='w-28 h-28 rounded-2xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-2 bg-primary/5'>
                          <ImageIcon className='w-8 h-8 text-primary/40' />
                        </div>
                      )}
                      <Button
                        type='button'
                        size='sm'
                        onClick={() => inputRef.current?.click()}
                        className='absolute -bottom-2 -right-2 rounded-xl w-9 h-9 p-0 
                          bg-white shadow-lg border-2 border-primary/10 text-primary 
                          hover:bg-primary/5 hover:scale-105 transition-all duration-200'
                      >
                        <Upload className='w-4 h-4' />
                      </Button>
                      <Input
                        className='hidden'
                        type='file'
                        accept='image/*'
                        ref={inputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setFile(file)
                            form.setValue('customImageUrl', 'http://localhost:3000/' + file.name)
                          }
                        }}
                      />
                    </div>
                    <div>
                      <h4 className='text-xl font-semibold text-gray-900'>Hình ảnh khóa học</h4>
                      <p className='text-sm text-gray-500 mt-1.5 leading-relaxed'>
                        Thêm hình ảnh để tạo ấn tượng cho khóa học của bạn.
                        <br />
                        Nên là ảnh vuông, định dạng PNG hoặc JPG và không quá 1MB.
                      </p>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name='customTitle'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên khóa học</FormLabel>
                        <FormControl>
                          <Input placeholder='Nhập tên khóa học' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='customDescription'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả khóa học</FormLabel>
                        <FormControl>
                          <Textarea placeholder='Nhập mô tả khóa học' className='min-h-[100px]' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>

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
              <h3 className='font-medium mb-3'>Thứ tự các chương & Giá</h3>
              <ScrollArea className='h-[200px]'>
                <div className='space-y-2 text-sm pr-4'>
                  {chapters.map((chapter, index) => (
                    <div key={chapter.id} className='flex gap-2 items-center justify-between'>
                      <div className='flex gap-2'>
                        <span className='text-muted-foreground min-w-[20px]'>{index + 1}.</span>
                        <div>
                          <div>{chapter.title}</div>
                          <div className='text-muted-foreground text-xs'>{chapter.lessons?.length || 0} bài học</div>
                        </div>
                      </div>
                      <span className='text-primary font-semibold whitespace-nowrap'>
                        {chapter.pricePerChapter
                          ? chapter.pricePerChapter.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                          : '0₫'}
                      </span>
                    </div>
                  ))}
                  {chapters.length === 0 && (
                    <div className='text-muted-foreground italic'>Chưa có chương nào được thêm vào</div>
                  )}
                </div>
              </ScrollArea>
              <div className='flex justify-between items-center mt-4 pt-2 border-t'>
                <span className='font-medium'>Tổng tiền</span>
                <span className='text-lg text-primary font-bold'>
                  {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
              </div>
            </div>

            <Button
              className='w-full'
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isSubmitting || chapters.length === 0}
            >
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
                'Tạo khóa học'
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
