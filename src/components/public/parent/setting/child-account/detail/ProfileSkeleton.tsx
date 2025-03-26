import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProfileSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Profile Header Skeleton */}
      <Card className='border-none shadow-sm overflow-hidden'>
        <div className='p-6'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
            <Skeleton className='h-20 w-20 rounded-full' />

            <div className='flex-1 space-y-4'>
              <div className='space-y-2'>
                <Skeleton className='h-6 w-40' />
                <Skeleton className='h-4 w-60' />
              </div>

              <div className='flex flex-wrap gap-3'>
                <Skeleton className='h-5 w-28 rounded-full' />
                <Skeleton className='h-5 w-32 rounded-full' />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Dashboard Stats Skeleton */}
      <div className='mt-8'>
        <Skeleton className='h-6 w-48 mb-4' />
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className='border-none shadow-sm overflow-hidden'>
                <div className='p-4 bg-gray-50/80'>
                  <div className='flex items-center gap-3'>
                    <Skeleton className='h-11 w-11 rounded-full' />
                    <div>
                      <Skeleton className='h-6 w-12 rounded-md' />
                      <Skeleton className='h-3 w-16 mt-1.5 rounded-md' />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className='mt-8'>
        <div className='flex justify-between items-center mb-4'>
          <Skeleton className='h-6 w-48' />
          <Skeleton className='h-10 w-64 rounded-md' />
        </div>

        {/* Course List Skeleton */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className='group relative overflow-hidden border-0 bg-white'>
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
            ))}
        </div>
      </div>
    </div>
  )
}
