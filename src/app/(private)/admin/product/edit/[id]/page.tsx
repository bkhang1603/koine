'use client'

import { use } from 'react'

export default function EditProduct(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  return (
    <div className='container max-w-4xl mx-auto py-6'>
      <h1 className='text-2xl font-bold mb-6'>Chỉnh sửa sản phẩm</h1>
      <div className='bg-white p-6 rounded-lg shadow'>
        <p>Đây là màn hình chỉnh sửa sản phẩm {params.id}</p>
      </div>
    </div>
  )
}
