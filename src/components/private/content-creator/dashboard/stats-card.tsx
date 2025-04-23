import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
}

export function StatsCard({ title, value, description, icon: Icon, iconColor, iconBgColor }: StatsCardProps) {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>{title}</p>
            <h3 className='text-2xl font-bold mt-2'>{value}</h3>
            <p className='text-xs text-muted-foreground mt-1'>{description}</p>
          </div>
          <div className={`p-3 ${iconBgColor} rounded-full`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
