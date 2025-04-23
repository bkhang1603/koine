import { format, subDays } from 'date-fns'

// Type definition for support requests
interface SupportRequest {
  id: string
  type: 'ticket' | 'refund'
  title: string
  user: string
  date: string
  status: 'pending' | 'in_progress' | 'resolved' | 'approved' | 'rejected'
  priority?: 'low' | 'medium' | 'high'
}

// Generate dates for the last 30 days
const generateDates = (count: number) => {
  const today = new Date()
  return Array.from({ length: count }).map((_, i) => {
    const date = subDays(today, count - 1 - i)
    return {
      date: format(date, 'dd/MM'),
      rawDate: format(date, 'yyyy-MM-dd')
    }
  })
}

const dates = generateDates(30)

// Generate activity trend data for different content types
export const generateActivityTrendData = () => {
  return dates.map((dateObj) => {
    // Generate random values with some correlation to make it look realistic
    const baseValue = Math.floor(Math.random() * 10) + 5
    const variance = Math.floor(Math.random() * 5)

    return {
      date: dateObj.date,
      rawDate: dateObj.rawDate,
      courseComments: baseValue + Math.floor(Math.random() * 10),
      blogComments: baseValue - variance + Math.floor(Math.random() * 12),
      productReviews: baseValue - 1 + Math.floor(Math.random() * 8)
    }
  })
}

// Generate content distribution data
export const generateContentDistributionData = () => {
  // Total counts based on the trend data
  const courseCommentsTotal = 432
  const blogCommentsTotal = 287
  const productReviewsTotal = 368

  return [
    { name: 'Khóa học', value: courseCommentsTotal, color: '#3b82f6' },
    { name: 'Bài viết', value: blogCommentsTotal, color: '#8b5cf6' },
    { name: 'Sản phẩm', value: productReviewsTotal, color: '#22c55e' }
  ]
}

// Generate support requests data
export const generateSupportRequestsData = (): SupportRequest[] => {
  return [
    {
      id: '1',
      type: 'ticket',
      title: 'Không đăng nhập được vào tài khoản',
      user: 'Nguyễn Văn A',
      date: '15/05/2023',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '3',
      type: 'ticket',
      title: 'Lỗi khi xem video bài giảng',
      user: 'Phạm Văn C',
      date: '14/05/2023',
      status: 'in_progress',
      priority: 'medium'
    },
    {
      id: '5',
      type: 'ticket',
      title: 'Không nhận được email xác nhận đăng ký',
      user: 'Hoàng Thị E',
      date: '12/05/2023',
      status: 'resolved',
      priority: 'low'
    },
    {
      id: '6',
      type: 'ticket',
      title: 'Không thể tải tài liệu từ khóa học',
      user: 'Vũ Văn F',
      date: '12/05/2023',
      status: 'in_progress',
      priority: 'medium'
    },
    {
      id: '8',
      type: 'ticket',
      title: 'Lỗi không thể thanh toán bằng thẻ VISA',
      user: 'Nguyễn Thị H',
      date: '11/05/2023',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '9',
      type: 'ticket',
      title: 'Yêu cầu hỗ trợ cài đặt ứng dụng mobile',
      user: 'Trần Văn I',
      date: '10/05/2023',
      status: 'resolved',
      priority: 'medium'
    }
  ]
}

// Generate sentiment analysis data
export const generateSentimentData = () => {
  return [
    {
      name: 'Khóa học',
      positive: 312,
      neutral: 87,
      negative: 33
    },
    {
      name: 'Bài viết',
      positive: 186,
      neutral: 75,
      negative: 26
    },
    {
      name: 'Sản phẩm',
      positive: 243,
      neutral: 93,
      negative: 32
    }
  ]
}

// Generate content summary metrics
export const generateContentSummaryData = () => {
  return {
    totalComments: 1087,
    courseComments: 432,
    blogComments: 287,
    productReviews: 368,
    positivePercentage: 68,
    negativePercentage: 8,
    pendingReviews: 27,
    averageRating: 4.2
  }
}

// Export all content data
export const activityTrendData = generateActivityTrendData()
export const contentDistributionData = generateContentDistributionData()
export const sentimentData = generateSentimentData()
export const contentSummaryData = generateContentSummaryData()
export const supportRequestsData = generateSupportRequestsData()
