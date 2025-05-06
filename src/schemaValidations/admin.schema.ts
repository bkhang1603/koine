import { DeliveryMethodValues, RoleValues } from '@/constants/type'
import z from 'zod'

export const getCoursesListAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
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
      level: z.string(),
      censorId: z.string(),
      totalEnrollment: z.number(),
      aveRating: z.number(),
      status: z.string(),
      isBanned: z.boolean(),
      isCustom: z.boolean(),
      isDraft: z.boolean(),
      isVisible: z.boolean(),
      creator: z.object({
        id: z.string(),
        username: z.string()
      }),
      censor: z.object({
        id: z.string(),
        username: z.string()
      }),
      durationsDisplay: z.string(),
      categories: z.array(
        z.object({
          id: z.string(),
          name: z.string()
        })
      ),
      createdAtFormatted: z.string(),
      updatedAtFormatted: z.string()
    })
  ),
  pagination: z.object({
    pageSize: z.number(),
    totalItem: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

const questionOptionSchema = z.object({
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
  questionId: z.string(),
  optionData: z.string(),
  isCorrect: z.boolean()
})

const questionSchema = z.object({
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
  content: z.string(),
  numCorrect: z.number().int(),
  questionOptions: z.array(questionOptionSchema)
})

const lessonSchema = z.object({
  id: z.string(),
  chapterId: z.string(),
  type: z.enum(['DOCUMENT', 'VIDEO', 'BOTH']),
  title: z.string(),
  description: z.string(),
  durations: z.number(),
  content: z.string().nullable(),
  videoUrl: z.string().nullable(),
  sequence: z.number(),
  durationsDisplay: z.string()
})

const chapterSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  durations: z.number(),
  durationsDisplay: z.string(),
  sequence: z.number(),
  lessons: z.array(lessonSchema),
  questions: z.array(questionSchema)
})

const categorySchema = z.object({
  id: z.string(),
  name: z.string()
})

export const getCourseDetailAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
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
    imageUrl: z.string().url().or(z.string()),
    imageBanner: z.string().url().or(z.string()),
    price: z.number(),
    discount: z.number(),
    level: z.string(),
    censorId: z.string().nullable().optional(),
    totalEnrollment: z.number(),
    aveRating: z.number(),
    status: z.string(),
    isBanned: z.boolean(),
    isCustom: z.boolean(),
    isDraft: z.boolean(),
    isVisible: z.boolean(),
    ageStage: z.string(),
    durationsDisplay: z.string(),
    categories: z.array(categorySchema),
    chapters: z.array(chapterSchema),
    createdAtFormatted: z.string(),
    updatedAtFormatted: z.string()
  })
})

export const getOrderListAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    statistics: z.object({
      totalOrders: z.number(),
      totalCompletedAmount: z.number(),
      processingOrdersCount: z.number(),
      deliveryOrdersCount: z.number()
    }),
    orders: z.array(
      z.object({
        id: z.string(),
        userId: z.string(),
        orderDate: z.string(),
        orderCode: z.string(),
        paymentMethod: z.string(),
        totalAmount: z.number(),
        deliMethod: z.enum(DeliveryMethodValues),
        deliAmount: z.number(),
        status: z.string(),
        note: z.string().nullable(),
        isDeleted: z.boolean(),
        createdAt: z.string(),
        updatedAt: z.string(),
        createdAtFormatted: z.string(),
        updatedAtFormatted: z.string(),
        customerName: z.string().optional(),
        customerPhone: z.string().optional(),
        orderStatusHistory: z.array(
          z.object({
            status: z.string(),
            timestamp: z.string()
          })
        ),
        orderDetails: z.array(
          z.object({
            id: z.string(),
            orderId: z.string(),
            productId: z.string().nullable(),
            courseId: z.string().nullable(),
            comboId: z.string().nullable(),
            quantity: z.number(),
            unitPrice: z.number(),
            discount: z.number(),
            totalPrice: z.number(),
            itemTitle: z.string(),
            itemImageUrl: z.string(),
            isDeleted: z.boolean().optional(),
            createdAt: z.string().optional(),
            updatedAt: z.string().optional(),
            course: z
              .object({
                title: z.string(),
                description: z.string(),
                imageUrl: z.string()
              })
              .nullable()
              .optional(),
            product: z
              .object({
                name: z.string(),
                description: z.string(),
                imageUrl: z.string(),
                stockQuantity: z.number()
              })
              .nullable()
              .optional(),
            combo: z
              .object({
                name: z.string(),
                description: z.string()
              })
              .nullable()
              .optional()
          })
        ),
        deliveryInfo: z.object({
          name: z.string(),
          address: z.string(),
          phone: z.string(),
          status: z.string()
        })
      })
    )
  }),
  pagination: z.object({
    pageSize: z.number(),
    totalItem: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const getOrderDetailAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    orderInfo: z.object({
      id: z.string().uuid(),
      orderCode: z.string(),
      orderDate: z.string().datetime({ offset: true }),
      orderDateFormatted: z.string(),
      status: z.string(),
      totalAmount: z.number().nonnegative(),
      deliAmount: z.number().nonnegative(),
      grandTotal: z.number().nonnegative(),
      deliMethod: z.string(),
      note: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      createdAtFormatted: z.string(),
      updatedAtFormatted: z.string(),
      refundRequestDate: z.string().datetime({ offset: true }).nullable(),
      refundReason: z.string(),
      refundNote: z.string(),
      refundProcessedDate: z.string().datetime({ offset: true }).nullable()
    }),
    customerInfo: z.object({
      id: z.string().uuid(),
      email: z.string().email(),
      fullName: z.string(),
      phone: z.string()
    }),
    deliveryInfo: z.object({
      name: z.string(),
      address: z.string(),
      phone: z.string(),
      status: z.string()
    }),
    paymentInfo: z.object({
      payMethod: z.string(),
      payStatus: z.string(),
      payDate: z.string().datetime({ offset: true }),
      payDateFormatted: z.string(),
      payAmount: z.number().nonnegative()
    }),
    orderHistory: z.array(
      z.object({
        status: z.string(),
        timestamp: z.string().datetime({ offset: true }),
        timestampFormatted: z.string()
      })
    ),
    orderItems: z.array(
      z.object({
        orderDetailId: z.string().uuid(),
        quantity: z.number().int().positive(),
        unitPrice: z.number().nonnegative(),
        discount: z.number().min(0).max(1),
        totalPrice: z.number().nonnegative(),
        type: z.string(),
        itemId: z.string().uuid(),
        name: z.string(),
        description: z.string(),
        imageUrl: z.string().url()
      })
    )
  })
})

