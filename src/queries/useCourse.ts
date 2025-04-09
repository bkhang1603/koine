import courseApiRequest from '@/apiRequests/course'
import { CreateCourseBodyType, UpdateCategoryCourseBodyType } from '@/schemaValidations/course.schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useEnrollCourseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: courseApiRequest.enrollCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userCourses']
      })
    }
  })
}

export const useGetUserCoursesQuery = ({ enabled }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['userCourses'],
    queryFn: courseApiRequest.getUserCourses,
    enabled
  })
}

export const useGetCourseProgressQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['courseProgress', id],
    queryFn: () => courseApiRequest.getCourseProgress(id)
  })
}

export const useUpdateCourseProgressMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: courseApiRequest.updateCourseProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['courseProgress']
      })
    }
  })
}

export const useGetCategoryCoursesQuery = ({
  page_index,
  page_size,
  keyword
}: {
  page_index?: number
  page_size?: number
  keyword?: string
}) => {
  return useQuery({
    queryKey: ['categoryCourses', page_index, page_size, keyword],
    queryFn: () => courseApiRequest.getCategoryCourses({ page_index, page_size, keyword })
  })
}

export const useActiveCourseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: courseApiRequest.activeCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userCourses']
      })
      // Nếu bạn cần invalidate các query khác, hãy gọi riêng
      queryClient.invalidateQueries({
        queryKey: ['account-store']
      })
      queryClient.invalidateQueries({
        queryKey: ['courseProgress']
      })
    }
  })
}

export const useGetChaptersQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['chapters', id],
    queryFn: () => courseApiRequest.getChapters(id)
  })
}

export const useGetLessonsQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['lessons', id],
    queryFn: () => courseApiRequest.getLessons(id)
  })
}

export const useGetLessonQuery = ({ id, enabled }: { id: string; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['courseProgress', id],
    queryFn: () => courseApiRequest.getLesson(id),
    enabled
  })
}

export const useGetCourseReviewQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['courseReview', id],
    queryFn: () => courseApiRequest.getCourseReview(id)
  })
}

export const useGetAllCoursesForCustomQuery = () => {
  return useQuery({
    queryKey: ['allCoursesForCustom'],
    queryFn: courseApiRequest.getAllCoursesForCustom
  })
}

export const useCoursesAdminQuery = ({
  keyword,
  page_size,
  page_index
}: {
  keyword: string
  page_size: number
  page_index: number
}) => {
  return useQuery({
    queryKey: ['courses', keyword, page_size, page_index],
    queryFn: () =>
      courseApiRequest.getCoursesAdmin({
        keyword,
        page_size,
        page_index
      })
  })
}

export const useCourseDetailAdminQuery = ({ courseId }: { courseId: string }) => {
  return useQuery({
    queryKey: ['course-detail', courseId],
    queryFn: () =>
      courseApiRequest.getCourseDetailAdmin({
        courseId
      }),
    enabled: !!courseId
  })
}

export const useGetPreviewLessonsQuery = ({ id, limit, enabled }: { id: string; limit: number; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['preview', id, limit],
    queryFn: () => courseApiRequest.getPreviewLessons({ id, limit }),
    enabled
  })
}

export const useGetCoursesQuery = ({
  page_index,
  page_size,
  category,
  range,
  sort,
  keyword
}: {
  page_index?: number
  page_size?: number
  category?: string
  range?: number
  sort?: string
  keyword?: string
}) => {
  return useQuery({
    queryKey: ['courses', page_index, page_size, category, range, sort, keyword],
    queryFn: () => courseApiRequest.getCourses({ page_index, page_size, category, range, sort, keyword })
  })
}

export const useGetCourseQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => courseApiRequest.getCourse(id)
  })
}

export const useAddCourseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: courseApiRequest.addCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course']
      })
    }
  })
}

export const useUpdateCourseMutation = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCourseBodyType) => courseApiRequest.updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course']
      })
    }
  })
}

export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: courseApiRequest.deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course']
      })
    }
  })
}

export const useGetCategoryCourseDetailQuery = ({ id, enabled }: { id: string; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['categoryCourseDetail', id],
    queryFn: () => courseApiRequest.getCategoryCourseDetail(id),
    enabled: enabled ?? !!id
  })
}

export const useCreateCategoryCourseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: courseApiRequest.createCategoryCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categoryCourses']
      })
    }
  })
}

export const useUpdateCategoryCourseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryCourseBodyType }) =>
      courseApiRequest.updateCategoryCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categoryCourses']
      })
    }
  })
}

export const useDeleteCategoryCourseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: courseApiRequest.deleteCategoryCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categoryCourses']
      })
    }
  })
}

export const useCreateCourseCustomMutation = () => {
  return useMutation({
    mutationFn: courseApiRequest.createCourseCustom
  })
}

export const useGetCourses = ({
  page_index,
  page_size,
  category,
  range,
  sort,
  keyword
}: {
  page_index?: number
  page_size?: number
  category?: string
  range?: number
  sort?: string
  keyword?: string
}) => {
  return useQuery({
    queryKey: ['courses', page_index, page_size, category, range, sort, keyword],
    queryFn: () => courseApiRequest.getCourses({ page_index, page_size, category, range, sort, keyword })
  })
}

export const useUpdateScoreQuizMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: courseApiRequest.updateScoreQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['courseProgress']
      })
    }
  })
}
