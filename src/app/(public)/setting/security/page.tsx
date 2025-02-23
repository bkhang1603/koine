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
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Bảo mật</h3>
        <p className='text-sm text-muted-foreground'>Bảo vệ tài khoản của bạn</p>
      </div>
      <Separator />

      <div className='grid gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <KeyRound className='w-5 h-5' />
              Mật khẩu
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label>Mật khẩu hiện tại</Label>
                <Input type='password' />
              </div>
              <div className='grid gap-2'>
                <Label>Mật khẩu mới</Label>
                <Input type='password' />
              </div>
              <div className='grid gap-2'>
                <Label>Xác nhận mật khẩu mới</Label>
                <Input type='password' />
              </div>
            </div>
            <Button>Đổi mật khẩu</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Smartphone className='w-5 h-5' />
              Xác thực 2 lớp
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Bảo mật 2 lớp</Label>
                <p className='text-sm text-muted-foreground'>Bảo vệ tài khoản bằng xác thực 2 lớp</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Thông báo đăng nhập</Label>
                <p className='text-sm text-muted-foreground'>Nhận thông báo khi có đăng nhập mới</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <History className='w-5 h-5' />
              Lịch sử đăng nhập
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
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
                  <div className='space-y-1'>
                    <p className='font-medium flex items-center gap-2'>
                      {session.device}
                      {session.current && (
                        <span className='text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full'>
                          Hiện tại
                        </span>
                      )}
                    </p>
                    <p className='text-sm text-muted-foreground'>{session.location}</p>
                    <p className='text-xs text-muted-foreground'>{session.time}</p>
                  </div>
                  {!session.current && (
                    <Button variant='outline' size='sm'>
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