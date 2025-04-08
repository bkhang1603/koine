import { convert } from 'html-to-text'

export const htmlToTextForDescription = (html: string) => {
  return convert(html)
}

export const wrapServerApi = async <T>(fn: () => Promise<T>) => {
  let result = null
  try {
    result = await fn()
  } catch (error: any) {
    // Log lỗi để gỡ lỗi
    console.error('API error:', error)

    // Nếu là lỗi redirect của Next.js, ném lại
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }

    // Ném lại lỗi để có thể xử lý ở component
    throw error
  }
  return result
}
