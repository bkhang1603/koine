'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Package,
  ArrowLeft,
  Clock,
  CreditCard,
  MapPin,
  Package2,
  CheckCheck,
  Truck,
  PackageCheck,
  ShoppingCart,
  BookOpen,
  User,
  Phone
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Params } from '@/types/query'
import { use } from 'react'

interface OrderItem {
  id: string
  name: string
  price: string
  quantity: number
  image: string
}

interface Order {
  id: string
  date: string
  total: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  courses: OrderItem[]
  products: OrderItem[]
  paymentMethod: string
  customerInfo: {
    name: string
    phone: string
    email: string
    address: string
  }
  timeline: {
    time: string
    status: string
    description: string
  }[]
}

const statusColorMap = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

const statusTextMap = {
  pending: 'Chờ xử lý',
  processing: 'Đang xử lý',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy'
}

export default function OrderDetailPage(props: { params: Params }) {
  const params = use(props.params)

  // Mock data - thay thế bằng API call thực tế
  const order: Order = {
    id: 'ORD-001',
    date: '2024-03-15',
    total: '1,200,000đ',
    status: 'completed',
    courses: [
      {
        id: 'COURSE-1',
        name: 'Kỹ năng giao tiếp cho trẻ 6-8 tuổi',
        price: '800,000đ',
        quantity: 1,
        image: '/courses/communication.jpg'
      }
    ],
    products: [
      {
        id: 'PROD-1',
        name: 'Sách hướng dẫn giới tính lứa tuổi thiếu niên',
        price: '400,000đ',
        quantity: 1,
        image: '/products/book.jpg'
      }
    ],
    paymentMethod: 'Thẻ tín dụng',
    customerInfo: {
      name: 'Nguyễn Văn A',
      phone: '0987654321',
      email: 'nguyenvana@gmail.com',
      address: '123 Đường ABC, Quận XYZ, TP.HCM'
    },
    timeline: [
      {
        time: '15/03/2024 08:00',
        status: 'Đã đặt hàng',
        description: 'Đơn hàng đã được tạo'
      },
      {
        time: '15/03/2024 08:05',
        status: 'Đã thanh toán',
        description: 'Thanh toán thành công qua thẻ tín dụng'
      },
      {
        time: '15/03/2024 09:00',
        status: 'Hoàn thành',
        description: 'Đơn hàng đã được xử lý hoàn tất'
      }
    ]
  }

  return (
    <div className='container max-w-7xl mx-auto py-6'>
      {/* Back button */}
      <Button variant='ghost' asChild>
        <Link href='/setting/order' className='flex items-center gap-2'>
          <ArrowLeft className='h-4 w-4' />
          Quay lại danh sách đơn hàng
        </Link>
      </Button>

      {/* Header */}
      <div className='mt-6 mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-3xl font-bold'>Chi tiết đơn hàng #{params.id}</h1>
          <Badge className={`${statusColorMap[order.status]} px-4 py-1 text-base`}>{statusTextMap[order.status]}</Badge>
        </div>
        <div className='flex items-center gap-6 text-sm text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            Đặt hàng ngày {order.date}
          </div>
          <div className='flex items-center gap-2'>
            <CreditCard className='h-4 w-4' />
            {order.paymentMethod}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Courses Section */}
              {order.courses.length > 0 && (
                <div>
                  <div className='flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground'>
                    <BookOpen className='h-4 w-4' />
                    <span>Khóa học ({order.courses.length})</span>
                  </div>
                  <div className='space-y-4'>
                    {order.courses.map((course) => (
                      <div key={course.id} className='flex gap-4 p-4 rounded-lg bg-muted/30'>
                        <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                          <Image src={course.image} alt={course.name} fill className='object-cover' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-medium text-lg truncate'>{course.name}</h3>
                          <p className='text-primary font-medium mt-2'>{course.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Section */}
              {order.products.length > 0 && (
                <div>
                  <div className='flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground'>
                    <Package className='h-4 w-4' />
                    <span>Sản phẩm ({order.products.length})</span>
                  </div>
                  <div className='space-y-4'>
                    {order.products.map((product) => (
                      <div key={product.id} className='flex gap-4 p-4 rounded-lg bg-muted/30'>
                        <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                          <Image src={product.image} alt={product.name} fill className='object-cover' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-medium text-lg truncate'>{product.name}</h3>
                          <div className='flex items-center gap-2 mt-2'>
                            <p className='text-primary font-medium'>{product.price}</p>
                            <span className='text-sm text-muted-foreground'>× {product.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Order Total */}
              <div className='flex justify-between items-center pt-4'>
                <span className='font-medium'>Tổng thanh toán</span>
                <span className='text-xl font-bold text-primary'>{order.total}</span>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='relative space-y-6'>
                {order.timeline.map((item, index) => (
                  <div key={index} className='flex gap-4'>
                    <div className='flex flex-col items-center'>
                      {getStatusIcon(item.status, true)}
                      {index !== order.timeline.length - 1 && <div className='w-px h-full bg-border mt-2' />}
                    </div>
                    <div className='flex-1 pb-6'>
                      <div className='text-sm text-muted-foreground'>{item.time}</div>
                      <div className='font-medium mt-1'>{item.status}</div>
                      <div className='text-sm text-muted-foreground mt-1'>{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 text-sm'>
                <div className='flex items-center gap-3'>
                  <User className='h-4 w-4 text-muted-foreground' />
                  <div>
                    <div className='text-muted-foreground'>Họ tên</div>
                    <div className='font-medium'>{order.customerInfo.name}</div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Phone className='h-4 w-4 text-muted-foreground' />
                  <div>
                    <div className='text-muted-foreground'>Số điện thoại</div>
                    <div className='font-medium'>{order.customerInfo.phone}</div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <MapPin className='h-4 w-4 text-muted-foreground' />
                  <div>
                    <div className='text-muted-foreground'>Địa chỉ</div>
                    <div className='font-medium'>{order.customerInfo.address}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {order.status === 'pending' && (
            <Button variant='destructive' className='w-full'>
              Hủy đơn hàng
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function getStatusIcon(status: string, isCompleted: boolean) {
  const commonClasses = 'h-4 w-4'

  if (!isCompleted) {
    return <div className={`${commonClasses} animate-pulse rounded-full bg-gray-300`} />
  }

  switch (status.toLowerCase()) {
    case 'đơn hàng đã đặt':
      return <ShoppingCart className={`${commonClasses} text-primary`} />
    case 'đã xác nhận thanh toán':
      return <CreditCard className={`${commonClasses} text-primary`} />
    case 'đang xử lý':
      return <Package2 className={`${commonClasses} text-primary`} />
    case 'đang vận chuyển':
      return <Truck className={`${commonClasses} text-primary`} />
    case 'hoàn thành':
      return <CheckCheck className={`${commonClasses} text-primary`} />
    default:
      return <PackageCheck className={`${commonClasses} text-primary`} />
  }
}
