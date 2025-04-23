import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

export type BreadcrumbItem = {
  label: string
  href?: string
  isCurrent?: boolean
}

interface SettingBreadcrumbProps {
  items: BreadcrumbItem[]
  backButton?: React.ReactNode
  className?: string
  isLoading?: boolean
}

export function SettingBreadcrumb({ items, backButton, className, isLoading }: SettingBreadcrumbProps) {
  if (isLoading) {
    return (
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
        <div className='flex items-center gap-2 text-sm'>
          <Skeleton className='h-5 w-20' />
          <Skeleton className='h-5 w-4 rounded-full' />
          <Skeleton className='h-5 w-20' />
          <Skeleton className='h-5 w-4 rounded-full' />
          <Skeleton className='h-5 w-40' />
        </div>
        {backButton && <Skeleton className='h-8 w-32 rounded-md' />}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6', className)}>
      <div className='flex items-center gap-2 text-sm'>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <div key={index} className='flex items-center gap-2'>
              {item.href && !item.isCurrent ? (
                <Link href={item.href} className='text-muted-foreground hover:text-foreground transition-colors'>
                  {item.label}
                </Link>
              ) : (
                <span className={cn('max-w-[150px] sm:max-w-xs truncate', item.isCurrent && 'font-medium')}>
                  {item.label}
                </span>
              )}

              {!isLast && <ChevronRight className='h-4 w-4 text-muted-foreground' />}
            </div>
          )
        })}
      </div>

      {backButton && backButton}
    </div>
  )
}
