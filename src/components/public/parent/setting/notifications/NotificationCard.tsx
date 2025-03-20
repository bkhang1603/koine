import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Book, Bell, CheckCircle2, Trash2, User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

interface NotificationCardProps {
  notification: {
    id: string
    title: string
    message: string
    type: 'course' | 'system'
    isRead: boolean
    createdAt: string
  }
}

export function NotificationCard({ notification }: NotificationCardProps) {
  const { title, message, type, isRead, createdAt } = notification

  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: vi
  })

  // Đổi màu của Avatar theo loại thông báo
  const getIconBgColor = () => {
    if (type === 'course') return 'bg-blue-50'
    if (type === 'system') return 'bg-amber-50'
    return 'bg-gray-100'
  }

  // Biểu tượng cho loại thông báo
  const getIcon = () => {
    if (type === 'course') return <Book className='h-4 w-4 text-blue-500' />
    if (type === 'system') return <Bell className='h-4 w-4 text-amber-500' />
    return <User className='h-4 w-4 text-gray-500' />
  }

  return (
    <div className={`p-4 hover:bg-gray-50 transition-colors ${!isRead ? 'bg-blue-50/30' : ''}`}>
      <div className='flex gap-4'>
        <div className={`p-2.5 rounded-full ${getIconBgColor()} self-start mt-0.5`}>{getIcon()}</div>

        <div className='flex-1 min-w-0'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1'>
            <div className='flex items-center gap-2'>
              <h4 className='font-medium text-gray-900 truncate'>{title}</h4>
              {!isRead && <Badge className='bg-blue-500 h-1.5 w-1.5 rounded-full p-0' />}
            </div>
            <span className='text-xs text-gray-500'>{formattedTime}</span>
          </div>

          <p className='text-sm text-gray-600 mb-2'>{message}</p>

          <div className='flex justify-end gap-2'>
            {!isRead && (
              <Button size='sm' variant='outline' className='h-8 text-xs py-0'>
                <CheckCircle2 className='h-3.5 w-3.5 mr-1.5' />
                Đánh dấu đã đọc
              </Button>
            )}

            <Button size='sm' variant='ghost' className='h-8 text-xs py-0 hover:text-red-500 hover:bg-red-50'>
              <Trash2 className='h-3.5 w-3.5 mr-1.5' />
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
