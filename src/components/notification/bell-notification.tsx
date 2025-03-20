'use client'

import { useAppStore } from '@/components/app-provider'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import socket from '@/lib/socket'
import { useGetAccountNotifications, useUpdateAccountNotificationsMutation } from '@/queries/useAccount'
import { Bell, ChevronRight, CheckCircle2 } from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import configRoute from '@/config/route'

function BellNotification() {
  const user = useAppStore((state) => state.user)
  const { data, isLoading, refetch } = useGetAccountNotifications({ page_index: 1, page_size: 100 })
  const notifications = data?.payload.data.response || []
  const updateNotificationsMutation = useUpdateAccountNotificationsMutation()

  useEffect(() => {
    if (user) {
      if (socket.connected) {
        onConnect()
      }
    }

    function onConnect() {
      console.log('socket id', socket.id)
    }

    function onDisconnect() {
      console.log('disconnected')
    }

    function getNotifications() {
      refetch()
    }

    function login() {
      socket.emit('login', {
        userId: user?.id
      })
    }

    socket.on('connect', onConnect)

    socket.on('login', login)
    socket.on('notification', getNotifications)

    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)

      socket.off('login', login)
      socket.off('notification', getNotifications)

      socket.off('disconnect', onDisconnect)
    }
  }, [user, refetch])

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  const handleMarkAllAsRead = async () => {
    try {
      await updateNotificationsMutation.mutateAsync()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-primary hover:bg-gray-100 transition-colors'>
          <Bell className='h-5 w-5' />
          {unreadCount > 0 && (
            <div className='absolute -top-2 -right-2 bg-secondary text-white w-5 h-5 flex justify-center items-center rounded-full text-sm cursor-pointer select-none'>
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-[360px] p-0 rounded-lg border shadow-lg overflow-hidden'>
        {/* Header */}
        <div className='py-3 px-4 bg-white border-b sticky top-0 z-10 flex items-center justify-between'>
          <h3 className='font-semibold text-lg flex items-center gap-2'>
            <Bell className='h-4 w-4' />
            Thông báo
            {unreadCount > 0 && (
              <Badge variant='secondary' className='ml-1 text-xs font-semibold'>
                {unreadCount} mới
              </Badge>
            )}
          </h3>
          <Button variant='ghost' size='sm' className='text-xs h-8 hover:bg-gray-100' onClick={handleMarkAllAsRead}>
            Đánh dấu đã đọc
          </Button>
        </div>

        {/* Notification List */}
        <ScrollArea className='max-h-[400px]'>
          {isLoading ? (
            <div className='p-4 space-y-4'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='animate-pulse'>
                  <div className='flex gap-3'>
                    <div className='h-10 w-10 rounded-full bg-gray-200'></div>
                    <div className='flex-1'>
                      <div className='h-4 w-3/4 bg-gray-200 rounded mb-2'></div>
                      <div className='h-3 bg-gray-200 rounded w-full mb-1'></div>
                      <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
              <div className='bg-gray-100 rounded-full p-4 mb-3'>
                <Bell className='h-8 w-8 text-muted-foreground/60' />
              </div>
              <h4 className='font-medium text-gray-700 mb-1'>Chưa có thông báo nào</h4>
              <p className='text-sm text-muted-foreground max-w-[220px]'>
                Bạn sẽ nhận được thông báo khi có hoạt động mới
              </p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50/40' : ''}`}
                >
                  <div className='p-4 flex gap-3'>
                    {/* Notification icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        !notification.isRead ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <Bell className='h-5 w-5' />
                    </div>

                    {/* Notification content */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex justify-between items-start gap-2'>
                        <h4 className='font-medium text-sm line-clamp-1'>{notification.title}</h4>
                        {!notification.isRead && (
                          <span className='w-2 h-2 rounded-full bg-primary flex-shrink-0'></span>
                        )}
                      </div>
                      <p className='text-sm text-muted-foreground line-clamp-2 mt-0.5'>{notification.description}</p>
                      <div className='flex items-center justify-between mt-1'>
                        <p className='text-xs text-muted-foreground'>
                          {format(new Date(notification.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </p>
                        {notification.isRead && (
                          <span className='text-xs text-green-600 flex items-center'>
                            <CheckCircle2 className='h-3 w-3 mr-1' />
                            Đã đọc
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer with view all button */}
        {notifications.length > 0 && (
          <div className='p-3 bg-gray-50 border-t'>
            <Button variant='outline' className='w-full justify-between bg-white hover:bg-gray-50' size='sm' asChild>
              <Link href={configRoute.setting.notifications}>
                <span>Xem tất cả thông báo</span>
                <ChevronRight className='h-4 w-4 ml-1' />
              </Link>
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default BellNotification
