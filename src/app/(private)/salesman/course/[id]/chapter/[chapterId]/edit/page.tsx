'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save, Loader2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useState, use, useEffect } from 'react'
import { useUpdateChapterMutation, useGetChaptersQuery } from '@/queries/useCourse'
import { Skeleton } from '@/components/ui/skeleton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import { UpdateChapterBodyType } from '@/schemaValidations/course.schema'
import { updateChapterSchema } from '@/schemaValidations/course.schema'

type FormValues = UpdateChapterBodyType

export default function EditChapterPage(props: { params: Promise<{ id: string; chapterId: string }> }) {
  const params = use(props.params)
  const router = useRouter()
  const updateChapterMutation = useUpdateChapterMutation({ id: params.chapterId, courseId: params.id })
  const { data: chaptersData, isLoading: isLoadingChapters } = useGetChaptersQuery({ id: params.id })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Find the specific chapter from the chapters data
  const chapter = chaptersData?.payload?.data?.find((ch) => ch.id === params.chapterId)

  // Setup form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(updateChapterSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  // Load chapter data into form when available
  useEffect(() => {
    if (chapter) {
      form.reset({
        title: chapter.title,
        description: chapter.description
      })
    }
  }, [chapter, form])

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      await updateChapterMutation.mutateAsync(values)

      toast({
        title: 'Cập nhật thành công',
        description: 'Chương đã được cập nhật',
        variant: 'default'
      })

      router.push(`/content-creator/course/${params.id}`)
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingChapters) {
    return (
      <div className='container max-w-4xl mx-auto px-4 py-6'>
        <Skeleton className='h-8 w-48 mb-6' />
        <Skeleton className='h-10 w-full mb-6' />
        <Skeleton className='h-64 w-full' />
      </div>
    )
  }

  if (!chapter) {
    return (
      <div className='container max-w-4xl mx-auto px-4 py-6'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-2'>Không tìm thấy chương</h2>
          <p className='text-muted-foreground mb-6'>Chương này không tồn tại hoặc đã bị xóa</p>
          <Button asChild>
            <Link href={`/content-creator/course/${params.id}`}>Quay lại khóa học</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      {/* Breadcrumb */}
      <nav className='flex items-center space-x-1 text-sm text-muted-foreground mb-6'>
        <Link href='/content-creator/course' className='hover:text-primary transition-colors'>
          Khóa học
        </Link>
        <ChevronRight className='h-4 w-4' />
        <Link href={`/content-creator/course/${params.id}`} className='hover:text-primary transition-colors'>
          Chi tiết
        </Link>
        <ChevronRight className='h-4 w-4' />
        <span className='font-medium text-foreground'>Chỉnh sửa chương</span>
      </nav>

      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Chỉnh sửa chương</h1>
          <p className='text-sm text-muted-foreground mt-1'>Cập nhật thông tin chương</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Hủy thay đổi
          </Button>
          <Button type='submit' disabled={isSubmitting} onClick={form.handleSubmit(onSubmit)}>
            {isSubmitting ? (
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
          {/* Main Content */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chương</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Title Field */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tiêu đề chương' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Nhập mô tả chương' className='min-h-24' {...field} />
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
