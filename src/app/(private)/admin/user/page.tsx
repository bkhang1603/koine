'use client'

import { use, useMemo, useEffect } from 'react'
import { useUsersAdminQuery, useBanUserMutation, useUnBanUserMutation } from '@/queries/useUser'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { formatRole, handleErrorApi } from '@/lib/utils'
import { MoreOptions } from '@/components/private/common/more-options'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

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

  const banUserMutation = useBanUserMutation()
  const unBanUserMutation = useUnBanUserMutation()

  useEffect(() => {
    if (error) {
      handleErrorApi({
        error
      })
    }
  }, [error])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBanUser = async (userId: string) => {
    try {
      await banUserMutation.mutateAsync(userId)
      toast({
        description: 'Khóa tài khoản người dùng thành công'
      })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUnBanUser = async (userId: string) => {
    try {
      await unBanUserMutation.mutateAsync(userId)
      toast({
        description: 'Mở khóa tài khoản người dùng thành công'
      })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

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
    { id: 4, name: 'Trạng thái tài khoản' },
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
          <Badge variant={user.isBanned ? 'destructive' : 'green'}>{user.isBanned ? 'Đã bị khóa' : 'Hoạt động'}</Badge>
        )
      },
      {
        id: 6,
        render: (user: any) => (
          <MoreOptions
            itemType='user'
            onView={() => router.push(`/admin/user/${user.id}`)}
            onBanUser={!user.isBanned ? () => handleBanUser(user.id) : undefined}
            onUnBanUser={user.isBanned ? () => handleUnBanUser(user.id) : undefined}
            item={{
              id: user.id,
              title: user.username || 'Người dùng',
              status: user.isActive ? 'ACTIVE' : 'INACTIVE',
              slug: ''
            }}
          />
        )
      }
    ],
    [router, handleBanUser, handleUnBanUser]
  )

  const tableData: dataListType = {
    data: users,
    message,
    pagination
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý người dùng</h1>
          <p className='text-muted-foreground mt-1'>Quản lý danh sách người dùng trong hệ thống</p>
        </div>
        <div>
          <Button asChild>
            <Link href='/admin/user/new'>
              <Plus className='w-4 h-4 mr-2' />
              Tạo người dùng mới
            </Link>
          </Button>
        </div>
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
