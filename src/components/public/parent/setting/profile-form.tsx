'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn, handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import { CalendarIcon, Upload } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAccountProfileById, useUpdateAccountProfileMutation } from '@/queries/useAccount'
import { accountProfileBody, AccountProfileBodyType } from '@/schemaValidations/account.schema'
import { useUploadImageMutation } from '@/queries/useUpload'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format, parse } from 'date-fns'
import { vi } from 'date-fns/locale'
import Loading from '@/components/loading'

export function ProfileForm() {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const updateAccountProfileMutation = useUpdateAccountProfileMutation()
  const uploadImageMutation = useUploadImageMutation()

  const { data } = useAccountProfileById()
  const profile = data?.payload.data ?? null

  const form = useForm<AccountProfileBodyType>({
    resolver: zodResolver(accountProfileBody),
    defaultValues: {
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      dob: profile?.dob ?? '',
      avatarUrl: profile?.avatarUrl ?? ''
    }
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        dob: profile.dob,
        avatarUrl: profile.avatarUrl
      })
    }
  }, [profile, form])

  const image = form.watch('avatarUrl')

  const previewAvatarFromFile = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
    return image
  }, [file, image])

  const onSubmit = async (values: AccountProfileBodyType) => {
    try {
      // Kiểm tra xem có thông tin nào thay đổi không
      const isChanged = Object.keys(values).some(
        (key) => values[key as keyof AccountProfileBodyType] !== profile?.[key as keyof AccountProfileBodyType]
      )
      if (!isChanged) {
        return toast({
          title: 'Lỗi',
          description: 'Vui lòng cập nhật thông tin mới để thực hiện thay đổi'
        })
      }
      console.log('values', values)
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const result = await uploadImageMutation.mutateAsync(formData)
        values.avatarUrl = result.payload.data
      }
      await updateAccountProfileMutation.mutateAsync(values)
      toast({
        title: 'Thành công',
        description: 'Cập nhật thông tin thành công'
      })
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  if (!profile) {
    return (
      <div className='flex items-center justify-center h-40'>
        <Loading />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='avatarUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ảnh đại diện</FormLabel>
              <FormControl>
                <div className='flex gap-2 items-start justify-start'>
                  <Avatar className='aspect-square w-[150px] h-[150px] rounded-md object-cover'>
                    <AvatarImage src={previewAvatarFromFile} />
                    {/* <AvatarFallback className='rounded-none'>
                      <Upload className='h-4 w-4 text-muted-foreground' />
                    </AvatarFallback> */}
                  </Avatar>
                  <Input
                    className='hidden'
                    type='file'
                    accept='image/*'
                    ref={inputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setFile(file)
                        field.onChange('http://localhost:3000/' + file.name)
                      }
                    }}
                  />
                  <button
                    className='absolute flex aspect-square w-[150px] items-center justify-center rounded-md border border-dashed'
                    type='button'
                    onClick={() => inputRef.current?.click()}
                  >
                    <Upload className='h-4 w-4 text-muted-foreground' />
                    <span className='sr-only'>Upload</span>
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name='username'
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
        /> */}

        {/* Tôi muốn có một input disable để hiện thị thông tin username của mình */}
        <FormItem>
          <FormLabel>Tên người dùng</FormLabel>
          <FormControl>
            <Input placeholder='Tên người dùng' disabled value={profile?.username} />
          </FormControl>
          <FormDescription>Tên người dùng sẽ được hiển thị trên trang web của bạn.</FormDescription>
          <FormMessage />
        </FormItem>

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
        {/* <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Năm sinh</FormLabel>
              <FormControl>
                <Input placeholder='Năm sinh' {...field} />
              </FormControl>
              <FormDescription>
                Năm sinh của bạn sẽ được sử dụng để hiển thị tuổi của bạn trên trang web.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Ngày sinh</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? (
                        format(parse(field.value, 'dd/MM/yyyy', new Date()), 'PPP', { locale: vi })
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value ? parse(field.value, 'dd/MM/yyyy', new Date()) : undefined}
                    onSelect={(date) => field.onChange(date ? format(date, 'dd/MM/yyyy') : '')}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Ngày sinh của bạn được sử dụng để tính tuổi của bạn.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='!mt-8'>Cập nhật hồ sơ</Button>
      </form>
    </Form>
  )
}
