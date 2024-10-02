import http from '@/lib/http'
import { CourseResType } from '@/schemaValidations/course.schema'

const courseApiRequest = {
  getCourses: () => http.get<CourseResType>('/courses'),
  getCourse: (id: string) => http.get(`/courses/${id}`),
  addCourse: (data: any) => http.post('/courses', data),
  updateCourse: (data: any) => http.put('/courses', data),
  deleteCourse: (id: string) => http.delete(`/courses/${id}`)
}

export default courseApiRequest
