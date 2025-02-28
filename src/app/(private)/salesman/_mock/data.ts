import { CoursesResType } from '@/schemaValidations/course.schema'

export type ComboProduct = {
  id: string
  productId: string
  quantity: number
}

export interface Product {
  id: string
  name: string
  category: string
  price: string
  originalPrice: string
  stock: number
  sold: number
  discount: string
  status: string
  image: string
  isCombo?: boolean
  comboProducts?: ComboProduct[]
}

export const mockProducts: Product[] = [
  {
    id: 'PRD001',
    name: 'Sách IELTS Reading',
    category: 'book',
    price: '450.000đ',
    originalPrice: '500.000đ',
    stock: 50,
    sold: 120,
    discount: '10%',
    status: 'active',
    image: 'https://picsum.photos/seed/product1/200/200'
  },
  {
    id: 'PRD002',
    name: 'Sách IELTS Writing',
    category: 'book',
    price: '400.000đ',
    originalPrice: '450.000đ',
    stock: 30,
    sold: 80,
    discount: '15%',
    status: 'active',
    image: 'https://picsum.photos/seed/product2/200/200'
  },
  {
    id: 'PRD003',
    name: 'Bộ Đề IELTS',
    category: 'book',
    price: '350.000đ',
    originalPrice: '400.000đ',
    stock: 0,
    sold: 200,
    discount: '20%',
    status: 'inactive',
    image: 'https://picsum.photos/seed/product3/200/200'
  },
  {
    id: 'PRD004',
    name: 'Tai Nghe Học IELTS',
    category: 'equipment',
    price: '1.200.000đ',
    originalPrice: '1.500.000đ',
    stock: 15,
    sold: 45,
    discount: '25%',
    status: 'active',
    image: 'https://picsum.photos/seed/product4/200/200'
  }
]

export type CourseStatus =
  | 'draft' // Đang tạo nội dung
  | 'pending_price' // Chờ thiết lập giá
  | 'pending_review' // Chờ duyệt
  | 'published' // Đã xuất bản
  | 'unpublished' // Tạm ẩn
  | 'rejected' // Bị từ chối

export interface Course {
  id: string
  name: string
  category: string
  price: string
  originalPrice: string
  students: number
  discount: string
  status: CourseStatus
  image: string
  description: string
  duration: string // Thời lượng học
  level: string // Trình độ
  rating: number
  totalRatings: number
  enrollments: number
  completionRate: number
  // Bỏ instructor
  lessons: number // Số buổi học
  materials: number // Số tài liệu
  createdBy: string
  createdAt: Date
  updatedBy: string
  updatedAt: Date
  publishedAt?: Date
  reviewNote?: string
}

export const mockCourses: CoursesResType['data'] = [
  {
    id: 'CRS001',
    title: 'IELTS 7.0 - Luyện Thi Tổng Quát',
    categories: [
      {
        id: 'CAT001',
        name: 'IELTS'
      }
    ],
    price: 3000000,
    totalEnrollment: 250,
    discount: 15,
    imageUrl: 'https://picsum.photos/seed/course1/200/200',
    description: 'Khóa học IELTS tổng quát giúp học viên đạt band điểm 7.0+',
    durations: 100,
    createdAt: '2024-01-01',
    updatedAt: '2024-02-15',
    creatorId: '',
    titleNoTone: '',
    slug: '',
    imageBanner: '',
    durationsDisplay: '',
    aveRating: 0,
    creator: {
      id: 'USR001',
      username: 'Nguyễn Văn A'
    },
    chapters: [
      {
        id: 'CHP001',
        title: 'Chương 1: Ngữ Pháp',
        lessons: [
          {
            id: 'LSN001',
            title: 'Bài 1: Câu điều kiện loại 1',
            durations: 15,
            type: 'VIDEO',
            description: '',
            durationsDisplay: '',
            sequence: 0,
            content: null,
            videoUrl: null
          },
          {
            id: 'LSN002',
            title: 'Bài 2: Câu điều kiện loại 2',
            durations: 20,
            type: 'VIDEO',
            description: '',
            durationsDisplay: '',
            sequence: 0,
            content: null,
            videoUrl: null
          }
        ],
        description: '',
        durations: 0,
        durationsDisplay: '',
        sequence: 0
      }
    ]
  }
]

