import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Eye, FilePen, GraduationCap } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface CourseStatsProps {
  isLoading: boolean
  totalCourses: number
  visibleCourses: number
  draftCourses: number
  bannedCourses: number
}

export function CourseStats({
  isLoading,
  totalCourses,
  visibleCourses,
  draftCourses,
  bannedCourses
}: CourseStatsProps) {
  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <Skeleton className='h-5 w-[120px]' />
              <Skeleton className='h-5 w-5 rounded-full' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-9 w-[80px] mb-2' />
              <Skeleton className='h-4 w-[160px]' />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-sm font-medium'>Tổng khóa học</CardTitle>
          <BookOpen className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalCourses}</div>
          <p className='text-xs text-muted-foreground'>Số lượng khóa học trong hệ thống</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-sm font-medium'>Khóa học hiển thị</CardTitle>
          <Eye className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{visibleCourses}</div>
          <p className='text-xs text-muted-foreground'>Số khóa học đang hiển thị</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-sm font-medium'>Khóa học nháp</CardTitle>
          <FilePen className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{draftCourses}</div>
          <p className='text-xs text-muted-foreground'>Số khóa học đang ở chế độ nháp</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-sm font-medium'>Khóa học bị khóa</CardTitle>
          <GraduationCap className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{bannedCourses}</div>
          <p className='text-xs text-muted-foreground'>Số khóa học đang bị khóa</p>
        </CardContent>
      </Card>
    </div>
  )
}
