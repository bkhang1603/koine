'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Calendar, RefreshCcw, Receipt, User, CheckCircle2, XCircle, CircleDot } from 'lucide-react'
import Link from 'next/link'

interface RefundItem {
  id: string
  orderId: string
  orderDate: string
  requestDate: string
  type: 'refund' | 'return'
  reason: string
  status: 'pending' | 'processing' | 'approved' | 'rejected'
  amount: string
  items: {
    id: string
    name: string
    type: 'course' | 'product'
    price: string
    image: string
  }[]
  timeline: {
    time: string
    status: string
    description: string
  }[]
  messages: {
    time: string
    content: string
    isAdmin: boolean
  }[]
}

const statusColorMap = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
}

const statusTextMap = {
  pending: 'Chờ xử lý',
  processing: 'Đang xử lý',
  approved: 'Đã duyệt',
  rejected: 'Đã từ chối'
}

export default function RefundDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  // Mock data - thay thế bằng API call thực tế
  const refund: RefundItem = {
    id: 'REF-001',
    orderId: 'ORD-001',
    orderDate: '15/03/2024',
    requestDate: '18/03/2024',
    type: 'refund',
    reason: 'Khóa học không phù hợp với độ tuổi của con',
    status: 'processing',
    amount: '800,000đ',
    items: [
      {
        id: 'COURSE-1',
        name: 'Kỹ năng giao tiếp cho trẻ 6-8 tuổi',
        type: 'course',
        price: '800,000đ',
        image: '/courses/communication.jpg'
      }
    ],
    timeline: [
      {
        time: '18/03/2024 10:00',
        status: 'Đã tạo yêu cầu',
        description: 'Yêu cầu hoàn tiền đã được tạo'
      },
      {
        time: '18/03/2024 10:30',
        status: 'Đang xử lý',
        description: 'Nhân viên đang xem xét yêu cầu của bạn'
      }
    ],
    messages: [
      {
        time: '18/03/2024 10:00',
        content: 'Tôi muốn hoàn tiền vì khóa học không phù hợp với độ tuổi của con tôi.',
        isAdmin: false
      },
      {
        time: '18/03/2024 10:30',
        content: 'Chúng tôi đã nhận được yêu cầu và đang xem xét. Vui lòng đợi phản hồi trong 24h.',
        isAdmin: true
      }
    ]
  }

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-6'>
      {/* Back button */}
      <Button variant='ghost' asChild>
        <Link href='/setting/refund' className='flex items-center gap-2'>
          <ArrowLeft className='h-4 w-4' />
          Quay lại danh sách
        </Link>
      </Button>

      {/* Header */}
      <div className='mt-6 mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-3xl font-bold'>Chi tiết yêu cầu #{params.id}</h1>
          <Badge className={statusColorMap[refund.status]}>{statusTextMap[refund.status]}</Badge>
        </div>
        <div className='flex items-center gap-6 text-sm text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <Receipt className='h-4 w-4' />
            Đơn hàng: #{refund.orderId}
          </div>
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4' />
            Ngày đặt: {refund.orderDate}
          </div>
          <div className='flex items-center gap-2'>
            <RefreshCcw className='h-4 w-4' />
            Ngày yêu cầu: {refund.requestDate}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm yêu cầu hoàn tiền</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {refund.items.map((item) => (
                <div key={item.id} className='flex gap-4 p-4 rounded-lg bg-muted/30'>
                  <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                    <div className='w-full h-full bg-muted' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Badge variant='outline' className='capitalize'>
                        {item.type === 'course' ? 'Khóa học' : 'Sản phẩm'}
                      </Badge>
                    </div>
                    <h3 className='font-medium text-lg'>{item.name}</h3>
                    <p className='text-primary font-medium mt-2'>{item.price}</p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className='flex justify-between items-center'>
                <span className='font-medium'>Số tiền hoàn trả</span>
                <span className='text-xl font-bold text-primary'>{refund.amount}</span>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Tin nhắn trao đổi</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {refund.messages.map((message, index) => (
                <div key={index} className={`flex gap-4 ${message.isAdmin ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                    ${message.isAdmin ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <User className={`w-4 h-4 ${message.isAdmin ? 'text-primary-foreground' : 'text-foreground'}`} />
                  </div>
                  <div
                    className={`flex-1 rounded-lg p-4 
                    ${message.isAdmin ? 'bg-muted' : 'bg-primary/10'}`}
                  >
                    <div className='text-sm text-muted-foreground mb-1'>{message.time}</div>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái yêu cầu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='relative space-y-6'>
                {refund.timeline.map((item, index) => (
                  <div key={index} className='flex gap-4'>
                    <div className='flex flex-col items-center'>
                      {getStatusIcon(item.status)}
                      {index !== refund.timeline.length - 1 && <div className='w-px h-full bg-border mt-2' />}
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

          {/* Reason */}
          <Card>
            <CardHeader>
              <CardTitle>Lý do yêu cầu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm'>{refund.reason}</p>
            </CardContent>
          </Card>

          {/* Actions */}
          {refund.status === 'pending' && (
            <Button variant='destructive' className='w-full'>
              Hủy yêu cầu
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function getStatusIcon(status: string) {
  const commonClasses = 'h-4 w-4'

  switch (status.toLowerCase()) {
    case 'đã tạo yêu cầu':
      return <RefreshCcw className={`${commonClasses} text-primary`} />
    case 'đang xử lý':
      return <CircleDot className={`${commonClasses} text-primary`} />
    case 'đã duyệt':
      return <CheckCircle2 className={`${commonClasses} text-primary`} />
    case 'đã từ chối':
      return <XCircle className={`${commonClasses} text-destructive`} />
    default:
      return <CircleDot className={`${commonClasses} text-primary`} />
  }
}
