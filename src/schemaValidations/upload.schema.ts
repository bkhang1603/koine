import z from 'zod'

export const UploadImageRes = z.object({
  data: z.string(),
  message: z.string()
})

export const UploadVideoRes = z.object({
  data: z.string(),
  message: z.string()
})

export type UploadImageResType = z.TypeOf<typeof UploadImageRes>
export type UploadVideoResType = z.TypeOf<typeof UploadVideoRes>
