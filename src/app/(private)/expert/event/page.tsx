'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEventForHost } from '@/queries/useEvent'
import { Calendar, Clock, Mic, Plus, Search, Video } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useMemo } from 'react'
import formatDurationForString from '../../../../../formatDuration'

// Constants
const EVENT_STATUS = {
  OPENING: {
    variant: 'green' as const,
    text: 'Đang diễn ra'
  },
  PENDING: {
    variant: 'yellow' as const,
    text: 'Chưa mở'
  },
  DONE: {
    variant: 'secondary' as const,
    text: 'Đã kết thúc'
  },
  CANCELLED: {
    variant: 'red' as const,
    text: 'Đã hủy'
  }
} as const

const STATUS_FILTERS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'OPENING', label: 'Đang diễn ra' },
  { value: 'PENDING', label: 'Sắp diễn ra' },
  { value: 'DONE', label: 'Đã kết thúc' },
  { value: 'CANCELLED', label: 'Đã hủy' }
]

// Utility functions
const formatEventTime = (startAt: string, duration: number) => {
  const startTime = new Date(startAt)
  const endTime = new Date(startTime.getTime() + duration * 1000)
  return {
    start: format(startTime, 'HH:mm, dd/MM/yyyy', { locale: vi }),
    end: format(endTime, 'HH:mm, dd/MM/yyyy', { locale: vi })
  }
}

// Main component
export default function EventPage() {
  const { data: events, isLoading } = useEventForHost()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Filter events based on search query and status
  const filteredEvents = useMemo(() => {
    if (!events?.payload.data) return []

    return events.payload.data.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [events?.payload.data, searchQuery, statusFilter])

  if (isLoading) {
    return (
      <div className='container mx-auto py-8 space-y-6'>
        {/* Header Skeleton */}
        <div className='flex justify-between items-center'>
          <div className='space-y-2'>
            <Skeleton className='h-8 w-64' />
            <Skeleton className='h-4 w-96' />
          </div>
          <Skeleton className='h-10 w-32' />
        </div>

        {/* Stats Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {[...Array(4)].map((_, i) => (
            <Card key={i} className='p-4'>
              <div className='flex items-center gap-4'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-6 w-16' />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filter Skeleton */}
        <div className='flex flex-col md:flex-row gap-4'>
          <Skeleton className='h-10 flex-1' />
          <Skeleton className='h-10 w-[200px]' />
        </div>

        {/* Events List Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, i) => (
            <Card key={i} className='overflow-hidden'>
              <Skeleton className='h-48 w-full' />
              <CardContent className='pt-4 space-y-4'>
                <div className='flex justify-between items-start'>
                  <Skeleton className='h-6 w-3/4' />
                  <Skeleton className='h-5 w-20' />
                </div>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-2/3' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                </div>
              </CardContent>
              <CardFooter className='pt-2 pb-4'>
                <Skeleton className='h-10 w-full' />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto py-8 space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold'>Quản lý sự kiện</h1>
          <p className='text-muted-foreground mt-1'>Tạo và quản lý các sự kiện trực tuyến của bạn</p>
        </div>
        <Button asChild>
          <Link href='/expert/event/new' className='gap-2'>
            <Plus size={16} />
            Tạo sự kiện mới
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card className='p-4'>
          <div className='flex items-center gap-4'>
            <div className='p-2 bg-primary/10 rounded-full'>
              <Calendar className='w-6 h-6 text-primary' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Tổng số sự kiện</p>
              <p className='text-2xl font-bold'>{events?.payload.data.length || 0}</p>
            </div>
          </div>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-4'>
            <div className='p-2 bg-success/10 rounded-full'>
              <Video className='w-6 h-6 text-success' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Đang diễn ra</p>
              <p className='text-2xl font-bold'>
                {events?.payload.data.filter((e) => e.status === 'OPENING').length || 0}
              </p>
            </div>
          </div>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-4'>
            <div className='p-2 bg-warning/10 rounded-full'>
              <Clock className='w-6 h-6 text-warning' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Sắp diễn ra</p>
              <p className='text-2xl font-bold'>
                {events?.payload.data.filter((e) => e.status === 'PENDING').length || 0}
              </p>
            </div>
          </div>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-4'>
            <div className='p-2 bg-secondary/10 rounded-full'>
              <Mic className='w-6 h-6 text-secondary' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Đã kết thúc</p>
              <p className='text-2xl font-bold'>
                {events?.payload.data.filter((e) => e.status === 'DONE').length || 0}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Tìm kiếm sự kiện...'
            className='pl-9'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className='w-full md:w-[200px]'>
            <SelectValue placeholder='Lọc theo trạng thái' />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTERS.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Events List */}
      {filteredEvents.length ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredEvents.map((event) => {
            const eventTime = formatEventTime(event.startedAt, event.durations)

            return (
              <Card key={event.id} className='flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow'>
                <CardHeader className='p-0'>
                  <div className='relative'>
                    <Image
                      src={event.imageUrl || '/placeholder.svg'}
                      width={800}
                      height={400}
                      alt={event.title}
                      className='w-full h-48 object-cover'
                    />
                    <Badge
                      variant={EVENT_STATUS[event.status as keyof typeof EVENT_STATUS].variant}
                      className='absolute bottom-2 right-2'
                    >
                      {EVENT_STATUS[event.status as keyof typeof EVENT_STATUS].text}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className='pt-4 space-y-4 flex-grow flex flex-col'>
                  <div className='flex justify-between items-start'>
                    <h2 className='text-xl font-bold line-clamp-1'>{event.title}</h2>
                  </div>

                  <p className='text-muted-foreground line-clamp-2'>{event.description} </p>

                  <div className='space-y-2 text-sm mt-auto'>
                    <div className='flex items-center gap-2'>
                      <Mic size={16} className='text-muted-foreground' />
                      <span>{event.hostInfo.fullName}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Calendar size={16} className='text-muted-foreground' />
                      <span>{eventTime.start}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Clock size={16} className='text-muted-foreground' />
                      <span>{formatDurationForString(event.durationsDisplay)}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className='flex justify-center gap-4 pt-2 pb-4'>
                  <Button variant='outline' className='w-full' asChild>
                    <Link href={`/expert/event/${event.id}`}>Xem chi tiết</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className='border-dashed'>
          <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
            <div className='rounded-full bg-muted p-3 mb-4'>
              <Mic className='h-8 w-8 text-muted-foreground' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>
              {searchQuery || statusFilter !== 'all' ? 'Không tìm thấy sự kiện phù hợp' : 'Chưa có sự kiện nào'}
            </h3>
            <p className='text-muted-foreground max-w-sm mb-6'>
              {searchQuery || statusFilter !== 'all'
                ? 'Không có sự kiện nào phù hợp với tiêu chí tìm kiếm của bạn. Hãy thử thay đổi từ khóa hoặc bộ lọc.'
                : 'Bạn chưa tạo sự kiện nào. Hãy bắt đầu bằng cách tạo sự kiện mới.'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Button asChild>
                <Link href='/expert/event/new' className='gap-2'>
                  <Plus size={16} />
                  Tạo sự kiện mới
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
