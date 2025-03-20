import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export function ProfileSkeleton() {
  return (
    <div>
      {/* Header Skeleton */}
      <div className='p-6 border-b border-gray-100 bg-gray-50/50'>
        <div className='flex flex-col md:flex-row md:items-center gap-6'>
          <Skeleton className='h-20 w-20 rounded-full' />

          <div className='flex-1'>
            <Skeleton className='h-7 w-48 mb-2' />
            <Skeleton className='h-4 w-36 mb-2' />

            <div className='flex gap-2'>
              <Skeleton className='h-6 w-28 rounded-full' />
              <Skeleton className='h-6 w-28 rounded-full' />
            </div>
          </div>
        </div>
      </div>

      {/* Form Content Skeleton */}
      <div className='p-6'>
        <Skeleton className='h-6 w-40 mb-2' />
        <Skeleton className='h-4 w-64 mb-6' />

        <Separator className='mb-6' />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='h-5 w-24' />
                <Skeleton className='h-10 w-full' />
              </div>
            ))}
        </div>

        <Separator className='mb-6' />

        <div className='space-y-2 mb-8'>
          <Skeleton className='h-5 w-36' />
          <Skeleton className='h-32 w-full' />
        </div>

        <Skeleton className='h-10 w-36' />
      </div>
    </div>
  )
}
