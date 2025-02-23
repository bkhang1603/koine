import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface RecentActivityProps {
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  title: string
  description: string
  progress: number
  action: {
    label: string
    href: string
  }
}

export function RecentActivity({ icon, iconBg, title, description, progress, action }: RecentActivityProps) {
  return (
    <div className='flex items-center gap-4'>
      <div className={`p-3 ${iconBg} rounded-full`}>{icon}</div>
      <div className='flex-1'>
        <div className='flex justify-between items-start'>
          <div>
            <p className='font-medium'>{title}</p>
            <p className='text-sm text-muted-foreground'>{description}</p>
          </div>
          <Button size='sm' variant='outline' asChild>
            <Link href={action.href}>{action.label}</Link>
          </Button>
        </div>
        <Progress value={progress} className='mt-2 h-1' />
      </div>
    </div>
  )
}
