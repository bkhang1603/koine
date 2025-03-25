import { RoleValues, GenderValues, OrderTypeValues } from '@/constants/type'
import z from 'zod'

export const accountRes = z.object({
  data: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
    role: z.enum(RoleValues),
    phone: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    dob: z.string(),
    gender: z.enum(GenderValues),
    avatarUrl: z.string()
  }),
  message: z.string()
})

export const courseByAccount = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  level: z.string(),
  durationDisplay: z.string(),
  categories: z.array(
    z.object({
      id: z.string(),
      name: z.string()
    })
  ),
  totalLesson: z.number(),
  totalLessonFinished: z.number(),
  completionRate: z.number(),
  author: z.string(),
  imageUrl: z.string(),
  createdAtFormatted: z.string(),
  updatedAtFormatted: z.string()
})

export const courseByAccountRes = z.object({
  data: z.array(courseByAccount),
  message: z.string()
})

export const accountProfile = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  role: z.enum(RoleValues),
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dob: z.string(),
  address: z.string(),
  gender: z.enum(GenderValues),
  avatarUrl: z.string(),
  parentId: z.string().nullable()
})

export const accountProfileRes = z.object({
  data: accountProfile,
  message: z.string()
})

export const accountProfileBody = z
  .object({
    firstName: z.string().min(1, 'Họ và tên đệm không được để trống').max(50, 'Họ và tên đệm không được quá 50 ký tự'),
    lastName: z.string().min(1, 'Tên không được để trống').max(50, 'Tên không được quá 50 ký tự'),
    // dob: z.union([
    //   z
    //     .string()
    //     .min(1, 'Năm sinh không được để trống')
    //     .refine(
    //       (val) => {
    //         const date = new Date(val)
    //         return !isNaN(date.getTime())
    //       },
    //       {
    //         message: 'Năm sinh không hợp lệ'
    //       }
    //     ),
    //   z.date().refine((val) => !isNaN(val.getTime()), {
    //     message: 'Năm sinh không hợp lệ'
    //   })
    // ]),
    dob: z
      .string()
      .min(1, 'Năm sinh không được để trống')
      .refine(
        (value) => {
          if (!value) return true

          // Định dạng mm/dd/yyyy
          const [month, day, year] = value.split('/').map(Number)

          // Kiểm tra tính hợp lệ của ngày tháng năm
          if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > new Date().getFullYear()) {
            return false
          }

          const date = new Date(year, month - 1, day)

          // Kiểm tra xem ngày có tồn tại (ví dụ: không phải 30/02)
          return (
            date.getMonth() === month - 1 &&
            date.getDate() === day &&
            date.getFullYear() === year &&
            date <= new Date() &&
            date >= new Date('1900-01-01')
          )
        },
        {
          message: 'Ngày sinh không hợp lệ'
        }
      ),
    avatarUrl: z.string(),
    address: z.string(),
    gender: z.enum(GenderValues)
  })
  .strict()
  .partial()

export const accountAddress = z
  .object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    tag: z.string(),
    isDefault: z.boolean()
  })
  .strict()

export const accountAddressRes = z.object({
  data: z.array(accountAddress),
  message: z.string()
})

export const accountOneAddressRes = z.object({
  data: accountAddress,
  message: z.string()
})

export const accountAddressBody = z
  .object({
    name: z.string().min(1, 'Vui lòng nhập tên người nhận'),
    phone: z.string().min(10, 'Số điện thoại không hợp lệ').max(11, 'Số điện thoại không hợp lệ'),
    address: z.string().min(1, 'Vui lòng nhập địa chỉ'),
    tag: z.string().min(1, 'Vui lòng nhập tag'),
    isDefault: z.boolean().default(false)
  })
  .strict()

export const accountOrder = z
  .object({
    id: z.string(),
    userId: z.string(),
    totalAmount: z.number(),
    paymentMethod: z.string(),
    orderDate: z.string(),
    status: z.string(),
    isDeleted: z.boolean(),
    deletedNote: z.string().nullable(),
    orderCode: z.string(),
    createdAtFormatted: z.string(),
    updatedAtFormatted: z.string(),
    orderDetails: z.array(
      z.object({
        id: z.string(),
        orderId: z.string(),
        productId: z.string(),
        courseId: z.string(),
        comboId: z.string(),
        quantity: z.number(),
        unitPrice: z.number(),
        discount: z.number(),
        totalPrice: z.number(),
        isDeleted: z.boolean(),
        createdAt: z.string(),
        updatedAt: z.string(),
        itemTitle: z.string(),
        itemImageUrl: z.string()
      })
    ),
    deliveryInfo: z.object({
      name: z.string(),
      phone: z.string(),
      address: z.string(),
      status: z.string()
    }),
    orderStatusHistory: z.array(
      z.object({
        status: z.string(),
        timestamp: z.string()
      })
    ),
    createdAt: z.string(),
    updatedAt: z.string()
  })
  .strict()

