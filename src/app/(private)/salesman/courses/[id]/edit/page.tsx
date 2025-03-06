'use client'
import { use } from 'react'

import { CourseForm } from '@/components/private/salesman/course-form'
import { mockCourses } from '../../../_mock/data'
import { useRouter } from 'next/navigation'

export default function EditCoursePage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const router = useRouter()
  const course = mockCourses.find((c) => c.id === params.id)

  if (!course) {
    return <div>Không tìm thấy khóa học</div>
  }

  const handleSubmit = () => {
    router.push('/salesman/courses')
  }

  return <CourseForm onSubmit={handleSubmit} isEdit />
}