export const getRefundRequestsRes = z.object({
  status: z.number(),
  payload: z.object({
    statusCode: z.number(),
    info: z.string(),
    message: z.string(),
    data: z.array(
      z.object({
        id: z.string().uuid(),
        userId: z.string().uuid(),
        orderCode: z.string(),
        orderDate: z.string().datetime({ offset: true }),
        totalAmount: z.number().nonnegative(),
        deliAmount: z.number().nonnegative(),
        deliMethod: z.string(),
        status: z.string(),
        note: z.string(),
        expiredAt: z.string().datetime().nullable(),
        orderDateFormatted: z.string(),
        refundRequestDate: z.string().datetime().nullable(),
        refundReason: z.string(),
        refundNote: z.string(),
        payment: z.object({
          isDeleted: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
          id: z.string().uuid(),
          orderId: z.string().uuid(),
          payMethod: z.string(),
          payDate: z.string().datetime({ offset: true }),
          payAmount: z.number().nonnegative(),
          payStatus: z.string()
        }),
        delivery: z
          .object({
            isDeleted: z.boolean(),
            createdAt: z.string(),
            updatedAt: z.string(),
            id: z.string().uuid(),
            orderId: z.string().uuid(),
            name: z.string(),
            phone: z.string(),
            address: z.string(),
            status: z.string()
          })
          .nullable(),
        orderCodeFormatted: z.string(),
        createdAtFormatted: z.string(),
        refundRequestDateFormatted: z.string().nullable(),
        refundProcessedDateFormatted: z.string().nullable(),
        orderDetails: z.array(
          z.object({
            id: z.string().uuid(),
            orderId: z.string().uuid(),
            productId: z.string().uuid().nullable(),
            courseId: z.string().uuid().nullable(),
            comboId: z.string().uuid().nullable(),
            quantity: z.number().int().positive(),
            unitPrice: z.number().nonnegative(),
            discount: z.number().nonnegative(),
            totalPrice: z.number().nonnegative(),
            itemName: z.string(),
            itemDescription: z.string(),
            itemImageUrl: z.string().url(),
            itemType: z.string()
          })
        ),
        orderStatusHistory: z.array(
          z.object({
            status: z.string(),
            timestamp: z.string().datetime({ offset: true }),
            timestampFormatted: z.string()
          })
        ),
        customerInfo: z.object({
          id: z.string().uuid(),
          name: z.string(),
          phone: z.string().nullable(),
          email: z.string().email()
        }),
        returnRequestImages: z.array(z.string())
      })
    ),
    pagination: z.object({
      pageSize: z.number().int().positive(),
      totalItem: z.number().int().nonnegative(),
      currentPage: z.number().int().positive(),
      maxPageSize: z.number().int().positive(),
      totalPage: z.number().int().nonnegative()
    })
  })
})

export const getRefundRequestByIdRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    orderDate: z.string().datetime({ offset: true }),
    totalAmount: z.number().nonnegative(),
    deliMethod: z.string(),
    deliAmount: z.number().nonnegative(),
    status: z.string(),
    note: z.string().nullable(),
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    orderCode: z.string(),
    orderDetails: z.array(
      z.object({
        isDeleted: z.boolean(),
        createdAt: z.string(),
        updatedAt: z.string(),
        id: z.string().uuid(),
        orderId: z.string().uuid(),
        productId: z.string().uuid().nullable(),
        courseId: z.string().uuid().nullable(),
        comboId: z.string().uuid().nullable(),
        quantity: z.number().int().positive(),
        unitPrice: z.number().nonnegative(),
        discount: z.number().min(0).max(1),
        totalPrice: z.number().nonnegative(),
        course: z
          .object({
            title: z.string(),
            description: z.string(),
            imageUrl: z.string().url()
          })
          .nullable(),
        product: z
          .object({
            name: z.string(),
            description: z.string(),
            imageUrl: z.string().url()
          })
          .nullable(),
        combo: z
          .object({
            name: z.string(),
            description: z.string(),
            imageUrl: z.string().url()
          })
          .nullable()
      })
    ),
    createdAtFormatted: z.string(),
    updatedAtFormatted: z.string(),
    orderStatusHistory: z.array(
      z.object({
        status: z.string(),
        timestamp: z.string().datetime({ offset: true }),
        timestampFormatted: z.string()
      })
    ),
    deliveryInfo: z
      .object({
        isDeleted: z.boolean().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
        id: z.string().uuid().optional(),
        orderId: z.string().uuid().optional(),
        name: z.string(),
        phone: z.string(),
        address: z.string(),
        status: z.string()
      })
      .nullable(),
    payment: z.object({
      payMethod: z.string(),
      payDate: z.string().datetime({ offset: true }).nullable(),
      payAmount: z.number().nonnegative().nullable(),
      payStatus: z.string()
    })
  })
})

