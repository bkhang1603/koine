'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save, Loader2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useGetCategoryProductsQuery, useProductDetailAdminQuery, useUpdateProductMutation } from '@/queries/useProduct'
import { useUploadImageMutation } from '@/queries/useUpload'
import { Skeleton } from '@/components/ui/skeleton'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { CategorySelect } from './category-select'
import { ContentField } from './content-field'
import Image from 'next/image'
import { Upload } from 'lucide-react'

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm không được để trống'),
  description: z.string().min(1, 'Mô tả không được để trống'),
  detail: z.string().min(1, 'Chi tiết không được để trống'),
  guide: z.string().min(1, 'Hướng dẫn không được để trống'),
  price: z.number().min(0, 'Giá không được âm'),
  stockQuantity: z.number().min(0, 'Số lượng không được âm'),
  discount: z.number().min(0, 'Giảm giá không được âm').max(100, 'Giảm giá không được quá 100%'),
  imageUrlArray: z.array(z.string()).min(1, 'Phải có ít nhất 1 hình ảnh'),
  categoryIds: z.array(z.string()).min(1, 'Phải chọn ít nhất 1 danh mục')
})

type FormValues = z.infer<typeof formSchema>

interface ProductEditProps {
  productId: string
  baseUrl: string // Used for navigation after edit, e.g. /admin/product or /salesman/product
  detailUrl: string // URL to redirect after successful edit, e.g. /admin/product/[id] or /salesman/product/[id]
}

