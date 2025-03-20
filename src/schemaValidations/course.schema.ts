import { TypeResourceValues } from '@/constants/type'
import z from 'zod'

export const CourseData = z
  .object({
    id: z.string(),
    creatorId: z.string(),
    title: z.string(),
    titleNoTone: z.string(),
    slug: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    imageBanner: z.string(),
    price: z.number(),
    discount: z.number(),
    durations: z.number(),
    durationsDisplay: z.string(),
    aveRating: z.number(),
    totalEnrollment: z.number(),
    creator: z.object({
      id: z.string(),
      username: z.string()
    }),
    categories: z.array(
      z.object({
        id: z.string(),
        name: z.string()
      })
    ),
    chapters: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        durations: z.number(),
        durationsDisplay: z.string(),
        sequence: z.number(),
        lessons: z.array(
          z.object({
            id: z.string(),
            type: z.enum(TypeResourceValues),
            title: z.string(),
            description: z.string(),
            durations: z.number(),
            content: z.string().nullable(),
            videoUrl: z.string().nullable(),
            sequence: z.number(),
            durationsDisplay: z.string()
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
    identifier: z.string(),
    isReact: z.boolean()
  })
  .strict()

export const UserCourseData = z.object({
  id: z.string()
})

export const UserCoursesRes = z.object({
  data: z.array(UserCourseData),
  message: z.string(),
  statusCode: z.number()
})

export const UserCourseProgressData = z.object({
  status: z.string(),
  title: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  chapters: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      durations: z.number(),
      durationsDisplay: z.string(),
      sequence: z.number(),
      status: z.string(),
      lessons: z.array(
        z.object({
          id: z.string(),
          type: z.enum(TypeResourceValues),
          title: z.string(),
          description: z.string(),
          durations: z.number(),
          durationsDisplay: z.string(),
          sequence: z.number(),
          status: z.string()
        })
      )
    })
  ),
  totalLessonsInCourse: z.number(),
  totalCompletedLessonsInCourse: z.number(),
  courseCompletionPercentage: z.number()
})

export const UserCourseProgressRes = z.object({
  data: UserCourseProgressData,
  message: z.string(),
  statusCode: z.number()
})

export const CategoryCourses = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const CategoryCoursesRes = z.object({
  data: z.array(CategoryCourses),
  message: z.string(),
  statusCode: z.number()
})

export const ChaptersData = z
  .object({
    id: z.string(),
    creatorId: z.string(),
    courseId: z.string(),
    title: z.string(),
    description: z.string(),
    durations: z.number(),
    sequence: z.number(),
    creator: z.object({
      id: z.string(),
      username: z.string()
    })
  })
  .strict()

export const ChaptersRes = z.object({
  data: z.array(ChaptersData),
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

export const LessonsData = z.object({
  id: z.string(),
  chapterId: z.string(),
  type: z.enum(TypeResourceValues),
  title: z.string(),
  description: z.string(),
  content: z.string().nullable(),
  videoUrl: z.string().nullable(),
  durations: z.number(),
  sequence: z.number(),
  creator: z.object({
    id: z.string(),
    username: z.string()
  }),
  status: z.string()
})

export const LessonsRes = z.object({
  data: z.array(LessonsData),
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

export const LessonRes = z.object({
  data: LessonsData,
  message: z.string(),
  statusCode: z.number()
})

export const CourseReviewRes = z.object({
  data: z.array(
    z.object({
      isDeleted: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
      courseId: z.string(),
      userId: z.string(),
      rating: z.number(),
      review: z.string(),
      createdAtFormatted: z.string(),
      updatedAtFormatted: z.string()
    })
  ),
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

export const AllCoursesForCustomData = z.object({
  id: z.string(),
  title: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  totalChapter: z.number(),
  chapters: z.array(
    z.object({
      id: z.string(),
      totalLesson: z.number(),
      lessons: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          type: z.enum(TypeResourceValues)
        })
      )
    })
  )
})

export const AllCoursesForCustomRes = z.object({
  data: z.array(AllCoursesForCustomData),
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

export type CoursesResType = z.infer<typeof CoursesRes>

export type ReactDataResType = z.infer<typeof ReactDataRes>

export type UpdateReactDataType = z.infer<typeof UpdateReactData>

export type UserCoursesResType = z.infer<typeof UserCoursesRes>

export type UserCourseProgressResType = z.infer<typeof UserCourseProgressRes>

export type CategoryCoursesResType = z.infer<typeof CategoryCoursesRes>

export type ChaptersResType = z.infer<typeof ChaptersRes>

export type LessonsResType = z.infer<typeof LessonsRes>

export type LessonResType = z.infer<typeof LessonRes>

export type CourseReviewResType = z.infer<typeof CourseReviewRes>

export type AllCoursesForCustomResType = z.infer<typeof AllCoursesForCustomRes>
