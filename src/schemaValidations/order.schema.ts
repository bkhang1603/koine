import z from 'zod'

export const orderData = z
  .object({
    id: z.string(),
    userId: z.string(),
    cartDetailIds: z.array(z.string()),
    totalPrice: z.number(),
    status: z.string(),
    paymentMethod: z.string(),
    shippingMethod: z.string(),
    shippingAddress: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
  })
  .strict()

export const orderRes = z.object({
  data: orderData,
  message: z.string(),
  statusCode: z.number()
})
