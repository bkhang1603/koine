import http from '@/lib/http'
import {
  GetBlogCommentsAdminResType,
  GetBlogDetailAdminResType,
  GetBlogsListAdminResType
} from '@/schemaValidations/admin.schema'
import {
  BlogBodyResType,
  BlogCommentCreateReqType,
  BlogCommentsResType,
  BlogCommentUpdateResType,
  BlogDataResType,
  BlogResType,
  BlogsResType,
  BlogUpdateBodyType,
  CategoryBlogDetailResType,
  CategoryBlogResType,
  GetMyBlogsResType
} from '@/schemaValidations/blog.schema'
import { ReactDataResType, UpdateReactDataType } from '@/schemaValidations/course.schema'
import { OnlyMessageResType } from '@/schemaValidations/special.schema'

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
  // getBlogs with caching
  getBlogsCache: ({
    page_index,
    search,
    page_size,
    categoryId
  }: {
    page_index?: number | undefined
    search?: string | string[] | undefined
    page_size?: number | undefined
    categoryId?: string | string[] | undefined
  }) =>
    http.get<BlogsResType>(
      `/blogs?page_index=${page_index}&keyword=${search}&page_size=${page_size}${categoryId ? `&categoryId=${categoryId}` : ''}`
      // {
      //   cache: 'force-cache',
      //   next: { revalidate: 24 * 60 * 60 }
      // }
    ),
  getBlog: (id: string) => http.get<BlogResType>(`/blogs/${id}`),
  // getBlog with caching
  getBlogCache: (id: string) =>
    http.get<BlogResType>(
      `/blogs/${id}`
      // { cache: 'force-cache', next: { revalidate: 24 * 60 * 60 } }
    ),
  createBlog: (data: BlogDataResType) => http.post<BlogBodyResType>('/blogs', data),
  updateBlog: (id: string, data: BlogUpdateBodyType) => http.put<OnlyMessageResType>(`/blogs/${id}`, data),
  deleteBlog: (id: string) => http.delete<OnlyMessageResType>(`/blogs/${id}`),
  getBlogComments: ({
    id,
    page_index,
    page_size
  }: {
    id: string
    page_index?: number | undefined
    page_size?: number | undefined
  }) => http.get<BlogCommentsResType>(`/blog-comments/${id}?page_index=${page_index}&page_size=${page_size}`),
  createBlogComment: (data: BlogCommentCreateReqType) => http.post<OnlyMessageResType>('/blog-comments', data),
  getReactComment: (id: string) => http.get<ReactDataResType>(`/blog-reacts/check/${id}`),
  updateReactComment: (data: UpdateReactDataType) => http.post<OnlyMessageResType>('/blog-reacts', data),
  deleteBlogComment: (id: string) => http.delete<OnlyMessageResType>(`/blog-comments/${id}`),
  updateBlogComment: ({ id, data }: { id: string; data: BlogCommentUpdateResType }) =>
    http.put<OnlyMessageResType>(`/blog-comments/${id}`, data),
  getCategoryBlog: ({
    page_index,
    page_size,
    keyword
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    keyword?: string | string[] | undefined
  }) =>
    http.get<CategoryBlogResType>(
      `/category-blogs?${keyword ? `keyword=${keyword}` : ''}${page_index ? `&page_index=${page_index}` : ''}${page_size ? `&page_size=${page_size}` : ''}`
    ),
  // getCategoryBlog with caching
  getCategoryBlogCache: () =>
    http.get<CategoryBlogResType>('/category-blogs', { cache: 'force-cache', next: { revalidate: 24 * 60 * 60 } }),
  getCategoryBlogDetail: (id: string) => http.get<CategoryBlogDetailResType>(`/category-blogs/${id}`),
  createCategoryBlog: (data: { name: string; description: string }) =>
    http.post<CategoryBlogDetailResType>('/category-blogs', data),
  updateCategoryBlog: ({ id, data }: { id: string; data: { name: string; description: string } }) =>
    http.put<CategoryBlogDetailResType>(`/category-blogs/${id}`, data),
  deleteCategoryBlog: (id: string) => http.delete<CategoryBlogDetailResType>(`/category-blogs/${id}`),
  getBlogsListAdmin: ({
    page_index,
    page_size,
    keyword
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    keyword?: string | string[] | undefined
  }) => http.get<GetBlogsListAdminResType>(`/blogs?page_index=${page_index}&page_size=${page_size}&keyword=${keyword}`),
  getBlogDetailAdmin: (id: string) => http.get<GetBlogDetailAdminResType>(`/blogs/${id}`),
  getBlogCommentsAdmin: (id: string) => http.get<GetBlogCommentsAdminResType>(`/blog-comments/${id}`),
  getMyBlogs: ({
    page_index,
    page_size,
    keyword
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    keyword?: string | string[] | undefined
  }) =>
    http.get<GetMyBlogsResType>(
      `/blogs/my-blogs?page_index=${page_index}&page_size=${page_size}${keyword ? `&keyword=${keyword}` : ''}`
    )
}

export default blogApiRequest
