'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import authApiRequest from '@/apiRequests/auth'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn, handleErrorApi } from '@/lib/utils'
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'
import { Checkbox } from '@/components/ui/checkbox'

export default function RegisterForm({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: 'nam',
      yob: 1900,
      term: true
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterBodyType) {
    if (loading) return
    setLoading(true)
    try {
      const result = await authApiRequest.login(values)

      toast({
        description: result.payload.message
      })
      router.push('/')
      router.refresh()
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setLoading(false)
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
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đăng nhập</FormLabel>
              <FormControl>
                <Input className='h-10' placeholder='Tên đăng nhập' type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div className='sm:flex items-center justify-between'>
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giới tính</FormLabel>
                <FormControl>
                  <RadioGroup
                    className='flex items-center space-x-14 sm:space-x-16 h-10'
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='nam'>Nam</RadioGroupItem>
                      </FormControl>
                      <FormLabel className='cursor-pointer'>Nam</FormLabel>
                    </FormItem>

                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='nu'>Nữ</RadioGroupItem>
                      </FormControl>
                      <FormLabel className='cursor-pointer'>Nữ</FormLabel>
                    </FormItem>

                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='khac'>Khác</RadioGroupItem>
                      </FormControl>
                      <FormLabel className='cursor-pointer'>Khác</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='yob'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Năm sinh</FormLabel>
                <FormControl>
                  <Input className='h-10' placeholder='Năm sinh' type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input className='h-10' placeholder='Mật khẩu' type='password' {...field} />
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
                <Input className='h-10' placeholder='Xác nhận mật khẩu' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='term'
          render={({ field }) => (
            <>
              <FormItem className='flex items-center space-x-3 space-y-0 !mt-8 '>
                <FormControl>
                  <Checkbox
                    {...field}
                    value={'true'}
                    checked={field.value}
                    onCheckedChange={(value) => {
                      field.onChange({ target: { value: value, name: field.name } })
                    }}
                  />
                </FormControl>
                <FormLabel className='cursor-pointer'>Tôi đồng ý với các điều khoản sử dụng</FormLabel>
              </FormItem>
              <FormMessage />
            </>
          )}
        />
        <Button type='submit' className='w-full h-10 bg-sixth hover:bg-sixth/80 text-base'>
          Đăng ký
        </Button>
      </form>
    </Form>
  )
}
