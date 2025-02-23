// Add these types at the top of the file
type CourseRefund = {
  id: string
  userId: string
  item: string
  type: 'course'
  amount: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  progress: string
  purchaseDate: string
  createdAt: string
}

type ProductRefund = {
  id: string
  userId: string
  item: string
  type: 'product'
  amount: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  condition: string
  purchaseDate: string
  createdAt: string
}

type Refund = CourseRefund | ProductRefund

export type Ticket = {
  id: string
  title: string
  status: string
  priority: string
  createdAt: string
}

// Also define types at the top
type UserStatus = 'active' | 'inactive' | 'blocked'
type UserRole = 'parent' | 'child'

type Course = {
  id: string
  name: string
  progress: number
  startDate: string
  lastAccess: string
  status: string
  score?: number
}

type Product = {
  id: string
  name: string
  orderDate: string
  status: 'delivered' | 'processing' | 'cancelled'
  price: number
}

type ChildAccount = {
  id: string
  name: string
  age: number
  grade: string
  school: string
  avatar: string
  activeCourses: number
  completedCourses: number
  lastActive: string
  courses: Course[]
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  status: UserStatus
  role: UserRole
  address: string
  joinDate: string
  lastActive: string
  stats: {
    totalSpent: number
    totalTickets: number
    openTickets: number
    childAccounts: number
  }
  tickets: Ticket[]
  childAccounts: ChildAccount[]
  courses?: Course[]
  products?: Product[]
}

