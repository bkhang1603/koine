import { Sidebar } from '@/types/sidebar'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { Baby, Home } from 'lucide-react'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const sidebarData: Sidebar = [
    {
      title: 'Tổng quan',
      group: [
        {
          id: 'dashboard',
          href: '/parent',
          icon: <Home className='h-5 w-5' />,
          label: 'Thống kê'
        }
      ]
    },
    {
      title: 'Quản lý',
      group: [
        {
          id: 'child',
          href: '/parent/child',
          icon: <Baby className='h-5 w-5' />,
          label: 'Con cái'
        }
      ]
    }
  ]

  return <SidebarLayout sidebarData={sidebarData}>{children}</SidebarLayout>
}
