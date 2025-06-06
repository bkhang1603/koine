import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload, Save, Loader2 } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { MultiSelect } from '@/components/ui/multi-select'
import { useState, useRef, useEffect } from 'react'
import { useUploadImageMutation } from '@/queries/useUpload'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreateCourseBodyType, createCourseBody } from '@/schemaValidations/course.schema'

// Course level options
const levelOptions = [
  { value: 'ALL', label: 'Tất cả' },
  { value: 'BEGINNER', label: 'Người mới bắt đầu' },
  { value: 'INTERMEDIATE', label: 'Trung cấp' },
  { value: 'ADVANCED', label: 'Nâng cao' }
]

// Age stage options
const ageStageOptions = [
  { value: '3-6', label: '3-6 tuổi' },
  { value: '7-9', label: '7-9 tuổi' },
  { value: '10-12', label: '10-12 tuổi' },
  { value: '13-15', label: '13-15 tuổi' },
  { value: '16-18', label: '16-18 tuổi' },
  { value: '18+', label: 'Từ 18 tuổi trở lên' }
]

interface CourseEditFormProps {
  course: any
  categoryOptions: { value: string; label: string }[]
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: CreateCourseBodyType) => Promise<void>
  isLoading: boolean
}

export function CourseEditForm({ course, categoryOptions, onSubmit, isLoading }: CourseEditFormProps) {
  const uploadMutation = useUploadImageMutation()

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)

  // Setup form with default values
  const form = useForm<CreateCourseBodyType>({
    resolver: zodResolver(createCourseBody),
    defaultValues: {
      title: '',
      description: '',
      categoryIds: [],
      imageUrl: '',
      imageBanner: '',
      price: 0,
      discount: 0,
      level: 'ALL',
      ageStage: '18+'
    }
  })

  // Load course data into form when available
  useEffect(() => {
    if (course) {
      form.reset({
        title: course.title,
        description: course.description,
        categoryIds: course.categories.map((cat: any) => cat.id),
        imageUrl: course.imageUrl,
        imageBanner: course.imageBanner,
        level: course.level,
        ageStage: course?.ageStage || '18+',
        price: course.price || 0,
        discount: course.discount || 0
      })
      setThumbnailPreview(course.imageUrl)
      setBannerPreview(course.imageBanner)
    }
  }, [course, form])

  // Handle file upload for thumbnail
  const handleThumbnailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      const imageUrl = URL.createObjectURL(file)
      setThumbnailPreview(imageUrl)
      form.setValue('imageUrl', imageUrl, { shouldValidate: true })
    }
  }

  // Handle file upload for banner
  const handleBannerChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setBannerFile(file)
      const imageUrl = URL.createObjectURL(file)
      setBannerPreview(imageUrl)
      form.setValue('imageBanner', imageUrl, { shouldValidate: true })
    }
  }

  // Handle form submission
  const handleSubmit = async (values: CreateCourseBodyType) => {
    try {
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
              ? uploadResult.payload.data[0] // Lấy phần tử đầu tiên nếu là mảng
              : uploadResult.payload.data // Sử dụng nguyên nếu là string

            // Update imageUrl với URL thực từ server
            values.imageUrl = imageUrl
          } else {
            throw new Error('Không thể tải hình ảnh lên')
          }
        } catch (uploadError) {
          toast({
            title: 'Lỗi tải ảnh thumbnail',
            description: 'Không thể tải ảnh lên. Vui lòng thử lại.',
            variant: 'destructive'
          })
          throw uploadError // Rethrow to stop the submission process
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
              ? uploadResult.payload.data[0] // Lấy phần tử đầu tiên nếu là mảng
              : uploadResult.payload.data // Sử dụng nguyên nếu là string

            // Update imageBanner với URL thực từ server
            values.imageBanner = imageBanner
          } else {
            throw new Error('Không thể tải hình ảnh lên')
          }
        } catch (uploadError) {
          toast({
            title: 'Lỗi tải ảnh banner',
            description: 'Không thể tải ảnh lên. Vui lòng thử lại.',
            variant: 'destructive'
          })
          throw uploadError // Rethrow to stop the submission process
        }
      }

      // Pass the values to the parent's submit handler
      await onSubmit({
        ...values,
        // Maintain existing price and discount values
        price: course?.price || 0,
        discount: course?.discount || 0
      })
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
      throw error
    }
  }

  return (
    <Form {...form}>
      <form id='courseEditForm' onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin khóa học</CardTitle>
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

            {/* Age Stage Field */}
            <FormField
              control={form.control}
              name='ageStage'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Độ tuổi</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn độ tuổi phù hợp' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ageStageOptions.map((option) => (
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

        {/* Submit Button */}
        <div className='flex justify-end gap-4'>
          <Button type='submit' disabled={isLoading}>
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
      </form>
    </Form>
  )
}
