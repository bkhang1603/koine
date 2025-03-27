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
import { Calendar, Clock, Mic, Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

//for expert
function EventPage() {
  const {
    data: events,
    isLoading: eventLoading,
    isError: eventError,
    error: eventErrorMessage,
    refetch: refetchEvent
  } = useEventForHost()

  const updateRoomInfo = useUpdateEventWhenCreateRoomMutation()
  const updateEventInfo = useUpdateEventMutation()
  const cancelEvent = useCancelEventMutation()
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  if (eventLoading) console.log('loading')
  if (eventError) console.log('error ', eventErrorMessage)

  const [showModal, setShowModal] = useState<{
    eventId: string
    view: boolean
  }>({ eventId: '', view: false })

  const [noteItem, setNoteItem] = useState('')
  const [noteError, setNoteError] = useState('')

  // const mock = [
  //   {
  //     id: '1',
  //     title: 'ông cố nội mày',
  //     description: 'ông bà già nhà mày',
  //     startedAt: '2025-03-27T11:00:00Z',
  //     startAtFormatted: '11:00:00 27-03-2025',
  //     durations: 3600 * 5,
  //     durationsDisplay: '5.0h',
  //     imageUrl: 'https://i.pravatar.cc/300?img=3',
  //     roomHostUrl:
  //       'https://koine.whereby.com/0269aa23-31ff-4e20-b9aa-2bea9cfd2ae2?roomKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5nSWQiOiI5ODgxOTU5OSIsInJvb21SZWZlcmVuY2UiOnsicm9vbU5hbWUiOiIvMDI2OWFhMjMtMzFmZi00ZTIwLWI5YWEtMmJlYTljZmQyYWUyIiwib3JnYW5pemF0aW9uSWQiOiIzMTI3NTcifSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5zcnYud2hlcmVieS5jb20iLCJpYXQiOjE3NDMwMDI0MDgsInJvb21LZXlUeXBlIjoibWVldGluZ0hvc3QifQ.3A2yyjWGxLZC1Ku6b1NSFtGkM_j8Z6rspxHYGjOSpeY',
  //     roomName: '/0269aa23-31ff-4e20-b9aa-2bea9cfd2ae2',
  //     roomUrl: 'https://koine.whereby.com/0269aa23-31ff-4e20-b9aa-2bea9cfd2ae2',
  //     recordUrl: '',
  //     status: 'OPENING',
  //     totalParticipants: 0,
  //     createdAt: '2025-03-26T10:00:00Z',
  //     updateAt: '2025-03-26T10:00:00Z',
  //     hostInfo: {
  //       id: '1',
  //       fullName: 'Nguyễn San',
  //       email: 'nguyensan@gmail.com',
  //       avatarUrl: 'https://i.pravatar.cc/300?img=3'
  //     }
  //   },
  //   {
  //     id: '2',
  //     title: 'ông cố nội mày',
  //     description: 'ông bà già nhà mày',
  //     startedAt: '2025-03-26T22:00:00Z',
  //     startAtFormatted: '22:00:00 26-03-2025',
  //     durations: 3600,
  //     durationsDisplay: '1.0h',
  //     imageUrl: 'https://i.pravatar.cc/300?img=3',
  //     roomHostUrl: '',
  //     roomName: '',
  //     roomUrl: '',
  //     recordUrl: '',
  //     status: 'PENDING',
  //     totalParticipants: 0,
  //     createdAt: '2025-03-26T22:00:00Z',
  //     updateAt: '2025-03-26T22:00:00Z',
  //     hostInfo: {
  //       id: '1',
  //       fullName: 'Nguyễn San',
  //       email: 'nguyensan@gmail.com',
  //       avatarUrl: 'https://i.pravatar.cc/300?img=3'
  //     }
  //   }
  // ]

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

  const handleCancel = async (eventId: string, newNote: string) => {
    try {
      const body = {
        eventId: eventId,
        note: newNote
      }
      console.log('body ', body)
      await cancelEvent.mutateAsync({ body: body })
      // Success notification could be added here
    } catch (error) {
      console.error('Lỗi khi hủy sự kiện', error)
      // Error notification could be added here
    }
  }

  const updateInfoToDB = async (roomName: string | null, eventId: string) => {
    try {
      if (isProcessing) return
      setIsProcessing(true)
      if (!roomName) roomName = ''
      const res = await getInsightsRoom(roomName)
      if (!res || res.results[0].length == 0) {
        // Notification could be added here
        return
      }
      const totalParticipants = res.results[0].totalUniqueParticipants
      if (!totalParticipants || totalParticipants == 0) {
        // Notification could be added here
        return
      }
      await updateEventInfo.mutateAsync({
        body: { totalParticipants: totalParticipants, status: 'DONE' },
        eventId
      })
      // Success notification could be added here
    } catch (error) {
      console.log('Lỗi khi báo cáo ', error)
      // Error notification could be added here
    } finally {
      setIsProcessing(false)
    }
  }

  const getInsightsRoom = async (roomName: string) => {
    try {
      const response = await fetch(
        `https://api.whereby.dev/v1/insights/rooms?roomName=${encodeURIComponent(roomName)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_WHEREBY_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Insights Room Data:', data)
      return data
    } catch (error) {
      console.error('Error when getting insight room:', error)
    }
  }

  const createRoom = async (eventStartAt: string, duration: number, eventId: string) => {
    try {
      console.log('tạo phòng mới')
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
      const text = await response.json()
      console.log('text ', text)

      const body = {
        roomHostUrl: text.hostRoomUrl.toString(),
        roomName: text.roomName.toString(),
        roomUrl: text.roomUrl.toString()
      }
      console.log('room data when create room ', body)
      await updateRoomInfo.mutateAsync({ body, eventId })
      const roomUrl = text.hostRoomUrl
      window.open(roomUrl, '_blank')
      refetchEvent()
    } catch (error) {
      console.error('Lỗi tạo phòng:', error)
      // Error notification could be added here
    }
  }

  const openMeet = async (roomHostUrl: string | null, eventStartAt: string, duration: number, eventId: string) => {
    try {
      if (isProcessing) return
      setIsProcessing(true)
      if (!roomHostUrl || roomHostUrl.length == 0) {
        await createRoom(eventStartAt, duration, eventId)
      } else {
        window.open(roomHostUrl, '_blank')
        refetchEvent()
        console.log('refetch rồi')
      }
    } catch (error) {
      console.log('Lỗi khi mở meet ', error)
    } finally {
      setIsProcessing(false)
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

  const isReportable = (startAt: string, totalParticipants: number, duration: number, eventStatus: string): boolean => {
    if (eventStatus == 'DONE' || eventStatus == 'CANCELLED') return false
    const startTime = new Date(startAt)
    const endTime = new Date(startTime.getTime() + duration * 1000)
    const now = new Date()
    // Chuyển giờ về GMT+7 (đảm bảo giờ giữ nguyên)
    const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    return localTime.getTime() >= endTime.getTime() && totalParticipants == 0
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
          <div className='flex flex-row justify-between items-center mb-6'>
            <h1 className='text-3xl font-bold'>Danh sách sự kiện</h1>
            <Button onClick={() => router.push('/event/create/page')} className='flex justify-end gap-2'>
              <Plus size={16} />
              Tạo sự kiện
            </Button>
          </div>

          <p className='text-muted-foreground mt-1'>Đón chờ những sự kiện thú vị từ chúng tôi</p>
          <p className='text-sm text-cyan-600 mt-2'>Tổng cộng: {events ? events.payload.data.length : 0}</p>
        </div>
      </div>

      {events && events.payload.data.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {events.payload.data.map((event: any) => (
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
                  {event.status == 'PENDING' ? (
                    <div className='absolute top-2 right-2'>
                      <Button
                        variant='destructive'
                        size='icon'
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowModal({ eventId: event.id, view: true })
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className='pt-4'>
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    const encodedData = encodeURIComponent(JSON.stringify(event))
                    router.push(`/event/${event.id}?data=${encodedData}`)
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
                {isOpenable(event.startedAt, event.durations) &&
                  (event.status === 'OPENING' || event.status === 'PENDING') && (
                    <Button
                      disabled={isProcessing}
                      onClick={() => openMeet(event.roomHostUrl, event.startedAt, event.durations, event.id)}
                    >
                      Tham dự
                    </Button>
                  )}

                {isReportable(event.startedAt, event.totalParticipants, event.durations, event.status) && (
                  <Button
                    variant='outline'
                    disabled={isProcessing}
                    onClick={() => updateInfoToDB(event.roomName, event.id)}
                  >
                    Báo cáo
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

      <Dialog open={showModal.view} onOpenChange={(open) => setShowModal({ ...showModal, view: open })}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Xác nhận hủy sự kiện</DialogTitle>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <p>Bạn có chắc chắn muốn hủy sự kiện này không?</p>

            <div className='space-y-2'>
              <Textarea
                placeholder='Nhập lí do hủy sự kiện'
                value={noteItem}
                onChange={(e) => {
                  setNoteItem(e.target.value)
                  setNoteError('')
                }}
              />
              {noteError && <p className='text-destructive text-sm'>{noteError}</p>}
            </div>
          </div>

          <DialogFooter className='sm:justify-between'>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                setNoteItem('')
                setNoteError('')
                setShowModal({ eventId: '', view: false })
              }}
            >
              Hủy
            </Button>
            <Button
              type='button'
              variant='destructive'
              disabled={isProcessing}
              onClick={async () => {
                if (!noteItem.trim()) {
                  setNoteError('Không được bỏ trống lí do')
                  return
                }
                try {
                  if (isProcessing) return
                  setIsProcessing(true)
                  await handleCancel(showModal.eventId, noteItem)
                  setShowModal({ eventId: '', view: false })
                  setNoteItem('')
                } catch (error) {
                  console.error('Lỗi khi hủy sự kiện:', error)
                } finally {
                  setIsProcessing(false)
                }
              }}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EventPage
