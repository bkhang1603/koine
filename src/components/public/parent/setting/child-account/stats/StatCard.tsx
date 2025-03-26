import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  value: string | number
  color: string
}

export const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color }) => (
  <Card className='overflow-hidden border-none shadow-md hover:shadow-lg transition-all'>
    <CardContent className='p-6'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-sm font-medium text-gray-500'>{label}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div
          className={`flex items-center justify-center w-12 h-12 ${color.replace('text-', 'bg-').replace('600', '100')} rounded-full`}
        >
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </div>
    </CardContent>
  </Card>
)
