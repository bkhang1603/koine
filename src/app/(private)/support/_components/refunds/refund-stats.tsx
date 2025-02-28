import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, Clock, CheckCircle2, XCircle } from 'lucide-react'

interface RefundStatsProps {
  stats: {
    total: {
      count: number
      amount: number
    }
    pending: {
      count: number
      amount: number
    }
    approved: {
      count: number
      amount: number
    }
    rejected: {
      count: number
      amount: number
    }
  }
}

export function RefundStats({ stats }: RefundStatsProps) {
  return (
    <div className='grid gap-4 md:grid-cols-4'>
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-blue-50 rounded-full'>
              <DollarSign className='w-6 h-6 text-blue-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Tổng hoàn tiền</p>
              <p className='text-2xl font-bold'>{(stats.total.amount / 1000000).toFixed(1)}M</p>
              <p className='text-xs text-muted-foreground mt-1'>{stats.total.count} yêu cầu</p>
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
              <p className='text-sm text-muted-foreground'>Chờ duyệt</p>
              <p className='text-2xl font-bold'>{(stats.pending.amount / 1000000).toFixed(1)}M</p>
              <p className='text-xs text-muted-foreground mt-1'>{stats.pending.count} yêu cầu</p>
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
              <p className='text-sm text-muted-foreground'>Đã duyệt</p>
              <p className='text-2xl font-bold'>{(stats.approved.amount / 1000000).toFixed(1)}M</p>
              <p className='text-xs text-muted-foreground mt-1'>{stats.approved.count} yêu cầu</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-red-50 rounded-full'>
              <XCircle className='w-6 h-6 text-red-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Từ chối</p>
              <p className='text-2xl font-bold'>{(stats.rejected.amount / 1000000).toFixed(1)}M</p>
              <p className='text-xs text-muted-foreground mt-1'>{stats.rejected.count} yêu cầu</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
