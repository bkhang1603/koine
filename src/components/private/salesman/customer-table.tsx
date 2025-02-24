'use client'

import { useState, useEffect, useMemo } from 'react'
import { TableCustom } from '@/components/table-custom'
import { Badge } from '@/components/ui/badge'
import { mockCustomers } from '@/app/(private)/salesman/_mock/data'
import { MoreOptions } from './more-options'
import { formatDistance } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { EmptyState } from '@/components/empty-state'

interface CustomerTableProps {
  search: string
  status: string
}

type Customer = (typeof mockCustomers)[0]

export function CustomerTable({ search, status }: CustomerTableProps) {
  const router = useRouter()
  const [data, setData] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(mockCustomers)
    setLoading(false)
  }, [])

  const headerColumn = [
    { id: 1, name: 'Khách hàng' },
    { id: 2, name: 'Liên hệ' },
    { id: 3, name: 'Đơn hàng' },
    { id: 4, name: 'Doanh số' },
    { id: 5, name: 'Đơn gần nhất' },
    { id: 6, name: 'Trạng thái' },
    { id: 7, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (customer: Customer) => <span className='font-medium'>{customer.name}</span>
      },
      {
        id: 2,
        render: (customer: Customer) => (
          <div className='space-y-1'>
            <div>{customer.email}</div>
            <div className='text-sm text-muted-foreground'>{customer.phone}</div>
          </div>
        )
      },
      {
        id: 3,
        render: (customer: Customer) => String(customer.totalOrders)
      },
      {
        id: 4,
        render: (customer: Customer) => customer.totalSpent
      },
      {
        id: 5,
        render: (customer: Customer) => {
          const date = new Date(customer.lastOrder)
          return formatDistance(date, new Date(), { addSuffix: true, locale: vi })
        }
      },
      {
        id: 6,
        render: (customer: Customer) => <Badge>{customer.status}</Badge>
      },
      {
        id: 7,
        render: (customer: Customer) => (
          <MoreOptions
            type='customer'
            onView={() => router.push(`/salesman/customers/${customer.id}`)}
            onEdit={() => router.push(`/salesman/customers/${customer.id}/edit`)}
            onDelete={() => console.log('Delete', customer.id)}
          />
        )
      }
    ],
    [router]
  )

  const filteredData = data.filter(
    (customer) =>
      (customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase())) &&
      (status === 'all' || customer.status === status)
  )

  if (!loading && filteredData.length === 0) {
    return (
      <EmptyState title='Không tìm thấy khách hàng' description='Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm khác.' />
    )
  }

  return (
    <TableCustom
      data={{
        data: filteredData.slice(0, 10),
        message: '',
        pagination: {
          pageSize: 10,
          totalItem: filteredData.length,
          currentPage: 1,
          totalPage: Math.ceil(filteredData.length / 10),
          maxPageSize: 10
        }
      }}
      loading={loading}
      headerColumn={headerColumn}
      bodyColumn={bodyColumn}
      href='/salesman/customers'
    />
  )
}
