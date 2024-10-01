import http from '@/lib/http'
import { BlogResType, BlogsResType } from '@/schemaValidations/blog.schema'

const blogApiRequest = {
  getBlogs: ({ page_index, search }: { page_index?: number | undefined; search?: string | string[] | undefined }) =>
    http.get<BlogsResType>(`/blogs?page_index=${page_index}&keyword=${search}`),
  getBlog: (id: string) => http.get<BlogResType>(`/blogs/${id}`),
  createBlog: (data: any) => http.post('/blogs', data),
  updateBlog: (id: string, data: any) => http.put(`/blogs/${id}`, data),
  deleteBlog: (id: string) => http.delete(`/blogs/${id}`)
}

export default blogApiRequest
