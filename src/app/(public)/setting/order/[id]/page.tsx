'use client'
import { use } from 'react'

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
  CheckCheck,
  Truck,
  ShoppingCart,
  BookOpen,
  User,
  Phone,
  AlertCircle,
  Package2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useGetOrder } from '@/queries/useOrder'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import Loading from '@/components/loading'

type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'
type PaymentMethod = 'vnpay' | 'cod'

const statusColorMap: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200'
}

const statusTextMap: Record<OrderStatus, string> = {
  pending: 'Chờ xử lý',
  processing: 'Đang xử lý',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy'
}

const paymentMethodMap: Record<PaymentMethod, string> = {
  vnpay: 'Thanh toán VNPay',
  cod: 'Thanh toán khi nhận hàng'
}

const MOCK_ORDER = {
  id: 'ORD001',
  userId: 'USR001',
  orderDate: '2024-03-20T08:30:00Z',
  totalAmount: 2500000,
  isDeleted: false,
  createdAt: '2024-03-20T08:30:00Z',
  updatedAt: '2024-03-20T08:30:00Z',
  createdAtFormatted: '20/03/2024 08:30',
  updatedAtFormatted: '20/03/2024 08:30',
  status: 'pending' as OrderStatus,
  orderStatus: [
    {
      status: 'pending',
      createdAt: '2024-03-20T08:30:00Z',
      note: 'Đơn hàng đã được tạo'
    }
  ],
  paymentMethod: 'vnpay' as PaymentMethod,
  shippingAddress: {
    fullName: 'Nguyễn Văn A',
    phone: '0987654321',
    address: '123 Đường ABC, Quận 1, TP.HCM'
  },
  orderDetails: [
    {
      id: 'ITEM001',
      orderId: 'ORD001',
      productId: 'PROD001',
      courseId: null,
      comboId: null,
      quantity: 2,
      unitPrice: 250000,
      discount: 0,
      totalPrice: 500000,
      isDeleted: false,
      createdAt: '2024-03-20T08:30:00Z',
      updatedAt: '2024-03-20T08:30:00Z',
      product: {
        name: 'Sách Giáo Dục Giới Tính',
        description: 'Sách hướng dẫn giáo dục giới tính cho trẻ',
        imageUrl: '/product-1.jpg',
        stockQuantity: 100
      }
    },
    {
      id: 'ITEM002',
      orderId: 'ORD001',
      productId: null,
      courseId: 'COURSE001',
      comboId: null,
      quantity: 1,
      unitPrice: 2000000,
      discount: 0,
      totalPrice: 2000000,
      isDeleted: false,
      createdAt: '2024-03-20T08:30:00Z',
      updatedAt: '2024-03-20T08:30:00Z',
      course: {
        title: 'Khóa học Giới tính và Sự phát triển',
        description: 'Khóa học về giới tính và sự phát triển cho trẻ',
        imageUrl: '/course-1.jpg'
      }
    },
    {
      id: 'ITEM003',
      orderId: 'ORD001',
      productId: null,
      courseId: null,
      comboId: 'COMBO001',
      quantity: 1,
      unitPrice: 3000000,
      discount: 0,
      totalPrice: 3000000,
      isDeleted: false,
      createdAt: '2024-03-20T08:30:00Z',
      updatedAt: '2024-03-20T08:30:00Z',
      combo: {
        name: 'Combo Khóa học Giới tính',
        description: 'Combo khóa học và sách giáo dục giới tính'
      }
    }
  ]
}

