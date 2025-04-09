import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  title: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  colorForLink?: string
}

export function Breadcrumb({ items, className, colorForLink }: BreadcrumbProps) {
  return (
    <div className={cn('flex items-center gap-2 text-sm', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className='flex items-center gap-2'>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={cn('text-muted-foreground hover:text-foreground transition-colors', colorForLink)}
              >
                {item.title}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium truncate max-w-[150px] sm:max-w-xs' : 'text-muted-foreground'}>
                {item.title}
              </span>
            )}

            {!isLast && <ChevronRight className='h-4 w-4 text-muted-foreground flex-shrink-0' />}
          </div>
        )
      })}
    </div>
  )
}
