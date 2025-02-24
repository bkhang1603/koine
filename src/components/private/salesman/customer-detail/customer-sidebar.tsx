'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, Phone, Calendar, ShoppingBag, DollarSign } from 'lucide-react'
import type { Customer } from '@/app/(private)/salesman/_mock/data'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'

export function CustomerSidebar({ customer }: { customer: Customer }) {
  return (
    <div className='space-y-6'>
      {/* Thông tin cá nhân */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <User className='w-4 h-4' />
              <span>Họ tên:</span>
            </div>
            <div>{customer.name}</div>
          </div>

          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <Mail className='w-4 h-4' />
              <span>Email:</span>
            </div>
            <div>{customer.email}</div>
          </div>

          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <Phone className='w-4 h-4' />
              <span>Số điện thoại:</span>
            </div>
            <div>{customer.phone}</div>
          </div>

          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <Calendar className='w-4 h-4' />
              <span>Ngày tham gia:</span>
            </div>
            <div>{format(customer.joinDate, 'dd/MM/yyyy', { locale: vi })}</div>
          </div>

          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <ShoppingBag className='w-4 h-4' />
              <span>Trạng thái:</span>
            </div>
            <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
              {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Thống kê */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <ShoppingBag className='w-4 h-4' />
              <span>Tổng đơn hàng:</span>
            </div>
            <div>{customer.totalOrders} đơn</div>
          </div>

          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <DollarSign className='w-4 h-4' />
              <span>Tổng chi tiêu:</span>
            </div>
            <div>{customer.totalSpent}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 