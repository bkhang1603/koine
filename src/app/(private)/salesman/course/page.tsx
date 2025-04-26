'use client'

import { use, useMemo, useCallback } from 'react'
import { TableCustom, dataListType } from '@/components/table-custom'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { MoreOptions } from '@/components/private/common/more-options'
import {
  useGetDraftCoursesQuery,
  useUpdateStatusCourseMutation,
  useUpdateIsVisibleCourseMutation
} from '@/queries/useCourse'
import Image from 'next/image'
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
  const updateIsVisibleCourseMutation = useUpdateIsVisibleCourseMutation()

  const handleUpdateStatus = useCallback(
    async (courseId: string) => {
      try {
        // First update the status
        await updateStatusCourseMutation.mutateAsync({
          id: courseId,
          data: {
            status: 'ACTIVE',
            isDraft: false
          }
        })

        // Then update the visibility
        await updateIsVisibleCourseMutation.mutateAsync({
          id: courseId,
          data: {
            isVisible: false
          }
        })

        toast({
          description: 'Kích hoạt khóa học thành công'
        })
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    },
    [updateStatusCourseMutation, updateIsVisibleCourseMutation]
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
              onView={() => router.push(`${configRoute.salesman.course}/${course.id}`)}
              onEdit={() => router.push(`${configRoute.salesman.course}/${course.id}/edit`)}
              onUpdateStatusCourse={() => handleUpdateStatus(course.id)}
              updateStatusLabel='Duyệt giá khoá học'
              isUpdateStatusEnabled={course.status == 'PENDINGPRICING'}
            />
          </div>
        )
      }
    ],
    [router, handleUpdateStatus]
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
        </div>
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        loading={isLoading}
        href={configRoute.salesman.course}
        showSearch={true}
        searchParamName='keyword'
        searchPlaceholder='Tìm kiếm khoá học...'
      />
    </div>
  )
}

export default SalesmanCourse
