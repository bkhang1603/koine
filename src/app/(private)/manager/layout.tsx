import { Sidebar } from '@/types/sidebar'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { AreaChart, Users, ShoppingCart, BookOpen, FileText, Package, Settings } from 'lucide-react'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const sidebarData: Sidebar = [
    {
      title: 'Thống kê',
      group: [
        {
          id: 'overviewDashboard',
          href: '/manager',
          icon: <AreaChart className='h-5 w-5' />,
          label: 'Tổng quan'
        }
      ]
    },
    {
      title: 'Quản lý',
      group: [
        {
          id: 'orderDashboard',
          href: '/manager/order',
          icon: <ShoppingCart className='h-5 w-5' />,
          label: 'Đơn hàng'
        },
        {
          id: 'coursesDashboard',
          href: '/manager/course',
          icon: <BookOpen className='h-5 w-5' />,
          label: 'Khoá học'
        },
        {
          id: 'blogDashboard',
          href: '/manager/blog',
          icon: <FileText className='h-5 w-5' />,
          label: 'Bài viết'
        },
        {
          id: 'productDashboard',
          href: '/manager/product',
          icon: <Package className='h-5 w-5' />,
          label: 'Sản phẩm'
        },
        {
          id: 'user',
          href: '/manager/user',
          icon: <Users className='h-5 w-5' />,
          label: 'Người dùng'
        }
      ]
    },
    {
      title: 'Cài đặt',
      group: [
        {
          id: 'settings',
          href: '/manager/settings',
          icon: <Settings className='h-5 w-5' />,
          label: 'Cài đặt'
        }
      ]
    }
  ]

  return <SidebarLayout sidebarData={sidebarData}>{children}</SidebarLayout>
}
