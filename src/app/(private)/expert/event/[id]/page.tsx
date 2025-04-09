'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import {
  useCancelEventMutation,
  useCreateRoomMutation,
  useGetEventByIdWithoutCaching,
  useReportEventParticipationMutation
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
import { resolveSoa } from 'dns'
import formatDurationForString from '../../../../../../formatDuration'
import VideoUpload from '../components/video-uploader'
import { toast } from '@/components/ui/use-toast'

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
  const startTime = new Date(startAt)
  const endTime = new Date(startTime.getTime() + duration * 1000)
  return now.getTime() >= startTime.getTime() && now.getTime() < endTime.getTime()
}

const isEventCancelable = (startAt: string) => {
  const now = new Date()
  const startTime = new Date(startAt)
  return startTime.getTime() - now.getTime() >= 2 * 3600 * 1000
}

const isEventClosed = (eventStartAt: string, duration: number): boolean => {
  const now = new Date()
  const startTime = new Date(eventStartAt)
  const endDate = new Date(startTime.getTime() + duration * 1000) // duration tính theo giây
  return now.getTime() >= endDate.getTime() // chỉ mở khi trong khoảng startTime -> endDate
}

const isEventReportable = (
  startAt: string,
  totalParticipants: number,
  duration: number,
  eventStatus: string
): boolean => {
  if (eventStatus == 'DONE' || eventStatus == 'CANCELLED') return false
  const startTime = new Date(startAt)
  const endTime = new Date(startTime.getTime() + duration * 1000)
  const now = new Date()
  return now.getTime() >= endTime.getTime() && totalParticipants == 0
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
  const createRoom = useCreateRoomMutation()
  const cancelEvent = useCancelEventMutation()
  const reportEvent = useReportEventParticipationMutation()

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

  const handleReportEventInfo = async (roomName: string | null) => {
    try {
      if (isProcessing) return
      setIsProcessing(true)

      if (!roomName) return
      const body = {
        eventId: id,
        roomName: roomName
      }

      const res = await reportEvent.mutateAsync({
        body: body
      })
      if (res) {
        toast({
          description: 'Cập nhật số người tham gia thành công',
          variant: 'success'
        })
      } else {
        toast({
          description: 'Có lỗi xảy ra!',
          variant: 'destructive'
        })
        throw new Error('Lỗi khi báo cáo')
      }
    } catch (error) {
      toast({
        description: 'Có lỗi xảy ra!',
        variant: 'destructive'
      })
      handleErrorApi({ error })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCreateRoom = async () => {
    try {
      const res = await createRoom.mutateAsync({ eventId: id })
      console.log(res)
      if (res && res.payload.data.roomHostUrl) {
        window.open(res.payload.data.roomHostUrl, '_blank')
        refetch()
      } else {
        throw new Error('Lỗi khi tạo phòng')
      }
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const handleOpenMeet = async (roomHostUrl: string | null) => {
    try {
      if (isProcessing) return
      setIsProcessing(true)

      if (!roomHostUrl || roomHostUrl.length == 0) {
        await handleCreateRoom()
      } else {
        window.open(roomHostUrl, '_blank')
        refetch()
      }
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
  const isClosed = isEventClosed(event.startedAt, event.durations)
  const isReportable = isEventReportable(event.startedAt, event.totalParticipants, event.durations, event.status)

  const canJoinEvent = (event.status === 'OPENING' || event.status === 'PENDING') && isOpenable
  const canCreateRoom = event.status === 'PENDING' && !event.roomUrl && isOpenable
  const canUpdateInfo = event.status === 'OPENING' && event.roomName && isReportable
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
          {canJoinEvent && event.roomHostUrl && (
            <Button size='lg' disabled={isProcessing} onClick={() => handleOpenMeet(event.roomHostUrl)}>
              <Video className='w-4 h-4 mr-2' />
              Tham dự
            </Button>
          )}
          {canCreateRoom && (
            <Button size='lg' variant='outline' disabled={isProcessing} onClick={() => handleCreateRoom()}>
              <Video className='w-4 h-4 mr-2' />
              Tạo phòng
            </Button>
          )}
          {canUpdateInfo && (
            <Button
              size='lg'
              variant='outline'
              disabled={isProcessing}
              onClick={() => handleReportEventInfo(event.roomName)}
            >
              <RefreshCw className='w-4 h-4 mr-2' />
              Báo cáo số liệu
            </Button>
          )}
          {isCancelable && event.status == 'PENDING' && (
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
                    <span>Thời lượng: {formatDurationForString(event.durationsDisplay)}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='w-4 h-4 text-muted-foreground' />
                    <span>Số người tham dự: {event.totalParticipants}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Video className='w-4 h-4 text-muted-foreground' />
                    <span>
                      Bản ghi:{' '}
                      <span
                        className={`p-[6px] ${event.recordUrl ? 'bg-blue-400' : 'bg-gray-400'} rounded-xl font-semibold text-white`}
                      >
                        {event.recordUrl ? 'Đã tải lên' : 'Chưa có'}
                      </span>
                    </span>
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
                      <div
                        className={`w-2 h-2 rounded-full ${isClosed ? 'bg-gray-400' : 'bg-primary'}  animate-pulse`}
                      />
                      <span className='font-medium'>{isClosed ? 'Phòng đã đóng' : 'Phòng đã sẵn sàng'}</span>
                    </div>
                    <Badge variant='secondary'>{event.totalParticipants} người tham dự</Badge>
                  </div>
                  <Button
                    variant='default'
                    className={`w-full 
                      ${isClosed ? 'bg-gray-400 hover:bg-gray-400 cursor-default' : 'bg-primary hover:bg-primary/90'} 
                    text-white`}
                    onClick={() => (isClosed ? null : handleOpenMeet(event.roomHostUrl))}
                  >
                    <Video className='w-4 h-4 mr-2' />
                    {!isClosed ? 'Mở phòng' : 'Phòng đã đóng'}
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
                <CardTitle>Lí do</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>{event.note}</p>
              </CardContent>
            </Card>
          )}

          {event.status == 'DONE' && (
            <Card>
              <CardHeader>
                <CardTitle>Tải lên bản ghi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>{event.note}</p>
              </CardContent>
              <CardContent>
                <VideoUpload
                  eventId={event.id} // Đảm bảo truyền đúng eventId
                  initialPreview={event.recordUrl} // Nếu có bản ghi cũ, hiển thị trước đó
                />
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
