'use client'

import configRoute from '@/config/route'
import { Brain, Home, LibraryBig } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function KidNavbar() {
  const pathname = usePathname()
  const menuItems = [
    { name: 'Tổng quan', href: configRoute.kid.dashboard, icon: <Home className='w-5 h-5' /> },
    {
      name: 'Khóa học',
      href: configRoute.kid.course,
      icon: <LibraryBig className='w-5 h-5' />
    },
    { name: 'Kiến thức', href: configRoute.kid.knowledge, icon: <Brain className='w-5 h-5' /> }
  ]

  return (
    <nav className='pl-20 hidden lg:block'>
      <ul className='flex space-x-6 font-medium text-primary text-base'>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <li
              className={`flex justify-center items-center gap-2 hover:text-primary/90 cursor-pointer ${pathname === item.href && 'text-secondary hover:text-secondary/90'}`}
            >
              {item.icon}
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default KidNavbar
