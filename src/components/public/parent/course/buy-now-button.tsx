'use client'

import { Button } from '@/components/ui/button'
import { useAppStore } from '@/components/app-provider'
import { useRouter } from 'next/navigation'
import configRoute from '@/config/route'
import { ShoppingBag } from 'lucide-react'

interface BuyNowButtonProps {
  course: {
    id: string
    title: string
    imageUrl: string
    price: number
    discount: number
  }
  className?: string
}

export default function BuyNowButton({ course, className }: BuyNowButtonProps) {
  const setCheckoutBuyNow = useAppStore((state) => state.setCheckoutBuyNow)
  const router = useRouter()

  const handleBuyNow = () => {
    const checkoutData = {
      id: course.id,
      course: {
        id: course.id,
        title: course.title,
        imageUrl: course.imageUrl
      },
      product: null,
      combo: null,
      quantity: 1,
      totalPrice: course.price * (1 - course.discount)
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
