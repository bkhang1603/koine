'use client'

import { useState, useRef } from 'react'
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
import { Input } from '@/components/ui/input'
import { useCreateRefundOrderMutation } from '@/queries/useOrder'
import { useUploadImageMutation } from '@/queries/useUpload'
import { handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { Book, Package, Boxes, AlertCircle, X, ImageIcon } from 'lucide-react'
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
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const createRefundOrderMutation = useCreateRefundOrderMutation()
  const uploadImageMutation = useUploadImageMutation()

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Limit to 5 images max
    const newFiles = [...images, ...files].slice(0, 5)
    setImages(newFiles)

    // Generate preview URLs for the images
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
    setPreviewUrls(newPreviewUrls)
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    const newPreviewUrls = [...previewUrls]
    URL.revokeObjectURL(newPreviewUrls[index]) // Clean up URL
    newPreviewUrls.splice(index, 1)
    setPreviewUrls(newPreviewUrls)
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

      // Upload images if there are any
      let imageUrls: string[] = []
      if (images.length > 0) {
        const formData = new FormData()
        images.forEach((image) => {
          formData.append('images', image)
        })

        const result = await uploadImageMutation.mutateAsync(formData)
        if (result.payload.data) {
          imageUrls = Array.isArray(result.payload.data) ? result.payload.data : [result.payload.data]
        }
      }

      await createRefundOrderMutation.mutateAsync({
        orderId,
        body: {
          reason: selectedItems[0].reason.trim(),
          items: selectedItems.map((item) => ({
            orderDetailId: item.id,
            quantity: 1,
            reason: item.reason.trim()
          })),
          imageUrls: imageUrls
        }
      })

      toast({
        description: 'Yêu cầu hoàn tiền đã được gửi thành công'
      })

      // Clean up image preview URLs
      previewUrls.forEach((url) => URL.revokeObjectURL(url))

      setOpen(false)
      setSelectedItems([])
      setImages([])
      setPreviewUrls([])
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

        <div className='mt-2 p-3 bg-amber-50 border border-amber-100 rounded-md'>
          <div className='flex items-start gap-2'>
            <AlertCircle className='h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5' />
            <div>
              <p className='text-sm font-medium text-amber-800'>Lưu ý quan trọng</p>
              <p className='text-sm text-amber-700 mt-1'>
                Bạn chỉ được hoàn tiền duy nhất 1 lần cho đơn hàng này. Vui lòng quyết định chính xác để tránh phát sinh
                vấn đề sau này.
              </p>
            </div>
          </div>
        </div>

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

          {/* Image upload section */}
          <div className='space-y-2 pt-4 border-t'>
            <Label className='text-sm font-medium'>Hình ảnh minh chứng</Label>
            <p className='text-xs text-muted-foreground mb-2'>
              Bạn có thể đính kèm tối đa 5 ảnh để minh chứng cho yêu cầu hoàn tiền
            </p>

            <div className='grid grid-cols-5 gap-2'>
              {previewUrls.map((url, index) => (
                <div key={index} className='relative aspect-square rounded-md overflow-hidden border'>
                  <Image src={url} alt={`Preview ${index + 1}`} fill className='object-cover' />
                  <Button
                    type='button'
                    variant='destructive'
                    size='icon'
                    className='absolute top-1 right-1 h-5 w-5 rounded-full p-0'
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className='h-3 w-3' />
                  </Button>
                </div>
              ))}

              {previewUrls.length < 5 && (
                <div className='relative'>
                  <Button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    variant='outline'
                    className='h-full w-full aspect-square flex flex-col items-center justify-center border-dashed gap-1 border-2'
                  >
                    <ImageIcon className='h-6 w-6 text-gray-400' />
                    <span className='text-xs text-gray-500'>Thêm ảnh</span>
                  </Button>
                  <Input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    multiple
                    className='hidden'
                    onChange={handleFileChange}
                  />
                </div>
              )}
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
