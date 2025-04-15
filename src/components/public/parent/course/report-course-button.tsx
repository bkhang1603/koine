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

interface ReportCourseButtonProps {
  courseId: string
  courseName: string
}

export default function ReportCourseButton({ courseId, courseName }: ReportCourseButtonProps) {
  const [open, setOpen] = useState(false)
  const [reasonId, setReasonId] = useState('1') // Default reason ID
  const [reasonDetail, setReasonDetail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const createReportMutation = useCreateReportMutation()

  const reportReasons = [
    { id: '1', label: 'Nội dung không phù hợp' },
    { id: '2', label: 'Thông tin khóa học sai lệch' },
    { id: '3', label: 'Vi phạm bản quyền' },
    { id: '4', label: 'Ngôn ngữ không phù hợp' },
    { id: '5', label: 'Khác' }
  ]

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
        type: ReportType.COURSE,
        reportedEntityId: courseId,
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant='ghost' size='icon' className='text-gray-500 hover:text-red-500'>
                <Flag className='h-5 w-5' />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Báo cáo khóa học</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Báo cáo khóa học</DialogTitle>
          <DialogDescription>
            Báo cáo khóa học "{courseName}" vì lý do vi phạm. Chúng tôi sẽ xem xét báo cáo của bạn.
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
