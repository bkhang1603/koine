import { DeliveryMethodValues } from '@/constants/type'
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
    imageUrl: z.string(),
    imageBanner: z.string(),
    price: z.number(),
    discount: z.number(),
    totalEnrollment: z.number(),
    aveRating: z.number(),
    isBanned: z.boolean(),
    isCustom: z.boolean(),
    level: z.string(),
    censorId: z.string().optional(),
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
            type: z.enum(['DOCUMENT', 'VIDEO', 'BOTH']),
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
    ) // Removed optional
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
          discount: z.number().min(0).max(1),
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
      })
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

export const getBlogCommentsAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    totalComments: z.number(),
    commentsWithReplies: z
      .array(
        z.object({
          isDeleted: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
          id: z.string(),
          userId: z.string(),
          blogId: z.string(),
          replyId: z.string().nullable(),
          content: z.string(),
          createdAtFormatted: z.string(),
          updatedAtFormatted: z.string(),
          user: z.object({
            id: z.string(),
            firstName: z.string(),
            avatarUrl: z.string(),
            username: z.string()
          }),
          replies: z.array(z.any()).optional()
        })
      )
      .optional()
  }),
  pagination: z
    .object({
      pageSize: z.number(),
      totalItem: z.number(),
      currentPage: z.number(),
      maxPageSize: z.number(),
      totalPage: z.number()
    })
    .optional()
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

    // 3. Order Status Data Array
    orderStatusData: z.array(
      z.object({
        status: z.string(),
        count: z.number().int().nonnegative()
      })
    ),
    bestSellingProducts: z.array(
      z.object({
        name: z.string(),
        quantity: z.number().int().nonnegative(),
        revenue: z.number().nonnegative()
      })
    ),
    bestSellingCourses: z.array(
      z.object({
        name: z.string(),
        quantity: z.number().int().nonnegative(),
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
      creatorId: z.string().uuid(),
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
      status: z.string(),
      isBanned: z.boolean(),
      isCustom: z.boolean(),
      isDraft: z.boolean(),
      isVisible: z.boolean(),
      creator: z.object({
        id: z.string().uuid(),
        username: z.string()
      }),
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

// Courses
export type GetCoursesListAdminResType = z.infer<typeof getCoursesListAdminRes>

export type GetCourseDetailAdminResType = z.infer<typeof getCourseDetailAdminRes>

export type GetDraftCoursesResType = z.infer<typeof getDraftCoursesRes>

// Orders
export type GetOrderListAdminResType = z.TypeOf<typeof getOrderListAdminRes>

export type GetOrderDetailAdminResType = z.TypeOf<typeof getOrderDetailAdminRes>

export type GetRefundRequestsResType = z.TypeOf<typeof getRefundRequestsRes>

export type GetRefundRequestByIdResType = z.TypeOf<typeof getRefundRequestByIdRes>
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

// Dashboard
export type GetDashboardStatisticsResType = z.TypeOf<typeof getDashboardStatisticsRes>

// Return Orders
export type GetReturnOrdersResType = z.TypeOf<typeof getReturnOrdersRes>
