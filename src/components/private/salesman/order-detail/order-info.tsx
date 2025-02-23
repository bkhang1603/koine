'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import type { Order } from '@/app/(private)/salesman/_mock/data'

export function OrderInfo({ order }: { order: Order }) {
  return (
    <div className='col-span-2 space-y-6'>
      {/* Sản phẩm */}
      {order.products && order.products.length > 0 && (
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <Package className='w-5 h-5' />
              <span>Sản phẩm ({order.products.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {order.products.map((product) => (
              <div key={product.id} className='flex gap-4'>
                <div className='relative w-20 h-20 rounded-lg overflow-hidden border'>
                  <Image src={product.image} alt={product.name} fill className='object-cover' />
                </div>
                <div className='flex-1'>
                  <div className='font-medium'>{product.name}</div>
                  <div className='text-sm text-muted-foreground mt-1'>Số lượng: {product.quantity}</div>
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='text-sm line-through text-muted-foreground'>{product.originalPrice}</span>
                    <span className='font-medium'>{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Khóa học */}
      {order.courses && order.courses.length > 0 && (
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <GraduationCap className='w-5 h-5' />
              <span>Khóa học ({order.courses.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {order.courses.map((course) => (
              <div key={course.id} className='flex gap-4'>
                <div className='relative w-20 h-20 rounded-lg overflow-hidden border'>
                  <Image src={course.image} alt={course.name} fill className='object-cover' />
                </div>
                <div className='flex-1'>
                  <div className='font-medium'>{course.name}</div>
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='text-sm line-through text-muted-foreground'>{course.originalPrice}</span>
                    <span className='font-medium'>{course.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 