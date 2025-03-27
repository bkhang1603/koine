'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Clock, Mic } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

//for user
export default function EventDetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const data = searchParams.get('data')

  // Parse event data from URL
  const eventData = data ? JSON.parse(decodeURIComponent(data)) : null

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

              {eventData.recordUrl.length != 0 ? (
                <div>
                  <p>Chỗ chiếu video</p>
                </div>
              ) : (
                <div>
                  <p> chiếu video ở đây - Sự kiện này không có bản ghi</p>
                </div>
              )}
            </div>
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
