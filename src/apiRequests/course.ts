import http from '@/lib/http'
import {
  CourseResourceResType,
  CourseResType,
  CoursesResType,
  UserCourseProgressResType,
  UserCoursesResType
} from '@/schemaValidations/course.schema'

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
  enrollCourse: (id: string) => http.post(`/courses/enroll/${id}`, {}),
  getUserCourses: () => http.get<UserCoursesResType>('/courses/my-course'),
  getCourseProgress: (id: string) => http.get<UserCourseProgressResType>(`/user-progress/status/${id}`),
  updateCourseProgress: (courseResourceId: string) => http.post('/user-progress', { courseResourceId }),
  getCourseResource: (courseResourceId: string) =>
    http.get<CourseResourceResType>(`/course-resources/detail/${courseResourceId}`)
}

export default courseApiRequest
