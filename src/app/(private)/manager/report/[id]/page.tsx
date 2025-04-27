'use client'
import { use } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { User, Clock, FileText, Tag, Info, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { useReportDetailQuery } from '@/queries/useReport'
import configRoute from '@/config/route'

export default function ReportDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const reportId = params.id

  const { isLoading, error, data } = useReportDetailQuery(reportId)

  if (isLoading) {
    return (
      <div className='container max-w-4xl mx-auto py-6 space-y-8'>
        <Skeleton className='w-[200px] h-10' />
        <div>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='w-[300px] h-8' />
            <Skeleton className='w-[100px] h-6' />
          </div>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className='w-[150px] h-6' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-3/4 h-4' />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !data) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null
          ? JSON.stringify(error)
          : 'Unknown error occurred'

    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>Không tìm thấy báo cáo</h3>
          <p className='text-gray-500'>Báo cáo không tồn tại hoặc đã bị xóa</p>
          {error && (
            <div className='mt-4 p-4 bg-red-50 text-red-800 rounded-md max-w-md mx-auto text-left text-sm'>
              <p className='font-semibold'>Lỗi:</p>
              <p className='break-words'>{errorMessage}</p>
            </div>
          )}
        </div>
        <Button variant='outline' asChild>
          <Link href={configRoute.manager.report}>Quay lại danh sách báo cáo</Link>
        </Button>
      </div>
    )
  }

  const reportData = data?.payload.data || {}

  // Cấu hình màu sắc và nhãn cho trạng thái
  const reportStatusConfig = {
    PENDING: { label: 'Đang xử lý', variant: 'default' },
    REJECT: { label: 'Từ chối', variant: 'destructive' },
    APPROVED: { label: 'Đã duyệt', variant: 'secondary' }
  } as const

  // Cấu hình loại báo cáo
  const reportTypeConfig = {
    COURSE: 'Khóa học',
    BLOG: 'Bài viết'
  } as const

  const formatStatus = (status: string) => {
    const config = reportStatusConfig[status as keyof typeof reportStatusConfig] || {
      label: status,
      variant: 'default'
    }
    return <Badge variant={config.variant as any}>{config.label}</Badge>
  }

  const formatType = (type: string) => {
    return reportTypeConfig[type as keyof typeof reportTypeConfig] || type
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'HH:mm - dd/MM/yyyy', { locale: vi })
    } catch (e) {
      return dateString
    }
  }

  // Tạo đường dẫn đến đối tượng được báo cáo
  const getEntityUrl = () => {
    if (!reportData.reportedEntityId) return null

    switch (reportData.type) {
      case 'COURSE':
        return `${configRoute.manager.course}/${reportData.reportedEntityId}`
      case 'BLOG':
        return `${configRoute.manager.blog}/${reportData.reportedEntityId}`
      default:
        return null
    }
  }

  // Lấy tên đối tượng
  const getEntityName = () => {
    switch (reportData.type) {
      case 'COURSE':
        return 'khóa học'
      case 'BLOG':
        return 'bài viết'
      default:
        return 'đối tượng'
    }
  }

  const entityUrl = getEntityUrl()

  const breadcrumbItems = [
    {
      title: 'Báo cáo',
      href: configRoute.manager.report
    },
    {
      title: `Chi tiết báo cáo #${reportId.substring(0, 8)}`
    }
  ]

  return (
    <div className='container max-w-4xl mx-auto py-6 space-y-8'>
      {/* Breadcrumb component */}
      <div className='mb-6'>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>Chi tiết báo cáo</h1>
          <div>{formatStatus(reportData.status || 'UNKNOWN')}</div>
        </div>
        <div className='flex items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            {formatDate(reportData.createdAt)}
          </div>
        </div>
      </div>

      {/* Report Details */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Info className='w-5 h-5' />
            Thông tin báo cáo
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-muted-foreground'>ID Báo cáo</h3>
              <p className='font-medium break-all'>{reportData.id}</p>
            </div>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-muted-foreground'>Trạng thái</h3>
              <div>{formatStatus(reportData.status)}</div>
            </div>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-muted-foreground'>Loại báo cáo</h3>
              <div className='flex items-center gap-2'>
                <FileText className='h-4 w-4 text-muted-foreground' />
                <span>{formatType(reportData.type)}</span>
              </div>
            </div>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-muted-foreground'>Ngày tạo</h3>
              <p>{formatDate(reportData.createdAt)}</p>
            </div>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-muted-foreground'>Người báo cáo</h3>
              <div className='flex items-center gap-2'>
                <User className='h-4 w-4 text-muted-foreground' />
                <span className='font-medium'>{reportData.reporterId}</span>
              </div>
            </div>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-muted-foreground'>ID đối tượng</h3>
              <div className='flex flex-col gap-2'>
                <p className='break-all'>{reportData.reportedEntityId}</p>
                {entityUrl && (
                  <Button variant='outline' size='sm' asChild className='w-fit flex items-center gap-1'>
                    <Link href={entityUrl}>
                      <ExternalLink className='h-4 w-4 mr-1' />
                      Xem chi tiết {getEntityName()}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className='space-y-4'>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-muted-foreground'>Lý do báo cáo</h3>
              <div className='flex items-center gap-2'>
                <Tag className='h-4 w-4 text-muted-foreground' />
                <span className='font-medium'>{reportData.reason?.name}</span>
              </div>
            </div>

            {reportData.reasonDetail && (
              <div className='space-y-2'>
                <h3 className='text-sm font-medium text-muted-foreground'>Chi tiết lý do</h3>
                <p className='p-3 bg-gray-50 rounded-md text-sm'>{reportData.reasonDetail}</p>
              </div>
            )}

            {reportData.solutionNote && (
              <div className='space-y-2'>
                <h3 className='text-sm font-medium text-muted-foreground'>Ghi chú xử lý</h3>
                <p className='p-3 bg-gray-50 rounded-md text-sm'>{reportData.solutionNote}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
