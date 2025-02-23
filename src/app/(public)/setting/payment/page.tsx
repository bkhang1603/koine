'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CreditCard, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'

export default function PaymentPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Phương thức thanh toán</h3>
        <p className='text-sm text-muted-foreground'>Quản lý thông tin thanh toán và thẻ của bạn</p>
      </div>
      <Separator />

      <Button>
        <Plus className='w-4 h-4 mr-2' />
        Thêm thẻ mới
      </Button>

      <div className='grid gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <CreditCard className='w-5 h-5' />
                Thẻ mặc định
              </div>
              <Image src='/visa.png' alt='Visa' width={40} height={40} />
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid gap-6'>
              <div className='grid gap-2'>
                <Label>Tên chủ thẻ</Label>
                <Input defaultValue='NGUYEN VAN A' />
              </div>
              <div className='grid gap-2'>
                <Label>Số thẻ</Label>
                <Input defaultValue='**** **** **** 1234' />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label>Ngày hết hạn</Label>
                  <Input defaultValue='12/25' />
                </div>
                <div className='grid gap-2'>
                  <Label>CVV</Label>
                  <Input defaultValue='***' type='password' />
                </div>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <Button variant='outline' className='text-red-500'>
                <Trash2 className='w-4 h-4 mr-2' />
                Xóa thẻ
              </Button>
              <Button>Cập nhật</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
