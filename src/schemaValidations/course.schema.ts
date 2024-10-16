import { TypeResourceValues } from '@/constants/type'
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
    imageBanner: z.string(),
    totalOfStudent: z.number(),
    aveRating: z.number(),
    durations: z.number(),
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
    lessons: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        sequence: z.number(),
        courseResources: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            content: z.string().nullable(),
            type: z.enum(TypeResourceValues),
            videoUrl: z.string().nullable(),
            sequence: z.number()
          })
        )
      })
    ),
    createdAt: z.string(),
    updatedAt: z.string()
  })
  .strict()

export const CoursesRes = z.object({
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

export const CourseRes = z.object({
  data: CourseData,
  message: z.string(),
  statusCode: z.number()
})

export const ReactData = z
  .object({
    totalReacts: z.number(),
    isReact: z.boolean()
  })
  .strict()

export const ReactDataRes = z.object({
  data: ReactData,
  message: z.string(),
  statusCode: z.number()
})

export const UpdateReactData = z
  .object({
    blogId: z.string(),
    isReact: z.boolean()
  })
  .strict()

export const UserCourseData = z.object({
  id: z.string(),
  courseId: z.string(),
  course: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string()
  })
})

export const UserCoursesRes = z.object({
  data: z.array(UserCourseData),
  message: z.string(),
  statusCode: z.number()
})

export const UserCourseProgressData = z.object({
  id: z.string(),
  title: z.string(),
  courseResources: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      type: z.enum(TypeResourceValues),
      status: z.string()
    })
  )
})

export const UserCourseProgressRes = z.object({
  data: z.array(UserCourseProgressData),
  message: z.string(),
  statusCode: z.number()
})

export const CourseResourceData = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string().nullable(),
  type: z.enum(TypeResourceValues),
  videoUrl: z.string().nullable(),
  sequence: z.number()
})

export const CourseResourceRes = z.object({
  data: CourseResourceData,
  message: z.string(),
  statusCode: z.number()
})

export type CourseResType = z.infer<typeof CourseRes>

export type CoursesResType = z.infer<typeof CoursesRes>

export type ReactDataResType = z.infer<typeof ReactDataRes>

export type UpdateReactDataType = z.infer<typeof UpdateReactData>

export type UserCoursesResType = z.infer<typeof UserCoursesRes>

export type UserCourseProgressResType = z.infer<typeof UserCourseProgressRes>

export type CourseResourceResType = z.infer<typeof CourseResourceRes>
