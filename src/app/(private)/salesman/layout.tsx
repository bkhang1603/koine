import { Sidebar } from '@/types/sidebar'
import SidebarLayout from '@/components/layout/sidebar-layout'
import { LayoutDashboard, Users, Package, BookOpen, BarChart, Receipt, Tags } from 'lucide-react'

export default function SalesmanLayout({
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
          href: '/salesman',
          icon: <LayoutDashboard className='h-5 w-5' />,
          label: 'Dashboard'
        }
      ]
    },
    {
      title: 'Quản lý bán hàng',
      group: [
        {
          id: 'customers',
          href: '/salesman/customers',
          icon: <Users className='h-5 w-5' />,
          label: 'Khách hàng'
        },
        {
          id: 'orders',
          href: '/salesman/orders',
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
          href: '/salesman/courses',
          icon: <BookOpen className='h-5 w-5' />,
          label: 'Khóa học'
        },
        {
          id: 'products',
          href: '/salesman/products',
          icon: <Package className='h-5 w-5' />,
          label: 'Sản phẩm'
        },
        {
          id: 'promotions',
          href: '/salesman/promotions',
          icon: <Tags className='h-5 w-5' />,
          label: 'Khuyến mãi'
        }
      ]
    },
    {
      title: 'Báo cáo',
      group: [
        {
          id: 'reports',
          href: '/salesman/reports',
          icon: <BarChart className='h-5 w-5' />,
          label: 'Báo cáo'
        }
      ]
    }
  ]

  return <SidebarLayout sidebarData={sidebarData}>{children}</SidebarLayout>
}
