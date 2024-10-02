import z from 'zod'

export const CourseData = z
  .object({
    id: z.string(),
    creatorId: z.string(),
    editorId: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    imageUrl: z.string(),
    totalOfStudent: z.number(),
    aveRating: z.number(),
    creator: z.object({
      id: z.string(),
      name: z.string()
    }),
    editor: z.object({
      id: z.string(),
      name: z.string()
    }),
    categories: z.array(
      z.object({
        id: z.string(),
        name: z.string()
      })
    ),
    createdAt: z.string(),
    updatedAt: z.string()
  })
  .strict()

export const CourseRes = z.object({
  data: z.array(CourseData),
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

export type CourseResType = z.infer<typeof CourseRes>
