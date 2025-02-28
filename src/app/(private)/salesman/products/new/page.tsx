'use client'

import { ProductForm } from '@/components/private/salesman/product-form'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    console.log('Create product:', data)
    router.push('/salesman/products')
  }

  return <ProductForm onSubmit={handleSubmit} />
}
