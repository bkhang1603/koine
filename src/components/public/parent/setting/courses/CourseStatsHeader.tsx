import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Clock, GraduationCap, Trophy } from 'lucide-react'

interface CourseStatsHeaderProps {
  stats: {
    totalCourses: number
    completedCourses: number
    inProgressCourses: number
    averageProgress: number
    totalHours: number
  }
}

export function CourseStatsHeader({ stats }: CourseStatsHeaderProps) {
  // Array of stat cards for easy mapping
  const statCards = [
    {
      icon: <BookOpen className='h-6 w-6 text-primary/90' />,
      value: stats.totalCourses,
      label: 'Tổng khóa học',
      bgColor: 'from-primary/5 to-primary/10'
    },
    {
      icon: <GraduationCap className='h-6 w-6 text-blue-500/90' />,
      value: stats.inProgressCourses,
      label: 'Đang học',
      bgColor: 'from-blue-50/80 to-blue-50'
    },
    {
      icon: <Trophy className='h-6 w-6 text-amber-500/90' />,
      value: stats.completedCourses,
      label: 'Đã hoàn thành',
      bgColor: 'from-amber-50/80 to-amber-50'
    },
    {
      icon: <Clock className='h-6 w-6 text-green-500/90' />,
      value: stats.totalHours,
      label: 'Giờ học',
      suffix: 'h',
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
                <div className='flex items-baseline gap-0.5'>
                  <h3 className='text-xl font-bold'>{card.value}</h3>
                  {card.suffix && <span className='text-xs text-gray-500'>{card.suffix}</span>}
                </div>
                <p className='text-xs text-gray-600 mt-0.5'>{card.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
