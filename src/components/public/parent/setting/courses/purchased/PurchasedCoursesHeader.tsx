import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Gift, Sparkles, ShoppingCart } from 'lucide-react'

interface PurchasedCoursesHeaderProps {
  totalItems: number
  totalValue: number
  activatedCount: number
  nonActivatedCount: number
}

export function PurchasedCoursesHeader({
  totalItems,
  totalValue,
  activatedCount,
  nonActivatedCount
}: PurchasedCoursesHeaderProps) {
  // Stats cards data
  const stats = [
    {
      title: 'Tổng khóa học',
      value: totalItems,
      icon: <ShoppingCart className='h-5 w-5 text-primary' />,
      bgColor: 'from-primary/5 to-primary/10'
    },
    {
      title: 'Đã kích hoạt',
      value: activatedCount,
      icon: <Sparkles className='h-5 w-5 text-blue-500' />,
      bgColor: 'from-blue-50/80 to-blue-50'
    },
    {
      title: 'Chưa kích hoạt',
      value: nonActivatedCount,
      icon: <Gift className='h-5 w-5 text-amber-500' />,
      bgColor: 'from-amber-50/80 to-amber-50'
    },
    {
      title: 'Tổng giá trị',
      value: totalValue.toLocaleString('vi-VN'),
      suffix: 'đ',
      icon: <BookOpen className='h-5 w-5 text-green-500' />,
      bgColor: 'from-green-50/80 to-green-50'
    }
  ]

  return (
    <div className='space-y-6'>
      <div>
        <div className='flex items-center gap-2'>
          <ShoppingCart className='h-5 w-5 text-primary' />
          <h2 className='text-xl font-medium text-gray-900'>Khóa học đã mua</h2>
        </div>
        <p className='text-sm text-gray-500 mt-1 md:ml-7'>
          Quản lý danh sách khóa học đã mua và phân phối cho tài khoản con
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        {stats.map((stat, index) => (
          <Card key={index} className='border-none shadow-sm overflow-hidden'>
            <CardContent className={`p-4 bg-gradient-to-b ${stat.bgColor}`}>
              <div className='flex items-center gap-3'>
                <div className='p-2.5 rounded-full bg-white/80 shadow-sm backdrop-blur-sm'>{stat.icon}</div>
                <div>
                  <div className='flex items-baseline gap-0.5'>
                    <h3 className='text-xl font-bold'>{stat.value}</h3>
                    {stat.suffix && <span className='text-xs text-gray-500'>{stat.suffix}</span>}
                  </div>
                  <p className='text-xs text-gray-600 mt-0.5'>{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
