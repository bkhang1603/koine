import z, { object } from 'zod'

export const CartDetailData = z
  .object({
    id: z.string(),
    cartId: z.string(),
    productId: z.string(),
    courseId: z.string(),
    quantity: z.number(),
    unitPrice: z.number(),
    totalPrice: z.number(),
    product: z
      .object({
        id: z.string(),
        name: z.string(),
        imageUrls: z.array(
          object({
            name: z.string(),
            imageUrl: z.string()
          })
        )
      })
      .nullable(),
    course: z
      .object({
        id: z.string(),
        title: z.string(),
        imageUrl: z.string()
      })
      .nullable(),
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

export const AddCartDetailReq = z
  .object({
    productId: z.string().nullable(),
    courseId: z.string().nullable(),
    quantity: z.number()
  })
  .strict()

export const UpdateCartDetailReq = z
  .object({
    quantity: z.number()
  })
  .strict()

export type CartDetailResType = z.infer<typeof CartDetailRes>

export type AddCartDetailReqType = z.infer<typeof AddCartDetailReq>

export type UpdateCartDetailReqType = z.infer<typeof UpdateCartDetailReq>
