import blogApiRequest from '@/apiRequests/blog'
import { BlogUpdateBodyType } from '@/schemaValidations/blog.schema'
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
      queryClient.invalidateQueries({
        queryKey: ['blogCommentsAdmin']
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
      queryClient.invalidateQueries({
        queryKey: ['blogCommentsAdmin']
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
      queryClient.invalidateQueries({
        queryKey: ['blogCommentsAdmin']
      })
    }
  })
}

export const useBlogQuery = ({
  page_index,
  search,
  page_size
}: {
  page_index?: number
  search?: string
  page_size?: number
}) => {
  return useQuery({
    queryKey: ['blogs', page_index, search, page_size],
    queryFn: () => blogApiRequest.getBlogs({ page_index, search, page_size })
  })
}

export const useBlogDetailQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogApiRequest.getBlog(id)
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

export const useCategoryBlogQuery = ({
  page_index,
  page_size,
  keyword
}: {
  page_index?: number | undefined
  page_size?: number | undefined
  keyword?: string | string[] | undefined
}) => {
  return useQuery({
    queryKey: ['categoryBlog', page_index, page_size, keyword],
    queryFn: () => blogApiRequest.getCategoryBlog({ page_index, page_size, keyword })
  })
}
export const useCategoryBlogDetailQuery = ({ id, enabled }: { id: string; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['categoryBlog', id],
    queryFn: () => blogApiRequest.getCategoryBlogDetail(id),
    enabled
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

export const useBlogUpdateMutation = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: BlogUpdateBodyType) => blogApiRequest.updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blogs']
      })
    }
  })
}

export const useBlogDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogApiRequest.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blogs']
      })
      queryClient.invalidateQueries({
        queryKey: ['myBlogs']
      })
    }
  })
}
export const useBlogListAdminQuery = ({
  page_index,
  page_size,
  keyword
}: {
  page_index?: number | undefined
  page_size?: number | undefined
  keyword?: string | string[] | undefined
}) => {
  return useQuery({
    queryKey: ['blogsAdmin', page_index, page_size, keyword],
    queryFn: () => blogApiRequest.getBlogsListAdmin({ page_index, page_size, keyword })
  })
}

export const useBlogDetailAdminQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['blogDetailAdmin', id],
    queryFn: () => blogApiRequest.getBlogDetailAdmin(id)
  })
}

export const useBlogCommentsAdminQuery = ({
  id,
  page_index,
  page_size
}: {
  id: string
  page_index?: number | undefined
  page_size?: number | undefined
}) => {
  return useInfiniteQuery({
    queryKey: ['blogCommentsAdmin', id, page_index, page_size],
    queryFn: () => blogApiRequest.getBlogCommentsAdmin({ id, page_index, page_size }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.payload?.pagination?.currentPage < lastPage?.payload?.pagination?.totalPage) {
        return lastPage.payload.pagination.currentPage + 1
      }
    },
    initialPageParam: 1
  })
}
export const useMyBlogsQuery = ({
  page_index,
  page_size,
  keyword
}: {
  page_index?: number | undefined
  page_size?: number | undefined
  keyword?: string | string[] | undefined
}) => {
  return useQuery({
    queryKey: ['myBlogs', page_index, page_size, keyword],
    queryFn: () => blogApiRequest.getMyBlogs({ page_index, page_size, keyword })
  })
}

export const useBlogUpdateStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'VISIBLE' | 'HIDDEN' }) =>
      blogApiRequest.updateIsVisibleCourse(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myBlogs']
      })
    }
  })
}