export const accountOrderRes = z.object({
  data: z.object({
    orders: z.array(accountOrder)
  }),
  message: z.string(),
  pagination: z.object({
    pageSize: z.number(),
    totalItem: z.number(),
    currentPage: z.number(),
    totalPage: z.number(),
    maxPageSize: z.number()
  })
})

export const myChildAccount = z.object({
  childId: z.string(),
  childName: z.string(),
  childImageUrl: z.string(),
  totalCourse: z.number(),
  totalCoursesCompleted: z.number()
})

export const myChildAccountRes = z.object({
  data: z.array(myChildAccount),
  message: z.string()
})

export const myChildAccountById = z
  .object({
    userId: z.string(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    avatarUrl: z.string(),
    gender: z.string(),
    dob: z.string(),
    isVisible: z.boolean(),
    courses: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        durationDisplay: z.string(),
        categories: z.array(
          z.object({
            id: z.string(),
            name: z.string()
          })
        ),
        totalLesson: z.number(),
        totalLessonFinished: z.number(),
        completionRate: z.number(),
        author: z.string(),
        imageUrl: z.string(),
        createdAtFormatted: z.string(),
        updatedAtFormatted: z.string(),
        level: z.string()
      })
    )
  })
  .strict()

export const myChildAccountByIdRes = z.object({
  data: myChildAccountById,
  message: z.string()
})

export const suggestCoursesFree = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  level: z.string(),
  durations: z.string(),
  durationsDisplay: z.string(),
  imageUrl: z.string(),
  categories: z.array(
    z.object({
      id: z.string(),
      name: z.string()
    })
  ),
  totalChapter: z.number(),
  totalLesson: z.number()
})

export const suggestCoursesFreeRes = z.object({
  data: z.array(suggestCoursesFree),
  message: z.string(),
  pagination: z.object({
    pageSize: z.number(),
    totalItem: z.number(),
    currentPage: z.number(),
    totalPage: z.number(),
    maxPageSize: z.number()
  })
})

export const registerChildAccountBody = z.object({
  username: z
    .string()
    .min(6, 'Tên đăng nhập không được dưới 6 ký tự')
    .max(100, 'Tên đăng nhập không được quá 100 ký tự')
    .refine((val) => /^[a-zA-Z0-9]+$/.test(val), {
      message: 'Tên đăng nhập không được chứa ký tự đặc biệt'
    }),
  password: z
    .string()
    .min(6, {
      message: 'Mật khẩu phải có ít nhất 6 ký tự.'
    })
    .max(100, {
      message: 'Mật khẩu không được quá 100 ký tự.'
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z0-9!@#$%^&*()_+}{":;'?/>.<,]).{8,}$/,
      {
        message: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.'
      }
    ),
  firstName: z.string().min(1, 'Họ và tên đệm không được để trống').max(100, 'Họ và tên đệm không được quá 100 ký tự'),
  lastName: z.string().min(1, 'Tên không được để trống').max(100, 'Tên không được quá 100 ký tự'),
  gender: z.enum(GenderValues),
  dob: z
    .string()
    .min(1, 'Ngày sinh không được để trống')
    .refine(
      (value) => {
        // Kiểm tra định dạng MM/DD/YYYY
        if (!value.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
          return false
        }

        const [month, day, year] = value.split('/').map(Number)

        // Kiểm tra tính hợp lệ cơ bản
        if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > new Date().getFullYear()) {
          return false
        }

        // Kiểm tra ngày hợp lệ trong tháng
        const date = new Date(year, month - 1, day)
        return date.getMonth() === month - 1 && date.getDate() === day && date.getFullYear() === year
      },
      {
        message: 'Ngày sinh không hợp lệ. Vui lòng nhập theo định dạng MM/DD/YYYY (VD: 01/15/2015)'
      }
    )
})

export const registerChildAccountRes = z.object({
  message: z.string()
})

export const accountStore = z.object({
  totalItem: z.number(),
  details: z.array(
    z.object({
      course: z.object({
        id: z.string(),
        title: z.string(),
        level: z.string(),
        durationDisplay: z.string(),
        price: z.number(),
        imageUrl: z.string(),
        createAtFormatted: z.string(),
        categories: z.array(
          z.object({
            id: z.string(),
            name: z.string()
          })
        )
      }),
      quantityAtPurchase: z.number(),
      unusedQuantity: z.number(),
      assignedTo: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          imageUrl: z.string()
        })
      )
    })
  )
})

export const accountStoreRes = z.object({
  data: accountStore,
  message: z.string()
})

export const accountNotifications = z.object({
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.string(),
  isRead: z.boolean()
})

