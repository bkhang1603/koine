import { RoleValues, GenderValues } from '@/constants/type'
import z from 'zod'

export const accountRes = z.object({
  data: z.object({
    id: z.number(),
    email: z.string(),
    username: z.string(),
    role: z.enum(RoleValues),
    phone: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    dob: z.string(),
    gender: z.enum(GenderValues),
    avatarUrl: z.string()
  }),
  message: z.string()
})

export type AccountResType = z.TypeOf<typeof accountRes>
