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

export type BlogsResType = z.TypeOf<typeof BlogsRes>

export type BlogResType = z.TypeOf<typeof BlogRes>

export type BlogCommentsResType = z.TypeOf<typeof BlogCommentsRes>

export type BlogCommentResType = z.TypeOf<typeof BlogCommentRes>

export type BlogCommentCreateReqType = z.TypeOf<typeof BlogCommentCreateReq>

export type BlogCommentUpdateResType = z.TypeOf<typeof BlogCommentUpdateRes>
