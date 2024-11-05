'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useCartDetailCreateMutation } from '@/queries/useCartDetail'

function CourseButton({ id }: { id: string }) {
  const addToCartMutation = useCartDetailCreateMutation()

  const onSubmit = async () => {
    try {
      const value = {
        productId: null,
        courseId: id, // Add courseId property
        quantity: 1
      }

      await addToCartMutation.mutateAsync({
        data: value
      })

      toast({
        title: 'Thành công',
        description: 'Khóa học đã được thêm vào giỏ hàng'
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-between items-center gap-x-2 mb-4'>
      <Button variant={'outlineDefault'} className='w-full' size='lg' onClick={onSubmit}>
        Thêm vào giỏ hàng
      </Button>

      <Button className='w-full' size='lg'>
        Đăng ký ngay
      </Button>
    </div>
  )
}

export default CourseButton
