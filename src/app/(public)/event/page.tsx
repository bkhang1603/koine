'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEvent } from '@/queries/useEvent'
import { EventStatus } from './types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useMemo } from 'react'
import { Calendar, Search, Filter, Sparkles, Users, Clock, Video } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { EventCardSkeleton } from './components/EventCardSkeleton'
import images from '@/assets/images'

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

export default function EventPage() {
  const { data: events, isLoading } = useEvent()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState<EventStatus>('OPENING')
  const router = useRouter()

  // const isOpenable = (eventStartAt: string, duration: number): boolean => {
  //   const now = new Date()
  //   const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
  //   const startTime = new Date(eventStartAt)
  //   const endDate = new Date(startTime.getTime() + duration * 1000)
  //   return localTime.getTime() >= startTime.getTime() && localTime.getTime() < endDate.getTime()
  // }

  const filteredEvents = useMemo(() => {
    if (!events?.payload?.data) return []

    let result = events.payload.data

    // Filter by status
    if (selectedTab) {
      result = result.filter((event) => event.status === selectedTab)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (event) => event.title.toLowerCase().includes(query) || event.description.toLowerCase().includes(query)
      )
    }

    return result
  }, [events?.payload?.data, selectedTab, searchQuery])

  return (
    <main className='min-h-screen pb-32'>
      {/* Hero Section */}
      <section className='relative h-[40vh] bg-black'>
        <div className='absolute inset-0'>
          <Image src={images.eventBanner} alt='Events' fill className='object-cover opacity-50' />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60' />
        </div>

        <div className='relative h-full container flex flex-col justify-center items-center text-center'>
          <Badge className='bg-white/10 text-white backdrop-blur-sm mb-6 px-4 py-2'>
            <Sparkles className='h-4 w-4 mr-2' />
            Khám phá sự kiện nổi bật
          </Badge>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl'>
            Tham gia các sự kiện độc đáo và truyền cảm hứng
          </h1>
          <p className='text-lg text-white/80 max-w-2xl mb-8'>
            Khám phá và tham gia các sự kiện trực tuyến và trực tiếp từ những người dẫn đầu trong ngành
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className='container -mt-16 relative'>
        <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>
          <div className='flex flex-col md:flex-row gap-4 items-stretch md:items-center'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                placeholder='Tìm kiếm sự kiện...'
                className='pl-10'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className='flex gap-4'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='gap-2'>
                    <Filter className='h-4 w-4' />
                    Bộ lọc
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuItem>Sắp xếp theo ngày</DropdownMenuItem>
                  <DropdownMenuItem>Sắp xếp theo số người tham gia</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button>Tạo sự kiện</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Event List */}
      <section className='container mt-16'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
          <div>
            <h2 className='text-2xl font-bold mb-2'>Tất cả sự kiện</h2>
            <p className='text-gray-500'>Khám phá các sự kiện phù hợp với bạn</p>
          </div>
          {/* Tôi muốn không hiện tab đã hủy */}
          <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as EventStatus)}>
            <TabsList>
              {Object.entries(eventStatusConfig).map(
                ([status, config]) =>
                  status !== 'CANCELLED' && (
                    <TabsTrigger key={status} value={status} className='min-w-[120px]'>
                      {config.label}
                    </TabsTrigger>
                  )
              )}
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className='group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full'
                onClick={() => {
                  const encodedData = encodeURIComponent(JSON.stringify(event))
                  router.push(`/event/${event.id}?data=${encodedData}`)
                }}
              >
                <div className='relative h-48'>
                  <Image
                    src={event.imageUrl || '/placeholder.svg'}
                    alt={event.title}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                  <Badge className={cn('absolute top-4 right-4', eventStatusConfig[event.status as EventStatus].color)}>
                    {eventStatusConfig[event.status as EventStatus].label}
                  </Badge>
                </div>

                <div className='p-6 flex flex-col flex-1'>
                  <div className='flex items-center gap-2 mb-3'>
                    <div className='h-8 w-8 rounded-full overflow-hidden'>
                      <Image
                        src={event.hostInfo.avatarUrl}
                        alt={event.hostInfo.fullName}
                        width={32}
                        height={32}
                        className='object-cover'
                      />
                    </div>
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
                          <span>{event.startAtFormatted}</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <Clock className='h-4 w-4' />
                          <span>{event.durationsDisplay}</span>
                        </div>
                      </div>
                      <div className='flex items-center gap-1.5 text-primary font-medium'>
                        <Users className='h-4 w-4' />
                        <span>{event.totalParticipants}</span>
                      </div>
                    </div>

                    {/* {isOpenable(event.startedAt, event.durations) && event.status === 'OPENING' && (
                      <Button
                        className='w-full mt-4'
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <PlayCircle className='h-4 w-4 mr-2' />
                        Tham gia ngay
                      </Button>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-16 bg-white rounded-3xl'>
            <div className='bg-emerald-50 p-6 rounded-full mb-6'>
              <Video className='h-8 w-8 text-emerald-600' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>Chưa có sự kiện</h3>
            <p className='text-gray-500 text-center max-w-md'>
              Hiện tại chưa có sự kiện nào đang diễn ra. Vui lòng quay lại sau để xem các sự kiện mới.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
