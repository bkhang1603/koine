'use client'

import { useAppStore } from '@/components/app-provider'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useCartDetailCreateMutation } from '@/queries/useCartDetail'
import { useAuthModal } from '@/components/auth/auth-modal-provider'
import { handleErrorApi } from '@/lib/utils'

interface CourseButtonProps {
  id: string
  course: {
    id: string
    title: string
    imageUrl: string
    price: number
    discount: number
  }
  variant?: 'default' | 'outline'
  className?: string
}

export default function CourseButton({ course, variant = 'default', className }: CourseButtonProps) {
  const isAuth = useAppStore((state) => state.isAuth)
  const addToCartMutation = useCartDetailCreateMutation()
  const { showLoginModal } = useAuthModal()

  const handleAddToCart = async () => {
    try {
      if (!isAuth) {
        showLoginModal()
        return
      }

      if (addToCartMutation.isPending) {
        return
      }

      const value = {
        courseId: course.id,
        productId: null,
        quantity: 1
      }

      await addToCartMutation.mutateAsync({
        data: value
      })

      toast({
        description: 'Khóa học đã được thêm vào giỏ hàng'
      })
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  return (
    <Button variant={variant} className={className} onClick={handleAddToCart} disabled={addToCartMutation.isPending}>
      {addToCartMutation.isPending ? (
        <Loading color='bg-secondary' />
      ) : (
        <>
          <ShoppingCart className='w-4 h-4 mr-2' />
          Thêm vào giỏ hàng
        </>
      )}
    </Button>
  )
}
