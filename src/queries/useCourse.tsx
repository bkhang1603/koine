import courseApiRequest from '@/apiRequests/course'
import { CreateCourseBodyType } from '@/schemaValidations/course.schema'
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

export const useGetCategoryCoursesQuery = () => {
  return useQuery({
    queryKey: ['categoryCourses'],
    queryFn: courseApiRequest.getCategoryCourses
  })
}

export const useActiveCourseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: courseApiRequest.activeCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userCourses', 'account-store', 'courseProgress']
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
