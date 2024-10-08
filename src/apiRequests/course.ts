import http from '@/lib/http'
import { CourseResType, CoursesResType } from '@/schemaValidations/course.schema'

const courseApiRequest = {
  getCourses: () =>
    http.get<CoursesResType>('/courses', {
      cache: 'no-cache'
    }),
  getCourse: (id: string) =>
    http.get<CourseResType>(`/courses/${id}`, {
      cache: 'no-cache'
    }),
  addCourse: (data: any) => http.post('/courses', data),
  updateCourse: (data: any) => http.put('/courses', data),
  deleteCourse: (id: string) => http.delete(`/courses/${id}`),
  enrollCourse: (id: string) => http.post(`/courses/enroll/${id}`, {})
}

export default courseApiRequest
