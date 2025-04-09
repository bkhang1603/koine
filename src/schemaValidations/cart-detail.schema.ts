import { z } from 'zod'

export const CartDetailData = z
  .object({
    id: z.string(),
    isDeleted: z.boolean(),
    cartId: z.string(),
    productId: z.string(),
    courseId: z.string(),
    comboId: z.string(),
    quantity: z.number(),
    unitPrice: z.number(),
    totalPrice: z.number(),
    discount: z.number(),
    product: z
      .object({
        name: z.string(),
        description: z.string(),
        imageUrl: z.string(),
        stockQuantity: z.number()
      })
      .nullable(),
    course: z
      .object({
        title: z.string(),
        description: z.string(),
        imageUrl: z.string(),
        isCustom: z.boolean()
      })
      .nullable(),
    combo: z
      .object({
        name: z.string(),
        description: z.string(),
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
    totalAmount: z.number(),
    totalItems: z.number().nullable(),
    userId: z.string().nullable(),
    isDeleted: z.boolean().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    id: z.string()
  }),
  message: z.string(),
  statusCode: z.number()
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
    cartDetailId: z.string(),
    quantity: z.number()
  })
  .strict()

export const UpdateCartDetailListReq = z
  .object({
    cartDetailIds: z.array(z.string())
  })
  .strict()

export type CartDetailResType = z.infer<typeof CartDetailRes>

export type AddCartDetailReqType = z.infer<typeof AddCartDetailReq>

export type UpdateCartDetailReqType = z.infer<typeof UpdateCartDetailReq>

export type UpdateCartDetailListReqType = z.infer<typeof UpdateCartDetailListReq>