export const updateRefundRequestBody = z.object({
  action: z.enum(['APPROVE', 'REJECT']),
  note: z.string().optional()
})

export const updateRefundRequestRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const updateExchangeRequestBody = z.object({
  action: z.enum(['APPROVE', 'REJECT']),
  note: z.string().optional()
})

export const updateExchangeRequestRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const getBlogsListAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      isDeleted: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
      id: z.string(),
      creatorId: z.string(),
      title: z.string(),
      titleNoTone: z.string(),
      slug: z.string(),
      description: z.string(),
      content: z.string(),
      imageUrl: z.string(),
      status: z.string(),
      createdAtFormatted: z.string(),
      updatedAtFormatted: z.string(),
      creatorInfo: z.object({
        id: z.string(),
        firstName: z.string(),
        avatarUrl: z.string()
      }),
      totalReact: z.number(),
      totalComment: z.number(),
      categories: z.array(
        z.object({
          id: z.string(),
          name: z.string()
        })
      )
    })
  ),
  pagination: z.object({
    pageSize: z.number(),
    totalItem: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const getBlogDetailAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
    creatorId: z.string(),
    title: z.string(),
    titleNoTone: z.string(),
    slug: z.string(),
    description: z.string(),
    content: z.string(),
    imageUrl: z.string(),
    status: z.string(),
    createdAtFormatted: z.string(),
    updatedAtFormatted: z.string(),
    creatorInfo: z.object({
      id: z.string(),
      firstName: z.string(),
      avatarUrl: z.string()
    }),
    isReact: z.boolean(),
    totalReact: z.number(),
    totalComment: z.number(),
    categories: z.array(
      z.object({
        id: z.string(),
        name: z.string()
      })
    )
  })
})

const CommentSchema: z.ZodTypeAny = z.lazy(() =>
  z.object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string().uuid(),
    userId: z.string().uuid(),
    blogId: z.string().uuid(),
    replyId: z.string().uuid().nullable(),
    content: z.string(),
    createdAtFormatted: z.string(),
    updatedAtFormatted: z.string(),
    user: z.object({
      id: z.string().uuid(),
      firstName: z.string(),
      avatarUrl: z.string().url(),
      username: z.string()
    }),
    replies: z.array(CommentSchema)
  })
)

export const getBlogCommentsAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    totalComments: z.number().int().nonnegative(),
    commentsWithReplies: z.array(CommentSchema)
  }),
  pagination: z.object({
    pageSize: z.number(),
    totalItem: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const getProductListAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    statistics: z.object({
      totalProducts: z.number().int().nonnegative(),
      totalProductCategories: z.number().int().nonnegative(),
      totalOutOfStockProducts: z.number().int().nonnegative(),
      totalProductReviews: z.number().int().nonnegative()
    }),
    products: z.array(
      z.object({
        isDeleted: z.boolean(),
        createdAt: z.string(),
        updatedAt: z.string(),
        id: z.string().uuid(),
        creatorId: z.string().uuid(),
        name: z.string(),
        nameNoTone: z.string(),
        slug: z.string(),
        description: z.string(),
        detail: z.string(),
        guide: z.string(),
        price: z.number().nonnegative(),
        discount: z.number().min(0).max(1),
        stockQuantity: z.number().int().nonnegative(),
        categories: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string()
          })
        ),
        images: z.array(
          z.object({
            name: z.string(),
            imageUrl: z.string().url()
          })
        ),
        totalRating: z.number().int().nonnegative(),
        averageRating: z.number().nonnegative(),
        createdAtFormatted: z.string(),
        updatedAtFormatted: z.string()
      })
    )
  }),
  pagination: z.object({
    pageSize: z.number(),
    totalItem: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const getProductDetailAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
    creatorId: z.string(),
    name: z.string(),
    nameNoTone: z.string(),
    slug: z.string(),
    description: z.string(),
    detail: z.string(),
    guide: z.string(),
    price: z.number(),
    discount: z.number(),
    stockQuantity: z.number(),
    categories: z.array(
      z.object({
        id: z.string(),
        name: z.string()
      })
    ),
    images: z.array(
      z.object({
        name: z.string(),
        imageUrl: z.string()
      })
    ),
    totalRating: z.number(),
    averageRating: z.number(),
    createdAtFormatted: z.string(),
    updatedAtFormatted: z.string()
  })
})

