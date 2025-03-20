/* eslint-disable no-unused-vars */
import { BookOpen } from 'lucide-react'
import { CourseGridItem } from './CourseGridItem'
import { Course } from './chapter-picker-types'

interface CourseBrowseViewProps {
  courses: Course[]
  searchQuery: string
  selectedChapterIds: Set<string>
  onCourseClick: (course: Course) => void
  onSelectAll: (courseId: string, isSelected: boolean) => void
  isCourseFullySelected: (courseId: string) => boolean
  isCourseSemiSelected: (courseId: string) => boolean
}

export const CourseBrowseView = ({
  courses,
  searchQuery,
  selectedChapterIds,
  onCourseClick,
  onSelectAll,
  isCourseFullySelected,
  isCourseSemiSelected
}: CourseBrowseViewProps) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8'>
    {courses.length === 0 ? (
      <div className='col-span-full flex justify-center items-center py-12'>
        <div className='text-center'>
          <BookOpen className='mx-auto h-12 w-12 text-muted-foreground/60' />
          <h3 className='mt-4 font-medium'>Không tìm thấy khóa học</h3>
          <p className='mt-2 text-sm text-muted-foreground'>
            {searchQuery ? `Không có kết quả cho "${searchQuery}"` : 'Không có khóa học nào'}
          </p>
        </div>
      </div>
    ) : (
      courses.map((course) => (
        <CourseGridItem
          key={course.id}
          course={course}
          selectedChapterIds={selectedChapterIds}
          onCourseClick={onCourseClick}
          onSelectAll={onSelectAll}
          isCourseFullySelected={isCourseFullySelected}
          isCourseSemiSelected={isCourseSemiSelected}
        />
      ))
    )}
  </div>
)
