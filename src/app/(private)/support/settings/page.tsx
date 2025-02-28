'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SettingsPage() {
  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Cài đặt hệ thống</h1>
        <p className='text-sm text-muted-foreground mt-1'>Quản lý cài đặt và tùy chỉnh hệ thống hỗ trợ</p>
      </div>

      <Tabs defaultValue='general' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='general'>Chung</TabsTrigger>
          <TabsTrigger value='notifications'>Thông báo</TabsTrigger>
          <TabsTrigger value='automation'>Tự động hóa</TabsTrigger>
          <TabsTrigger value='templates'>Mẫu phản hồi</TabsTrigger>
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
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phân loại ticket</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label>Kỹ thuật</Label>
                      <p className='text-sm text-muted-foreground'>Các vấn đề về truy cập và sử dụng</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label>Thanh toán</Label>
                      <p className='text-sm text-muted-foreground'>Các vấn đề về thanh toán và hoàn tiền</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <Label>Nội dung</Label>
                      <p className='text-sm text-muted-foreground'>Các vấn đề về nội dung khóa học</p>
                    </div>
                    <Switch defaultChecked />
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
                    <Label>Ticket mới</Label>
                    <p className='text-sm text-muted-foreground'>Thông báo khi có ticket mới</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Phản hồi mới</Label>
                    <p className='text-sm text-muted-foreground'>Thông báo khi có phản hồi mới từ người dùng</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Yêu cầu hoàn tiền</Label>
                    <p className='text-sm text-muted-foreground'>Thông báo khi có yêu cầu hoàn tiền mới</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='automation'>
          <Card>
            <CardHeader>
              <CardTitle>Tự động hóa</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Tự động phân công</Label>
                    <p className='text-sm text-muted-foreground'>Tự động phân công ticket cho nhân viên</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Tự động gửi email xác nhận</Label>
                    <p className='text-sm text-muted-foreground'>Gửi email xác nhận khi nhận được ticket mới</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Tự động đóng ticket</Label>
                    <p className='text-sm text-muted-foreground'>Tự động đóng ticket sau 7 ngày không có phản hồi</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='templates'>
          <Card>
            <CardHeader>
              <CardTitle>Mẫu phản hồi</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Chào mừng</Label>
                  <Textarea
                    placeholder='Nhập nội dung mẫu...'
                    defaultValue='Xin chào {user_name}, cảm ơn bạn đã liên hệ với chúng tôi...'
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Đang xử lý</Label>
                  <Textarea placeholder='Nhập nội dung mẫu...' defaultValue='Chúng tôi đang xử lý yêu cầu của bạn...' />
                </div>
                <div className='space-y-2'>
                  <Label>Kết thúc</Label>
                  <Textarea
                    placeholder='Nhập nội dung mẫu...'
                    defaultValue='Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi...'
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className='flex justify-end gap-4'>
        <Button variant='outline'>Hủy thay đổi</Button>
        <Button>Lưu thay đổi</Button>
      </div>
    </div>
  )
}