export const getUserListAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      email: z.string().nullable(),
      username: z.string(),
      role: z.string(),
      accountType: z.enum(['LOCAL']),
      isActive: z.boolean(),
      userDetail: z.object({
        firstName: z.string(),
        lastName: z.string(),
        phone: z.string().nullable(),
        dob: z.string().nullable(),
        address: z.string().nullable(),
        gender: z.enum(['MALE', 'FEMALE', 'OTHER']).nullable(),
        avatarUrl: z.string().nullable()
      }),
      createAtFormatted: z.string(),
      updateAtFormatted: z.string()
    })
  ),
  pagination: z.object({
    pageSize: z.number(),
    totalItem: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const getUserDetailAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
    email: z.string(),
    username: z.string(),
    role: z.string(),
    parentId: z.string().nullable(),
    accountType: z.enum(['LOCAL']),
    isActive: z.boolean(),
    userDetail: z.object({
      firstName: z.string(),
      lastName: z.string(),
      phone: z.string(),
      dob: z.string(),
      address: z.string(),
      gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
      avatarUrl: z.string()
    })
  })
})

export const createUserBody = z.object({
  email: z.string().email('Email không hợp lệ'),
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
  role: z.enum(RoleValues)
})

export const createUserRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const banUserRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const unBanUserRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const getDashboardStatisticsRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    statistics: z.object({
      totalRevenue: z.number().nonnegative(),
      averageRevenuePerDay: z.number().nonnegative(),
      totalOrders: z.number().int().nonnegative(),
      averageOrdersPerDay: z.number().nonnegative(),
      completedOrders: z.number().int().nonnegative(),
      completionRate: z.number().nonnegative(),
      uniqueCustomers: z.number().int().nonnegative(),
      averageOrderValue: z.number().nonnegative()
    }),
    revenueData: z.array(
      z.object({
        type: z.string(),
        time: z.string(),
        amount: z.number().nonnegative(),
        ordersCount: z.number().int().nonnegative()
      })
    ),
    orderStatusData: z.array(
      z.object({
        status: z.string(),
        count: z.string()
      })
    ),
    bestSellingProducts: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        quantity: z.string(),
        revenue: z.number().nonnegative()
      })
    ),
    bestSellingCourses: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        quantity: z.string(),
        revenue: z.number().nonnegative()
      })
    ),
    locationDistribution: z.array(
      z.object({
        name: z.string(),
        count: z.number().int().nonnegative(),
        percentage: z.number().nonnegative()
      })
    ),
    ageDistribution: z.array(
      z.object({
        name: z.string(),
        count: z.number().int().nonnegative(),
        percentage: z.number().nonnegative()
      })
    )
  })
})

export const getDraftCoursesRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      isDeleted: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
      id: z.string().uuid(),
      creatorId: z.string().uuid().nullable(),
      title: z.string(),
      titleNoTone: z.string(),
      slug: z.string(),
      description: z.string(),
      durations: z.number().int().nonnegative(),
      imageUrl: z.string().url(),
      imageBanner: z.string().url(),
      price: z.number().nonnegative(),
      discount: z.number().min(0).max(1),
      level: z.string(),
      censorId: z.string().uuid().nullable(),
      totalEnrollment: z.number().int().nonnegative(),
      aveRating: z.number().nonnegative(),
      status: z.enum(['ACTIVE', 'PENDINGREVIEW', 'PENDINGPRICING', 'REJECTED']),
      isBanned: z.boolean(),
      isCustom: z.boolean(),
      isDraft: z.boolean(),
      isVisible: z.boolean(),
      ageStage: z.string(),
      creator: z
        .object({
          id: z.string().uuid(),
          username: z.string()
        })
        .nullable(),
      censor: z
        .object({
          id: z.string().uuid(),
          username: z.string()
        })
        .nullable(),
      durationsDisplay: z.string(),
      categories: z.array(
        z.object({
          id: z.string().uuid(),
          name: z.string()
        })
      ),
      createdAtFormatted: z.string(),
      updatedAtFormatted: z.string()
    })
  ),
  pagination: z.object({
    pageSize: z.number().int().positive(),
    totalItem: z.number().int().nonnegative(),
    currentPage: z.number().int().positive(),
    maxPageSize: z.number().int().positive(),
    totalPage: z.number().int().nonnegative()
  })
})

export const getReturnOrders = z.object({
  id: z.string(),
  userId: z.string(),
  orderDate: z.string(),
  orderCode: z.number(),
  orderCodeFormatted: z.string(),
  orderDateFormatted: z.string(),
  totalAmount: z.number(),
  deliMethod: z.string(),
  deliAmount: z.number(),
  status: z.string(),
  note: z.string(),
  expiredAt: z.string(),
  createdAtFormatted: z.string(),
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
      itemName: z.string(),
      itemDescription: z.string(),
      itemImageUrl: z.string(),
      itemType: z.string()
    })
  ),
  payment: z.object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
    orderId: z.string(),
    payMethod: z.string(),
    payDate: z.string(),
    payAmount: z.number(),
    payStatus: z.string()
  }),
  delivery: z.object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
    orderId: z.string(),
    name: z.string(),
    phone: z.string(),
    address: z.string()
  }),
  orderStatusHistory: z.array(
    z.object({
      status: z.string(),
      timestamp: z.string(),
      timestampFormatted: z.string()
    })
  ),
  exchangeRequestDate: z.string(),
  exchangeRequestDateFormatted: z.string(),
  exchangeReason: z.string(),
  exchangeNote: z.string(),
  exchangeProcessedDate: z.string(),
  exchangeProcessedDateFormatted: z.string(),
  returnRequestImages: z.array(z.string()),
  customerInfo: z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    email: z.string()
  })
})

