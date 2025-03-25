import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle } from 'lucide-react'
import { useCancelOrderMutation } from '@/queries/useOrder'
import { toast } from '@/components/ui/use-toast'

// Danh sách các lý do hủy đơn hàng
const cancelReasons = [
  { id: 'changed_mind', label: 'Tôi đã đổi ý, không muốn mua nữa' },
  { id: 'found_better_option', label: 'Tôi tìm thấy lựa chọn tốt hơn' },
  { id: 'price_too_high', label: 'Giá quá cao so với khả năng chi trả của tôi' },
  { id: 'mistake_order', label: 'Tôi đặt nhầm sản phẩm/khóa học' },
  { id: 'other', label: 'Lý do khác' }
]

interface CancelOrderDialogProps {
  orderId: string
  orderCode: string
  onCancelSuccess: () => void
}

export function CancelOrderDialog({ orderId, orderCode, onCancelSuccess }: CancelOrderDialogProps) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const cancelOrderMutation = useCancelOrderMutation({ id: orderId })

  const handleCancel = async () => {
    if (!reason) return

    setIsSubmitting(true)

    try {
      if (cancelOrderMutation.isPending) return

      if (reason === 'other') {
        await cancelOrderMutation.mutateAsync({
          id: orderId,
          body: { note }
        })
      } else {
        await cancelOrderMutation.mutateAsync({
          id: orderId,
          body: { note: reason }
        })
      }

      toast({
        description: 'Đơn hàng đã được hủy thành công'
      })
      setOpen(false)
      onCancelSuccess()
    } catch (error) {
      console.error('Failed to cancel order:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setReason('')
    setNote('')
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button variant='destructive' className='w-full'>
          Hủy đơn hàng
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Hủy đơn hàng #{orderCode}</DialogTitle>
          <DialogDescription>Vui lòng cho chúng tôi biết lý do bạn muốn hủy đơn hàng này.</DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-2'>
          <div className='flex items-start gap-3 bg-yellow-50 p-3 rounded-md'>
            <AlertCircle className='h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5' />
            <div className='text-sm text-yellow-800'>
              <p className='font-medium'>Lưu ý:</p>
              <p>Đơn hàng sau khi hủy sẽ không thể khôi phục lại. Vui lòng xác nhận kĩ trước khi hủy.</p>
            </div>
          </div>

          <div className='space-y-3'>
            <Label>Lý do hủy đơn hàng</Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {cancelReasons.map((item) => (
                <div key={item.id} className='flex items-center space-x-2'>
                  <RadioGroupItem value={item.label} id={item.id} />
                  <Label htmlFor={item.id} className='cursor-pointer'>
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {reason === 'other' && (
            <div className='space-y-2'>
              <Label htmlFor='cancel-note'>Chi tiết lý do</Label>
              <Textarea
                id='cancel-note'
                placeholder='Vui lòng chia sẻ lý do của bạn...'
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className='resize-none'
                rows={3}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Trở lại
          </Button>
          <Button
            variant='destructive'
            onClick={handleCancel}
            disabled={!reason || (reason === 'other' && !note) || isSubmitting}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Xác nhận hủy đơn'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
