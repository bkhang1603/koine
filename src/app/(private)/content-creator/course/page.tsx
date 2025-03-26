'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CourseFilters } from '@/components/private/content-creator/course/course-filters'
import { EmptyCourses } from '@/components/private/content-creator/course/empty-courses'
import { DeleteCourseDialog } from '@/components/private/content-creator/course/delete-course-dialog'
import { CourseCard } from '@/components/private/content-creator/course/course-card'
import { useGetCoursesQuery, useDeleteCourseMutation } from '@/queries/useCourse'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'

// Component cho Skeleton loading
const CourseCardSkeleton = () => (
  <div className='rounded-lg border bg-card shadow-sm overflow-hidden'>
    <Skeleton className='h-[200px] w-full' />
    <div className='p-6'>
      <div className='flex gap-1.5 mb-4'>
        <Skeleton className='h-5 w-16' />
        <Skeleton className='h-5 w-20' />
      </div>
      <Skeleton className='h-6 w-full mb-2' />
      <Skeleton className='h-4 w-full mb-2' />
      <Skeleton className='h-4 w-3/4 mb-6' />
      <div className='flex items-center justify-between mt-6'>
        <Skeleton className='h-6 w-20' />
        <Skeleton className='h-5 w-24' />
      </div>
    </div>
    <div className='px-6 py-4 border-t'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-4 w-32' />
        </div>
        <Skeleton className='h-8 w-8 rounded-full' />
      </div>
    </div>
  </div>
)

// Custom hook cho debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined)
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize] = useState(9) // Hiển thị 9 khóa học mỗi trang
  const router = useRouter()
  const [ageFilter, setAgeFilter] = useState('all')

  // Áp dụng debounce cho searchQuery
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  // Lấy danh sách khóa học từ API
  const { data: coursesResponse, isLoading } = useGetCoursesQuery({
    page_index: pageIndex,
    page_size: pageSize,
    keyword: debouncedSearchQuery ?? '',
    sort: 'pa',
    category: '',
    range: 0
    // Có thể bổ sung thêm các params khác như category, status nếu API hỗ trợ
  })

  const deleteMutation = useDeleteCourseMutation()

  // Dữ liệu từ API
  const courses = coursesResponse?.payload?.data || []
  const totalCourses = coursesResponse?.payload?.pagination?.totalItem || 0
  const totalPages = Math.ceil(totalCourses / pageSize)

  // Xử lý xóa khóa học
  const handleDelete = (courseId: string) => {
    setSelectedCourse(courseId)
    setTimeout(() => setDeleteDialogOpen(true), 100)
  }

  // Xác nhận xóa khóa học
  const confirmDelete = async () => {
    if (!selectedCourse) return

    try {
      await deleteMutation.mutateAsync(selectedCourse)
      toast({
        description: 'Xóa khóa học thành công'
      })
      // Refresh dữ liệu sau khi xóa
    } catch (error) {
      handleErrorApi({
        error
      })
    } finally {
      setDeleteDialogOpen(false)
      setTimeout(() => setSelectedCourse(undefined), 300)
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
  }, [debouncedSearchQuery, selectedCategory, statusFilter, priceFilter])

  return (
    <div className='container mx-auto px-4 py-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold'>Khóa học của bạn</h1>
          <p className='text-sm text-muted-foreground mt-1'>Quản lý và tạo mới các khóa học</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='outline' asChild>
            <Link href='/content-creator/course/categories'>
              <Settings className='w-4 h-4 mr-2' />
              Quản lý danh mục
            </Link>
          </Button>
          <Button asChild>
            <Link href='/content-creator/course/new'>
              <Plus className='w-4 h-4 mr-2' />
              Tạo khóa học
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters - Trong Card */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Tìm kiếm và lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <CourseFilters
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            ageFilter={ageFilter}
            statusFilter={statusFilter}
            priceFilter={priceFilter}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            onAgeFilterChange={setAgeFilter}
            onStatusFilterChange={setStatusFilter}
            onPriceFilterChange={setPriceFilter}
          />
        </CardContent>
      </Card>

      {/* Course List - Trong Card */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khóa học</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {isLoading ? (
              // Hiển thị skeleton cards khi đang tải
              Array(6)
                .fill(0)
                .map((_, index) => <CourseCardSkeleton key={index} />)
            ) : courses.length > 0 ? (
              // Hiển thị course cards khi có dữ liệu
              courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onDelete={handleDelete}
                  onNavigate={(url) => router.push(url)}
                />
              ))
            ) : (
              // Hiển thị trạng thái trống khi không có dữ liệu
              <div className='col-span-full'>
                <EmptyCourses />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
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
      <DeleteCourseDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} />
    </div>
  )
}
