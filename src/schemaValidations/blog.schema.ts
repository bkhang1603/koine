import z from 'zod'

export const BlogData = z
  .object({
    id: z.string(),
    creatorId: z.string(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    imageUrl: z.string(),
    creator: z.object({
      id: z.string(),
      username: z.string()
    }),
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
    username: z.string()
  }),
  replies: z.array(z.object({})),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const BlogCommentsRes = z.object({
  data: z.array(BlogCommentsData),
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

export type BlogsResType = z.TypeOf<typeof BlogsRes>

export type BlogResType = z.TypeOf<typeof BlogRes>

export type BlogCommentsResType = z.TypeOf<typeof BlogCommentsRes>

export type BlogCommentResType = z.TypeOf<typeof BlogCommentRes>
