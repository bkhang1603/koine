'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Settings } from 'lucide-react'

const MOCK_ACCOUNT = {
  name: 'Nguyễn Văn An',
  email: 'nguyenvanan@gmail.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
}

export default function ChildAccountLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const pathname = usePathname()
  const tabs = [
    { name: 'Tổng quan', href: `/setting/child-account/${params.id}` },
    { name: 'Quản lý khóa học', href: `/setting/child-account/${params.id}/courses` },
    { name: 'Báo cáo học tập', href: `/setting/child-account/${params.id}/reports` },
    { name: 'Cài đặt', href: `/setting/child-account/${params.id}/settings` }
  ]

  return (
    <div className='container mx-auto p-6 max-w-7xl space-y-8'>
      {/* Header Section */}
      <div className='flex justify-between items-start'>
        <div className='flex items-center gap-4'>
          <Avatar className='h-16 w-16'>
            <AvatarImage src={MOCK_ACCOUNT.avatar} />
            <AvatarFallback>{MOCK_ACCOUNT.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='text-2xl font-bold'>{MOCK_ACCOUNT.name}</h1>
            <p className='text-gray-500'>{MOCK_ACCOUNT.email}</p>
          </div>
        </div>
        <Button variant='outline' size='sm'>
          <Settings className='w-4 h-4 mr-2' />
          Cài đặt tài khoản
        </Button>
      </div>

      {/* Navigation */}
      <div className='border-b'>
        <nav className='flex space-x-8' aria-label='Tabs'>
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`
                border-b-2 py-4 px-1 text-sm font-medium
                ${
                  pathname === tab.href
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Page Content */}
      {children}
    </div>
  )
}
