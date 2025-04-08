'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Mic, ArrowLeft, FileVideo, Upload, Users } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useUploadRecordMutation } from '@/queries/useUpload'
import { useGetEventByIdWithoutCaching, useUpdateEventMutation } from '@/queries/useEvent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { handleErrorApi } from '@/lib/utils'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { ChevronRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

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

export default function EventDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const router = useRouter()
  const { data, isLoading } = useGetEventByIdWithoutCaching({ id: params.id })
  const eventData = data?.payload?.data ?? null

  const uploadRecord = useUploadRecordMutation()
  const updateEventInfo = useUpdateEventMutation()

  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploaded, setUploaded] = useState(eventData?.recordUrl ? true : false)

  // Check if event is closed
  const isClosed = (eventStartAt: string, duration: number): boolean => {
    const now = new Date()
    const localTime = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    const startTime = new Date(eventStartAt)
    const endTime = new Date(startTime.getTime() + duration * 1000)
    return localTime.getTime() >= endTime.getTime()
  }

  // Handle video upload
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (processing) return
    if (!e.target.files || e.target.files.length === 0) return

    try {
      setProcessing(true)
      setError(null)

      const file = e.target.files[0]
      if (file.size > 500 * 1024 * 1024) {
        setError('Kích thước file không được vượt quá 500MB')
        return
      }

      const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/webm']
      if (!allowedVideoTypes.includes(file.type)) {
        setError('Vui lòng chọn file video hợp lệ (MP4, AVI, MOV, WEBM)')
        return
      }

      const newFileName = `${eventData?.title}-record-${new Date().getTime()}.mp4`
      const formData = new FormData()
      formData.append('file', new File([file], newFileName, { type: file.type }))

      const videoUrl = await uploadRecord.mutateAsync(formData)
      if (eventData?.id) {
        await updateEventInfo.mutateAsync({
          body: { recordUrl: videoUrl.payload.data },
          eventId: eventData.id
        })
        setUploaded(true)
      }
    } catch (error) {
      handleErrorApi({ error })
      setError('Không thể tải lên video. Vui lòng thử lại.')
    } finally {
      setProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className='container mx-auto py-8 space-y-6'>
        {/* Breadcrumb Skeleton */}
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-24' />
          <ChevronRight className='h-4 w-4 text-muted-foreground' />
          <Skeleton className='h-4 w-32' />
        </div>

        {/* Header Skeleton */}
        <div className='flex items-center gap-4'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-8 w-64' />
            <Skeleton className='h-4 w-32' />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Column Skeleton */}
          <div className='lg:col-span-2 space-y-6'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-6 w-32' />
                  <Skeleton className='h-6 w-24' />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className='aspect-video w-full rounded-lg' />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className='h-6 w-32' />
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-4 w-2/3' />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column Skeleton */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <Skeleton className='h-6 w-32' />
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-4'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-5 w-5 rounded-full' />
                    <div className='space-y-1'>
                      <Skeleton className='h-4 w-24' />
                      <Skeleton className='h-5 w-32' />
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-5 w-5 rounded-full' />
                    <div className='space-y-1'>
                      <Skeleton className='h-4 w-24' />
                      <Skeleton className='h-5 w-32' />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-5 w-5 rounded-full' />
                      <div className='space-y-1'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-5 w-32' />
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-5 w-5 rounded-full' />
                      <div className='space-y-1'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-5 w-32' />
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-5 w-5 rounded-full' />
                      <div className='space-y-1'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-5 w-32' />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='space-y-4 pt-4 border-t'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-5 w-5 rounded-full' />
                    <div className='space-y-1'>
                      <Skeleton className='h-4 w-24' />
                      <Skeleton className='h-5 w-32' />
                    </div>
                  </div>
                  <Skeleton className='h-10 w-full' />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!eventData) {
    return (
      <div className='container mx-auto py-8 space-y-6'>
        <Alert variant='destructive'>
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>Không tìm thấy thông tin sự kiện</AlertDescription>
        </Alert>
      </div>
    )
  }

  const eventTime = {
    start: format(new Date(eventData.startedAt), 'HH:mm, dd/MM/yyyy', { locale: vi }),
    end: format(new Date(new Date(eventData.startedAt).getTime() + eventData.durations * 1000), 'HH:mm, dd/MM/yyyy', {
      locale: vi
    })
  }

  const isEventClosed = isClosed(eventData.startedAt, eventData.durations)

  return (
    <div className='container mx-auto py-8 space-y-6'>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/expert/event'>Sự kiện</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className='h-4 w-4' />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{eventData.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {error && (
        <Alert variant='destructive'>
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column - Event Image and Basic Info */}
        <div className='lg:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Ảnh bìa sự kiện</CardTitle>
                <Badge variant={EVENT_STATUS[eventData.status as keyof typeof EVENT_STATUS].variant}>
                  {eventData.status === 'OPENING' && isEventClosed
                    ? 'Đã kết thúc'
                    : EVENT_STATUS[eventData.status as keyof typeof EVENT_STATUS].text}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='relative aspect-video w-full rounded-lg overflow-hidden'>
                <Image
                  src={eventData.imageUrl || '/placeholder.svg'}
                  alt={eventData.title}
                  fill
                  className='object-cover'
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mô tả sự kiện</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground whitespace-pre-wrap'>{eventData.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Event Details */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin sự kiện</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Mic className='h-5 w-5 text-muted-foreground' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Người tổ chức</p>
                    <p className='font-medium'>{eventData.hostInfo?.fullName || 'Unknown Host'}</p>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <Users className='h-5 w-5 text-muted-foreground' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Số người tham gia</p>
                    <p className='font-medium'>{eventData.totalParticipants || 0} người</p>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-5 w-5 text-muted-foreground' />
                    <div>
                      <p className='text-sm text-muted-foreground'>Thời gian bắt đầu</p>
                      <p className='font-medium'>{eventTime.start}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-5 w-5 text-muted-foreground' />
                    <div>
                      <p className='text-sm text-muted-foreground'>Thời gian kết thúc</p>
                      <p className='font-medium'>{eventTime.end}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-5 w-5 text-muted-foreground' />
                    <div>
                      <p className='text-sm text-muted-foreground'>Thời lượng</p>
                      <p className='font-medium'>{eventData.durationsDisplay}</p>
                    </div>
                  </div>
                </div>
              </div>

              {isEventClosed && (
                <div className='space-y-4 pt-4 border-t'>
                  <div className='flex items-center gap-2'>
                    <FileVideo className='h-5 w-5 text-muted-foreground' />
                    <div>
                      <p className='text-sm text-muted-foreground'>Bản ghi sự kiện</p>
                      <p className={cn('font-medium', uploaded ? 'text-green-600' : 'text-muted-foreground')}>
                        {uploaded ? 'Đã tải lên' : 'Chưa tải lên'}
                      </p>
                    </div>
                  </div>

                  {uploaded ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant='outline' className='w-full' disabled={processing}>
                          <Upload className='mr-2 h-4 w-4' />
                          Tải lên bản ghi mới
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Xác nhận tải lên</AlertDialogTitle>
                          <AlertDialogDescription>
                            Bản ghi cũ sẽ bị thay thế bằng bản ghi mới. Bạn có chắc chắn muốn tiếp tục?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <label className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'>
                              Tải lên
                              <input
                                type='file'
                                accept='video/*'
                                className='hidden'
                                onChange={handleVideoUpload}
                                disabled={processing}
                              />
                            </label>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <label className='inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'>
                      <Upload className='mr-2 h-4 w-4' />
                      Tải lên bản ghi
                      <input
                        type='file'
                        accept='video/*'
                        className='hidden'
                        onChange={handleVideoUpload}
                        disabled={processing}
                      />
                    </label>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
