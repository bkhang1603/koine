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

export const useGetCourseResourceQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['courseResource', id],
    queryFn: () => courseApiRequest.getCourseResource(id)
  })
}
