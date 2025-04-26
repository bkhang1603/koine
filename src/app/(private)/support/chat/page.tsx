'use client'

import { use, useMemo, useEffect } from 'react'
import { useGetSupporterChatRoomList } from '@/queries/useChat'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { formatRelative } from 'date-fns'
import { vi } from 'date-fns/locale'
import { handleErrorApi } from '@/lib/utils'
import { MoreOptions } from '@/components/private/common/more-options'

function SupportChat(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()

  const currentPageSize = Number(searchParams.page_size) || 10
  const currentPageIndex = Number(searchParams.page_index) || 1

  const {
    data: responseData,
    isLoading,
    error
  } = useGetSupporterChatRoomList({
    page_index: currentPageIndex,
    page_size: currentPageSize
  })

  useEffect(() => {
    if (error) {
      handleErrorApi({
        error
      })
    }
  }, [error])

  const chatRooms = responseData?.payload?.data || []
  const pagination = responseData?.payload?.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const message = responseData?.payload?.message || ''

  // Cấu hình cột cho bảng
  const headerColumn = [
    { id: 1, name: 'Thông tin người dùng' },
    { id: 2, name: 'Tin nhắn mới nhất' },
    { id: 3, name: 'Thời gian' },
    { id: 4, name: 'Trạng thái hỗ trợ' },
    { id: 5, name: 'Trạng thái phòng' },
    { id: 6, name: 'Tin nhắn mới' },
    { id: 7, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (chatRoom: any) => {
          const userMember = chatRoom.members.find((member: any) => !member.isAdmin)

          return (
            <div className='flex items-center gap-3 min-w-[250px] max-w-[350px]'>
              <div className='relative h-12 w-12 flex-shrink-0'>
                <Image
                  src={
                    chatRoom?.imageUrl ||
                    userMember?.avatarUrl ||
                    `https://avatar.iran.liara.run/public/boy?username=user`
                  }
                  alt={`Avatar của ${userMember?.name || 'người dùng'}`}
                  fill
                  className='rounded-full object-cover'
                  sizes='48px'
                  priority={false}
                />
                {chatRoom.unreadCount > 0 && (
                  <div className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                    {chatRoom.unreadCount}
                  </div>
                )}
              </div>
              <div className='space-y-0.5 overflow-hidden'>
                <div className='font-medium truncate'>{userMember?.name || userMember?.username || 'Chưa có tên'}</div>
                <div className='text-xs text-muted-foreground line-clamp-1'>
                  {chatRoom?.members?.length > 0 ? `${chatRoom.members.length} thành viên` : 'Không có thành viên'}
                </div>
              </div>
            </div>
          )
        }
      },
      {
        id: 2,
        render: (chatRoom: any) => (
          <div className='max-w-[300px] truncate'>
            {chatRoom.latestMessage?.content ? (
              <span className='text-sm line-clamp-2'>{chatRoom.latestMessage.content}</span>
            ) : (
              <span className='text-sm text-muted-foreground italic'>Chưa có tin nhắn</span>
            )}
          </div>
        )
      },
      {
        id: 3,
        render: (chatRoom: any) => (
          <div className='text-sm text-muted-foreground'>
            {chatRoom.latestMessage?.createdAt
              ? formatRelative(new Date(chatRoom.latestMessage.createdAt), new Date(), { locale: vi })
              : 'Chưa có tin nhắn'}
          </div>
        )
      },
      {
        id: 4,
        render: (chatRoom: any) => (
          <div>
            {chatRoom.isPendingSupport ? (
              <Badge variant='destructive'>Đang chờ hỗ trợ</Badge>
            ) : (
              <Badge variant='secondary'>Đã hỗ trợ</Badge>
            )}
          </div>
        )
      },
      {
        id: 5,
        render: (chatRoom: any) => (
          <div>
            {chatRoom.isClose ? <Badge variant='secondary'>Đã đóng</Badge> : <Badge variant='green'>Đang mở</Badge>}
          </div>
        )
      },
      {
        id: 6,
        render: (chatRoom: any) => (
          <div>
            {chatRoom.unreadCount > 0 ? (
              <Badge variant='blue'>{chatRoom.unreadCount} tin nhắn mới</Badge>
            ) : (
              <span className='text-sm text-muted-foreground'>Không có tin mới</span>
            )}
          </div>
        )
      },
      {
        id: 7,
        render: (chatRoom: any) => (
          <div className='flex justify-end min-w-[40px]'>
            <MoreOptions
              itemType='user'
              onView={() => router.push(`${configRoute.support.chat}/${chatRoom.id}`)}
              item={chatRoom}
            />
          </div>
        )
      }
    ],
    [router]
  )

  const tableData: dataListType = {
    data: chatRooms,
    message,
    pagination
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Danh sách trò chuyện hỗ trợ</h1>
          <p className='text-muted-foreground mt-1'>Quản lý các cuộc trò chuyện hỗ trợ của khách hàng</p>
        </div>
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.support.chat}
        loading={isLoading}
        showSearch={false}
      />
    </div>
  )
}

export default SupportChat
