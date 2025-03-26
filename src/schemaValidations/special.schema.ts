import { z } from 'zod'

export const OnlyMessageRes = z.object({
  message: z.string()
})

export type OnlyMessageResType = z.infer<typeof OnlyMessageRes>
