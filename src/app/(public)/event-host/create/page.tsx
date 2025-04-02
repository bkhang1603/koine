'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TimePickerDemo } from './time-picker'
import { format } from 'date-fns'
import { ArrowLeft, Bell, Camera, CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUploadImageMutation } from '@/queries/useUpload'
import { useCreateEventMutation } from '@/queries/useEvent'

//for expert
export default function CreateEventPage() {
  const router = useRouter()
  const now = new Date()
  const uploadImage = useUploadImageMutation()
  const createEvent = useCreateEventMutation()

  // State variables
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startAt, setStartAt] = useState(new Date(now.getTime() + 7 * 60 * 60 * 1000))
  const [imageUrl, setImageUrl] = useState('')
  const [duration, setDuration] = useState('')
  const [processing, setProcessing] = useState(false)
  const [first, setFirst] = useState(true)
  const [hours, setHours] = useState(startAt.getHours())
  const [minutes, setMinutes] = useState(startAt.getMinutes())

  // Validation
  const isValidTitle = title.length >= 10 && title.length <= 30
  const isValidDescription = description.length >= 30
  const isValidDuration =
    !isNaN(Number.parseFloat(duration)) && Number.parseFloat(duration) >= 0.5 && Number.parseFloat(duration) <= 3

  const nowGmt7 = new Date(now.getTime() + 7 * 60 * 60 * 1000)
  const isValidStartAt = startAt.getTime() >= nowGmt7.getTime() + 7 * 1000 * 3600
  const isFormValid = isValidTitle && isValidDescription && isValidDuration && isValidStartAt

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0]

      let newFileName = title + `-event-banner-${new Date().getTime()}.jpg`

      const formData = new FormData()
      formData.append('images', new File([file], newFileName, { type: file.type }))

      const uploadResult = await uploadImage.mutateAsync(formData)
      if (uploadResult?.payload?.data) {
        // Đảm bảo imageUrl luôn là string dù API trả về mảng hay string đơn lẻ
        const imageUrl = Array.isArray(uploadResult.payload.data)
          ? uploadResult.payload.data[0] // Lấy phần tử đầu tiên nếu là mảng
          : uploadResult.payload.data // Sử dụng nguyên nếu là string

        setImageUrl(imageUrl)
      } else {
        throw new Error('Không thể tải hình ảnh lên')
      }
    } catch (error) {
      alert(`Lỗi khi tải lên ảnh: ${error}`)
    }
  }

  // Date and time handlers
  const handleDateChange = (date: Date | null) => {
    setFirst(false)
    if (date) {
      const newDate = new Date(date)
      newDate.setHours(hours, minutes, 0, 0)
      setStartAt(newDate)
      console.log('date ', newDate)
    }
  }

  const handleTimeChange = (hours: number, minutes: number) => {
    setFirst(false)
    setHours(hours)
    setMinutes(minutes)
    const newDate = new Date(startAt)
    newDate.setHours(hours, minutes, 0, 0)
    setStartAt(newDate)
    console.log('date ', newDate)
  }

  // Form submission
  const handleCreateEvent = async () => {
    if (processing) return

    try {
      setProcessing(true)

      const submitStartAt = new Date(startAt.getTime()).toISOString()

      const eventData = {
        title,
        description,
        startedAt: submitStartAt,
        imageUrl,
        durations: duration.includes(',')
          ? Math.round(Number.parseFloat(duration.replace(',', '.')) * 3600)
          : Math.round(Number.parseFloat(duration) * 3600)
      }

      console.log('Dữ liệu gửi:', eventData)
      const res = createEvent.mutateAsync({ body: eventData })
      alert('Thành công: Sự kiện đã được tạo!')
    } catch (error) {
      alert(`Lỗi: Tạo sự kiện thất bại ${error}`)
    } finally {
      setTimeout(() => {
        setProcessing(false)
      }, 500)
    }
  }

  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <h1 className='text-2xl font-bold my-4 text-center mt-[50px]'>Tạo sự kiện mới</h1>

      <div className='flex-1 p-4 max-w-3xl mx-auto w-full'>
        <div className='space-y-6'>
          {/* Image Upload */}
          <div className='flex justify-center py-6'>
            <div className='relative'>
              <div className='w-[750px] h-[400px] rounded-md border-2 border-black overflow-hidden'>
                {imageUrl ? (
                  <Image src={imageUrl || '/placeholder.svg'} alt='Event thumbnail' fill className='object-cover' />
                ) : (
                  <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                    <span className='text-gray-500'>No image selected</span>
                  </div>
                )}
              </div>
              <label
                htmlFor='image-upload'
                className='absolute bottom-1 right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer'
              >
                <Camera className='h-5 w-5 text-white' />
                <input id='image-upload' type='file' accept='image/*' className='hidden' onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          {/* Title */}
          <div className='space-y-2'>
            <label htmlFor='title' className='font-semibold'>
              Tiêu đề sự kiện:
            </label>
            <Input id='title' placeholder='Nhập tiêu đề...' value={title} onChange={(e) => setTitle(e.target.value)} />
            {!isValidTitle && title.trim().length > 0 && (
              <p className='text-red-500 text-sm'>Tiêu đề phải từ 10 đến 30 ký tự</p>
            )}
          </div>

          {/* Description */}
          <div className='space-y-2'>
            <label htmlFor='description' className='font-semibold'>
              Mô tả nội dung:
            </label>
            <Textarea
              id='description'
              placeholder='Nhập mô tả...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
            {!isValidDescription && description.trim().length > 0 && (
              <p className='text-red-500 text-sm'>Mô tả phải ít nhất 30 ký tự</p>
            )}
          </div>

          {/* Start Time */}
          <div className='space-y-2'>
            <label className='font-semibold'>Thời gian bắt đầu:</label>
            <div className='flex items-center space-x-3'>
              <div className='border p-4 rounded-md flex-1'>
                <p className='text-black font-bold text-center'>{format(startAt, 'HH:mm:ss dd-MM-yyyy')}</p>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline' className='bg-cyan-200 hover:bg-cyan-300 p-3 h-auto'>
                    <CalendarIcon className='h-6 w-6' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={startAt}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => date < now}
                  />
                  <div className='p-3 border-t border-border'>
                    <TimePickerDemo
                      setHours={setHours}
                      setMinutes={setMinutes}
                      initHours={hours}
                      initMinutes={minutes}
                      onTimeChange={handleTimeChange}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {!isValidStartAt && !first && (
              <p className='text-red-500 text-sm'>Thời gian bắt đầu phải cách hiện tại ít nhất 7h</p>
            )}
          </div>

          {/* Duration */}
          <div className='space-y-2'>
            <label htmlFor='duration' className='font-semibold'>
              Thời lượng:
            </label>
            <Input
              id='duration'
              placeholder='Nhập số giờ... VD: 1.5 = 1h30p'
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              type='text'
              inputMode='decimal'
            />
            {!isValidDuration && duration.trim().length > 0 && (
              <p className='text-red-500 text-sm'>Thời lượng phải trong khoảng 30 phút đến 3 giờ</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className='flex justify-center items-center w-[60% p-4'>
        <Button
          className={cn(
            'w-[40%] py-6 text-lg',
            isFormValid && !processing
              ? 'bg-cyan-500 hover:bg-cyan-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          )}
          onClick={handleCreateEvent}
          disabled={!isFormValid || processing}
        >
          <span className='font-semibold'>Tạo sự kiện</span>
        </Button>
      </div>
    </div>
  )
}