export const accountNotificationsRes = z.object({
  data: z.object({
    response: z.array(accountNotifications),
    pagination: z.object({
      pageSize: z.number(),
      totalItem: z.number(),
      currentPage: z.number(),
      totalPage: z.number(),
      maxPageSize: z.number()
    })
  }),
  message: z.string()
})

export const listChildAccount = z.object({
  id: z.string(),
  role: z.enum(RoleValues),
  parentId: z.string(),
  createAt: z.string(),
  createAtFormatted: z.string(),
  userDetail: z.object({
    firstName: z.string(),
    lastName: z.string(),
    dob: z.string(),
    address: z.string(),
    gender: z.string(),
    avatarUrl: z.string()
  })
})

export const listChildAccountRes = z.object({
  data: z.array(listChildAccount),
  message: z.string()
})

export const listChildAccountNeedReview = z.object({
  itemId: z.string(),
  itemTitle: z.string(),
  itemType: z.enum(OrderTypeValues),
  imageUrl: z.string().nullable(),
  description: z.string(),
  orderDetailId: z.string(),
  orderId: z.string(),
  orderCode: z.string(),
  orderDate: z.string(),
  unitPrice: z.number(),
  quantity: z.number(),
  discount: z.number(),
  totalPrice: z.number()
})

export const listChildAccountNeedReviewRes = z.object({
  data: z.array(listChildAccountNeedReview),
  message: z.string()
})

export const updateVisibleCourseForChildBody = z.object({
  childId: z.string(),
  courseId: z.string(),
  isVisible: z.boolean()
})

export const courseDetailForChild = z.object({
  courseId: z.string(),
  courseTitle: z.string(),
  courseImageUrl: z.string(),
  isAccessibleByChild: z.boolean(),
  courseCompletionRate: z.number(),
  totalLesson: z.number(),
  totalLessonFinished: z.number(),
  totalLearningTime: z.string(),
  enrollmentDate: z.string(),
  chapters: z.array(
    z.object({
      chapterId: z.string(),
      chapterTitle: z.string(),
      chapterDescription: z.string(),
      chapterSequence: z.number(),
      chapterStatus: z.string(),
      chapterCompletionRate: z.number(),
      lessons: z.array(
        z.object({
          lessonId: z.string(),
          lessonTitle: z.string(),
          lessonType: z.string(),
          lessonDurationDisplay: z.string(),
          lessonSequence: z.number(),
          lessonStatus: z.string()
        })
      )
    })
  )
})

export const courseDetailForChildRes = z.object({
  data: courseDetailForChild,
  message: z.string(),
  statusCode: z.number()
})

export const createOrderNeedReviewBody = z.object({
  itemId: z.string(),
  itemType: z.enum(OrderTypeValues),
  rating: z.number(),
  review: z.string()
})

export const profileChild = z.object({
  id: z.string(),
  avatarUrl: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dob: z.string(),
  gender: z.string(),
  level: z.string(),
  totalCourses: z.number(),
  totalLearningTimes: z.number(),
  totalPoints: z.number()
})

export const profileChildRes = z.object({
  data: profileChild,
  message: z.string(),
  statusCode: z.number()
})

export type AccountResType = z.TypeOf<typeof accountRes>

export type CourseByAccountResType = z.TypeOf<typeof courseByAccountRes>

export type AccountProfileResType = z.TypeOf<typeof accountProfileRes>

export type AccountProfileBodyType = z.TypeOf<typeof accountProfileBody>

export type AccountAddressResType = z.TypeOf<typeof accountAddressRes>

export type AccountOneAddressResType = z.TypeOf<typeof accountOneAddressRes>

export type AccountAddressBodyType = z.TypeOf<typeof accountAddressBody>

export type AccountOrderResType = z.TypeOf<typeof accountOrderRes>

export type MyChildAccountResType = z.TypeOf<typeof myChildAccountRes>

export type MyChildAccountByIdResType = z.TypeOf<typeof myChildAccountByIdRes>

export type SuggestCoursesFreeResType = z.TypeOf<typeof suggestCoursesFreeRes>

export type RegisterChildAccountBodyType = z.TypeOf<typeof registerChildAccountBody>

export type RegisterChildAccountResType = z.TypeOf<typeof registerChildAccountRes>

export type AccountStoreResType = z.TypeOf<typeof accountStoreRes>

export type AccountNotificationsResType = z.TypeOf<typeof accountNotificationsRes>

export type ListChildAccountResType = z.TypeOf<typeof listChildAccountRes>

export type ListChildAccountNeedReviewResType = z.TypeOf<typeof listChildAccountNeedReviewRes>

export type UpdateVisibleCourseForChildBodyType = z.TypeOf<typeof updateVisibleCourseForChildBody>

export type CourseDetailForChildResType = z.TypeOf<typeof courseDetailForChildRes>

export type CreateOrderNeedReviewBodyType = z.TypeOf<typeof createOrderNeedReviewBody>

export type ProfileChildResType = z.TypeOf<typeof profileChildRes>
