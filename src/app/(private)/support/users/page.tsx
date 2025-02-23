'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserFilters } from '../_components/users/user-filters'
import { UserItem } from '../_components/users/user-item'
import { UserStats } from '../_components/users/user-stats'
import { useState } from 'react'
import { mockData } from '../_data/mock'

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [role, setRole] = useState('all')

  const filteredUsers = mockData.users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
    const matchesStatus = status === 'all' || user.status === status
    const matchesRole = role === 'all' || user.role === role

    return matchesSearch && matchesStatus && matchesRole
  })

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Quản lý người dùng</h1>
        <p className='text-muted-foreground mt-1'>Quản lý và theo dõi người dùng trong hệ thống</p>
      </div>

      <UserStats stats={mockData.stats.overview} />

      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <UserFilters onSearch={setSearch} onStatusChange={setStatus} onRoleChange={setRole} />
          <div className='divide-y'>
            {filteredUsers.map((user) => (
              <UserItem key={user.id} {...user} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
