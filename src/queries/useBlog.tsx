import blogApiRequest from '@/apiRequests/blog'
import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'

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

// export const useGetInfinitiveBlogCommentsQuery = ({ id }: { id: string }) => {
//   return useInfiniteQuery({
//     queryKey: ['blogComments', id],
//     queryFn: ({ pageParam = 1 }) => blogApiRequest.getBlogComments({ id, page_index: pageParam, page_size: 10 }),
//     getNextPageParam: (lastPage) => {
//       if (lastPage.payload.pagination.currentPage < lastPage.payload.pagination.totalPage) {
//         return lastPage.payload.pagination.currentPage + 1
//       }
//     },
//     initialPageParam: 1
//   })
// }

export const useGetInfinitiveBlogCommentsQuery = ({ id }: { id: string }) => {
  return useInfiniteQuery({
    queryKey: ['blogComments', id],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await blogApiRequest.getBlogComments({ id, page_index: pageParam, page_size: 10 })
        return response
      } catch (error) {
        throw new Error('Error fetching blog comments')
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.payload?.pagination?.currentPage < lastPage?.payload?.pagination?.totalPage) {
        return lastPage.payload.pagination.currentPage + 1
      }
    },
    initialPageParam: 1
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

export const useBlogReactQuery = ({ id, enabled }: { id: string; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['reactBlog', id],
    queryFn: () => blogApiRequest.getReactComment(id),
    enabled
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

export const useBlogCommentDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogApiRequest.deleteBlogComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blogComments']
      })
    }
  })
}

export const useBlogCommentUpdateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogApiRequest.updateBlogComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blogComments']
      })
    }
  })
}

// Content Creator
export const useBlogCreateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogApiRequest.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blogs']
      })
    }
  })
}

export const useCategoryBlogQuery = () => {
  return useQuery({
    queryKey: ['categoryBlog'],
    queryFn: () => blogApiRequest.getCategoryBlog()
  })
}

export const useCategoryBlogDetailQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['categoryBlog', id],
    queryFn: () => blogApiRequest.getCategoryBlogDetail(id)
  })
}

export const useCategoryBlogCreateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogApiRequest.createCategoryBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categoryBlog']
      })
    }
  })
}

export const useCategoryBlogUpdateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogApiRequest.updateCategoryBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categoryBlog']
      })
    }
  })
}

export const useCategoryBlogDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogApiRequest.deleteCategoryBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categoryBlog']
      })
    }
  })
}
