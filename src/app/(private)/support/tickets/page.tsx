'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TicketFilters } from '../_components/tickets/ticket-filters'
import { TicketItem } from '../_components/tickets/ticket-item'
import { TicketStats } from '../_components/tickets/ticket-stats'
import { useState } from 'react'

const mockStats = {
  total: 156,
  pending: 23,
  processing: 45,
  resolved: 88,
  avgResponseTime: '15 phút',
  resolutionRate: 92
}

const mockTickets = [
  {
    id: 'T-1234',
    title: 'Không thể truy cập khóa học',
    description: 'Tôi không thể truy cập vào khóa học JavaScript. Khi click vào bài học, màn hình hiện thông báo lỗi.',
    status: 'pending' as const,
    priority: 'high' as const,
    category: 'Kỹ thuật',
    createdAt: '2024-03-16T09:00:00Z',
    user: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      avatar: 'https://github.com/shadcn.png'
    }
  }
  // Thêm các ticket mẫu khác...
]

export default function TicketsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [category, setCategory] = useState('all')

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = status === 'all' || ticket.status === status
    const matchesPriority = priority === 'all' || ticket.priority === priority
    const matchesCategory = category === 'all' || ticket.category.toLowerCase() === category

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Quản lý Tickets</h1>
        <p className='text-muted-foreground mt-1'>Xử lý và theo dõi các yêu cầu hỗ trợ</p>
      </div>

      <TicketStats stats={mockStats} />

      <Card>
        <CardHeader>
          <CardTitle>Danh sách Tickets</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <TicketFilters
            onSearch={setSearch}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
            onCategoryChange={setCategory}
          />
          <div className='divide-y'>
            {filteredTickets.map((ticket) => (
              <TicketItem key={ticket.id} {...ticket} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
