import z from 'zod'

export const BlogData = z
  .object({
    id: z.string(),
    creatorId: z.string(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    imageUrl: z.string(),
    creatorInfo: z.object({
      id: z.string(),
      firstName: z.string(),
      avatarUrl: z.string()
    }),
    totalReact: z.number(),
    totalComment: z.number(),
    slug: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
  })
  .strict()

export const BlogsRes = z.object({
  data: z.array(BlogData),
  message: z.string(),
  statusCode: z.number(),
  pagination: z.object({
    totalItem: z.number(),
    pageSize: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const BlogRes = z.object({
  data: BlogData,
  message: z.string(),
  statusCode: z.number()
})

export const BlogCommentsData = z.object({
  id: z.string(),
  blogId: z.string(),
  userId: z.string(),
  replyId: z.string().nullable(),
  content: z.string(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    firstName: z.string(),
    avatarUrl: z.string()
  }),
  replies: z.array(z.object({})),
  isReact: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const BlogCommentsRes = z.object({
  data: z.object({
    commentsWithReplies: z.array(BlogCommentsData),
    totalComments: z.number()
  }),
  message: z.string(),
  statusCode: z.number(),
  pagination: z.object({
    totalItem: z.number(),
    pageSize: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const BlogCommentRes = z.object({
  data: BlogCommentsData,
  message: z.string(),
  statusCode: z.number()
})

export const BlogCommentCreateReq = z.object({
  identifier: z.string(),
  content: z.string(),
  replyId: z.string().nullable()
})

export const BlogCommentUpdateRes = z.object({
  content: z.string()
})

export const BlogBodyData = z
  .object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    imageUrl: z.string()
  })
  .strict()

export const BlogBody = z
  .object({
    id: z.string(),
    creatorId: z.string(),
    title: z.string(),
    titleNoTone: z.string(),
    slug: z.string(),
    description: z.string(),
    content: z.string(),
    imageUrl: z.string(),
    status: z.string(),
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    categories: z.array(z.string())
  })
  .strict()

export const BlogBodyRes = z.object({
  data: BlogBody,
  message: z.string(),
  statusCode: z.number()
})

export const CategoryBlogData = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdAtFormatted: z.string(),
  updatedAtFormatted: z.string()
})

export const CategoryBlogRes = z.object({
  data: z.array(CategoryBlogData),
  message: z.string(),
  statusCode: z.number(),
  pagination: z.object({
    totalItem: z.number(),
    pageSize: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const CategoryBlogDetailRes = z.object({
  data: CategoryBlogData,
  message: z.string(),
  statusCode: z.number()
})

export type BlogsResType = z.TypeOf<typeof BlogsRes>

export type BlogResType = z.TypeOf<typeof BlogRes>

export type BlogCommentsResType = z.TypeOf<typeof BlogCommentsRes>

export type BlogCommentResType = z.TypeOf<typeof BlogCommentRes>

export type BlogCommentCreateReqType = z.TypeOf<typeof BlogCommentCreateReq>

export type BlogCommentUpdateResType = z.TypeOf<typeof BlogCommentUpdateRes>

export type BlogDataResType = z.TypeOf<typeof BlogBodyData>

export type BlogBodyResType = z.TypeOf<typeof BlogBodyRes>

export type CategoryBlogResType = z.TypeOf<typeof CategoryBlogRes>

export type CategoryBlogDetailResType = z.TypeOf<typeof CategoryBlogDetailRes>
