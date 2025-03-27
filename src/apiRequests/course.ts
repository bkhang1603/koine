import http from '@/lib/http'
import {
  AllCoursesForCustomResType,
  CategoryCoursesResType,
  ChaptersResType,
  CourseResType,
  CourseReviewResType,
  CoursesResType,
  CreateCourseBodyResType,
  CreateCourseBodyType,
  CreateCourseCustomBodyType,
  CreateCourseCustomResType,
  LessonResType,
  LessonsResType,
  PreviewLessonsResType,
  UserCourseProgressResType,
  UserCoursesResType
} from '@/schemaValidations/course.schema'
import { OnlyMessageResType } from '@/schemaValidations/special.schema'

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
      `/courses?page_index=${page_index}&page_size=${page_size}${
        keyword ? `&keyword=${keyword}` : ''
      }${category ? `&category=${category}` : ''}${range ? `&range=${range}` : ''}${sort ? `&sort=${sort}` : ''}`
    ),
  getCourse: (id: string) => http.get<CourseResType>(`/courses/${id}`),
  addCourse: (data: CreateCourseBodyType) => http.post<CreateCourseBodyResType>('/courses', data),
  updateCourse: (id: string, data: CreateCourseBodyType) => http.put<CreateCourseBodyResType>(`/courses/${id}`, data),
  deleteCourse: (id: string) => http.delete<OnlyMessageResType>(`/courses/${id}`),
  enrollCourse: (id: string) => http.post<OnlyMessageResType>(`/courses/enroll/${id}`, {}),
  getUserCourses: () => http.get<UserCoursesResType>('/course-enrollment/enrolled'),
  updateCourseProgress: (lessonId: string) => http.post<OnlyMessageResType>('/user-progresses', { lessonId }),
  getCategoryCourses: () => http.get<CategoryCoursesResType>(`/category-courses`),
  activeCourse: (data: { childId?: string | null; courseId: string | null }) =>
    http.post<OnlyMessageResType>(`/courses/active-course-enroll`, data),
  getCourseProgress: (id: string) => http.get<UserCourseProgressResType>(`/user-progresses/status/${id}`),
  getChapters: (id: string) => http.get<ChaptersResType>(`/chapters/${id}`),
  getLessons: (id: string) => http.get<LessonsResType>(`/lessons/${id}`),
  getLesson: (id: string) => http.get<LessonResType>(`/lessons/detail/${id}`),
  getCourseReview: (id: string) => http.get<CourseReviewResType>(`/courses/${id}/reviews`),
  getAllCoursesForCustom: () => http.get<AllCoursesForCustomResType>(`/courses/all-basic-course-info`),
  getPreviewLessons: ({ id, limit }: { id: string; limit: number }) =>
    http.get<PreviewLessonsResType>(`lessons/${id}/preview?limit=${limit}`),
  createCourseCustom: (data: CreateCourseCustomBodyType) =>
    http.post<CreateCourseCustomResType>('/course-customs/request-custom-course', data)
}

export default courseApiRequest
