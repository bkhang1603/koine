'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, ArrowRight, Clock, Calendar } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

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

const typeTextMap = {
  refund: 'Hoàn tiền',
  return: 'Đổi trả'
}

// Mock data
const refunds: RefundItem[] = [
  {
    id: 'REF-001',
    orderId: 'ORD-001',
    orderDate: '15/03/2024',
    requestDate: '18/03/2024',
    type: 'refund',
    reason: 'Khóa học không phù hợp với độ tuổi của con',
    status: 'pending',
    amount: '800,000đ',
    items: [
      {
        id: 'COURSE-1',
        name: 'Kỹ năng giao tiếp cho trẻ 6-8 tuổi',
        type: 'course',
        price: '800,000đ',
        image: '/courses/communication.jpg'
      }
    ]
  }
  // Thêm mock data khác...
]

export default function RefundPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [type, setType] = useState('all')

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold'>Hoàn tiền & Đổi trả</h1>
        <p className='text-muted-foreground mt-1'>Quản lý yêu cầu hoàn tiền và đổi trả của bạn</p>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Tìm kiếm theo mã đơn hàng...'
            className='pl-9'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Loại yêu cầu' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả loại</SelectItem>
            <SelectItem value='refund'>Hoàn tiền</SelectItem>
            <SelectItem value='return'>Đổi trả</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả trạng thái</SelectItem>
            <SelectItem value='pending'>Chờ xử lý</SelectItem>
            <SelectItem value='processing'>Đang xử lý</SelectItem>
            <SelectItem value='approved'>Đã duyệt</SelectItem>
            <SelectItem value='rejected'>Đã từ chối</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Refund List */}
      <div className='space-y-4'>
        {refunds.map((refund) => (
          <Card key={refund.id} className='overflow-hidden hover:border-primary/50 transition-colors'>
            <Link href={`/setting/refund/${refund.id}`}>
              <CardContent className='p-6'>
                <div className='flex flex-col gap-6'>
                  {/* Header */}
                  <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-medium'>Yêu cầu #{refund.id}</h3>
                        <Badge variant='outline'>{typeTextMap[refund.type]}</Badge>
                        <Badge className={statusColorMap[refund.status]}>{statusTextMap[refund.status]}</Badge>
                      </div>
                      <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          Đơn hàng: #{refund.orderId} - {refund.orderDate}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='h-4 w-4' />
                          Yêu cầu: {refund.requestDate}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className='h-5 w-5 text-muted-foreground' />
                  </div>

                  <Separator />

                  {/* Items */}
                  <div className='space-y-3'>
                    <div className='text-sm font-medium text-muted-foreground'>Sản phẩm yêu cầu</div>
                    <div className='space-y-4'>
                      {refund.items.map((item) => (
                        <div key={item.id} className='flex gap-4 p-4 rounded-lg bg-muted/30'>
                          <div className='relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0'>
                            <div className='w-full h-full bg-muted' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2'>
                              <Badge variant='outline' className='capitalize'>
                                {item.type === 'course' ? 'Khóa học' : 'Sản phẩm'}
                              </Badge>
                            </div>
                            <h4 className='font-medium mt-1 truncate'>{item.name}</h4>
                            <p className='text-sm text-primary mt-1'>{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Footer */}
                  <div className='flex items-center justify-between'>
                    <div className='max-w-[60%]'>
                      <div className='text-sm text-muted-foreground mb-1'>Lý do</div>
                      <p className='text-sm truncate'>{refund.reason}</p>
                    </div>
                    <div className='text-right'>
                      <div className='text-sm text-muted-foreground mb-1'>Số tiền hoàn trả</div>
                      <div className='text-lg font-bold text-primary'>{refund.amount}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#' isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
