import { RoleValues, GenderValues } from '@/constants/type'
import z from 'zod'

export const accountRes = z.object({
  data: z.object({
    id: z.string(),
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

export const courseByAccountRes = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      course: z.object({
        id: z.number(),
        title: z.string(),
        imageUrl: z.string(),
        description: z.string()
      })
    })
  ),
  message: z.string()
})

export const accountProfile = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  role: z.enum(RoleValues),
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dob: z.string(),
  address: z.string(),
  gender: z.enum(GenderValues),
  avatarUrl: z.string(),
  parentId: z.string().nullable()
})

export const accountProfileRes = z.object({
  data: accountProfile,
  message: z.string()
})

export const accountProfileBody = z
  .object({
    firstName: z.string().min(1, 'Họ và tên đệm không được để trống').max(50, 'Họ và tên đệm không được quá 50 ký tự'),
    lastName: z.string().min(1, 'Tên không được để trống').max(50, 'Tên không được quá 50 ký tự'),
    // dob: z.union([
    //   z
    //     .string()
    //     .min(1, 'Năm sinh không được để trống')
    //     .refine(
    //       (val) => {
    //         const date = new Date(val)
    //         return !isNaN(date.getTime())
    //       },
    //       {
    //         message: 'Năm sinh không hợp lệ'
    //       }
    //     ),
    //   z.date().refine((val) => !isNaN(val.getTime()), {
    //     message: 'Năm sinh không hợp lệ'
    //   })
    // ]),
    dob: z
      .string()
      .min(1, 'Năm sinh không được để trống')
      .refine(
        (val) => {
          const date = new Date(val)
          return !isNaN(date.getTime())
        },
        {
          message: 'Năm sinh không hợp lệ'
        }
      ),
    avatarUrl: z.string(),
    address: z.string(),
    gender: z.enum(GenderValues)
  })
  .strict()
  .partial()

export const accountAddress = z
  .object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    tag: z.string()
  })
  .strict()

export const accountAddressRes = z.object({
  data: z.array(accountAddress),
  message: z.string()
})

export type AccountResType = z.TypeOf<typeof accountRes>

export type CourseByAccountResType = z.TypeOf<typeof courseByAccountRes>

export type AccountProfileResType = z.TypeOf<typeof accountProfileRes>

export type AccountProfileBodyType = z.TypeOf<typeof accountProfileBody>

export type AccountAddressResType = z.TypeOf<typeof accountAddressRes>
