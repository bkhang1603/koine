import { RoleValues, GenderValues } from '@/constants/type'
import z from 'zod'

export const LoginBody = z
  .object({
    loginKey: z
      .string()
      .min(6, {
        message: 'Tên đăng nhập phải có ít nhất 6 ký tự.'
      })
      .max(100, {
        message: 'Tên đăng nhập không được quá 100 ký tự.'
      }),
    password: z
      .string()
      .min(8, {
        message: 'Mật khẩu phải có ít nhất 8 ký tự.'
      })
      .max(100, {
        message: 'Mật khẩu không được quá 100 ký tự.'
      })
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      role: z.enum(RoleValues),
      image: z.string()
    })
  }),
  message: z.string()
})

export type LoginResType = z.TypeOf<typeof LoginRes>

export const RefreshTokenBody = z
  .object({
    refreshToken: z.string()
  })
  .strict()

export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>

export const RefreshTokenRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string()
  }),
  message: z.string()
})

export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>

export const LogoutBody = z
  .object({
    refreshToken: z.string()
  })
  .strict()

export type LogoutBodyType = z.TypeOf<typeof LogoutBody>

export const RegisterBody = z
  .object({
    // Tên đăng nhập không được chứa khoảng trắng, dấu tiếng việt.
    username: z
      .string()
      .min(6, {
        message: 'Tên đăng nhập phải có ít nhất 6 ký tự.'
      })
      .max(100, {
        message: 'Tên đăng nhập không được quá 100 ký tự.'
      })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: 'Tên đăng nhập không được chứa khoảng trắng, dấu tiếng việt.'
      }),
    email: z.string().email({
      message: 'Email không hợp lệ.'
    }),
    // Tôi muốn password bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
    password: z
      .string()
      .min(8, {
        message: 'Mật khẩu phải có ít nhất 8 ký tự.'
      })
      .max(100, {
        message: 'Mật khẩu không được quá 100 ký tự.'
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z0-9!@#$%^&*()_+}{":;'?/>.<,]).{8,}$/,
        {
          message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt.'
        }
      ),
    confirmPassword: z
      .string()
      .min(8, {
        message: 'Mật khẩu phải có ít nhất 8 ký tự.'
      })
      .max(100, {
        message: 'Mật khẩu không được quá 100 ký tự.'
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z0-9!@#$%^&*()_+}{":;'?/>.<,]).{8,}$/,
        {
          message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt.'
        }
      ),
    gender: z.enum(GenderValues, { message: 'Hãy chọn giới tính của bạn.' }),
    dob: z.coerce
      .number()
      .min(1900, {
        message: 'Năm sinh không hợp lệ.'
      })
      .max(new Date().getFullYear()),
    term: z.boolean().refine((v) => v, { message: 'Bạn cần phải đồng ý với các chính sách của chúng tôi.' })
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp.',
        path: ['confirmPassword']
      })
    }
  })

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      role: z.enum(RoleValues)
    })
  }),
  message: z.string()
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const ForgotPasswordBody = z.object({
  email: z.string().email({
    message: 'Email không hợp lệ.'
  })
})

export type ForgotPasswordBodyType = z.TypeOf<typeof ForgotPasswordBody>
