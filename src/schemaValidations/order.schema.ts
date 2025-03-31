import { DeliveryMethodValues, OrderStatusValues, OrderTypeValues, PaymentMethodValues } from '@/constants/type'
import z from 'zod'

export const orderBody = z
  .object({
    arrayCartDetailIds: z.array(z.string()),
    deliveryInfoId: z.string(),
    deliMethod: z.enum(DeliveryMethodValues),
    itemId: z.string().nullable(),
    quantity: z.number().nullable(),
    itemType: z.enum(OrderTypeValues).nullable()
  })
  .strict()

export const orderBodyRes = z.object({
  data: z.object({
    orderId: z.string(),
    paymentLink: z.string()
  }),
  message: z.string()
})

export const orderDetail = z
  .object({
    id: z.string(),
    status: z.enum(OrderStatusValues),
    payMethod: z.enum(PaymentMethodValues),
    deliMethod: z.enum(DeliveryMethodValues),
    deliAmount: z.number(),
    note: z.string().nullable(),
    orderCode: z.string(),
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

export const orderBuyNow = z
  .object({
    id: z.string(),
    productId: z.string().nullable(),
    courseId: z.string().nullable(),
    comboId: z.string().nullable(),
    quantity: z.number(),
    unitPrice: z.number(),
    totalPrice: z.number(),
    discount: z.number(),
    isDeleted: z.boolean(),
    payMethod: z.enum(PaymentMethodValues),
    note: z.string().nullable(),
    status: z.enum(OrderStatusValues),
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
        imageUrl: z.string()
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

export const orderBuyNowRes = z.object({
  data: orderBuyNow,
  message: z.string()
})

export const cancelOrderBody = z.object({
  note: z.string()
})

export const cancelOrderBodyRes = z.object({
  message: z.string()
})

export const updatePaymentMethodBody = z.object({
  payMethod: z.enum(PaymentMethodValues)
})

export const updatePaymentMethodBodyRes = z.object({
  message: z.string()
})

export const rePurchaseOrderRes = z.object({
  data: z.object({
    paymentLink: z.string(),
    orderId: z.string()
  }),
  message: z.string()
})

export const refundOrder = z.object({
  orderId: z.string(),
  orderCode: z.string(),
  paymentId: z.string(),
  amount: z.number(),
  refundReason: z.string(),
  requestDate: z.string(),
  customerName: z.string(),
  orderDate: z.string(),
  orderStatus: z.enum(OrderStatusValues)
})

export const refundOrderRes = z.object({
  data: z.array(refundOrder),
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

export const createRefundOrderBody = z.object({
  reason: z.string()
})

export const createRefundOrderBodyRes = z.object({
  message: z.string(),
  statusCode: z.number()
})

export type OrderBody = z.infer<typeof orderBody>

export type OrderBodyResType = z.TypeOf<typeof orderBodyRes>

export type OrderDetail = z.TypeOf<typeof orderDetail>

export type OrderDetailResType = z.TypeOf<typeof orderDetailRes>

export type OrderBuyNow = z.TypeOf<typeof orderBuyNow>

export type OrderBuyNowResType = z.TypeOf<typeof orderBuyNowRes>

export type CancelOrderBody = z.TypeOf<typeof cancelOrderBody>

export type CancelOrderBodyRes = z.TypeOf<typeof cancelOrderBodyRes>

export type UpdatePaymentMethodBody = z.TypeOf<typeof updatePaymentMethodBody>

export type UpdatePaymentMethodBodyRes = z.TypeOf<typeof updatePaymentMethodBodyRes>

export type RePurchaseOrderRes = z.TypeOf<typeof rePurchaseOrderRes>

export type RefundOrderResType = z.TypeOf<typeof refundOrderRes>

export type CreateRefundOrderBody = z.TypeOf<typeof createRefundOrderBody>

export type CreateRefundOrderBodyRes = z.TypeOf<typeof createRefundOrderBodyRes>
