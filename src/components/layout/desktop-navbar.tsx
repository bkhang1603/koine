'use client'

import configRoute from '@/config/route'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function DesktopNavbar() {
  const pathname = usePathname()
  const menuItems = [
    { name: 'Trang chủ', href: configRoute.home },
    {
      name: 'Khóa học',
      href: configRoute.course
    },
    { name: 'Kiến thức', href: configRoute.knowledge },
    { name: 'Tổng quan', href: configRoute.about },
    // { name: 'Dịch vụ', href: configRoute.service },
    { name: 'Liên hệ', href: configRoute.contact }
  ]

  return (
    <nav className='pl-20 hidden lg:block'>
      <ul className='flex space-x-6 font-medium text-primary text-base'>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <li
              className={`hover:text-primary/90 cursor-pointer ${pathname === item.href && 'text-secondary hover:text-secondary/90'}`}
            >
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default DesktopNavbar
