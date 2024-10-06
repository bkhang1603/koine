import blogApiRequest from '@/apiRequests/blog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogApiRequest.createBlogComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blogComments']
      })
    }
  })
}

export const useBlogReactQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['reactBlog', id],
    queryFn: () => blogApiRequest.getReactComment(id)
  })
}

export const useBlogReactUpdateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogApiRequest.updateReactComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reactBlog']
      })
    }
  })
}
