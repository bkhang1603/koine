import http from '@/lib/http'
import { BlogCommentsResType, BlogResType, BlogsResType } from '@/schemaValidations/blog.schema'

const blogApiRequest = {
  getBlogs: ({
    page_index,
    search,
    page_size
  }: {
    page_index?: number | undefined
    search?: string | string[] | undefined
    page_size?: number | undefined
  }) => http.get<BlogsResType>(`/blogs?page_index=${page_index}&keyword=${search}&page_size=${page_size}`),
  getBlog: (id: string) => http.get<BlogResType>(`/blogs/${id}`),
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
  createBlogComment: (data: any) => http.post('/blog-comments', data)
}

export default blogApiRequest
