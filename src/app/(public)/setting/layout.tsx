'use client'

import { NavItem, SidebarNav } from '@/components/public/parent/setting/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import {
  Album,
  Archive,
  CircleUserRound,
  FolderKanban,
  NotepadText,
  TvMinimal,
  MapPin,
  KeyRound,
  Receipt,
  RefreshCcw,
  BellRing,
  Star,
  Award
} from 'lucide-react'

const sidebarNavItems: NavItem[] = [
  {
    title: 'Hồ sơ',
    icon: <CircleUserRound className='h-5 w-5' />,
    children: [
      {
        title: 'Thông tin cá nhân',
        icon: <CircleUserRound className='h-4 w-4' />,
        href: '/setting'
      },
      {
        title: 'Địa chỉ',
        icon: <MapPin className='h-4 w-4' />,
        href: '/setting/address'
      },
      {
        title: 'Thông báo',
        icon: <BellRing className='h-4 w-4' />,
        href: '/setting/notifications'
      },
      {
        title: 'Bảo mật',
        icon: <KeyRound className='h-4 w-4' />,
        href: '/setting/security'
      }
    ]
  },
  {
    title: 'Quản lý',
    icon: <FolderKanban className='h-5 w-5' />,
    children: [
      {
        title: 'Khóa học của tôi',
        icon: <Album className='h-4 w-4' />,
        href: '/setting/my-course'
      },
      {
        title: 'Khóa học đã mua',
        icon: <Archive className='h-4 w-4' />,
        href: '/setting/purchased-courses'
      },
      {
        title: 'Chứng nhận của tôi',
        icon: <Award className='h-4 w-4' />,
        href: '/setting/my-certificate'
      },
      {
        title: 'Quản lý tài khoản con',
        icon: <TvMinimal className='h-4 w-4' />,
        href: '/setting/child-account'
      }
    ]
  },
  {
    title: 'Đơn mua',
    icon: <NotepadText className='h-5 w-5' />,
    children: [
      {
        title: 'Danh sách đơn hàng',
        icon: <Receipt className='h-4 w-4' />,
        href: '/setting/order'
      },
      {
        title: 'Danh sách đánh giá',
        icon: <Star className='h-4 w-4' />,
        href: '/setting/need-review'
      },
      {
        title: 'Hoàn tiền & Đổi trả',
        icon: <RefreshCcw className='h-4 w-4' />,
        href: '/setting/refund'
      }
    ]
  }
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='container pt-32 pb-16'>
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='lg:w-1/4 xl:w-1/5'>
          <div className='sticky top-24'>
            <div className='flex flex-col space-y-1 mb-6'>
              <h2 className='text-2xl font-semibold tracking-tight'>Cài đặt</h2>
              <p className='text-sm text-gray-500'>Quản lý thông tin cá nhân và các chức năng khác của tài khoản</p>
            </div>
            <Separator className='mb-6' />
            <SidebarNav items={sidebarNavItems} />
          </div>
        </aside>
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  )
}
