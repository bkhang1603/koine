import courseApiRequest from '@/apiRequests/course'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetCourseQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => courseApiRequest.getCourse(id)
  })
}

export const useEnrollCourseMutation = () => {
  return useMutation({
    mutationFn: courseApiRequest.enrollCourse
  })
}
