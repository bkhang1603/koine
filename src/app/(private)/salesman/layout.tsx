import { Sidebar } from '@/types/sidebar'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { LayoutDashboard, Users, Package, BookOpen, Receipt, Settings } from 'lucide-react'

export default function SalesmanLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const sidebarData: Sidebar = [
    {
      title: 'Thống kê',
      group: [
        {
          id: 'dashboard',
          href: '/salesman',
          icon: <LayoutDashboard className='h-5 w-5' />,
          label: 'Tổng quan'
        }
      ]
    },
    {
      title: 'Quản lý bán hàng',
      group: [
        {
          id: 'customers',
          href: '/salesman/user',
          icon: <Users className='h-5 w-5' />,
          label: 'Khách hàng'
        },
        {
          id: 'orders',
          href: '/salesman/order',
          icon: <Receipt className='h-5 w-5' />,
          label: 'Đơn hàng'
        }
      ]
    },
    {
      title: 'Quản lý sản phẩm',
      group: [
        {
          id: 'courses',
          href: '/salesman/course',
          icon: <BookOpen className='h-5 w-5' />,
          label: 'Khóa học'
        },
        {
          id: 'products',
          href: '/salesman/product',
          icon: <Package className='h-5 w-5' />,
          label: 'Sản phẩm'
        }
      ]
    },
    {
      title: 'Cài đặt',
      group: [
        {
          id: 'settings',
          href: '/salesman/settings',
          icon: <Settings className='h-5 w-5' />,
          label: 'Cài đặt'
        }
      ]
    }
  ]

  return <SidebarLayout sidebarData={sidebarData}>{children}</SidebarLayout>
}
