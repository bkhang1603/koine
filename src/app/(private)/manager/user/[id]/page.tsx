'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { User, AlertCircle, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useUserDetailAdminQuery } from '@/queries/useUser'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { UserOrders } from '@/components/private/common/user/user-orders'

export default function AdminUserDetail(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { isLoading, error, data } = useUserDetailAdminQuery({ userId: params.id })
  const user = data?.payload.data

  if (isLoading) {
    return (
      <div className='container max-w-7xl mx-auto py-6 space-y-8'>
        {/* Back button skeleton */}
        <Skeleton className='w-[200px] h-10' />

        {/* Header skeleton */}
        <div>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='w-[300px] h-8' />
            <Skeleton className='w-[80px] h-6' />
          </div>
          <div className='flex items-center gap-6'>
            <Skeleton className='w-[100px] h-5' />
            <Skeleton className='w-[120px] h-5' />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-2 space-y-6'>
            {/* Profile Info skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='flex gap-6'>
                  <Skeleton className='w-48 h-48 rounded-full' />
                  <div className='space-y-4 flex-1'>
                    <Skeleton className='w-full h-20' />
                    <Skeleton className='w-full h-20' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-[100px]' />
              </CardContent>
            </Card>
          </div>

          {/* User Info skeleton */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-3'>
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className='flex justify-between'>
                      <Skeleton className='w-[120px] h-5' />
                      <Skeleton className='w-[100px] h-5' />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <AlertCircle className='w-12 h-12 text-red-500' />
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>Không tìm thấy người dùng</h3>
          <p className='text-gray-500'>Người dùng không tồn tại hoặc đã bị xóa</p>
        </div>
        <Button variant='outline' asChild>
          <Link href='/manager/user'>Quay lại danh sách người dùng</Link>
        </Button>
      </div>
    )
  }

  const breadcrumbItems = [
    {
      title: 'Người dùng',
      href: '/manager/user'
    },
    {
      title: user.username
    }
  ]

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Breadcrumb component */}
      <div className='mb-6'>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>{user.username}</h1>
          <Badge variant={user.isActive ? 'green' : 'red'}>
            {user.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
          </Badge>
        </div>
        <div className='flex items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <User className='h-4 w-4' />
            {user.role}
          </div>
          <div className='flex items-center gap-2'>
            <Mail className='h-4 w-4' />
            {user.email || 'Chưa cập nhật email'}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2 space-y-6'>
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='w-5 h-5' />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex gap-6'>
                <div className='relative w-48 h-48'>
                  <Image
                    src={user.userDetail.avatarUrl || '/images/placeholder.jpg'}
                    alt={`Avatar của ${user.username}`}
                    fill
                    className='rounded-full object-cover'
                  />
                </div>
                <div className='flex-1'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='text-sm text-gray-500'>Họ</label>
                      <p className='font-medium'>{user.userDetail.lastName || 'Chưa cập nhật'}</p>
                    </div>
                    <div>
                      <label className='text-sm text-gray-500'>Tên</label>
                      <p className='font-medium'>{user.userDetail.firstName || 'Chưa cập nhật'}</p>
                    </div>
                    <div>
                      <label className='text-sm text-gray-500'>Giới tính</label>
                      <p className='font-medium'>
                        {user.userDetail.gender === 'MALE'
                          ? 'Nam'
                          : user.userDetail.gender === 'FEMALE'
                            ? 'Nữ'
                            : 'Khác'}
                      </p>
                    </div>
                    <div>
                      <label className='text-sm text-gray-500'>Ngày sinh</label>
                      <p className='font-medium'>
                        {user.userDetail.dob
                          ? format(new Date(user.userDetail.dob), 'dd/MM/yyyy', { locale: vi })
                          : 'Chưa cập nhật'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Phone className='w-5 h-5' />
                Thông tin liên hệ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <label className='text-sm text-gray-500'>Số điện thoại</label>
                  <p className='font-medium'>{user.userDetail.phone || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <label className='text-sm text-gray-500'>Địa chỉ</label>
                  <p className='font-medium'>{user.userDetail.address || 'Chưa cập nhật'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Info */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin tài khoản</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>ID</span>
                  <span className='font-medium'>{user.id}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Loại tài khoản</span>
                  <span className='font-medium'>{user.accountType}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Vai trò</span>
                  <Badge variant={user.role === 'ADMIN' ? 'destructive' : 'default'}>{user.role}</Badge>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Trạng thái</span>
                  <Badge variant={user.isActive ? 'green' : 'red'}>
                    {user.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày tạo</span>
                  <span>{format(new Date(user.createdAt), 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Cập nhật lần cuối</span>
                  <span>{format(new Date(user.updatedAt), 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* User Orders */}
      <UserOrders userId={params.id} href={`/manager/user/${params.id}`} />
    </div>
  )
}
