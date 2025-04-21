'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Flag } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCreateReportMutation } from '@/queries/useAccount'
import { toast } from '@/components/ui/use-toast'
import { ReportType } from '@/constants/type'
import { handleErrorApi } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ButtonProps } from '@/components/ui/button'

interface ReportButtonProps extends Omit<ButtonProps, 'onClick'> {
  entityId: string
  entityName: string
  entityType: (typeof ReportType)[keyof typeof ReportType]
  tooltipText?: string
  buttonVariant?: 'icon' | 'text' | 'full'
  buttonIcon?: React.ReactNode
  buttonText?: string
  className?: string
}

export default function ReportButton({
  entityId,
  entityName,
  entityType,
  tooltipText = 'Báo cáo nội dung',
  buttonVariant = 'icon',
  buttonIcon = <Flag className='h-5 w-5' />,
  buttonText = 'Báo cáo',
  className,
  ...buttonProps
}: ReportButtonProps) {
  const [open, setOpen] = useState(false)
  const [reasonId, setReasonId] = useState('1') // Default reason ID
  const [reasonDetail, setReasonDetail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const createReportMutation = useCreateReportMutation()

  // Lý do báo cáo chung cho tất cả các loại nội dung
  const reportReasons = [
    { id: '1', label: 'Nội dung không phù hợp' },
    { id: '2', label: 'Thông tin sai lệch' },
    { id: '3', label: 'Vi phạm bản quyền' },
    { id: '4', label: 'Ngôn ngữ không phù hợp' },
    { id: '5', label: 'Khác' }
  ]

  // Tùy chỉnh tiêu đề và mô tả dựa trên loại nội dung
  const getEntityTypeLabel = () => {
    switch (entityType) {
      case ReportType.COURSE:
        return 'khóa học'
      case ReportType.BLOG:
        return 'bài viết'
      case ReportType.PRODUCT:
        return 'sản phẩm'
      default:
        return 'nội dung'
    }
  }

  const handleSubmit = async () => {
    try {
      if (!reasonId) {
        toast({
          variant: 'destructive',
          description: 'Vui lòng chọn lý do báo cáo'
        })
        return
      }

      if (!reasonDetail.trim()) {
        toast({
          variant: 'destructive',
          description: 'Vui lòng nhập chi tiết lý do báo cáo'
        })
        return
      }

      setIsSubmitting(true)

      await createReportMutation.mutateAsync({
        type: entityType,
        reportedEntityId: entityId,
        reasonId: reasonId,
        reasonDetail: reasonDetail.trim()
      })

      toast({
        description: 'Báo cáo đã được gửi thành công. Chúng tôi sẽ xem xét báo cáo của bạn.'
      })

      setOpen(false)
      setReasonId('1')
      setReasonDetail('')
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render button dựa vào variant
  const renderButton = () => {
    switch (buttonVariant) {
      case 'icon':
        return (
          <Button
            variant='ghost'
            size='icon'
            className={cn('text-gray-500 hover:text-red-500', className)}
            {...buttonProps}
          >
            {buttonIcon}
          </Button>
        )
      case 'text':
        return (
          <Button
            variant='ghost'
            size='sm'
            className={cn('text-gray-500 hover:text-red-500 gap-2', className)}
            {...buttonProps}
          >
            {buttonIcon}
            <span>{buttonText}</span>
          </Button>
        )
      case 'full':
        return (
          <Button variant='outline' size='sm' className={cn('gap-2', className)} {...buttonProps}>
            {buttonIcon}
            <span>{buttonText}</span>
          </Button>
        )
      default:
        return (
          <Button
            variant='ghost'
            size='icon'
            className={cn('text-gray-500 hover:text-red-500', className)}
            {...buttonProps}
          >
            {buttonIcon}
          </Button>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>{renderButton()}</DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Báo cáo {getEntityTypeLabel()}</DialogTitle>
          <DialogDescription>
            Báo cáo {getEntityTypeLabel()} &quot;{entityName}&quot; vì lý do vi phạm. Chúng tôi sẽ xem xét báo cáo của
            bạn.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='reason'>Lý do báo cáo</Label>
            <RadioGroup value={reasonId} onValueChange={setReasonId}>
              {reportReasons.map((reason) => (
                <div key={reason.id} className='flex items-center space-x-2'>
                  <RadioGroupItem value={reason.id} id={`reason-${reason.id}`} />
                  <Label htmlFor={`reason-${reason.id}`}>{reason.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='detail'>Chi tiết</Label>
            <Textarea
              id='detail'
              value={reasonDetail}
              onChange={(e) => setReasonDetail(e.target.value)}
              placeholder='Vui lòng mô tả chi tiết lý do báo cáo...'
              className='min-h-[100px]'
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Đang gửi...' : 'Gửi báo cáo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Các component con để hỗ trợ việc sử dụng dễ dàng hơn
export function ReportCourseButton({
  courseId,
  courseName,
  ...props
}: Omit<ReportButtonProps, 'entityId' | 'entityName' | 'entityType'> & { courseId: string; courseName: string }) {
  return (
    <ReportButton
      entityId={courseId}
      entityName={courseName}
      entityType={ReportType.COURSE}
      tooltipText='Báo cáo khóa học'
      {...props}
    />
  )
}

export function ReportBlogButton({
  blogId,
  blogTitle,
  ...props
}: Omit<ReportButtonProps, 'entityId' | 'entityName' | 'entityType'> & { blogId: string; blogTitle: string }) {
  return (
    <ReportButton
      entityId={blogId}
      entityName={blogTitle}
      entityType={ReportType.BLOG}
      tooltipText='Báo cáo bài viết'
      {...props}
    />
  )
}

export function ReportProductButton({
  productId,
  productName,
  ...props
}: Omit<ReportButtonProps, 'entityId' | 'entityName' | 'entityType'> & { productId: string; productName: string }) {
  return (
    <ReportButton
      entityId={productId}
      entityName={productName}
      entityType={ReportType.PRODUCT}
      tooltipText='Báo cáo sản phẩm'
      {...props}
    />
  )
}
