'use client'

import { use, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, Star, GraduationCap, Settings, Plus } from 'lucide-react'
import { TableCustom, dataListType } from '@/components/table-custom'
import { SearchParams } from '@/types/query'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Input } from '@/components/ui/input'
import { MoreOptions } from '@/components/private/content-creator/course/more-options'
import { useCoursesAdminQuery } from '@/queries/useCourse'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function ContentCreatorCourse(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()
  const pathname = usePathname()

  // Lấy giá trị từ searchParams hoặc sử dụng giá trị mặc định
  const currentKeyword = (searchParams.keyword as string) || ''
  const currentPageSize = Number(searchParams.page_size) || 5
  const currentPageIndex = Number(searchParams.page_index) || 1

  // Hàm để cập nhật URL khi thay đổi các giá trị
  const updateSearchParams = (newParams: { keyword?: string; page_size?: number; page_index?: number }) => {
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

  // Gọi API với giá trị từ URL
  const {
    data: responseData,
    isLoading,
    error
  } = useCoursesAdminQuery({
    keyword: currentKeyword,
    page_size: currentPageSize,
    page_index: currentPageIndex
  })

  useEffect(() => {
    if (responseData) {
      console.log('Dữ liệu khóa học từ content creator:', responseData)
    }
    if (error) {
      console.error('Lỗi khi tải khóa học:', error)
    }
  }, [responseData, error])

  const data = responseData?.payload.data || []
  const pagination = responseData?.payload.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }

  // Cấu hình cột cho bảng
  const headerColumn = [
    { id: 1, name: 'Tên khóa học' },
    { id: 2, name: 'Đánh giá' },
    { id: 3, name: 'Số người học' },
    { id: 4, name: 'Trạng thái' },
    { id: 5, name: 'Ngày tạo' },
    { id: 6, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (course: any) => (
          <div className='flex items-center gap-3 min-w-[300px] max-w-[400px]'>
            <div className='relative h-12 w-12 flex-shrink-0'>
              <Image
                src={course.imageUrl}
                alt={course.title}
                fill
                className='rounded-md object-cover'
                sizes='48px'
                priority={false}
              />
            </div>
            <div className='space-y-0.5 overflow-hidden'>
              <div className='font-medium truncate'>{course.title}</div>
              <div className='text-xs text-muted-foreground line-clamp-1'>{course.description}</div>
            </div>
          </div>
        )
      },
      {
        id: 2,
        render: (course: any) => (
          <div className='flex items-center min-w-[80px]'>
            <span className='text-sm font-medium'>
              {course.aveRating.toFixed(1) == 0 ? 5 : course.aveRating.toFixed(1)}
            </span>
          </div>
        )
      },
      {
        id: 3,
        render: (course: any) => (
          <div className='flex items-center min-w-[100px]'>
            <span className='text-sm font-medium'>{course.totalEnrollment}</span>
          </div>
        )
      },
      {
        id: 4,
        render: (course: any) => (
          <div className='flex items-center min-w-[100px]'>
            <Badge variant={course.isBanned ? 'destructive' : 'green'} className='w-fit'>
              {course.isBanned ? 'Đã khóa' : 'Hoạt động'}
            </Badge>
          </div>
        )
      },
      {
        id: 5,
        render: (course: any) => (
          <div className='min-w-[120px]'>
            <div className='text-sm'>{format(new Date(course.createdAt), 'dd/MM/yyyy', { locale: vi })}</div>
            <div className='text-xs text-muted-foreground'>
              {format(new Date(course.createdAt), 'HH:mm', { locale: vi })}
            </div>
          </div>
        )
      },
      {
        id: 6,
        render: (course: any) => (
          <div className='flex justify-end min-w-[40px]'>
            <MoreOptions
              blog={course}
              onView={() => router.push(`/content-creator/course/${course.id}`)}
              onEdit={() => router.push(`/content-creator/course/${course.id}/edit`)}
              onPreview={() => router.push(`/course/${course.slug}`)}
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

  // Tính toán thống kê
  const totalCourses = pagination.totalItem || 0
  const totalEnrollments = data.reduce((sum: number, course: any) => sum + course.totalEnrollment, 0)
  const averageRating =
    data.length > 0
      ? (data.reduce((sum: number, course: any) => sum + course.aveRating, 0) / data.length).toFixed(1)
      : 0
  const bannedCourses = data.filter((course: any) => course.isBanned).length

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý khóa học</h1>
          <p className='text-muted-foreground mt-1'>Quản lý và theo dõi tất cả khóa học của bạn</p>
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
              Tạo khóa học mới
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards với Skeleton */}
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
                <CardTitle className='text-sm font-medium'>Tổng khóa học</CardTitle>
                <BookOpen className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{totalCourses}</div>
                <p className='text-xs text-muted-foreground'>Số lượng khóa học của bạn</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Tổng lượt đăng ký</CardTitle>
                <Users className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{totalEnrollments}</div>
                <p className='text-xs text-muted-foreground'>Số lượt đăng ký khóa học</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Đánh giá trung bình</CardTitle>
                <Star className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{averageRating}</div>
                <p className='text-xs text-muted-foreground'>Điểm đánh giá trung bình</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Khóa học bị khóa</CardTitle>
                <GraduationCap className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{bannedCourses}</div>
                <p className='text-xs text-muted-foreground'>Số khóa học đang bị khóa</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Search */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <Input
          placeholder='Tìm kiếm khóa học...'
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
        href='/content-creator/course'
        loading={isLoading}
      />
    </div>
  )
}

export default ContentCreatorCourse
