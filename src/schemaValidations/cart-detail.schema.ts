import z from 'zod'

export const CartDetailData = z
  .object({
    id: z.string(),
    cartId: z.string(),
    productId: z.string(),
    courseId: z.string(),
    quantity: z.number(),
    unitPrice: z.number(),
    totalPrice: z.number(),
    product: z.object({
      id: z.string(),
      name: z.string(),
      imageUrl: z.string()
    }),
    course: z.object({
      id: z.string(),
      title: z.string(),
      imageUrl: z.string()
    }),
    createdAt: z.string(),
    updatedAt: z.string()
  })
  .strict()

export const CartDetailRes = z.object({
  data: z.object({
    cartDetails: z.array(CartDetailData),
    totalAmount: z.number()
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

export type CartDetailResType = z.infer<typeof CartDetailRes>
