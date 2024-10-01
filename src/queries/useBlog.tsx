import blogApiRequest from '@/apiRequests/blog'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useBlogCommentsQuery = ({
  id,
  page_index,
  page_size
}: {
  id: string
  page_index?: number
  page_size?: number
}) => {
  return useQuery({
    queryKey: ['blogComments', id, page_index, page_size],
    queryFn: () => blogApiRequest.getBlogComments({ id, page_index, page_size })
  })
}

export const useBlogCommentCreateMutation = () => {
  return useMutation({
    mutationFn: blogApiRequest.createBlogComment
  })
}
