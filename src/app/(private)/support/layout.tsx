import { Sidebar } from '@/types/sidebar'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { BarChart, HelpCircle, LayoutDashboard, MessageSquare, RefreshCcw, Settings, Users } from 'lucide-react'

export default function SupportLayout({
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
          href: '/support',
          icon: <LayoutDashboard className='h-5 w-5' />,
          label: 'Thống kê'
        }
      ]
    },
    {
      title: 'Quản lý Tickets',
      group: [
        {
          id: 'ticket',
          href: '/support/tickets',
          icon: <MessageSquare className='h-5 w-5' />,
          label: 'Tickets'
        },
        {
          id: 'refund',
          href: '/support/refunds',
          icon: <RefreshCcw className='h-5 w-5' />,
          label: 'Hoàn tiền'
        },
        {
          id: 'faq',
          href: '/support/faq',
          icon: <HelpCircle className='h-5 w-5' />,
          label: 'FAQ'
        },
        {
          id: 'users',
          href: '/support/users',
          icon: <Users className='h-5 w-5' />,
          label: 'Người dùng'
        },
        {
          id: 'reports',
          href: '/support/reports',
          icon: <BarChart className='h-5 w-5' />,
          label: 'Báo cáo'
        }
      ]
    },
    {
      title: 'Cài đặt',
      group: [
        {
          id: 'settings',
          href: '/support/settings',
          icon: <Settings className='h-5 w-5' />,
          label: 'Cài đặt'
        }
      ]
    }
  ]

  return <SidebarLayout sidebarData={sidebarData}>{children}</SidebarLayout>
}
