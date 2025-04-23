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
import { useCreateRefundOrderMutation, useCreateReturnOrderMutation } from '@/queries/useOrder'
import { useUploadImageMutation } from '@/queries/useUpload'
import { handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { Book, Package, Boxes, AlertCircle, X, ImageIcon, ArrowLeftRight, RefreshCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

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
  buttonText?: string
}

type RequestType = 'refund' | 'return'

export function RefundOrderDialog({
  orderId,
  orderDetails,
  buttonText = 'Yêu cầu hoàn tiền/đổi trả'
}: RefundOrderDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Array<{ id: string; reason: string; quantity: number }>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [requestType, setRequestType] = useState<RequestType>('refund')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const createRefundOrderMutation = useCreateRefundOrderMutation()
  const createReturnOrderMutation = useCreateReturnOrderMutation()
  const uploadImageMutation = useUploadImageMutation()

  const handleItemSelect = (itemId: string) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((item) => item.id === itemId)
      if (existingItem) {
        return prev.filter((item) => item.id !== itemId)
      }
      const orderItem = orderDetails.find((item) => item.id === itemId)
      return [...prev, { id: itemId, reason: '', quantity: orderItem?.quantity || 1 }]
    })
  }

  const handleItemReasonChange = (itemId: string, reason: string) => {
    setSelectedItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, reason } : item)))
  }

  const handleItemQuantityChange = (itemId: string, quantity: number) => {
    const orderItem = orderDetails.find((item) => item.id === itemId)
    const maxQuantity = orderItem?.quantity || 1
    const validQuantity = Math.min(Math.max(1, quantity), maxQuantity)

    setSelectedItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: validQuantity } : item)))
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
          description: 'Vui lòng chọn ít nhất một sản phẩm để hoàn tiền hoặc đổi trả'
        })
        return
      }

      const hasEmptyItemReason = selectedItems.some((item) => !item.reason.trim())
      if (hasEmptyItemReason) {
        toast({
          variant: 'destructive',
          description: 'Vui lòng nhập lý do cho từng sản phẩm đã chọn'
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

      const requestData = {
        reason: selectedItems[0].reason.trim(),
        items: selectedItems.map((item) => ({
          orderDetailId: item.id,
          quantity: item.quantity,
          reason: item.reason.trim()
        })),
        imageUrls: imageUrls
      }

      // Use different mutations based on request type
      if (requestType === 'refund') {
        await createRefundOrderMutation.mutateAsync({
          orderId,
          body: requestData
        })
      } else {
        await createReturnOrderMutation.mutateAsync({
          orderId,
          body: requestData
        })
      }

      const successMessage =
        requestType === 'refund' ? 'Yêu cầu hoàn tiền đã được gửi thành công' : 'Yêu cầu đổi trả đã được gửi thành công'

      toast({
        description: successMessage
      })

      // Clean up image preview URLs
      previewUrls.forEach((url) => URL.revokeObjectURL(url))

      setOpen(false)
      setSelectedItems([])
      setImages([])
      setPreviewUrls([])
      setRequestType('refund')
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

  // Check if there are physical products in the order
  const hasPhysicalProducts = orderDetails.some((item) => item.productId)

  // Filter to show only physical products when "return" is selected
  const filteredOrderDetails = requestType === 'return' ? orderDetails.filter((item) => item.productId) : orderDetails

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-full'>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Yêu cầu hoàn tiền/đổi trả</DialogTitle>
          <DialogDescription>Chọn sản phẩm và điền thông tin để gửi yêu cầu hoàn tiền hoặc đổi trả.</DialogDescription>
        </DialogHeader>

        {/* Request Type Selection - only show if there are physical products */}
        {hasPhysicalProducts && (
          <div className='mb-4 space-y-2'>
            <Label>Loại yêu cầu</Label>
            <RadioGroup
              value={requestType}
              onValueChange={(value) => setRequestType(value as RequestType)}
              className='flex flex-col space-y-2'
            >
              <div className='flex items-center space-x-2 bg-white rounded-md p-2 border transition-colors hover:bg-gray-50 cursor-pointer'>
                <RadioGroupItem value='refund' id='refund' className='border-primary' />
                <Label htmlFor='refund' className='flex items-center gap-2 cursor-pointer'>
                  <RefreshCcw className='h-4 w-4 text-primary' />
                  <span>Hoàn tiền</span>
                </Label>
              </div>
              <div className='flex items-center space-x-2 bg-white rounded-md p-2 border transition-colors hover:bg-gray-50 cursor-pointer'>
                <RadioGroupItem value='return' id='return' className='border-primary' />
                <Label htmlFor='return' className='flex items-center gap-2 cursor-pointer'>
                  <ArrowLeftRight className='h-4 w-4 text-primary' />
                  <span>Đổi sản phẩm mới</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label>Chọn sản phẩm {requestType === 'refund' ? 'cần hoàn tiền' : 'cần đổi trả'}</Label>
            <div className='space-y-2'>
              {filteredOrderDetails.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    'rounded-lg border overflow-hidden transition-all',
                    selectedItems.some((i) => i.id === item.id)
                      ? 'border-primary shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  {/* Header with checkbox and title */}
                  <div
                    className={cn(
                      'p-3 flex items-center gap-3 cursor-pointer',
                      selectedItems.some((i) => i.id === item.id) ? 'bg-primary/5' : 'bg-gray-50'
                    )}
                    onClick={() => handleItemSelect(item.id)}
                  >
                    <Checkbox
                      id={item.id}
                      checked={selectedItems.some((i) => i.id === item.id)}
                      onCheckedChange={() => handleItemSelect(item.id)}
                      className='h-4 w-4'
                    />

                    <Label
                      htmlFor={item.id}
                      className='flex items-center gap-2 cursor-pointer font-medium leading-normal py-0.5'
                    >
                      {getTypeIcon(getItemType(item))}
                      <span className='truncate'>{getItemTitle(item)}</span>
                    </Label>
                  </div>

                  {/* Content when selected */}
                  {selectedItems.some((i) => i.id === item.id) && (
                    <div className='p-3 bg-white'>
                      <div className='flex items-start gap-4'>
                        {/* Product image */}
                        {getItemImage(item) && (
                          <div className='relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border'>
                            <Image src={getItemImage(item)} alt={getItemTitle(item)} fill className='object-cover' />
                          </div>
                        )}

                        <div className='flex-1 space-y-3'>
                          {/* Price info */}
                          <div className='text-sm flex justify-between leading-relaxed'>
                            <div className='text-gray-500'>
                              Đơn giá:{' '}
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                item.totalPrice / item.quantity
                              )}
                            </div>
                            <div className='font-medium'>
                              Tổng:{' '}
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                (item.totalPrice / item.quantity) *
                                  (selectedItems.find((i) => i.id === item.id)?.quantity || 1)
                              )}
                            </div>
                          </div>

                          {/* Quantity selector */}
                          <div className='flex items-center'>
                            <Label htmlFor={`quantity-${item.id}`} className='mr-2 text-sm leading-normal'>
                              Số lượng:
                            </Label>
                            <div className='flex items-center border rounded-md'>
                              <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 rounded-r-none'
                                onClick={() => {
                                  const currentItem = selectedItems.find((i) => i.id === item.id)
                                  if (currentItem && currentItem.quantity > 1) {
                                    handleItemQuantityChange(item.id, currentItem.quantity - 1)
                                  }
                                }}
                                disabled={(selectedItems.find((i) => i.id === item.id)?.quantity || 0) <= 1}
                              >
                                -
                              </Button>
                              <Input
                                id={`quantity-${item.id}`}
                                type='number'
                                min='1'
                                max={item.quantity}
                                value={selectedItems.find((i) => i.id === item.id)?.quantity || 1}
                                onChange={(e) => handleItemQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                className='w-12 h-8 text-center border-0 rounded-none'
                              />
                              <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 rounded-l-none'
                                onClick={() => {
                                  const currentItem = selectedItems.find((i) => i.id === item.id)
                                  if (currentItem && currentItem.quantity < item.quantity) {
                                    handleItemQuantityChange(item.id, currentItem.quantity + 1)
                                  }
                                }}
                                disabled={(selectedItems.find((i) => i.id === item.id)?.quantity || 0) >= item.quantity}
                              >
                                +
                              </Button>
                            </div>
                            <div className='ml-2 text-xs text-gray-500'>(Tối đa: {item.quantity})</div>
                          </div>

                          {/* Reason textarea */}
                          <div>
                            <Label htmlFor={`reason-${item.id}`} className='mb-1 block text-sm leading-normal'>
                              Lý do {requestType === 'refund' ? 'hoàn tiền' : 'đổi trả'}
                            </Label>
                            <Textarea
                              id={`reason-${item.id}`}
                              placeholder='Ví dụ: Sản phẩm bị lỗi, không đúng mô tả...'
                              className='resize-none leading-relaxed'
                              value={selectedItems.find((i) => i.id === item.id)?.reason || ''}
                              onChange={(e) => handleItemReasonChange(item.id, e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {requestType === 'return' && filteredOrderDetails.length === 0 && (
              <div className='bg-yellow-50 p-3 rounded-md text-sm text-yellow-800'>
                Không có sản phẩm nào phù hợp để đổi trả. Bạn chỉ có thể yêu cầu đổi trả cho sản phẩm vật lý.
              </div>
            )}
          </div>

          <div className='space-y-2'>
            <Label className='flex justify-between'>
              <span>Hình ảnh chứng minh {requestType === 'return' ? '(bắt buộc)' : '(nếu có)'}</span>
              <span className='text-xs text-gray-500'>Tối đa 5 hình</span>
            </Label>
            <div className='border border-dashed rounded-md p-4 text-center'>
              <input
                type='file'
                ref={fileInputRef}
                accept='image/*'
                multiple
                onChange={handleFileChange}
                className='hidden'
              />
              <Button
                type='button'
                variant='outline'
                className='w-full h-20 flex flex-col items-center justify-center gap-1'
                onClick={() => fileInputRef.current?.click()}
                disabled={images.length >= 5}
              >
                <ImageIcon className='h-5 w-5' />
                <span className='text-sm'>Tải lên hình ảnh</span>
              </Button>
            </div>

            {previewUrls.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-2'>
                {previewUrls.map((url, index) => (
                  <div key={index} className='relative'>
                    <div className='relative w-16 h-16'>
                      <Image src={url} alt={`Preview ${index}`} fill className='object-cover rounded' />
                    </div>
                    <Button
                      type='button'
                      variant='destructive'
                      size='icon'
                      className='absolute -top-2 -right-2 h-5 w-5 rounded-full'
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {requestType === 'return' && images.length === 0 && (
              <p className='text-xs text-red-500'>
                Vui lòng tải lên ít nhất 1 hình ảnh để chứng minh tình trạng sản phẩm
              </p>
            )}
          </div>

          <div className='bg-yellow-50 rounded-md p-3 flex items-start gap-2 text-sm text-yellow-800'>
            <div className='mt-0.5'>
              <AlertCircle className='h-4 w-4 text-yellow-600' />
            </div>
            <div>
              {requestType === 'refund'
                ? 'Yêu cầu hoàn tiền sẽ được xem xét trong vòng 3-5 ngày làm việc.'
                : 'Yêu cầu đổi trả sẽ được xem xét trong vòng 3-5 ngày làm việc. Hãy đảm bảo sản phẩm còn nguyên vẹn và trong thời hạn đổi trả.'}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              (requestType === 'return' &&
                (filteredOrderDetails.length === 0 || images.length === 0 || selectedItems.length === 0))
            }
          >
            {isSubmitting ? (
              <>
                <div className='w-4 h-4 rounded-full border-2 border-white border-opacity-50 border-t-transparent animate-spin mr-2' />
                Đang gửi...
              </>
            ) : (
              `Gửi yêu cầu ${requestType === 'refund' ? 'hoàn tiền' : 'đổi trả'}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
