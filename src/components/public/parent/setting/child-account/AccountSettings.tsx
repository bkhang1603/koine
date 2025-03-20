import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Bell, Shield, Clock, Eye, Lock, Calendar } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface AccountSettingsProps {
  hideAllCourses: boolean
  // eslint-disable-next-line no-unused-vars
  onToggleAllCourses: (value: boolean) => void
}

export const AccountSettings = ({ hideAllCourses, onToggleAllCourses }: AccountSettingsProps) => (
  <Card className='border-none shadow-md overflow-hidden'>
    <CardHeader className='bg-gradient-to-r from-purple-50 to-pink-50 pb-4'>
      <CardTitle className='flex items-center gap-2'>
        <Shield className='h-5 w-5 text-primary' />
        Cài đặt tài khoản
      </CardTitle>
      <p className='text-sm text-gray-500'>Quản lý các tùy chọn cho tài khoản này</p>
    </CardHeader>

    <CardContent className='p-0'>
      <Tabs defaultValue='access' className='w-full'>
        <div className='border-b'>
          <TabsList className='w-full justify-start rounded-none h-12 bg-transparent p-0'>
            <TabsTrigger
              value='access'
              className='data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12 px-4'
            >
              <Shield className='w-4 h-4 mr-2' />
              Quyền truy cập
            </TabsTrigger>
            <TabsTrigger
              value='notifications'
              className='data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12 px-4'
            >
              <Bell className='w-4 h-4 mr-2' />
              Thông báo
            </TabsTrigger>
            <TabsTrigger
              value='schedule'
              className='data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12 px-4'
            >
              <Calendar className='w-4 h-4 mr-2' />
              Lịch học
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='access' className='pt-6 px-6 space-y-6'>
          <div className='space-y-5'>
            <div className='space-y-2'>
              <h4 className='font-medium flex items-center gap-2 text-gray-800'>
                <Eye className='h-4 w-4 text-primary' />
                Hiển thị khóa học
              </h4>
              <p className='text-sm text-gray-500'>Quản lý khả năng hiển thị của các khóa học</p>
            </div>

            <div className='space-y-4 bg-gray-50 p-4 rounded-lg'>
              <div className='flex items-center justify-between py-3 border-b border-gray-200'>
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>Ẩn tất cả khóa học</p>
                  <p className='text-xs text-gray-500'>Tạm thời ẩn tất cả khóa học đã kích hoạt</p>
                </div>
                <Switch
                  checked={hideAllCourses}
                  onCheckedChange={onToggleAllCourses}
                  className='data-[state=checked]:bg-primary'
                />
              </div>

              <div className='flex items-center justify-between py-3 border-b border-gray-200'>
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>Tự động ẩn khóa học đã hoàn thành</p>
                  <p className='text-xs text-gray-500'>Ẩn khóa học sau khi hoàn thành tất cả bài học</p>
                </div>
                <Switch className='data-[state=checked]:bg-primary' />
              </div>
            </div>
          </div>

          <div className='space-y-5 pt-2'>
            <div className='space-y-2'>
              <h4 className='font-medium flex items-center gap-2 text-gray-800'>
                <Lock className='h-4 w-4 text-primary' />
                Giới hạn truy cập
              </h4>
              <p className='text-sm text-gray-500'>Thiết lập giới hạn cho tài khoản</p>
            </div>

            <div className='space-y-4 bg-gray-50 p-4 rounded-lg'>
              <div className='flex items-center justify-between py-3 border-b border-gray-200'>
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>Giới hạn thời gian học</p>
                  <p className='text-xs text-gray-500'>Chỉ cho phép truy cập trong khung giờ quy định</p>
                </div>
                <Switch className='data-[state=checked]:bg-primary' />
              </div>

              <div className='flex items-center justify-between py-3'>
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>Giới hạn nội dung không phù hợp</p>
                  <p className='text-xs text-gray-500'>Lọc nội dung không phù hợp với lứa tuổi</p>
                </div>
                <Switch className='data-[state=checked]:bg-primary' defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='notifications' className='pt-6 px-6 space-y-6'>
          <div className='space-y-5'>
            <div className='space-y-2'>
              <h4 className='font-medium flex items-center gap-2 text-gray-800'>
                <Bell className='h-4 w-4 text-primary' />
                Thông báo học tập
              </h4>
              <p className='text-sm text-gray-500'>Quản lý thông báo về hoạt động học tập</p>
            </div>

            <div className='space-y-4 bg-gray-50 p-4 rounded-lg'>
              <div className='flex items-center justify-between py-3 border-b border-gray-200'>
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>Thông báo tiến độ học tập</p>
                  <p className='text-xs text-gray-500'>Nhận thông báo khi con hoàn thành bài học</p>
                </div>
                <Switch className='data-[state=checked]:bg-primary' defaultChecked />
              </div>

              <div className='flex items-center justify-between py-3 border-b border-gray-200'>
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>Cảnh báo không hoạt động</p>
                  <p className='text-xs text-gray-500'>Thông báo khi tài khoản không hoạt động trong 7 ngày</p>
                </div>
                <Switch className='data-[state=checked]:bg-primary' defaultChecked />
              </div>

              <div className='flex items-center justify-between py-3'>
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>Thông báo thành tích</p>
                  <p className='text-xs text-gray-500'>Nhận thông báo khi đạt thành tích mới</p>
                </div>
                <Switch className='data-[state=checked]:bg-primary' defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='schedule' className='pt-6 px-6 pb-6'>
          <div className='space-y-5'>
            <div className='space-y-2'>
              <h4 className='font-medium flex items-center gap-2 text-gray-800'>
                <Clock className='h-4 w-4 text-primary' />
                Lịch học và nhắc nhở
              </h4>
              <p className='text-sm text-gray-500'>Thiết lập thời gian học và nhắc nhở</p>
            </div>

            <div className='space-y-4 bg-gray-50 p-4 rounded-lg'>
              <div className='flex items-center justify-between py-3 border-b border-gray-200'>
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>Lịch học tự động</p>
                  <p className='text-xs text-gray-500'>Tự động tạo lịch học dựa trên hoạt động</p>
                </div>
                <Switch className='data-[state=checked]:bg-primary' defaultChecked />
              </div>

              <div className='flex items-center justify-between py-3 border-b border-gray-200'>
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>Nhắc nhở học tập</p>
                  <p className='text-xs text-gray-500'>Gửi nhắc nhở khi đến giờ học theo lịch</p>
                </div>
                <Switch className='data-[state=checked]:bg-primary' defaultChecked />
              </div>

              <div className='flex items-center justify-between py-3'>
                <div className='space-y-0.5'>
                  <p className='text-sm font-medium'>Báo cáo học tập hàng tuần</p>
                  <p className='text-xs text-gray-500'>Nhận báo cáo tổng kết học tập vào cuối tuần</p>
                </div>
                <Switch className='data-[state=checked]:bg-primary' defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
)
