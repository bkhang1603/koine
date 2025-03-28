import { toast } from '@/components/ui/use-toast'
import { EntityError } from '@/lib/http'
import { type ClassValue, clsx } from 'clsx'
import { UseFormSetError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { jwtDecode } from 'jwt-decode'
import envConfig from '@/config'
import { TokenPayload } from '@/types/jwt.types'
import { format } from 'date-fns'
import { io } from 'socket.io-client'
import authApiRequest from '@/apiRequests/auth'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  } else {
    toast({
      title: 'Lỗi',
      description: error?.payload?.message ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration: duration ?? 5000
    })
  }
}

const isBrowser = typeof window !== 'undefined'

export const getAccessTokenFromLocalStorage = () => (isBrowser ? localStorage.getItem('accessToken') : null)

export const getRefreshTokenFromLocalStorage = () => (isBrowser ? localStorage.getItem('refreshToken') : null)
export const setAccessTokenToLocalStorage = (value: string) => isBrowser && localStorage.setItem('accessToken', value)

export const setRefreshTokenToLocalStorage = (value: string) => isBrowser && localStorage.setItem('refreshToken', value)
export const removeTokensFromLocalStorage = () => {
  isBrowser && localStorage.removeItem('accessToken')
  isBrowser && localStorage.removeItem('refreshToken')
}

export const checkAndRefreshToken = async (param?: {
  onError?: () => void
  onSuccess?: () => void
  force?: boolean
}) => {
  // Không nên đưa logic lấy access và refresh token ra khỏi cái function `checkAndRefreshToken`
  // Vì để mỗi lần mà checkAndRefreshToken() được gọi thì chúng ta se có một access và refresh token mới
  // Tránh hiện tượng bug nó lấy access và refresh token cũ ở lần đầu rồi gọi cho các lần tiếp theo
  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()

  // Chưa đăng nhập thì cũng không cho chạy
  if (!accessToken || !refreshToken) return
  const decodedAccessToken = decodeToken(accessToken)
  const decodedRefreshToken = decodeToken(refreshToken)

  // Thời điểm hết hạn của token là tính theo epoch time (s)
  // Còn khi các bạn dùng cú pháp new Date().getTime() thì nó sẽ trả về epoch time (ms)
  const now = Math.round(new Date().getTime() / 1000)

  // const formatTimestamp = (timestamp: number) => {
  //   const date = new Date(timestamp * 1000) // Convert to milliseconds
  //   return date.toLocaleString() // Convert to human-readable format
  // }

  // console.log('now', formatTimestamp(now))
  // console.log('decodedAccessToken.exp', formatTimestamp(decodedAccessToken.exp))
  // console.log('decodedRefreshToken.exp', formatTimestamp(decodedRefreshToken.exp))
  // trường hợp refresh token hết hạn thì cho logout
  if (decodedRefreshToken.exp <= now) {
    removeTokensFromLocalStorage()
    return param?.onError && param.onError()
  }
  // Ví dụ access token của chúng ta có thời gian hết hạn là 10s
  // thì mình sẽ kiểm tra còn 1/3 thời gian (3s) thì mình sẽ cho refresh token lại
  // Thời gian còn lại sẽ tính dựa trên công thức: decodedAccessToken.exp - now
  // Thời gian hết hạn của access token dựa trên công thức: decodedAccessToken.exp - decodedAccessToken.iat
  if (param?.force || decodedAccessToken.exp - now < (decodedAccessToken.exp - decodedAccessToken.iat) / 3) {
    // Gọi API refresh token
    try {
      const res = await authApiRequest.refreshToken()
      console.log('Refresh token success', res)
      setAccessTokenToLocalStorage(res.payload.data.accessToken)
      setRefreshTokenToLocalStorage(res.payload.data.refreshToken)
      param?.onSuccess && param.onSuccess()
    } catch (error) {
      param?.onError && param.onError()
    }
  }
}

export const decodeToken = (token: string) => {
  return jwtDecode(token) as TokenPayload
}

export const formatDateTimeToLocaleString = (date: string | Date) => {
  return format(date instanceof Date ? date : new Date(date), 'HH:mm:ss dd/MM/yyyy')
}

export const formatDateTimeToTimeString = (date: string | Date) => {
  return format(date instanceof Date ? date : new Date(date), 'HH:mm:ss')
}

