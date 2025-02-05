import http from '@/lib/http'
import {
  CategoryCoursesResType,
  ChaptersResType,
  CourseResType,
  CoursesResType,
  LessonResType,
  LessonsResType,
  UserCourseProgressResType,
  UserCoursesResType
} from '@/schemaValidations/course.schema'

const courseApiRequest = {
  getCourses: ({
    page_index,
    page_size,
    category,
    range,
    sort,
    keyword
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    category?: string | undefined
    range?: number | undefined
    sort?: string | undefined | ['pa', 'pd', 'na', 'nd'] | string[]
    keyword?: string | string[] | undefined
  }) =>
    http.get<CoursesResType>(
      `/courses?page_index=${page_index}&page_size=${page_size}&keyword=${keyword}&category=${category}&range=${range}&sort=${sort}`,
      {
        cache: 'no-cache'
      }
    ),
  getCourse: (id: string) =>
    http.get<CourseResType>(`/courses/${id}`, {
      cache: 'no-cache'
    }),
  addCourse: (data: any) => http.post('/courses', data),
  updateCourse: (data: any) => http.put('/courses', data),
  deleteCourse: (id: string) => http.delete(`/courses/${id}`),
  enrollCourse: (id: string) => http.post(`/courses/enroll/${id}`, {}),
  getUserCourses: () => http.get<UserCoursesResType>('/course-enrollment/enrolled'),
  updateCourseProgress: (lessonId: string) => http.post('/user-progresses', { lessonId }),
  getCategoryCourses: () => http.get<CategoryCoursesResType>(`/category-courses`),
  activeCourse: (data: { childId?: string | null; courseId: string | null }) =>
    http.post(`/courses/active-course-enroll`, data),
  getCourseProgress: (id: string) => http.get<UserCourseProgressResType>(`/user-progresses/status/${id}`),
  getChapters: (id: string) => http.get<ChaptersResType>(`/chapters/${id}`),
  getLessons: (id: string) => http.get<LessonsResType>(`/lessons/${id}`),
  getLesson: (id: string) => http.get<LessonResType>(`/lessons/detail/${id}`)
}

export default courseApiRequest
