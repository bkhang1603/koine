'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EventStatus } from '../types'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Calendar, Users, Clock, PlayCircle } from 'lucide-react'
import { cn, handleErrorApi } from '@/lib/utils'
import { Breadcrumb } from '@/components/public/parent/setting/Breadcrumb'
import { WherebyMeeting } from '@/app/(public)/event/ui'

const eventStatusConfig: Record<EventStatus, { label: string; color: string }> = {
  OPENING: {
    label: 'Đang diễn ra',
    color: 'bg-green-50 text-green-600'
  },
  PENDING: {
    label: 'Sắp diễn ra',
    color: 'bg-blue-50 text-blue-600'
  },
  DONE: {
    label: 'Đã kết thúc',
    color: 'bg-gray-50 text-gray-600'
  },
  CANCELLED: {
    label: 'Đã hủy',
    color: 'bg-red-50 text-red-600'
  }
}

export default function EventDetailPage() {
  const searchParams = useSearchParams()
  const eventData = searchParams.get('data')
  const event = eventData ? JSON.parse(decodeURIComponent(eventData)) : null
  const [isProcessing, setIsProcessing] = useState(false)
  const [isMeetingOpen, setIsMeetingOpen] = useState(false)
  const [meetingUrl, setMeetingUrl] = useState('')
  const router = useRouter()

  if (!event) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50/50'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Không tìm thấy sự kiện</h1>
          <Button onClick={() => router.push('/event')}>Quay lại</Button>
        </div>
      </div>
    )
  }

  const openMeet = async (roomUrl: string) => {
    try {
      setIsProcessing(true)
      setMeetingUrl(roomUrl)
      setIsMeetingOpen(true)
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setTimeout(() => {
        setIsProcessing(false)
      }, 500)
    }
  }

  const isOpenable = (eventStartAt: string, duration: number): boolean => {
    const now = new Date()
    const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    const startTime = new Date(eventStartAt)
    const endDate = new Date(startTime.getTime() + duration * 1000)
    return localTime.getTime() >= startTime.getTime() && localTime.getTime() < endDate.getTime()
  }

  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative h-[40vh] bg-black'>
        <div className='absolute inset-0'>
          <Image
            src={event.imageUrl || '/placeholder.svg'}
            alt={event.title}
            fill
            className='object-cover opacity-50'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60' />
        </div>

        <div className='relative h-full container flex flex-col justify-end pb-16'>
          <Breadcrumb
            items={[
              { title: 'Sự kiện', href: '/event' },
              { title: event.title, href: `/event/${event.id}` }
            ]}
            className='absolute top-8 left-0 ml-8 text-primary'
            colorForLink='text-white hover:text-white/80'
          />

          <Badge className={cn('self-start mb-4', eventStatusConfig[event.status as EventStatus].color)}>
            {eventStatusConfig[event.status as EventStatus].label}
          </Badge>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl'>{event.title}</h1>
          <div className='flex items-center gap-4 text-white/80 mb-2'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              <span>{event.startAtFormatted}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4' />
              <span>{event.durationsDisplay}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Users className='h-4 w-4' />
              <span>{event.totalParticipants} người tham gia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className='container -mt-16 relative'>
        <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>
          <div className='flex flex-col md:flex-row gap-8'>
            {/* Left Column */}
            <div className='flex-1'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='h-12 w-12 rounded-full overflow-hidden'>
                  <Image
                    src={event.hostInfo.avatarUrl}
                    alt={event.hostInfo.fullName}
                    width={48}
                    height={48}
                    className='object-cover'
                  />
                </div>
                <div>
                  <p className='font-medium'>{event.hostInfo.fullName}</p>
                  <p className='text-sm text-gray-500'>{event.hostInfo.email}</p>
                </div>
              </div>

              <div className='prose max-w-none'>
                <h2 className='text-2xl font-semibold mb-4'>Giới thiệu sự kiện</h2>
                <p className='text-gray-600'>{event.description}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className='w-full md:w-80 space-y-6'>
              {isOpenable(event.startedAt, event.durations) && event.status === 'OPENING' && (
                <Button className='w-full' size='lg' onClick={() => openMeet(event.roomUrl)} disabled={isProcessing}>
                  <PlayCircle className='h-4 w-4 mr-2' />
                  {isProcessing ? 'Đang kết nối...' : 'Tham gia ngay'}
                </Button>
              )}

              <div className='space-y-4'>
                <div className='flex items-center gap-2 text-gray-500'>
                  <Calendar className='h-4 w-4' />
                  <div>
                    <p className='text-sm font-medium'>Thời gian</p>
                    <p className='text-sm'>{event.startAtFormatted}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2 text-gray-500'>
                  <Clock className='h-4 w-4' />
                  <div>
                    <p className='text-sm font-medium'>Thời lượng</p>
                    <p className='text-sm'>{event.durationsDisplay}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2 text-gray-500'>
                  <Users className='h-4 w-4' />
                  <div>
                    <p className='text-sm font-medium'>Số người tham gia</p>
                    <p className='text-sm'>{event.totalParticipants} người</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WherebyMeeting url={meetingUrl} isOpen={isMeetingOpen} onClose={() => setIsMeetingOpen(false)} />
    </main>
  )
}
