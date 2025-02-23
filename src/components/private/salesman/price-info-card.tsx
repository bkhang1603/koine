'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { DollarSign, TrendingDown, Tag, Calculator } from 'lucide-react'

interface PriceInfoCardProps {
  price: string
  originalPrice: string
  discount: string
  type: 'product' | 'course'
}

export function PriceInfoCard({ price, originalPrice, discount, type }: PriceInfoCardProps) {
  // Convert price strings to numbers for calculation
  const currentPrice = parseInt(price.replace(/\D/g, ''))
  const origPrice = parseInt(originalPrice.replace(/\D/g, ''))
  const discountAmount = origPrice - currentPrice
  const discountPercent = parseInt(discount)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin giá</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Giá hiện tại */}
        <div className='p-4 bg-primary/5 rounded-lg space-y-1'>
          <div className='text-sm text-muted-foreground flex items-center gap-2'>
            <DollarSign className='w-4 h-4' />
            <span>Giá {type === 'product' ? 'bán' : 'khóa học'}</span>
          </div>
          <div className='text-3xl font-bold text-primary'>{price}</div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {/* Giá gốc */}
          <div className='p-4 border rounded-lg space-y-1'>
            <div className='text-sm text-muted-foreground flex items-center gap-2'>
              <Tag className='w-4 h-4' />
              <span>Giá gốc</span>
            </div>
            <div className='text-lg line-through text-muted-foreground'>{originalPrice}</div>
          </div>

          {/* Giảm giá */}
          <div className='p-4 border rounded-lg space-y-1'>
            <div className='text-sm text-muted-foreground flex items-center gap-2'>
              <TrendingDown className='w-4 h-4' />
              <span>Giảm giá</span>
            </div>
            <div>
              <Badge variant='secondary' className='text-base font-semibold'>
                -{discount}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Chi tiết giảm giá */}
        <div className='space-y-3'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Calculator className='w-4 h-4' />
            <span>Chi tiết giảm giá</span>
          </div>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Giá gốc</span>
              <span>{originalPrice}</span>
            </div>
            <div className='flex justify-between text-red-500'>
              <span>Giảm {discountPercent}%</span>
              <span>-{discountAmount.toLocaleString()}đ</span>
            </div>
            <Separator className='my-2' />
            <div className='flex justify-between font-medium'>
              <span>Giá cuối</span>
              <span className='text-primary'>{price}</span>
            </div>
          </div>
        </div>

        {/* Thông tin thêm */}
        <div className='text-xs text-muted-foreground'>
          * Giá đã bao gồm thuế VAT
          {type === 'course' && (
            <>
              <br />* Học viên được học trọn đời
              <br />* Cấp chứng chỉ sau khi hoàn thành
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 