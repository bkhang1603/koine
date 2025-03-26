import { Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function EmptyReview() {
  return (
    <div className='flex flex-col items-center justify-center py-20 px-4 text-center'>
      <div className='h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center mb-4'>
        <Star className='h-8 w-8 text-amber-400' />
      </div>
      <h3 className='text-xl font-semibold mb-2'>Không có sản phẩm cần đánh giá</h3>
      <p className='text-gray-500 max-w-md mb-6'>
        Bạn đã đánh giá tất cả sản phẩm và khóa học đã mua. Các sản phẩm mới mua sẽ xuất hiện ở đây.
      </p>
      <Button variant='outline' asChild>
        <Link href='/products'>Tiếp tục mua sắm</Link>
      </Button>
    </div>
  )
}
