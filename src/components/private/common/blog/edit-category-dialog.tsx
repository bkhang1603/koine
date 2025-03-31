/* eslint-disable no-unused-vars */
'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CategoryBlogDetailResType } from '@/schemaValidations/blog.schema'
import { useEffect } from 'react'

// Định nghĩa schema validation với Zod
const categoryFormSchema = z.object({
  name: z.string().min(1, { message: 'Tên danh mục không được để trống' }),
  description: z.string().min(1, { message: 'Mô tả không được để trống' })
})

// Kiểu dữ liệu từ schema
type CategoryFormValues = z.infer<typeof categoryFormSchema>

type EditCategoryDialogProps = {
  categoryDetail?: CategoryBlogDetailResType['data']
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CategoryFormValues) => void
  isLoading: boolean
}

export const EditCategoryDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  categoryDetail
}: EditCategoryDialogProps) => {
  // Khởi tạo form với react-hook-form và zod resolver
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  // Cập nhật form khi API trả về dữ liệu
  useEffect(() => {
    if (categoryDetail) {
      // Reset form với dữ liệu từ API
      form.reset({
        name: categoryDetail.name,
        description: categoryDetail.description
      })
    }
  }, [categoryDetail, form])

  // Xử lý đóng dialog an toàn
  const handleClose = (open: boolean) => {
    if (!open && !isLoading) {
      onOpenChange(false)
    }
  }

  // Xử lý submit form
  const handleSubmitForm = (values: CategoryFormValues) => {
    onSubmit(values)
  }

  // Hiển thị trạng thái loading khi đang lấy dữ liệu
  const showLoadingState = isLoading && !categoryDetail

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className='sm:max-w-[500px]'
        onPointerDownOutside={(e) => {
          if (!isLoading) {
            e.preventDefault()
            handleClose(false)
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin danh mục blog</DialogDescription>
        </DialogHeader>

        {showLoadingState ? (
          <div className='flex justify-center items-center py-8'>
            <Loader2 className='h-8 w-8 animate-spin text-primary' />
            <span className='ml-2'>Đang tải dữ liệu...</span>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className='space-y-4 py-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên danh mục</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên danh mục' disabled={isLoading} {...field} />
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
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Nhập mô tả cho danh mục'
                        className='min-h-[100px]'
                        disabled={isLoading}
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className='pt-4'>
                <Button
                  type='button'
                  onClick={() => handleClose(false)}
                  variant='outline'
                  disabled={isLoading}
                  className='mr-2'
                >
                  Hủy
                </Button>
                <Button type='submit' disabled={isLoading || !form.formState.isDirty || !categoryDetail}>
                  {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  Cập nhật danh mục
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
