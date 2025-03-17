'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { cn, handleErrorApi } from '@/lib/utils'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import Link from 'next/link'
import configRoute from '@/config/route'
import { useLoginMutation } from '@/queries/useAuth'
import InputPassword from '@/components/input-password'
import { useEffect } from 'react'
import { useAppStore } from '@/components/app-provider'
import { useGetIpMutation } from '@/queries/useIp'

export default function LoginForm({ className }: { className?: string }) {
  const { data } = useGetIpMutation()
  const ipAddress = data?.payload.data.clientIp ?? ''

  const { toast } = useToast()
  const router = useRouter()
  const loginMutation = useLoginMutation()
  const searchParams = useSearchParams()
  const clearTokens = searchParams.get('clearTokens')
  const setRole = useAppStore((state) => state.setRole)
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      loginKey: '',
      password: ''
    }
  })

  useEffect(() => {
    if (clearTokens) {
      setRole()
    }
  }, [clearTokens, setRole])

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    if (loginMutation.isPending) return
    try {
      const newValues = { ...values, deviceId: ipAddress }

      const result = await loginMutation.mutateAsync(newValues)

      setRole(result.payload.data.account.role)

      // Kiểm tra xem có redirect parameter từ URL không (khi bị chuyển hướng từ middleware)
      const redirect = searchParams.get('redirect')

      // Điều hướng dựa trên role
      if (redirect) {
        // Nếu có redirect parameter, ưu tiên chuyển về trang đó
        router.push(redirect)
      } else {
        // Nếu không có redirect, điều hướng theo role
        switch (result.payload.data.account.role) {
          case 'ADMIN':
            router.push('/admin')
            break
          case 'MANAGER':
            router.push('/manager')
            break
          case 'ACCOUNTING':
            router.push('/salesman')
            break
          case 'SUPPORTER':
            router.push('/supporter')
            break
          case 'CONTENT_CREATOR':
            router.push('/content-creator')
            break
          case 'ADULT':
            router.push('/')
            break
          case 'CHILD':
            router.push('/kid')
            break
          default:
            router.push('/')
            break
        }
      }

      toast({
        description: result.payload.message || 'Đăng nhập thành công!'
      })
    } catch (error: any) {
      console.log(error)

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
          name='loginKey'
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
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <InputPassword className='h-10' placeholder='Mật khẩu' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full flex items-center justify-end'>
          <Link
            href={configRoute.forgotPassword}
            className='text-sm text-secondary text-end font-semibold hover:text-secondary/80'
          >
            Quên mật khẩu?
          </Link>
        </div>

        <Button type='submit' className='!mt-8 w-full h-10 bg-sixth hover:bg-sixth/80 text-base'>
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
