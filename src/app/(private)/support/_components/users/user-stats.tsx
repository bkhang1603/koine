import { Card, CardContent } from '@/components/ui/card'
import { Users, UserCheck, Clock, DollarSign } from 'lucide-react'

interface UserStatsProps {
  stats: {
    totalUsers: number
    activeUsers: number
    newUsers: number
    ticketsPerUser: number
  }
}

export function UserStats({ stats }: UserStatsProps) {
  return (
    <div className='grid gap-4 md:grid-cols-4'>
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-blue-50 rounded-full'>
              <Users className='w-6 h-6 text-blue-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Tổng người dùng</p>
              <p className='text-2xl font-bold'>{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-green-50 rounded-full'>
              <UserCheck className='w-6 h-6 text-green-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Đang hoạt động</p>
              <p className='text-2xl font-bold'>{stats.activeUsers.toLocaleString()}</p>
              <p className='text-xs text-muted-foreground mt-1'>
                {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% tổng số
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-purple-50 rounded-full'>
              <Clock className='w-6 h-6 text-purple-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Người dùng mới</p>
              <p className='text-2xl font-bold'>{stats.newUsers}</p>
              <p className='text-xs text-muted-foreground mt-1'>30 ngày qua</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-orange-50 rounded-full'>
              <DollarSign className='w-6 h-6 text-orange-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Tickets/Người dùng</p>
              <p className='text-2xl font-bold'>{stats.ticketsPerUser}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
