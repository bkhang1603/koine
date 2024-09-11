'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { Sidebar } from '@/types/sidebar'

export default function SidebarMenu({ sidebarData }: { sidebarData: Sidebar }) {
  const pathname = usePathname()

  return (
    <div className='flex-1'>
      <nav className='grid items-start px-2 text-base font-medium lg:px-4'>
        {sidebarData.map((item) => (
          <div key={item.title}>
            <h3 className='text-sm font-medium text-muted-foreground/60 my-3'>{item.title}</h3>
            {item.group.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`${isActive ? 'bg-primary text-primary-foreground' : 'hover:text-primary hover:bg-muted'} flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all`}
                >
                  {item.icon && item.icon}
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
    </div>
  )
}
