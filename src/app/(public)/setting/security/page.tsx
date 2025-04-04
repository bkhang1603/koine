'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Shield, ShieldCheck, Lock, Laptop, Smartphone, AlertTriangle, LogOut } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Switch } from '@/components/ui/switch'
import { SecurityForm } from '@/components/public/parent/setting/security-form'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'

export default function SecurityPage() {
  // Giả lập danh sách thiết bị
  const devices = [
    {
      id: '1',
      name: 'Chrome trên Windows',
      type: 'browser',
      lastActive: '10 phút trước',
      location: 'Hà Nội, Việt Nam',
      ip: '192.168.1.xxx',
      isCurrentDevice: true
    },
    {
      id: '2',
      name: 'Safari trên iPhone',
      type: 'mobile',
      lastActive: '2 giờ trước',
      location: 'Hà Nội, Việt Nam',
      ip: '192.168.2.xxx',
      isCurrentDevice: false
    },
    {
      id: '3',
      name: 'Firefox trên Mac',
      type: 'browser',
      lastActive: '3 ngày trước',
      location: 'Hà Nội, Việt Nam',
      ip: '192.168.3.xxx',
      isCurrentDevice: false
    }
  ]

  // Xử lý đăng xuất thiết bị
  const handleLogoutDevice = () => {
    // Giả lập API call
    setTimeout(() => {
      toast({
        description: 'Đã đăng xuất khỏi thiết bị'
      })
    }, 1000)
  }

  // Xử lý đăng xuất tất cả
  const handleLogoutAllDevices = () => {
    // Giả lập API call
    setTimeout(() => {
      toast({
        description: 'Đã đăng xuất khỏi tất cả thiết bị'
      })
    }, 1500)
  }

  // Xử lý bật/tắt xác thực hai lớp
  const handleToggle2FA = (enabled: boolean) => {
    toast({
      description: `Đã ${enabled ? 'bật' : 'tắt'} xác thực hai lớp`
    })
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <div className='flex items-center gap-2'>
            <Shield className='h-5 w-5 text-primary' />
            <h2 className='text-xl font-medium text-gray-900'>Bảo mật tài khoản</h2>
          </div>
          <p className='text-sm text-gray-500 mt-1 md:ml-7'>
            Quản lý các thiết lập bảo mật và bảo vệ tài khoản của bạn
          </p>
        </div>
      </div>

      {/* Password Change */}
      <Card className='shadow-sm border-gray-100'>
        <CardContent className='p-6'>
          <div className='mb-6'>
            <div className='flex items-center gap-2 mb-1'>
              <Lock className='h-5 w-5 text-primary' />
              <h3 className='text-lg font-medium text-gray-900'>Đổi mật khẩu</h3>
            </div>
            <p className='text-sm text-gray-500 md:ml-7 mb-6'>Cập nhật mật khẩu của bạn để tăng cường bảo mật</p>

            <Separator className='mb-6' />

            <SecurityForm />
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className='shadow-sm border-gray-100'>
        <CardContent className='p-6'>
          <div className='flex items-center gap-2 mb-1'>
            <ShieldCheck className='h-5 w-5 text-primary' />
            <h3 className='text-lg font-medium text-gray-900'>Xác thực hai lớp</h3>
          </div>
          <p className='text-sm text-gray-500 md:ml-7 mb-6'>Thêm một lớp bảo mật cho tài khoản của bạn</p>

          <Separator className='mb-6' />

          <div className='space-y-6'>
            <div className='flex items-center justify-between p-4 bg-primary/5 border border-primary/10 rounded-lg'>
              <div className='flex items-start gap-4'>
                <div className='p-2 rounded-full bg-primary/10 flex-shrink-0'>
                  <ShieldCheck className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <h4 className='font-medium text-gray-900 mb-1'>Xác thực qua Email</h4>
                  <p className='text-sm text-gray-600'>Nhận mã xác thực qua email mỗi khi đăng nhập từ thiết bị mới</p>
                </div>
              </div>
              <Switch onCheckedChange={handleToggle2FA} />
            </div>

            <div className='p-4 border border-amber-100 bg-amber-50/50 rounded-lg'>
              <div className='flex items-start gap-4'>
                <div className='p-2 rounded-full bg-amber-100 flex-shrink-0'>
                  <AlertTriangle className='h-5 w-5 text-amber-600' />
                </div>
                <div>
                  <h4 className='font-medium text-gray-900 mb-1'>Bảo mật tài khoản</h4>
                  <p className='text-sm text-gray-600 mb-3'>
                    Chúng tôi khuyến nghị bạn nên bật xác thực hai lớp để bảo vệ tài khoản tốt hơn.
                  </p>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-white border-amber-200 text-amber-700 hover:bg-amber-50'
                  >
                    Tìm hiểu thêm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className='shadow-sm border-gray-100'>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between mb-1'>
            <div className='flex items-center gap-2'>
              <Laptop className='h-5 w-5 text-primary' />
              <h3 className='text-lg font-medium text-gray-900'>Phiên đăng nhập</h3>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='outline' size='sm' className='text-xs'>
                  <LogOut className='h-3.5 w-3.5 mr-1.5' />
                  Đăng xuất tất cả
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Đăng xuất tất cả thiết bị</AlertDialogTitle>
                  <AlertDialogDescription>
                    Thao tác này sẽ đăng xuất tài khoản của bạn khỏi tất cả các thiết bị, bao gồm cả thiết bị hiện tại.
                    Bạn sẽ cần đăng nhập lại.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogoutAllDevices} className='bg-red-500 hover:bg-red-600'>
                    Đăng xuất tất cả
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <p className='text-sm text-gray-500 md:ml-7 mb-6'>Quản lý các phiên đăng nhập và thiết bị đang hoạt động</p>

          <Separator className='mb-6' />

          <div className='space-y-4'>
            {devices.map((device) => (
              <div key={device.id} className='p-4 border border-gray-100 rounded-lg bg-white'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-start gap-3'>
                    <div className={`p-2 rounded-full ${device.type === 'mobile' ? 'bg-blue-50' : 'bg-gray-100'}`}>
                      {device.type === 'mobile' ? (
                        <Smartphone className='h-5 w-5 text-blue-500' />
                      ) : (
                        <Laptop className='h-5 w-5 text-gray-500' />
                      )}
                    </div>

                    <div>
                      <div className='flex items-center gap-2'>
                        <h4 className='font-medium text-gray-900'>{device.name}</h4>
                        {device.isCurrentDevice && (
                          <Badge className='bg-green-100 text-green-700 hover:bg-green-100 px-1.5 text-xs font-normal'>
                            Thiết bị hiện tại
                          </Badge>
                        )}
                      </div>

                      <div className='mt-1 space-y-1 text-xs text-gray-500'>
                        <p>IP: {device.ip}</p>
                        <p>Vị trí: {device.location}</p>
                        <p>Hoạt động gần nhất: {device.lastActive}</p>
                      </div>
                    </div>
                  </div>

                  {!device.isCurrentDevice && (
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-red-500 hover:text-red-600 hover:bg-red-50'
                      onClick={() => handleLogoutDevice()}
                    >
                      <LogOut className='h-4 w-4' />
                      <span className='sr-only'>Đăng xuất</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
