'use client'

import { use, useMemo, useCallback } from 'react'
import { LayoutList } from 'lucide-react'
import { TableCustom, dataListType } from '@/components/table-custom'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { MoreOptions } from '@/components/private/common/more-options'
import { useGetDraftCoursesQuery, useUpdateStatusCourseMutation } from '@/queries/useCourse'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from '@/components/ui/use-toast'
import { formatCourseStatus, handleErrorApi } from '@/lib/utils'
import configRoute from '@/config/route'

function SalesmanCourse(props: { searchParams: SearchParams }) {
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

  const updateStatusCourseMutation = useUpdateStatusCourseMutation()

  const handleUpdateStatus = useCallback(
    async (courseId: string) => {
      try {
        // Update status to PENDINGPRICING
        await updateStatusCourseMutation.mutateAsync({
          id: courseId,
          data: {
            status: 'PENDINGPRICING',
            isDraft: false
          }
        })

        toast({
          description: 'Duyệt khóa học thành công'
        })
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    },
    [updateStatusCourseMutation]
  )

  const handleRejectCourse = useCallback(
    async (courseId: string) => {
      try {
        // Update status to REJECTED
        await updateStatusCourseMutation.mutateAsync({
          id: courseId,
          data: {
            status: 'REJECTED',
            isDraft: false
          }
        })

        toast({
          description: 'Từ chối khóa học thành công'
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
    { id: 5, name: 'Khóa' },
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
        render: (course: any) => {
          const date = course.createdAt ? new Date(course.createdAt) : new Date()
          return (
            <div className='min-w-[120px]'>
              <div className='text-sm'>{format(date, 'dd/MM/yyyy', { locale: vi })}</div>
              <div className='text-xs text-muted-foreground'>{format(date, 'HH:mm', { locale: vi })}</div>
            </div>
          )
        }
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
            <Badge variant='outline' className='w-fit bg-primary/10'>
              {formatCourseStatus(course.status)}
            </Badge>
          </div>
        )
      },
      {
        id: 5,
        render: (course: any) => (
          <div className='flex items-center min-w-[100px]'>
            <Badge variant={course.isBanned ? 'destructive' : 'green'} className='w-fit'>
              {course.isBanned ? 'Đã khóa' : 'Không khóa'}
            </Badge>
          </div>
        )
      },
      {
        id: 6,
        render: (course: any) => (
          <div className='flex justify-end min-w-[40px]'>
            <MoreOptions
              item={{
                id: course.id,
                title: course.title,
                status: course.status,
                slug: course.slug,
                isDraft: course.isDraft
              }}
              itemType='course'
              onView={() => router.push(`${configRoute.expert.course}/${course.id}`)}
              onUpdateStatusCourse={() => handleUpdateStatus(course.id)}
              onReject={() => handleRejectCourse(course.id)}
              updateStatusLabel='Duyệt khóa học'
              isUpdateStatusEnabled={course.status === 'PENDINGREVIEW'}
              isActionEnabled={course.status === 'PENDINGREVIEW'}
            />
          </div>
        )
      }
    ],
    [router, handleUpdateStatus, handleRejectCourse]
  )

  const tableData: dataListType = {
    data,
    message: '',
    pagination
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold'>Quản lý khóa học</h1>
            <p className='text-muted-foreground mt-1'>Quản lý và theo dõi tất cả khóa học trong hệ thống</p>
          </div>
          <Link href='/salesman/course/categories'>
            <Button variant='outline'>
              <LayoutList className='w-4 h-4 mr-2' />
              Quản lý danh mục
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        loading={isLoading}
        href={configRoute.expert.course}
        showSearch={true}
        searchParamName='keyword'
        searchPlaceholder='Tìm kiếm khoá học...'
      />
    </div>
  )
}

export default SalesmanCourse
