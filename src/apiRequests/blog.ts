import http from '@/lib/http'
import {
  BlogCommentCreateReqType,
  BlogCommentsResType,
  BlogResType,
  BlogsResType
} from '@/schemaValidations/blog.schema'
import { ReactDataResType, UpdateReactDataType } from '@/schemaValidations/course.schema'

const blogApiRequest = {
  getBlogs: ({
    page_index,
    search,
    page_size
  }: {
    page_index?: number | undefined
    search?: string | string[] | undefined
    page_size?: number | undefined
  }) =>
    http.get<BlogsResType>(`/blogs?page_index=${page_index}&keyword=${search}&page_size=${page_size}`, {
      cache: 'no-cache'
    }),
  getBlog: (id: string) =>
    http.get<BlogResType>(`/blogs/${id}`, {
      cache: 'no-cache'
    }),
  createBlog: (data: any) => http.post('/blogs', data),
  updateBlog: (id: string, data: any) => http.put(`/blogs/${id}`, data),
  deleteBlog: (id: string) => http.delete(`/blogs/${id}`),
  getBlogComments: ({
    id,
    page_index,
    page_size
  }: {
    id: string
    page_index?: number | undefined
    page_size?: number | undefined
  }) => http.get<BlogCommentsResType>(`/blog-comments/${id}?page_index=${page_index}&page_size=${page_size}`),
  createBlogComment: (data: BlogCommentCreateReqType) => http.post('/blog-comments', data),
  getReactComment: (id: string) => http.get<ReactDataResType>(`/blog-reacts/check/${id}`),
  updateReactComment: (data: UpdateReactDataType) => http.post('/blog-reacts', data)
}

export default blogApiRequest
