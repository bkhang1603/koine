'use client'
import { use } from 'react'
import ProductEdit from '@/components/private/common/product/product-edit'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { useProductDetailAdminQuery } from '@/queries/useProduct'
import configRoute from '@/config/route'

export default function ProductEditPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { data: productData } = useProductDetailAdminQuery({ productId: params.id })
  const product = productData?.payload.data

  // Breadcrumb configuration
  const breadcrumbItems = [
    {
      title: 'Sản phẩm',
      href: configRoute.salesman.product
    },
    {
      title: product?.name || 'Chi tiết',
      href: `${configRoute.salesman.product}/${params.id}`
    },
    {
      title: 'Chỉnh sửa'
    }
  ]

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      <ProductEdit
        productId={params.id}
        baseUrl={configRoute.salesman.product}
        detailUrl={`${configRoute.salesman.product}/${params.id}`}
      />
    </div>
  )
}