export const getReturnOrdersRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.array(getReturnOrders)
})

export const getExchangeRequestsRes = z.object({
  status: z.number(),
  payload: z.object({
    statusCode: z.number(),
    info: z.string(),
    message: z.string(),
    data: z.array(
      z.object({
        id: z.string().uuid(),
        userId: z.string().uuid(),
        orderCode: z.string(),
        orderDate: z.string().datetime({ offset: true }),
        totalAmount: z.number().nonnegative(),
        deliAmount: z.number().nonnegative(),
        deliMethod: z.string(),
        status: z.string(),
        note: z.string(),
        expiredAt: z.string().datetime().nullable(),
        orderDateFormatted: z.string(),
        exchangeRequestDate: z.string().datetime().nullable(),
        exchangeReason: z.string(),
        exchangeNote: z.string(),
        payment: z.object({
          isDeleted: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
          id: z.string().uuid(),
          orderId: z.string().uuid(),
          payMethod: z.string(),
          payDate: z.string().datetime({ offset: true }),
          payAmount: z.number().nonnegative(),
          payStatus: z.string()
        }),
        delivery: z
          .object({
            isDeleted: z.boolean(),
            createdAt: z.string(),
            updatedAt: z.string(),
            id: z.string().uuid(),
            orderId: z.string().uuid(),
            name: z.string(),
            phone: z.string(),
            address: z.string(),
            status: z.string()
          })
          .nullable(),
        orderCodeFormatted: z.string(),
        createdAtFormatted: z.string(),
        exchangeRequestDateFormatted: z.string().nullable(),
        exchangeProcessedDateFormatted: z.string().nullable(),
        orderDetails: z.array(
          z.object({
            id: z.string().uuid(),
            orderId: z.string().uuid(),
            productId: z.string().uuid().nullable(),
            courseId: z.string().uuid().nullable(),
            comboId: z.string().uuid().nullable(),
            quantity: z.number().int().positive(),
            unitPrice: z.number().nonnegative(),
            discount: z.number().nonnegative(),
            totalPrice: z.number().nonnegative(),
            itemName: z.string(),
            itemDescription: z.string(),
            itemImageUrl: z.string().url(),
            itemType: z.string()
          })
        ),
        orderStatusHistory: z.array(
          z.object({
            status: z.string(),
            timestamp: z.string().datetime({ offset: true }),
            timestampFormatted: z.string()
          })
        ),
        customerInfo: z.object({
          id: z.string().uuid(),
          name: z.string(),
          phone: z.string().nullable(),
          email: z.string().email()
        }),
        returnRequestImages: z.array(z.string()),
        // Optional fields that might be in the response for compatibility
        refundRequestDate: z.string().datetime().nullable().optional(),
        refundRequestDateFormatted: z.string().nullable().optional(),
        refundReason: z.string().optional(),
        refundNote: z.string().optional()
      })
    ),
    pagination: z.object({
      pageSize: z.number().int().positive(),
      totalItem: z.number().int().nonnegative(),
      currentPage: z.number().int().positive(),
      maxPageSize: z.number().int().positive(),
      totalPage: z.number().int().nonnegative()
    })
  })
})

// Dashboard Supporter
export const getDashboardSupporterRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    statistic: z.object({
      totalTickets: z.number().int().nonnegative(),
      totalRefunds: z.number().int().nonnegative(),
      totalOrders: z.number().int().nonnegative(),
      totalCourseReview: z.number().int().nonnegative(),
      totalProductReview: z.number().int().nonnegative(),
      totalBlogComment: z.number().int().nonnegative(),
      totalCommentAndReview: z.number().int().nonnegative()
    }),
    commentAndReviewTrendData: z.array(
      z.object({
        date: z.string(),
        courseReview: z.number().int().nonnegative(),
        productReview: z.number().int().nonnegative(),
        blogComment: z.number().int().nonnegative()
      })
    ),
    refundOrderStatusData: z.array(
      z.object({
        status: z.string(),
        count: z.number().int().nonnegative().or(z.string().transform(Number))
      })
    ),
    exchangeOrderStatusData: z.array(
      z.object({
        status: z.string(),
        count: z.number().int().nonnegative().or(z.string().transform(Number))
      })
    )
  })
})

export const createCourseCommentBody = z.object({
  courseId: z.string(),
  replyId: z.string(),
  content: z.string()
})

