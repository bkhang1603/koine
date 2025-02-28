'use client'

import { PromotionForm } from '@/components/private/salesman/promotion-form'
import { useRouter } from 'next/navigation'

export default function NewPromotionPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    console.log('Create promotion:', data)
    router.push('/salesman/promotions')
  }

  return <PromotionForm onSubmit={handleSubmit} />
}
