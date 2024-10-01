import blogApiRequest from '@/apiRequests/blog'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useBlogCommentsQuery = (id: string) => {
  return useQuery({
    queryKey: ['blogComments', id],
    queryFn: () => blogApiRequest.getBlogComments({ id })
  })
}

export const useBlogCommentCreateMutation = () => {
  return useMutation({
    mutationFn: blogApiRequest.createBlogComment
  })
}
