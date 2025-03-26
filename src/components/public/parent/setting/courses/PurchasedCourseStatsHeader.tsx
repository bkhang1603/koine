import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Users, GraduationCap, ShoppingBag } from 'lucide-react'

interface PurchasedCourseStatsHeaderProps {
  stats: {
    totalCourses: number
    totalQuantity: number
    totalAssigned: number
    totalUnused: number
  }
}

export function PurchasedCourseStatsHeader({ stats }: PurchasedCourseStatsHeaderProps) {
  // Array of stat cards for easy mapping
  const statCards = [
    {
      icon: <BookOpen className='h-6 w-6 text-primary/90' />,
      value: stats.totalCourses,
      label: 'Tổng khóa học',
      bgColor: 'from-primary/5 to-primary/10'
    },
    {
      icon: <ShoppingBag className='h-6 w-6 text-blue-500/90' />,
      value: stats.totalQuantity,
      label: 'Tổng chỗ học',
      bgColor: 'from-blue-50/80 to-blue-50'
    },
    {
      icon: <GraduationCap className='h-6 w-6 text-amber-500/90' />,
      value: stats.totalAssigned,
      label: 'Đã gán',
      bgColor: 'from-amber-50/80 to-amber-50'
    },
    {
      icon: <Users className='h-6 w-6 text-green-500/90' />,
      value: stats.totalUnused,
      label: 'Chưa gán',
      bgColor: 'from-green-50/80 to-green-50'
    }
  ]

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
      {statCards.map((card, index) => (
        <Card key={index} className='border-none shadow-sm overflow-hidden'>
          <CardContent className={`p-4 bg-gradient-to-b ${card.bgColor}`}>
            <div className='flex items-center gap-3'>
              <div className='p-2.5 rounded-full bg-white/80 shadow-sm backdrop-blur-sm'>{card.icon}</div>
              <div>
                <h3 className='text-xl font-bold'>{card.value}</h3>
                <p className='text-xs text-gray-600 mt-0.5'>{card.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
