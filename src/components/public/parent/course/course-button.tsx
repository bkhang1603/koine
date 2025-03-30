'use client'

import { useAppStore } from '@/components/app-provider'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useCartDetailCreateMutation } from '@/queries/useCartDetail'
import configRoute from '@/config/route'
import Link from 'next/link'

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
  const role = useAppStore((state) => state.role)
  const addToCartMutation = useCartDetailCreateMutation()

  const handleAddToCart = async () => {
    try {
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
        title: 'Thành công',
        description: 'Khóa học đã được thêm vào giỏ hàng'
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (!role) {
    return (
      <Button variant={variant} className={className} asChild>
        <Link href={configRoute.login}>
          <ShoppingCart className='w-4 h-4 mr-2' />
          Thêm vào giỏ hàng
        </Link>
      </Button>
    )
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
