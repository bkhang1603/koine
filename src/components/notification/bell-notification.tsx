'use client'

import { useAppStore } from '@/components/app-provider'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import socket from '@/lib/socket'
import { Bell } from 'lucide-react'

import { useEffect } from 'react'

type Notification = {
  id: number
  title: string
  message: string
  date: string
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'Đơn hàng đã được xác nhận',
    message: 'Đơn hàng #ORD001 của bạn đã được xác nhận và đang được xử lý.',
    date: '10-10-2024 10:30'
  },
  {
    id: 2,
    title: 'Khuyến mãi mới',
    message: 'Giảm giá 20% cho tất cả các sản phẩm thời trang. Nhanh tay mua ngay!',
    date: '09-10-2024 15:45'
  },
  {
    id: 3,
    title: 'Đơn hàng đã giao',
    message: 'Đơn hàng #ORD002 đã được giao thành công. Hãy đánh giá sản phẩm nhé!',
    date: '08-10-2024 09:15'
  }
]

function BellNotification() {
  const user = useAppStore((state) => state.user)

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
      console.log('get notifications')
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
  }, [user])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className='rounded-full bg-gray-50 w-10 h-10 flex justify-center
    items-center text-primary cursor-pointer'
        >
          <Bell />
        </div>
      </PopoverTrigger>
      <PopoverContent align='end'>
        <div className='py-2'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='font-semibold'>Thông báo</h3>
            <Button variant='link'>Xem tất cả</Button>
          </div>
          <ScrollArea className='h-[300px] pr-2'>
            {notifications.map((notification) => (
              <div key={notification.id} className='mb-4 pb-4 border-b last:mb-0 last:pb-0 last:border-b-0'>
                <h4 className='font-semibold'>{notification.title}</h4>
                <p className='text-sm text-muted-foreground'>{notification.message}</p>
                <p className='text-xs text-muted-foreground mt-1'>{notification.date}</p>
              </div>
            ))}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default BellNotification
