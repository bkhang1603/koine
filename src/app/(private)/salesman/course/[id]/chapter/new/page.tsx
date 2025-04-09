'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save, Loader2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useState, use } from 'react'
import { useCreateChapterMutation } from '@/queries/useCourse'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: 'Tiêu đề phải có ít nhất 3 ký tự' }),
  description: z.string().min(10, { message: 'Mô tả phải có ít nhất 10 ký tự' })
})

type FormValues = z.infer<typeof formSchema>

export default function NewChapterPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const router = useRouter()
  const createChapterMutation = useCreateChapterMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Setup form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      await createChapterMutation.mutateAsync({
        ...values,
        courseId: params.id
      })

      toast({
        title: 'Tạo chương thành công',
        description: 'Chương mới đã được tạo',
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
        <span className='font-medium text-foreground'>Tạo chương mới</span>
      </nav>

      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Tạo chương mới</h1>
          <p className='text-sm text-muted-foreground mt-1'>Thêm chương mới vào khóa học</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button type='submit' disabled={isSubmitting} onClick={form.handleSubmit(onSubmit)}>
            {isSubmitting ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className='mr-2 h-4 w-4' />
                Lưu chương
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
