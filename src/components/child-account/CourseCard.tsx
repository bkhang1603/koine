import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { MyChildAccountByIdResType } from '@/schemaValidations/account.schema'
import { BookOpen, Clock, Star, ChevronRight, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface CourseProps {
  courses: MyChildAccountByIdResType['data']['courses'][0]
  // eslint-disable-next-line no-unused-vars
  onToggleVisibility: (id: string) => void
}

export const CourseCard: React.FC<CourseProps> = ({ courses, onToggleVisibility }) => {
  const completionRate = courses.completionRate || 0
  const [imageError, setImageError] = useState(false)

  const getStatusInfo = () => {
    if (completionRate === 100) {
      return {
        label: 'Hoàn thành',
        icon: Star,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        progressColor: 'bg-emerald-500'
      }
    }
    if (completionRate > 25) {
      return {
        label: 'Đang học',
        icon: Clock,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        progressColor: 'bg-blue-500'
      }
    }
    return {
      label: 'Mới bắt đầu',
      icon: BookOpen,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      progressColor: 'bg-amber-500'
    }
  }

  const status = getStatusInfo()
  const StatusIcon = status.icon

  return (
    <Card className='overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group'>
      <div className='flex flex-col md:flex-row md:h-[180px]'>
        {/* Image Container */}
        <div className='relative w-full md:w-[180px] h-44 md:h-[180px] flex-shrink-0 overflow-hidden'>
          {imageError ? (
            <div className='flex items-center justify-center h-full bg-gray-50'>
              <AlertCircle className='h-12 w-12 text-gray-300' />
            </div>
          ) : (
            <div className='w-full h-full'>
              <Image
                src={courses.imageUrl || '/placeholder-course.jpg'}
                alt={courses.title}
                width={320}
                height={180}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                onError={() => setImageError(true)}
              />
            </div>
          )}
          <div className='absolute top-2 right-2'>
            <Badge className={`${status.bgColor} ${status.color} px-2 py-0.5 text-xs font-medium`}>
              <StatusIcon className='inline-block h-3 w-3 mr-1' />
              {status.label}
            </Badge>
          </div>
        </div>

        {/* Content Container */}
        <div className='flex-1 p-4 flex flex-col justify-between'>
          <div>
            {/* Title & Categories */}
            <div className='mb-2'>
              <h3 className='font-medium text-gray-900 mb-1 line-clamp-2 hover:text-primary transition-colors'>
                {courses.title}
              </h3>
              <div className='flex flex-wrap gap-1.5 mt-1'>
                {(courses.categories || []).slice(0, 2).map((category) => (
                  <Badge
                    key={category.id}
                    variant='outline'
                    className='px-1.5 py-0 text-[10px] bg-gray-50 text-gray-700 font-normal'
                  >
                    {category.name}
                  </Badge>
                ))}
                {(courses.categories?.length || 0) > 2 && (
                  <Badge variant='outline' className='px-1.5 py-0 text-[10px] bg-gray-50 text-gray-500 font-normal'>
                    +{(courses.categories?.length || 0) - 2}
                  </Badge>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className='mb-3'>
              <div className='flex justify-between items-center text-sm mb-1.5'>
                <span className='text-gray-600'>
                  <span className='font-medium text-gray-900'>{completionRate}%</span> hoàn thành
                </span>
                <span className='text-gray-500 text-xs'>
                  {courses.totalLessonFinished || 0}/{courses.totalLesson || 0} bài học
                </span>
              </div>
              <Progress
                value={completionRate}
                className='h-1.5'
                style={{
                  ['--progress-background' as any]: status.progressColor.replace('bg-', 'var(--')
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className='flex items-center justify-between mt-auto pt-2 border-t border-gray-100'>
            <div className='flex items-center gap-3 text-sm text-gray-500'>
              {courses.durationDisplay && (
                <div className='flex items-center gap-1'>
                  <Clock className='h-3.5 w-3.5' />
                  <span className='whitespace-nowrap'>{courses.durationDisplay}</span>
                </div>
              )}
              {courses.author && (
                <div className='hidden md:flex items-center gap-1 max-w-[150px]'>
                  <BookOpen className='h-3.5 w-3.5 flex-shrink-0' />
                  <span className='truncate'>{courses.author}</span>
                </div>
              )}
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-1.5'>
                <span className='text-xs text-gray-500 whitespace-nowrap'>Hiển thị</span>
                <Switch
                  onCheckedChange={() => onToggleVisibility(courses.id)}
                  className='data-[state=checked]:bg-primary h-4 w-7'
                  defaultChecked
                />
              </div>
              <Button
                size='sm'
                variant='ghost'
                className='h-7 px-2 text-xs text-primary hover:text-primary/80 hover:bg-primary/5'
              >
                Chi tiết
                <ChevronRight className='h-3.5 w-3.5 ml-0.5' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
