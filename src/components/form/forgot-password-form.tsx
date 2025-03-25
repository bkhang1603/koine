'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn, handleErrorApi } from '@/lib/utils'
import { ForgotPasswordBody, ForgotPasswordBodyType } from '@/schemaValidations/auth.schema'
import { useRequestResetPasswordMutation } from '@/queries/useAuth'
import { toast } from '@/components/ui/use-toast'

export default function ForgotPasswordForm({ className }: { className?: string }) {
  const requestResetMutation = useRequestResetPasswordMutation()

  const form = useForm<ForgotPasswordBodyType>({
    resolver: zodResolver(ForgotPasswordBody),
    defaultValues: {
      email: ''
    }
  })

  // 2. Define a submit handler.
  // eslint-disable-next-line no-unused-vars
  async function onSubmit(values: ForgotPasswordBodyType) {
    console.log('values', values)

    try {
      if (requestResetMutation.isPending) return

      await requestResetMutation.mutateAsync(values.email)

      toast({
        title: 'Email đã được gửi',
        description: 'Vui lòng kiểm tra email của bạn để đặt lại mật khẩu'
      })

      form.reset()
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4 max-w-[600px] flex-shrink-0 w-full', className)}
        noValidate
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className='h-10' placeholder='Email' type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='!mt-8 w-full h-10 bg-sixth hover:bg-sixth/80 text-base'>
          Gửi email
        </Button>
      </form>
    </Form>
  )
}
