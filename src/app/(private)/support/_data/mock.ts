// Mock data for Support Dashboard

import { format, subDays } from 'date-fns'

// Type definitions to match component interfaces
interface Activity {
  id: number
  type: 'ticket' | 'refund'
  title: string
  user: string
  time: string
  status: string
  priority?: 'high' | 'medium' | 'low'
  amount?: number
}

// Generate dates for the last 30 days

// Generate mock ticket data based on the schema from the tickets page
const generateTicketData = () => {
  const totalTickets = 1562
  const pendingTickets = 48
  const inProgressTickets = 37
  const resolvedTickets = totalTickets - pendingTickets - inProgressTickets

  // Generate ticket distribution by type
  const ticketTypes = [
    { name: 'Đăng nhập/Tài khoản', value: 302, color: '#3b82f6' },
    { name: 'Vấn đề thanh toán', value: 286, color: '#22c55e' },
    { name: 'Khóa học/Nội dung', value: 457, color: '#f59e0b' },
    { name: 'Kỹ thuật/Lỗi', value: 405, color: '#8b5cf6' },
    { name: 'Khác', value: 112, color: '#6b7280' }
  ]

  // Generate ticket distribution by status
  const ticketStatus = [
    { name: 'Chờ xử lý', value: pendingTickets, color: '#f59e0b' },
    { name: 'Đang xử lý', value: inProgressTickets, color: '#3b82f6' },
    { name: 'Đã giải quyết', value: resolvedTickets, color: '#22c55e' }
  ]

  // Generate daily ticket data for the last 30 days
  const dailyTicketData = Array.from({ length: 30 }).map((_, index) => {
    const date = subDays(new Date(), 30 - 1 - index)
    const formattedDate = format(date, 'dd/MM')
    const rawDate = format(date, 'yyyy-MM-dd')

    const tickets = Math.floor(Math.random() * 15) + 10
    const resolved = Math.floor(Math.random() * tickets)

    return {
      date: formattedDate,
      rawDate,
      tickets,
      resolved,
      responseTime: Math.floor(Math.random() * 20) + 5 // minutes
    }
  })

  return {
    totalTickets,
    pendingTickets,
    inProgressTickets,
    resolvedTickets,
    ticketTypes,
    ticketStatus,
    dailyTicketData,
    averageResponseTime: 15 // minutes
  }
}

// Generate mock refund data based on the schema from the refunds page
const generateRefundData = () => {
  const totalRefunds = 203
  const pendingRefunds = 18
  const processingRefunds = 35
  const completedRefunds = 150
  const totalAmount = 15720000

  // Generate refund distribution by status
  const refundStatus = [
    { name: 'Chờ duyệt', value: pendingRefunds, color: '#f59e0b' },
    { name: 'Đang xử lý', value: processingRefunds, color: '#3b82f6' },
    { name: 'Đã hoàn tiền', value: completedRefunds, color: '#22c55e' }
  ]

  // Generate daily refund data for the last 30 days
  const dailyRefundData = Array.from({ length: 30 }).map((_, index) => {
    const date = subDays(new Date(), 30 - 1 - index)
    const formattedDate = format(date, 'dd/MM')
    const rawDate = format(date, 'yyyy-MM-dd')

    const count = Math.floor(Math.random() * 3) + 1
    const amount = count * (Math.floor(Math.random() * 300000) + 100000)

    return {
      date: formattedDate,
      rawDate,
      count,
      amount
    }
  })

  return {
    totalRefunds,
    pendingRefunds,
    processingRefunds,
    completedRefunds,
    totalAmount,
    refundStatus,
    dailyRefundData
  }
}

// Generate mock order data based on the schema from the orders page
const generateOrderData = () => {
  const totalOrders = 2547
  const processingOrders = 73
  const deliveringOrders = 126
  const completedOrders = 2215
  const cancelledOrders = 133
  const totalRevenue = 345680000

  // Generate order distribution by status
  const orderStatus = [
    { name: 'Đang xử lý', value: processingOrders, color: '#f59e0b' },
    { name: 'Đang giao', value: deliveringOrders, color: '#3b82f6' },
    { name: 'Hoàn thành', value: completedOrders, color: '#22c55e' },
    { name: 'Đã hủy', value: cancelledOrders, color: '#ef4444' }
  ]

  return {
    totalOrders,
    processingOrders,
    deliveringOrders,
    completedOrders,
    cancelledOrders,
    totalRevenue,
    orderStatus
  }
}

// Generate mock user data
const generateUserData = () => {
  const totalUsers = 12875
  const activeUsers = 8754

  return {
    totalUsers,
    activeUsers
  }
}

// Generate recent activities
const generateRecentActivities = (): Activity[] => {
  return [
    {
      id: 1,
      type: 'ticket',
      title: 'Không đăng nhập được vào tài khoản',
      user: 'Nguyễn Văn A',
      time: '10 phút trước',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      type: 'refund',
      title: 'Yêu cầu hoàn tiền khóa học Digital Marketing',
      user: 'Trần Thị B',
      time: '35 phút trước',
      status: 'pending',
      amount: 1200000
    },
    {
      id: 3,
      type: 'ticket',
      title: 'Lỗi khi xem video bài giảng',
      user: 'Phạm Văn C',
      time: '1 giờ trước',
      status: 'in_progress',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'refund',
      title: 'Hoàn tiền sách Phương pháp học tiếng Anh hiệu quả',
      user: 'Lê Minh D',
      time: '2 giờ trước',
      status: 'approved',
      amount: 350000
    },
    {
      id: 5,
      type: 'ticket',
      title: 'Không nhận được email xác nhận đăng ký',
      user: 'Hoàng Thị E',
      time: '3 giờ trước',
      status: 'resolved',
      priority: 'low'
    }
  ]
}

// Export all mock data
export const ticketData = generateTicketData()
export const refundData = generateRefundData()
export const orderData = generateOrderData()
export const userData = generateUserData()
export const recentActivities = generateRecentActivities()

// For backward compatibility
export const ticketStatusData = ticketData.ticketStatus
export const refundStatusData = refundData.refundStatus

export const mockData = {
  tickets: ticketData,
  refunds: refundData,
  orders: orderData,
  users: userData,
  recentActivities
}

// Export user distribution by issue type
export const issueTypeData = [
  { name: 'Đăng nhập/Tài khoản', value: 35, color: '#3b82f6' },
  { name: 'Thanh toán', value: 25, color: '#22c55e' },
  { name: 'Kỹ thuật/Lỗi', value: 20, color: '#f59e0b' },
  { name: 'Nội dung khóa học', value: 15, color: '#8b5cf6' },
  { name: 'Khác', value: 5, color: '#6b7280' }
]
