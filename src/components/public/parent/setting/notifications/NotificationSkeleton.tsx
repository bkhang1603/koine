import { Skeleton } from '@/components/ui/skeleton'

interface NotificationSkeletonProps {
  count?: number
}

export function NotificationSkeleton({ count = 3 }: NotificationSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='p-4 animate-pulse'>
          <div className='flex gap-4'>
            <Skeleton className='h-10 w-10 rounded-full' />

            <div className='flex-1'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2'>
                <Skeleton className='h-5 w-40' />
                <Skeleton className='h-3.5 w-20' />
              </div>

              <Skeleton className='h-4 w-full mb-1' />
              <Skeleton className='h-4 w-2/3 mb-4' />

              <div className='flex justify-end gap-2'>
                <Skeleton className='h-8 w-28' />
                <Skeleton className='h-8 w-16' />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
