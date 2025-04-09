'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload, Loader2, Save } from 'lucide-react'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUploadImageMutation } from '@/queries/useUpload'
import { useAddCourseMutation, useGetCategoryCoursesQuery } from '@/queries/useCourse'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { MultiSelect } from '@/components/ui/multi-select'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreateCourseBodyType, createCourseBody } from '@/schemaValidations/course.schema'

// LocalStorage key for saving draft
const COURSE_DRAFT_KEY = 'course_draft_data'

// Course level options
const levelOptions = [
  { value: 'ALL', label: 'Tất cả' },
  { value: 'BEGINNER', label: 'Cơ bản' },
  { value: 'INTERMEDIATE', label: 'Trung bình' },
  { value: 'ADVANCED', label: 'Nâng cao' }
]

interface NewCoursePageProps {
  localDraft: any | null
  baseUrl: string
}

export default function NewCoursePage({ localDraft, baseUrl }: NewCoursePageProps) {
  const router = useRouter()
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const uploadMutation = useUploadImageMutation()
  const createCourseMutation = useAddCourseMutation()

  const { data: categoriesResponse } = useGetCategoryCoursesQuery({
    page_index: 1,
    page_size: 99
  })
  const categories = categoriesResponse?.payload?.data || []

  // Initialize the form with React Hook Form
  const form = useForm<CreateCourseBodyType>({
    resolver: zodResolver(createCourseBody),
    defaultValues: {
      title: localDraft?.title || '',
      description: localDraft?.description || '',
      categoryIds: localDraft?.categoryIds || [],
      imageUrl: localDraft?.imageUrl || '',
      imageBanner: localDraft?.imageBanner || '',
      price: 0,
      discount: 0,
      level: localDraft?.level || 'ALL'
    }
  })

  // Manual save draft button handler
  const saveDraft = () => {
    const values = form.getValues()
    localStorage.setItem(COURSE_DRAFT_KEY, JSON.stringify(values))
    toast({
      title: 'Đã lưu',
      description: 'Khóa học của bạn đã được lưu vào bộ nhớ cục bộ'
    })
  }

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      const imageUrl = URL.createObjectURL(file)
      setThumbnailPreview(imageUrl)
      form.setValue('imageUrl', imageUrl, { shouldValidate: true })
    }
  }

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setBannerFile(file)
      const imageUrl = URL.createObjectURL(file)
      setBannerPreview(imageUrl)
      form.setValue('imageBanner', imageUrl, { shouldValidate: true })
    }
  }

  const onSubmit = async (data: CreateCourseBodyType) => {
    try {
      setIsSubmitting(true)

      // Upload thumbnail if present
      if (thumbnailFile) {
        const formData = new FormData()
        formData.append('images', thumbnailFile)

        toast({
          title: 'Đang tải ảnh thumbnail lên',
          description: 'Vui lòng đợi trong giây lát...'
        })

        try {
          const uploadResult = await uploadMutation.mutateAsync(formData)

          if (uploadResult?.payload?.data) {
            // Đảm bảo imageUrl luôn là string dù API trả về mảng hay string đơn lẻ
            const imageUrl = Array.isArray(uploadResult.payload.data)
              ? uploadResult.payload.data[0]
              : uploadResult.payload.data

            // Update imageUrl với URL thực từ server
            data.imageUrl = imageUrl
          } else {
            throw new Error('Không thể tải hình ảnh lên')
          }
        } catch (uploadError) {
          toast({
            title: 'Lỗi tải ảnh thumbnail',
            description: 'Không thể tải ảnh lên. Vui lòng thử lại.',
            variant: 'destructive'
          })
          throw uploadError
        }
      }

      // Upload banner if present
      if (bannerFile) {
        const formData = new FormData()
        formData.append('images', bannerFile)

        toast({
          title: 'Đang tải ảnh banner lên',
          description: 'Vui lòng đợi trong giây lát...'
        })

        try {
          const uploadResult = await uploadMutation.mutateAsync(formData)

          if (uploadResult?.payload?.data) {
            // Đảm bảo imageUrl luôn là string dù API trả về mảng hay string đơn lẻ
            const imageBanner = Array.isArray(uploadResult.payload.data)
              ? uploadResult.payload.data[0]
              : uploadResult.payload.data

            // Update imageBanner với URL thực từ server
            data.imageBanner = imageBanner
          } else {
            throw new Error('Không thể tải hình ảnh lên')
          }
        } catch (uploadError) {
          toast({
            title: 'Lỗi tải ảnh banner',
            description: 'Không thể tải ảnh lên. Vui lòng thử lại.',
            variant: 'destructive'
          })
          throw uploadError
        }
      }

      // Create course
      await createCourseMutation.mutateAsync({
        title: data.title,
        description: data.description,
        categoryIds: data.categoryIds,
        imageUrl: data.imageUrl,
        imageBanner: data.imageBanner,
        price: 0,
        discount: 0,
        level: data.level
      })

      // Clear draft from localStorage after successful submission
      localStorage.removeItem(COURSE_DRAFT_KEY)

      toast({
        title: 'Khóa học đã được tạo',
        description: 'Khóa học của bạn đã được tạo thành công'
      })

      router.push(baseUrl)
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoading = uploadMutation.isPending || createCourseMutation.isPending || isSubmitting

  return (
    <>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Tạo khóa học mới</h1>
          <p className='text-sm text-muted-foreground mt-1'>Thiết kế và xuất bản khóa học của bạn</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button type='button' variant='outline' onClick={saveDraft}>
            <Save className='mr-2 h-4 w-4' />
            Lưu nháp
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
                Tạo khóa học
              </>
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Thumbnail Field */}
              <FormField
                control={form.control}
                name='imageUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh thumbnail</FormLabel>
                    <FormControl>
                      <div className='flex gap-2 items-start justify-start'>
                        <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                          <AvatarImage src={thumbnailPreview || field.value} />
                          <AvatarFallback className='rounded-none'>Ảnh</AvatarFallback>
                        </Avatar>
                        <Input
                          className='hidden'
                          type='file'
                          accept='image/*'
                          ref={thumbnailInputRef}
                          onChange={handleThumbnailChange}
                        />
                        <button
                          className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
                          type='button'
                          onClick={() => thumbnailInputRef.current?.click()}
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

              {/* Banner Field */}
              <FormField
                control={form.control}
                name='imageBanner'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh banner</FormLabel>
                    <FormControl>
                      <div className='flex gap-2 items-start justify-start'>
                        <div className='relative w-[200px] h-[100px]'>
                          <Avatar className='w-full h-full rounded-md object-cover'>
                            <AvatarImage src={bannerPreview || field.value} className='object-cover' />
                            <AvatarFallback className='rounded-none w-full h-full'>Banner</AvatarFallback>
                          </Avatar>
                        </div>
                        <Input
                          className='hidden'
                          type='file'
                          accept='image/*'
                          ref={bannerInputRef}
                          onChange={handleBannerChange}
                        />
                        <button
                          className='flex h-[100px] w-[100px] items-center justify-center rounded-md border border-dashed'
                          type='button'
                          onClick={() => bannerInputRef.current?.click()}
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

              {/* Categories Field */}
              <FormField
                control={form.control}
                name='categoryIds'
                render={({ field }) => {
                  return (
                    <FormItem className='space-y-2'>
                      <FormLabel>Danh mục</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={categories.map((category) => ({
                            value: category.id,
                            label: category.name
                          }))}
                          placeholder='Chọn danh mục'
                          selected={field.value.map((id) => {
                            const category = categories.find((cat) => cat.id === id)
                            return category ? { value: category.id, label: category.name } : { value: id, label: id }
                          })}
                          onChange={(selected) => {
                            field.onChange(selected.map((item) => item.value))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              {/* Title Field */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tiêu đề khóa học' {...field} />
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
                      <Textarea placeholder='Mô tả chi tiết về khóa học' className='min-h-24' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Level Field */}
              <FormField
                control={form.control}
                name='level'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cấp độ</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn cấp độ khóa học' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {levelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  )
}
