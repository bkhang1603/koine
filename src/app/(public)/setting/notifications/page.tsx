'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { BellIcon, CheckCircle2, Trash2 } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Badge } from '@/components/ui/badge'

export default function NotificationsPage() {
  // const { data: settingsData, isLoading: isLoadingSettings } = useGetNotificationSettings()
  // const { data: notificationsData, isLoading: isLoadingNotifications } = useGetNotifications()
  // const updateSettings = useUpdateNotificationSettings()
  // const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('all')

  // Cập nhật thiết lập thông báo
  // eslint-disable-next-line no-unused-vars
  const handleToggleSettings = async (key: string, value: boolean) => {
    // try {
    //   await updateSettings.mutateAsync({
    //     [key]: value
    //   })
    //   toast({
    //     description: 'Đã cập nhật thiết lập thông báo'
    //   })
    // } catch (error) {
    //   console.error(error)
    //   toast({
    //     variant: 'destructive',
    //     description: 'Không thể cập nhật thiết lập. Vui lòng thử lại sau.'
    //   })
    // }
  }

  // Lọc thông báo theo tab
  // const getFilteredNotifications = () => {
  //   if (!notificationsData?.payload.data) return []
  //   const notifications = notificationsData.payload.data
  //   if (activeTab === 'all') return notifications
  //   if (activeTab === 'unread') return notifications.filter((n) => !n.isRead)
  //   if (activeTab === 'course') return notifications.filter((n) => n.type === 'course')
  //   if (activeTab === 'system') return notifications.filter((n) => n.type === 'system')
  //   return notifications
  // }

  // const filteredNotifications = getFilteredNotifications()
  // const unreadCount = notificationsData?.payload.data?.filter((n) => !n.isRead).length || 0

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <div className='flex items-center gap-2'>
            <BellIcon className='h-5 w-5 text-primary' />
            <h2 className='text-xl font-medium text-gray-900'>Thông báo</h2>
            {1 > 0 && <Badge className='ml-2 bg-red-500'>{1} mới</Badge>}
          </div>
          <p className='text-sm text-gray-500 mt-1 md:ml-7'>Quản lý và cấu hình thông báo của bạn</p>
        </div>
      </div>

      {/* Notification Settings */}
      <Card className='shadow-sm border-gray-100'>
        <CardContent className='p-6'>
          <h3 className='text-lg font-medium mb-4'>Thiết lập thông báo</h3>

          {false ? (
            <div className='space-y-6'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='flex justify-between items-center'>
                  <div className='space-y-1'>
                    <div className='h-5 w-40 bg-gray-200 rounded animate-pulse'></div>
                    <div className='h-4 w-64 bg-gray-100 rounded animate-pulse'></div>
                  </div>
                  <div className='h-6 w-10 bg-gray-200 rounded-full animate-pulse'></div>
                </div>
              ))}
            </div>
          ) : (
            <div className='space-y-6'>
              <div className='flex justify-between items-center'>
                <div className='space-y-1'>
                  <h4 className='font-medium'>Thông báo khóa học</h4>
                  <p className='text-sm text-gray-500'>Nhận thông báo về khóa học, bài giảng và lịch học</p>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={(value) => handleToggleSettings('courseNotifications', value)}
                />
              </div>

              <Separator />

              <div className='flex justify-between items-center'>
                <div className='space-y-1'>
                  <h4 className='font-medium'>Thông báo hệ thống</h4>
                  <p className='text-sm text-gray-500'>Nhận thông báo về cập nhật hệ thống và bảo trì</p>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={(value) => handleToggleSettings('systemNotifications', value)}
                />
              </div>

              <Separator />

              <div className='flex justify-between items-center'>
                <div className='space-y-1'>
                  <h4 className='font-medium'>Email thông báo</h4>
                  <p className='text-sm text-gray-500'>Nhận email về các thông báo quan trọng</p>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={(value) => handleToggleSettings('emailNotifications', value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification List */}
      <Card className='shadow-sm border-gray-100'>
        <CardContent className='p-0'>
          <div className='p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
            <Tabs defaultValue='all' value={activeTab} onValueChange={setActiveTab}>
              <TabsList className='bg-gray-100/90 grid w-full grid-cols-4 h-9'>
                <TabsTrigger value='all' className='text-xs'>
                  Tất cả
                </TabsTrigger>
                <TabsTrigger value='unread' className='text-xs'>
                  Chưa đọc
                  {1 > 0 && (
                    <span className='ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full'>{1}</span>
                  )}
                </TabsTrigger>
                <TabsTrigger value='course' className='text-xs'>
                  Khóa học
                </TabsTrigger>
                <TabsTrigger value='system' className='text-xs'>
                  Hệ thống
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className='flex gap-2 self-end sm:self-auto'>
              <Button variant='outline' size='sm' className='h-9 text-xs'>
                <CheckCircle2 className='h-3.5 w-3.5 mr-1.5' />
                Đánh dấu đã đọc
              </Button>
              <Button variant='outline' size='sm' className='h-9 text-xs'>
                <Trash2 className='h-3.5 w-3.5 mr-1.5' />
                Xóa tất cả
              </Button>
            </div>
          </div>

          {/* <div className='divide-y divide-gray-100'>
            {isLoadingNotifications ? (
              <NotificationSkeleton count={5} />
            ) : filteredNotifications.length === 0 ? (
              <EmptyNotifications type={activeTab} />
            ) : (
              filteredNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            )}
          </div> */}

          {/* {filteredNotifications.length > 0 && (
            <div className='p-4 border-t border-gray-100 text-center'>
              <Button variant='outline' className='text-xs'>
                <Clock className='h-3.5 w-3.5 mr-1.5' />
                Xem thêm thông báo cũ hơn
              </Button>
            </div>
          )} */}
        </CardContent>
      </Card>
    </div>
  )
}
