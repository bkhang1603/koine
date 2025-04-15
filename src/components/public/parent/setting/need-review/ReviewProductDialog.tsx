import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Star, AlertCircle } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useCreateOrderNeedReviewMutation } from '@/queries/useAccount'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { handleErrorApi } from '@/lib/utils'

type ReviewProductDialogProps = {
  itemId: string
  itemType: string
  orderDetailId: string
}

export function ReviewProductDialog({ itemId, itemType, orderDetailId }: ReviewProductDialogProps) {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')

  const createReviewMutation = useCreateOrderNeedReviewMutation()

  const handleReview = async () => {
    if (rating === 0) {
      toast({
        variant: 'destructive',
        description: 'Vui lòng chọn số sao đánh giá'
      })
      return
    }

    try {
      const validItemType = ['COURSE', 'PRODUCT', 'COMBO'].includes(itemType.toUpperCase())
        ? (itemType.toUpperCase() as 'COURSE' | 'PRODUCT' | 'COMBO')
        : 'PRODUCT'

      // Tạo comment mặc định nếu comment rỗng
      const finalComment = comment.trim() || getDefaultComment(rating, validItemType)

      await createReviewMutation.mutateAsync({
        orderDetailId: orderDetailId,
        rating: rating,
        review: finalComment,
        itemId: itemId,
        itemType: validItemType
      })

      toast({
        description: 'Cảm ơn bạn đã chia sẻ ý kiến về sản phẩm!'
      })

      setOpen(false)
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const resetForm = () => {
    setRating(0)
    setComment('')
    setHoverRating(0)
  }

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return 'Rất tệ'
      case 2:
        return 'Không tốt'
      case 3:
        return 'Bình thường'
      case 4:
        return 'Tốt'
      case 5:
        return 'Rất tốt'
      default:
        return 'Chọn đánh giá'
    }
  }

  // Hàm lấy comment mặc định dựa vào số sao
  const getDefaultComment = (stars: number, type: 'COURSE' | 'PRODUCT' | 'COMBO') => {
    const productOrCourse = type === 'COURSE' ? 'khóa học' : 'sản phẩm'

    switch (stars) {
      case 5:
        return `Tôi rất hài lòng với ${productOrCourse} này. Hoàn toàn đáp ứng kỳ vọng của tôi!`
      case 4:
        return `${productOrCourse.charAt(0).toUpperCase() + productOrCourse.slice(1)} khá tốt. Tôi hài lòng với trải nghiệm.`
      case 3:
        return `${productOrCourse.charAt(0).toUpperCase() + productOrCourse.slice(1)} ở mức trung bình, đáp ứng được nhu cầu cơ bản.`
      case 2:
        return `${productOrCourse.charAt(0).toUpperCase() + productOrCourse.slice(1)} chưa đáp ứng được mong đợi của tôi.`
      case 1:
        return `Tôi không hài lòng với ${productOrCourse} này.`
      default:
        return ''
    }
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
        <Button variant='outline' size='sm' className='text-gray-700 border-gray-200 hover:bg-gray-50'>
          Đánh giá ngay
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[460px]'>
        <DialogHeader className='pb-2 space-y-1'>
          <DialogTitle className='text-lg font-semibold'>
            Đánh giá {itemType === 'COURSE' ? 'khóa học' : 'sản phẩm'}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-5'>
          {/* Star Rating */}
          <div className='space-y-2.5'>
            <Label className='text-sm font-medium text-gray-700'>Đánh giá sản phẩm</Label>
            <div className='p-4 bg-gray-50 rounded-md flex flex-col items-center'>
              <div className='flex items-center gap-1.5 mb-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type='button'
                    className='focus:outline-none transition-transform hover:scale-110'
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoverRating || rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-50'
                      } transition-colors`}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
              <span className='text-sm text-gray-600'>{getRatingText(rating)}</span>
            </div>
          </div>

          {/* Comment */}
          <div className='space-y-2.5'>
            <Label className='text-sm font-medium text-gray-700' htmlFor='comment'>
              Nhận xét của bạn
            </Label>
            <Textarea
              id='comment'
              placeholder={`Chia sẻ cảm nhận về ${itemType === 'COURSE' ? 'khóa học' : 'sản phẩm'} này...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='resize-none h-24 border-gray-200 focus:border-gray-300 focus:ring-gray-200'
              rows={4}
            />
            <p className='text-xs text-gray-500'>
              Nhận xét của bạn sẽ giúp người dùng khác đưa ra quyết định mua hàng tốt hơn.
            </p>
          </div>

          {/* Rating guidelines */}
          <Alert className='bg-gray-50 border-gray-200 text-gray-700'>
            <AlertDescription className=' flex items-center justify-center text-xs gap-4'>
              <AlertCircle className='h-6 w-6 text-gray-500' />
              Đánh giá của bạn sẽ được hiển thị công khai và giúp cải thiện chất lượng sản phẩm.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className='flex justify-end pt-2 gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setOpen(false)}
            className='h-9 border-gray-200 text-gray-700 hover:bg-gray-50'
          >
            Hủy bỏ
          </Button>
          <Button
            size='sm'
            onClick={handleReview}
            disabled={rating === 0 || createReviewMutation.isPending}
            className={`h-9 ${rating ? 'bg-primary hover:bg-primary/80' : 'bg-gray-200'} text-white`}
          >
            {createReviewMutation.isPending ? 'Đang gửi...' : 'Gửi đánh giá'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
