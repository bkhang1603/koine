import { Sidebar } from '@/types/sidebar'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { AreaChart, Book, BookMarked, Settings } from 'lucide-react'

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
          href: '/expert',
          icon: <AreaChart className='h-5 w-5' />,
          label: 'Thống kê'
        }
      ]
    },
    {
      title: 'Quản lý nội dung',
      group: [
        {
          id: 'course',
          href: '/expert/course',
          icon: <Book className='h-5 w-5' />,
          label: 'Khóa học'
        },
        {
          id: 'event',
          href: '/expert/event',
          icon: <BookMarked className='h-5 w-5' />,
          label: 'Sự kiện'
        }
      ]
    },
    {
      title: 'Cài đặt',
      group: [
        {
          id: 'settings',
          href: '/expert/settings',
          icon: <Settings className='h-5 w-5' />,
          label: 'Cài đặt'
        }
      ]
    }
  ]

  return <SidebarLayout sidebarData={sidebarData}>{children}</SidebarLayout>
}
