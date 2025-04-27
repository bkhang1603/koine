import { toast } from '@/components/ui/use-toast'
import { EntityError } from '@/lib/http'
import { type ClassValue, clsx } from 'clsx'
import { UseFormSetError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { jwtDecode } from 'jwt-decode'
import envConfig from '@/config'
import { TokenPayload } from '@/types/jwt.types'
import { format, subDays, subMonths, subYears } from 'date-fns'
import { io } from 'socket.io-client'
import authApiRequest from '@/apiRequests/auth'
import { OrderStatus, OrderStatusValues } from '@/constants/type'
import { DateRange } from 'react-day-picker'

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
    case 'CHILD':
      return '/kid/setting'
    case 'CONTENT_CREATOR':
      return '/content-creator/settings'
    case 'SUPPORTER':
      return '/support/settings'
    case 'EXPERT':
      return '/expert/settings'
    case 'SALESMAN':
      return '/salesman/settings'
    case 'MANAGER':
      return '/manager/settings'
    case 'ADMIN':
      return '/admin/settings'
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

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
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

export const formatRole = (role: string) => {
  switch (role) {
    case 'ADULT':
      return 'Phụ huynh'
    case 'CHILD':
      return 'Trẻ em'
    case 'CONTENT_CREATOR':
      return 'Người tạo nội dung'
    case 'SUPPORTER':
      return 'Hỗ trợ'
    case 'EXPERT':
      return 'Chuyên gia'
    case 'SALESMAN':
      return 'Bán hàng'
    case 'MANAGER':
      return 'Quản lý'
    default:
      return role
  }
}

export const translateOrderStatus = (status: (typeof OrderStatusValues)[number]) => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'Chờ xác nhận'
    case OrderStatus.PROCESSING:
      return 'Đang xử lý'
    case OrderStatus.DELIVERING:
      return 'Đang giao hàng'
    case OrderStatus.DELIVERED:
      return 'Đã giao hàng'
    case OrderStatus.CANCELLED:
      return 'Đã hủy'
    case OrderStatus.FAILED:
      return 'Thất bại'
    case OrderStatus.FAILED_PAYMENT:
      return 'Thất bại'
    case OrderStatus.REFUND_REQUEST:
      return 'Yêu cầu hoàn tiền'
    case OrderStatus.REFUNDING:
      return 'Đang hoàn tiền'
    case OrderStatus.REFUNDED:
      return 'Đã hoàn tiền'
    case OrderStatus.COMPLETED:
      return 'Đã hoàn tất'
    default:
      return status
  }
}

export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration % 3600) / 60)
  return `${hours} giờ ${minutes} phút`
}

export const formatDateEvent = (date: string): string => {
  // Múi giờ đang bị lệch 7 giờ, cần trừ đi 7 giờ
  const localTime = new Date(date).getTime()
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Ho_Chi_Minh'
  }
  return new Date(localTime).toLocaleString('vi-VN', options)
}

export const formatAvatarFallback = (email: string): string => {
  // Uppercase first letter of each part
  if (!email) return ''
  return `${email.slice(0, 2).toUpperCase()}`
}

export const translateLevel = (level: string) => {
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
      return 'Tất cả'
  }
}

export const formatOrderStatus = (status: string) => {
  switch (status) {
    case 'PROCESSING':
      return 'Đang xử lý'
    case 'DELIVERING':
      return 'Đang giao'
    case 'COMPLETED':
      return 'Hoàn thành'
    case 'CANCELLED':
      return 'Đã hủy'
    case 'EXCHANGE_REQUEST':
      return 'Yêu cầu đổi hàng'
    case 'REFUND_REQUEST':
      return 'Yêu cầu hoàn tiền'
    default:
      return status
  }
}

export const formatPaymentStatus = (status: string) => {
  switch (status) {
    case 'PROCESSING':
      return 'Đang xử lý'
    case 'SUC':
      return 'Đang giao'
    case 'COMPLETED':
      return 'Hoàn thành'
    case 'CANCELLED':
      return 'Đã hủy'
    default:
      return status
  }
}

