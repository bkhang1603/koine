'use client'

import { use, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Eye, FilePen, GraduationCap, Settings, Plus } from 'lucide-react'
import { TableCustom, dataListType } from '@/components/table-custom'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { MoreOptions } from '@/components/private/common/more-options'
import { useDeleteCourseMutation, useGetDraftCoursesQuery, useUpdateStatusCourseMutation } from '@/queries/useCourse'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { formatCourseStatus, handleErrorApi } from '@/lib/utils'

function ContentCreatorCourse(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()

  // Lấy giá trị từ searchParams hoặc sử dụng giá trị mặc định
  const currentKeyword = (searchParams.keyword as string) || ''
  const currentPageSize = Number(searchParams.page_size) || 10
  const currentPageIndex = Number(searchParams.page_index) || 1

  // Gọi API với giá trị từ URL
  const { data: responseData, isLoading } = useGetDraftCoursesQuery({
    keyword: currentKeyword,
    page_size: currentPageSize,
    page_index: currentPageIndex
  })

  const deleteCourseMutation = useDeleteCourseMutation()
  const updateStatusCourseMutation = useUpdateStatusCourseMutation()

  const handleDelete = useCallback(
    async (courseId: string) => {
      try {
        await deleteCourseMutation.mutateAsync(courseId)
        toast({
          description: 'Xóa khóa học thành công'
        })
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    },
    [deleteCourseMutation]
  )

  const handleUpdateStatus = useCallback(
    async (courseId: string) => {
      try {
        await updateStatusCourseMutation.mutateAsync({
          id: courseId,
          data: {
            status: 'PENDINGREVIEW',
            isDraft: false
          }
        })
        toast({
          description: 'Gửi yêu cầu xét duyệt thành công'
        })
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    },
    [updateStatusCourseMutation]
  )

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
    { id: 2, name: 'Ngày tạo' },
    { id: 3, name: 'Hiển thị' },
    { id: 4, name: 'Trạng thái' },
    { id: 5, name: '' }
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
          <div className='min-w-[120px]'>
            <div className='text-sm'>{format(new Date(course.createdAt), 'dd/MM/yyyy', { locale: vi })}</div>
            <div className='text-xs text-muted-foreground'>
              {format(new Date(course.createdAt), 'HH:mm', { locale: vi })}
            </div>
          </div>
        )
      },
      {
        id: 3,
        render: (course: any) => (
          <div className='flex items-center min-w-[100px]'>
            <Badge variant={course.isVisible ? 'green' : 'destructive'} className='w-fit'>
              {course.isVisible ? 'Hiển thị' : 'Ẩn'}
            </Badge>
          </div>
        )
      },
      {
        id: 4,
        render: (course: any) => (
          <div className='flex items-center min-w-[100px]'>
            <Badge
              variant={course.status === 'REJECTED' ? 'destructive' : course.isDraft ? 'yellow' : 'outline'}
              className='w-fit'
            >
              {course.status === 'REJECTED' ? 'Từ chối' : course.isDraft ? 'Nháp' : formatCourseStatus(course.status)}
            </Badge>
          </div>
        )
      },
      {
        id: 5,
        render: (course: any) => (
          <div className='flex justify-end min-w-[40px]'>
            <MoreOptions
              item={course}
              itemType='course'
              onView={() => router.push(`/content-creator/course/${course.id}`)}
              onEdit={() => router.push(`/content-creator/course/${course.id}/edit`)}
              onDelete={() => handleDelete(course.id)}
              onUpdateStatusCourse={() => handleUpdateStatus(course.id)}
              updateStatusLabel='Yêu cầu xét duyệt'
              isUpdateStatusEnabled={course.isDraft}
            />
          </div>
        )
      }
    ],
    [router, handleDelete, handleUpdateStatus]
  )

  const tableData: dataListType = {
    data,
    message: responseData?.payload.message || '',
    pagination
  }

  // Tính toán thống kê
  const totalCourses = pagination.totalItem || 0
  const visibleCourses = data.filter((course: any) => course.isVisible).length
  const draftCourses = data.filter((course: any) => course.isDraft).length
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
                <CardTitle className='text-sm font-medium'>Khóa học đang hiển thị</CardTitle>
                <Eye className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{visibleCourses}</div>
                <p className='text-xs text-muted-foreground'>Số khóa học đang hiển thị</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium'>Khóa học đang nháp</CardTitle>
                <FilePen className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{draftCourses}</div>
                <p className='text-xs text-muted-foreground'>Số khóa học đang nháp</p>
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

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href='/content-creator/course'
        loading={isLoading}
        showSearch={true}
        searchParamName='keyword'
        searchPlaceholder='Tìm kiếm khóa học...'
      />
    </div>
  )
}

export default ContentCreatorCourse
