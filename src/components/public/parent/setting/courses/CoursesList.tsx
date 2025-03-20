import { MyCourseCard } from './MyCourseCard'

interface CoursesListProps {
  courses: any[]
}

export function CoursesList({ courses }: CoursesListProps) {
  return (
    <div className='grid gap-6'>
      {courses.map((course) => (
        <MyCourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