export default function ProductEdit({ productId, baseUrl, detailUrl }: ProductEditProps) {
  const router = useRouter()

  const { data: productData, isLoading: isProductLoading } = useProductDetailAdminQuery({ productId })
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoryProductsQuery({
    page_index: 1,
    page_size: 99
  })
  const updateProductMutation = useUpdateProductMutation({ id: productId })
  const uploadMutation = useUploadImageMutation()

  const [previews, setPreviews] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const product = productData?.payload.data
  const categories = categoriesData?.payload.data || []

  // Setup form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      detail: '',
      guide: '',
      price: 0,
      stockQuantity: 0,
      discount: 0,
      imageUrlArray: [],
      categoryIds: []
    }
  })

  // Load product data into form when available
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        detail: product.detail,
        guide: product.guide,
        price: product.price,
        stockQuantity: product.stockQuantity,
        discount: (product.discount || 0) * 100,
        // Convert the image objects to an array of URLs
        imageUrlArray: product.images.map((img) => img.imageUrl),
        categoryIds: product.categories.map((cat) => cat.id)
      })

      // Set previews for existing images
      setPreviews(product.images.map((img) => img.imageUrl))
    }
  }, [product, form])

  // Handle file upload for images
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    // Store files for future upload
    const newFiles = Array.from(selectedFiles)
    setFiles((prevFiles) => [...prevFiles, ...newFiles])

    // Create local preview URLs
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews])

    // Add to form values
    const currentImages = form.getValues().imageUrlArray || []
    form.setValue('imageUrlArray', [...currentImages, ...newPreviews], { shouldValidate: true })
  }

  const removeImage = (index: number) => {
    const newPreviews = [...previews]
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)

    // Only remove from files if it's a new file
    if (index >= (product?.images.length || 0)) {
      const newFileIndex = index - (product?.images.length || 0)
      const newFiles = [...files]
      newFiles.splice(newFileIndex, 1)
      setFiles(newFiles)
    }

    // Remove from form values
    const currentImages = form.getValues().imageUrlArray || []
    const newImages = [...currentImages]
    newImages.splice(index, 1)
    form.setValue('imageUrlArray', newImages, { shouldValidate: true })
  }

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      // Upload new images if any
      const uploadedImageUrls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData()
          formData.append('file', file)
          const response = await uploadMutation.mutateAsync(formData)
          return response.payload.data
        })
      )

      // Combine existing and new image URLs
      const allImageUrls = [...values.imageUrlArray.filter((url) => !url.startsWith('blob:')), ...uploadedImageUrls]

      // Update product with new data
      await updateProductMutation.mutateAsync({
        ...values,
        discount: values.discount / 100, // Convert percentage to decimal
        imageUrlArray: allImageUrls
      })

      toast({
        description: 'Cập nhật sản phẩm thành công'
      })

      router.push(detailUrl)
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading state
  if (isProductLoading || isCategoriesLoading) {
    return (
      <div className='space-y-8'>
        <Skeleton className='h-10 w-32' />
        <Skeleton className='h-8 w-64' />
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-40' />
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Images skeleton */}
              <div className='flex gap-2 items-start'>
                <Skeleton className='h-20 w-20 rounded-md' />
                <Skeleton className='h-20 w-20 rounded-md' />
              </div>

              {/* Categories skeleton */}
              <Skeleton className='h-10 w-full' />

              {/* Name skeleton */}
              <Skeleton className='h-10 w-full' />

              {/* Description skeleton */}
              <Skeleton className='h-24 w-full' />

              {/* Price/Stock/Discount skeleton */}
              <div className='grid grid-cols-3 gap-4'>
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-full' />
              </div>

              {/* Detail skeleton */}
              <Skeleton className='h-64 w-full' />

              {/* Guide skeleton */}
              <Skeleton className='h-64 w-full' />
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

  if (!product && !isProductLoading) {
    return (
      <div className='space-y-6'>
        <Card className='p-8 text-center'>
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold'>Không tìm thấy sản phẩm</h2>
            <p className='text-muted-foreground'>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button asChild className='mt-4'>
              <a href={baseUrl}>Quay lại danh sách sản phẩm</a>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const isLoading = uploadMutation.isPending || updateProductMutation.isPending || isSubmitting

  return (
    <div className='product-edit-container'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Chỉnh sửa sản phẩm</h1>
          <p className='text-sm text-muted-foreground mt-1'>Cập nhật thông tin sản phẩm</p>
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
              <CardTitle>Thông tin sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Image Field */}
              <FormField
                control={form.control}
                name='imageUrlArray'
                // eslint-disable-next-line no-unused-vars
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hình ảnh sản phẩm</FormLabel>
                    <FormControl>
                      <div className='space-y-4'>
                        <div className='flex items-center space-x-4'>
                          <div
                            className='flex aspect-square w-24 items-center justify-center rounded-md border border-dashed cursor-pointer'
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className='h-4 w-4 text-muted-foreground' />
                            <span className='sr-only'>Tải ảnh lên</span>
                          </div>
                          <Input
                            ref={fileInputRef}
                            type='file'
                            accept='image/*'
                            multiple
                            className='hidden'
                            onChange={handleFileChange}
                          />
                          <div className='text-sm text-muted-foreground'>
                            <p>Tải lên các hình ảnh cho sản phẩm. Bạn có thể tải nhiều ảnh cùng lúc.</p>
                            <p className='text-amber-600 font-medium mt-1'>
                              Hình ảnh mới sẽ được tải lên khi bạn nhấn nút &quot;Lưu thay đổi&quot;.
                            </p>
                          </div>
                        </div>

                        {previews.length > 0 && (
                          <div className='grid grid-cols-5 gap-4'>
                            {previews.map((url, index) => (
                              <div key={index} className='relative aspect-square group'>
                                {/* Show "New" badge for new images */}
                                {index >= (product?.images.length || 0) && (
                                  <div className='absolute top-0 right-0 z-10 bg-yellow-400 text-xs px-1 rounded-bl-md'>
                                    Mới
                                  </div>
                                )}
                                <Image
                                  src={url}
                                  alt={`Hình ảnh sản phẩm ${index + 1}`}
                                  fill
                                  className='object-cover rounded-md'
                                />
                                <div
                                  className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity rounded-md'
                                  onClick={() => removeImage(index)}
                                >
                                  <span className='text-white text-sm'>Xóa</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
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
                      <CategorySelect
                        categories={categories}
                        selectedCategories={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title Field */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên sản phẩm</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên sản phẩm' {...field} />
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
                      <Textarea placeholder='Nhập mô tả ngắn về sản phẩm' className='min-h-24' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price, Stock, Discount Fields */}
              <div className='grid grid-cols-3 gap-4'>
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá (VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          inputMode='numeric'
                          placeholder='Nhập giá'
                          value={field.value}
                          onChange={(e) => {
                            // Remove leading zeros and non-numeric characters
                            const value = e.target.value.replace(/^0+|[^0-9]/g, '')
                            // Convert to number or 0 if empty
                            field.onChange(value === '' ? 0 : parseInt(value, 10))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='stockQuantity'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          inputMode='numeric'
                          placeholder='Nhập số lượng'
                          value={field.value}
                          onChange={(e) => {
                            // Remove leading zeros and non-numeric characters
                            const value = e.target.value.replace(/^0+|[^0-9]/g, '')
                            // Convert to number or 0 if empty
                            field.onChange(value === '' ? 0 : parseInt(value, 10))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='discount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giảm giá (%)</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          inputMode='numeric'
                          placeholder='Nhập % giảm giá'
                          value={field.value}
                          onChange={(e) => {
                            // Remove leading zeros and non-numeric characters
                            const value = e.target.value.replace(/^0+|[^0-9]/g, '')
                            // Convert to number or 0 if empty
                            const numValue = value === '' ? 0 : parseInt(value, 10)
                            // Ensure value is between 0-100
                            field.onChange(numValue > 100 ? 100 : numValue)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Rich Content Fields */}
              <ContentField form={form} name='detail' label='Chi tiết sản phẩm' useRichText={true} />
              <ContentField form={form} name='guide' label='Hướng dẫn sử dụng' useRichText={true} />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
