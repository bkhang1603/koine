import { TrendingDown } from 'lucide-react'
import { TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatsCardProps {
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  label: string
  value: string | number
  trend?: {
    value: string
    isUp: boolean
  }
  trendText?: string
}

export function StatsCard({ icon, iconBg, label, value, trend, trendText }: StatsCardProps) {
  return (
    <Card>
      <CardContent className='pt-6'>
        <div className='flex items-center gap-4'>
          <div className={`p-3 ${iconBg} rounded-full`}>{icon}</div>
          <div>
            <p className='text-sm text-muted-foreground'>{label}</p>
            <p className='text-2xl font-bold'>{value}</p>
            {trend && (
              <p className={`text-xs ${trend.isUp ? 'text-green-500' : 'text-red-500'} flex items-center gap-1 mt-1`}>
                {trend.isUp ? <TrendingUp className='w-3 h-3' /> : <TrendingDown className='w-3 h-3' />}
                {trend.value} {trendText}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
