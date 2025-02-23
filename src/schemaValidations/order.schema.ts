import z from 'zod'

export const orderBody = z
  .object({
    arrayCartDetailIds: z.array(z.string()),
    deliveryInfoId: z.string()
  })
  .strict()

export const orderBodyRes = z.object({
  data: z.string(),
  message: z.string()
})

export type OrderBody = z.infer<typeof orderBody>

export type OrderBodyResType = z.TypeOf<typeof orderBodyRes>
