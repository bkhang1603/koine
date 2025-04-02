'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Upload, Save, Loader2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { MultiSelect } from '@/components/ui/multi-select'
import { useState, useRef, use, useEffect } from 'react'
import { useBlogDetailQuery, useBlogUpdateMutation, useCategoryBlogQuery } from '@/queries/useBlog'
import { useUploadImageMutation } from '@/queries/useUpload'
import { Skeleton } from '@/components/ui/skeleton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { handleErrorApi } from '@/lib/utils'
import RichTextEditor from '@/components/rich-text-editor'
import { toast } from '@/components/ui/use-toast'

// Form validation schema
const formSchema = z.object({
  title: z.string().min(5, { message: 'Tiêu đề phải có ít nhất 5 ký tự' }),
  description: z.string().min(10, { message: 'Mô tả phải có ít nhất 10 ký tự' }),
  content: z.string().min(50, { message: 'Nội dung phải có ít nhất 50 ký tự' }),
  categoryIds: z.array(z.string()).min(1, { message: 'Vui lòng chọn ít nhất 1 danh mục' }),
  imageUrl: z.string().url({ message: 'URL hình ảnh không hợp lệ' }).or(z.string().length(0))
})

type FormValues = z.infer<typeof formSchema>

export default function EditBlogPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const router = useRouter()

  const { data: blogData, isLoading: isBlogLoading } = useBlogDetailQuery({ id: params.id })
  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategoryBlogQuery({
    page_index: 1,
    page_size: 99
  })
  const updateBlogMutation = useBlogUpdateMutation({ id: params.id })
  const uploadMutation = useUploadImageMutation()

  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const post = blogData?.payload.data
  const categories = categoriesData?.payload.data || []

  // Setup form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      categoryIds: [],
      imageUrl: ''
    }
  })

  // Load blog data into form when available
  useEffect(() => {
    if (post) {
      // Đảm bảo reset form với tất cả dữ liệu, đặc biệt là content
      form.reset({
        title: post.title,
        description: post.description,
        content: post.content,
        categoryIds: post.categories.map((cat) => cat.id),
        imageUrl: post.imageUrl
      })
      setPreview(post.imageUrl)

      // Log để debug
      console.log('Loaded content:', post.content)
    }
  }, [post, form])

  // Handle file upload for image
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      const imageUrl = URL.createObjectURL(file)
      setPreview(imageUrl)
      form.setValue('imageUrl', imageUrl, { shouldValidate: true })
    }
  }

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      // Upload image if present - logic giống với màn hình new
      if (file) {
        const formData = new FormData()
        formData.append('images', file)

        toast({
          title: 'Đang tải ảnh lên',
          description: 'Vui lòng đợi trong giây lát...'
        })

        try {
          const uploadResult = await uploadMutation.mutateAsync(formData)

          if (uploadResult?.payload?.data) {
            // Đảm bảo imageUrl luôn là string dù API trả về mảng hay string đơn lẻ
            const imageUrl = Array.isArray(uploadResult.payload.data)
              ? uploadResult.payload.data[0] // Lấy phần tử đầu tiên nếu là mảng
              : uploadResult.payload.data // Sử dụng nguyên nếu là string

            // Update imageUrl với URL thực từ server
            values.imageUrl = imageUrl
          } else {
            throw new Error('Không thể tải hình ảnh lên')
          }
        } catch (uploadError) {
          toast({
            title: 'Lỗi tải ảnh',
            description: 'Không thể tải ảnh lên. Vui lòng thử lại.',
            variant: 'destructive'
          })
          throw uploadError // Rethrow to stop the submission process
        }
      }

      await updateBlogMutation.mutateAsync({
        ...values
      })

      toast({
        title: 'Cập nhật thành công',
        description: 'Bài viết đã được cập nhật',
        variant: 'default'
      })

      router.push(`/admin/blog/${params.id}`)
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Convert categories for MultiSelect component
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name
  }))

  // Loading state
  if (isBlogLoading || isCategoriesLoading) {
    return (
      <div className='container max-w-4xl mx-auto px-4 py-6 space-y-8'>
        <Skeleton className='h-10 w-32' />
        <Skeleton className='h-8 w-64' />
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-40' />
            </CardHeader>
            <CardContent className='space-y-6'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-24 w-full' />
              <Skeleton className='h-64 w-full' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-40' />
            </CardHeader>
            <CardContent className='space-y-6'>
              <Skeleton className='h-24 w-full' />
              <Skeleton className='h-10 w-full' />
            </CardContent>
          </Card>
          <div className='flex justify-end gap-4'>
            <Skeleton className='h-10 w-24' />
            <Skeleton className='h-10 w-32' />
          </div>
        </div>
      </div>
    )
  }

  if (!post && !isBlogLoading) {
    return (
      <div className='container max-w-4xl mx-auto px-4 py-6'>
        <Button variant='ghost' asChild className='mb-6'>
          <Link href='/admin/blog'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Quay lại
          </Link>
        </Button>
        <Card className='p-8 text-center'>
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold'>Không tìm thấy bài viết</h2>
            <p className='text-muted-foreground'>Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button asChild className='mt-4'>
              <Link href='/admin/blog'>Quay lại danh sách bài viết</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const isLoading = uploadMutation.isPending || updateBlogMutation.isPending || isSubmitting

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      {/* Breadcrumb */}
      <nav className='flex items-center space-x-1 text-sm text-muted-foreground mb-6'>
        <Link href='/admin/blog' className='hover:text-primary transition-colors'>
          Blog
        </Link>
        <ChevronRight className='h-4 w-4' />
        <Link href={`/admin/blog/${params.id}`} className='hover:text-primary transition-colors max-w-[200px] truncate'>
          {post?.title || 'Chi tiết'}
        </Link>
        <ChevronRight className='h-4 w-4' />
        <span className='font-medium text-foreground'>Chỉnh sửa</span>
      </nav>

      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Chỉnh sửa bài viết</h1>
          <p className='text-sm text-muted-foreground mt-1'>Cập nhật nội dung bài viết của bạn</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Hủy thay đổi
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
          {/* Main Content */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin bài viết</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Image Field - Di chuyển lên đầu */}
              <FormField
                control={form.control}
                name='imageUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh bài viết</FormLabel>
                    <FormControl>
                      <div className='flex gap-2 items-start justify-start'>
                        <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                          <AvatarImage src={preview || field.value} />
                          <AvatarFallback className='rounded-none'>Ảnh</AvatarFallback>
                        </Avatar>
                        <Input
                          className='hidden'
                          type='file'
                          accept='image/*'
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                        <button
                          className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
                          type='button'
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className='h-4 w-4 text-muted-foreground' />
                          <span className='sr-only'>Tải ảnh lên</span>
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Categories Field - Di chuyển lên */}
              <FormField
                control={form.control}
                name='categoryIds'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={categoryOptions}
                        placeholder='Chọn danh mục'
                        selected={field.value.map((id) => {
                          const category = categoryOptions.find((cat) => cat.value === id)
                          return category || { value: id, label: id }
                        })}
                        onChange={(selected) => {
                          field.onChange(selected.map((item) => item.value))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title Field */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tiêu đề bài viết' {...field} />
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
                    <FormLabel>Mô tả ngắn</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Nhập mô tả ngắn về bài viết' className='min-h-24' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content Field */}
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nội dung bài viết</FormLabel>
                    <FormControl>
                      <RichTextEditor content={field.value} onChange={field.onChange} />
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