export const createCourseCommentRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const getQuestionListRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      isDeleted: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
      id: z.string().uuid(),
      content: z.string(),
      numCorrect: z.number(),
      questionOptions: z.array(
        z.object({
          isDeleted: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
          id: z.string().uuid(),
          questionId: z.string().uuid(),
          optionData: z.string(),
          isCorrect: z.boolean()
        })
      )
    })
  ),
  pagination: z.object({
    pageSize: z.number(),
    totalItem: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const createQuestionOptionSchema = z.object({
  optionData: z
    .string()
    .min(1, 'Nội dung lựa chọn không được để trống')
    .max(500, 'Nội dung lựa chọn không được vượt quá 500 ký tự'),
  isCorrect: z.boolean()
})

export const createQuestionBody = z.object({
  content: z
    .string()
    .min(10, 'Nội dung câu hỏi phải có ít nhất 10 ký tự')
    .max(1000, 'Nội dung câu hỏi không được vượt quá 1000 ký tự'),
  options: z
    .array(createQuestionOptionSchema)
    .min(2, 'Phải có ít nhất 2 lựa chọn')
    .max(10, 'Không được vượt quá 10 lựa chọn')
    .refine((options) => options.some((option) => option.isCorrect), {
      message: 'Phải có ít nhất một đáp án đúng'
    })
    .refine((options) => options.every((option) => option.optionData.trim() !== ''), {
      message: 'Tất cả các lựa chọn phải có nội dung'
    })
})

export const updateQuestionBody = z.object({
  content: z
    .string()
    .min(10, 'Nội dung câu hỏi phải có ít nhất 10 ký tự')
    .max(1000, 'Nội dung câu hỏi không được vượt quá 1000 ký tự'),
  options: z
    .array(createQuestionOptionSchema)
    .min(2, 'Phải có ít nhất 2 lựa chọn')
    .max(10, 'Không được vượt quá 10 lựa chọn')
    .refine((options) => options.some((option) => option.isCorrect), {
      message: 'Phải có ít nhất một đáp án đúng'
    })
    .refine((options) => options.every((option) => option.optionData.trim() !== ''), {
      message: 'Tất cả các lựa chọn phải có nội dung'
    })
})

export const createQuestionRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const updateQuestionRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const deleteQuestionRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const getChapterQuestionListRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      isDeleted: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
      id: z.string().uuid(),
      content: z.string(),
      numCorrect: z.number().int().nonnegative(),
      questionOptions: z.array(
        z.object({
          isDeleted: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
          id: z.string().uuid(),
          questionId: z.string().uuid(),
          optionData: z.string(),
          isCorrect: z.boolean()
        })
      )
    })
  ),
  pagination: z.object({
    pageSize: z.number(),
    totalItem: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const getRequestSupportListRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.string().uuid(),
      type: z.enum(['GUEST', 'COURSE']),
      content: z.string(),
      objectId: z.string().nullable(),
      isResolve: z.boolean(),
      resolveContent: z.string().nullable(),
      createdAt: z.string(),
      updatedAt: z.string(),
      createdAtFormatted: z.string(),
      updatedAtFormatted: z.string(),
      isGuestRequest: z.boolean(),
      guestInfo: z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string()
      })
    })
  ),
  pagination: z.object({
    pageSize: z.number().int(),
    totalItem: z.number().int(),
    currentPage: z.number().int(),
    maxPageSize: z.number().int(),
    totalPage: z.number().int()
  })
})

export const updateRequestSupportBody = z.object({
  isResolve: z.boolean(),
  resolveContent: z.string().nullable()
})

export const updateRequestSupportRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const getDashboardExpertRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    courseStatistic: z.object({
      totalCourses: z.number().int().nonnegative(),
      activeCourses: z.number().int().nonnegative(),
      coursesEnrollments: z.number().int().nonnegative(),
      courseAverageRating: z.number().nonnegative()
    }),
    eventStatistic: z.object({
      totalEvents: z.number().int().nonnegative(),
      activeEvents: z.number().int().nonnegative(),
      eventParticipants: z.number().int().nonnegative(),
      eventAverageRating: z.number().nonnegative()
    }),
    courseTrendData: z.array(
      z.object({
        date: z.string(),
        created: z.number().int().nonnegative(),
        enrolled: z.number().int().nonnegative()
      })
    ),
    eventTrendData: z.array(
      z.object({
        date: z.string(),
        events: z.number().int().nonnegative(),
        participants: z.number().int().nonnegative()
      })
    ),
    courseStatusData: z.array(
      z.object({
        status: z.string(),
        count: z.number().int().nonnegative().or(z.string().transform(Number))
      })
    ),
    eventStatusData: z.array(
      z.object({
        status: z.string(),
        count: z.number().int().nonnegative().or(z.string().transform(Number))
      })
    )
  })
})

export const getDashboardContentCreatorRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    courseStatistic: z.object({
      totalCourses: z.number().int().nonnegative(),
      activeCourses: z.number().int().nonnegative(),
      totalCourseEnrollments: z.number().int().nonnegative(),
      averageCourseRating: z.number().nonnegative()
    }),
    courseTrendData: z.array(
      z.object({
        date: z.string(),
        enrollments: z.number().int().nonnegative().or(z.string().transform(Number))
      })
    ),
    courseStatusData: z.array(
      z.object({
        status: z.string(),
        count: z.number().int().nonnegative().or(z.string().transform(Number))
      })
    ),
    popularCourseData: z.array(
      z.object({
        id: z.string().uuid(),
        title: z.string(),
        enrollments: z.number().int().nonnegative().or(z.string().transform(Number))
      })
    ),
    ageGroupData: z.array(
      z.object({
        group: z.string(),
        count: z.number().int().nonnegative(),
        percentage: z.number().nonnegative()
      })
    )
  })
})

