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
    userName: z.string().min(3).max(100),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
    yob: z.coerce.number().min(1900).max(new Date().getFullYear())
  })
  .strict()

export function ProfileForm() {
  const router = useRouter()
  const form = useForm<z.TypeOf<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      yob: 1900
    }
  })

  async function onSubmit() {
    try {
      // Your logic here
      toast({ title: 'Success', description: 'Profile updated successfully' })
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
          name='userName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên người dùng</FormLabel>
              <FormControl>
                <Input placeholder='Tên người dùng' {...field} />
              </FormControl>
              <FormDescription>Tên người dùng sẽ được hiển thị trên trang web của bạn.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên đệm</FormLabel>
              <FormControl>
                <Input placeholder='Họ và tên đệm' {...field} />
              </FormControl>
              <FormDescription>Họ và tên đệm của bạn sẽ được hiển thị trên trang web của bạn.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input placeholder='Tên' {...field} />
              </FormControl>
              <FormDescription>Tên của bạn sẽ được hiển thị trên trang web của bạn.</FormDescription>
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
                <Input placeholder='Năm sinh' type='number' {...field} />
              </FormControl>
              <FormDescription>
                Năm sinh của bạn sẽ được sử dụng để hiển thị tuổi của bạn trên trang web.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='!mt-8'>Cập nhật hồ sơ</Button>
      </form>
    </Form>
  )
}
