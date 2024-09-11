import { Sidebar } from '@/types/sidebar'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { Book, BookMarked, Home } from 'lucide-react'

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
          href: '/content-creator',
          icon: <Home className='h-5 w-5' />,
          label: 'Thống kê'
        }
      ]
    },
    {
      title: 'Quản lý nội dung',
      group: [
        {
          id: 'blog',
          href: '/content-creator/blog',
          icon: <Book className='h-5 w-5' />,
          label: 'Bài viết'
        },
        {
          id: 'course',
          href: '/content-creator/course',
          icon: <BookMarked className='h-5 w-5' />,
          label: 'Khoá học'
        }
      ]
    }
  ]

  return <SidebarLayout sidebarData={sidebarData}>{children}</SidebarLayout>
}
