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
    cardNumber: z
      .string()
      .min(16, 'Số thẻ phải chứa ít nhất 16 ký tự.')
      .max(19, 'Số thẻ không được vượt quá 19 ký tự.')
      .regex(/^\d+$/, 'Số thẻ chỉ được chứa các chữ số.'),
    cardHolderName: z
      .string()
      .min(1, 'Tên chủ thẻ không được để trống.')
      .max(100, 'Tên chủ thẻ không được vượt quá 100 ký tự.'),
    expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Ngày hết hạn không hợp lệ.'),
    cvv: z
      .string()
      .min(3, 'CVV phải chứa ít nhất 3 ký tự.')
      .max(4, 'CVV không được vượt quá 4 ký tự.')
      .regex(/^\d+$/, 'CVV chỉ được chứa các chữ số.')
  })
  .strict()

export function PaymentForm() {
  const router = useRouter()

  const form = useForm<z.TypeOf<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: '',
      cardHolderName: '',
      expirationDate: '',
      cvv: ''
    }
  })

  async function onSubmit() {
    try {
      // Your logic here
      toast({ title: 'Thành công', description: 'Thông tin thanh toán của bạn đã được cập nhật.' })
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
          name='cardNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số thẻ</FormLabel>
              <FormControl>
                <Input placeholder='Số thẻ' type='text' {...field} />
              </FormControl>
              <FormDescription>Nhập số thẻ của bạn.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='cardHolderName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên chủ thẻ</FormLabel>
              <FormControl>
                <Input placeholder='Tên chủ thẻ' type='text' {...field} />
              </FormControl>
              <FormDescription>Nhập tên chủ thẻ như trên thẻ.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='expirationDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày hết hạn</FormLabel>
              <FormControl>
                <Input placeholder='MM/YY' type='text' {...field} />
              </FormControl>
              <FormDescription>Nhập ngày hết hạn của thẻ (MM/YY).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='cvv'
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVV</FormLabel>
              <FormControl>
                <Input placeholder='CVV' type='text' {...field} />
              </FormControl>
              <FormDescription>Nhập mã CVV của thẻ.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='!mt-8'>Cập nhật thông tin thanh toán</Button>
      </form>
    </Form>
  )
}
