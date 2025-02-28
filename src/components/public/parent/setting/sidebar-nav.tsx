'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export interface NavItem {
  title: string
  href?: string
  icon?: React.ReactNode
  children?: Omit<NavItem, 'children'>[]
}

interface SidebarNavProps {
  items: NavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>(['Hồ sơ', 'Quản lý'])

  const toggleSection = (title: string) => {
    setOpenSections((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  return (
    <nav className='flex flex-col space-y-1'>
      {items.map((item) => {
        if (item.children) {
          const isOpen = openSections.includes(item.title)
          const isActive = item.children.some((child) => child.href === pathname)

          return (
            <div key={item.title} className='space-y-1'>
              <button
                onClick={() => toggleSection(item.title)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive ? 'bg-primary/5 text-primary hover:bg-primary/10' : 'hover:bg-gray-100 text-gray-700'
                )}
              >
                <div className='flex items-center gap-3'>
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
              </button>
              {isOpen && (
                <div className='ml-4 pl-4 border-l border-gray-100 space-y-1'>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href!}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors',
                        pathname === child.href
                          ? 'bg-primary/5 text-primary hover:bg-primary/10 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      {child.icon}
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href!}
            className={cn(
              'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
              pathname === item.href
                ? 'bg-primary/5 text-primary hover:bg-primary/10'
                : 'hover:bg-gray-100 text-gray-700'
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
