'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BellIcon, CheckCircle2, Clock, BookOpen, AlertTriangle } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useGetAccountNotifications } from '@/queries/useAccount'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

export default function NotificationsPage() {
  const { data, isLoading } = useGetAccountNotifications({ page_index: 1, page_size: 100 })
  const notifications = useMemo(() => data?.payload.data.response || [], [data])
  const [activeTab, setActiveTab] = useState('all')
  const { toast } = useToast()

  // Đếm số thông báo chưa đọc
  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications]
  )

  // Lọc thông báo theo tab
  const filteredNotifications = useMemo(() => {
    if (activeTab === 'all') return notifications
    if (activeTab === 'unread') return notifications.filter((n) => !n.isRead)
    if (activeTab === 'course') return notifications.filter((n) => n.type === 'COURSE')
    if (activeTab === 'system') return notifications.filter((n) => n.type === 'SYSTEM')
    return notifications
  }, [notifications, activeTab])

  // Đánh dấu đã đọc tất cả
  const handleMarkAllAsRead = () => {
    toast({
      description: 'Đã đánh dấu tất cả thông báo là đã đọc'
    })
  }

  // Hiển thị icon theo loại thông báo
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'COURSE':
        return <BookOpen className='h-5 w-5 text-blue-500' />
      case 'SYSTEM':
        return <AlertTriangle className='h-5 w-5 text-amber-500' />
      default:
        return <BellIcon className='h-5 w-5 text-primary' />
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <div className='flex items-center gap-2'>
            <BellIcon className='h-5 w-5 text-primary' />
            <h2 className='text-xl font-medium text-gray-900'>Thông báo</h2>
            {unreadCount > 0 && <Badge className='ml-2 bg-red-500'>{unreadCount} mới</Badge>}
          </div>
          <p className='text-sm text-gray-500 mt-1 md:ml-7'>Quản lý thông báo của bạn</p>
        </div>
      </div>

      {/* Notification List */}
      <Card className='shadow-sm border-gray-100'>
        <CardContent className='p-0'>
          <div className='p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
            <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
              <TabsList className='bg-gray-100/90 grid w-full grid-cols-4 h-9'>
                <TabsTrigger value='all' className='text-xs'>
                  Tất cả
                </TabsTrigger>
                <TabsTrigger value='unread' className='text-xs'>
                  Chưa đọc
                  {unreadCount > 0 && (
                    <span className='ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full'>
                      {unreadCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value='course' className='text-xs'>
                  Khóa học
                </TabsTrigger>
                <TabsTrigger value='system' className='text-xs'>
                  Hệ thống
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className='flex gap-2 self-end sm:self-auto'>
              <Button variant='outline' size='sm' className='h-9 text-xs' onClick={handleMarkAllAsRead}>
                <CheckCircle2 className='h-3.5 w-3.5 mr-1.5' />
                Đánh dấu đã đọc
              </Button>
            </div>
          </div>

          <div className='divide-y divide-gray-100'>
            {isLoading ? (
              // Loading skeletons
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className='p-4 flex gap-3'>
                    <Skeleton className='h-10 w-10 rounded-full' />
                    <div className='flex-1 space-y-2'>
                      <Skeleton className='h-4 w-1/4' />
                      <Skeleton className='h-3 w-full' />
                      <Skeleton className='h-3 w-2/3' />
                      <div className='flex justify-between items-center pt-1'>
                        <Skeleton className='h-3 w-20' />
                      </div>
                    </div>
                  </div>
                ))
            ) : filteredNotifications.length === 0 ? (
              // Empty state
              <div className='p-12 text-center'>
                <BellIcon className='h-12 w-12 mx-auto text-gray-300 mb-4' />
                <h3 className='text-lg font-medium mb-2'>Không có thông báo</h3>
                <p className='text-sm text-gray-500'>
                  {activeTab === 'all'
                    ? 'Bạn chưa có thông báo nào.'
                    : `Không có thông báo nào trong mục "${
                        activeTab === 'unread' ? 'Chưa đọc' : activeTab === 'course' ? 'Khóa học' : 'Hệ thống'
                      }"`}
                </p>
              </div>
            ) : (
              // Notification list
              filteredNotifications.map((notification, index) => (
                <div
                  key={index}
                  className={`p-4 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50/40' : ''}`}
                >
                  <div className='flex gap-3'>
                    <div className='mt-1'>{getNotificationIcon(notification.type)}</div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex justify-between items-start gap-2'>
                        <h4 className='font-medium text-sm text-gray-900'>{notification.title}</h4>
                        {!notification.isRead && (
                          <span className='inline-block w-2 h-2 bg-blue-500 rounded-full'></span>
                        )}
                      </div>
                      <p className='text-sm text-gray-700 mt-1 break-words'>{notification.description}</p>
                      <div className='flex justify-between items-center mt-2'>
                        <span className='text-xs text-gray-500 flex items-center gap-1'>
                          <Clock className='h-3 w-3' />
                          {formatDistanceToNow(new Date(notification.createdAt), {
                            addSuffix: true,
                            locale: vi
                          })}
                        </span>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-7 text-xs px-2 text-gray-500 hover:text-gray-700'
                        >
                          Đánh dấu đã đọc
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredNotifications.length > 10 && (
            <div className='p-4 border-t border-gray-100 text-center'>
              <Button variant='outline' className='text-xs'>
                <Clock className='h-3.5 w-3.5 mr-1.5' />
                Xem thêm thông báo cũ hơn
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
