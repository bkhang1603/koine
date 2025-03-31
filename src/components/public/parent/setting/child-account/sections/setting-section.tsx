import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Shield, Bell } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

interface SettingsSectionProps {
  hideAllCourses: boolean
  // eslint-disable-next-line no-unused-vars
  toggleAllCourses: (hide: boolean) => void
  childName?: string
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ hideAllCourses, toggleAllCourses, childName }) => (
  <Card className='border-none shadow-sm'>
    <CardHeader className='pb-2'>
      <CardTitle>Cài đặt tài khoản</CardTitle>
      <CardDescription>Quản lý các tùy chọn cho tài khoản của {childName}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className='space-y-6'>
        {/* Access Control */}
        <div>
          <h3 className='text-base font-medium text-gray-800 mb-3 flex items-center gap-2'>
            <Shield className='h-4 w-4 text-primary' />
            Quyền truy cập
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between py-3 border-b border-gray-100'>
              <div className='space-y-0.5'>
                <p className='text-sm font-medium'>Ẩn tất cả khóa học</p>
                <p className='text-xs text-gray-500'>Tạm thời ẩn tất cả khóa học đã kích hoạt</p>
              </div>
              <Switch
                checked={hideAllCourses}
                onCheckedChange={toggleAllCourses}
                className='data-[state=checked]:bg-primary'
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Notifications */}
        <div>
          <h3 className='text-base font-medium text-gray-800 mb-3 flex items-center gap-2'>
            <Bell className='h-4 w-4 text-primary' />
            Thông báo
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between py-3 border-b border-gray-100'>
              <div className='space-y-0.5'>
                <p className='text-sm font-medium'>Thông báo hoạt động</p>
                <p className='text-xs text-gray-500'>Nhận thông báo khi tài khoản con hoạt động</p>
              </div>
              <Switch defaultChecked={true} className='data-[state=checked]:bg-primary' />
            </div>

            <div className='flex items-center justify-between py-3 border-b border-gray-100'>
              <div className='space-y-0.5'>
                <p className='text-sm font-medium'>Báo cáo tiến độ</p>
                <p className='text-xs text-gray-500'>Nhận báo cáo tiến độ học tập hàng tuần</p>
              </div>
              <Switch defaultChecked={true} className='data-[state=checked]:bg-primary' />
            </div>

            <div className='flex items-center justify-between py-3'>
              <div className='space-y-0.5'>
                <p className='text-sm font-medium'>Cảnh báo bất thường</p>
                <p className='text-xs text-gray-500'>Nhận thông báo khi phát hiện hoạt động bất thường</p>
              </div>
              <Switch defaultChecked={true} className='data-[state=checked]:bg-primary' />
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)
