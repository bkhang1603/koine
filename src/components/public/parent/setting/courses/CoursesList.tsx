// import { MyCourseCard } from './MyCourseCard'

import { MyCourseCard } from '@/components/public/parent/setting/courses/MyCourseCard'

interface CoursesListProps {
  courses: any[]
}

export function CoursesList({ courses }: CoursesListProps) {
  return (
    // <div className='grid gap-6'>
    //   {courses.map((course) => (
    //     <MyCourseCard key={course.id} course={course} />
    //   ))}
    // </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {courses.map((course) => (
        <MyCourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