export const getDashboardCourseDetailRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    courseEnrollments: z.array(
      z.object({
        date: z.string(),
        count: z.number()
      })
    )
  })
})

export const getReportListRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      isDeleted: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
      id: z.string().uuid(),
      reporterId: z.string().uuid(),
      type: z.string(),
      reportedEntityId: z.string().uuid(),
      reasonId: z.string().uuid(),
      reasonDetail: z.string(),
      status: z.string(),
      solutionNote: z.string().nullable(),
      reason: z.object({
        id: z.string().uuid(),
        name: z.string()
      }),
      createdAtFormatted: z.string(),
      updatedAtFormatted: z.string()
    })
  ),
  pagination: z.object({
    pageSize: z.number(),
    totalItem: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const getReportDetailRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string().uuid(),
    reporterId: z.string().uuid(),
    type: z.string(),
    reportedEntityId: z.string().uuid(),
    reasonId: z.string().uuid(),
    reasonDetail: z.string(),
    status: z.string(),
    solutionNote: z.string().nullable(),
    reason: z.object({
      id: z.string().uuid(),
      name: z.string()
    })
  })
})

export const updateReportResolveBody = z.object({
  status: z.enum(['APPROVED', 'REJECT']),
  solutionNote: z.string().optional()
})

export const updateReportResolveRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

// Add new schemas for multiple questions to chapter
export const addMultiQuestionsToChapterBody = z.object({
  chapterId: z.string(),
  questionIds: z.array(z.string())
})

export const addMultiQuestionsToChapterRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

// Remove question from chapter
export const removeQuestionFromChapterBody = z.object({
  chapterId: z.string(),
  questionId: z.string()
})

export const removeQuestionFromChapterRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const getReasonBody = z.object({
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
  name: z.string(),
  description: z.string()
})

export const getReasonRes = z.object({
  data: z.array(getReasonBody),
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

// Combo
export const getComboListRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
      createdAt: z.string(),
      updatedAt: z.string(),
      id: z.string().uuid(),
      creatorId: z.string().uuid(),
      name: z.string(),
      nameNoTone: z.string(),
      slug: z.string(),
      description: z.string(),
      price: z.number(),
      discount: z.number(),
      allPrice: z.number(),
      imageUrl: z.string().url().nullable(),
      creator: z.object({
        id: z.string().uuid(),
        username: z.string()
      }),
      courseInfos: z.array(
        z.object({
          id: z.string().uuid(),
          title: z.string(),
          titleNoTone: z.string(),
          slug: z.string(),
          description: z.string(),
          durations: z.number().int().nonnegative(),
          imageUrl: z.string().url().nullable(),
          imageBanner: z.string().url().nullable(),
          price: z.number(),
          discount: z.number(),
          totalEnrollment: z.number().int().nonnegative(),
          aveRating: z.number().nonnegative(),
          categories: z.array(
            z.object({
              id: z.string().uuid(),
              name: z.string()
            })
          )
        })
      ),
      categories: z.array(
        z.object({
          id: z.string().uuid(),
          name: z.string()
        })
      )
    })
  ),
  pagination: z.object({
    pageSize: z.number(),
    totalItem: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const getComboDetailRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string().uuid(),
    creatorId: z.string().uuid(),
    name: z.string(),
    nameNoTone: z.string(),
    slug: z.string(),
    description: z.string(),
    price: z.number(),
    discount: z.number(),
    allPrice: z.number(),
    imageUrl: z.string().url().nullable(),
    courseInfos: z.array(
      z.object({
        id: z.string().uuid(),
        title: z.string(),
        titleNoTone: z.string(),
        slug: z.string(),
        description: z.string(),
        durations: z.number().int().nonnegative(),
        imageUrl: z.string().url().nullable(),
        imageBanner: z.string().url().nullable(),
        price: z.number(),
        discount: z.number(),
        totalEnrollment: z.number().int().nonnegative(),
        aveRating: z.number().nonnegative(),
        categories: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string()
          })
        )
      })
    ),
    categories: z.array(
      z.object({
        id: z.string().uuid(),
        name: z.string()
      })
    )
  })
})

export const createComboBodySchema = z.object({
  name: z.string().min(1, 'Tên combo là bắt buộc'),
  description: z.string().min(1, 'Mô tả combo là bắt buộc'),
  price: z.number().min(0, 'Giá combo phải lớn hơn hoặc bằng 0'),
  imageUrl: z.string().min(1, 'Hình ảnh combo là bắt buộc')
})

export const updateComboBodySchema = z.object({
  name: z.string().min(1, 'Tên combo là bắt buộc'),
  description: z.string().min(1, 'Mô tả combo là bắt buộc'),
  price: z.number().min(0, 'Giá combo phải lớn hơn hoặc bằng 0')
})

export const createComboBodyRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const updateComboBodyRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

export const deleteComboRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string()
})

// Courses
export type GetCoursesListAdminResType = z.infer<typeof getCoursesListAdminRes>

export type GetCourseDetailAdminResType = z.infer<typeof getCourseDetailAdminRes>

