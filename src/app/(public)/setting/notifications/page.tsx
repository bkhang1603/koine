'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Mail, MessageSquare, Smartphone } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function NotificationsPage() {
  return (
    <div className='max-w-4xl mx-auto space-y-8'>
      {/* Header */}
      <div>
        <h3 className='text-2xl font-semibold'>Cài đặt thông báo</h3>
        <p className='text-sm text-gray-500 mt-1'>Tùy chỉnh cách bạn nhận thông báo từ hệ thống</p>
      </div>

      <div className='space-y-6'>
        {/* Email Notifications */}
        <Card className='border-none shadow-md'>
          <CardHeader className='pb-6 border-b'>
            <CardTitle className='flex items-center gap-2 text-lg font-medium'>
              <Mail className='w-5 h-5 text-primary' />
              Thông báo qua email
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6 space-y-6'>
            <div className='flex items-center justify-between'>
              <div>
                <Label className='font-medium block mb-0.5'>Thông báo khóa học</Label>
                <p className='text-sm text-gray-500'>Nhận email khi có khóa học mới phù hợp</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div>
                <Label className='font-medium block mb-0.5'>Cập nhật học tập</Label>
                <p className='text-sm text-gray-500'>Nhận báo cáo tiến độ học tập định kỳ</p>
              </div>
              <Select defaultValue='weekly'>
                <SelectTrigger className='w-[160px] h-9 border-gray-200'>
                  <SelectValue placeholder='Chọn tần suất' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='daily'>Hàng ngày</SelectItem>
                  <SelectItem value='weekly'>Hàng tuần</SelectItem>
                  <SelectItem value='monthly'>Hàng tháng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Push Notifications */}
        <Card className='border-none shadow-md'>
          <CardHeader className='pb-6 border-b'>
            <CardTitle className='flex items-center gap-2 text-lg font-medium'>
              <Smartphone className='w-5 h-5 text-primary' />
              Thông báo đẩy
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6 space-y-6'>
            <div className='flex items-center justify-between'>
              <div>
                <Label className='font-medium block mb-0.5'>Nhắc nhở học tập</Label>
                <p className='text-sm text-gray-500'>Nhận thông báo khi đến giờ học</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div>
                <Label className='font-medium block mb-0.5'>Hoạt động tài khoản</Label>
                <p className='text-sm text-gray-500'>Thông báo về các hoạt động bảo mật</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Messages & Interactions */}
        <Card className='border-none shadow-md'>
          <CardHeader className='pb-6 border-b'>
            <CardTitle className='flex items-center gap-2 text-lg font-medium'>
              <MessageSquare className='w-5 h-5 text-primary' />
              Tin nhắn & Tương tác
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6 space-y-6'>
            <div className='flex items-center justify-between'>
              <div>
                <Label className='font-medium block mb-0.5'>Tin nhắn mới</Label>
                <p className='text-sm text-gray-500'>Thông báo khi có tin nhắn mới</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div>
                <Label className='font-medium block mb-0.5'>Bình luận & Phản hồi</Label>
                <p className='text-sm text-gray-500'>Thông báo về các tương tác trong khóa học</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
