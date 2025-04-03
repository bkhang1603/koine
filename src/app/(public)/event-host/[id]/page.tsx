'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Mic, ArrowLeft, Bell, FileVideo } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useUploadRecordMutation } from '@/queries/useUpload'
import { useUpdateEventMutation } from '@/queries/useEvent'

//for expert
export default function EventDetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const data = searchParams.get('data')

  const uploadRecord = useUploadRecordMutation()
  const updateEventInfo = useUpdateEventMutation()

  // Parse event data from URL
  const eventData = data ? JSON.parse(decodeURIComponent(data)) : null

  const [processing, setProcessing] = useState(false)
  const [uploaded, setUploaded] = useState(eventData?.recordUrl ? true : false)

  // Status styles mapping
  const statusStyles = {
    OPENING: {
      textBackgroundColor: 'bg-green-500',
      text: 'Đang diễn ra',
      textColor: 'text-black',
      backgroundColor: 'bg-green-500'
    },
    PENDING: {
      textBackgroundColor: 'bg-yellow-500',
      text: 'Chưa mở',
      textColor: 'text-black',
      backgroundColor: 'bg-gray-300'
    },
    DONE: {
      textBackgroundColor: 'bg-gray-300',
      text: 'Đã kết thúc',
      textColor: 'text-black',
      backgroundColor: 'bg-gray-300'
    },
    CANCELLED: {
      textBackgroundColor: 'bg-gray-300',
      text: 'Đã hủy',
      textColor: 'text-black',
      backgroundColor: 'bg-gray-300'
    }
  }

  // Check if event is closed
  const isClosed = (eventStartAt: string, duration: number): boolean => {
    const now = new Date()
    // Convert to GMT+7
    const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    const startTime = new Date(eventStartAt)
    const endDate = new Date(startTime.getTime() + duration * 1000) // duration in seconds
    return localTime.getTime() >= endDate.getTime()
  }

  // Handle video upload
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (processing) return
    if (!e.target.files || e.target.files.length === 0) return

    try {
      setProcessing(true)

      const file = e.target.files[0]

      // Kiểm tra MIME type của file để chắc chắn rằng đó là video
      const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/webm'] // Các loại video cho phép
      if (!allowedVideoTypes.includes(file.type)) {
        alert('Vui lòng chọn một file video hợp lệ.')
        return // Dừng nếu file không phải video
      }

      // Kiểm tra phần mở rộng video và định dạng lại tên file

      let newFileName = eventData.title + `-record-${new Date().getTime()}.mp4`

      const formData = new FormData()
      formData.append('file', new File([file], newFileName, { type: file.type }))

      const videoUrl = await uploadRecord.mutateAsync(formData)
      console.log('video url ', videoUrl)

      const res = updateEventInfo.mutateAsync({
        body: { recordUrl: videoUrl.payload.data },
        eventId: eventData.id
      })
      setUploaded(true)
      alert('Cập nhật bản ghi sự kiện thành công')
    } catch (error) {
      console.error('Lỗi upload video', error)
      alert(`Lỗi: ${error}`)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className='flex flex-col min-h-screen  justify-center items-center  bg-white'>
      <div className='flex-1 pb-6 mt-[150px]'>
        {eventData ? (
          <>
            <div className='relative w-[600px] h-[400px]'>
              <Image
                src={eventData.imageUrl || '/placeholder.svg?height=240&width=600'}
                alt={eventData.title}
                fill
                className='object-cover'
              />
            </div>

            <div className='p-4 space-y-4'>
              <h1 className='font-bold text-xl'>{eventData.title}</h1>
              <p className='ml-1'>{eventData.description}</p>

              <div className='flex items-center py-2'>
                <Mic className='h-5 w-5 mr-2' />
                <span className='font-semibold'>{eventData.hostInfo?.fullName || 'Unknown Host'}</span>
              </div>

              <div className='flex items-center py-2'>
                <Calendar className='h-5 w-5 mr-2' />
                <span className='font-semibold'>
                  {eventData.startAtFormatted || new Date(eventData.startedAt).toLocaleString()}
                </span>
              </div>

              <div className='flex items-center py-2'>
                <Clock className='h-5 w-5 mr-2' />
                <span className='font-semibold'>
                  {eventData.durationsDisplay ||
                    `${Math.floor(eventData.durations / 3600)} giờ ${Math.floor((eventData.durations % 3600) / 60)} phút`}
                </span>
              </div>

              <div className='flex items-center py-2'>
                <span className='font-semibold mr-2'>Trạng thái:</span>
                <div
                  className={`p-1 ${statusStyles[eventData.status.toUpperCase() as keyof typeof statusStyles]?.textBackgroundColor} rounded-lg`}
                >
                  <span
                    className={`${statusStyles[eventData.status.toUpperCase() as keyof typeof statusStyles]?.textColor} font-semibold`}
                  >
                    {eventData.status.toUpperCase() === 'OPENING' && isClosed(eventData.startedAt, eventData.durations)
                      ? 'Đã kết thúc'
                      : statusStyles[eventData.status.toUpperCase() as keyof typeof statusStyles]?.text}
                  </span>
                </div>
              </div>

              <div className='flex items-center py-2'>
                <FileVideo className='h-5 w-5 mr-2' />
                <div
                  className={`${uploaded || eventData.recordUrl?.length > 0 ? 'bg-gray-300' : 'bg-blue-400'} rounded-lg p-1`}
                >
                  <span className='font-semibold'>
                    {uploaded || eventData.recordUrl?.length > 0 ? 'Đã chọn' : 'Chưa chọn'}
                  </span>
                </div>
              </div>
            </div>

            {!isClosed(eventData.startedAt, eventData.durations) ? null : (
              <div className='w-full flex justify-center items-center mt-4 px-4'>
                {uploaded ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className='w-full py-6 bg-gray-300 hover:bg-gray-400' disabled={processing}>
                        <span className='font-bold'>Tải lên bản ghi cuộc họp</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Thông báo</AlertDialogTitle>
                        <AlertDialogDescription>Nếu tải lên bản ghi mới, bản ghi cũ sẽ bị xóa</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <label className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'>
                            Tải lên
                            <input
                              type='file'
                              accept='video/*'
                              className='hidden'
                              onChange={handleVideoUpload}
                              disabled={processing}
                            />
                          </label>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <label
                    className={`inline-flex h-12 w-full items-center justify-center rounded-lg ${!processing ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-gray-300'} px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer`}
                  >
                    <span className='font-bold'>Tải lên bản ghi cuộc họp</span>
                    <input
                      type='file'
                      accept='video/*'
                      className='hidden'
                      onChange={handleVideoUpload}
                      disabled={processing}
                    />
                  </label>
                )}
              </div>
            )}
          </>
        ) : (
          <Alert className='m-4'>
            <AlertTitle>Không có thông tin sự kiện</AlertTitle>
            <AlertDescription>Không thể tải thông tin sự kiện. Vui lòng thử lại sau.</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
