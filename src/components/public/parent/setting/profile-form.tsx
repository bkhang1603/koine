'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn, handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import { CalendarIcon, Upload, User } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAccountProfileById, useUpdateAccountProfileMutation } from '@/queries/useAccount'
import { accountProfileBody, AccountProfileBodyType } from '@/schemaValidations/account.schema'
import { useUploadImageMutation } from '@/queries/useUpload'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'
import { ProfileFormSkeleton } from './profile-form-skeleton'

export function ProfileForm() {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const updateAccountProfileMutation = useUpdateAccountProfileMutation()
  const uploadImageMutation = useUploadImageMutation()

  const { data, isFetching } = useAccountProfileById()
  const profile = data?.payload.data ?? null

  const form = useForm<AccountProfileBodyType>({
    resolver: zodResolver(accountProfileBody),
    defaultValues: {
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      dob: profile?.dob ?? '',
      avatarUrl: profile?.avatarUrl ?? ''
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName ?? '',
        lastName: profile.lastName ?? '',
        dob: profile.dob ?? '',
        avatarUrl: profile.avatarUrl ?? ''
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
      const isValid = await form.trigger()
      if (!isValid) return

      const isChanged = Object.keys(values).some(
        (key) => values[key as keyof AccountProfileBodyType] !== profile?.[key as keyof AccountProfileBodyType]
      )
      if (!isChanged) {
        return toast({
          title: 'Lỗi',
          description: 'Vui lòng cập nhật thông tin mới để thực hiện thay đổi'
        })
      }

      if (file) {
        const formData = new FormData()
        formData.append('images', file)
        const result = await uploadImageMutation.mutateAsync(formData)

        if (Array.isArray(result.payload.data)) {
          values.avatarUrl = result.payload.data[0]
        } else {
          values.avatarUrl = result.payload.data
        }
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

  if (isFetching) {
    return <ProfileFormSkeleton />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='shadow-sm border-gray-100'>
          <CardContent className='p-6'>
            <div className='flex items-center gap-8 pb-8 mb-8 border-b'>
              <div className='relative group'>
                <Avatar className='w-28 h-28 rounded-2xl border-2 border-primary/10 ring-4 ring-primary/5'>
                  <AvatarImage src={previewAvatarFromFile} className='object-cover' />
                </Avatar>
                <Button
                  type='button'
                  size='sm'
                  onClick={() => inputRef.current?.click()}
                  className='absolute -bottom-2 -right-2 rounded-xl w-9 h-9 p-0 
                    bg-white shadow-lg border-2 border-primary/10 text-primary 
                    hover:bg-primary/5 hover:scale-105 transition-all duration-200'
                >
                  <Upload className='w-4 h-4' />
                </Button>
                <Input
                  className='hidden'
                  type='file'
                  accept='image/*'
                  ref={inputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setFile(file)
                      form.setValue('avatarUrl', 'http://localhost:3000/' + file.name)
                    }
                  }}
                />
              </div>
              <div>
                <h4 className='text-xl font-semibold text-gray-900'>Ảnh đại diện</h4>
                <p className='text-sm text-gray-500 mt-1.5 leading-relaxed'>
                  Thêm ảnh đại diện để cá nhân hóa tài khoản của bạn.
                  <br />
                  Nên là ảnh vuông, định dạng PNG hoặc JPG và không quá 1MB.
                </p>
              </div>
            </div>

            <div className='space-y-8'>
              {/* Basic Information Section */}
              <div>
                <h4 className='text-base font-medium text-gray-900 mb-5'>Thông tin cơ bản</h4>
                <div className='grid md:grid-cols-2 gap-6'>
                  {/* Username - Disabled */}
                  <FormItem>
                    <FormLabel className='text-sm text-gray-600'>Tên người dùng</FormLabel>
                    <div className='relative mt-1.5'>
                      <Input
                        disabled
                        value={profile?.username}
                        className='h-10 bg-gray-50/80 border-gray-200 text-gray-500 pr-24'
                      />
                      <div className='absolute right-2 top-1/2 -translate-y-1/2'>
                        <div className='text-[11px] bg-gray-100/80 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200/50'>
                          Không thể thay đổi
                        </div>
                      </div>
                    </div>
                  </FormItem>

                  {/* Date of Birth */}
                  <FormField
                    control={form.control}
                    name='dob'
                    render={({ field }) => {
                      // Hỗ trợ xử lý 2 kiểu định dạng
                      const getDateObject = (value: string) => {
                        if (!value) return undefined

                        // Nếu là định dạng mm/dd/yyyy (từ backend)
                        if (value.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
                          try {
                            const [month, day, year] = value.split('/').map(Number)
                            // Tạo Date với tháng - 1 (vì JavaScript tháng từ 0-11)
                            return new Date(year, month - 1, day)
                          } catch (error) {
                            console.error('Lỗi parse ngày tháng:', error)
                            return undefined
                          }
                        }

                        return undefined
                      }

                      // Định dạng để hiển thị trên giao diện người dùng
                      const formatDateForDisplay = (date: Date) => {
                        // format theo tiếng việt hoặc số không chứ không để tiếng anh
                        return format(date, 'dd/MM/yyyy')
                      }

                      // Định dạng để gửi về backend (mm/dd/yyyy)
                      const formatDateForBackend = (date: Date) => {
                        return format(date, 'MM/dd/yyyy')
                      }

                      const dateValue = typeof field.value === 'string' ? getDateObject(field.value) : field.value

                      return (
                        <FormItem>
                          <FormLabel className='text-sm text-gray-600'>Ngày sinh</FormLabel>
                          <div className='mt-1.5'>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    type='button'
                                    variant='outline'
                                    className={cn(
                                      'w-full h-10 px-3 justify-start text-left font-normal border-gray-200',
                                      !field.value && 'text-gray-400'
                                    )}
                                  >
                                    {dateValue ? formatDateForDisplay(dateValue) : 'Chọn ngày sinh'}
                                    <CalendarIcon className='w-4 h-4 ml-auto opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className='w-auto p-0' align='start'>
                                <Calendar
                                  selected={dateValue}
                                  onSelect={(date) => {
                                    // Khi chọn ngày, gửi định dạng mm/dd/yyyy về backend
                                    field.onChange(date ? formatDateForBackend(date) : '')
                                  }}
                                  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <FormMessage className='text-xs mt-1.5' />
                        </FormItem>
                      )
                    }}
                  />
                </div>
              </div>

              {/* Name Section */}
              <div>
                <h4 className='text-base font-medium text-gray-900 mb-5'>Họ và tên</h4>
                <div className='grid md:grid-cols-2 gap-6'>
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm text-gray-600'>Họ và tên đệm</FormLabel>
                        <div className='relative mt-1.5'>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Nhập họ và tên đệm'
                              className='h-10 border-gray-200 focus:border-primary/30 focus:ring-primary/20 
                                placeholder:text-gray-300'
                            />
                          </FormControl>
                          <User className='w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        </div>
                        <FormMessage className='text-xs mt-1.5' />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm text-gray-600'>Tên</FormLabel>
                        <div className='relative mt-1.5'>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Nhập tên'
                              className='h-10 border-gray-200 focus:border-primary/30 focus:ring-primary/20 
                                placeholder:text-gray-300'
                            />
                          </FormControl>
                          <User className='w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        </div>
                        <FormMessage className='text-xs mt-1.5' />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className='flex justify-end mt-10 pt-6 border-t border-gray-100'>
              <Button
                type='submit'
                disabled={updateAccountProfileMutation.isPending}
                className='min-w-[140px] h-11 bg-primary hover:bg-primary/90 text-white gap-2
                  shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20 
                  transition-all duration-200'
              >
                {updateAccountProfileMutation.isPending ? (
                  <>
                    <span className='w-4 h-4 border-2 border-white/30 border-t-white/90 rounded-full animate-spin' />
                    Đang lưu...
                  </>
                ) : (
                  'Lưu thay đổi'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
