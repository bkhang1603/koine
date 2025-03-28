'use client'

import { use, useEffect, useMemo } from 'react'
import { useUsersAdminQuery } from '@/queries/useUser'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserCheck } from 'lucide-react'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter, usePathname } from 'next/navigation'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MoreOptions } from '@/components/private/admin/user/more-options'

function AdminUser(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()
  const pathname = usePathname()

  const currentPageSize = Number(searchParams.page_size) || 5
  const currentPageIndex = Number(searchParams.page_index) || 1
  const currentKeyword = (searchParams.keyword as string) || ''

  const updateSearchParams = (newParams: { page_size?: number; page_index?: number; keyword?: string }) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)

    if (newParams.keyword !== undefined) {
      if (newParams.keyword === '') {
        params.delete('keyword')
      } else {
        params.set('keyword', newParams.keyword)
      }
    }

    if (newParams.page_size !== undefined) {
      params.set('page_size', newParams.page_size.toString())
    }

    if (newParams.page_index !== undefined) {
      params.set('page_index', newParams.page_index.toString())
    }

    router.push(`${pathname}?${params.toString()}`)
  }

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
    if (responseData) {
      console.log('Dữ liệu người dùng từ admin:', responseData)
    }
    if (error) {
      console.error('Lỗi khi tải người dùng:', error)
    }
  }, [responseData, error])

  const users = responseData?.payload.data || []
  const pagination = responseData?.payload.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const message = responseData?.payload.message || ''

  // Cấu hình cột cho bảng
  const headerColumn = [
    { id: 1, name: 'Thông tin người dùng' },
    { id: 2, name: 'Email' },
    { id: 3, name: 'Số điện thoại' },
    { id: 4, name: 'Vai trò' },
    { id: 5, name: 'Trạng thái' },
    { id: 6, name: 'Ngày tạo' },
    { id: 7, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (user: any) => (
          <div className='flex items-center gap-3 min-w-[250px] max-w-[350px]'>
            <div className='relative h-12 w-12 flex-shrink-0'>
              <Image
                src={user.userDetail.avatarUrl ?? '/images/placeholder.jpg'}
                alt={`Avatar của ${user.username}`}
                fill
                className='rounded-full object-cover'
                sizes='48px'
                priority={false}
              />
            </div>
            <div className='space-y-0.5 overflow-hidden'>
              <div className='font-medium truncate'>{user.username}</div>
              <div className='text-xs text-muted-foreground line-clamp-1'>
                {user.userDetail.firstName} {user.userDetail.lastName}
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
        render: (user: any) => <div>{user.userDetail.phone || 'Chưa cập nhật'}</div>
      },
      {
        id: 4,
        render: (user: any) => <Badge variant={user.role === 'ADMIN' ? 'destructive' : 'default'}>{user.role}</Badge>
      },
      {
        id: 5,
        render: (user: any) => (
          <Badge variant={user.isActive ? 'green' : 'secondary'}>
            {user.isActive ? 'Hoạt động' : 'Không hoạt động'}
          </Badge>
        )
      },
      {
        id: 6,
        render: (user: any) => {
          // Format is "HH:mm:ss-DD/MM/YYYY"
          const [time, date] = user.createAtFormatted.split('-')
          const [day, month, year] = date.split('/')
          const formattedDate = new Date(`${year}-${month}-${day}T${time}`)

          return (
            <div className='space-y-0.5'>
              <div className='text-sm font-medium'>{format(formattedDate, 'dd/MM/yyyy', { locale: vi })}</div>
              <div className='text-xs text-muted-foreground'>{format(formattedDate, 'HH:mm', { locale: vi })}</div>
            </div>
          )
        }
      },
      {
        id: 7,
        render: (user: any) => <MoreOptions type='user' onView={() => router.push(`/admin/user/${user.id}`)} />
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
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {isLoading ? (
          // Stats Cards Skeleton
          [...Array(2)].map((_, i) => (
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
          <>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Tổng người dùng</CardTitle>
                <Users className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{pagination.totalItem}</div>
                <p className='text-xs text-muted-foreground'>Người dùng trong hệ thống</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Người dùng hoạt động</CardTitle>
                <UserCheck className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{users.filter((user) => user.isActive).length}</div>
                <p className='text-xs text-muted-foreground'>Đang hoạt động</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Search */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <Input
          placeholder='Tìm kiếm người dùng...'
          className='w-full sm:w-[300px]'
          value={currentKeyword}
          onChange={(e) => updateSearchParams({ keyword: e.target.value, page_index: 1 })}
        />
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.admin.user}
        loading={isLoading}
      />
    </div>
  )
}

export default AdminUser
