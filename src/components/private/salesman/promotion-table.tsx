'use client'

import { useState, useEffect, useMemo } from 'react'
import { TableCustom } from '@/components/table-custom'
import { Badge } from '@/components/ui/badge'
import { mockPromotions } from '@/app/(private)/salesman/_mock/data'
import { MoreOptions } from './more-options'
import { useRouter } from 'next/navigation'
import { EmptyState } from '@/components/empty-state'

interface PromotionTableProps {
  search: string
  status: string
  type: string
}

type Promotion = (typeof mockPromotions)[0]

export function PromotionTable({ search, status, type }: PromotionTableProps) {
  const router = useRouter()
  const [data, setData] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(mockPromotions)
    setLoading(false)
  }, [])

  const headerColumn = [
    { id: 1, name: 'Tên chương trình' },
    { id: 2, name: 'Loại' },
    { id: 3, name: 'Giảm giá' },
    { id: 4, name: 'Áp dụng cho' },
    { id: 5, name: 'Trạng thái' },
    { id: 6, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (promotion: Promotion) => <span className='font-medium'>{promotion.name}</span>
      },
      {
        id: 2,
        render: (promotion: Promotion) => promotion.type
      },
      {
        id: 3,
        render: (promotion: Promotion) => promotion.discount
      },
      {
        id: 4,
        render: (promotion: Promotion) => promotion.appliedTo
      },
      {
        id: 5,
        render: (promotion: Promotion) => <Badge>{promotion.status}</Badge>
      },
      {
        id: 6,
        render: (promotion: Promotion) => (
          <MoreOptions
            type='promotion'
            onView={() => router.push(`/salesman/promotions/${promotion.id}`)}
            onEdit={() => router.push(`/salesman/promotions/${promotion.id}/edit`)}
            onDelete={() => console.log('Delete', promotion.id)}
          />
        )
      }
    ],
    [router]
  )

  const filteredData = data.filter((promotion) => {
    const nameMatch = promotion.name.toLowerCase().includes(search.toLowerCase())
    const statusMatch = status === 'all' || promotion.status === status
    const typeMatch = type === 'all' || promotion.type === type
    return nameMatch && statusMatch && typeMatch
  })

  if (!loading && filteredData.length === 0) {
    return (
      <EmptyState title='Không tìm thấy khuyến mãi' description='Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm khác.' />
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
      href='/salesman/promotions'
    />
  )
}
