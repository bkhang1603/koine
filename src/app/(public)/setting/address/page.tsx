'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Plus, Trash2, Home, Building2, CheckCircle2, PenLine } from 'lucide-react'

export default function AddressPage() {
  return (
    <div className='max-w-4xl mx-auto space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-2xl font-semibold'>Địa chỉ của tôi</h3>
          <p className='text-sm text-gray-500 mt-1'>Quản lý địa chỉ giao hàng và thanh toán của bạn</p>
        </div>
        <Button className='bg-primary/5 text-primary hover:bg-primary/10 gap-2'>
          <Plus className='w-4 h-4' />
          Thêm địa chỉ mới
        </Button>
      </div>

      <Separator />

      {/* Address List */}
      <div className='grid gap-6'>
        {/* Default Address */}
        <Card className='p-6 border-2 border-primary/10 bg-primary/5'>
          <div className='flex items-start justify-between mb-6'>
            <div className='flex items-center gap-2 text-primary'>
              <Home className='w-5 h-5' />
              <span className='font-medium'>Địa chỉ nhà riêng</span>
              <span className='px-2 py-0.5 bg-primary/10 text-xs rounded-full font-medium'>Mặc định</span>
            </div>
            <div className='flex items-center gap-2'>
              <Button variant='ghost' size='sm' className='h-8 text-gray-500 hover:text-primary'>
                <PenLine className='w-4 h-4' />
              </Button>
              <Button variant='ghost' size='sm' className='h-8 text-gray-500 hover:text-red-500'>
                <Trash2 className='w-4 h-4' />
              </Button>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              <div>
                <Label className='text-gray-500 text-sm'>Họ và tên</Label>
                <div className='font-medium mt-1'>Nguyễn Văn A</div>
              </div>
              <div>
                <Label className='text-gray-500 text-sm'>Số điện thoại</Label>
                <div className='font-medium mt-1'>0123456789</div>
              </div>
            </div>
            <div className='space-y-4'>
              <div>
                <Label className='text-gray-500 text-sm'>Địa chỉ</Label>
                <div className='font-medium mt-1'>123 Đường ABC, Phường XYZ</div>
              </div>
              <div>
                <Label className='text-gray-500 text-sm'>Khu vực</Label>
                <div className='font-medium mt-1'>Quận 1, TP Hồ Chí Minh</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Other Address */}
        <Card className='p-6'>
          <div className='flex items-start justify-between mb-6'>
            <div className='flex items-center gap-2 text-gray-600'>
              <Building2 className='w-5 h-5' />
              <span className='font-medium'>Địa chỉ công ty</span>
            </div>
            <div className='flex items-center gap-2'>
              <Button variant='ghost' size='sm' className='h-8 text-gray-500 hover:text-primary'>
                <CheckCircle2 className='w-4 h-4 mr-1' />
                Đặt mặc định
              </Button>
              <Button variant='ghost' size='sm' className='h-8 text-gray-500 hover:text-primary'>
                <PenLine className='w-4 h-4' />
              </Button>
              <Button variant='ghost' size='sm' className='h-8 text-gray-500 hover:text-red-500'>
                <Trash2 className='w-4 h-4' />
              </Button>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              <div>
                <Label className='text-gray-500 text-sm'>Họ và tên</Label>
                <div className='font-medium mt-1'>Nguyễn Văn A</div>
              </div>
              <div>
                <Label className='text-gray-500 text-sm'>Số điện thoại</Label>
                <div className='font-medium mt-1'>0987654321</div>
              </div>
            </div>
            <div className='space-y-4'>
              <div>
                <Label className='text-gray-500 text-sm'>Địa chỉ</Label>
                <div className='font-medium mt-1'>456 Đường DEF, Phường UVW</div>
              </div>
              <div>
                <Label className='text-gray-500 text-sm'>Khu vực</Label>
                <div className='font-medium mt-1'>Quận 2, TP Hồ Chí Minh</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