export const mockPromotions = [
  {
    id: 'PRM001',
    name: 'Khuyến mãi Tháng 3',
    type: 'percent',
    discount: '20%',
    appliedTo: 'all',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    status: 'active'
  },
  {
    id: 'PRM002',
    name: 'Giảm giá Sách IELTS',
    type: 'fixed',
    discount: '100.000đ',
    appliedTo: 'products',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-04-15'),
    status: 'upcoming'
  },
  {
    id: 'PRM003',
    name: 'Ưu đãi Khóa học',
    type: 'percent',
    discount: '15%',
    appliedTo: 'courses',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-29'),
    status: 'ended'
  }
]

// Thêm interface cho Order
export interface OrderItem {
  id: string
  name: string
  price: string
  originalPrice: string
  quantity: number
  image: string
}

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  customerEmail: string
  shippingAddress?: string
  subtotal: string
  discount?: string
  total: string
  date: Date
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  paymentMethod: 'cod' | 'banking' | 'momo' | 'vnpay'
  products?: OrderItem[]
  courses?: OrderItem[]
}

// Cập nhật mock data
export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'Nguyễn Văn A',
    customerPhone: '0901234567',
    customerEmail: 'nguyenvana@example.com',
    shippingAddress: '123 Đường ABC, Quận 1, TP.HCM',
    subtotal: '2.500.000đ',
    discount: '250.000đ',
    total: '2.250.000đ',
    date: new Date('2024-03-15T10:30:00'),
    status: 'pending',
    paymentMethod: 'banking',
    products: [
      {
        id: 'PRD001',
        name: 'Sách IELTS Reading',
        price: '450.000đ',
        originalPrice: '500.000đ',
        quantity: 2,
        image: 'https://picsum.photos/seed/product1/200/200'
      },
      {
        id: 'PRD002',
        name: 'Sách IELTS Writing',
        price: '400.000đ',
        originalPrice: '450.000đ',
        quantity: 1,
        image: 'https://picsum.photos/seed/product2/200/200'
      }
    ]
  },
  {
    id: 'ORD002',
    customerName: 'Trần Thị B',
    customerPhone: '0907654321',
    customerEmail: 'tranthib@example.com',
    subtotal: '3.000.000đ',
    total: '3.000.000đ',
    date: new Date('2024-03-14T15:45:00'),
    status: 'completed',
    paymentMethod: 'momo',
    courses: [
      {
        id: 'CRS001',
        name: 'Khóa học IELTS 7.0',
        price: '3.000.000đ',
        originalPrice: '3.500.000đ',
        quantity: 1,
        image: 'https://picsum.photos/seed/course1/200/200'
      }
    ]
  },
  {
    id: 'ORD003',
    customerName: 'Lê Văn C',
    customerPhone: '0909876543',
    customerEmail: 'levanc@example.com',
    shippingAddress: '456 Đường XYZ, Quận 2, TP.HCM',
    subtotal: '4.700.000đ',
    discount: '500.000đ',
    total: '4.200.000đ',
    date: new Date('2024-03-13T09:15:00'),
    status: 'processing',
    paymentMethod: 'cod',
    products: [
      {
        id: 'PRD003',
        name: 'Combo Sách IELTS',
        price: '1.200.000đ',
        originalPrice: '1.500.000đ',
        quantity: 1,
        image: 'https://picsum.photos/seed/product3/200/200'
      }
    ],
    courses: [
      {
        id: 'CRS002',
        name: 'Khóa học IELTS Speaking',
        price: '3.000.000đ',
        originalPrice: '3.500.000đ',
        quantity: 1,
        image: 'https://picsum.photos/seed/course2/200/200'
      }
    ]
  },
  {
    id: 'ORD004',
    customerName: 'Phạm Thị D',
    customerPhone: '0904567890',
    customerEmail: 'phamthid@example.com',
    subtotal: '2.000.000đ',
    total: '2.000.000đ',
    date: new Date('2024-03-12T14:20:00'),
    status: 'cancelled',
    paymentMethod: 'vnpay',
    courses: [
      {
        id: 'CRS003',
        name: 'Khóa học IELTS Listening',
        price: '2.000.000đ',
        originalPrice: '2.500.000đ',
        quantity: 1,
        image: 'https://picsum.photos/seed/course3/200/200'
      }
    ]
  }
]

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive'
  totalOrders: number
  totalSpent: string
  lastOrder: Date
  joinDate: Date
  recentOrders?: {
    id: string
    date: Date
    products?: { id: string; name: string }[]
    courses?: { id: string; name: string }[]
    status: string
    total: string
  }[]
  purchasedCourses?: {
    id: string
    name: string
    image: string
    progress: number
    purchaseDate: Date
  }[]
}

