'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
  return (
    <div className='container max-w-3xl mx-auto px-4 py-6'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Cài đặt tài khoản</h1>
        <p className='text-sm text-muted-foreground mt-1'>Quản lý thông tin và cài đặt tài khoản của bạn</p>
      </div>

      {/* Profile Section */}
      <div className='space-y-6 pb-6'>
        <div>
          <h2 className='text-lg font-semibold'>Hồ sơ</h2>
          <p className='text-sm text-muted-foreground'>Thông tin cá nhân của bạn</p>
        </div>

        <div className='flex items-center gap-6'>
          <Avatar className='w-20 h-20'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button variant='outline' size='sm' className='gap-2'>
            <Camera className='w-4 h-4' />
            Thay đổi ảnh
          </Button>
        </div>

        <div className='grid gap-4'>
          <div className='space-y-2'>
            <Label>Họ và tên</Label>
            <Input placeholder='Nhập họ và tên' />
          </div>
          <div className='space-y-2'>
            <Label>Email</Label>
            <Input type='email' placeholder='example@email.com' />
          </div>
          <div className='space-y-2'>
            <Label>Giới thiệu</Label>
            <Textarea placeholder='Giới thiệu về bản thân' className='resize-none' rows={4} />
          </div>
        </div>

        <div className='flex justify-end'>
          <Button>Lưu thay đổi</Button>
        </div>
      </div>

      <Separator className='my-8' />

      {/* Notifications Section */}
      <div className='space-y-6 pb-6'>
        <div>
          <h2 className='text-lg font-semibold'>Thông báo</h2>
          <p className='text-sm text-muted-foreground'>Tùy chỉnh cách bạn nhận thông báo</p>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center justify-between py-3'>
            <div>
              <Label>Bình luận mới</Label>
              <p className='text-sm text-muted-foreground'>Nhận thông báo khi có bình luận mới</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className='flex items-center justify-between py-3'>
            <div>
              <Label>Đánh giá mới</Label>
              <p className='text-sm text-muted-foreground'>Nhận thông báo khi có đánh giá mới</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className='flex items-center justify-between py-3'>
            <div>
              <Label>Cập nhật hệ thống</Label>
              <p className='text-sm text-muted-foreground'>Nhận thông báo về các cập nhật từ hệ thống</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <Separator className='my-8' />

      {/* Security Section */}
      <div className='space-y-6'>
        <div>
          <h2 className='text-lg font-semibold'>Bảo mật</h2>
          <p className='text-sm text-muted-foreground'>Bảo vệ tài khoản của bạn</p>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label>Mật khẩu hiện tại</Label>
            <Input type='password' />
          </div>
          <div className='space-y-2'>
            <Label>Mật khẩu mới</Label>
            <Input type='password' />
          </div>
          <div className='space-y-2'>
            <Label>Xác nhận mật khẩu mới</Label>
            <Input type='password' />
          </div>
        </div>

        <div className='flex justify-end'>
          <Button>Cập nhật mật khẩu</Button>
        </div>
      </div>
    </div>
  )
}
