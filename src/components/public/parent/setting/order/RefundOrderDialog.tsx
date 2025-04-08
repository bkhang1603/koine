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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { useCreateRefundOrderMutation } from '@/queries/useOrder'
import { handleErrorApi } from '@/lib/utils'
import { Wallet } from 'lucide-react'

interface RefundOrderDialogProps {
  orderId: string
  orderCode: string
}

export function RefundOrderDialog({ orderId, orderCode }: RefundOrderDialogProps) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createRefundOrderMutation = useCreateRefundOrderMutation()

  const handleRefund = async () => {
    if (!reason) return

    setIsSubmitting(true)

    try {
      if (createRefundOrderMutation.isPending) return

      await createRefundOrderMutation.mutateAsync({
        orderId,
        body: { reason }
      })

      toast({
        description: 'Yêu cầu hoàn tiền đã được gửi thành công'
      })
      setOpen(false)
    } catch (error) {
      handleErrorApi({
        error
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setReason('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='w-full border-primary/30 bg-primary/5 hover:bg-primary/10 hover:text-primary/80 text-primary flex items-center justify-center gap-2'
        >
          <Wallet className='w-4 h-4' />
          <span>Yêu cầu hoàn tiền</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Wallet className='h-5 w-5 text-primary' />
            Yêu cầu hoàn tiền
          </DialogTitle>
          <DialogDescription>Vui lòng cung cấp lý do hoàn tiền cho đơn hàng #{orderCode}</DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='reason'>Lý do hoàn tiền</Label>
            <Textarea
              id='reason'
              placeholder='Nhập lý do hoàn tiền...'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className='min-h-[100px]'
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => {
              setOpen(false)
              resetForm()
            }}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button onClick={handleRefund} disabled={!reason || isSubmitting}>
            {isSubmitting ? 'Đang xử lý...' : 'Gửi yêu cầu'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
