'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Save } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateProductBody, CreateProductBodyType } from '@/schemaValidations/product.schema'
import { useCreateProductMutation, useGetCategoryProductsQuery } from '@/queries/useProduct'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ContentField } from './content-field'
import { CategorySelect } from './category-select'
import { ImageUpload } from './image-upload'
import { useUploadImageMutation } from '@/queries/useUpload'

// LocalStorage key for saving draft
const PRODUCT_DRAFT_KEY = 'product_draft_data'

interface ProductNewPageProps {
  localDraft?: CreateProductBodyType | null
  baseUrl: string // URL to redirect after creation, e.g. /admin/product or /salesman/product
}

export default function ProductNewPage({ localDraft, baseUrl }: ProductNewPageProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const uploadMutation = useUploadImageMutation()
  const createProductMutation = useCreateProductMutation()

  const { data: categoryData } = useGetCategoryProductsQuery({ page_index: 1, page_size: 99 })
  const categories = categoryData?.payload.data || []

  // Initialize the form with React Hook Form
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: localDraft?.name || '',
      description: localDraft?.description || '',
      detail: localDraft?.detail || '',
      guide: localDraft?.guide || '',
      price: localDraft?.price || 0,
      stockQuantity: localDraft?.stockQuantity || 0,
      discount: localDraft?.discount || 0,
      imageUrlArray: localDraft?.imageUrlArray || [],
      categoryIds: localDraft?.categoryIds || []
    }
  })

  // Manual save draft button handler
  const saveDraft = () => {
    const values = form.getValues()
    localStorage.setItem(PRODUCT_DRAFT_KEY, JSON.stringify(values))
    toast({
      description: 'Sản phẩm của bạn đã được lưu vào bộ nhớ cục bộ'
    })
  }

  const onSubmit = async (data: CreateProductBodyType) => {
    try {
      setIsSubmitting(true)

      // STEP 1: UPLOAD IMAGES (only happens when form is submitted)
      // This ensures images are only uploaded when the user clicks the "Save" button
      if (files && files.length > 0) {
        try {
          toast({
            description: 'Đang tải hình ảnh lên máy chủ...'
          })

          const formData = new FormData()
          files.forEach((file: File) => {
            formData.append('images', file)
          })

          console.log(`Bắt đầu tải lên ${files.length} hình ảnh...`)
          const result = await uploadMutation.mutateAsync(formData)

          if (result?.payload?.data) {
            // Replace the temporary preview URLs with real server URLs
            data.imageUrlArray = Array.isArray(result.payload.data) ? result.payload.data : [result.payload.data]

            console.log(`Tải lên hình ảnh hoàn tất: ${data.imageUrlArray.length} hình`)
          }
        } catch (uploadError) {
          console.error('Error uploading images:', uploadError)
          toast({
            variant: 'destructive',
            title: 'Lỗi tải ảnh',
            description: 'Không thể tải hình ảnh lên. Vui lòng thử lại.'
          })
          // Stop form submission if image upload fails
          setIsSubmitting(false)
          return
        }
      }

      // STEP 2: CREATE PRODUCT (after images have been uploaded successfully)
      console.log('Tạo sản phẩm với dữ liệu:', data)
      await createProductMutation.mutateAsync(data)

      // STEP 3: CLEAN UP & REDIRECT
      // Clear draft from localStorage after successful submission
      localStorage.removeItem(PRODUCT_DRAFT_KEY)

      toast({
        description: 'Sản phẩm của bạn đã được tạo thành công'
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

  const isLoading = createProductMutation.isPending || isSubmitting

  return (
    <div className='product-new-container'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Tạo sản phẩm mới</h1>
          <p className='text-sm text-muted-foreground mt-1'>Thêm sản phẩm mới vào hệ thống</p>
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
                Tạo sản phẩm
              </>
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <div className='grid gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <ImageUpload form={form} onFilesChange={setFiles} />

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

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả ngắn</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Nhập mô tả ngắn về sản phẩm' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-3 gap-4'>
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá (VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Nhập giá'
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
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
                          type='number'
                          placeholder='Nhập số lượng'
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
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
                          type='number'
                          placeholder='Nhập % giảm giá'
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <ContentField form={form} name='detail' label='Chi tiết sản phẩm' useRichText={true} />
              <ContentField form={form} name='guide' label='Hướng dẫn sử dụng' useRichText={true} />
            </CardContent>
          </Card>
        </div>
      </Form>
    </div>
  )
}
