import z from 'zod'

export const CreateGiftBody = z.object({
  courseId: z.string(),
  receiverEmail: z.string(),
  receiverName: z.string(),
  receiverPhone: z.string(),
  quantity: z.number(),
  message: z.string()
})

export const CreateGiftBodyRes = z.object({
  data: z.object({
    id: z.string()
  }),
  message: z.string(),
  statusCode: z.number()
})

export const GetReceivedGifts = z.object({
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
  senderId: z.string(),
  courseId: z.string(),
  receiverEmail: z.string(),
  receiverName: z.string(),
  receiverPhone: z.string(),
  quantity: z.number(),
  message: z.string()
})

export const GetReceivedGiftsRes = z.object({
  data: z.array(GetReceivedGifts),
  message: z.string(),
  statusCode: z.number()
})

export const GetSentGifts = z.object({
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
  senderId: z.string(),
  courseId: z.string(),
  receiverEmail: z.string(),
  receiverName: z.string(),
  receiverPhone: z.string(),
  quantity: z.number(),
  message: z.string()
})

export const GetSentGiftsRes = z.object({
  data: z.array(GetSentGifts),
  message: z.string(),
  statusCode: z.number()
})

export const RefundGiftRes = z.object({
  message: z.string(),
  statusCode: z.number()
})

export type CreateGiftBody = z.infer<typeof CreateGiftBody>
export type CreateGiftBodyRes = z.infer<typeof CreateGiftBodyRes>
export type GetReceivedGifts = z.infer<typeof GetReceivedGifts>
export type GetReceivedGiftsRes = z.infer<typeof GetReceivedGiftsRes>
export type GetSentGifts = z.infer<typeof GetSentGifts>
export type GetSentGiftsRes = z.infer<typeof GetSentGiftsRes>
export type RefundGiftRes = z.infer<typeof RefundGiftRes>
