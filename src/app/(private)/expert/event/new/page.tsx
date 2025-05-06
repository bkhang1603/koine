'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload, Loader2 } from 'lucide-react'
import RichTextEditor from '@/components/rich-text-editor'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useUploadImageMutation } from '@/queries/useUpload'
import { useCreateEventMutation } from '@/queries/useEvent'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { zodResolver } from '@hookform/resolvers/zod'
import { TimePickerDemo } from '@/app/(private)/expert/event/components/time-picker'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { ChevronRight } from 'lucide-react'

// Schema validation
const eventSchema = z.object({
  title: z.string().min(10, 'Tiêu đề phải có ít nhất 10 ký tự').max(100, 'Tiêu đề không được vượt quá 100 ký tự'),
  description: z.string().min(30, 'Mô tả phải có ít nhất 30 ký tự'),
  content: z.string().min(100, 'Nội dung phải có ít nhất 100 ký tự'),
  imageUrl: z.string().optional(),
  startedAt: z
    .date({
      required_error: 'Vui lòng chọn thời gian bắt đầu'
    })
    .refine(
      (val) => {
        // Lấy thời gian hiện tại theo GMT+7
        const now = new Date()
        const gmt7Offset = 7 * 60 // phút
        const localOffset = now.getTimezoneOffset() // phút
        const diffMinutes = gmt7Offset + localOffset

        const nowInGMT7 = new Date(now.getTime() + diffMinutes * 60 * 1000)
        const nowPlus7hFromGMT7 = new Date(nowInGMT7.getTime() + 7 * 60 * 60 * 1000)

        return val > nowPlus7hFromGMT7
      },
      {
        message: 'Sự kiện phải cách hiện tại ít nhất 7 giờ'
      }
    ),
  durations: z.string().refine((val) => {
    const num = parseFloat(val)
    return !isNaN(num) && num >= 0.5 && num <= 3
  }, 'Thời lượng phải từ 0.5 đến 3 giờ')
})

type EventFormValues = z.infer<typeof eventSchema>

