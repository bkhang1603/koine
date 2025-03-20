import http from '@/lib/http'
import {
  BlogBodyResType,
  BlogCommentCreateReqType,
  BlogCommentsResType,
  BlogCommentUpdateResType,
  BlogDataResType,
  BlogResType,
  BlogsResType,
  CategoryBlogDetailResType,
  CategoryBlogResType
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
  }) => http.get<BlogsResType>(`/blogs?page_index=${page_index}&keyword=${search}&page_size=${page_size}`),
  getBlog: (id: string) => http.get<BlogResType>(`/blogs/${id}`),
  createBlog: (data: BlogDataResType) => http.post<BlogBodyResType>('/blogs', data),
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
  updateReactComment: (data: UpdateReactDataType) => http.post('/blog-reacts', data),
  deleteBlogComment: (id: string) => http.delete(`/blog-comments/${id}`),
  updateBlogComment: ({ id, data }: { id: string; data: BlogCommentUpdateResType }) =>
    http.put(`/blog-comments/${id}`, data),
  getCategoryBlog: () => http.get<CategoryBlogResType>('/category-blogs'),
  getCategoryBlogDetail: (id: string) => http.get<CategoryBlogDetailResType>(`/category-blogs/${id}`),
  createCategoryBlog: (data: { name: string; description: string }) =>
    http.post<CategoryBlogDetailResType>('/category-blogs', data),
  updateCategoryBlog: ({ id, data }: { id: string; data: { name: string; description: string } }) =>
    http.put<CategoryBlogDetailResType>(`/category-blogs/${id}`, data),
  deleteCategoryBlog: (id: string) => http.delete<CategoryBlogDetailResType>(`/category-blogs/${id}`)
}

export default blogApiRequest
