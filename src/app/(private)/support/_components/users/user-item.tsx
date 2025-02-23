import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import Link from 'next/link'
import { MessageSquare, DollarSign, Users } from 'lucide-react'

interface UserItemProps {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  status: 'active' | 'inactive' | 'blocked'
  role: 'parent' | 'student' | 'teacher'
  joinDate: string
  lastActive: string
  stats: {
    totalSpent: number
    totalTickets: number
    openTickets: number
    childAccounts: number
  }
}

const statusMap = {
  active: { label: 'Đang hoạt động', variant: 'success' },
  inactive: { label: 'Không hoạt động', variant: 'secondary' },
  blocked: { label: 'Đã khóa', variant: 'destructive' }
} as const

const roleMap = {
  parent: { label: 'Phụ huynh', variant: 'default' },
  student: { label: 'Học sinh', variant: 'outline' },
  teacher: { label: 'Giáo viên', variant: 'secondary' }
} as const

export function UserItem({
  id,
  name,
  email,
  phone,
  avatar,
  status,
  role,
  joinDate,
  lastActive,
  stats
}: UserItemProps) {
  return (
    <div className='p-4 flex gap-4 hover:bg-muted/50 transition-colors'>
      <Avatar className='h-12 w-12'>
        <AvatarImage src={avatar} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className='flex-1 min-w-0'>
        <div className='flex justify-between items-start gap-2'>
          <div>
            <div className='flex items-center gap-2'>
              <h4 className='font-medium'>{name}</h4>
              <Badge variant={statusMap[status].variant}>{statusMap[status].label}</Badge>
              <Badge variant={roleMap[role].variant}>{roleMap[role].label}</Badge>
            </div>
            <div className='flex gap-4 mt-1 text-sm text-muted-foreground'>
              <span>{email}</span>
              <span>•</span>
              <span>{phone}</span>
            </div>
          </div>
          <Button size='sm' variant='outline' asChild>
            <Link href={`/support/users/${id}`}>Xem chi tiết</Link>
          </Button>
        </div>
        <div className='flex gap-6 mt-2 text-sm'>
          <div className='flex items-center gap-1 text-muted-foreground'>
            <DollarSign className='w-4 h-4' />
            <span>{stats.totalSpent.toLocaleString()}đ đã chi tiêu</span>
          </div>
          <div className='flex items-center gap-1 text-muted-foreground'>
            <MessageSquare className='w-4 h-4' />
            <span>
              {stats.openTickets}/{stats.totalTickets} tickets đang mở
            </span>
          </div>
          <div className='flex items-center gap-1 text-muted-foreground'>
            <Users className='w-4 h-4' />
            <span>{stats.childAccounts} tài khoản con</span>
          </div>
        </div>
        <div className='flex gap-2 mt-2 text-xs text-muted-foreground'>
          <span>Tham gia: {formatDistanceToNow(new Date(joinDate), { addSuffix: true, locale: vi })}</span>
          <span>•</span>
          <span>
            Hoạt động cuối:{' '}
            {formatDistanceToNow(new Date(lastActive), {
              addSuffix: true,
              locale: vi
            })}
          </span>
        </div>
      </div>
    </div>
  )
} 