export type GetDraftCoursesResType = z.infer<typeof getDraftCoursesRes>

export type CreateCourseCommentBodyType = z.infer<typeof createCourseCommentBody>

export type CreateCourseCommentResType = z.infer<typeof createCourseCommentRes>

export type GetQuestionListResType = z.infer<typeof getQuestionListRes>

export type CreateQuestionBodyType = z.infer<typeof createQuestionBody>

export type UpdateQuestionBodyType = z.infer<typeof updateQuestionBody>

export type CreateQuestionResType = z.infer<typeof createQuestionRes>

export type UpdateQuestionResType = z.infer<typeof updateQuestionRes>

export type DeleteQuestionResType = z.infer<typeof deleteQuestionRes>

export type GetChapterQuestionListResType = z.infer<typeof getChapterQuestionListRes>

// Orders
export type GetOrderListAdminResType = z.TypeOf<typeof getOrderListAdminRes>

export type GetOrderDetailAdminResType = z.TypeOf<typeof getOrderDetailAdminRes>

export type GetRefundRequestsResType = z.TypeOf<typeof getRefundRequestsRes>

export type GetRefundRequestByIdResType = z.TypeOf<typeof getRefundRequestByIdRes>

export type UpdateRefundRequestBodyType = z.TypeOf<typeof updateRefundRequestBody>

export type UpdateRefundRequestResType = z.TypeOf<typeof updateRefundRequestRes>

export type UpdateExchangeRequestBodyType = z.TypeOf<typeof updateExchangeRequestBody>

export type UpdateExchangeRequestResType = z.TypeOf<typeof updateExchangeRequestRes>

// Blogs
export type GetBlogsListAdminResType = z.TypeOf<typeof getBlogsListAdminRes>

export type GetBlogDetailAdminResType = z.TypeOf<typeof getBlogDetailAdminRes>

export type GetBlogCommentsAdminResType = z.TypeOf<typeof getBlogCommentsAdminRes>

// Products
export type GetProductListAdminResType = z.TypeOf<typeof getProductListAdminRes>

export type GetProductDetailAdminResType = z.TypeOf<typeof getProductDetailAdminRes>

// Users
export type GetUserListAdminResType = z.TypeOf<typeof getUserListAdminRes>

export type GetUserDetailAdminResType = z.TypeOf<typeof getUserDetailAdminRes>

export type CreateUserBodyType = z.TypeOf<typeof createUserBody>

export type CreateUserResType = z.TypeOf<typeof createUserRes>

export type BanUserResType = z.TypeOf<typeof banUserRes>

export type UnBanUserResType = z.TypeOf<typeof unBanUserRes>

// Dashboard
export type GetDashboardStatisticsResType = z.TypeOf<typeof getDashboardStatisticsRes>

export type GetDashboardExpertResType = z.TypeOf<typeof getDashboardExpertRes>

export type GetDashboardContentCreatorResType = z.TypeOf<typeof getDashboardContentCreatorRes>

export type GetDashboardCourseDetailResType = z.TypeOf<typeof getDashboardCourseDetailRes>

// Return Orders
export type GetReturnOrdersResType = z.TypeOf<typeof getReturnOrdersRes>

// Exchange Requests
export type GetExchangeRequestsResType = z.TypeOf<typeof getExchangeRequestsRes>

// Request Support
export type GetRequestSupportListResType = z.TypeOf<typeof getRequestSupportListRes>

export type UpdateRequestSupportBodyType = z.TypeOf<typeof updateRequestSupportBody>

export type UpdateRequestSupportResType = z.TypeOf<typeof updateRequestSupportRes>

// Dashboard Supporter
export type GetDashboardSupporterResType = z.TypeOf<typeof getDashboardSupporterRes>

// Report
export type GetReportListResType = z.TypeOf<typeof getReportListRes>

export type GetReportDetailResType = z.TypeOf<typeof getReportDetailRes>

export type UpdateReportResolveBodyType = z.TypeOf<typeof updateReportResolveBody>

export type UpdateReportResolveResType = z.TypeOf<typeof updateReportResolveRes>

// New type exports
export type AddMultiQuestionsToChapterBodyType = z.TypeOf<typeof addMultiQuestionsToChapterBody>

export type AddMultiQuestionsToChapterResType = z.TypeOf<typeof addMultiQuestionsToChapterRes>

export type RemoveQuestionFromChapterBodyType = z.TypeOf<typeof removeQuestionFromChapterBody>

export type RemoveQuestionFromChapterResType = z.TypeOf<typeof removeQuestionFromChapterRes>

export type GetReasonResType = z.TypeOf<typeof getReasonRes>

// Combo
export type GetComboListResType = z.TypeOf<typeof getComboListRes>

export type GetComboDetailResType = z.TypeOf<typeof getComboDetailRes>

export type CreateComboBodyType = z.TypeOf<typeof createComboBodySchema>

export type UpdateComboBodyType = z.TypeOf<typeof updateComboBodySchema>

export type CreateComboBodyResType = z.TypeOf<typeof createComboBodyRes>

export type UpdateComboBodyResType = z.TypeOf<typeof updateComboBodyRes>

export type DeleteComboResType = z.TypeOf<typeof deleteComboRes>
