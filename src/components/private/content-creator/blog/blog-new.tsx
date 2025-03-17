'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Upload, Loader2, Save } from 'lucide-react'
import Link from 'next/link'
import { blogCategories } from '@/app/(private)/content-creator/_mock/data'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import RichTextEditor from '@/components/rich-text-editor'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BlogBodyData, BlogDataResType } from '@/schemaValidations/blog.schema'
import { useUploadImageMutation } from '@/queries/useUpload'
import { useBlogCreateMutation } from '@/queries/useBlog'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

// LocalStorage key for saving draft
const BLOG_DRAFT_KEY = 'blog_draft_data'

export default function NewBlogPage({ localDraft }: { localDraft: BlogDataResType | null }) {
  const router = useRouter()
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const uploadMutation = useUploadImageMutation()
  const createBlogMutation = useBlogCreateMutation()

  // Initialize the form with React Hook Form
  const form = useForm<BlogDataResType>({
    resolver: zodResolver(BlogBodyData),
    defaultValues: {
      title: localDraft?.title || '',
      content: localDraft?.content || '',
      description: localDraft?.description || '',
      imageUrl: localDraft?.imageUrl || ''
    }
  })

  // Manual save draft button handler
  const saveDraft = () => {
    const values = form.getValues()
    localStorage.setItem(BLOG_DRAFT_KEY, JSON.stringify(values))
    toast({
      title: 'Đã lưu',
      description: 'Bài viết của bạn đã được lưu vào bộ nhớ cục bộ'
    })
  }

  const onSubmit = async (data: BlogDataResType) => {
    try {
      setIsSubmitting(true)

      // Upload image if present
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
            // Update imageUrl with the real URL from server
            data.imageUrl = uploadResult.payload.data
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

      // Create blog post - only send the 4 basic fields
      await createBlogMutation.mutateAsync({
        title: data.title,
        content: data.content,
        description: data.description,
        imageUrl: data.imageUrl
      })

      // Clear draft from localStorage after successful submission
      localStorage.removeItem(BLOG_DRAFT_KEY)

      toast({
        title: 'Bài viết đã được tạo',
        description: 'Bài viết của bạn đã được xuất bản thành công'
      })

      router.push('/content-creator/blog')
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoading = uploadMutation.isPending || createBlogMutation.isPending || isSubmitting

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      {/* Back Button */}
      <Button variant='ghost' asChild className='mb-6'>
        <Link href='/content-creator/blog'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Quay lại
        </Link>
      </Button>

      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Tạo bài viết mới</h1>
          <p className='text-sm text-muted-foreground mt-1'>Tạo và xuất bản bài viết của bạn</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='outline' onClick={saveDraft} disabled={isLoading}>
            {isLoading ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : <Save className='w-4 h-4 mr-2' />}
            Lưu nháp cục bộ
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : null}
            Xuất bản
          </Button>
        </div>
      </div>

      <Form {...form}>
        <div className='grid gap-6'>
          {/* Main Content */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin bài viết</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-sm font-medium'>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tiêu đề bài viết' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-sm font-medium'>Mô tả ngắn</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Nhập mô tả ngắn về bài viết' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-sm font-medium'>Nội dung</FormLabel>
                    <FormControl>
                      <RichTextEditor content={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt bài viết</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <FormField
                control={form.control}
                name='imageUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>Ảnh bài viết</FormLabel>
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
                          onChange={(e) => {
                            const selectedFile = e.target.files?.[0]
                            if (selectedFile) {
                              setFile(selectedFile)
                              const imageUrl = URL.createObjectURL(selectedFile)
                              setPreview(imageUrl)
                              // Set a temporary URL in the form field
                              field.onChange(imageUrl)
                            }
                          }}
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

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Danh mục</label>
                <Select
                  onValueChange={(value) => {
                    // Handle category selection manually
                    const formData = form.getValues()
                    const newData = {
                      ...formData,
                      categoryIds: [value]
                    }

                    // Store in localStorage with the manually added categoryIds
                    localStorage.setItem(BLOG_DRAFT_KEY, JSON.stringify(newData))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn danh mục' />
                  </SelectTrigger>
                  <SelectContent>
                    {blogCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </Form>
    </div>
  )
}
