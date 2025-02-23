import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import Link from 'next/link'
import { DollarSign, Package, BookOpen } from 'lucide-react'

interface RefundItemProps {
  id: string
  type: 'course' | 'product'
  item: string
  amount: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  condition?: string
  progress?: string
  createdAt: string
  user: {
    name: string
    email: string
    avatar?: string
  }
}

const statusMap = {
  pending: { label: 'Chờ duyệt', variant: 'secondary' },
  approved: { label: 'Đã duyệt', variant: 'success' },
  rejected: { label: 'Từ chối', variant: 'destructive' }
} as const

export function RefundItem({
  id,
  type,
  item,
  amount,
  reason,
  status,
  condition,
  progress,
  createdAt,
  user
}: RefundItemProps) {
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
              <h4 className='font-medium'>{item}</h4>
              <Badge variant={statusMap[status].variant}>{statusMap[status].label}</Badge>
              <Badge variant='outline'>
                {type === 'course' ? (
                  <BookOpen className='w-3 h-3 mr-1' />
                ) : (
                  <Package className='w-3 h-3 mr-1' />
                )}
                {type === 'course' ? 'Khóa học' : 'Sản phẩm'}
              </Badge>
            </div>
            <p className='text-sm text-muted-foreground mt-1 line-clamp-2'>{reason}</p>
          </div>
          <div className='flex flex-col items-end gap-2'>
            <div className='flex items-center text-green-600 font-medium'>
              <DollarSign className='w-4 h-4' />
              {amount.toLocaleString()}đ
            </div>
            <Button size='sm' variant='outline' asChild>
              <Link href={`/support/refunds/${id}`}>Xem chi tiết</Link>
            </Button>
          </div>
        </div>
        <div className='flex gap-2 mt-2 text-sm text-muted-foreground'>
          <span>{user.name}</span>
          <span>•</span>
          <span>{user.email}</span>
          <span>•</span>
          {type === 'course' ? (
            <span>Tiến độ: {progress}</span>
          ) : (
            <span>Tình trạng: {condition}</span>
          )}
          <span>•</span>
          <time>{formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: vi })}</time>
        </div>
      </div>
    </div>
  )
} 