'use client'

import { ComboForm } from '@/components/private/common/combo/combo-form'
import configRoute from '@/config/route'
import { Breadcrumb } from '@/components/private/common/breadcrumb'

export default function ComboNew() {
  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      <Breadcrumb items={[{ title: 'Quản lý combo', href: configRoute.salesman.combo }, { title: 'Tạo combo mới' }]} />

      <div className='rounded-lg border bg-card text-card-foreground shadow-sm mt-6'>
        <div className='p-6 space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold tracking-tight'>Tạo combo mới</h2>
            <p className='text-sm text-muted-foreground'>Nhập thông tin combo mới vào form bên dưới</p>
          </div>

          <ComboForm baseUrl={configRoute.salesman.combo} />
        </div>
      </div>
    </div>
  )
}
