'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { useChangePasswordMutation } from '@/queries/useAuth'
import { handleErrorApi } from '@/lib/utils'
import InputPassword from '@/components/input-password'

// Schema cho form bảo mật
const securityFormSchema = z
  .object({
    oldPassword: z.string().min(6, {
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
  const changePasswordMutation = useChangePasswordMutation()

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  async function onSubmit(values: SecurityFormValues) {
    try {
      if (changePasswordMutation.isPending) return

      await changePasswordMutation.mutateAsync(values)

      toast({
        description: 'Mật khẩu đã được cập nhật thành công'
      })

      form.reset()
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='oldPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu hiện tại</FormLabel>
              <FormControl>
                <InputPassword className='h-10' placeholder='Mật khẩu hiện tại' {...field} />
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
                <InputPassword className='h-10' placeholder='Mật khẩu mới' {...field} />
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
                <InputPassword className='h-10' placeholder='Xác nhận mật khẩu mới' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='bg-gradient-to-r from-primary to-primary/90'
          disabled={changePasswordMutation.isPending}
        >
          {changePasswordMutation.isPending ? (
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
