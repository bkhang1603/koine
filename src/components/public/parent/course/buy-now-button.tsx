'use client'

import { Button } from '@/components/ui/button'
import { useAppStore } from '@/components/app-provider'
import { useRouter } from 'next/navigation'
import configRoute from '@/config/route'
import { ShoppingBag } from 'lucide-react'
import { useAuthModal } from '@/components/auth/auth-modal-provider'
import { OrderBuyNow } from '@/schemaValidations/order.schema'
import { OrderStatus, PaymentMethod } from '@/constants/type'

interface BuyNowButtonProps {
  course?: any
  combo?: any
  className?: string
}

export default function BuyNowButton({ course, combo, className }: BuyNowButtonProps) {
  const setCheckoutBuyNow = useAppStore((state) => state.setCheckoutBuyNow)
  const isAuth = useAppStore((state) => state.isAuth)
  const { showLoginModal } = useAuthModal()
  const router = useRouter()

  const handleBuyNow = () => {
    if (!isAuth) {
      showLoginModal()
      return
    }

    let checkoutData: OrderBuyNow | undefined

    if (course) {
      checkoutData = {
        id: course.id,
        productId: null,
        courseId: course.id,
        comboId: null,
        quantity: 1,
        unitPrice: course.price,
        totalPrice: course.price * (1 - course.discount),
        discount: course.discount,
        isDeleted: false,
        payMethod: PaymentMethod.BANKING,
        note: null,
        status: OrderStatus.PENDING,
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
    } else if (combo) {
      checkoutData = {
        id: combo.id,
        productId: null,
        courseId: null,
        comboId: combo.id,
        quantity: 1,
        unitPrice: combo.price,
        totalPrice: combo.price * (1 - combo.discount),
        discount: combo.discount,
        isDeleted: false,
        payMethod: PaymentMethod.BANKING,
        note: null,
        status: OrderStatus.PENDING,
        product: null,
        course: null,
        combo: {
          name: combo.name,
          description: combo.description,
          imageUrl: combo.imageUrl
        },
        createdAt: '',
        updatedAt: ''
      }
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
