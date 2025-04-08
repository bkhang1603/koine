'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import {
  useCancelEventMutation,
  useGetEventByIdWithoutCaching,
  useUpdateEventMutation,
  useUpdateEventWhenCreateRoomMutation
} from '@/queries/useEvent'
import { Calendar, Clock, Mic, Trash2, Video, Users, AlertCircle, RefreshCw } from 'lucide-react'
import { use, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { handleErrorApi } from '@/lib/utils'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Breadcrumb } from '@/components/public/parent/setting/Breadcrumb'

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

const isEventCancelable = (startAt: string) => {
  const now = new Date()
  const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
  const startTime = new Date(startAt)
  return startTime.getTime() - localTime.getTime() >= 2 * 3600 * 1000
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

export default function EventDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { id } = params
  const [isProcessing, setIsProcessing] = useState(false)
  const [cancelModal, setCancelModal] = useState<{ isOpen: boolean }>({ isOpen: false })
  const [cancelNote, setCancelNote] = useState('')
  const [cancelError, setCancelError] = useState('')

  // Queries
  const { data: eventData, isLoading, refetch } = useGetEventByIdWithoutCaching({ id })
  const updateRoomInfo = useUpdateEventWhenCreateRoomMutation()
  const updateEventInfo = useUpdateEventMutation()
  const cancelEvent = useCancelEventMutation()

  const event = eventData?.payload?.data

  // Handlers
  const handleCancelEvent = async (note: string) => {
    try {
      await cancelEvent.mutateAsync({ body: { eventId: id, note } })
      setCancelModal({ isOpen: false })
      setCancelNote('')
      refetch()
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const handleUpdateEventInfo = async (roomName: string | null) => {
    try {
      if (isProcessing) return
      setIsProcessing(true)

      if (!roomName) return
      const res = await getInsightsRoom(roomName)
      if (!res?.results?.[0]?.totalUniqueParticipants) return

      await updateEventInfo.mutateAsync({
        body: { totalParticipants: res.results[0].totalUniqueParticipants, status: 'DONE' },
        eventId: id
      })
      refetch()
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCreateRoom = async (eventStartAt: string, duration: number) => {
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

      await updateRoomInfo.mutateAsync({ body, eventId: id })
      window.open(data.hostRoomUrl, '_blank')
      refetch()
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const handleOpenMeet = async (roomHostUrl: string | null, eventStartAt: string, duration: number) => {
    try {
      if (isProcessing) return
      setIsProcessing(true)

      if (!roomHostUrl) {
        await handleCreateRoom(eventStartAt, duration)
      } else {
        window.open(roomHostUrl, '_blank')
      }
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleUpdateInfo = async () => {
    try {
      if (isProcessing) return
      setIsProcessing(true)
      await handleUpdateEventInfo(event?.roomName || null)
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className='container mx-auto py-8 space-y-6'>
        {/* Breadcrum skeleton */}
        <Skeleton className='h-8 w-64' />

        <div className='flex justify-between items-center'>
          <div className='space-y-2'>
            <Skeleton className='h-8 w-64' />
            <Skeleton className='h-4 w-96' />
          </div>
          <Skeleton className='h-10 w-32' />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2'>
            <Skeleton className='aspect-video w-full rounded-lg' />
          </div>
          <div className='space-y-4'>
            <Skeleton className='h-6 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className='container mx-auto py-8'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Không tìm thấy sự kiện</AlertTitle>
          <AlertDescription>Sự kiện bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const eventTime = formatEventTime(event.startedAt, event.durations)
  const isOpenable = isEventOpenable(event.startedAt, event.durations)
  const isCancelable = isEventCancelable(event.startedAt)

  const canJoinEvent = (event.status === 'OPENING' || event.status === 'PENDING') && isOpenable
  const canCreateRoom = event.status === 'PENDING' && !event.roomUrl
  const canUpdateInfo = event.status === 'OPENING' && event.roomName

  return (
    <div className='container mx-auto py-8 space-y-8'>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { title: 'Sự kiện', href: '/expert/event' },
          { title: event.title, href: `/expert/event/${id}` }
        ]}
      />

      {/* Event Header */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div className='space-y-2'>
          <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-bold'>{event.title}</h1>
            <Badge variant={EVENT_STATUS[event.status as keyof typeof EVENT_STATUS].variant}>
              {EVENT_STATUS[event.status as keyof typeof EVENT_STATUS].text}
            </Badge>
          </div>
          <p className='text-muted-foreground text-lg'>{event.description}</p>
        </div>
        <div className='flex gap-2'>
          {canJoinEvent && (
            <Button
              size='lg'
              disabled={isProcessing}
              onClick={() => handleOpenMeet(event.roomHostUrl, event.startedAt, event.durations)}
            >
              <Video className='w-4 h-4 mr-2' />
              Tham dự
            </Button>
          )}
          {canCreateRoom && (
            <Button
              size='lg'
              variant='outline'
              disabled={isProcessing}
              onClick={() => handleCreateRoom(event.startedAt, event.durations)}
            >
              <Video className='w-4 h-4 mr-2' />
              Tạo phòng
            </Button>
          )}
          {canUpdateInfo && (
            <Button size='lg' variant='outline' disabled={isProcessing} onClick={handleUpdateInfo}>
              <RefreshCw className='w-4 h-4 mr-2' />
              Cập nhật
            </Button>
          )}
          {isCancelable && (
            <Button size='lg' variant='destructive' onClick={() => setCancelModal({ isOpen: true })}>
              <Trash2 className='w-4 h-4 mr-2' />
              Hủy sự kiện
            </Button>
          )}
        </div>
      </div>

      {/* Event Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
          <div className='relative aspect-video rounded-lg overflow-hidden shadow-lg'>
            <Image
              src={event.imageUrl || '/placeholder.svg'}
              alt={event.title}
              fill
              className='object-cover'
              priority
            />
          </div>

          <Tabs defaultValue='content' className='w-full'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='content'>Nội dung</TabsTrigger>
              <TabsTrigger value='details'>Chi tiết</TabsTrigger>
            </TabsList>
            <TabsContent value='content' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Nội dung sự kiện</CardTitle>
                  <CardDescription>Thông tin chi tiết về nội dung sự kiện</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: event.content }} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='details' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin sự kiện</CardTitle>
                  <CardDescription>Thông tin cơ bản về sự kiện</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-center gap-2'>
                    <Mic className='w-4 h-4 text-muted-foreground' />
                    <span>Host: {event.hostInfo.fullName}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-muted-foreground' />
                    <span>Bắt đầu: {eventTime.start}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-4 h-4 text-muted-foreground' />
                    <span>Thời lượng: {event.durationsDisplay}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='w-4 h-4 text-muted-foreground' />
                    <span>Số người tham dự: {event.totalParticipants}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className='space-y-6'>
          <Card className={cn('border-2', event.roomUrl ? 'border-primary/20' : 'border-muted')}>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Video className='w-5 h-5 text-primary' />
                Thông tin phòng
              </CardTitle>
              <CardDescription>Thông tin về phòng họp trực tuyến</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {event.roomUrl ? (
                <div className='space-y-4'>
                  <div className='flex items-center justify-between p-3 bg-primary/5 rounded-lg'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-primary animate-pulse' />
                      <span className='font-medium'>Phòng đã sẵn sàng</span>
                    </div>
                    <Badge variant='secondary'>{event.totalParticipants} người tham dự</Badge>
                  </div>
                  <Button variant='default' className='w-full' onClick={() => window.open(event.roomUrl, '_blank')}>
                    <Video className='w-4 h-4 mr-2' />
                    Mở phòng
                  </Button>
                </div>
              ) : (
                <div className='space-y-4'>
                  <div className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-muted-foreground' />
                      <span className='font-medium'>Chưa có phòng</span>
                    </div>
                    <Badge variant='outline'>Chờ tạo</Badge>
                  </div>
                  <div className='text-sm text-muted-foreground space-y-2'>
                    <p>Phòng họp sẽ được tạo tự động khi:</p>
                    <ul className='list-disc list-inside space-y-1'>
                      <li>Sự kiện bắt đầu</li>
                      <li>Bạn nhấn nút &quot;Tham dự&quot;</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {event.note && (
            <Card>
              <CardHeader>
                <CardTitle>Ghi chú</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>{event.note}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Cancel Event Dialog */}
      <Dialog open={cancelModal.isOpen} onOpenChange={(open) => setCancelModal({ isOpen: open })}>
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
                setCancelModal({ isOpen: false })
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
                await handleCancelEvent(cancelNote)
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
