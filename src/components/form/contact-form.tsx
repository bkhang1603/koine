'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  name: z.string().min(1, 'Họ và tên không được để trống'),
  email: z.string().email('Email không hợp lệ').min(1, 'Email không được để trống'),
  message: z.string().min(1, 'Nội dung không được để trống')
})

function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 flex-shrink-0 w-full'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Họ và tên' {...field} />
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
              <FormControl>
                <Input placeholder='Email' type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Đừng ngần ngại hỏi chúng tôi về các vấn đề của bạn'
                  className='min-h-[100px] max-h-[200px]'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='!mt-8 bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
            hover:opacity-95 rounded-lg w-full'
        >
          Gửi liên hệ ngay
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm
