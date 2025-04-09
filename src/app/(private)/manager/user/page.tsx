'use client'

import { use, useMemo, useEffect } from 'react'
import { useUsersAdminQuery } from '@/queries/useUser'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { MoreOptions } from '@/components/private/manager/user/more-options'
import { formatRole, handleErrorApi } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserCheck, UserX } from 'lucide-react'

function AdminUser(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()

  const currentPageSize = Number(searchParams.page_size) || 10
  const currentPageIndex = Number(searchParams.page_index) || 1
  const currentKeyword = (searchParams.keyword as string) || ''

  const {
    data: responseData,
    isLoading,
    error
  } = useUsersAdminQuery({
    page_index: currentPageIndex,
    page_size: currentPageSize,
    keyword: currentKeyword
  })

  useEffect(() => {
    if (error) {
      handleErrorApi({
        error
      })
    }
  }, [error])

  const users = responseData?.payload.data || []
  const pagination = responseData?.payload.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const message = responseData?.payload.message || ''
  const statistics = {
    totalUsers: users.length,
    activeUsers: users.filter((user: any) => user.isActive).length,
    inactiveUsers: users.filter((user: any) => !user.isActive).length
  }

  // Cấu hình cột cho bảng
  const headerColumn = [
    { id: 1, name: 'Thông tin người dùng' },
    { id: 2, name: 'Email' },
    { id: 3, name: 'Vai trò' },
    { id: 4, name: 'Trạng thái' },
    { id: 5, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (user: any) => (
          <div className='flex items-center gap-3 min-w-[250px] max-w-[350px]'>
            <div className='relative h-12 w-12 flex-shrink-0'>
              <Image
                src={
                  user?.userDetail?.avatarUrl ||
                  `https://avatar.iran.liara.run/public/${user?.userDetail?.gender || 'boy'}?username=${user?.username || 'default'}`
                }
                alt={`Avatar của ${user?.username || 'người dùng'}`}
                fill
                className='rounded-full object-cover'
                sizes='48px'
                priority={false}
              />
            </div>
            <div className='space-y-0.5 overflow-hidden'>
              <div className='font-medium truncate'>{user?.username || 'Chưa có tên'}</div>
              <div className='text-xs text-muted-foreground line-clamp-1'>
                {user?.userDetail?.firstName || ''} {user?.userDetail?.lastName || ''}
              </div>
            </div>
          </div>
        )
      },
      {
        id: 2,
        render: (user: any) => <div>{user.email || 'Chưa cập nhật'}</div>
      },
      {
        id: 3,
        render: (user: any) => <Badge variant='default'>{formatRole(user.role)}</Badge>
      },
      {
        id: 4,
        render: (user: any) => (
          <Badge variant={user.isActive ? 'green' : 'secondary'}>
            {user.isActive ? 'Hoạt động' : 'Không hoạt động'}
          </Badge>
        )
      },
      {
        id: 6,
        render: (user: any) => <MoreOptions type='user' onView={() => router.push(`/manager/user/${user.id}`)} />
      }
    ],
    [router]
  )

  const tableData: dataListType = {
    data: users,
    message,
    pagination
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold'>Quản lý người dùng</h1>
        <p className='text-muted-foreground mt-1'>Quản lý danh sách người dùng trong hệ thống</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {isLoading ? (
          // Stats Cards Skeleton
          [...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <Skeleton className='h-5 w-[120px]' />
                <Skeleton className='h-5 w-5 rounded-full' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-9 w-[80px] mb-2' />
                <Skeleton className='h-4 w-[160px]' />
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual Stats Cards
          <>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Tổng người dùng</CardTitle>
                <Users className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.totalUsers}</div>
                <p className='text-xs text-muted-foreground'>Số lượng người dùng trong hệ thống</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Người dùng hoạt động</CardTitle>
                <UserCheck className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.activeUsers}</div>
                <p className='text-xs text-muted-foreground'>Số người dùng đang hoạt động</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Người dùng không hoạt động</CardTitle>
                <UserX className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.inactiveUsers}</div>
                <p className='text-xs text-muted-foreground'>Số người dùng không hoạt động</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.admin.user}
        loading={isLoading}
        showSearch={true}
        searchParamName='keyword'
        searchPlaceholder='Tìm kiếm người dùng...'
      />
    </div>
  )
}

export default AdminUser
