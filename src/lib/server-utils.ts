import { convert } from 'html-to-text'

export const htmlToTextForDescription = (html: string) => {
  return convert(html)
}

export const wrapServerApi = async <T>(fn: () => Promise<T>) => {
  let result = null
  try {
    result = await fn()
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }
  return result
}
