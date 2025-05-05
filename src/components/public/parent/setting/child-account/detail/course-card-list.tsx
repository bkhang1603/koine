/* eslint-disable no-unused-vars */
import React from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, BarChart3, Eye, EyeOff, Link as LinkIcon } from 'lucide-react'
import Image from 'next/image'
import { cn, handleErrorApi } from '@/lib/utils'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useUpdateVisibleCourseForChildMutation } from '@/queries/useAccount'
import { toast } from '@/components/ui/use-toast'
import configRoute from '@/config/route'

interface CourseProps {
  id: string
  title: string
  completionRate: number
  imageUrl: string
  level?: string
  durationDisplay?: string
  isVisible?: boolean
}

interface CourseCardListProps {
  courses: CourseProps[]
  emptyState: React.ReactNode
  isCourseLoading?: boolean
}

export function CourseCardList({ courses, emptyState, isCourseLoading = false }: CourseCardListProps) {
  const params = useParams()
  const childId = params.id as string
  const updateVisibleCourseForChildMutation = useUpdateVisibleCourseForChildMutation({ id: childId })

  const handleToggleCourseVisibility = (courseId: string, isVisible: boolean) => {
    try {
      if (updateVisibleCourseForChildMutation.isPending) return

      updateVisibleCourseForChildMutation.mutate({
        childId,
        courseId,
        isVisible: !isVisible
      })

      toast({
        description: 'Khóa học đã được cập nhật trạng thái thành công'
      })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  if (courses.length === 0 && !isCourseLoading) {
    return emptyState
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isPending={
            (isCourseLoading && updateVisibleCourseForChildMutation.variables?.courseId === course.id) ||
            (updateVisibleCourseForChildMutation.isPending &&
              updateVisibleCourseForChildMutation.variables?.courseId === course.id)
          }
          onToggleVisibility={() => handleToggleCourseVisibility(course.id, course.isVisible || false)}
        />
      ))}
    </div>
  )
}

function CourseCard({
  course,
  isPending = false,
  onToggleVisibility
}: {
  course: CourseProps
  isPending?: boolean
  onToggleVisibility?: (courseId: string) => void
}) {
  const params = useParams()
  const childId = params.id as string // Lấy childId từ URL

  // Cấu hình màu sắc và labels dựa trên level
  const getLevelConfig = (level?: string) => {
    switch (level) {
      case 'ALL':
        return { color: 'bg-gray-100 text-gray-800', label: 'Tất cả' }
      case 'BEGINNER':
        return { color: 'bg-emerald-100 text-emerald-800', label: 'Sơ cấp' }
      case 'INTERMEDIATE':
        return { color: 'bg-blue-100 text-blue-800', label: 'Trung cấp' }
      case 'ADVANCED':
        return { color: 'bg-orange-100 text-orange-800', label: 'Nâng cao' }
      default:
        return { color: 'bg-gray-100 text-gray-800', label: level || 'Chưa phân loại' }
    }
  }

  const levelConfig = getLevelConfig(course.level)

  // Xác định trạng thái và màu sắc của progress
  const getProgressState = (rate: number) => {
    if (rate === 0) return { color: 'bg-gray-200', status: 'Chưa bắt đầu' }
    if (rate === 100) return { color: 'bg-green-500', status: 'Đã hoàn thành' }
    return { color: 'bg-primary', status: 'Đang học' }
  }

  const progressState = getProgressState(course.completionRate)

  const handleToggleVisibility = () => {
    if (onToggleVisibility) {
      onToggleVisibility(course.id)
    }
  }

  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-0 bg-white transition-all hover:shadow-lg hover:shadow-gray-200/80 cursor-pointer',
        !course.isVisible && 'opacity-70'
      )}
    >
      {/* Course Image Container */}
      <div className='relative'>
        <div className='aspect-[4/3] relative overflow-hidden'>
          <Image
            src={course.imageUrl || 'https://placehold.co/400x300/jpeg'}
            alt={course.title}
            fill
            className='object-cover'
          />

          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>

          {/* Course Level Badge */}
          {course.level && (
            <Badge className={cn('absolute right-3 top-3 px-2 py-1', levelConfig.color)} variant='outline'>
              {levelConfig.label}
            </Badge>
          )}

          {/* Course Info Overlay */}
          <div className='absolute inset-x-0 bottom-0 p-4'>
            <h3 className='font-medium text-lg text-white line-clamp-2 mb-1'>{course.title}</h3>

            <div className='mt-3 flex items-center gap-3'>
              {course.durationDisplay && (
                <Badge variant='secondary' className='bg-white/20 text-white border-0 gap-1'>
                  <Clock className='h-3 w-3' />
                  <span>{course.durationDisplay}</span>
                </Badge>
              )}

              <Badge variant='secondary' className='bg-white/20 text-white border-0 gap-1'>
                <BarChart3 className='h-3 w-3' />
                <span>{progressState.status}</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className='p-4 space-y-3'>
        <div className='flex items-center justify-between gap-2'>
          <span className='text-sm text-gray-600'>Tiến độ học tập</span>
          <span className='text-sm font-medium'>{course.completionRate}%</span>
        </div>

        {/* Progress Bar */}
        <Progress value={course.completionRate} className='h-1.5' />

        {/* Parent Actions */}
        <div className='flex gap-2 mt-3'>
          <Button variant='outline' className='flex-1 gap-2' onClick={handleToggleVisibility} disabled={isPending}>
            {isPending ? (
              <>
                <div className='h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin' />
                <span>Đang cập nhật...</span>
              </>
            ) : course.isVisible ? (
              <>
                <EyeOff className='h-4 w-4' />
                <span>Ẩn khóa học</span>
              </>
            ) : (
              <>
                <Eye className='h-4 w-4' />
                <span>Hiện khóa học</span>
              </>
            )}
          </Button>

          <Button variant='outline' className='px-3' asChild>
            <Link href={`${configRoute.setting.childAccount}/detail/${childId}/course/${course.id}`}>
              <LinkIcon className='h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
