'use client'

import { use, useEffect, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, MessageSquare, BarChart, ThumbsUp, Settings, Plus } from 'lucide-react'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { MoreOptions } from '@/components/private/common/more-options'
import { useBlogDeleteMutation, useMyBlogsQuery } from '@/queries/useBlog'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'

function Blogs(props: { searchParams: SearchParams }) {
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
  } = useMyBlogsQuery({
    keyword: currentKeyword,
    page_size: currentPageSize,
    page_index: currentPageIndex
  })

  // Thêm mutation và hàm xử lý xóa blog
  const deleteBlogMutation = useBlogDeleteMutation()

  const handleDelete = useCallback(
    async (blogId: string) => {
      try {
        await deleteBlogMutation.mutateAsync(blogId)
        toast({
          description: 'Xóa bài viết thành công'
        })
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    },
    [deleteBlogMutation]
  )

  useEffect(() => {
    if (responseData) {
    }
    if (error) {
      handleErrorApi({
        error
      })
    }
  }, [responseData, error])

  const data = responseData?.payload.data.blogs || []
  const pagination = responseData?.payload.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const statistics = responseData?.payload.data.statistics || {
    totalBlogs: 0,
    totalReacts: 0,
    totalComments: 0,
    totalVisibleBlogs: 0
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
              {blog.status === 'VISIBLE' ? 'Đã xuất bản' : 'Bản nháp'}
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
              onView={() => router.push(`/manager/blog/${blog.id}`)}
              onEdit={() => router.push(`/manager/blog/${blog.id}/edit`)}
              onDelete={() => handleDelete(blog.id)}
              onManageComments={() => router.push(`/manager/blog/${blog.id}/comments`)}
              onPreview={() => window.open(`/knowledge/${blog.slug}`, '_blank')}
            />
          </div>
        )
      }
    ],
    [router, handleDelete]
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
          <h1 className='text-2xl font-bold'>Quản lý bài viết</h1>
          <p className='text-muted-foreground mt-1'>Quản lý và theo dõi tất cả bài viết trong hệ thống</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='outline' asChild>
            <Link href='/manager/blog/categories'>
              <Settings className='w-4 h-4 mr-2' />
              Quản lý danh mục
            </Link>
          </Button>
          <Button asChild>
            <Link href='/manager/blog/new'>
              <Plus className='w-4 h-4 mr-2' />
              Tạo bài viết mới
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards with Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {isLoading ? (
          // Stats Cards Skeleton
          [...Array(4)].map((_, i) => (
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
                <CardTitle className='text-sm font-medium'>Tổng bài viết</CardTitle>
                <BookOpen className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.totalBlogs}</div>
                <p className='text-xs text-muted-foreground'>Số lượng bài viết trong hệ thống</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Tổng lượt thích</CardTitle>
                <ThumbsUp className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.totalReacts}</div>
                <p className='text-xs text-muted-foreground'>Số lượt thích của tất cả bài viết</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Tổng bình luận</CardTitle>
                <MessageSquare className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.totalComments}</div>
                <p className='text-xs text-muted-foreground'>Số bình luận của tất cả bài viết</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Bài viết đã xuất bản</CardTitle>
                <BarChart className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.totalVisibleBlogs}</div>
                <p className='text-xs text-muted-foreground'>Số bài viết đã được xuất bản</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Table with integrated search */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.manager.blog}
        loading={isLoading}
        showSearch={true}
        searchParamName='keyword'
        searchPlaceholder='Tìm kiếm bài viết...'
      />
    </div>
  )
}

export default Blogs
