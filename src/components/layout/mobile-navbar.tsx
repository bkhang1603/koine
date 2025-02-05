'use client'

import { Book, Building2, Home, LibraryBig, PackageSearch, Phone } from 'lucide-react'
import Link from 'next/link'
import configRoute from '@/config/route'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

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
    <nav className='flex flex-col justify-between h-[91%]'>
      <ul className='flex flex-col space-y-4 text-primary font-medium text-lg'>
        {menuItems.map((item, index) => {
          return (
            <Link key={index} href={item.href}>
              <li
                className={`flex items-center gap-3 cursor-pointer ${pathname === item.href ? 'text-secondary' : ''}`}
              >
                <item.icon />
                {item.name}
              </li>
            </Link>
          )
        })}
      </ul>
      <Button asChild className='text-base'>
        <Link href={configRoute.login}>Đăng nhập vào Koine</Link>
      </Button>
    </nav>
  )
}

export default MobileNavbar