export const mockCustomers: Customer[] = [
  {
    id: 'CST001',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    totalOrders: 5,
    totalSpent: '12.500.000đ',
    lastOrder: new Date('2024-03-15'),
    joinDate: new Date('2024-01-01'),
    status: 'active' as const,
    recentOrders: [
      {
        id: 'ORD001',
        date: new Date('2024-03-15'),
        products: [{ id: 'PRD001', name: 'Sách IELTS Reading' }],
        status: 'completed',
        total: '450.000đ'
      }
    ],
    purchasedCourses: [
      {
        id: 'CRS001',
        name: 'IELTS 7.0',
        image: 'https://picsum.photos/200',
        progress: 75,
        purchaseDate: new Date('2024-02-01')
      }
    ]
  },
  {
    id: 'CST002',
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0907654321',
    totalOrders: 3,
    totalSpent: '8.000.000đ',
    lastOrder: new Date('2024-03-10'),
    joinDate: new Date('2024-01-15'),
    status: 'active' as const,
    recentOrders: [],
    purchasedCourses: []
  },
  {
    id: 'CST003',
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    phone: '0909876543',
    totalOrders: 1,
    totalSpent: '2.000.000đ',
    lastOrder: new Date('2024-02-28'),
    status: 'inactive' as const,
    joinDate: new Date('2024-02-01'),
    recentOrders: [],
    purchasedCourses: []
  },
  {
    id: 'CST004',
    name: 'Phạm Thị D',
    email: 'phamthid@example.com',
    phone: '0904567890',
    totalOrders: 4,
    totalSpent: '10.000.000đ',
    lastOrder: new Date('2024-03-12'),
    status: 'active' as const,
    joinDate: new Date('2024-01-20'),
    recentOrders: [],
    purchasedCourses: []
  }
]

export const performanceData = [
  { date: 'T2', sales: 2400, target: 2800 },
  { date: 'T3', sales: 3000, target: 2800 },
  { date: 'T4', sales: 2800, target: 2800 },
  { date: 'T5', sales: 3500, target: 2800 },
  { date: 'T6', sales: 4000, target: 2800 },
  { date: 'T7', sales: 3800, target: 2800 },
  { date: 'CN', sales: 4200, target: 2800 }
]

export const salesData = [
  { date: '2024-01', amount: 4000 },
  { date: '2024-02', amount: 3000 },
  { date: '2024-03', amount: 2000 }
]

export const productData = [
  { name: 'IELTS', sales: 4000 },
  { name: 'TOEIC', sales: 3000 },
  { name: 'Kids', sales: 2000 }
]

// Thêm mock data cho combo
export const mockComboProducts: Product[] = [
  {
    id: 'COMBO001',
    name: 'Combo Sách IELTS',
    category: 'book',
    price: '1500000đ',
    originalPrice: '2000000đ',
    stock: 50,
    sold: 20,
    discount: '25%',
    status: 'active',
    image: 'https://picsum.photos/seed/combo1/200/200',
    isCombo: true,
    comboProducts: [
      { id: 'CP001', productId: 'PRD001', quantity: 1 },
      { id: 'CP002', productId: 'PRD002', quantity: 1 }
    ]
  }
]