export default function CreateEventPage() {
  const router = useRouter()
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize with current date hour and minute
  const now = new Date()
  const [hours, setHours] = useState(now.getHours())
  const [minutes, setMinutes] = useState(Math.floor(now.getMinutes() / 5) * 5) // Round to nearest 5 minutes

  const uploadMutation = useUploadImageMutation()
  const createEventMutation = useCreateEventMutation()

  // Initialize the form with React Hook Form
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      imageUrl: '',
      startedAt: (() => {
        const defaultDate = new Date()
        defaultDate.setHours(hours, minutes, 0, 0)
        return defaultDate
      })(),
      durations: '1'
    }
  })

  const onSubmit = async (data: EventFormValues) => {
    try {
      setIsSubmitting(true)

      // Upload image if present
      let imageUrl = data.imageUrl
      if (file) {
        const formData = new FormData()
        formData.append('images', file)

        try {
          const uploadResult = await uploadMutation.mutateAsync(formData)

          if (uploadResult?.payload?.data) {
            imageUrl = Array.isArray(uploadResult.payload.data)
              ? uploadResult.payload.data[0]
              : uploadResult.payload.data
          } else {
            throw new Error('Không thể tải hình ảnh lên')
          }
        } catch (uploadError) {
          handleErrorApi({
            error: uploadError,
            setError: form.setError
          })
        }
      }

      // Format date to ensure exact ISO string format (YYYY-MM-DDTHH:MM:SS)
      const eventDate = new Date(data.startedAt)
      // Ensure valid date before converting
      if (isNaN(eventDate.getTime())) {
        throw new Error('Thời gian bắt đầu không hợp lệ')
      }

      // Create event
      await createEventMutation.mutateAsync({
        body: {
          title: data.title,
          description: data.description,
          content: data.content,
          imageUrl: imageUrl || '',
          startedAt: eventDate.toISOString(),
          durations: Math.round(parseFloat(data.durations) * 3600) // Convert hours to seconds
        }
      })

      toast({
        description: 'Sự kiện đã được tạo thành công'
      })

      router.push('/expert/event')
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoading = uploadMutation.isPending || createEventMutation.isPending || isSubmitting

  return (
    <div className='container max-w-7xl mx-auto py-8 space-y-6'>
      <div className='space-y-4'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/expert/event'>Sự kiện</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className='h-4 w-4' />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Tạo sự kiện mới</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <h1 className='text-3xl font-bold'>Tạo sự kiện mới</h1>
          <p className='text-muted-foreground mt-1'>Thiết lập thông tin cho sự kiện của bạn</p>
        </div>
      </div>

      <Form {...form}>
        <div className='grid gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin sự kiện</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Image Field */}
              <FormField
                control={form.control}
                name='imageUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>Ảnh bìa sự kiện</FormLabel>
                    <FormControl>
                      <div className='flex gap-2 items-start justify-start'>
                        <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                          <AvatarImage src={preview || field.value} />
                          <AvatarFallback className='rounded-none'>Ảnh</AvatarFallback>
                        </Avatar>
                        <Input
                          className='hidden'
                          type='file'
                          accept='image/*'
                          ref={fileInputRef}
                          onChange={(e) => {
                            const selectedFile = e.target.files?.[0]
                            if (selectedFile) {
                              if (selectedFile.size > 5 * 1024 * 1024) {
                                toast({
                                  description: 'Kích thước file không được vượt quá 5MB',
                                  variant: 'destructive'
                                })
                                return
                              }
                              setFile(selectedFile)
                              const imageUrl = URL.createObjectURL(selectedFile)
                              setPreview(imageUrl)
                              field.onChange(imageUrl)
                            }
                          }}
                        />
                        <button
                          className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
                          type='button'
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className='h-4 w-4 text-muted-foreground' />
                          <span className='sr-only'>Tải ảnh lên</span>
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-sm font-medium'>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tiêu đề sự kiện' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-sm font-medium'>Mô tả ngắn</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Nhập mô tả ngắn về sự kiện' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='startedAt'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='text-sm font-medium'>Thời gian bắt đầu</FormLabel>
                      <FormControl>
                        <div className='flex items-center gap-2'>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant='outline' className='w-full justify-start'>
                                {format(field.value, 'dd/MM/yyyy', { locale: vi })}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0'>
                              <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={(date) => {
                                  if (date) {
                                    // Preserve current time when selecting a new date
                                    const newDate = new Date(date)
                                    // Set the time components from the current values
                                    newDate.setHours(hours, minutes, 0, 0)
                                    field.onChange(newDate)
                                  }
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant='outline' className='w-full justify-start'>
                                {format(field.value, 'HH:mm', { locale: vi })}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0'>
                              <TimePickerDemo
                                setHours={setHours}
                                setMinutes={setMinutes}
                                initHours={hours}
                                initMinutes={minutes}
                                onTimeChange={(h, m) => {
                                  // Update the date object with the new time values
                                  const newDate = new Date(field.value)
                                  newDate.setHours(h, m, 0, 0)
                                  // Update hours and minutes state
                                  setHours(h)
                                  setMinutes(m)
                                  field.onChange(newDate)
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='durations'
                    render={({ field }) => (
                      <FormItem className='space-y-2'>
                        <FormLabel className='text-sm font-medium'>Thời lượng (giờ)</FormLabel>
                        <FormControl>
                          <Input type='number' step='0.5' min='0.5' max='3' placeholder='VD: 1.5 = 1h30p' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-sm font-medium'>Nội dung chi tiết</FormLabel>
                    <FormControl>
                      <RichTextEditor content={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className='flex justify-end gap-4'>
            <Button variant='outline' onClick={() => form.reset()}>
              Hủy
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading} className='min-w-[120px]'>
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Đang tạo...
                </>
              ) : (
                'Tạo sự kiện'
              )}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}
