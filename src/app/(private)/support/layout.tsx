import { Sidebar } from '@/types/sidebar'
import SidebarLayout from '@/components/layout/sidebar-layout'
import {
  BarChart,
  FileText,
  LayoutDashboard,
  MessageSquare,
  RefreshCcw,
  Settings,
  ShoppingCart,
  Users
} from 'lucide-react'

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
      title: 'Hỗ trợ khách hàng',
      group: [
        {
          id: 'ticket',
          href: '/support/tickets',
          icon: <MessageSquare className='h-5 w-5' />,
          label: 'Yêu cầu hỗ trợ'
        },
        {
          id: 'refund',
          href: '/support/refunds',
          icon: <RefreshCcw className='h-5 w-5' />,
          label: 'Hoàn tiền'
        },
        {
          id: 'exchange',
          href: '/support/exchange',
          icon: <RefreshCcw className='h-5 w-5' />,
          label: 'Đổi trả'
        },
        {
          id: 'chat',
          href: '/support/chat',
          icon: <MessageSquare className='h-5 w-5' />,
          label: 'Chat'
        },
        {
          id: 'users',
          href: '/support/user',
          icon: <Users className='h-5 w-5' />,
          label: 'Khách hàng'
        },
        {
          id: 'orders',
          href: '/support/order',
          icon: <BarChart className='h-5 w-5' />,
          label: 'Đơn hàng'
        }
      ]
    },
    {
      title: 'Quản lý bình luận',
      group: [
        {
          id: 'blog',
          href: '/support/blog',
          icon: <MessageSquare className='h-5 w-5' />,
          label: 'Bài viết'
        },
        {
          id: 'course',
          href: '/support/course',
          icon: <RefreshCcw className='h-5 w-5' />,
          label: 'Khóa học'
        },
        {
          id: 'product',
          href: '/support/product',
          icon: <ShoppingCart className='h-5 w-5' />,
          label: 'Sản phẩm'
        }
      ]
    },
    {
      title: 'Báo cáo',
      group: [
        {
          id: 'report',
          href: '/support/report',
          icon: <FileText className='h-5 w-5' />,
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
