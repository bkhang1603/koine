import { Skeleton } from '@/components/ui/skeleton'

export function EventDetailSkeleton() {
  return (
    <div className='min-h-screen bg-gray-50/50'>
      {/* Hero Section Skeleton */}
      <div className='relative h-[60vh] bg-gray-200'>
        <Skeleton className='absolute inset-0' />
      </div>

      {/* Content Section Skeleton */}
      <div className='container -mt-16 relative z-10'>
        <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>
          <div className='flex flex-col md:flex-row gap-8'>
            {/* Left Column */}
            <div className='flex-1'>
              <Skeleton className='h-8 w-32 mb-4' />
              <Skeleton className='h-12 w-3/4 mb-6' />
              <div className='flex items-center gap-4 mb-6'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-3 w-40' />
                </div>
              </div>
              <div className='space-y-4'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-4/6' />
              </div>
            </div>

            {/* Right Column */}
            <div className='w-full md:w-80 space-y-6'>
              <div className='space-y-4'>
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-full' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
