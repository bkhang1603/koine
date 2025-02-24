'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RefundFilters } from '../_components/refunds/refund-filters'
import { RefundItem } from '../_components/refunds/refund-item'
import { RefundStats } from '../_components/refunds/refund-stats'
import { useState } from 'react'
import { mockData } from '../_data/mock'

export default function RefundsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [type, setType] = useState('all')

  const filteredRefunds = [...mockData.refunds.courses, ...mockData.refunds.products].filter((refund) => {
    const matchesSearch =
      refund.item.toLowerCase().includes(search.toLowerCase()) ||
      refund.reason.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = status === 'all' || refund.status === status
    const matchesType = type === 'all' || refund.type === type

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Quản lý hoàn tiền</h1>
        <p className='text-muted-foreground mt-1'>Xử lý các yêu cầu hoàn tiền từ người dùng</p>
      </div>

      <RefundStats stats={mockData.stats.refunds} />

      <Card>
        <CardHeader>
          <CardTitle>Danh sách yêu cầu hoàn tiền</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <RefundFilters onSearch={setSearch} onStatusChange={setStatus} onTypeChange={setType} />
          <div className='divide-y'>
            {filteredRefunds.map((refund) => (
              <RefundItem
                key={refund.id}
                {...refund}
                user={mockData.users.find((user) => user.id === refund.userId)!}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
