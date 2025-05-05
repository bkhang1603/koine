'use client'

import { use, useMemo } from 'react'
import { useReportListQuery } from '@/queries/useReport'
import { TableCustom, dataListType } from '@/components/table-custom'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { MoreOptions } from '@/components/private/common/more-options'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import configRoute from '@/config/route'

function ReportPage(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()

  const currentStatus = (searchParams.status as string) || ''
  const currentType = (searchParams.type as string) || ''
  const currentPageSize = Number(searchParams.page_size) || 10
  const currentPageIndex = Number(searchParams.page_index) || 1

  const {
    data: responseData,
    isLoading,
    // eslint-disable-next-line no-unused-vars
    error
  } = useReportListQuery({
    page_size: currentPageSize,
    page_index: currentPageIndex,
    status: currentStatus,
    type: currentType
  })

  // Correctly access the nested data structure
  const reports = responseData?.payload?.data || []
  const pagination = responseData?.payload?.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const message = responseData?.payload?.message || ''

  // Cấu hình màu sắc và nhãn cho trạng thái
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reportStatusConfig = {
    PENDING: { label: 'Đang xử lý', variant: 'default' },
    REJECT: { label: 'Từ chối', variant: 'destructive' },
    APPROVED: { label: 'Đã duyệt', variant: 'secondary' }
  } as const

  // Cấu hình loại báo cáo
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reportTypeConfig = {
    COURSE: 'Khóa học',
    BLOG: 'Bài viết',
    PRODUCT: 'Sản phẩm'
  } as const

  // Cấu hình cột cho bảng
  const headerColumn = [
    { id: 1, name: 'Thời gian báo cáo' },
    { id: 2, name: 'Loại báo cáo' },
    { id: 3, name: 'Lý do' },
    { id: 4, name: 'Trạng thái' },
    { id: 5, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (report: any) => {
          const reportDate = new Date(report.createdAt)
          return (
            <div className='space-y-0.5'>
              <div className='text-sm font-medium'>{format(reportDate, 'dd/MM/yyyy', { locale: vi })}</div>
              <div className='text-xs text-muted-foreground'>{format(reportDate, 'HH:mm', { locale: vi })}</div>
            </div>
          )
        }
      },
      {
        id: 2,
        render: (report: any) => {
          const type = report.type
          return <span>{reportTypeConfig[type as keyof typeof reportTypeConfig] || type}</span>
        }
      },
      {
        id: 3,
        render: (report: any) => (
          <div className='max-w-[200px] truncate'>
            <span>{report.reason?.name}</span>
            {report.reasonDetail && <p className='text-xs text-muted-foreground truncate'>{report.reasonDetail}</p>}
          </div>
        )
      },
      {
        id: 4,
        render: (report: any) => {
          const status = report.status
          const config = reportStatusConfig[status as keyof typeof reportStatusConfig] || {
            label: status,
            variant: 'default'
          }

          return <Badge variant={config.variant as any}>{config.label}</Badge>
        }
      },
      {
        id: 5,
        render: (report: any) => (
          <MoreOptions
            item={{
              id: report.id,
              title: report.reasonDetail || '',
              status: report.status,
              slug: ''
            }}
            itemType='ticket'
            onView={() => router.push(`${configRoute.admin.report}/${report.id}`)}
          />
        )
      }
    ],
    [reportStatusConfig, reportTypeConfig, router]
  )

  const tableData: dataListType = {
    data: reports,
    message,
    pagination
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold'>Quản lý báo cáo</h1>
        <p className='text-muted-foreground mt-1'>Xem và xử lý các báo cáo từ người dùng</p>
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.admin.report}
        loading={isLoading}
        showSearch={false}
        filterComponent={
          <div className='flex flex-col sm:flex-row gap-3'>
            <Select
              value={currentStatus}
              onValueChange={(value) => {
                const params = new URLSearchParams(searchParams as Record<string, string>)
                if (value === '--') {
                  params.delete('status')
                } else {
                  params.set('status', value)
                }
                params.set('page_index', '1')
                router.replace(`${window.location.pathname}?${params.toString()}`)
              }}
            >
              <SelectTrigger className='w-full sm:w-[180px]'>
                <SelectValue placeholder='Trạng thái báo cáo' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='--'>--</SelectItem>
                <SelectItem value='PENDING'>Đang xử lý</SelectItem>
                <SelectItem value='REJECT'>Từ chối</SelectItem>
                <SelectItem value='APPROVED'>Đã duyệt</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={currentType}
              onValueChange={(value) => {
                const params = new URLSearchParams(searchParams as Record<string, string>)
                if (value === '--') {
                  params.delete('type')
                } else {
                  params.set('type', value)
                }
                params.set('page_index', '1')
                router.replace(`${window.location.pathname}?${params.toString()}`)
              }}
            >
              <SelectTrigger className='w-full sm:w-[180px]'>
                <SelectValue placeholder='Loại báo cáo' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='--'>--</SelectItem>
                <SelectItem value='COURSE'>Khóa học</SelectItem>
                <SelectItem value='BLOG'>Bài viết</SelectItem>
                <SelectItem value='PRODUCT'>Sản phẩm</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />
    </div>
  )
}

export default ReportPage
