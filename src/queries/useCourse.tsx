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

export const useGetUserCoursesQuery = () => {
  return useQuery({
    queryKey: ['userCourses'],
    queryFn: courseApiRequest.getUserCourses
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
  return useMutation({
    mutationFn: courseApiRequest.activeCourse
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
    queryKey: ['lesson', id],
    queryFn: () => courseApiRequest.getLesson(id),
    enabled
  })
}
