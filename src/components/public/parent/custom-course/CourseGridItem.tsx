/* eslint-disable no-unused-vars */
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Course } from './chapter-picker-types'

interface CourseGridItemProps {
  course: Course
  onCourseClick: (course: Course) => void
  onSelectAll: (courseId: string, isSelected: boolean) => void
  isCourseFullySelected: (courseId: string) => boolean
  isCourseSemiSelected: (courseId: string) => boolean
}

export const CourseGridItem = ({
  course,
  onCourseClick,
  onSelectAll,
  isCourseFullySelected,
  isCourseSemiSelected
}: CourseGridItemProps) => (
  <Card key={course.id} className='overflow-hidden'>
    <div
      className='aspect-video relative cursor-pointer'
      onClick={() => onSelectAll(course.id, !isCourseFullySelected(course.id))}
    >
      <Image
        src={course.imageUrl || 'https://placehold.co/600x400/jpeg'}
        alt={course.title}
        fill
        className='object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
      <div className='absolute bottom-3 left-3 right-3'>
        <h3 className='font-medium text-white truncate'>{course.title}</h3>
        <div className='flex items-center gap-2 mt-1'>
          <Badge variant='secondary' className='bg-black/40 hover:bg-black/60 text-xs text-white'>
            {course.chapters?.length || 0} chương
          </Badge>
        </div>
      </div>
    </div>
    <CardContent className='p-3 flex justify-between items-center'>
      <div
        className='flex items-center cursor-pointer'
        onClick={() => onSelectAll(course.id, !isCourseFullySelected(course.id))}
      >
        <Checkbox
          id={`course-${course.id}`}
          checked={isCourseFullySelected(course.id)}
          className='data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground'
          data-state={isCourseSemiSelected(course.id) ? 'indeterminate' : undefined}
          onCheckedChange={(checked) => onSelectAll(course.id, checked === true)}
        />
        <label htmlFor={`course-${course.id}`} className='ml-2 text-sm'>
          Chọn tất cả
        </label>
      </div>

      <Button
        variant='outline'
        size='sm'
        className='ml-auto'
        onClick={(e) => {
          e.stopPropagation()
          onCourseClick(course)
        }}
      >
        Xem chương
        <ChevronRight className='ml-1 h-4 w-4' />
      </Button>
    </CardContent>
  </Card>
)
