'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BlogCard } from '@/components/private/content-creator/blog/blog-card'
import { BlogFilters } from '@/components/private/content-creator/blog/blog-filters'
import { EmptyBlogs } from '@/components/private/content-creator/blog/empty-blogs'
import { DeleteBlogDialog } from '@/components/private/content-creator/blog/delete-blog-dialog'
import { useBlogDeleteMutation, useBlogQuery } from '@/queries/useBlog'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'

// Tạo component BlogCardSkeleton
const BlogCardSkeleton = () => (
  <div className='rounded-lg border bg-card shadow-sm overflow-hidden'>
    <Skeleton className='h-[200px] w-full' />
    <div className='p-6'>
      <div className='flex items-center gap-2 mb-4'>
        <Skeleton className='h-4 w-4' />
        <div className='flex gap-1.5'>
          <Skeleton className='h-5 w-16' />
          <Skeleton className='h-5 w-20' />
        </div>
      </div>
      <Skeleton className='h-6 w-full mb-2' />
      <Skeleton className='h-4 w-full mb-2' />
      <Skeleton className='h-4 w-3/4 mb-6' />
      <div className='flex items-center gap-3'>
        <Skeleton className='h-9 w-9 rounded-full' />
        <div className='flex flex-col'>
          <Skeleton className='h-4 w-20 mb-1' />
          <Skeleton className='h-3 w-24' />
        </div>
      </div>
    </div>
    <div className='px-6 py-4 border-t'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-4 w-12' />
          <Skeleton className='h-4 w-12' />
        </div>
        <Skeleton className='h-8 w-8 rounded-full' />
      </div>
    </div>
  </div>
)

// Custom hook useDebounce
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Thiết lập timer để cập nhật giá trị debounced sau delay
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Xóa timer cũ nếu value thay đổi (hoặc component unmount)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<string | undefined>(undefined)
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize] = useState(10)
  const router = useRouter()

  // Áp dụng debounce cho searchQuery
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  // Lấy danh sách blog từ API - sử dụng giá trị đã debounce
  const { data: blogsResponse, isLoading } = useBlogQuery({
    page_index: pageIndex,
    search: debouncedSearchQuery, // Sử dụng giá trị debounced thay vì searchQuery
    page_size: pageSize
  })

  const deleteBlogMutation = useBlogDeleteMutation()

  // Dữ liệu blog từ API
  const blogs = blogsResponse?.payload?.data || []
  const totalBlogs = blogsResponse?.payload?.pagination?.totalItem || 0
  const totalPages = Math.ceil(totalBlogs / pageSize)

  // Xử lý xóa blog
  const handleDelete = (blogId: string) => {
    setSelectedBlog(blogId)
    setTimeout(() => setDeleteDialogOpen(true), 100)
  }

  // Xác nhận xóa blog
  const confirmDelete = async () => {
    if (!selectedBlog) return

    try {
      await deleteBlogMutation.mutateAsync(selectedBlog)
      toast({
        description: 'Xóa bài viết thành công'
      })
      // Refresh danh sách sau khi xóa
    } catch (error) {
      handleErrorApi({
        error
      })
    } finally {
      setDeleteDialogOpen(false)
      setTimeout(() => setSelectedBlog(undefined), 300)
    }
  }

  // Xử lý chuyển trang
  const handlePageChange = (page: number) => {
    setPageIndex(page)
  }

  // Xử lý khi thay đổi bộ lọc
  useEffect(() => {
    // Reset về trang 1 khi thay đổi bất kỳ bộ lọc nào
    setPageIndex(1)
  }, [debouncedSearchQuery, selectedCategory, statusFilter]) // Sử dụng debouncedSearchQuery

  return (
    <div className='container mx-auto px-4 py-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold'>Bài viết của bạn</h1>
          <p className='text-sm text-muted-foreground mt-1'>Quản lý và tạo mới các bài viết</p>
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

      {/* Filters trong Card */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Tìm kiếm và lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogFilters
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            statusFilter={statusFilter}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            onStatusFilterChange={setStatusFilter}
          />
        </CardContent>
      </Card>

      {/* Blog List - Trong Card */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bài viết</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {isLoading ? (
              // Hiển thị skeleton cards khi đang tải
              Array(6)
                .fill(0)
                .map((_, index) => <BlogCardSkeleton key={index} />)
            ) : blogs.length > 0 ? (
              // Hiển thị blog cards khi có dữ liệu
              blogs.map((post) => (
                <BlogCard key={post.id} post={post} onDelete={handleDelete} onNavigate={(url) => router.push(url)} />
              ))
            ) : (
              // Hiển thị trạng thái trống khi không có dữ liệu
              <div className='col-span-full'>
                <EmptyBlogs />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pagination - Đưa vào card footer hoặc phần dưới */}
      {totalPages > 1 && (
        <div className='flex justify-center mt-8'>
          <div className='flex space-x-2'>
            <Button
              variant='outline'
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 1 || isLoading}
            >
              Trước
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={pageIndex === i + 1 ? 'default' : 'outline'}
                onClick={() => handlePageChange(i + 1)}
                disabled={isLoading}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant='outline'
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={pageIndex === totalPages || isLoading}
            >
              Sau
            </Button>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <DeleteBlogDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} />
    </div>
  )
}
