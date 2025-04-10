'use client'

import { Badge } from '@/components/ui/badge'
import { EventStatus } from '../types'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Calendar, Users, Clock, Video } from 'lucide-react'
import { cn, formatAvatarFallback, formatDateEvent, formatDuration } from '@/lib/utils'
import configRoute from '@/config/route'
import { useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

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

interface EventListProps {
  events: Array<{
    id: string
    slug: string
    title: string
    description: string
    content: string
    startedAt: string
    imageUrl: string
    durations: number
    status: string
    roomUrl: string
    totalParticipants: number
    createdAt?: string
    hostInfo: {
      fullName: string
      email: string
      avatarUrl: string
    }
  }>
}

export function EventList({ events }: EventListProps) {
  const searchParams = useSearchParams()

  // Lấy các param từ URL
  const status = searchParams.get('status') || 'ALL'
  const sort = searchParams.get('sort') || 'newest'
  const searchQuery = searchParams.get('q') || ''

  // Áp dụng logic filter và sort ở client
  const filteredEvents = useMemo(() => {
    // Lọc theo trạng thái
    let filtered = [...events]
    if (status && status !== 'ALL') {
      filtered = filtered.filter((event) => event.status === status)
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Sắp xếp theo các tiêu chí
    if (sort === 'newest') {
      filtered.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateB - dateA
      })
    } else if (sort === 'upcoming') {
      filtered.sort((a, b) => {
        const dateA = new Date(a.startedAt).getTime()
        const dateB = new Date(b.startedAt).getTime()
        return dateA - dateB
      })
    } else if (sort === 'participants') {
      filtered.sort((a, b) => b.totalParticipants - a.totalParticipants)
    }

    return filtered
  }, [events, status, sort, searchQuery])

  if (filteredEvents.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 bg-white rounded-3xl'>
        <div className='bg-emerald-50 p-6 rounded-full mb-6'>
          <Video className='h-8 w-8 text-emerald-600' />
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>Không tìm thấy sự kiện</h3>
        <p className='text-gray-500 text-center max-w-md'>
          {searchQuery
            ? `Không tìm thấy sự kiện nào phù hợp với từ khóa "${searchQuery}"`
            : status !== 'ALL'
              ? `Hiện tại chưa có sự kiện nào ${eventStatusConfig[status as EventStatus].label.toLowerCase()}`
              : 'Hiện tại chưa có sự kiện nào. Vui lòng quay lại sau để xem các sự kiện mới.'}
        </p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {filteredEvents.map((event) => (
        <Link
          key={event.id}
          href={`${configRoute.event}/${event.slug}`}
          className='group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full'
        >
          <div className='relative h-48'>
            <Image
              src={event.imageUrl ?? '/placeholder.svg'}
              alt={event.title}
              width={800}
              height={800}
              className='object-cover transition-transform duration-500 group-hover:scale-105 h-full w-full'
            />
            <Badge className={cn('absolute top-4 right-4', eventStatusConfig[event.status as EventStatus].color)}>
              {eventStatusConfig[event.status as EventStatus].label}
            </Badge>
          </div>

          <div className='p-6 flex flex-col flex-1'>
            <div className='flex items-center gap-2 mb-3'>
              <Avatar className='w-8 h-8'>
                <AvatarImage src={event.hostInfo.avatarUrl ?? '/placeholder-avatar.svg'} />
                <AvatarFallback>{formatAvatarFallback(event.hostInfo.email)}</AvatarFallback>
              </Avatar>
              <div>
                <p className='text-sm font-medium'>{event.hostInfo.fullName}</p>
                <p className='text-xs text-gray-500'>{event.hostInfo.email}</p>
              </div>
            </div>

            <h3 className='text-lg font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors'>
              {event.title}
            </h3>
            <p className='text-gray-500 text-sm mb-4 line-clamp-2 flex-1'>{event.description}</p>

            <div className='border-t pt-4 mt-auto'>
              <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-4 text-gray-500'>
                  <div className='flex items-center gap-1.5'>
                    <Calendar className='h-4 w-4' />
                    <span>{formatDateEvent(event.startedAt)}</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <Clock className='h-4 w-4' />
                    <span>{formatDuration(event.durations)}</span>
                  </div>
                </div>
                <div className='flex items-center gap-1.5 text-primary font-medium'>
                  <Users className='h-4 w-4' />
                  <span>{event.totalParticipants}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
