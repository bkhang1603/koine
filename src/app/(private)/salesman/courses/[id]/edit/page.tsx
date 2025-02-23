'use client'

import { CourseForm } from '@/components/private/salesman/course-form'
import { mockCourses } from '../../../_mock/data'
import { useRouter } from 'next/navigation'

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const course = mockCourses.find((c) => c.id === params.id)

  if (!course) {
    return <div>Không tìm thấy khóa học</div>
  }

  const handleSubmit = (data: any) => {
    console.log('Update course:', data)
    router.push('/salesman/courses')
  }

  return <CourseForm initialData={course} onSubmit={handleSubmit} isEdit />
}
