'use client'

import ProductNewPage from '@/components/private/common/product/product-new'
import { CreateProductBodyType } from '@/schemaValidations/product.schema'
import { useEffect, useState } from 'react'
import configRoute from '@/config/route'
import { Breadcrumb } from '@/components/private/common/breadcrumb'

const PRODUCT_DRAFT_KEY = 'product_draft_data'

function Page() {
  const [localDraft, setLocalDraft] = useState<CreateProductBodyType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localDraft = localStorage.getItem(PRODUCT_DRAFT_KEY)
        if (localDraft) {
          setLocalDraft(JSON.parse(localDraft))
        }
      } catch (error) {
        console.error('Error loading draft:', error)
      }
    }
    fetchData()
  }, [])

  const breadcrumbItems = [
    {
      title: 'Sản phẩm',
      href: configRoute.manager.product
    },
    {
      title: 'Tạo mới'
    }
  ]

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} className='mb-6' />

      <div>
        <ProductNewPage localDraft={localDraft} baseUrl={configRoute.manager.product} />
      </div>
    </div>
  )
}

export default Page
