'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { KeyRound, Smartphone, Shield, History } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className='max-w-4xl mx-auto space-y-8'>
      {/* Header */}
      <div>
        <h3 className='text-2xl font-semibold'>Bảo mật tài khoản</h3>
        <p className='text-sm text-gray-500 mt-1'>Thiết lập các tùy chọn bảo mật để bảo vệ tài khoản của bạn</p>
      </div>

      <div className='space-y-6'>
        {/* Password Section */}
        <Card className='border-none shadow-md'>
          <CardHeader className='pb-6 border-b'>
            <CardTitle className='flex items-center gap-2 text-lg font-medium'>
              <KeyRound className='w-5 h-5 text-primary' />
              Thay đổi mật khẩu
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='max-w-xl space-y-4'>
              <div>
                <Label className='text-sm text-gray-600 mb-1.5 block'>Mật khẩu hiện tại</Label>
                <Input type='password' className='h-10 border-gray-200' />
              </div>
              <div>
                <Label className='text-sm text-gray-600 mb-1.5 block'>Mật khẩu mới</Label>
                <Input type='password' className='h-10 border-gray-200' />
              </div>
              <div>
                <Label className='text-sm text-gray-600 mb-1.5 block'>Xác nhận mật khẩu mới</Label>
                <Input type='password' className='h-10 border-gray-200' />
              </div>
              <Button className='mt-2 bg-primary/5 text-primary hover:bg-primary/10'>Đổi mật khẩu</Button>
            </div>
          </CardContent>
        </Card>

        {/* 2FA Section */}
        <Card className='border-none shadow-md'>
          <CardHeader className='pb-6 border-b'>
            <CardTitle className='flex items-center gap-2 text-lg font-medium'>
              <Smartphone className='w-5 h-5 text-primary' />
              Xác thực hai yếu tố
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6 space-y-6'>
            <div className='flex items-center justify-between'>
              <div>
                <Label className='font-medium block mb-0.5'>Bảo mật hai lớp</Label>
                <p className='text-sm text-gray-500'>Thêm một lớp bảo mật cho tài khoản của bạn</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div>
                <Label className='font-medium block mb-0.5'>Thông báo đăng nhập</Label>
                <p className='text-sm text-gray-500'>Nhận email thông báo khi có đăng nhập mới</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Login History */}
        <Card className='border-none shadow-md'>
          <CardHeader className='pb-6 border-b'>
            <CardTitle className='flex items-center gap-2 text-lg font-medium'>
              <History className='w-5 h-5 text-primary' />
              Lịch sử đăng nhập
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='space-y-6'>
              {[
                {
                  device: 'Chrome trên Windows',
                  location: 'Ho Chi Minh City, Vietnam',
                  time: '2 phút trước',
                  current: true
                },
                {
                  device: 'Safari trên iPhone',
                  location: 'Ho Chi Minh City, Vietnam',
                  time: '1 ngày trước'
                }
              ].map((session, i) => (
                <div key={i} className='flex items-center justify-between'>
                  <div>
                    <div className='flex items-center gap-2 mb-0.5'>
                      <span className='font-medium'>{session.device}</span>
                      {session.current && (
                        <span className='text-xs bg-primary/5 text-primary px-2 py-0.5 rounded-full font-medium'>
                          Hiện tại
                        </span>
                      )}
                    </div>
                    <p className='text-sm text-gray-500'>{session.location}</p>
                    <p className='text-xs text-gray-400 mt-0.5'>{session.time}</p>
                  </div>
                  {!session.current && (
                    <Button variant='outline' size='sm' className='h-9'>
                      Đăng xuất
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
