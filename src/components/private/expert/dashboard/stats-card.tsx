import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  iconColor: string
  iconBgColor: string
}

export function StatsCard({ title, value, description, icon: Icon, trend, iconColor, iconBgColor }: StatsCardProps) {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>{title}</p>
            <div className='flex items-baseline gap-2'>
              <h3 className='text-2xl font-bold mt-1'>{value}</h3>
              {trend && (
                <p className={`text-xs font-medium ${trend.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.value >= 0 ? '+' : ''}
                  {trend.value}% {trend.label}
                </p>
              )}
            </div>
            {description && <p className='text-xs text-muted-foreground mt-1'>{description}</p>}
          </div>
          <div className={`p-3 rounded-full ${iconBgColor}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
