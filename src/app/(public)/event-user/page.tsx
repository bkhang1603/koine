'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEvent } from '@/queries/useEvent'
import { Calendar, Clock, Mic } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { WherebyMeeting } from '@/app/(public)/event-user/ui'
//for user
function EventPage() {
  const { data: events, isLoading, isError, error, refetch } = useEvent()

  const [isProcessing, setIsProcessing] = useState(false)
  const [isMeetingOpen, setIsMeetingOpen] = useState(false) // State to control dialog open/close
  const [meetingUrl, setMeetingUrl] = useState('') // State to store the meeting URL

  const router = useRouter()

  if (isLoading) console.log('loading')
  if (isError) console.log('error ', error)

  const statusStyles = useMemo(
    () => ({
      OPENING: {
        variant: 'success' as const,
        text: 'Đang diễn ra'
      },
      PENDING: {
        variant: 'warning' as const,
        text: 'Chưa mở'
      },
      DONE: {
        variant: 'secondary' as const,
        text: 'Đã kết thúc'
      },
      CANCELLED: {
        variant: 'destructive' as const,
        text: 'Đã hủy'
      }
    }),
    []
  )

  const openMeet = async (roomUrl: string | null) => {
    try {
      if (!roomUrl) roomUrl = ''
      setMeetingUrl(roomUrl) // Set the meeting URL to state
      setIsMeetingOpen(true) // Open the meeting dialog
      refetch()
    } catch (error) {
      console.log('Lỗi khi mở meet ', error)
    } finally {
      setTimeout(() => {
        setIsProcessing(false)
      }, 500)
    }
  }

  const isOpenable = (eventStartAt: string, duration: number): boolean => {
    const now = new Date()
    // Chuyển giờ về GMT+7 (đảm bảo giờ giữ nguyên)
    const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    const startTime = new Date(eventStartAt)
    const endDate = new Date(startTime.getTime() + duration * 1000) // duration tính theo giây
    return localTime.getTime() >= startTime.getTime() && localTime.getTime() < endDate.getTime() // chỉ mở khi trong khoảng startTime -> endDate
  }

  const isClosed = (eventStartAt: string, duration: number): boolean => {
    const now = new Date()
    // Chuyển giờ về GMT+7 (đảm bảo giờ giữ nguyên)
    const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    const startTime = new Date(eventStartAt)
    const endDate = new Date(startTime.getTime() + duration * 1000) // duration tính theo giây
    return localTime.getTime() >= endDate.getTime() // chỉ mở khi trong khoảng startTime -> endDate
  }

  const getEventStatus = (event: any) => {
    if (event.status.toUpperCase() === 'OPENING' && isClosed(event.startedAt, event.durations)) {
      return {
        variant: 'secondary' as const,
        text: 'Đã kết thúc'
      }
    }
    return statusStyles[event.status.toUpperCase() as keyof typeof statusStyles]
  }

  return (
    <div className='container mx-auto py-8'>
      <div className='flex justify-between items-center mb-6'>
        <div className='mt-[100px] w-full'>
          <h1 className='text-3xl font-bold'>Danh sách sự kiện</h1>

          <p className='text-muted-foreground mt-1'>Đón chờ những sự kiện thú vị từ chúng tôi</p>
          <p className='text-sm text-cyan-600 mt-2'>Tổng cộng: {events ? events.payload.data.length : 0}</p>
        </div>
      </div>

      {events && events.payload.data.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {events?.payload.data.map((event: any) => (
            <Card key={event.id} className='overflow-hidden'>
              <CardHeader className='p-0'>
                <div className='relative'>
                  <Image
                    src={event.imageUrl || '/placeholder.svg'}
                    width={800}
                    height={400}
                    alt={event.title}
                    className='w-full h-48 object-cover'
                  />
                </div>
              </CardHeader>
              <CardContent className='pt-4'>
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    const encodedData = encodeURIComponent(JSON.stringify(event))
                    router.push(`/event-user/${event.id}?data=${encodedData}`)
                  }}
                >
                  <div className='flex justify-between items-center mb-2'>
                    <h2 className='text-xl font-bold line-clamp-1'>{event.title}</h2>
                    <Badge>{getEventStatus(event).text}</Badge>
                  </div>

                  <p className='text-muted-foreground line-clamp-2 mb-4'>{event.description}</p>

                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <Mic size={16} className='text-muted-foreground' />
                      <span>{event.hostInfo.fullName}</span>
                    </div>

                    <div className='flex items-center gap-2'>
                      <Calendar size={16} className='text-muted-foreground' />
                      <span>{event.startAtFormatted}</span>
                    </div>

                    <div className='flex items-center gap-2'>
                      <Clock size={16} className='text-muted-foreground' />
                      <span>{event.durationsDisplay}</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className='flex justify-center gap-4 pt-2 pb-4'>
                {isOpenable(event.startedAt, event.durations) && event.status === 'OPENING' && (
                  <Button disabled={isProcessing} onClick={() => openMeet(event.roomUrl)}>
                    Tham dự
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-12 bg-muted/20 rounded-lg'>
          <Mic size={64} className='text-muted mb-4' />
          <p className='text-muted-foreground'>Hiện không có sự kiện</p>
        </div>
      )}

      {/* Add WherebyMeeting component here */}
      <WherebyMeeting url={meetingUrl} isOpen={isMeetingOpen} onClose={() => setIsMeetingOpen(false)} />
    </div>
  )
}

export default EventPage
