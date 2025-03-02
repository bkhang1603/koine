import { DeliveryMethodValues } from '@/constants/type'
import z from 'zod'

export const orderBody = z
  .object({
    arrayCartDetailIds: z.array(z.string()),
    deliveryInfoId: z.string(),
    deliMethod: z.enum(DeliveryMethodValues)
  })
  .strict()

export const orderBodyRes = z.object({
  data: z.string(),
  message: z.string()
})

export const orderDetail = z
  .object({
    id: z.string(),
    userId: z.string(),
    orderDate: z.string(),
    totalAmount: z.number(),
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
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
        course: z.object({
          title: z.string(),
          description: z.string(),
          imageUrl: z.string()
        }),
        product: z.object({
          name: z.string(),
          description: z.string(),
          imageUrl: z.string(),
          stockQuantity: z.number()
        }),
        combo: z.object({
          name: z.string(),
          description: z.string()
        })
      })
    )
  })
  .strict()

export const orderDetailRes = z.object({
  data: orderDetail,
  message: z.string()
})

export type OrderBody = z.infer<typeof orderBody>

export type OrderBodyResType = z.TypeOf<typeof orderBodyRes>

export type OrderDetail = z.TypeOf<typeof orderDetail>

export type OrderDetailResType = z.TypeOf<typeof orderDetailRes>
