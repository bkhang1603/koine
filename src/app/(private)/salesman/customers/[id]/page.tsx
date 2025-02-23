'use client'

import { CustomerInfo } from '@/components/private/salesman/customer-detail/customer-info'
import { CustomerSidebar } from '@/components/private/salesman/customer-detail/customer-sidebar'
import { mockCustomers } from '@/app/(private)/salesman/_mock/data'
import { notFound } from 'next/navigation'

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = mockCustomers.find((c) => c.id === params.id)

  if (!customer) {
    notFound()
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold'>Chi tiết khách hàng</h1>
        <p className='text-muted-foreground mt-1'>Thông tin chi tiết khách hàng</p>
      </div>

      {/* Content */}
      <div className='grid grid-cols-3 gap-6'>
        <CustomerInfo customer={customer} />
        <CustomerSidebar customer={customer} />
      </div>
    </div>
  )
}
