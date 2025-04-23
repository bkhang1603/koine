import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  iconColor?: string
  iconBgColor?: string
  trend?: {
    value: string
    isUp?: boolean
  }
  trendText?: string
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary/10',
  trend,
  trendText
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex justify-between items-start'>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>{title}</p>
            <div className='flex items-baseline gap-1 mt-2'>
              <p className='text-3xl font-bold'>{value}</p>
              {trendText && <span className='text-muted-foreground text-sm'>{trendText}</span>}
            </div>
            {description && <p className='text-sm text-muted-foreground mt-2'>{description}</p>}
            {trend && (
              <div
                className={cn('flex items-center gap-1 mt-2 text-sm', trend.isUp ? 'text-green-500' : 'text-red-500')}
              >
                {trend.isUp ? (
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
                    <path
                      fillRule='evenodd'
                      d='M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
                    <path
                      fillRule='evenodd'
                      d='M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
                <span>{trend.value}</span>
              </div>
            )}
          </div>
          <div className={cn('p-3 rounded-full', iconBgColor)}>
            <Icon className={cn('w-6 h-6', iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