export const mockData = {
  users: [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0987654321',
      avatar: 'https://github.com/shadcn.png',
      status: 'active' as const,
      role: 'parent' as const,
      address: 'Quận 1, TP.HCM',
      joinDate: '2024-01-15T08:00:00Z',
      lastActive: '2024-03-15T10:30:00Z',
      stats: {
        totalSpent: 5600000,
        totalTickets: 8,
        openTickets: 2,
        childAccounts: 2
      },
      tickets: [
        {
          id: 'T1',
          title: 'Không thể truy cập khóa học',
          status: 'pending',
          priority: 'high',
          createdAt: '2024-03-10T08:00:00Z'
        },
        {
          id: 'T2',
          title: 'Câu hỏi về nội dung bài học',
          status: 'resolved',
          priority: 'medium',
          createdAt: '2024-03-15T09:00:00Z'
        }
      ],
      childAccounts: [
        {
          id: 'child1',
          name: 'Nguyễn Văn Bình',
          age: 12,
          grade: 'Lớp 7',
          school: 'THCS Chu Văn An',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
          activeCourses: 3,
          completedCourses: 2,
          lastActive: '2024-03-16T08:30:00Z',
          courses: [
            {
              id: 'c1',
              name: 'Toán nâng cao 7',
              progress: 75,
              startDate: '2024-01-15T00:00:00Z',
              lastAccess: '2024-03-16T08:30:00Z',
              status: 'active',
              score: 85
            },
            {
              id: 'c2',
              name: 'Tiếng Anh giao tiếp',
              progress: 60,
              startDate: '2024-02-01T00:00:00Z',
              lastAccess: '2024-03-15T14:20:00Z',
              status: 'active',
              score: 92
            },
            {
              id: 'c3',
              name: 'Lập trình Scratch cơ bản',
              progress: 40,
              startDate: '2024-03-01T00:00:00Z',
              lastAccess: '2024-03-14T15:45:00Z',
              status: 'active',
              score: 88
            },
            {
              id: 'c4',
              name: 'Toán nâng cao 6',
              progress: 100,
              startDate: '2023-08-15T00:00:00Z',
              lastAccess: '2023-12-20T10:30:00Z',
              status: 'completed',
              score: 95
            },
            {
              id: 'c5',
              name: 'Khoa học vui',
              progress: 100,
              startDate: '2023-09-01T00:00:00Z',
              lastAccess: '2023-12-15T16:20:00Z',
              status: 'completed',
              score: 88
            }
          ]
        },
        {
          id: 'child2',
          name: 'Nguyễn Thị Linh',
          age: 10,
          grade: 'Lớp 5',
          school: 'Tiểu học Nguyễn Du',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
          activeCourses: 2,
          completedCourses: 1,
          lastActive: '2024-03-15T15:45:00Z',
          courses: [
            {
              id: 'c6',
              name: 'Toán tư duy lớp 5',
              progress: 65,
              startDate: '2024-02-01T00:00:00Z',
              lastAccess: '2024-03-15T15:45:00Z',
              status: 'active',
              score: 78
            },
            {
              id: 'c7',
              name: 'Tiếng Anh Cambridge',
              progress: 45,
              startDate: '2024-02-15T00:00:00Z',
              lastAccess: '2024-03-14T16:30:00Z',
              status: 'active',
              score: 82
            },
            {
              id: 'c8',
              name: 'Khoa học tự nhiên',
              progress: 100,
              startDate: '2023-10-01T00:00:00Z',
              lastAccess: '2024-01-15T09:20:00Z',
              status: 'completed',
              score: 90
            }
          ]
        },
        {
          id: 'child3',
          name: 'Nguyễn Minh An',
          age: 8,
          grade: 'Lớp 3',
          school: 'Tiểu học Thăng Long',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
          activeCourses: 1,
          completedCourses: 2,
          lastActive: '2024-03-16T09:15:00Z',
          courses: [
            {
              id: 'c9',
              name: 'Toán Tư Duy Lớp 3',
              progress: 30,
              startDate: '2024-03-01T00:00:00Z',
              lastAccess: '2024-03-16T09:15:00Z',
              status: 'active',
              score: 75
            },
            {
              id: 'c10',
              name: 'Tiếng Anh Phonics',
              progress: 100,
              startDate: '2023-11-01T00:00:00Z',
              lastAccess: '2024-02-28T14:30:00Z',
              status: 'completed',
              score: 95
            },
            {
              id: 'c11',
              name: 'Vẽ Cơ Bản',
              progress: 100,
              startDate: '2023-12-01T00:00:00Z',
              lastAccess: '2024-02-15T10:45:00Z',
              status: 'completed',
              score: 88
            }
          ]
        }
      ],
      courses: [
        {
          id: 'c1',
          name: 'Kỹ năng làm cha mẹ hiện đại',
          progress: 60,
          startDate: '2024-02-01T00:00:00Z',
          lastAccess: '2024-03-14T15:00:00Z',
          status: 'active',
          score: 85
        }
      ],
      products: [
        {
          id: 'p1',
          name: 'Bộ học cụ Montessori',
          orderDate: '2024-03-01T00:00:00Z',
          status: 'delivered',
          price: 1200000
        }
      ]
    },
    {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0987654322',
      avatar: 'https://github.com/shadcn.png',
      status: 'active' as const,
      role: 'parent' as const,
      address: 'Quận 7, TP.HCM',
      joinDate: '2024-02-01T08:00:00Z',
      lastActive: '2024-03-16T11:30:00Z',
      stats: {
        totalSpent: 3200000,
        totalTickets: 3,
        openTickets: 1,
        childAccounts: 1
      },
      tickets: [
        {
          id: 'T3',
          title: 'Yêu cầu hỗ trợ kỹ thuật',
          status: 'pending',
          priority: 'medium',
          createdAt: '2024-03-16T09:00:00Z'
        }
      ],
      childAccounts: [
        {
          id: 'C3',
          name: 'Trần Văn D',
          age: 14,
          grade: '9',
          school: 'THCS Nguyễn Du',
          avatar: 'https://github.com/shadcn.png',
          activeCourses: 2,
          completedCourses: 0,
          lastActive: '2024-03-16T09:30:00Z',
          courses: [
            {
              id: 'CS4',
              name: 'Toán nâng cao lớp 9',
              progress: 25,
              startDate: '2024-03-01T08:00:00Z',
              lastAccess: '2024-03-16T09:30:00Z',
              status: 'in_progress',
              score: 80
            }
          ]
        }
      ]
    }
  ],

  tickets: [
    {
      id: 'T1',
      userId: '1',
      title: 'Không thể truy cập khóa học',
      description:
        'Tôi không thể truy cập vào khóa học JavaScript. Khi click vào bài học, màn hình hiện thông báo lỗi.',
      category: 'technical',
      priority: 'high',
      status: 'pending',
      contactMethod: 'phone',
      preferredTime: '8:00 - 12:00',
      createdAt: '2024-03-10T08:00:00Z',
      lastUpdate: '2024-03-10T08:30:00Z'
    },
    {
      id: 'T2',
      userId: '1',
      title: 'Câu hỏi về nội dung bài học',
      description: 'Em không hiểu phần giải phương trình bậc 2. Mong thầy cô giải thích rõ hơn.',
      category: 'content',
      priority: 'medium',
      status: 'resolved',
      contactMethod: 'email',
      preferredTime: '14:00 - 17:00',
      createdAt: '2024-03-15T09:00:00Z',
      lastUpdate: '2024-03-15T14:30:00Z'
    },
    {
      id: 'T3',
      userId: '2',
      title: 'Yêu cầu hỗ trợ kỹ thuật',
      description: 'Video bài giảng bị lag và không phát được âm thanh.',
      category: 'technical',
      priority: 'medium',
      status: 'pending',
      contactMethod: 'phone',
      preferredTime: '9:00 - 11:00',
      createdAt: '2024-03-16T09:00:00Z',
      lastUpdate: '2024-03-16T09:30:00Z'
    }
  ],

  refunds: {
    courses: [
      {
        id: 'RC-1234',
        userId: '1',
        item: 'JavaScript Cơ bản',
        type: 'course' as const,
        amount: 499000,
        reason: 'Không phù hợp với trình độ',
        status: 'pending' as const,
        progress: '15%',
        purchaseDate: '2024-03-10T08:00:00Z',
        createdAt: '2024-03-15T08:00:00Z'
      },
      {
        id: 'RC-1235',
        userId: '2',
        item: 'Toán nâng cao lớp 9',
        type: 'course' as const,
        amount: 799000,
        reason: 'Đã học ở trường',
        status: 'approved' as const,
        progress: '5%',
        purchaseDate: '2024-03-12T08:00:00Z',
        createdAt: '2024-03-14T08:00:00Z'
      }
    ] as CourseRefund[],
    products: [
      {
        id: 'RP-1234',
        userId: '1',
        item: 'Bộ sách Toán nâng cao',
        type: 'product' as const,
        amount: 850000,
        reason: 'Sản phẩm bị lỗi',
        status: 'pending' as const,
        condition: 'unopened',
        purchaseDate: '2024-03-13T08:00:00Z',
        createdAt: '2024-03-15T09:00:00Z'
      },
      {
        id: 'RP-1235',
        userId: '2',
        item: 'Bộ đề luyện thi',
        type: 'product' as const,
        amount: 450000,
        reason: 'Nhận sai sản phẩm',
        status: 'approved' as const,
        condition: 'unopened',
        purchaseDate: '2024-03-14T08:00:00Z',
        createdAt: '2024-03-15T10:00:00Z'
      }
    ] as ProductRefund[]
  },

  faq: {
    categories: [
      {
        id: 'general',
        name: 'Chung',
        count: 5,
        color: 'default'
      },
      {
        id: 'account',
        name: 'Tài khoản',
        count: 8,
        color: 'blue'
      },
      {
        id: 'courses',
        name: 'Khóa học',
        count: 12,
        color: 'green'
      },
      {
        id: 'payment',
        name: 'Thanh toán',
        count: 6,
        color: 'yellow'
      },
      {
        id: 'technical',
        name: 'Kỹ thuật',
        count: 4,
        color: 'red'
      }
    ],
    items: [
      {
        id: '1',
        question: 'Làm thế nào để đặt lại mật khẩu?',
        answer: `Để đặt lại mật khẩu, bạn có thể thực hiện theo các bước sau:

1. Truy cập trang đăng nhập
2. Nhấp vào "Quên mật khẩu"
3. Nhập email đã đăng ký
4. Làm theo hướng dẫn trong email được gửi đến

Lưu ý: Link đặt lại mật khẩu chỉ có hiệu lực trong 24 giờ.`,
        category: 'account',
        views: 1250,
        helpful: 95
      }
    ]
  },

  stats: {
    overview: {
      totalUsers: 2345,
      activeUsers: 1890,
      newUsers: 245,
      ticketsPerUser: 1.8
    },
    tickets: {
      total: 24,
      pending: 5,
      processing: 12,
      resolved: 7
    },
    refunds: {
      total: {
        count: 24,
        amount: 15600000
      },
      pending: {
        count: 5,
        amount: 3200000
      },
      approved: {
        count: 18,
        amount: 11500000
      },
      rejected: {
        count: 1,
        amount: 900000
      }
    },
    performance: [
      {
        date: '01/03',
        tickets: 45,
        resolved: 40,
        satisfaction: 4.5
      },
      {
        date: '02/03',
        tickets: 52,
        resolved: 48,
        satisfaction: 4.8
      }
    ]
  }
}

// Helper functions to get data
export const getUser = (id: string) => {
  return mockData.users.find((user) => user.id === id)
}

export const getTicket = (id: string) => {
  return mockData.tickets.find((ticket) => ticket.id === id)
}

export const getRefund = (id: string): Refund | undefined => {
  const courseRefund = mockData.refunds.courses.find((refund) => refund.id === id)
  if (courseRefund) return courseRefund

  return mockData.refunds.products.find((refund) => refund.id === id)
}

export const getFAQ = (id: string) => {
  return mockData.faq.items.find((faq) => faq.id === id)
}
