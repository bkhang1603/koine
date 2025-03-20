'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Lock } from 'lucide-react'
import { useState } from 'react'

// Schema cho form bảo mật
const securityFormSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: 'Mật khẩu hiện tại phải có ít nhất 6 ký tự'
    }),
    newPassword: z.string().min(8, {
      message: 'Mật khẩu mới phải có ít nhất 8 ký tự'
    }),
    confirmPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  })

type SecurityFormValues = z.infer<typeof securityFormSchema>

export function SecurityForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  // eslint-disable-next-line no-unused-vars
  async function onSubmit(values: SecurityFormValues) {
    setIsLoading(true)

    try {
      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        description: 'Mật khẩu đã được cập nhật thành công'
      })

      form.reset()
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='currentPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu hiện tại</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Lock className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
                  <Input type='password' placeholder='Nhập mật khẩu hiện tại' className='pl-10' {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Lock className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
                  <Input type='password' placeholder='Nhập mật khẩu mới' className='pl-10' {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Lock className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
                  <Input type='password' placeholder='Xác nhận mật khẩu mới' className='pl-10' {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='bg-gradient-to-r from-primary to-primary/90' disabled={isLoading}>
          {isLoading ? (
            <>
              <span className='w-4 h-4 border-2 border-white/30 border-t-white/90 rounded-full animate-spin mr-2' />
              Đang cập nhật...
            </>
          ) : (
            'Cập nhật mật khẩu'
          )}
        </Button>
      </form>
    </Form>
  )
}
