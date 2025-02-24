'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  FileText,
  Package,
  ArrowLeft,
  Clock,
  CreditCard,
  MapPin,
  CheckCircle2,
  CircleDot,
  Circle,
  Package2,
  CheckCheck,
  Truck,
  PackageCheck,
  ShoppingCart
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const orderDetail = {
  id: 'ORD001',
  date: '2024-03-15',
  status: 'processing',
  total: 2498000,
  subtotal: 2298000,
  shipping: 200000,
  paymentMethod: 'Thẻ tín dụng (VISA ****1234)',
  shippingAddress: {
    name: 'Nguyễn Văn A',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP. Hồ Chí Minh'
  },
  items: [
    {
      id: 1,
      title: 'Kỹ năng giao tiếp hiệu quả',
      price: 599000,
      thumbnail: '/placeholder.svg?height=100&width=200',
      type: 'course',
      duration: '4h 30m',
      level: 'Cơ bản'
    },
    {
      id: 2,
      title: 'Bộ sách Rèn luyện tư duy',
      price: 899000,
      thumbnail: '/placeholder.svg?height=100&width=200',
      type: 'book',
      quantity: 1,
      variant: 'Bản cứng'
    },
    {
      id: 3,
      title: 'Hộp quà Học tập thông minh',
      price: 800000,
      thumbnail: '/placeholder.svg?height=100&width=200',
      type: 'gift_box',
      quantity: 1,
      includes: ['Sổ tay', 'Bút cao cấp', 'Đèn học', 'Bookmark']
    }
  ],
  timeline: [
    {
      status: 'Đơn hàng đã đặt',
      date: '15/03/2024 09:30',
      description: 'Đơn hàng của bạn đã được tạo thành công',
      isCompleted: true
    },
    {
      status: 'Đã xác nhận thanh toán',
      date: '15/03/2024 09:35',
      description: 'Thanh toán của bạn đã được xác nhận',
      isCompleted: true
    },
    {
      status: 'Đang xử lý',
      date: '15/03/2024 09:40',
      description: 'Đơn hàng đang được chuẩn bị',
      isCompleted: true
    },
    {
      status: 'Đang vận chuyển',
      date: '15/03/2024 10:30',
      description: 'Đơn hàng đang được giao đến bạn',
      isCompleted: false
    },
    {
      status: 'Hoàn thành',
      date: 'Đang chờ',
      description: 'Đơn hàng được giao thành công',
      isCompleted: false
    }
  ]
}

export default function OrderDetailPage() {
  return (
    <div className='space-y-6'>
      {/* Header - New Design */}
      <div>
        <Link href='/setting/order'>
          <Button variant='ghost' size='sm' className='mb-4'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Quay lại danh sách đơn hàng
          </Button>
        </Link>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className='space-y-1'>
            <h3 className='text-2xl font-semibold'>Đơn hàng #{orderDetail.id}</h3>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <p className='text-sm'>Đặt ngày {orderDetail.date}</p>
              <span>•</span>
              <Badge variant={orderDetail.status === 'processing' ? 'default' : 'green'}>
                {orderDetail.status === 'processing' ? 'Đang xử lý' : 'Hoàn thành'}
              </Badge>
            </div>
          </div>
          <Button variant='outline'>
            <FileText className='w-4 h-4 mr-2' />
            Tải hóa đơn PDF
          </Button>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        {/* Order Summary */}
        <div className='md:col-span-2 space-y-6'>
          {/* Order Status - New Design */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Package2 className='w-5 h-5' />
                Theo dõi đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className='relative ms-3 border-s border-gray-200'>
                {orderDetail.timeline.map((item, index) => (
                  <li key={index} className={`mb-8 ms-6 ${item.isCompleted ? 'text-primary' : 'text-gray-500'}`}>
                    <span className='absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white'>
                      {getStatusIcon(item.status, item.isCompleted)}
                    </span>
                    <div className='flex flex-col gap-0.5'>
                      <time className='mb-1 text-sm font-normal'>{item.date}</time>
                      <h4 className='text-base font-semibold'>{item.status}</h4>
                      <p className={`text-sm ${item.isCompleted ? 'text-muted-foreground' : 'text-gray-500'}`}>
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {orderDetail.items.map((item) => (
                <div key={item.id} className='flex gap-4 p-4 bg-gray-50 rounded-lg'>
                  <div className='relative w-32 h-20'>
                    <Image src={item.thumbnail} alt={item.title} fill className='object-cover rounded-md' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h4 className='font-medium'>{item.title}</h4>
                        <div className='flex items-center gap-2 mt-1'>
                          {item.type === 'course' ? (
                            <>
                              <Badge variant='secondary'>{item.level}</Badge>
                              <span className='text-sm text-muted-foreground flex items-center gap-1'>
                                <Clock className='w-4 h-4' />
                                {item.duration}
                              </span>
                            </>
                          ) : item.type === 'book' ? (
                            <Badge variant='outline'>{item.variant}</Badge>
                          ) : (
                            <div className='text-sm text-muted-foreground'>{item.includes?.join(' • ')}</div>
                          )}
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='font-medium'>{item.price.toLocaleString('vi-VN')} VNĐ</p>
                        {'quantity' in item && <p className='text-sm text-muted-foreground'>x{item.quantity}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Separator />
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Tạm tính</span>
                  <span>{orderDetail.subtotal.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Phí vận chuyển</span>
                  <span>{orderDetail.shipping.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <Separator />
                <div className='flex justify-between items-center pt-2'>
                  <p className='font-medium'>Tổng cộng</p>
                  <p className='text-lg font-bold'>{orderDetail.total.toLocaleString('vi-VN')} VNĐ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Info */}
        <div className='space-y-6'>
          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <CreditCard className='w-5 h-5' />
                Thông tin thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Phương thức thanh toán</p>
                <p className='font-medium'>{orderDetail.paymentMethod}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Trạng thái</p>
                <Badge variant='green'>Đã thanh toán</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <MapPin className='w-5 h-5' />
                Thông tin người mua
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Họ và tên</p>
                <p className='font-medium'>{orderDetail.shippingAddress.name}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Số điện thoại</p>
                <p className='font-medium'>{orderDetail.shippingAddress.phone}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Địa chỉ</p>
                <p className='font-medium'>{orderDetail.shippingAddress.address}</p>
              </div>
            </CardContent>
          </Card>
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
