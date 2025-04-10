'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Settings, BookOpen, MessageSquare, BarChart, ThumbsUp } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useBlogDeleteMutation, useMyBlogsQuery } from '@/queries/useBlog'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { TableCustom, dataListType } from '@/components/table-custom'
import Image from 'next/image'
import { MoreOptions } from '@/components/private/common/more-options'

// Custom hook useDebounce
// eslint-disable-next-line no-unused-vars
function useDebounce<T>(value: T, delay: number = 800): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default function BlogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get values from searchParams or use default values
  const currentKeyword = searchParams.get('keyword') || ''
  const currentPageSize = Number(searchParams.get('page_size')) || 10
  const currentPageIndex = Number(searchParams.get('page_index')) || 1

  // Lấy danh sách blog từ API
  const { data: blogsResponse, isLoading } = useMyBlogsQuery({
    keyword: currentKeyword,
    page_index: currentPageIndex,
    page_size: currentPageSize
  })

  const deleteBlogMutation = useBlogDeleteMutation()

  // Dữ liệu blog từ API
  const blogs = blogsResponse?.payload.data.blogs || []
  const pagination = blogsResponse?.payload.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const statistics = blogsResponse?.payload.data.statistics || {
    totalBlogs: 0,
    totalReacts: 0,
    totalComments: 0,
    totalVisibleBlogs: 0
  }

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

  // Column configuration for the table
  const headerColumn = [
    { id: 1, name: 'Tiêu đề bài viết' },
    { id: 2, name: 'Ngày tạo' },
    { id: 3, name: 'Lượt thích' },
    { id: 4, name: 'Bình luận' },
    { id: 5, name: 'Trạng thái' },
    { id: 6, name: '' }
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
          <div className='flex items-center min-w-[80px]'>
            <span className='text-sm font-medium'>{blog.totalReact}</span>
          </div>
        )
      },
      {
        id: 4,
        render: (blog: any) => (
          <div className='flex items-center min-w-[100px]'>
            <span className='text-sm font-medium'>{blog.totalComment}</span>
          </div>
        )
      },
      {
        id: 5,
        render: (blog: any) => (
          <div className='flex items-center min-w-[100px]'>
            <Badge variant={blog.status === 'VISIBLE' ? 'green' : 'secondary'} className='w-fit'>
              {blog.status === 'VISIBLE' ? 'Đã xuất bản' : 'Bản nháp'}
            </Badge>
          </div>
        )
      },
      {
        id: 6,
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
              onView={() => router.push(`/content-creator/blog/${blog.id}`)}
              onEdit={() => router.push(`/content-creator/blog/${blog.id}/edit`)}
              onDelete={() => handleDelete(blog.id)}
              onManageComments={() => router.push(`/content-creator/blog/${blog.id}/comments`)}
              onPreview={() => window.open(`/knowledge/${blog.slug}`, '_blank')}
            />
          </div>
        )
      }
    ],
    [router, handleDelete]
  )

  const tableData: dataListType = {
    data: blogs,
    message: blogsResponse?.payload.message || '',
    pagination
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Bài viết của bạn</h1>
          <p className='text-muted-foreground mt-1'>Quản lý và tạo mới các bài viết</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='outline' asChild>
            <Link href='/content-creator/blog/categories'>
              <Settings className='w-4 h-4 mr-2' />
              Quản lý danh mục
            </Link>
          </Button>
          <Button asChild>
            <Link href='/content-creator/blog/new'>
              <Plus className='w-4 h-4 mr-2' />
              Viết bài mới
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
                <p className='text-xs text-muted-foreground'>Số lượng bài viết của bạn</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Tổng lượt thích</CardTitle>
                <ThumbsUp className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.totalReacts}</div>
                <p className='text-xs text-muted-foreground'>Số lượt thích của bài viết</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Tổng bình luận</CardTitle>
                <MessageSquare className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statistics.totalComments}</div>
                <p className='text-xs text-muted-foreground'>Số bình luận của bài viết</p>
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
        href={'/content-creator/blog'}
        loading={isLoading}
        showSearch={true}
        searchParamName='keyword'
        searchPlaceholder='Tìm kiếm bài viết...'
      />
    </div>
  )
}
