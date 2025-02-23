'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { MapPin, Plus, Trash2 } from 'lucide-react'

export default function AddressPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Địa chỉ</h3>
        <p className='text-sm text-muted-foreground'>Quản lý địa chỉ giao hàng và thanh toán của bạn</p>
      </div>
      <Separator />

      <Button>
        <Plus className='w-4 h-4 mr-2' />
        Thêm địa chỉ mới
      </Button>

      <div className='grid gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <MapPin className='w-5 h-5' />
              Địa chỉ mặc định
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid gap-6'>
              <div className='grid gap-2'>
                <Label>Họ và tên</Label>
                <Input defaultValue='Nguyễn Văn A' />
              </div>
              <div className='grid gap-2'>
                <Label>Số điện thoại</Label>
                <Input defaultValue='0123456789' />
              </div>
              <div className='grid gap-2'>
                <Label>Địa chỉ chi tiết</Label>
                <Input defaultValue='123 Đường ABC' />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label>Tỉnh/Thành phố</Label>
                  <Input defaultValue='Hồ Chí Minh' />
                </div>
                <div className='grid gap-2'>
                  <Label>Quận/Huyện</Label>
                  <Input defaultValue='Quận 1' />
                </div>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <Button variant='outline' className='text-red-500'>
                <Trash2 className='w-4 h-4 mr-2' />
                Xóa địa chỉ
              </Button>
              <Button>Cập nhật</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 