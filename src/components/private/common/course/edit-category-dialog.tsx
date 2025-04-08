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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'

const formSchema = z.object({
  name: z.string().min(1, 'Tên danh mục không được để trống').max(100, 'Tên danh mục không được vượt quá 100 ký tự'),
  description: z.string().max(500, 'Mô tả không được vượt quá 500 ký tự').optional()
})

type CategoryFormValues = z.infer<typeof formSchema>

type EditCategoryDialogProps = {
  categoryDetail: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: CategoryFormValues) => void
  isLoading: boolean
}

export function EditCategoryDialog({
  categoryDetail,
  open,
  onOpenChange,
  onSubmit,
  isLoading
}: EditCategoryDialogProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: categoryDetail?.name || '',
      description: categoryDetail?.description || ''
    }
  })

  useEffect(() => {
    if (categoryDetail) {
      form.reset({
        name: categoryDetail.name || '',
        description: categoryDetail.description || ''
      })
    }
  }, [categoryDetail, form])

  const handleSubmit = (values: CategoryFormValues) => {
    onSubmit(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin danh mục khóa học.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên danh mục</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập tên danh mục' {...field} />
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
                      placeholder='Nhập mô tả chi tiết về danh mục'
                      className='resize-none'
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='pt-4'>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading}>
                Hủy
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Cập nhật
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
