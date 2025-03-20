import React from 'react'
import { MyChildAccountByIdResType } from '@/schemaValidations/account.schema'
import { CourseCard } from '@/components/public/parent/setting/child-account/CourseCard'

interface CourseCardListProps {
  courses: MyChildAccountByIdResType['data']['courses']
  emptyState: React.ReactNode
}

export function CourseCardList({ courses, emptyState }: CourseCardListProps) {
  if (!courses.length) {
    return emptyState
  }

  return (
    <div className='grid gap-6'>
      {courses.map((course) => (
        <CourseCard key={course.id} courses={course} />
      ))}
    </div>
  )
}
