'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search, Bell, ShoppingCart, Bookmark, GraduationCap } from 'lucide-react'

interface Notification {
  id: string
  title: string
  content: string
  type: 'order' | 'course' | 'system' | 'promotion'
  isRead: boolean
  time: string
  link?: string
}

const typeColorMap = {
  order: 'bg-blue-100 text-blue-800',
  course: 'bg-green-100 text-green-800',
  system: 'bg-yellow-100 text-yellow-800',
  promotion: 'bg-purple-100 text-purple-800'
}

const typeTextMap = {
  order: 'Đơn hàng',
  course: 'Khóa học',
  system: 'Hệ thống',
  promotion: 'Khuyến mãi'
}

const typeIconMap = {
  order: ShoppingCart,
  course: GraduationCap,
  system: Bell,
  promotion: Bookmark
}

// Mock data
const notifications: Notification[] = [
  {
    id: 'NOTIF-001',
    title: 'Đơn hàng #ORD-001 đã được xác nhận',
    content: 'Đơn hàng của bạn đã được xác nhận và đang được xử lý.',
    type: 'order',
    isRead: false,
    time: '2 giờ trước',
    link: '/setting/order/ORD-001'
  },
  {
    id: 'NOTIF-002',
    title: 'Khóa học mới đã được thêm vào',
    content: 'Khóa học "Kỹ năng giao tiếp cho trẻ 6-8 tuổi" đã được thêm vào tài khoản của bạn.',
    type: 'course',
    isRead: true,
    time: '1 ngày trước',
    link: '/setting/my-course'
  },
  {
    id: 'NOTIF-003',
    title: 'Cập nhật hệ thống',
    content: 'Hệ thống sẽ bảo trì từ 23:00 ngày 20/03/2024 đến 02:00 ngày 21/03/2024.',
    type: 'system',
    isRead: false,
    time: '3 ngày trước'
  }
  // Thêm mock data khác...
]

export default function NotificationsPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  // Thêm state để quản lý load more
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Hàm xử lý load more
  const handleLoadMore = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Cập nhật page và hasMore dựa trên response
      setPage((prev) => prev + 1)
      // Giả sử sau page thứ 3 không còn data
      if (page >= 3) {
        setHasMore(false)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold'>Thông báo</h1>
        <p className='text-muted-foreground mt-1'>Quản lý thông báo của bạn</p>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Tìm kiếm thông báo...'
            className='pl-9'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Loại thông báo' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả loại</SelectItem>
            <SelectItem value='order'>Đơn hàng</SelectItem>
            <SelectItem value='course'>Khóa học</SelectItem>
            <SelectItem value='system'>Hệ thống</SelectItem>
            <SelectItem value='promotion'>Khuyến mãi</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả</SelectItem>
            <SelectItem value='unread'>Chưa đọc</SelectItem>
            <SelectItem value='read'>Đã đọc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className='flex justify-between items-center'>
        <div className='text-sm text-muted-foreground'>
          {notifications.filter((n) => !n.isRead).length} thông báo chưa đọc
        </div>
        <Button variant='outline' size='sm'>
          Đánh dấu tất cả đã đọc
        </Button>
      </div>

      {/* Notifications List */}
      <div className='space-y-4'>
        {notifications.map((notification) => {
          const Icon = typeIconMap[notification.type]
          return (
            <Card
              key={notification.id}
              className={`overflow-hidden transition-colors hover:border-primary/50 ${
                !notification.isRead ? 'bg-muted/30' : ''
              }`}
            >
              <CardContent className='p-6'>
                <div className='flex gap-4'>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 
                    ${typeColorMap[notification.type]}`}
                  >
                    <Icon className='h-5 w-5' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <Badge variant='outline'>{typeTextMap[notification.type]}</Badge>
                      {!notification.isRead && <Badge className='bg-primary'>Mới</Badge>}
                    </div>
                    <h3 className='font-medium text-lg mb-1'>{notification.title}</h3>
                    <p className='text-muted-foreground'>{notification.content}</p>
                    <div className='flex items-center gap-4 mt-2 text-sm text-muted-foreground'>
                      <span>{notification.time}</span>
                      {notification.link && (
                        <Button variant='link' className='p-0 h-auto' asChild>
                          <a href={notification.link}>Xem chi tiết</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Load More Button */}
        {hasMore && (
          <div className='pt-4 text-center'>
            <Button
              variant='outline'
              size='lg'
              onClick={handleLoadMore}
              disabled={isLoading}
              className='w-full max-w-sm'
            >
              {isLoading ? (
                <>
                  <span className='mr-2'>Đang tải...</span>
                  <svg
                    className='animate-spin h-4 w-4'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                </>
              ) : (
                'Xem thêm thông báo'
              )}
            </Button>
          </div>
        )}

        {/* No More Data Message */}
        {!hasMore && notifications.length > 0 && (
          <div className='pt-4 text-center text-sm text-muted-foreground'>Đã hiển thị tất cả thông báo</div>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className='text-center py-12'>
            <Bell className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>Không có thông báo nào</h3>
            <p className='text-sm text-muted-foreground'>Bạn sẽ nhận được thông báo khi có cập nhật mới</p>
          </div>
        )}
      </div>
    </div>
  )
}
