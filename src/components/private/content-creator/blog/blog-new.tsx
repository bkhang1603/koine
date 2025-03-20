'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Upload, Loader2, Save } from 'lucide-react'
import Link from 'next/link'
import RichTextEditor from '@/components/rich-text-editor'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BlogBodyData, BlogDataResType } from '@/schemaValidations/blog.schema'
import { useUploadImageMutation } from '@/queries/useUpload'
import { useBlogCreateMutation, useCategoryBlogQuery } from '@/queries/useBlog'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

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

  const { data: categoriesResponse } = useCategoryBlogQuery()
  const categories = categoriesResponse?.payload?.data || []

  // Initialize the form with React Hook Form
  const form = useForm<BlogDataResType>({
    resolver: zodResolver(BlogBodyData),
    defaultValues: {
      title: localDraft?.title || '',
      content: localDraft?.content || '',
      description: localDraft?.description || '',
      imageUrl: localDraft?.imageUrl || '',
      categoryIds: localDraft?.categoryIds || []
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
            // Đảm bảo imageUrl luôn là string dù API trả về mảng hay string đơn lẻ
            const imageUrl = Array.isArray(uploadResult.payload.data)
              ? uploadResult.payload.data[0] // Lấy phần tử đầu tiên nếu là mảng
              : uploadResult.payload.data // Sử dụng nguyên nếu là string

            // Update imageUrl với URL thực từ server
            data.imageUrl = imageUrl
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
        imageUrl: data.imageUrl,
        categoryIds: data.categoryIds
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

              <FormField
                control={form.control}
                name='categoryIds'
                render={({ field }) => {
                  // Đảm bảo field.value luôn là mảng
                  const selectedIds = Array.isArray(field.value) ? field.value : []

                  // Tìm tên danh mục đã chọn để hiển thị
                  const selectedCategories = categories
                    .filter((cat) => selectedIds.includes(cat.id))
                    .map((cat) => ({ id: cat.id, name: cat.name }))

                  // Hàm xử lý khi chọn một danh mục
                  const handleSelect = (value: string) => {
                    // Nếu đã chọn rồi thì không làm gì
                    if (selectedIds.includes(value)) return

                    // Thêm vào danh sách đã chọn
                    field.onChange([...selectedIds, value])
                  }

                  // Hàm xử lý khi xóa một danh mục
                  const handleRemove = (id: string) => {
                    field.onChange(selectedIds.filter((catId) => catId !== id))
                  }

                  return (
                    <FormItem className='space-y-2'>
                      <FormLabel className='text-sm font-medium'>Danh mục</FormLabel>
                      <div className='space-y-2'>
                        <Select onValueChange={handleSelect}>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn danh mục' />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id}
                                disabled={selectedIds.includes(category.id)}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Hiển thị các thẻ đã chọn */}
                        <div className='flex flex-wrap gap-1 mt-2'>
                          {selectedCategories.map((category) => (
                            <Badge key={category.id} variant='secondary' className='px-2 py-1'>
                              {category.name}
                              <button
                                type='button'
                                onClick={() => handleRemove(category.id)}
                                className='ml-1 rounded-full outline-none hover:text-destructive'
                              >
                                <X className='h-3 w-3' />
                              </button>
                            </Badge>
                          ))}
                        </div>

                        <FormMessage />
                      </div>
                    </FormItem>
                  )
                }}
              />
            </CardContent>
          </Card>
        </div>
      </Form>
    </div>
  )
}
