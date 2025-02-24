'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự.')
      .max(100, 'Mật khẩu không được vượt quá 100 ký tự.')
      .refine((value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,100}$/.test(value)
      }, 'Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 số và 1 ký tự đặc biệt.'),
    newPassword: z
      .string()
      .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự.')
      .max(100, 'Mật khẩu không được vượt quá 100 ký tự.')
      .refine((value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,100}$/.test(value)
      }, 'Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 số và 1 ký tự đặc biệt.'),
    confirmedPassword: z
      .string()
      .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự.')
      .max(100, 'Mật khẩu không được vượt quá 100 ký tự.')
      .refine((value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,100}$/.test(value)
      }, 'Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 số và 1 ký tự đặc biệt.')
  })
  .strict()
  .superRefine(({ newPassword, confirmedPassword, password }, ctx) => {
    if (newPassword !== confirmedPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu xác nhận không khớp.',
        path: ['confirmedPassword']
      })
    }
    if (newPassword === password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu mới không được trùng với mật khẩu hiện tại.',
        path: ['newPassword']
      })
    }
  })

export function PasswordForm() {
  const router = useRouter()

  const form = useForm<z.TypeOf<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmedPassword: '',
      newPassword: ''
    }
  })

  async function onSubmit() {
    try {
      // Your logic here
      toast({ title: 'Thành công', description: 'Mật khẩu của bạn đã được cập nhật.' })
      router.push('/profile')
    } catch (error: any) {
      handleErrorApi(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu hiện tại</FormLabel>
              <FormControl>
                <Input placeholder='Mật khẩu hiện tại' type='password' {...field} />
              </FormControl>
              <FormDescription>Nhập mật khẩu hiện tại của bạn để xác nhận việc thay đổi mật khẩu.</FormDescription>
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
                <Input placeholder='Mật khẩu mới' type='password' {...field} />
              </FormControl>
              <FormDescription>
                Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 số và 1 ký tự đặc biệt.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmedPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu mới</FormLabel>
              <FormControl>
                <Input placeholder='Xác nhận mật khẩu mới' type='password' {...field} />
              </FormControl>
              <FormDescription>Nhập lại mật khẩu mới để xác nhận việc thay đổi mật khẩu.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='!mt-8'>Cập nhật mật khẩu</Button>
      </form>
    </Form>
  )
}
