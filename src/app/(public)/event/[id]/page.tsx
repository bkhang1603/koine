import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EventStatus } from '../types'
import Image from 'next/image'
import { Calendar, Users, Clock, MapPin, User, Info, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Breadcrumb } from '@/components/public/parent/setting/Breadcrumb'
import { wrapServerApi } from '@/lib/server-utils'
import eventRequestApi from '@/apiRequests/event'
import { EventContent } from '@/app/(public)/event/components/event-content'
import { EventMeeting } from '@/app/(public)/event/components/event-meeting'
import MeetingWrapper from '@/app/(public)/event/components/meeting-wrapper'
import Link from 'next/link'
import configRoute from '@/config/route'
import { Metadata } from 'next'

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

export default async function EventDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const data = await wrapServerApi(() => eventRequestApi.getEventById({ id }))
  const event = data?.payload?.data

  if (!event) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50/50'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Không tìm thấy sự kiện</h1>
          <Button>
            <Link href={configRoute.event}>Quay lại</Link>
          </Button>
        </div>
      </div>
    )
  }

  const isOpenable = (eventStartAt: string, duration: number): boolean => {
    const now = new Date()
    const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    const startTime = new Date(eventStartAt)
    const endDate = new Date(startTime.getTime() + duration * 1000)
    return localTime.getTime() >= startTime.getTime() && localTime.getTime() < endDate.getTime()
  }

  return (
    <main className='min-h-screen bg-gray-50/30'>
      {/* Hero Section với hình ảnh đầy đủ chiều cao */}
      <section className='relative h-[50vh] lg:h-[60vh] bg-black'>
        <div className='absolute inset-0'>
          <Image
            src={event.imageUrl || '/placeholder.svg'}
            alt={event.title}
            fill
            className='object-cover opacity-60'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80' />
        </div>

        <div className='relative h-full container max-w-7xl mx-auto flex flex-col justify-end pb-16 px-4 sm:px-6'>
          <Breadcrumb
            items={[
              { title: 'Sự kiện', href: configRoute.event },
              { title: event.title, href: `${configRoute.event}/${event.slug}` }
            ]}
            className='absolute top-8 left-0 ml-8 text-primary'
            colorForLink='text-white hover:text-white/80'
          />

          <div className='max-w-4xl'>
            <Badge
              className={cn(
                'px-3 py-1 text-sm mb-4 inline-flex items-center gap-1.5',
                eventStatusConfig[event.status as EventStatus].color
              )}
            >
              <span className='h-2 w-2 rounded-full bg-current'></span>
              {eventStatusConfig[event.status as EventStatus].label}
            </Badge>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight'>{event.title}</h1>

            <div className='flex flex-wrap items-center gap-x-6 gap-y-3 text-white/90 mb-6'>
              <div className='flex items-center gap-2'>
                <Calendar className='h-5 w-5' />
                <span className='text-base'>{event.startAtFormatted}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='h-5 w-5' />
                <span className='text-base'>{event.durationsDisplay}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Users className='h-5 w-5' />
                <span className='text-base'>{event.totalParticipants} người tham gia</span>
              </div>
            </div>

            {isOpenable(event.startedAt, event.durations) && event.status === 'OPENING' && (
              <Button size='lg' className='bg-primary hover:bg-primary/90 text-white font-medium px-6 h-12'>
                <ExternalLink className='h-5 w-5 mr-2' />
                Tham gia ngay
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Content Section với thiết kế hiện đại */}
      <section className='container max-w-7xl mx-auto -mt-10 relative px-4 sm:px-6 pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Nội dung chính */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Thông tin người tổ chức */}
            <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
              <div className='p-6 sm:p-8'>
                <div className='flex items-center gap-4'>
                  <div className='h-14 w-14 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0'>
                    <Image
                      src={event.hostInfo.avatarUrl || '/placeholder-avatar.svg'}
                      alt={event.hostInfo.fullName}
                      width={56}
                      height={56}
                      className='object-cover'
                    />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold'>Người tổ chức</h3>
                    <p className='font-medium text-gray-800'>{event.hostInfo.fullName}</p>
                    <p className='text-sm text-gray-500'>{event.hostInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nội dung sự kiện */}
            <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
              <div className='p-6 sm:p-8'>
                <h2 className='text-2xl font-bold mb-6 text-gray-900 flex items-center'>
                  <Info className='h-6 w-6 mr-2 text-primary' />
                  Giới thiệu sự kiện
                </h2>
                <div className='prose prose-lg max-w-none'>
                  <EventContent content={event.content} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className='space-y-6'>
            {/* Thông tin sự kiện */}
            <div className='bg-white rounded-xl shadow-sm overflow-hidden sticky top-6'>
              <div className='p-6'>
                <h3 className='text-lg font-semibold mb-4 text-gray-900'>Thông tin sự kiện</h3>

                <div className='space-y-5'>
                  <div className='flex items-start gap-3'>
                    <Calendar className='h-5 w-5 text-primary mt-0.5' />
                    <div>
                      <p className='font-medium text-gray-900'>Thời gian</p>
                      <p className='text-gray-600'>{event.startAtFormatted}</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <Clock className='h-5 w-5 text-primary mt-0.5' />
                    <div>
                      <p className='font-medium text-gray-900'>Thời lượng</p>
                      <p className='text-gray-600'>{event.durationsDisplay}</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <Users className='h-5 w-5 text-primary mt-0.5' />
                    <div>
                      <p className='font-medium text-gray-900'>Số người tham gia</p>
                      <p className='text-gray-600'>{event.totalParticipants} người</p>
                    </div>
                  </div>
                </div>

                {isOpenable(event.startedAt, event.durations) && event.status === 'OPENING' && (
                  <div className='mt-6'>
                    <EventMeeting roomUrl={event.roomUrl} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sử dụng component MeetingWrapper */}
      <MeetingWrapper roomUrl={event.roomUrl} />
    </main>
  )
}