export const formatPercentage = (value: number, minDecimals = 1, maxDecimals = 1): string => {
  // Convert decimal to percentage (e.g., 0.5 to 50)
  const percentage = value * 100

  // Check if it's a whole number
  if (percentage % 1 === 0) {
    return `${percentage}%`
  }

  // Format with specified decimal places
  return `${percentage.toLocaleString('vi-VN', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals
  })}%`
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function formatShortCurrency(value: number): string {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1).replace(/\.0$/, '')}tỷ`
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, '')}tr`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`
  }
  return value.toString()
}

export function formatAxisLabel(value: number, unit: string = ''): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, '')}tr${unit}`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k${unit}`
  }
  return `${value}${unit}`
}

export const getFilledDataStats = (data: RevenueDataItem[]) => {
  const filledDays = data.filter((item) => item.isFilled).length
  const totalDays = data.length
  const filledPercentage = totalDays > 0 ? (filledDays / totalDays) * 100 : 0

  return {
    filledDays,
    totalDays,
    filledPercentage,
    originalDays: totalDays - filledDays
  }
}

export const formatApiRevenueData = (
  apiData: Array<{
    type: string
    time: string
    amount: number
    ordersCount: number
  }>
): RevenueDataItem[] => {
  return apiData.map((item) => {
    let date: string

    if (item.type === 'day') {
      const [day, month, year] = item.time.split('/').map(Number)
      date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    } else if (item.type === 'week') {
      date = `Week ${item.time.replace('Week ', '')}`
    } else if (item.type === 'month') {
      date = item.time
    } else {
      date = item.time
    }

    return {
      date,
      amount: item.amount,
      ordersCount: item.ordersCount
    }
  })
}

export const getDateRangeFromType = (rangeType: RangeType): DateRange => {
  const today = new Date()
  let from: Date

  switch (rangeType) {
    case 'THIS_MONTH':
      from = new Date(today.getFullYear(), today.getMonth(), 1)
      break
    case '3_MONTH':
      from = subMonths(today, 3)
      break
    case '6_MONTH':
      from = subMonths(today, 6)
      break
    case '1_YEAR':
      from = subYears(today, 1)
      break
    case '2_YEARS':
      from = subYears(today, 2)
      break
    case '3_YEARS':
      from = subYears(today, 3)
      break
    case 'DAY':
      // For DAY, default to last 30 days
      from = subDays(today, 30)
      break
    default:
      from = subMonths(today, 3) // Default to 3 months
  }

  return { from, to: today }
}

export const parseUrlDate = (dateStr: string | null): Date | undefined => {
  if (!dateStr) return undefined
  try {
    const [day, month, year] = dateStr.split('/').map(Number)
    if (isNaN(day) || isNaN(month) || isNaN(year)) return undefined
    return new Date(year, month - 1, day)
  } catch (error) {
    return undefined
  }
}

export const getValidRangeType = (type: string | null): RangeType => {
  if (type && VALID_RANGE_TYPES.includes(type as RangeType)) {
    return type as RangeType
  }
  return '3_MONTH' // Default to 3 months
}

export const formatDateForApi = (date: Date | undefined): string | undefined => {
  if (!date) return undefined
  return format(date, 'dd/MM/yyyy')
}

export type RangeType = 'DAY' | 'THIS_MONTH' | '3_MONTH' | '6_MONTH' | '1_YEAR' | '2_YEARS' | '3_YEARS'
export const VALID_RANGE_TYPES: RangeType[] = [
  'DAY',
  'THIS_MONTH',
  '3_MONTH',
  '6_MONTH',
  '1_YEAR',
  '2_YEARS',
  '3_YEARS'
]

export type RevenueDataItem = {
  date: string
  amount: number
  ordersCount: number
  isFilled?: boolean
}

export const formatLevelForKid = (level: number) => {
  // Từ 0 đến 100 điểm có tên riêng, trên 500 có tên riêng và trên 1000 có tên riêng và cũng là level cuối cùng. Chỉ có 3 level
  if (level >= 1000) return 'Nhà thám hiểm chuyên gia'
  if (level >= 500) return 'Nhà thám hiểm chính thức'
  return 'Nhà thám hiểm tập sự'
}

export const formatCourseStatus = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'Đang hoạt động'
    case 'PENDINGREVIEW':
      return 'Chờ duyệt'
    case 'PENDINGPRICING':
      return 'Chờ định giá'
    case 'REJECTED':
      return 'Đã từ chối'
    default:
      return status
  }
}
