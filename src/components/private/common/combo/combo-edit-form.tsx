'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useComboUpdateMutation } from '@/queries/useCombo'
import { useState, useRef } from 'react'
import { Loader2, Upload } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { updateComboBodySchema, UpdateComboBodyType } from '@/schemaValidations/admin.schema'
import { handleErrorApi } from '@/lib/utils'
import { useUploadImageMutation } from '@/queries/useUpload'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface ComboEditFormProps {
  comboId: string
  defaultValues: UpdateComboBodyType
  baseUrl: string
}

export function ComboEditForm({ comboId, defaultValues, baseUrl }: ComboEditFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const updateComboMutation = useComboUpdateMutation(comboId)
  const uploadMutation = useUploadImageMutation()

  const form = useForm<UpdateComboBodyType>({
    resolver: zodResolver(updateComboBodySchema),
    defaultValues
  })

  const onSubmit = async (values: UpdateComboBodyType) => {
    try {
      setIsSubmitting(true)

      // Upload image if present
      if (file) {
        const formData = new FormData()
        formData.append('images', file)

        toast({
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
          handleErrorApi({ error: uploadError, setError: form.setError })
          throw uploadError // Rethrow to stop the submission process
        }
      }

      await updateComboMutation.mutateAsync(values)

      toast({
        description: 'Combo đã được cập nhật thành công'
      })

      router.push(`${baseUrl}/${comboId}`)
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên combo</FormLabel>
              <FormControl>
                <Input placeholder='Nhập tên combo' {...field} />
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
              <FormLabel>Mô tả combo</FormLabel>
              <FormControl>
                <Textarea placeholder='Nhập mô tả combo' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá combo</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Nhập giá combo'
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
          name='imageUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hình ảnh combo</FormLabel>
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

        <div className='flex justify-end gap-3 mt-8'>
          <Button type='button' variant='outline' onClick={() => router.push(`${baseUrl}/${comboId}`)}>
            Hủy
          </Button>
          <Button type='submit' disabled={isSubmitting || updateComboMutation.isPending}>
            {(isSubmitting || updateComboMutation.isPending) && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Cập nhật combo
          </Button>
        </div>
      </form>
    </Form>
  )
}
