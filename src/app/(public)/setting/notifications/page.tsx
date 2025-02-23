'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Mail, MessageSquare, Smartphone } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function NotificationsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Thông báo</h3>
        <p className='text-sm text-muted-foreground'>Cấu hình cách bạn nhận thông báo</p>
      </div>
      <Separator />

      <div className='grid gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Mail className='w-5 h-5' />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Thông báo khóa học</Label>
                <p className='text-sm text-muted-foreground'>Nhận thông báo về các khóa học mới</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Cập nhật học tập</Label>
                <p className='text-sm text-muted-foreground'>Báo cáo tiến độ học tập định kỳ</p>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Smartphone className='w-5 h-5' />
              Thông báo đẩy
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Nhắc nhở học tập</Label>
                <p className='text-sm text-muted-foreground'>Nhận nhắc nhở khi đến giờ học</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Hoạt động tài khoản</Label>
                <p className='text-sm text-muted-foreground'>Thông báo về các hoạt động bảo mật</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <MessageSquare className='w-5 h-5' />
              Tin nhắn & Tương tác
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Tin nhắn mới</Label>
                <p className='text-sm text-muted-foreground'>Thông báo khi có tin nhắn mới</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label className='text-base'>Bình luận & Phản hồi</Label>
                <p className='text-sm text-muted-foreground'>Thông báo về các tương tác trong khóa học</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
