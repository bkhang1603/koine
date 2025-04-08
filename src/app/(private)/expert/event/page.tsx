'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import {
  useCancelEventMutation,
  useEventForHost,
  useUpdateEventMutation,
  useUpdateEventWhenCreateRoomMutation
} from '@/queries/useEvent'
import { Calendar, Clock, Mic, Plus, Trash2, Video } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { handleErrorApi } from '@/lib/utils'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

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

// Utility functions
const formatEventTime = (startAt: string, duration: number) => {
  const startTime = new Date(startAt)
  const endTime = new Date(startTime.getTime() + duration * 1000)
  return {
    start: format(startTime, 'HH:mm, dd/MM/yyyy', { locale: vi }),
    end: format(endTime, 'HH:mm, dd/MM/yyyy', { locale: vi })
  }
}

const isEventOpenable = (startAt: string, duration: number) => {
  const now = new Date()
  const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
  const startTime = new Date(startAt)
  const endTime = new Date(startTime.getTime() + duration * 1000)
  return localTime.getTime() >= startTime.getTime() && localTime.getTime() < endTime.getTime()
}

// const isEventClosed = (startAt: string, duration: number) => {
//   const now = new Date()
//   const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
//   const startTime = new Date(startAt)
//   const endTime = new Date(startTime.getTime() + duration * 1000)
//   return localTime.getTime() >= endTime.getTime()
// }

const isEventCancelable = (startAt: string) => {
  const now = new Date()
  const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
  const startTime = new Date(startAt)
  return startTime.getTime() - localTime.getTime() >= 2 * 3600 * 1000
}

const isEventReportable = (startAt: string, totalParticipants: number, duration: number, status: string) => {
  if (status === 'DONE' || status === 'CANCELLED') return false
  const startTime = new Date(startAt)
  const endTime = new Date(startTime.getTime() + duration * 1000)
  const now = new Date()
  const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
  return localTime.getTime() >= endTime.getTime() && totalParticipants === 0
}

