'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { cn, handleErrorApi } from '@/lib/utils'
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'
import { Checkbox } from '@/components/ui/checkbox'
import { useRegisterMutation } from '@/queries/useAuth'
import InputPassword from '@/components/input-password'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'

export default function RegisterForm({ className }: { className?: string }) {
  const { toast } = useToast()
  const router = useRouter()
  const registerMutation = useRegisterMutation()

  // Tính toán ngày mặc định (5 năm trước)
  const defaultDate = new Date()
  defaultDate.setFullYear(defaultDate.getFullYear() - 16) // Đặt mặc định là 16 tuổi

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: 'MALE',
      dob: format(defaultDate, 'yyyy-MM-dd'),
      term: false
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterBodyType) {
    if (registerMutation.isPending) return
    try {
      // Tách confirmPassword và term ra khỏi dữ liệu gửi đi
      // eslint-disable-next-line no-unused-vars
      const result = await registerMutation.mutateAsync((({ confirmPassword, term, ...rest }) => rest)(values))

      toast({
        description: result.payload.message || 'Đăng ký thành công'
      })

      router.push('/login')
    } catch (error: any) {
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
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giới tính</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Hãy chọn giới tính của bạn' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='MALE'>Nam</SelectItem>
                      <SelectItem value='FEMALE'>Nữ</SelectItem>
                      <SelectItem value='OTHER'>Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Date Picker cho ngày sinh */}
          <FormField
            control={form.control}
            name='dob'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Ngày sinh</FormLabel>
                <Popover>
                  <FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn('w-full text-left font-normal h-9', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(new Date(field.value), 'dd/MM/yyyy') : <span>Chọn ngày sinh</span>}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          // Format ngày thành "YYYY-MM-DD" cho backend
                          field.onChange(format(date, 'yyyy-MM-dd'))
                        }
                      }}
                      disabled={(date) => {
                        // Vô hiệu hóa ngày tương lai
                        return (
                          date > new Date() ||
                          // Vô hiệu hóa ngày dưới 5 tuổi
                          date > new Date(new Date().setFullYear(new Date().getFullYear() - 5))
                        )
                      }}
                      initialFocus
                      fromYear={1940}
                      toYear={new Date().getFullYear() - 5}
                      defaultMonth={defaultDate}
                    />
                  </PopoverContent>
                </Popover>
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
                <InputPassword className='h-10' placeholder='Mật khẩu' {...field} />
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
                <InputPassword className='h-10' placeholder='Xác nhận mật khẩu' {...field} />
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
