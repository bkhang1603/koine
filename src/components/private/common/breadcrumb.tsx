'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export interface BreadcrumbItem {
  title: string
  href?: string
  icon?: ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  maxItems?: number
  showTruncated?: boolean
}

export function Breadcrumb({ items, className, maxItems = 5, showTruncated = true }: BreadcrumbProps) {
  // Handle case where we have more than maxItems by truncating the middle items
  let displayItems = [...items]

  if (showTruncated && items.length > maxItems) {
    const firstItem = items[0]
    const lastItems = items.slice(-3) // Show the last 3 items
    displayItems = [firstItem, { title: '...', href: undefined }, ...lastItems]
  }

  return (
    <nav className={cn('flex items-center flex-wrap text-sm', className)} aria-label='breadcrumb'>
      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1
        const isTruncated = item.title === '...'

        return (
          <div key={index} className='flex items-center'>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className='flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors'
              >
                {item.icon && <span className='flex-shrink-0'>{item.icon}</span>}
                <span>{item.title}</span>
              </Link>
            ) : (
              <span
                className={cn(
                  'flex items-center gap-1',
                  isLast ? 'font-medium' : 'text-muted-foreground',
                  isTruncated && 'px-1',
                  // Support longer titles with proper truncation
                  isLast && 'line-clamp-1 max-w-[240px] md:max-w-md'
                )}
              >
                {item.icon && <span className='flex-shrink-0'>{item.icon}</span>}
                <span>{item.title}</span>
              </span>
            )}

            {!isLast && <ChevronRight className='w-4 h-4 mx-2 text-muted-foreground flex-shrink-0' />}
          </div>
        )
      })}
    </nav>
  )
}
