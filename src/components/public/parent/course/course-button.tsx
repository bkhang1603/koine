'use client'

import { useAppStore } from '@/components/app-provider'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import configRoute from '@/config/route'
import { handleErrorApi } from '@/lib/utils'
import { useCartDetailCreateMutation } from '@/queries/useCartDetail'
import { ShoppingCart, CreditCard } from 'lucide-react'
import { useRouter } from 'next/navigation'

function CourseButton({ id }: { id: string }) {
  const role = useAppStore((state) => state.role)
  const router = useRouter()
  const addToCartMutation = useCartDetailCreateMutation()

  const onSubmit = async () => {
    try {
      if (!role) {
        toast({
          title: 'Thông báo',
          description: 'Bạn cần đăng nhập để thêm khóa học vào giỏ hàng'
        })

        return router.push(configRoute.login)
      }

      const value = {
        productId: null,
        courseId: id,
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
      handleErrorApi({
        error
      })
    }
  }

  return (
    <div className='space-y-3'>
      <Button
        className='w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl
          flex items-center justify-center gap-2 text-base font-semibold shadow-lg
          shadow-primary/25 transition-all duration-300 hover:shadow-xl
          hover:shadow-primary/30 hover:-translate-y-0.5'
        size='lg'
      >
        <CreditCard className='w-5 h-5' />
        Đăng ký ngay
      </Button>

      <Button
        variant='outline'
        onClick={onSubmit}
        className='w-full h-12 border-2 border-primary/10 text-primary hover:bg-primary/5
          rounded-xl font-semibold transition-colors'
        size='lg'
      >
        <ShoppingCart className='w-5 h-5 mr-2' />
        Thêm vào giỏ hàng
      </Button>
    </div>
  )
}

export default CourseButton
