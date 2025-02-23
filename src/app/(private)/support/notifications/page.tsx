'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NotificationItem } from '../_components/notifications/notification-item'
import { NotificationFilters } from '../_components/notifications/notification-filters'
import { useState } from 'react'

const mockNotifications = [
  {
    id: '1',
    type: 'ticket' as const,
    title: 'Ticket mới #T-1234',
    message: 'Nguyễn Văn A vừa tạo một ticket mới về vấn đề kỹ thuật',
    createdAt: '2024-03-16T09:00:00Z',
    isRead: false,
    link: '/support/tickets/T-1234'
  },
  {
    id: '2',
    type: 'refund' as const,
    title: 'Yêu cầu hoàn tiền #R-5678',
    message: 'Yêu cầu hoàn tiền mới cho khóa học JavaScript cơ bản',
    createdAt: '2024-03-16T08:30:00Z',
    isRead: false,
    link: '/support/refunds/R-5678'
  },
  {
    id: '3',
    type: 'review' as const,
    title: 'Đánh giá mới',
    message: 'Khách hàng vừa đánh giá 5 sao cho phản hồi của bạn',
    createdAt: '2024-03-16T08:00:00Z',
    isRead: true
  },
  {
    id: '4',
    type: 'alert' as const,
    title: 'Cảnh báo thời gian phản hồi',
    message: 'Có 3 tickets chưa được phản hồi trong 24h qua',
    createdAt: '2024-03-15T23:00:00Z',
    isRead: false,
    link: '/support/tickets'
  },
  {
    id: '5',
    type: 'success' as const,
    title: 'Hoàn thành mục tiêu',
    message: 'Chúc mừng! Bạn đã đạt mục tiêu phản hồi ticket trong tuần này',
    createdAt: '2024-03-15T22:00:00Z',
    isRead: true
  }
]

export default function NotificationsPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [status, setStatus] = useState('all')

  const filteredNotifications = mockNotifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(search.toLowerCase()) ||
      notification.message.toLowerCase().includes(search.toLowerCase())
    const matchesType = type === 'all' || notification.type === type
    const matchesStatus =
      status === 'all' || (status === 'unread' && !notification.isRead) || (status === 'read' && notification.isRead)

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Thông báo</h1>
        <p className='text-muted-foreground mt-1'>Quản lý tất cả thông báo của bạn</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách thông báo</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <NotificationFilters onSearch={setSearch} onTypeChange={setType} onStatusChange={setStatus} />
          <div className='divide-y'>
            {filteredNotifications.map((notification) => (
              <NotificationItem key={notification.id} {...notification} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
