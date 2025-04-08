'use client'

import { use, useEffect, useMemo } from 'react'
import { useUsersAdminQuery } from '@/queries/useUser'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MoreOptions } from '@/components/private/admin/user/more-options'
import { formatRole } from '@/lib/utils'

function AdminUser(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()
  const pathname = usePathname()

  const currentPageSize = Number(searchParams.page_size) || 10
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
      console.log('Dữ liệu người dùng từ admin')
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
