import { Card, CardContent } from '@/components/ui/card'
import { MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

interface TicketStatsProps {
  stats: {
    total: number
    pending: number
    processing: number
    resolved: number
    avgResponseTime: string
    resolutionRate: number
  }
}

export function TicketStats({ stats }: TicketStatsProps) {
  return (
    <div className='grid gap-4 md:grid-cols-4'>
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-blue-50 rounded-full'>
              <MessageSquare className='w-6 h-6 text-blue-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Tổng số ticket</p>
              <p className='text-2xl font-bold'>{stats.total}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-yellow-50 rounded-full'>
              <Clock className='w-6 h-6 text-yellow-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Chờ xử lý</p>
              <p className='text-2xl font-bold'>{stats.pending}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-green-50 rounded-full'>
              <CheckCircle2 className='w-6 h-6 text-green-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Tỷ lệ giải quyết</p>
              <p className='text-2xl font-bold'>{stats.resolutionRate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-orange-50 rounded-full'>
              <AlertCircle className='w-6 h-6 text-orange-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Thời gian phản hồi</p>
              <p className='text-2xl font-bold'>{stats.avgResponseTime}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 