const getInsightsRoom = async (roomName: string) => {
  try {
    const response = await fetch(`https://api.whereby.dev/v1/insights/rooms?roomName=${encodeURIComponent(roomName)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_WHEREBY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    handleErrorApi({ error })
    return null
  }
}

// Main component
export default function EventPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cancelModal, setCancelModal] = useState<{ eventId: string; isOpen: boolean }>({ eventId: '', isOpen: false })
  const [cancelNote, setCancelNote] = useState('')
  const [cancelError, setCancelError] = useState('')

  // Queries
  const { data: events, isLoading, refetch } = useEventForHost()
  const updateRoomInfo = useUpdateEventWhenCreateRoomMutation()
  const updateEventInfo = useUpdateEventMutation()
  const cancelEvent = useCancelEventMutation()

  // Handlers
  const handleCancelEvent = async (eventId: string, note: string) => {
    try {
      await cancelEvent.mutateAsync({ body: { eventId, note } })
      setCancelModal({ eventId: '', isOpen: false })
      setCancelNote('')
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const handleUpdateEventInfo = async (roomName: string | null, eventId: string) => {
    try {
      if (isProcessing) return
      setIsProcessing(true)

      if (!roomName) return
      const res = await getInsightsRoom(roomName)
      if (!res?.results?.[0]?.totalUniqueParticipants) return

      await updateEventInfo.mutateAsync({
        body: { totalParticipants: res.results[0].totalUniqueParticipants, status: 'DONE' },
        eventId
      })
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCreateRoom = async (eventStartAt: string, duration: number, eventId: string) => {
    try {
      const now = new Date(eventStartAt)
      const endDate = new Date(now.getTime() + duration * 1000)
      const endDateISO = endDate.toISOString()

      const response = await fetch('https://api.whereby.dev/v1/meetings', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_WHEREBY_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isLocked: true,
          roomMode: 'group',
          endDate: endDateISO,
          fields: ['hostRoomUrl'],
          templateType: 'viewerMode',
          roomAccess: 'viewer'
        })
      })

      const data = await response.json()
      const body = {
        roomHostUrl: data.hostRoomUrl,
        roomName: data.roomName,
        roomUrl: data.roomUrl,
        roomContent: data.roomContent
      }

      await updateRoomInfo.mutateAsync({ body, eventId })
      window.open(data.hostRoomUrl, '_blank')
      refetch()
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const handleOpenMeet = async (
    roomHostUrl: string | null,
    eventStartAt: string,
    duration: number,
    eventId: string
  ) => {
    try {
      if (isProcessing) return
      setIsProcessing(true)

      if (!roomHostUrl) {
        await handleCreateRoom(eventStartAt, duration, eventId)
      } else {
        window.open(roomHostUrl, '_blank')
      }
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setIsProcessing(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className='container mx-auto py-8 space-y-6'>
        <div className='flex justify-between items-center'>
          <Skeleton className='h-10 w-64' />
          <Skeleton className='h-10 w-32' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, i) => (
            <Card key={i} className='overflow-hidden'>
              <Skeleton className='h-48 w-full' />
              <CardContent className='pt-4 space-y-4'>
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-1/2' />
              </CardContent>
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

      {/* Events List */}
      {events?.payload.data.length ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {events.payload.data.map((event) => {
            const eventTime = formatEventTime(event.startedAt, event.durations)
            const isOpenable = isEventOpenable(event.startedAt, event.durations)
            const isCancelable = isEventCancelable(event.startedAt)
            const isReportable = isEventReportable(
              event.startedAt,
              event.totalParticipants,
              event.durations,
              event.status
            )

            return (
              <Card key={event.id} className='overflow-hidden hover:shadow-lg transition-shadow'>
                <CardHeader className='p-0'>
                  <div className='relative'>
                    <Image
                      src={event.imageUrl || '/placeholder.svg'}
                      width={800}
                      height={400}
                      alt={event.title}
                      className='w-full h-48 object-cover'
                    />
                    {isCancelable && (
                      <Button
                        variant='destructive'
                        size='icon'
                        className='absolute top-2 right-2'
                        onClick={() => setCancelModal({ eventId: event.id, isOpen: true })}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className='pt-4 space-y-4'>
                  <div className='flex justify-between items-start'>
                    <h2 className='text-xl font-bold line-clamp-1'>{event.title}</h2>
                    <Badge variant={EVENT_STATUS[event.status as keyof typeof EVENT_STATUS].variant}>
                      {EVENT_STATUS[event.status as keyof typeof EVENT_STATUS].text}
                    </Badge>
                  </div>

                  <p className='text-muted-foreground line-clamp-2'>{event.description}</p>

                  <div className='space-y-2 text-sm'>
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
                      <span>{event.durationsDisplay}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className='flex justify-center gap-4 pt-2 pb-4'>
                  {isOpenable && (event.status === 'OPENING' || event.status === 'PENDING') && (
                    <Button
                      className='w-full'
                      disabled={isProcessing}
                      onClick={() => handleOpenMeet(event.roomHostUrl, event.startedAt, event.durations, event.id)}
                    >
                      Tham dự
                    </Button>
                  )}

                  {isReportable && (
                    <Button variant='outline' className='w-full' asChild>
                      <Link href={`/expert/event/${event.id}`}>Xem chi tiết</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      ) : (
        <Alert variant='default' className='bg-muted/20'>
          <Mic className='h-4 w-4' />
          <AlertTitle>Chưa có sự kiện</AlertTitle>
          <AlertDescription>Bạn chưa tạo sự kiện nào. Hãy bắt đầu bằng cách tạo sự kiện mới.</AlertDescription>
        </Alert>
      )}

      {/* Cancel Event Dialog */}
      <Dialog open={cancelModal.isOpen} onOpenChange={(open) => setCancelModal({ ...cancelModal, isOpen: open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận hủy sự kiện</DialogTitle>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <p>Bạn có chắc chắn muốn hủy sự kiện này không?</p>

            <div className='space-y-2'>
              <Textarea
                placeholder='Nhập lí do hủy sự kiện'
                value={cancelNote}
                onChange={(e) => {
                  setCancelNote(e.target.value)
                  setCancelError('')
                }}
              />
              {cancelError && <p className='text-destructive text-sm'>{cancelError}</p>}
            </div>
          </div>

          <DialogFooter className='sm:justify-between'>
            <Button
              variant='outline'
              onClick={() => {
                setCancelNote('')
                setCancelError('')
                setCancelModal({ eventId: '', isOpen: false })
              }}
            >
              Hủy
            </Button>
            <Button
              variant='destructive'
              disabled={isProcessing}
              onClick={async () => {
                if (!cancelNote.trim()) {
                  setCancelError('Vui lòng nhập lí do hủy sự kiện')
                  return
                }
                await handleCancelEvent(cancelModal.eventId, cancelNote)
              }}
            >
              Xác nhận hủy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
