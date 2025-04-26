'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Bell, Settings } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Cài đặt hệ thống</h1>
          <p className='text-sm text-muted-foreground mt-1'>Quản lý cài đặt và tùy chỉnh hệ thống hỗ trợ</p>
        </div>
        <Badge variant='outline' className='px-3 py-1'>
          {activeTab === 'general' ? 'Chung' : 'Thông báo'}
        </Badge>
      </div>

      <Tabs defaultValue='general' className='space-y-6' onValueChange={setActiveTab}>
        <TabsList className='grid grid-cols-2 w-full max-w-md'>
          <TabsTrigger value='general' className='flex gap-2 items-center'>
            <Settings className='h-4 w-4' />
            <span>Chung</span>
          </TabsTrigger>
          <TabsTrigger value='notifications' className='flex gap-2 items-center'>
            <Bell className='h-4 w-4' />
            <span>Thông báo</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value='general'>
          <div className='grid gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt chung</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid gap-4'>
                  <div className='space-y-2'>
                    <Label>Tên hiển thị hệ thống</Label>
                    <Input placeholder='VD: Support Portal' defaultValue='Hệ thống hỗ trợ' />
                  </div>
                  <div className='space-y-2'>
                    <Label>Email hệ thống</Label>
                    <Input type='email' placeholder='support@example.com' defaultValue='support@example.com' />
                  </div>
                  <div className='space-y-2'>
                    <Label>Múi giờ</Label>
                    <Select defaultValue='Asia/Ho_Chi_Minh'>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn múi giờ' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Asia/Ho_Chi_Minh'>Hồ Chí Minh (GMT+7)</SelectItem>
                        <SelectItem value='Asia/Bangkok'>Bangkok (GMT+7)</SelectItem>
                        <SelectItem value='Asia/Singapore'>Singapore (GMT+8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label>Ngôn ngữ</Label>
                    <Select defaultValue='vi'>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn ngôn ngữ' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='vi'>Tiếng Việt</SelectItem>
                        <SelectItem value='en'>Tiếng Anh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label>Chế độ tối</Label>
                      <p className='text-sm text-muted-foreground'>Sử dụng chế độ tối cho giao diện</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='notifications'>
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Thông báo email</Label>
                    <p className='text-sm text-muted-foreground'>Nhận thông báo qua email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Thông báo đẩy</Label>
                    <p className='text-sm text-muted-foreground'>Nhận thông báo đẩy trên trình duyệt</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Âm thanh thông báo</Label>
                    <p className='text-sm text-muted-foreground'>Phát âm thanh khi có thông báo mới</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Nhắc nhở hàng ngày</Label>
                    <p className='text-sm text-muted-foreground'>Nhận thông báo tổng hợp hàng ngày</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className='flex justify-end gap-4'>
        <Button variant='outline'>Hủy thay đổi</Button>
        <Button onClick={() => alert('Đây là giao diện mẫu, không có xử lý API')}>Lưu thay đổi</Button>
      </div>
    </div>
  )
}
