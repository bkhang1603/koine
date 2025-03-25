import { Skeleton } from '@/components/ui/skeleton'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbSkeletonProps {
  levels?: number
}

export function BreadcrumbSkeleton({ levels = 3 }: BreadcrumbSkeletonProps) {
  return (
    <div className='flex items-center gap-2 text-sm'>
      {Array(levels)
        .fill(0)
        .map((_, i) => (
          <div key={i} className='flex items-center gap-2'>
            <Skeleton className={`h-5 w-${i === levels - 1 ? '40' : '20'}`} />

            {i < levels - 1 && <ChevronRight className='h-4 w-4 text-muted-foreground flex-shrink-0' />}
          </div>
        ))}
    </div>
  )
}
