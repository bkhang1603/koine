import { TypeResourceValues } from '@/constants/type'
import z from 'zod'

export const QuestionOptionData = z.object({
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
  questionId: z.string(),
  optionData: z.string(),
  isCorrect: z.boolean()
})

export const QuestionData = z.object({
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
  content: z.string(),
  numCorrect: z.number(),
  questionOptions: z.array(QuestionOptionData)
})

export const CourseData = z
  .object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
    creatorId: z.string(),
    title: z.string(),
    titleNoTone: z.string(),
    slug: z.string(),
    description: z.string(),
    durations: z.number(),
    imageUrl: z.string(),
    imageBanner: z.string(),
    price: z.number(),
    discount: z.number(),
    totalEnrollment: z.number(),
    aveRating: z.number(),
    isBanned: z.boolean(),
    isCustom: z.boolean(),
    level: z.string(),
    censorId: z.string(),
    durationsDisplay: z.string(),
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
            chapterId: z.string(),
            type: z.enum(TypeResourceValues),
            title: z.string(),
            description: z.string(),
            durations: z.number(),
            content: z.string().nullable(),
            videoUrl: z.string().nullable(),
            sequence: z.number(),
            durationsDisplay: z.string()
          })
        ),
        questions: z
          .array(
            z.object({
              isDeleted: z.boolean(),
              createdAt: z.string(),
              updatedAt: z.string(),
              id: z.string(),
              content: z.string(),
              numCorrect: z.number(),
              questionOptions: z.array(
                z.object({
                  isDeleted: z.boolean(),
                  createdAt: z.string(),
                  updatedAt: z.string(),
                  id: z.string(),
                  questionId: z.string(),
                  optionData: z.string(),
                  isCorrect: z.boolean()
                })
              )
            })
          )
          .optional() // Thêm optional() nếu questions có thể rỗng.
      })
    )
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
      ),
      questions: z
        .array(
          z.object({
            isDeleted: z.boolean(),
            createdAt: z.string(),
            updatedAt: z.string(),
            id: z.string(),
            content: z.string(),
            numCorrect: z.number(),
            questionOptions: z.array(
              z.object({
                isDeleted: z.boolean(),
                createdAt: z.string(),
                updatedAt: z.string(),
                id: z.string(),
                questionId: z.string(),
                optionData: z.string(),
                isCorrect: z.boolean()
              })
            )
          })
        )
        .optional()
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
  updatedAt: z.string(),
  createdAtFormatted: z.string(),
  updatedAtFormatted: z.string()
})

export const CategoryCoursesRes = z.object({
  data: z.array(CategoryCourses),
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
  data: z.object({
    ratingInfos: z.array(
      z.object({
        review: z.string(),
        rating: z.number(),
        createdAtFormatted: z.string(),
        updatedAtFormatted: z.string(),
        user: z.object({
          id: z.string(),
          username: z.string()
        })
      })
    ),
    stars: z.object({
      totalRating: z.number(),
      ratings: z.object({
        1: z.number(),
        2: z.number(),
        3: z.number(),
        4: z.number(),
        5: z.number()
      }),
      averageRating: z.number()
    })
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

export const previewLessons = z.object({
  course: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    durations: z.number(),
    durationsDisplay: z.string(),
    imageUrl: z.string(),
    imageBanner: z.string(),
    totalChapters: z.number(),
    totalLessons: z.number(),
    price: z.number(),
    rating: z.number()
  }),
  previewChapter: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    sequence: z.number()
  }),
  previewLessons: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      durations: z.number(),
      durationsDisplay: z.string(),
      sequence: z.number(),
      type: z.enum(TypeResourceValues),
      content: z.string(),
      videoUrl: z.string(),
      status: z.string()
    })
  )
})

export const previewLessonsRes = z.object({
  data: previewLessons,
  message: z.string(),
  statusCode: z.number()
})

export const createCourseBody = z.object({
  categoryIds: z.array(z.string()),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  imageBanner: z.string(),
  price: z.number(),
  discount: z.number(),
  level: z.string()
})

export const createCourseBodyRes = z.object({
  data: createCourseBody,
  message: z.string(),
  statusCode: z.number()
})

export const createCategoryCourseBody = z.object({
  name: z.string(),
  description: z.string()
})

export const createCategoryCourseRes = z.object({
  data: z.object({
    name: z.string(),
    description: z.string(),
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string()
  }),
  message: z.string(),
  statusCode: z.number(),
  info: z.string()
})

export const getCategoryCourseDetailRes = z.object({
  data: z.object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
    name: z.string(),
    description: z.string()
  }),
  message: z.string(),
  statusCode: z.number(),
  info: z.string()
})

export const updateCategoryCourseBody = z.object({
  name: z.string(),
  description: z.string()
})

export const updateCategoryCourseRes = z.object({
  message: z.string(),
  statusCode: z.number(),
  info: z.string()
})

export const deleteCategoryCourseRes = z.object({
  message: z.string(),
  statusCode: z.number(),
  info: z.string()
})

export const createCourseCustomBody = z.object({
  chapterIds: z.array(z.string())
})

export const createCourseCustomRes = z.object({
  data: z.string(),
  message: z.string(),
  statusCode: z.number()
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

export type PreviewLessonsResType = z.infer<typeof previewLessonsRes>

export type CreateCourseBodyType = z.infer<typeof createCourseBody>

export type CreateCourseBodyResType = z.infer<typeof createCourseBodyRes>

export type CreateCategoryCourseBodyType = z.infer<typeof createCategoryCourseBody>

export type CreateCategoryCourseResType = z.infer<typeof createCategoryCourseRes>

export type GetCategoryCourseDetailResType = z.infer<typeof getCategoryCourseDetailRes>

export type UpdateCategoryCourseBodyType = z.infer<typeof updateCategoryCourseBody>

export type UpdateCategoryCourseResType = z.infer<typeof updateCategoryCourseRes>

export type DeleteCategoryCourseResType = z.infer<typeof deleteCategoryCourseRes>

export type CreateCourseCustomBodyType = z.infer<typeof createCourseCustomBody>

export type CreateCourseCustomResType = z.infer<typeof createCourseCustomRes>