export default function OrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { isLoading, error } = useGetOrder({ id: params.id })
  const order = MOCK_ORDER

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loading />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <AlertCircle className='w-12 h-12 text-red-500' />
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>Không tìm thấy đơn hàng</h3>
          <p className='text-gray-500'>Đơn hàng không tồn tại hoặc đã bị xóa</p>
        </div>
        <Button variant='outline' asChild>
          <Link href='/setting/order'>Quay lại danh sách</Link>
        </Button>
      </div>
    )
  }

  // Group order details by type
  const courseItems = order.orderDetails.filter(
    (item) => item.courseId && item.course
  ) as ((typeof order.orderDetails)[0] & { course: NonNullable<(typeof order.orderDetails)[0]['course']> })[]
  const productItems = order.orderDetails.filter(
    (item) => item.productId && item.product
  ) as ((typeof order.orderDetails)[0] & { product: NonNullable<(typeof order.orderDetails)[0]['product']> })[]
  const comboItems = order.orderDetails.filter(
    (item) => item.comboId && item.combo
  ) as ((typeof order.orderDetails)[0] & { combo: NonNullable<(typeof order.orderDetails)[0]['combo']> })[]

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Back button */}
      <Button variant='ghost' asChild className='gap-2 hover:bg-gray-100'>
        <Link href='/setting/order'>
          <ArrowLeft className='h-4 w-4' />
          Quay lại danh sách đơn hàng
        </Link>
      </Button>

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>Chi tiết đơn hàng #{order.id}</h1>
          <Badge className={`${statusColorMap[order.status as OrderStatus]} px-3 py-1 text-sm border`}>
            {statusTextMap[order.status as OrderStatus]}
          </Badge>
        </div>
        <div className='flex items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            {format(new Date(order.orderDate), 'HH:mm - dd/MM/yyyy', { locale: vi })}
          </div>
          <div className='flex items-center gap-2'>
            <CreditCard className='h-4 w-4' />
            {paymentMethodMap[order.paymentMethod as PaymentMethod]}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Order Items */}
          <Card className='border-none shadow-md'>
            <CardHeader>
              <CardTitle className='text-xl'>Chi tiết đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Courses Section */}
              {courseItems.length > 0 && (
                <div>
                  <div className='flex items-center gap-2 mb-4 text-sm font-medium text-gray-500'>
                    <BookOpen className='h-4 w-4' />
                    <span>Khóa học ({courseItems.length})</span>
                  </div>
                  <div className='space-y-4'>
                    {courseItems.map((item) => (
                      <div key={item.id} className='flex gap-4 p-4 rounded-lg bg-gray-50/80'>
                        <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                          <Image src={item.course.imageUrl} alt={item.course.title} fill className='object-cover' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-medium text-gray-900 mb-1'>{item.course.title}</h3>
                          <p className='text-primary font-medium'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                              item.totalPrice
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Section */}
              {productItems.length > 0 && (
                <div>
                  <div className='flex items-center gap-2 mb-4 text-sm font-medium text-gray-500'>
                    <Package className='h-4 w-4' />
                    <span>Sản phẩm ({productItems.length})</span>
                  </div>
                  <div className='space-y-4'>
                    {productItems.map((item) => (
                      <div key={item.id} className='flex gap-4 p-4 rounded-lg bg-gray-50/80'>
                        <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                          <Image src={item.product.imageUrl} alt={item.product.name} fill className='object-cover' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-medium text-gray-900 mb-1'>{item.product.name}</h3>
                          <div className='flex items-center gap-2'>
                            <p className='text-primary font-medium'>
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                item.unitPrice
                              )}
                            </p>
                            <span className='text-sm text-gray-500'>× {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Combo Section */}
              {comboItems.length > 0 && (
                <div>
                  <div className='flex items-center gap-2 mb-4 text-sm font-medium text-gray-500'>
                    <Package2 className='h-4 w-4' />
                    <span>Combo ({comboItems.length})</span>
                  </div>
                  <div className='space-y-4'>
                    {comboItems.map((item) => (
                      <div key={item.id} className='flex gap-4 p-4 rounded-lg bg-gray-50/80'>
                        <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                          <Image src='/placeholder.png' alt={item.combo.name} fill className='object-cover' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-medium text-gray-900 mb-1'>{item.combo.name}</h3>
                          <p className='text-primary font-medium'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                              item.totalPrice
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator className='my-6' />

              {/* Order Total */}
              <div className='flex justify-between items-center'>
                <span className='font-medium text-gray-900'>Tổng thanh toán</span>
                <span className='text-xl font-bold text-primary'>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className='border-none shadow-md'>
            <CardHeader>
              <CardTitle className='text-xl'>Trạng thái đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='relative space-y-6'>
                {order.orderStatus.map((status, index) => (
                  <div key={index} className='flex gap-4'>
                    <div className='flex flex-col items-center'>
                      {getStatusIcon(status.status)}
                      {index !== order.orderStatus.length - 1 && <div className='w-px h-full bg-gray-200 mt-2' />}
                    </div>
                    <div className='flex-1 pb-6'>
                      <div className='text-sm text-gray-500'>
                        {format(new Date(status.createdAt), 'HH:mm - dd/MM/yyyy', { locale: vi })}
                      </div>
                      <div className='font-medium text-gray-900 mt-1'>{status.status}</div>
                      {status.note && <div className='text-sm text-gray-500 mt-1'>{status.note}</div>}
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
          <Card className='border-none shadow-md'>
            <CardHeader>
              <CardTitle className='text-xl'>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center gap-3'>
                <User className='h-4 w-4 text-gray-400' />
                <div>
                  <div className='text-sm text-gray-500'>Họ tên</div>
                  <div className='font-medium text-gray-900'>{order.shippingAddress?.fullName}</div>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <Phone className='h-4 w-4 text-gray-400' />
                <div>
                  <div className='text-sm text-gray-500'>Số điện thoại</div>
                  <div className='font-medium text-gray-900'>{order.shippingAddress?.phone}</div>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <MapPin className='h-4 w-4 text-gray-400' />
                <div>
                  <div className='text-sm text-gray-500'>Địa chỉ</div>
                  <div className='font-medium text-gray-900'>{order.shippingAddress?.address}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {order.status === 'pending' && (
            <Button variant='destructive' className='w-full shadow-lg'>
              Hủy đơn hàng
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function getStatusIcon(status: string) {
  const commonClasses = 'h-8 w-8 p-1.5 rounded-full'

  switch (status.toLowerCase()) {
    case 'pending':
      return <ShoppingCart className={`${commonClasses} bg-primary/10 text-primary`} />
    case 'processing':
      return <Truck className={`${commonClasses} bg-blue-100 text-blue-600`} />
    case 'completed':
      return <CheckCheck className={`${commonClasses} bg-green-100 text-green-600`} />
    case 'cancelled':
      return <AlertCircle className={`${commonClasses} bg-red-100 text-red-600`} />
    default:
      return <AlertCircle className={`${commonClasses} bg-gray-100 text-gray-600`} />
  }
}
