import http from '@/lib/http'
import {
  CreateCourseCommentBodyType,
  CreateCourseCommentResType,
  GetCourseDetailAdminResType,
  GetCoursesListAdminResType,
  GetDraftCoursesResType,
  GetQuestionListResType,
  CreateQuestionBodyType,
  CreateQuestionResType,
  UpdateQuestionBodyType,
  UpdateQuestionResType,
  DeleteQuestionResType,
  GetChapterQuestionListResType,
  AddMultiQuestionsToChapterBodyType,
  AddMultiQuestionsToChapterResType,
  RemoveQuestionFromChapterBodyType,
  RemoveQuestionFromChapterResType
} from '@/schemaValidations/admin.schema'
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
  UserCoursesResType,
  CreateCategoryCourseBodyType,
  CreateCategoryCourseResType,
  DeleteCategoryCourseResType,
  GetCategoryCourseDetailResType,
  UpdateCategoryCourseBodyType,
  UpdateCategoryCourseResType,
  UpdateScoreQuizResType,
  UpdateScoreQuizBodyType,
  CreateLessonBodyType,
  UpdateLessonBodyType,
  UpdateChapterBodyType,
  CreateChapterBodyType,
  CourseComboDetailResType,
  UpdateStatusCourseResType,
  UpdateIsVisibleCourseBodyType,
  UpdateStatusCourseBodyType,
  UpdateIsVisibleCourseResType
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
  // getCourses with caching
  getCoursesCache: ({
    page_index,
    page_size,
    category,
    range,
    sort,
    keyword,
    age
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    category?: string | undefined
    range?: number | undefined
    sort?: string | undefined | ['pa', 'pd', 'na', 'nd'] | string[]
    keyword?: string | string[] | undefined
    age?: string | string[] | undefined
  }) =>
    http.get<CoursesResType>(
      `/courses?page_index=${page_index}&page_size=${page_size}${
        keyword ? `&keyword=${keyword}` : ''
      }${category ? `&category=${category}` : ''}${range ? `&range=${range}` : ''}${sort ? `&sort=${sort}` : ''}${age ? `&age=${age}` : ''}`
      // { cache: 'force-cache', next: { revalidate: 12 * 60 * 60 } }
    ),
  getCourse: (id: string) => http.get<CourseResType>(`/courses/${id}`),
  // getCourse with caching
  getCourseCache: (id: string) =>
    http.get<CourseResType>(
      `/courses/${id}`
      // { cache: 'force-cache', next: { revalidate: 12 * 60 * 60 } }
    ),
  addCourse: (data: CreateCourseBodyType) => http.post<CreateCourseBodyResType>('/courses', data),
  updateCourse: (id: string, data: CreateCourseBodyType) => http.put<CreateCourseBodyResType>(`/courses/${id}`, data),
  deleteCourse: (id: string) => http.delete<OnlyMessageResType>(`/courses/${id}`),
  // enrollCourse: (body: { courseId: string; childId?: string | null }) =>
  //   http.post<OnlyMessageResType>(`/courses/active-course-enroll`, body),
  getCourseComboDetail: (id: string) => http.get<CourseComboDetailResType>(`/combos/${id}`),
  getUserCourses: () => http.get<UserCoursesResType>('/course-enrollment/enrolled'),
  updateCourseProgress: (lessonId: string) => http.post<OnlyMessageResType>('/user-progresses', { lessonId }),
  // getCategoryCourses: () => http.get<CategoryCoursesResType>(`/category-courses`),
  // getCategoryCourses with caching
  getCategoryCoursesCache: () =>
    http.get<CategoryCoursesResType>(`/category-courses`, { cache: 'force-cache', next: { revalidate: 24 * 60 * 60 } }),
  activeCourse: (data: { childId?: string | null; courseId: string }) =>
    http.post<OnlyMessageResType>(`/courses/active-course-enroll`, data),
  getCourseProgress: (id: string) => http.get<UserCourseProgressResType>(`/user-progresses/status/${id}`),
  getChapters: (id: string) => http.get<ChaptersResType>(`/chapters/${id}`),
  createChapter: (data: CreateChapterBodyType) => http.post<OnlyMessageResType>('/chapters', data),
  updateChapter: (id: string, data: UpdateChapterBodyType) => http.put<OnlyMessageResType>(`/chapters/${id}`, data),
  deleteChapter: (id: string) => http.delete<OnlyMessageResType>(`/chapters/${id}`),
  getLessons: (id: string) => http.get<LessonsResType>(`/lessons/${id}`),
  getLesson: (id: string) => http.get<LessonResType>(`/lessons/detail/${id}`),
  createLesson: (data: CreateLessonBodyType) => http.post<OnlyMessageResType>('/lessons', data),
  updateLesson: (id: string, data: UpdateLessonBodyType) => http.put<OnlyMessageResType>(`/lessons/${id}`, data),
  deleteLesson: (id: string) => http.delete<OnlyMessageResType>(`/lessons/${id}`),
  getCourseReview: (id: string) => http.get<CourseReviewResType>(`/courses/${id}/reviews`),
  getAllCoursesForCustom: () => http.get<AllCoursesForCustomResType>(`/courses/all-basic-course-info`),
  getCoursesAdmin: ({
    page_index,
    page_size,
    keyword
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    keyword?: string | string[] | undefined
  }) =>
    http.get<GetCoursesListAdminResType>(`/courses?page_index=${page_index}&page_size=${page_size}&keyword=${keyword}`),
  getCourseDetailAdmin: ({ courseId }: { courseId: string }) =>
    http.get<GetCourseDetailAdminResType>(`courses/${courseId}`),
  getPreviewLessons: ({ id, limit }: { id: string; limit: number }) =>
    http.get<PreviewLessonsResType>(`lessons/${id}/preview?limit=${limit}`),
  createCourseCustom: (data: CreateCourseCustomBodyType) =>
    http.post<CreateCourseCustomResType>('/course-customs/request-custom-course', data),
  getCategoryCourses: ({
    page_index,
    page_size,
    keyword
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    keyword?: string | string[] | undefined
  }) =>
    http.get<CategoryCoursesResType>(
      `/category-courses?${keyword ? `keyword=${keyword}` : ''}${page_index ? `&page_index=${page_index}` : ''}${page_size ? `&page_size=${page_size}` : ''}`
    ),
  createCategoryCourse: (data: CreateCategoryCourseBodyType) =>
    http.post<CreateCategoryCourseResType>('/category-courses', data),
  getCategoryCourseDetail: (id: string) => http.get<GetCategoryCourseDetailResType>(`/category-courses/${id}`),
  updateCategoryCourse: (id: string, data: UpdateCategoryCourseBodyType) =>
    http.put<UpdateCategoryCourseResType>(`/category-courses/${id}`, data),
  deleteCategoryCourse: (id: string) => http.delete<DeleteCategoryCourseResType>(`/category-courses/${id}`),
  updateScoreQuiz: (data: UpdateScoreQuizBodyType) => http.put<UpdateScoreQuizResType>('/chapters/update-score', data),
  getDraftCourses: ({
    page_index,
    page_size,
    keyword
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    keyword?: string | string[] | undefined
  }) =>
    http.get<GetDraftCoursesResType>(
      `/courses/draft?page_index=${page_index}&page_size=${page_size}${keyword ? `&keyword=${keyword}` : ''}`
    ),
  updateStatusCourse: (id: string, data: UpdateStatusCourseBodyType) =>
    http.put<UpdateStatusCourseResType>(`/courses/${id}`, data),
  updateIsVisibleCourse: (id: string, data: UpdateIsVisibleCourseBodyType) =>
    http.put<UpdateIsVisibleCourseResType>(`/courses/${id}`, data),
  createCourseComment: (data: CreateCourseCommentBodyType) =>
    http.post<CreateCourseCommentResType>('/course-comments', data),
  getQuestionList: ({ page_index, page_size }: { page_index?: number | undefined; page_size?: number | undefined }) =>
    http.get<GetQuestionListResType>(`/questions?page_index=${page_index}&page_size=${page_size}`),
  createQuestion: (data: CreateQuestionBodyType) => http.post<CreateQuestionResType>('/questions', data),
  updateQuestion: (id: string, data: UpdateQuestionBodyType) =>
    http.put<UpdateQuestionResType>(`/questions/${id}`, data),
  deleteQuestion: (id: string) => http.delete<DeleteQuestionResType>(`/questions/${id}`),
  getChapterQuestionList: ({
    chapterId,
    page_index,
    page_size
  }: {
    chapterId: string
    page_index?: number | undefined
    page_size?: number | undefined
  }) =>
    http.get<GetChapterQuestionListResType>(`/questions/${chapterId}?page_index=${page_index}&page_size=${page_size}`),
  addMultiQuestionsToChapter: (data: AddMultiQuestionsToChapterBodyType) =>
    http.post<AddMultiQuestionsToChapterResType>('/questions/add-multi-question', data),
  removeQuestionFromChapter: (data: RemoveQuestionFromChapterBodyType) =>
    http.delete<RemoveQuestionFromChapterResType>(
      `/questions/remove-question?chapterId=${data.chapterId}&questionId=${data.questionId}`
    )
}

export default courseApiRequest
