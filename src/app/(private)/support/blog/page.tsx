'use client'

import { use, useEffect, useMemo } from 'react'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { MoreOptions } from '@/components/private/common/more-options'
import { useBlogListAdminQuery } from '@/queries/useBlog'
import Image from 'next/image'
import { handleErrorApi } from '@/lib/utils'

function SupporterBlog(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()

  // Get values from searchParams or use default values
  const currentKeyword = (searchParams.keyword as string) || ''
  const currentPageSize = Number(searchParams.page_size) || 10
  const currentPageIndex = Number(searchParams.page_index) || 1

  // Call API with URL values
  const {
    data: responseData,
    isLoading,
    error
  } = useBlogListAdminQuery({
    keyword: currentKeyword,
    page_size: currentPageSize,
    page_index: currentPageIndex
  })

  useEffect(() => {
    if (error) {
      handleErrorApi({
        error
      })
    }
  }, [error])

  const data = responseData?.payload.data || []
  const pagination = responseData?.payload.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }

  // Column configuration for the table
  const headerColumn = [
    { id: 1, name: 'Tiêu đề bài viết' },
    { id: 2, name: 'Ngày tạo' },
    { id: 3, name: 'Tác giả' },
    { id: 4, name: 'Lượt thích' },
    { id: 5, name: 'Bình luận' },
    { id: 6, name: 'Trạng thái' },
    { id: 7, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (blog: any) => (
          <div className='flex items-center gap-3 min-w-[300px] max-w-[400px]'>
            <div className='relative h-12 w-12 flex-shrink-0'>
              <Image
                src={blog.imageUrl}
                alt={`Hình ảnh bài viết ${blog.title}`}
                fill
                className='rounded-md object-cover'
                sizes='48px'
                priority={false}
              />
            </div>
            <div className='space-y-0.5 overflow-hidden'>
              <div className='font-medium truncate'>{blog.title}</div>
              <div className='text-xs text-muted-foreground line-clamp-1'>{blog.description}</div>
            </div>
          </div>
        )
      },
      {
        id: 2,
        render: (blog: any) => (
          <div className='min-w-[120px]'>
            <div className='text-sm'>{format(new Date(blog.createdAt), 'dd/MM/yyyy', { locale: vi })}</div>
            <div className='text-xs text-muted-foreground'>
              {format(new Date(blog.createdAt), 'HH:mm', { locale: vi })}
            </div>
          </div>
        )
      },
      {
        id: 3,
        render: (blog: any) => (
          <div className='min-w-[120px]'>
            <div className='text-sm'>{blog.creatorInfo.firstName}</div>
          </div>
        )
      },
      {
        id: 4,
        render: (blog: any) => (
          <div className='flex items-center min-w-[80px]'>
            <span className='text-sm font-medium'>{blog.totalReact}</span>
          </div>
        )
      },
      {
        id: 5,
        render: (blog: any) => (
          <div className='flex items-center min-w-[100px]'>
            <span className='text-sm font-medium'>{blog.totalComment}</span>
          </div>
        )
      },
      {
        id: 6,
        render: (blog: any) => (
          <div className='flex items-center min-w-[100px]'>
            <Badge variant={blog.status === 'VISIBLE' ? 'green' : 'secondary'} className='w-fit'>
              {blog.status === 'VISIBLE' ? 'Hiển thị' : 'Ẩn'}
            </Badge>
          </div>
        )
      },
      {
        id: 7,
        render: (blog: any) => (
          <div className='flex justify-end min-w-[40px]'>
            <MoreOptions
              item={{
                id: blog.id,
                title: blog.title,
                status: blog.status,
                slug: blog.slug
              }}
              itemType='blog'
              onView={() => router.push(`/support/blog/${blog.id}`)}
              onManageComments={() => router.push(`/support/blog/${blog.id}/comment`)}
            />
          </div>
        )
      }
    ],
    [router]
  )

  const tableData: dataListType = {
    data,
    message: responseData?.payload.message || '',
    pagination
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Danh sách bài viết</h1>
          <p className='text-muted-foreground mt-1'>Xem và theo dõi tất cả bài viết trong hệ thống</p>
        </div>
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        loading={isLoading}
        href={configRoute.support.blog}
        showSearch={true}
        searchParamName='keyword'
        searchPlaceholder='Tìm kiếm bài viết...'
      />
    </div>
  )
}

export default SupporterBlog
