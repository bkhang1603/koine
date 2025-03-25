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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Star, AlertCircle } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useCreateOrderNeedReviewMutation } from '@/queries/useAccount'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { handleErrorApi } from '@/lib/utils'

interface ReviewProductDialogProps {
  itemId: string
  itemTitle: string
  itemType: string
  onReviewSuccess: () => void
}

export function ReviewProductDialog({ itemId, itemTitle, itemType, onReviewSuccess }: ReviewProductDialogProps) {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')

  const createReviewMutation = useCreateOrderNeedReviewMutation()

  const handleReview = async () => {
    if (rating === 0) {
      toast({
        title: 'Vui lòng chọn số sao đánh giá',
        variant: 'destructive'
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
        rating: rating,
        review: finalComment,
        itemId: itemId,
        itemType: validItemType
      })

      toast({
        title: 'Đánh giá thành công',
        description: 'Cảm ơn bạn đã chia sẻ ý kiến về sản phẩm!'
      })

      setOpen(false)
      onReviewSuccess()
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
        <Button className='gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200' size='sm'>
          <Star className='h-4 w-4 fill-amber-400' />
          Đánh giá ngay
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Đánh giá {itemType === 'COURSE' ? 'khóa học' : 'sản phẩm'}</DialogTitle>
          <DialogDescription>
            <span className='font-medium'>{itemTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          {/* Star Rating */}
          <div className='space-y-2'>
            <Label>Đánh giá của bạn</Label>
            <div className='flex items-center gap-1'>
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
                      star <= (hoverRating || rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-100'
                    } transition-colors`}
                  />
                </button>
              ))}

              <span className='ml-2 text-sm text-gray-600'>{getRatingText(rating)}</span>
            </div>
          </div>

          {/* Comment */}
          <div className='space-y-2'>
            <Label htmlFor='comment'>Nhận xét của bạn</Label>
            <Textarea
              id='comment'
              placeholder={`Chia sẻ trải nghiệm của bạn về ${itemType === 'COURSE' ? 'khóa học' : 'sản phẩm'} này...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='resize-none'
              rows={4}
            />
            <p className='text-xs text-muted-foreground'>
              Nhận xét của bạn sẽ giúp người dùng khác đưa ra quyết định mua hàng tốt hơn.
            </p>
          </div>

          {/* Rating guidelines */}
          <Alert className='bg-blue-50 border-blue-200 text-blue-800'>
            <AlertCircle className='h-4 w-4 text-blue-500' />
            <AlertDescription className='text-xs'>
              Xin hãy để lại đánh giá chân thực và khách quan. Đánh giá của bạn sẽ được hiển thị công khai.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleReview}
            disabled={rating === 0 || createReviewMutation.isPending}
            className={rating ? 'bg-amber-600 hover:bg-amber-700' : undefined}
          >
            {createReviewMutation.isPending ? 'Đang gửi...' : 'Gửi đánh giá'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
