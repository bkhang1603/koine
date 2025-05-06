'use client'

import { use } from 'react'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { useComboDetailQuery } from '@/queries/useCombo'
import configRoute from '@/config/route'
import { ComboEditForm } from '@/components/private/common/combo/combo-edit-form'

export default function ComboEditPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { data: comboData, isLoading } = useComboDetailQuery(params.id)
  const combo = comboData?.payload.data

  // Breadcrumb configuration
  const breadcrumbItems = [
    {
      title: 'Combo',
      href: configRoute.salesman.combo
    },
    {
      title: combo?.name || 'Chi tiết',
      href: `${configRoute.salesman.combo}/${params.id}`
    },
    {
      title: 'Chỉnh sửa'
    }
  ]

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      <div className='rounded-lg border bg-card text-card-foreground shadow-sm mt-6'>
        <div className='p-6 space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold tracking-tight'>Chỉnh sửa combo</h2>
            <p className='text-sm text-muted-foreground'>Chỉnh sửa thông tin combo &quot;{combo?.name || ''}&quot;</p>
          </div>

          {isLoading ? (
            <div className='flex justify-center items-center py-8'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
            </div>
          ) : combo ? (
            <ComboEditForm
              comboId={params.id}
              defaultValues={{
                name: combo.name,
                description: combo.description,
                price: combo.price
              }}
              baseUrl={configRoute.salesman.combo}
            />
          ) : (
            <div className='text-center py-8 text-muted-foreground'>Không tìm thấy thông tin combo</div>
          )}
        </div>
      </div>
    </div>
  )
}
