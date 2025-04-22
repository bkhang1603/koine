'use client'

import { Button } from '@/components/ui/button'
import { useAppStore } from '@/components/app-provider'
import { useRouter } from 'next/navigation'
import configRoute from '@/config/route'
import { ShoppingBag } from 'lucide-react'
import { useAuthModal } from '@/components/auth/auth-modal-provider'

interface BuyNowButtonProps {
  course: {
    id: string
    title: string
    imageUrl: string
    price: number
    discount: number
    isCombo?: boolean
  }
  className?: string
}

export default function BuyNowButton({ course, className }: BuyNowButtonProps) {
  const setCheckoutBuyNow = useAppStore((state) => state.setCheckoutBuyNow)
  const isAuth = useAppStore((state) => state.isAuth)
  const { showLoginModal } = useAuthModal()
  const router = useRouter()

  const handleBuyNow = () => {
    if (!isAuth) {
      showLoginModal()
      return
    }

    const checkoutData = {
      id: course.id,
      productId: null,
      courseId: course.isCombo ? null : course.id,
      comboId: course.isCombo ? course.id : null,
      quantity: 1,
      unitPrice: course.price,
      totalPrice: course.price * (1 - course.discount),
      discount: course.discount,
      isDeleted: false,
      payMethod: 'COD' as const,
      note: null,
      status: 'PENDING' as const,
      product: null,
      course: {
        title: course.title,
        description: '',
        imageUrl: course.imageUrl
      },
      combo: null,
      createdAt: '',
      updatedAt: ''
    }

    setCheckoutBuyNow(checkoutData)
    localStorage.setItem('checkoutBuyNow', JSON.stringify(checkoutData))
    router.push(configRoute.checkout)
  }

  return (
    <Button className={className} onClick={handleBuyNow}>
      <ShoppingBag className='w-4 h-4 mr-2' />
      Mua ngay
    </Button>
  )
}
