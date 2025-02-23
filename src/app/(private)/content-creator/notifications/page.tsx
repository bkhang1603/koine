'use client'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell, MessageSquare, Star, Settings, AlertCircle, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface Notification {
  id: string
  type: 'comment' | 'review' | 'system' | 'alert'
  title: string
  message: string
  time: string
  read: boolean
  link?: string
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'comment',
    title: 'Bình luận mới',
    message: 'John Doe đã bình luận về bài viết "React Tips and Tricks"',
    time: '5 phút trước',
    read: false,
    link: '/content-creator/blog/1'
  },
  {
    id: '2',
    type: 'review',
    title: 'Đánh giá mới',
    message: 'Jane Smith đã đánh giá 5 sao cho khóa học "JavaScript Fundamentals"',
    time: '1 giờ trước',
    read: false,
    link: '/content-creator/course/1'
  },
  {
    id: '3',
    type: 'system',
    title: 'Cập nhật hệ thống',
    message: 'Hệ thống sẽ bảo trì vào ngày 20/03/2024',
    time: '1 ngày trước',
    read: true
  }
]

const getIcon = (type: string) => {
  switch (type) {
    case 'comment':
      return <MessageSquare className='w-4 h-4' />
    case 'review':
      return <Star className='w-4 h-4' />
    case 'system':
      return <Settings className='w-4 h-4' />
    case 'alert':
      return <AlertCircle className='w-4 h-4' />
    default:
      return <Bell className='w-4 h-4' />
  }
}

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <div className='flex items-center gap-2'>
            <h1 className='text-2xl font-bold'>Thông báo</h1>
            {unreadCount > 0 && (
              <Badge variant='secondary' className='rounded-full'>
                {unreadCount} chưa đọc
              </Badge>
            )}
          </div>
          <p className='text-sm text-muted-foreground mt-1'>Xem tất cả thông báo của bạn</p>
        </div>
        <Button variant='outline' size='sm'>
          <Check className='w-4 h-4 mr-2' />
          Đánh dấu tất cả đã đọc
        </Button>
      </div>

      <Tabs defaultValue='all' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='all'>Tất cả</TabsTrigger>
          <TabsTrigger value='unread'>Chưa đọc</TabsTrigger>
          <TabsTrigger value='comments'>Bình luận</TabsTrigger>
          <TabsTrigger value='reviews'>Đánh giá</TabsTrigger>
          <TabsTrigger value='system'>Hệ thống</TabsTrigger>
        </TabsList>

        <TabsContent value='all' className='space-y-4'>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                'group flex items-start gap-4 p-4 rounded-lg transition-colors',
                notification.read ? 'bg-background hover:bg-muted/50' : 'bg-muted/50 hover:bg-muted/70'
              )}
            >
              <div
                className={cn('p-2 rounded-full shrink-0', {
                  'bg-blue-100 text-blue-600': notification.type === 'comment',
                  'bg-yellow-100 text-yellow-600': notification.type === 'review',
                  'bg-gray-100 text-gray-600': notification.type === 'system',
                  'bg-red-100 text-red-600': notification.type === 'alert'
                })}
              >
                {getIcon(notification.type)}
              </div>

              <div className='flex-1 min-w-0'>
                <div className='flex items-start justify-between gap-2'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-medium leading-none'>{notification.title}</h3>
                      {!notification.read && <span className='w-2 h-2 rounded-full bg-blue-600' />}
                    </div>
                    <p className='text-sm text-muted-foreground mt-1 line-clamp-2'>{notification.message}</p>
                  </div>
                  <span className='text-xs text-muted-foreground whitespace-nowrap'>{notification.time}</span>
                </div>

                {notification.link && (
                  <Button variant='ghost' size='sm' className='mt-2 h-8'>
                    Xem chi tiết
                  </Button>
                )}
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Các TabsContent khác sẽ lọc theo type tương ứng */}
      </Tabs>
    </div>
  )
}
