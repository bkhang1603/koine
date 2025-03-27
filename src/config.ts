import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_GOOGLE_URL_LOCAL: z.string(),
  NEXT_PUBLIC_GOOGLE_URL: z.string(),
  NEXT_PUBLIC_SOCKET_ENDPOINT: z.string(),
  NEXT_PUBLIC_WHEREBY_API_KEY: z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_GOOGLE_URL_LOCAL: process.env.NEXT_PUBLIC_GOOGLE_URL_LOCAL,
  NEXT_PUBLIC_GOOGLE_URL: process.env.NEXT_PUBLIC_GOOGLE_URL,
  NEXT_PUBLIC_SOCKET_ENDPOINT: process.env.NEXT_PUBLIC_SOCKET_ENDPOINT,
  NEXT_PUBLIC_WHEREBY_API_KEY: process.env.NEXT_PUBLIC_WHEREBY_API_KEY
})
if (!configProject.success) {
  console.error(configProject.error.issues)
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}

export type Locale = (typeof locales)[number]

export const locales = ['en', 'vi'] as const
export const defaultLocale: Locale = 'vi'

const envConfig = configProject.data
export default envConfig
