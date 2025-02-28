'use client'

import { PromotionForm } from '@/components/private/salesman/promotion-form'
import { mockPromotions } from '../../../_mock/data'
import { useRouter } from 'next/navigation'

export default function EditPromotionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const promotion = mockPromotions.find((p) => p.id === params.id)

  if (!promotion) {
    return <div>Không tìm thấy khuyến mãi</div>
  }

  const handleSubmit = (data: any) => {
    console.log('Update promotion:', data)
    router.push('/salesman/promotions')
  }

  return <PromotionForm onSubmit={handleSubmit} isEdit />
}
