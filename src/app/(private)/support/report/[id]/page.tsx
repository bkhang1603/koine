'use client'
import { use, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { User, Clock, FileText, Tag, Info, ExternalLink, Check, X } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { useReportDetailQuery, useUpdateReportResolveQuery } from '@/queries/useReport'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import configRoute from '@/config/route'

export default function ReportDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const reportId = params.id
  const router = useRouter()

  const [solutionNote, setSolutionNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { isLoading, error, data } = useReportDetailQuery(reportId)

  // Initialize the mutation hooks at component level
  const updateReportResolveApproved = useUpdateReportResolveQuery(reportId, {
    status: 'APPROVED',
    solutionNote
  })

  const updateReportResolveReject = useUpdateReportResolveQuery(reportId, {
    status: 'REJECT',
    solutionNote
  })

  // Handle approve report
  const handleApprove = useCallback(() => {
    try {
      if (isSubmitting || updateReportResolveApproved.isPending) return

      setIsSubmitting(true)

      updateReportResolveApproved.mutate(undefined, {
        onSuccess: () => {
          toast({
            description: 'Báo cáo đã được phê duyệt thành công',
            variant: 'default'
          })
          router.refresh()
        },
        onError: (error) => {
          handleErrorApi({ error })
        },
        onSettled: () => {
          setIsSubmitting(false)
        }
      })
    } catch (error) {
      handleErrorApi({ error })
      setIsSubmitting(false)
    }
  }, [isSubmitting, updateReportResolveApproved, router])

  // Handle reject report
  const handleReject = useCallback(() => {
    try {
      if (isSubmitting || updateReportResolveReject.isPending) return

      setIsSubmitting(true)

      updateReportResolveReject.mutate(undefined, {
        onSuccess: () => {
          toast({
            description: 'Báo cáo đã được từ chối',
            variant: 'default'
          })
          router.refresh()
        },
        onError: (error) => {
          handleErrorApi({ error })
        },
        onSettled: () => {
          setIsSubmitting(false)
        }
      })
    } catch (error) {
      handleErrorApi({ error })
      setIsSubmitting(false)
    }
  }, [isSubmitting, updateReportResolveReject, router])

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
          <Link href={configRoute.support.report}>Quay lại danh sách báo cáo</Link>
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
    BLOG: 'Bài viết',
    PRODUCT: 'Sản phẩm'
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
        return `/support/course/${reportData.reportedEntityId}`
      case 'BLOG':
        return `/support/blog/${reportData.reportedEntityId}`
      case 'PRODUCT':
        return `/support/product/${reportData.reportedEntityId}`
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
      case 'PRODUCT':
        return 'sản phẩm'
      default:
        return 'đối tượng'
    }
  }

  const entityUrl = getEntityUrl()

  const breadcrumbItems = [
    {
      title: 'Báo cáo',
      href: configRoute.support.report
    },
    {
      title: `Chi tiết báo cáo #${reportId.substring(0, 8)}`
    }
  ]

  // Kiểm tra xem báo cáo có thể xử lý không
  const canResolve = reportData.status === 'PENDING'

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

          {canResolve && (
            <>
              <Separator />

              <div className='space-y-4'>
                <h3 className='text-sm font-medium'>Phản hồi báo cáo</h3>
                <Textarea
                  placeholder='Nhập ghi chú xử lý báo cáo...'
                  value={solutionNote}
                  onChange={(e) => setSolutionNote(e.target.value)}
                  className='min-h-[100px]'
                />
              </div>
            </>
          )}

          <Separator />

          <div className='flex justify-end gap-4'>
            {canResolve ? (
              <>
                <Button
                  variant='destructive'
                  onClick={handleReject}
                  disabled={isSubmitting || updateReportResolveReject.isPending}
                  className='flex items-center gap-2'
                >
                  <X className='h-4 w-4' />
                  Từ chối
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={isSubmitting || updateReportResolveApproved.isPending}
                  className='flex items-center gap-2'
                >
                  <Check className='h-4 w-4' />
                  Phê duyệt
                </Button>
              </>
            ) : (
              <Button variant='outline' asChild>
                <Link href={configRoute.support.report}>Quay lại danh sách</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
