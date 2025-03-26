import { DeliveryMethodValues, TypeResourceValues } from '@/constants/type'
import z from 'zod'

export const getCoursesListAdminRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.array(
    z.object({
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
      censorId: z.string(),
      censor: z.object({
        id: z.string(),
        username: z.string()
      }),
      isBanned: z.boolean(),
      isCustom: z.boolean(),
      level: z.string(),
      categories: z.array(
        z.object({
          id: z.string(),
          name: z.string()
        })
      ),
      createdAt: z.string(),
      updatedAt: z.string(),
      createdAtFormatted: z.string(),
      updatedAtFormatted: z.string()
    })
  ),
  pagination: z.object({
    totalItem: z.number(),
    pageSize: z.number(),
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
    id: z.string(),
    userId: z.string(),
    orderDate: z.string(),
    totalAmount: z.number(),
    deliMethod: z.enum(DeliveryMethodValues),
    deliAmount: z.number(),
    status: z.string(),
    note: z.string().nullable(),
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    orderCode: z.string(),
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
        isDeleted: z.boolean(),
        createdAt: z.string(),
        updatedAt: z.string(),
        course: z
          .object({
            title: z.string(),
            description: z.string(),
            imageUrl: z.string()
          })
          .nullable(),
        product: z
          .object({
            name: z.string(),
            description: z.string(),
            imageUrl: z.string(),
            stockQuantity: z.number()
          })
          .nullable(),
        combo: z
          .object({
            name: z.string(),
            description: z.string()
          })
          .nullable()
      })
    ),
    createdAtFormatted: z.string(),
    updatedAtFormatted: z.string(),
    deliveryInfo: z.object({
      name: z.string(),
      address: z.string(),
      phone: z.string(),
      status: z.string()
    }),
    payMethod: z.string()
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
  data: z.array(
    z.object({
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
  ),
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

// Courses
export type GetCoursesListAdminResType = z.infer<typeof getCoursesListAdminRes>

export type GetCourseDetailAdminResType = z.infer<typeof getCourseDetailAdminRes>

// Orders
export type GetOrderListAdminResType = z.TypeOf<typeof getOrderListAdminRes>

export type GetOrderDetailAdminResType = z.TypeOf<typeof getOrderDetailAdminRes>

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
