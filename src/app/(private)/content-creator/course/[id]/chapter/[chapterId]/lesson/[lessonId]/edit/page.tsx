'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, ChevronRight, Loader2, Save, Upload, Video, FileText } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRef, useState, use, useEffect } from 'react'
import { useUploadVideoMutation } from '@/queries/useUpload'
import { Skeleton } from '@/components/ui/skeleton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import RichTextEditor from '@/components/rich-text-editor'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { useGetLessonQuery, useUpdateLessonMutation } from '@/queries/useCourse'
import { TypeResourceValues } from '@/constants/type'
import { cn } from '@/lib/utils'
import { UpdateLessonBodyType } from '@/schemaValidations/course.schema'

// Form validation schema
const formSchema = z.object({
  title: z.string().min(5, { message: 'Tiêu đề phải có ít nhất 5 ký tự' }),
  description: z.string().min(10, { message: 'Mô tả phải có ít nhất 10 ký tự' }),
  type: z.enum(TypeResourceValues, {
    required_error: 'Vui lòng chọn kiểu bài học'
  }),
  content: z.string().min(50, { message: 'Nội dung phải có ít nhất 50 ký tự' }).optional().nullable(),
  videoUrl: z.string().url({ message: 'URL video không hợp lệ' }).optional().nullable(),
  durations: z.number().min(0, { message: 'Thời lượng không được âm' })
})

type FormValues = z.infer<typeof formSchema>

