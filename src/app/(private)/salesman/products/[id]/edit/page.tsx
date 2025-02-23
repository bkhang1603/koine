'use client'

import { ProductForm } from '@/components/private/salesman/product-form'
import { mockProducts } from '../../../_mock/data'
import { useRouter } from 'next/navigation'

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>
  }

  const handleSubmit = (data: any) => {
    console.log('Update product:', data)
    router.push('/salesman/products')
  }

  return <ProductForm initialData={product} onSubmit={handleSubmit} isEdit />
}
