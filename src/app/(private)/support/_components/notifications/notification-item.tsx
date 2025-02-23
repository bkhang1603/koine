import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MessageSquare, RefreshCcw, Star, AlertCircle, CheckCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

type NotificationType = 'ticket' | 'refund' | 'review' | 'alert' | 'success'

interface NotificationItemProps {
  id: string
  type: NotificationType
  title: string
  message: string
  createdAt: string
  isRead: boolean
  link?: string
}

const iconMap = {
  ticket: MessageSquare,
  refund: RefreshCcw,
  review: Star,
  alert: AlertCircle,
  success: CheckCircle
}

const colorMap = {
  ticket: 'text-blue-500 bg-blue-50',
  refund: 'text-red-500 bg-red-50',
  review: 'text-yellow-500 bg-yellow-50',
  alert: 'text-orange-500 bg-orange-50',
  success: 'text-green-500 bg-green-50'
}

export function NotificationItem({ type, title, message, createdAt, isRead, link }: NotificationItemProps) {
  const Icon = iconMap[type]

  return (
    <div className={cn('p-4 flex gap-4 hover:bg-muted/50 transition-colors', !isRead && 'bg-muted/30')}>
      <div className={cn('p-2 rounded-full h-fit', colorMap[type])}>
        <Icon className='w-5 h-5' />
      </div>
      <div className='flex-1 min-w-0'>
        <div className='flex justify-between items-start gap-2'>
          <div>
            <h4 className='font-medium leading-none'>{title}</h4>
            <p className='text-sm text-muted-foreground mt-1 line-clamp-2'>{message}</p>
          </div>
          <time className='text-xs text-muted-foreground whitespace-nowrap'>
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: vi })}
          </time>
        </div>
        {link && (
          <Button variant='link' className='h-8 px-0' asChild>
            <Link href={link}>Xem chi tiết</Link>
          </Button>
        )}
      </div>
    </div>
  )
} 