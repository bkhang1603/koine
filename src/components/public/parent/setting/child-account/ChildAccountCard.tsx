import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { GraduationCap, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface ChildAccountCardProps {
  account: {
    childId: string
    childName: string
    childImageUrl: string
    totalCourse: number
    totalCoursesCompleted: number
  }
}

export function ChildAccountCard({ account }: ChildAccountCardProps) {
  // Tính tỷ lệ phần trăm hoàn thành khóa học
  const completionPercentage =
    account.totalCourse > 0 ? Math.round((account.totalCoursesCompleted / account.totalCourse) * 100) : 0

  // Lấy tên viết tắt cho avatar fallback
  const initials = account.childName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Link href={`/setting/child-account/${account.childId}`}>
      <Card
        className='overflow-hidden border-gray-100 hover:border-primary/20 transition-all duration-300 
                     hover:shadow-md group'
      >
        <CardContent className='p-0'>
          {/* Header Section */}
          <div className='bg-gradient-to-r from-primary/5 to-primary/10 p-4'>
            <div className='flex items-center gap-3'>
              <Avatar className='h-12 w-12 border-2 border-white shadow-sm'>
                <AvatarImage src={account.childImageUrl} alt={account.childName} />
                <AvatarFallback className='bg-primary/10 text-primary'>{initials}</AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <h4 className='font-medium text-gray-900 truncate group-hover:text-primary transition-colors'>
                  {account.childName}
                </h4>
                <div className='flex items-center mt-0.5 gap-2'>
                  <p className='text-xs text-gray-500 flex items-center'>
                    <GraduationCap className='w-3.5 h-3.5 mr-1 text-gray-400' />
                    <span>{account.totalCourse} khóa học</span>
                  </p>
                  <Badge className='text-[10px] h-4 px-1.5 font-medium'>{completionPercentage}%</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className='p-4 space-y-4'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-500'>Tiến độ học tập</span>
              <span className='font-medium text-gray-700'>
                {account.totalCoursesCompleted}/{account.totalCourse} khóa học
              </span>
            </div>

            <Progress value={completionPercentage} className='h-1.5 bg-gray-100' />

            {/* View Details Link */}
            <div className='flex justify-end pt-2'>
              <div className='text-sm text-primary font-medium group-hover:translate-x-0.5 transition-transform flex items-center'>
                Xem chi tiết
                <ChevronRight className='h-4 w-4 ml-0.5' />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
