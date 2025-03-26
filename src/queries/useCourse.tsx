import courseApiRequest from '@/apiRequests/course'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetCourseQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => courseApiRequest.getCourse(id)
  })
}

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
        queryKey: ['userCourses']
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
