import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreVertical, Eye, Edit, Trash2, BookOpen, FileText, Clock } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import { Course } from '../../../../app/(private)/content-creator/course/types'
import { courseCategories } from '../../../../app/(private)/content-creator/_mock/data'

interface CourseCardProps {
  course: Course
  onDelete: (courseId: number) => void
  onNavigate: (path: string) => void
}

export function CourseCard({ course, onDelete, onNavigate }: CourseCardProps) {
  return (
    <Card className='group relative overflow-hidden hover:border-primary/50 transition-colors'>
      {/* Thumbnail Section */}
      <div className='aspect-[16/9] relative'>
        <Image src={course.thumbnail} alt={course.title} fill className='object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

        {/* Status & Actions */}
        <CourseCardActions course={course} onDelete={onDelete} onNavigate={onNavigate} />

        {/* Category Badge */}
        <div className='absolute bottom-4 left-4'>
          <Badge variant='outline' className='font-normal bg-background/80 backdrop-blur-sm border-0'>
            {course.categories.map((cat) => courseCategories.find((c) => c.id === cat)?.name).join(', ')}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <Link href={`/content-creator/course/${course.id}`}>
        <div className='p-5 space-y-4'>
          <CourseInfo course={course} />
          <CourseStats course={course} />
        </div>
      </Link>
    </Card>
  )
}

function CourseCardActions({ course, onDelete, onNavigate }: CourseCardProps) {
  return (
    <div className='absolute top-4 right-4 z-10 flex items-center gap-2'>
      <Badge
        variant={course.status === 'published' ? 'default' : 'secondary'}
        className='h-6 px-2 text-xs font-medium bg-background/80 backdrop-blur-sm'
      >
        {course.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
      </Badge>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='icon' className='h-6 w-6 bg-background/80 backdrop-blur-sm'>
            <MoreVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-48'>
          <DropdownMenuItem onClick={() => onNavigate(`/content-creator/course/${course.id}`)}>
            <Eye className='w-4 h-4 mr-2' />
            Xem chi tiết
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate(`/content-creator/course/${course.id}/edit`)}>
            <Edit className='w-4 h-4 mr-2' />
            Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(course.id as unknown as number)}
            className='text-destructive focus:text-destructive'
          >
            <Trash2 className='w-4 h-4 mr-2' />
            Xóa khóa học
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function CourseInfo({ course }: { course: Course }) {
  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-2 text-xs text-muted-foreground'>
        <div>{course.level}</div>
        <span>•</span>
        <div>{course.ageGroup}</div>
      </div>
      <h3 className='font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2'>{course.title}</h3>
      <p className='text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]'>{course.description}</p>
    </div>
  )
}

function CourseStats({ course }: { course: Course }) {
  return (
    <div className='grid grid-cols-3 gap-3 pt-4 border-t'>
      <StatItem icon={BookOpen} value={course.chapters?.length || 0} label='Chương' />
      <StatItem icon={FileText} value={course.totalLessons || 0} label='Bài học' />
      <StatItem icon={Clock} value={course.duration} label='Giờ' />
    </div>
  )
}

function StatItem({ icon: Icon, value, label }: { icon: any; value: string | number; label: string }) {
  return (
    <div className='flex items-center gap-3 p-3 bg-muted/50 rounded-lg'>
      <div className='shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center'>
        <Icon className='w-[18px] h-[18px] text-primary' />
      </div>
      <div>
        <div className='text-sm font-medium'>{value}</div>
        <div className='text-xs text-muted-foreground'>{label}</div>
      </div>
    </div>
  )
}
