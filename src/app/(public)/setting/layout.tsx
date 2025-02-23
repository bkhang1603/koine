'use client'

import { NavItem, SidebarNav } from '@/components/public/parent/setting/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import { Album, Archive, CircleUserRound, FolderKanban, NotepadText, TvMinimal } from 'lucide-react'

const sidebarNavItems: NavItem[] = [
  {
    title: 'Hồ sơ',
    icon: <CircleUserRound className='h-5 w-5 mr-2' />,
    children: [
      {
        title: 'Thông tin cá nhân',
        href: '/setting'
      },
      {
        title: 'Địa chỉ',
        href: '/setting/address'
      },
      {
        title: 'Thông tin thanh toán',
        href: '/setting/payment'
      },
      {
        title: 'Cài đặt thông báo',
        href: '/setting/notifications'
      },
      {
        title: 'Bảo mật',
        href: '/setting/security'
      }
    ]
  },
  {
    title: 'Quản lý',
    icon: <FolderKanban className='h-5 w-5 mr-2' />,
    children: [
      {
        title: 'Khóa học của tôi',
        icon: <Album className='h-5 w-5 mr-2' />,
        href: '/setting/my-course'
      },
      {
        title: 'Khóa học đã mua',
        icon: <Archive className='h-5 w-5 mr-2' />,
        href: '/setting/purchased-courses'
      },
      {
        title: 'Quản lý tài khoản con',
        icon: <TvMinimal className='h-5 w-5 mr-2' />,
        href: '/setting/child-account'
      }
    ]
  },

  {
    title: 'Đơn mua',
    icon: <NotepadText className='h-5 w-5 mr-2' />,
    href: '/setting/order'
  }
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='container pt-32 pb-16'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>Thông tin cá nhân</h2>
        <p className='text-muted-foreground'>Quản lý thông tin cá nhân và các chức năng khác của tài khoản.</p>
      </div>
      <Separator className='my-6' />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='-mx-4 lg:w-1/5'>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  )
}
