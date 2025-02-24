import { Button } from '@/components/ui/button'
import { HelpCircle, Bell, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function DashboardHeader() {
  return (
    <div className='flex justify-between items-center'>
      <div className='space-y-1'>
        <div className='flex items-center gap-2'>
          <h1 className='text-3xl font-bold tracking-tight'>Support Dashboard</h1>
          <Badge variant='secondary'>Beta</Badge>
        </div>
        <p className='text-muted-foreground'>Xin chào Admin, chào mừng bạn quay trở lại 👋</p>
      </div>
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-2 text-sm'>
          <Calendar className='w-4 h-4 text-muted-foreground' />
          <span className='text-muted-foreground'>Hôm nay:</span>
          <span className='font-medium'>{new Date().toLocaleDateString('vi-VN')}</span>
        </div>
        <div className='flex gap-3'>
          <Button size='icon' variant='ghost'>
            <Bell className='w-5 h-5' />
          </Button>
          <Button size='icon' variant='ghost'>
            <HelpCircle className='w-5 h-5' />
          </Button>
        </div>
      </div>
    </div>
  )
}