export const generateSocketInstance = (accessToken: string) => {
  return io(envConfig.NEXT_PUBLIC_API_ENDPOINT, {
    auth: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

export const translateRole = (role: string) => {
  switch (role) {
    case 'ADULT':
      return 'Phụ huynh'
    case 'TEACHER':
      return 'Giáo viên'
    case 'ADMIN':
      return 'Quản trị viên'
    default:
      return role
  }
}

export const redirectSettingRole = (role: string) => {
  switch (role) {
    case 'ADULT':
      return '/setting'
    case 'TEACHER':
      return '/teacher/setting'
    case 'ADMIN':
      return '/admin/setting'
    default:
      return '/'
  }
}

export const translatePathname = (pathname: string) => {
  switch (pathname) {
    case 'product':
      return 'Sản phẩm'
    case 'product-detail':
      return 'Chi tiết sản phẩm'
    case 'course':
      return 'Khóa học'
    case 'course-detail':
      return 'Chi tiết khóa học'
    default:
      return 'Chi tiết'
  }
}

export const setCheckoutDataToLocalStorage = (data: any) => {
  isBrowser && localStorage.setItem('checkoutData', JSON.stringify(data))
}

export const getCheckoutDataFromLocalStorage = () => {
  const data = isBrowser && localStorage.getItem('checkoutData')
  return data ? JSON.parse(data) : null
}

export const removeCheckoutDataFromLocalStorage = () => {
  isBrowser && localStorage.removeItem('checkoutData')
}

export const setCheckoutBuyNowToLocalStorage = (data: any) => {
  isBrowser && localStorage.setItem('checkoutBuyNow', JSON.stringify(data))
}

export const getCheckoutBuyNowFromLocalStorage = () => {
  const data = isBrowser && localStorage.getItem('checkoutBuyNow')
  return data ? JSON.parse(data) : null
}

export const removeCheckoutBuyNowFromLocalStorage = () => {
  isBrowser && localStorage.removeItem('checkoutBuyNow')
}

export const setOrderIdToLocalStorage = (orderId: string) => {
  isBrowser && localStorage.setItem('orderId', JSON.stringify(orderId))
}

export const getOrderIdFromLocalStorage = () => {
  const data = isBrowser && localStorage.getItem('orderId')
  return data ? JSON.parse(data) : null
}

export const removeOrderIdFromLocalStorage = () => {
  isBrowser && localStorage.removeItem('orderId')
}

export const checkAndSetTokenToCookieByLoginGoogle = async ({
  accessToken,
  refreshToken,
  onError,
  onSuccess
}: {
  accessToken: string
  refreshToken: string
  onError?: () => void
  onSuccess?: () => void
}) => {
  try {
    await authApiRequest.setTokenToCookie({
      accessToken,
      refreshToken
    })
    setAccessTokenToLocalStorage(accessToken)
    setRefreshTokenToLocalStorage(refreshToken)
    onSuccess && onSuccess()
  } catch (error) {
    removeTokensFromLocalStorage()
    onError && onError()
  }

  // const decodedAccessToken = jwtDecode(accessToken) as { exp: number }
  // const decodedRefreshToken = jwtDecode(refreshToken) as { exp: number }
  // const role = (jwtDecode(accessToken) as { role: string }).role
  // authApiRequest.setTokenToCookie({
  //   accessToken,
  //   refreshToken
  // })
  // setAccessTokenToLocalStorage(accessToken)
  // setRefreshTokenToLocalStorage(refreshToken)
  // return {
  //   accessToken,
  //   refreshToken,
  //   expires: decodedAccessToken.exp * 1000,
  //   expiresRefresh: decodedRefreshToken.exp * 1000,
  //   role
  // }
}

export const changeTime = (createdAt: string) => {
  // Tôi đang có data là 14:00:00-10/01/2024, tôi muốn chuyển thành số giờ trước so với thời gian hiện tại
  // Ví dụ: 2 giờ trước
  // const [time, date] = createdAt.split('-')
  // const [hour, minute, second] = time.split(':').map(Number)
  // const [day, month, year] = date.split('/').map(Number)
  // const commentDate = new Date(year, month - 1, day, hour, minute, second)
  // const currentDate = new Date()
  // const diff = currentDate.getTime() - commentDate.getTime()

  const commentDate = new Date(createdAt)
  const currentDate = new Date()
  const diff = currentDate.getTime() - commentDate.getTime()

  if (diff < 0) {
    return 'Vừa xong'
  }

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years) {
    return `${years} năm trước`
  }

  if (months) {
    return `${months} tháng trước`
  }

  if (days) {
    return `${days} ngày trước`
  }

  if (hours) {
    return `${hours} giờ trước`
  }

  if (minutes) {
    return `${minutes} phút trước`
  }

  if (seconds) {
    return `${seconds} giây trước`
  }

  return 'Vừa xong'
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

export const formatCurrencyWithoutSymbol = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value)
}

export const formatDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy')
}

export const formatLevel = (level: string) => {
  switch (level) {
    case 'ALL':
      return 'Tất cả'
    case 'BEGINNER':
      return 'Cơ bản'
    case 'INTERMEDIATE':
      return 'Trung bình'
    case 'ADVANCED':
      return 'Nâng cao'
    default:
      return level
  }
}
