import { Skeleton } from '@/components/ui/skeleton'

export function StatsHeaderSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='rounded-lg border bg-card p-4 shadow-sm'>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-10 w-10 rounded-full' />
              <div className='flex-1'>
                <Skeleton className='h-5 w-16 mb-1' />
                <Skeleton className='h-7 w-20' />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
