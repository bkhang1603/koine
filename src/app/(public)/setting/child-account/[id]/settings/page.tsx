'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { User, KeyRound, Shield, Bell, Upload, Save, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MOCK_ACCOUNT } from '../page'

export default function SettingsPage() {
  const [account] = useState(MOCK_ACCOUNT)

  return (
    <div className='w-full space-y-6'>
      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <User className='w-5 h-5' />
            Thông tin tài khoản
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center gap-6'>
            <Avatar className='w-20 h-20'>
              <AvatarImage src={account.avatar} />
              <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <p className='text-sm text-gray-500 mb-2'>Ảnh đại diện</p>
              <div className='flex gap-2'>
                <Button variant='outline' size='sm'>
                  <Upload className='w-4 h-4 mr-2' />
                  Thay đổi ảnh
                </Button>
                <Button variant='outline' size='sm' className='text-red-500'>
                  <Trash2 className='w-4 h-4 mr-2' />
                  Xóa ảnh
                </Button>
              </div>
            </div>
          </div>
          <Separator />
          <div className='grid gap-6'>
            <div className='grid gap-2'>
              <Label>Tên hiển thị</Label>
              <Input defaultValue={account.name} />
            </div>
            <div className='grid gap-2'>
              <Label>Email</Label>
              <Input defaultValue={account.email} type='email' />
            </div>
            <div className='grid gap-2'>
              <Label>Số điện thoại</Label>
              <Input placeholder='Nhập số điện thoại' type='tel' />
            </div>
            <div className='grid gap-2'>
              <Label>Ngày sinh</Label>
              <Input type='date' />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <KeyRound className='w-5 h-5' />
            Bảo mật
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid gap-6'>
            <div className='grid gap-2'>
              <Label>Mật khẩu hiện tại</Label>
              <Input type='password' placeholder='Nhập mật khẩu hiện tại' />
            </div>
            <div className='grid gap-2'>
              <Label>Mật khẩu mới</Label>
              <Input type='password' placeholder='Nhập mật khẩu mới' />
            </div>
            <div className='grid gap-2'>
              <Label>Xác nhận mật khẩu mới</Label>
              <Input type='password' placeholder='Nhập lại mật khẩu mới' />
            </div>
            <Button className='w-fit'>
              <Save className='w-4 h-4 mr-2' />
              Cập nhật mật khẩu
            </Button>
          </div>
          <Separator />
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Xác thực 2 lớp</Label>
                <p className='text-sm text-gray-500'>Bảo mật tài khoản bằng xác thực 2 lớp</p>
              </div>
              <Switch />
            </div>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Thông báo đăng nhập</Label>
                <p className='text-sm text-gray-500'>Nhận thông báo khi có đăng nhập mới</p>
              </div>
              <Switch checked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parental Controls */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Shield className='w-5 h-5' />
            Kiểm soát nội dung
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label className='text-base'>Giới hạn thời gian học</Label>
              <p className='text-sm text-gray-500'>Giới hạn thời gian học mỗi ngày</p>
            </div>
            <div className='flex items-center gap-2'>
              <Input type='number' className='w-20' defaultValue={2} />
              <span className='text-sm text-gray-500'>giờ/ngày</span>
            </div>
          </div>
          <Separator />
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label className='text-base'>Chặn nội dung không phù hợp</Label>
              <p className='text-sm text-gray-500'>Lọc nội dung không phù hợp với độ tuổi</p>
            </div>
            <Switch checked />
          </div>
          <Separator />
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label className='text-base'>Cho phép tương tác</Label>
              <p className='text-sm text-gray-500'>Cho phép tương tác với học viên khác</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Bell className='w-5 h-5' />
            Thông báo
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label className='text-base'>Báo cáo học tập</Label>
              <p className='text-sm text-gray-500'>Nhận báo cáo tiến độ học tập qua email</p>
            </div>
            <Select defaultValue='weekly'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Chọn tần suất' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='daily'>Hàng ngày</SelectItem>
                <SelectItem value='weekly'>Hàng tuần</SelectItem>
                <SelectItem value='monthly'>Hàng tháng</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className='flex items-center justify-between'>
            <div className='space-y-0.5'>
              <Label className='text-base'>Cảnh báo bất thường</Label>
              <p className='text-sm text-gray-500'>Thông báo khi phát hiện hoạt động bất thường</p>
            </div>
            <Switch checked />
          </div>
        </CardContent>
      </Card>

      <div className='flex justify-end gap-4'>
        <Button variant='outline'>Hủy thay đổi</Button>
        <Button>Lưu thay đổi</Button>
      </div>
    </div>
  )
}
