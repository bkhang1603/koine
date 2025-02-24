import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import Link from 'next/link'

interface TicketItemProps {
  id: string
  title: string
  description: string
  status: 'pending' | 'processing' | 'resolved'
  priority: 'high' | 'medium' | 'low'
  category: string
  createdAt: string
  user: {
    name: string
    email: string
    avatar?: string
  }
}

const statusMap = {
  pending: { label: 'Chờ xử lý', variant: 'secondary' },
  processing: { label: 'Đang xử lý', variant: 'default' },
  resolved: { label: 'Đã giải quyết', variant: 'success' }
} as const

const priorityMap = {
  high: { label: 'Cao', variant: 'destructive' },
  medium: { label: 'Trung bình', variant: 'default' },
  low: { label: 'Thấp', variant: 'outline' }
} as const

export function TicketItem({ id, title, description, status, priority, category, createdAt, user }: TicketItemProps) {
  return (
    <div className='p-4 flex gap-4 hover:bg-muted/50 transition-colors'>
      <Avatar>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className='flex-1 min-w-0'>
        <div className='flex justify-between items-start gap-2'>
          <div>
            <div className='flex items-center gap-2'>
              <h4 className='font-medium'>{title}</h4>
              <Badge variant={statusMap[status].variant}>{statusMap[status].label}</Badge>
              <Badge variant={priorityMap[priority].variant}>{priorityMap[priority].label}</Badge>
            </div>
            <p className='text-sm text-muted-foreground mt-1 line-clamp-2'>{description}</p>
          </div>
          <div className='flex flex-col items-end gap-2'>
            <time className='text-xs text-muted-foreground'>
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: vi })}
            </time>
            <Button size='sm' variant='outline' asChild>
              <Link href={`/support/tickets/${id}`}>Xem chi tiết</Link>
            </Button>
          </div>
        </div>
        <div className='flex gap-2 mt-2 text-sm text-muted-foreground'>
          <span>{user.name}</span>
          <span>•</span>
          <span>{user.email}</span>
          <span>•</span>
          <span>{category}</span>
        </div>
      </div>
    </div>
  )
} 