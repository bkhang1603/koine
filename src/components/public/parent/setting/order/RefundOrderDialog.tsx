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
import Image from 'next/image'
import { Book, Package, Boxes } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RefundOrderDialogProps {
  orderId: string
  orderDetails: Array<{
    id: string
    orderId: string
    quantity: number
    totalPrice: number
    courseId?: string
    productId?: string
    comboId?: string
    course?: { title: string; description: string; imageUrl: string }
    product?: { name: string; description: string; imageUrl: string; stockQuantity: number }
    combo?: { name: string; description: string }
  }>
}

export function RefundOrderDialog({ orderId, orderDetails }: RefundOrderDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Array<{ id: string; reason: string }>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createRefundOrderMutation = useCreateRefundOrderMutation()

  const handleItemSelect = (itemId: string) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((item) => item.id === itemId)
      if (existingItem) {
        return prev.filter((item) => item.id !== itemId)
      }
      return [...prev, { id: itemId, reason: '' }]
    })
  }

  const handleItemReasonChange = (itemId: string, reason: string) => {
    setSelectedItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, reason } : item)))
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

      const hasEmptyItemReason = selectedItems.some((item) => !item.reason.trim())
      if (hasEmptyItemReason) {
        toast({
          variant: 'destructive',
          description: 'Vui lòng nhập lý do hoàn tiền cho từng sản phẩm đã chọn'
        })
        return
      }

      setIsSubmitting(true)

      await createRefundOrderMutation.mutateAsync({
        orderId,
        body: {
          reason: selectedItems[0].reason.trim(),
          items: selectedItems.map((item) => ({
            orderDetailId: item.id,
            quantity: 1,
            reason: item.reason.trim()
          }))
        }
      })

      toast({
        description: 'Yêu cầu hoàn tiền đã được gửi thành công'
      })

      setOpen(false)
      setSelectedItems([])
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getItemType = (item: RefundOrderDialogProps['orderDetails'][0]) => {
    if (item.courseId) return 'course'
    if (item.productId) return 'product'
    if (item.comboId) return 'combo'
    return ''
  }

  const getItemTitle = (item: RefundOrderDialogProps['orderDetails'][0]) => {
    if (item.course) return item.course.title
    if (item.product) return item.product.name
    if (item.combo) return item.combo.name
    return ''
  }

  const getItemImage = (item: RefundOrderDialogProps['orderDetails'][0]) => {
    if (item.course?.imageUrl) return item.course.imageUrl
    if (item.product?.imageUrl) return item.product.imageUrl
    return ''
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <Book className='w-4 h-4 text-primary' />
      case 'product':
        return <Package className='w-4 h-4 text-primary' />
      case 'combo':
        return <Boxes className='w-4 h-4 text-primary' />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-full'>
          Yêu cầu hoàn tiền
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Yêu cầu hoàn tiền</DialogTitle>
          <DialogDescription>
            Vui lòng chọn sản phẩm cần hoàn tiền và nhập lý do. Yêu cầu của bạn sẽ được xử lý trong thời gian sớm nhất.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label>Sản phẩm cần hoàn tiền</Label>
            <div className='space-y-4'>
              {orderDetails.map((item) => {
                const type = getItemType(item)
                const title = getItemTitle(item)
                const imageUrl = getItemImage(item)
                const isSelected = selectedItems.some((selected) => selected.id === item.id)

                return (
                  <div
                    key={item.id}
                    className={cn(
                      'space-y-3 p-3 rounded-lg border transition-colors',
                      isSelected ? 'border-primary bg-primary/5' : 'border-border'
                    )}
                  >
                    <div className='flex items-start gap-3'>
                      <div className='relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0'>
                        <Image src={imageUrl} alt={title} fill className='object-cover' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          {getTypeIcon(type)}
                          <span className='text-sm font-medium truncate'>{title}</span>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id={item.id}
                          checked={isSelected}
                          onCheckedChange={() => handleItemSelect(item.id)}
                          className='h-4 w-4 rounded text-primary focus:ring-primary'
                        />
                      </div>
                    </div>
                    {isSelected && (
                      <div className='space-y-2'>
                        <Label htmlFor={`reason-${item.id}`} className='text-xs text-muted-foreground'>
                          Lý do hoàn tiền
                        </Label>
                        <Textarea
                          id={`reason-${item.id}`}
                          value={selectedItems.find((selected) => selected.id === item.id)?.reason || ''}
                          onChange={(e) => handleItemReasonChange(item.id, e.target.value)}
                          placeholder='Nhập lý do hoàn tiền...'
                          className='min-h-[80px] text-sm'
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
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
