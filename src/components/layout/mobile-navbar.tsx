'use client'

import { Book, Building2, Home, LibraryBig, PackageSearch, Phone } from 'lucide-react'
import Link from 'next/link'
import configRoute from '@/config/route'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

function MobileNavbar() {
  const pathname = usePathname()
  const menuItems = [
    { name: 'Trang chủ', icon: Home, href: configRoute.home },
    { name: 'Sản phẩm', icon: PackageSearch, href: configRoute.product },
    { name: 'Khóa học', icon: LibraryBig, href: configRoute.course },
    { name: 'Kiến thức', icon: Book, href: configRoute.knowledge },
    { name: 'Tổng quan', icon: Building2, href: configRoute.about },
    // { name: 'Dịch vụ', icon: HandHelping, href: configRoute.service },
    { name: 'Liên hệ', icon: Phone, href: configRoute.contact }
  ]

  return (
    <nav className='flex flex-col justify-between h-full'>
      {/* Menu Items */}
      <div className='space-y-1'>
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link key={index} href={item.href}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  'hover:bg-primary/5 active:bg-primary/10',
                  isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:text-primary'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive ? 'text-primary' : 'text-gray-500')} />
                <span className='text-sm font-medium'>{item.name}</span>

                {/* Active Indicator */}
                {isActive && <div className='ml-auto w-1.5 h-1.5 rounded-full bg-primary' />}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Divider */}
      <div className='my-4 border-t border-gray-100' />

      {/* Additional Links */}
      <div className='space-y-2 text-sm text-gray-600'>
        <Link href='/help' className='block hover:text-primary'>
          Trung tâm hỗ trợ
        </Link>
        <Link href='/terms' className='block hover:text-primary'>
          Điều khoản sử dụng
        </Link>
        <Link href='/privacy' className='block hover:text-primary'>
          Chính sách bảo mật
        </Link>
      </div>
    </nav>
  )
}

export default MobileNavbar
