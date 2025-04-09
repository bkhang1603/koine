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
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useCreateRefundOrderMutation } from '@/queries/useOrder'
import { handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

interface RefundOrderDialogProps {
  orderId: string
  orderCode: string
  orderDetails: Array<{
    id: string
    courseId?: string
    productId?: string
    comboId?: string
    course?: { title: string }
    product?: { name: string }
    combo?: { name: string }
  }>
}

export function RefundOrderDialog({ orderId, orderCode, orderDetails }: RefundOrderDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createRefundOrderMutation = useCreateRefundOrderMutation()

  const handleItemSelect = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const handleSubmit = async () => {
    try {
      if (selectedItems.length === 0) {
        toast({
          variant: 'destructive',
          description: 'Vui lòng chọn ít nhất một sản phẩm để hoàn tiền'
        })
        return
      }

      if (!reason.trim()) {
        toast({
          variant: 'destructive',
          description: 'Vui lòng nhập lý do hoàn tiền'
        })
        return
      }

      setIsSubmitting(true)

      await createRefundOrderMutation.mutateAsync({
        id: orderId,
        body: {
          orderDetailIds: selectedItems,
          reason: reason.trim()
        }
      })

      toast({
        description: 'Yêu cầu hoàn tiền đã được gửi thành công'
      })

      setOpen(false)
      setSelectedItems([])
      setReason('')
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-full'>
          Yêu cầu hoàn tiền
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Yêu cầu hoàn tiền đơn hàng #{orderCode}</DialogTitle>
          <DialogDescription>
            Vui lòng chọn sản phẩm cần hoàn tiền và nhập lý do. Yêu cầu của bạn sẽ được xử lý trong thời gian sớm nhất.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label>Sản phẩm cần hoàn tiền</Label>
            <div className='space-y-2'>
              {orderDetails.map((item) => (
                <div key={item.id} className='flex items-center space-x-2'>
                  <Checkbox
                    id={item.id}
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleItemSelect(item.id)}
                  />
                  <Label htmlFor={item.id} className='text-sm'>
                    {item.course?.title || item.product?.name || item.combo?.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='reason'>Lý do hoàn tiền</Label>
            <Textarea
              id='reason'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder='Nhập lý do hoàn tiền...'
              className='min-h-[100px]'
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
