'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateProductBody, CreateProductBodyType } from '@/schemaValidations/product.schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCreateProductMutation, useGetCategoryProductsQuery } from '@/queries/useProduct'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import configRoute from '@/config/route'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { CategorySelect } from '@/components/private/manager/product/create/category-select'
import { ContentField } from '@/components/private/manager/product/create/content-field'
import { ImageUpload } from '@/components/private/manager/product/create/image-upload'
import { Textarea } from '@/components/ui/textarea'

export default function NewProduct() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
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

  const { data: categoryData } = useGetCategoryProductsQuery({
    page_index: 1,
    page_size: 99
  })
  const categories = categoryData?.payload.data || []

  const createProduct = useCreateProductMutation()

  const onSubmit = async (data: CreateProductBodyType) => {
    try {
      await createProduct.mutateAsync(data)
      toast({
        title: 'Thành công',
        description: 'Tạo sản phẩm mới thành công'
      })
      router.push(configRoute.admin.product)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Lỗi',
        description: 'Có lỗi xảy ra khi tạo sản phẩm'
      })
    }
  }

  return (
    <div className='container max-w-4xl mx-auto py-6 space-y-6'>
      <Button variant='ghost' asChild className='gap-2 hover:bg-gray-100'>
        <Link href={configRoute.admin.product}>
          <ArrowLeft className='h-4 w-4' />
          Quay lại danh sách sản phẩm
        </Link>
      </Button>

      <div>
        <h1 className='text-2xl font-bold'>Thêm sản phẩm mới</h1>
        <p className='text-muted-foreground mt-1'>Tạo sản phẩm mới trong hệ thống</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <Card className='p-6'>
            <div className='grid gap-6'>
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

              <ContentField form={form} name='detail' label='Chi tiết sản phẩm' />
              <ContentField form={form} name='guide' label='Hướng dẫn sử dụng' />

              <ImageUpload form={form} />
            </div>
          </Card>

          <div className='flex justify-end gap-4'>
            <Button type='button' variant='outline' onClick={() => router.push(configRoute.admin.product)}>
              Hủy
            </Button>
            <Button type='submit' disabled={createProduct.isPending}>
              {createProduct.isPending ? 'Đang tạo...' : 'Tạo sản phẩm'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
