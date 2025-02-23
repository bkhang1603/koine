'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, GraduationCap, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import type { Customer } from '@/app/(private)/salesman/_mock/data'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export function CustomerInfo({ customer }: { customer: Customer }) {
  return (
    <div className='col-span-2 space-y-6'>
      {/* Đơn hàng gần đây */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='flex items-center gap-2'>
            <ShoppingBag className='w-5 h-5' />
            <span>Đơn hàng gần đây</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {customer.recentOrders?.map((order) => (
            <div key={order.id} className='flex items-center gap-4 p-4 rounded-lg border'>
              <div className='flex-1'>
                <div className='flex items-center justify-between'>
                  <span className='font-medium text-primary'>{order.id}</span>
                  <span className='text-sm text-muted-foreground'>
                    {format(order.date, 'dd/MM/yyyy HH:mm', { locale: vi })}
                  </span>
                </div>
                <div className='mt-2 flex items-center gap-4'>
                  {order.products && (
                    <div className='flex items-center gap-1 text-sm'>
                      <Package className='w-4 h-4 text-muted-foreground' />
                      <span>{order.products.length} sản phẩm</span>
                    </div>
                  )}
                  {order.courses && (
                    <div className='flex items-center gap-1 text-sm'>
                      <GraduationCap className='w-4 h-4 text-muted-foreground' />
                      <span>{order.courses.length} khóa học</span>
                    </div>
                  )}
                </div>
                <div className='mt-2 flex items-center justify-between'>
                  <div className='text-sm text-muted-foreground'>{order.status}</div>
                  <div className='font-medium'>{order.total}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Khóa học đã mua */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='flex items-center gap-2'>
            <GraduationCap className='w-5 h-5' />
            <span>Khóa học đã mua</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {customer.purchasedCourses?.map((course) => (
            <div key={course.id} className='flex gap-4'>
              <div className='relative w-20 h-20 rounded-lg overflow-hidden border'>
                <Image src={course.image} alt={course.name} fill className='object-cover' />
              </div>
              <div className='flex-1'>
                <div className='font-medium'>{course.name}</div>
                <div className='text-sm text-muted-foreground mt-1'>{course.progress}% hoàn thành</div>
                <div className='text-sm text-muted-foreground mt-1'>
                  Mua ngày {format(course.purchaseDate, 'dd/MM/yyyy', { locale: vi })}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
} 