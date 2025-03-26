import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CoursesSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
    </div>
  )
}

function CourseCardSkeleton() {
  return (
    <Card className='group relative overflow-hidden border-0 bg-white'>
      {/* Course Image Container */}
      <div className='relative'>
        <div className='aspect-[4/3] relative overflow-hidden bg-gray-100'>
          <Skeleton className='absolute inset-0' />

          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none'></div>

          {/* Level Badge Skeleton */}
          <div className='absolute right-3 top-3'>
            <Skeleton className='h-6 w-20 rounded-md' />
          </div>

          {/* Info Overlay Skeleton */}
          <div className='absolute inset-x-0 bottom-0 p-4'>
            <Skeleton className='mb-2 h-5 w-4/5 rounded-md' />
            <Skeleton className='mb-1 h-5 w-2/3 rounded-md' />

            <div className='mt-3 flex items-center gap-3'>
              <Skeleton className='h-6 w-20 rounded-md' />
              <Skeleton className='h-6 w-20 rounded-md' />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className='p-4 space-y-3'>
        <div className='flex items-center justify-between gap-2'>
          <Skeleton className='h-4 w-24 rounded-md' />
          <Skeleton className='h-4 w-10 rounded-md' />
        </div>

        {/* Progress Bar */}
        <Skeleton className='h-1.5 w-full rounded-md' />

        {/* Parent Action Buttons */}
        <div className='flex gap-2 mt-3'>
          <Skeleton className='h-9 flex-1 rounded-md' />
          <Skeleton className='h-9 w-9 rounded-md' />
        </div>
      </div>
    </Card>
  )
}