export default function EditLessonPage(props: {
  params: Promise<{ id: string; chapterId: string; lessonId: string }>
}) {
  const params = use(props.params)
  const router = useRouter()

  const { data: lessonData, isLoading: isLoadingLesson } = useGetLessonQuery({
    id: params.lessonId,
    enabled: true
  })

  const updateLessonMutation = useUpdateLessonMutation({
    id: params.lessonId,
    chapterId: params.chapterId
  })
  const uploadVideoMutation = useUploadVideoMutation()

  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'DOCUMENT',
      content: '',
      videoUrl: null,
      durations: 0
    }
  })

  const lessonType = form.watch('type')

  const VideoPreview = ({ src, className }: { src: string | null; className?: string }) => {
    if (!src) return null

    return (
      <div className={cn('aspect-video w-full max-w-[500px] rounded-md overflow-hidden bg-muted', className)}>
        <video className='w-full h-full object-cover' src={src} controls preload='metadata'>
          <track kind='captions' />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  useEffect(() => {
    if (lessonData?.payload?.data) {
      const lesson = lessonData.payload.data
      form.reset({
        title: lesson.title,
        description: lesson.description,
        type: lesson.type,
        content: lesson.content,
        videoUrl: lesson.videoUrl,
        durations: lesson.durations
      })

      if (lesson.videoUrl) {
        setVideoPreview(lesson.videoUrl)
      }
    }
  }, [lessonData, form])

  const handleVideoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: 'Lỗi tải video',
          description: 'Kích thước video không được vượt quá 100MB',
          variant: 'destructive'
        })
        return
      }

      if (!file.type.startsWith('video/')) {
        toast({
          title: 'Lỗi tải video',
          description: 'Vui lòng chọn file video hợp lệ',
          variant: 'destructive'
        })
        return
      }

      setVideoFile(file)
      const videoUrl = URL.createObjectURL(file)
      setVideoPreview(videoUrl)

      toast({
        title: 'Đã chọn video',
        description: `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)}MB)`
      })
    }
  }

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      let finalVideoUrl: string | null = values.videoUrl || null

      if (videoFile && (values.type === 'VIDEO' || values.type === 'BOTH')) {
        const formData = new FormData()
        formData.append('videos', videoFile)

        toast({
          title: 'Đang tải video lên S3',
          description: `${videoFile.name} - Đang xử lý... Vui lòng đợi trong giây lát`,
          duration: 5000
        })

        try {
          const uploadResult = await uploadVideoMutation.mutateAsync(formData)

          if (!uploadResult?.payload?.data) {
            throw new Error('Không nhận được URL video từ server')
          }

          finalVideoUrl = Array.isArray(uploadResult.payload.data)
            ? uploadResult.payload.data[0]
            : uploadResult.payload.data

          toast({
            title: 'Tải video thành công',
            description: 'Video đã được tải lên S3 thành công',
            duration: 3000,
            variant: 'default'
          })
        } catch (uploadError) {
          handleErrorApi({
            error: uploadError,
            setError: form.setError
          })

          toast({
            title: 'Lỗi tải video',
            description: 'Không thể tải video lên S3. Vui lòng thử lại.',
            variant: 'destructive'
          })

          throw uploadError
        }
      }

      let finalContent: string | null = null

      if (values.type === 'DOCUMENT' || values.type === 'BOTH') {
        finalContent = values.content || ''
      }

      if (values.type === 'DOCUMENT') {
        finalVideoUrl = null
      }

      const submissionData: UpdateLessonBodyType = {
        title: values.title,
        description: values.description,
        type: values.type,
        content: finalContent,
        videoUrl: finalVideoUrl,
        durations: values.durations
      }

      await updateLessonMutation.mutateAsync(submissionData)

      toast({
        title: 'Cập nhật bài học thành công',
        description: 'Bài học đã được cập nhật',
        variant: 'default'
      })

      router.push(`/content-creator/course/${params.id}/chapter/${params.chapterId}/lesson/${params.lessonId}`)
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingLesson) {
    return (
      <div className='container max-w-4xl mx-auto px-4 py-6'>
        <Skeleton className='h-8 w-48 mb-6' />
        <div className='flex justify-between items-center mb-6'>
          <div>
            <Skeleton className='h-8 w-64 mb-2' />
            <Skeleton className='h-4 w-48' />
          </div>
          <div className='flex items-center gap-4'>
            <Skeleton className='h-10 w-24' />
            <Skeleton className='h-10 w-32' />
          </div>
        </div>
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-40' />
            </CardHeader>
            <CardContent className='space-y-6'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-24 w-full' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-40' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-64 w-full' />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!lessonData?.payload?.data && !isLoadingLesson) {
    return (
      <div className='container max-w-4xl mx-auto px-4 py-6'>
        <Button variant='outline' asChild className='mb-6'>
          <Link href={`/content-creator/course/${params.id}/chapter/${params.chapterId}`}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Quay lại danh sách bài học
          </Link>
        </Button>
        <Card className='p-8 text-center'>
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold'>Không tìm thấy bài học</h2>
            <p className='text-muted-foreground'>Bài học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button asChild className='mt-4'>
              <Link href={`/content-creator/course/${params.id}/chapter/${params.chapterId}`}>
                Quay lại danh sách bài học
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const isLoading = uploadVideoMutation.isPending || updateLessonMutation.isPending || isSubmitting

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      <nav className='flex items-center space-x-1 text-sm text-muted-foreground mb-6'>
        <Link href='/content-creator/course' className='hover:text-primary transition-colors'>
          Khóa học
        </Link>
        <ChevronRight className='h-4 w-4' />
        <Link href={`/content-creator/course/${params.id}`} className='hover:text-primary transition-colors'>
          Chi tiết khóa học
        </Link>
        <ChevronRight className='h-4 w-4' />
        <Link
          href={`/content-creator/course/${params.id}/chapter/${params.chapterId}`}
          className='hover:text-primary transition-colors'
        >
          Chi tiết chương
        </Link>
        <ChevronRight className='h-4 w-4' />
        <Link
          href={`/content-creator/course/${params.id}/chapter/${params.chapterId}/lesson/${params.lessonId}`}
          className='hover:text-primary transition-colors'
        >
          Chi tiết bài học
        </Link>
        <ChevronRight className='h-4 w-4' />
        <span className='font-medium text-foreground'>Chỉnh sửa</span>
      </nav>

      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Chỉnh sửa bài học</h1>
          <p className='text-sm text-muted-foreground mt-1'>Cập nhật nội dung bài học</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='outline' asChild>
            <Link href={`/content-creator/course/${params.id}/chapter/${params.chapterId}/lesson/${params.lessonId}`}>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Quay lại
            </Link>
          </Button>
          <Button type='submit' disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className='mr-2 h-4 w-4' />
                Lưu thay đổi
              </>
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin bài học</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại bài học</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn loại bài học' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='DOCUMENT'>
                          <div className='flex items-center'>
                            <FileText className='w-4 h-4 mr-2 text-green-500' />
                            Bài đọc
                          </div>
                        </SelectItem>
                        <SelectItem value='VIDEO'>
                          <div className='flex items-center'>
                            <Video className='w-4 h-4 mr-2 text-blue-500' />
                            Video
                          </div>
                        </SelectItem>
                        <SelectItem value='BOTH'>
                          <div className='flex items-center'>
                            <FileText className='w-4 h-4 mr-2 text-purple-500' />
                            Video & Bài đọc
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tiêu đề bài học' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả ngắn</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Nhập mô tả ngắn về bài học' className='min-h-24' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='durations'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thời lượng (giây)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Nhập thời lượng bài học'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className={cn({ 'opacity-60': lessonType === 'DOCUMENT' })}>
            <CardHeader className='flex flex-row items-center'>
              <div className='flex items-center gap-2'>
                <Video className='h-5 w-5 text-blue-500' />
                <CardTitle>Nội dung Video</CardTitle>
              </div>
              {lessonType === 'DOCUMENT' && (
                <div className='ml-auto text-sm text-muted-foreground bg-muted px-2.5 py-0.5 rounded'>
                  Không khả dụng
                </div>
              )}
            </CardHeader>

            <CardContent className='space-y-6'>
              <div className='flex flex-col gap-4'>
                {videoPreview && (
                  <div className='flex flex-col gap-2'>
                    <h3 className='text-sm font-medium'>Xem trước video</h3>
                    <VideoPreview src={videoPreview} />
                  </div>
                )}

                <div className='flex flex-col gap-2'>
                  <FormLabel>Tải lên video</FormLabel>
                  <div className='flex flex-col sm:flex-row gap-4 items-start'>
                    <div className='flex flex-col gap-2 w-full sm:w-auto'>
                      <Input
                        className='hidden'
                        type='file'
                        accept='video/*'
                        ref={videoInputRef}
                        onChange={handleVideoChange}
                        disabled={lessonType === 'DOCUMENT'}
                      />
                      <Button
                        type='button'
                        variant='outline'
                        onClick={() => videoInputRef.current?.click()}
                        disabled={lessonType === 'DOCUMENT'}
                        className='flex gap-2 items-center w-full sm:w-auto'
                      >
                        <Upload className='h-4 w-4' />
                        Tải video lên
                      </Button>
                      <p className='text-xs text-muted-foreground'>Hỗ trợ MP4, WebM, Ogg. Kích thước tối đa 100MB.</p>
                    </div>

                    {videoFile && (
                      <div className='flex items-center gap-2 border rounded-md p-2 flex-1'>
                        <Video className='w-10 h-10 text-primary shrink-0' />
                        <div className='text-sm overflow-hidden'>
                          <p className='font-medium text-primary truncate'>{videoFile.name}</p>
                          <p className='text-muted-foreground'>{(videoFile.size / (1024 * 1024)).toFixed(2)}MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cn({ 'opacity-60': lessonType === 'VIDEO' })}>
            <CardHeader className='flex flex-row items-center'>
              <div className='flex items-center gap-2'>
                <FileText className='h-5 w-5 text-green-500' />
                <CardTitle>Nội dung Bài đọc</CardTitle>
              </div>
              {lessonType === 'VIDEO' && (
                <div className='ml-auto text-sm text-muted-foreground bg-muted px-2.5 py-0.5 rounded'>
                  Không khả dụng
                </div>
              )}
            </CardHeader>

            <CardContent>
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RichTextEditor
                        content={field.value || ''}
                        onChange={(value) => field.onChange(lessonType === 'VIDEO' ? '' : value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
