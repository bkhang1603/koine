import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Clock, BarChart3, Star, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import configRoute from '@/config/route'

interface CourseCardProps {
  course: {
    id: string
    title: string
    imageUrl: string
    completionRate: number
    durationDisplay: string
    totalLesson: number
    level: 'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  }
}

const getLevelConfig = (level: string) => {
  switch (level) {
    case 'BEGINNER':
      return {
        label: 'Cơ bản',
        color: 'bg-gradient-to-r from-emerald-500/90 to-emerald-600/90',
        textColor: 'text-white'
      }
    case 'INTERMEDIATE':
      return {
        label: 'Trung cấp',
        color: 'bg-gradient-to-r from-blue-500/90 to-blue-600/90',
        textColor: 'text-white'
      }
    case 'ADVANCED':
      return {
        label: 'Nâng cao',
        color: 'bg-gradient-to-r from-purple-500/90 to-purple-600/90',
        textColor: 'text-white'
      }
    default:
      return {
        label: 'Tất cả',
        color: 'bg-gradient-to-r from-gray-500/90 to-gray-600/90',
        textColor: 'text-white'
      }
  }
}

export function MyCourseCard({ course }: CourseCardProps) {
  const levelConfig = getLevelConfig(course.level)

  return (
    <Card className='group relative overflow-hidden border-0 bg-white transition-all hover:shadow-lg hover:shadow-gray-200/80'>
      <Link href={`${configRoute.learn}/${course.id}`} className='block'>
        {/* Course Image Container */}
        <div className='relative'>
          <div className='aspect-[4/3] relative overflow-hidden'>
            <Image
              src={course.imageUrl || '/placeholder.png'}
              alt={course.title}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80' />
          </div>

          {/* Course Info Overlay */}
          <div className='absolute inset-x-0 bottom-0 p-4 text-white'>
            <h3 className='line-clamp-2 text-lg font-semibold leading-tight tracking-tight'>{course.title}</h3>

            <div className='mt-3 flex items-center gap-3 text-white/90'>
              <div className='flex items-center gap-1.5'>
                <Clock className='h-4 w-4' />
                <span className='text-sm'>{course.durationDisplay}</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <BookOpen className='h-4 w-4' />
                <span className='text-sm'>{course.totalLesson} bài học</span>
              </div>
            </div>
          </div>

          {/* Level Badge */}
          <div
            className={cn(
              'absolute right-3 top-3 px-2.5 py-1 rounded-full text-xs font-medium',
              'flex items-center gap-1.5 backdrop-blur-sm',
              levelConfig.color,
              levelConfig.textColor
            )}
          >
            <BarChart3 className='h-3.5 w-3.5' />
            {levelConfig.label}
          </div>
        </div>
      </Link>

      {/* Progress Section */}
      <div className='p-4 space-y-3'>
        <div className='flex items-center justify-between gap-2 text-sm'>
          <div className='font-medium text-gray-700'>{course.completionRate}% hoàn thành</div>
          <div className='text-xs text-gray-500'>
            {course.completionRate === 100 ? (
              <div className='flex items-center gap-1 text-yellow-600'>
                <Star className='h-4 w-4 fill-yellow-500' />
                Đã hoàn thành
              </div>
            ) : (
              'Đang học'
            )}
          </div>
        </div>

        <Progress value={course.completionRate} className='h-1.5 bg-gray-100' />

        {/* Continue Learning Button */}
        <Link href={`${configRoute.learn}/${course.id}`} className='block mt-3'>
          <Button
            className={cn(
              'w-full gap-2 font-medium',
              course.completionRate === 100 ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-primary hover:bg-primary/90'
            )}
          >
            <PlayCircle className='h-4 w-4' />
            {course.completionRate === 100 ? 'Học lại' : 'Tiếp tục học'}
          </Button>
        </Link>
      </div>
    </Card>
  )
}
