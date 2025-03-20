import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function ProfileSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Profile Header Skeleton */}
      <Card className='border-none shadow-sm bg-gradient-to-r from-gray-50 to-white'>
        <CardContent className='p-6'>
          <div className='flex flex-col md:flex-row gap-5 items-start md:items-center'>
            {/* Avatar */}
            <div className='relative'>
              <Skeleton className='h-16 w-16 md:h-20 md:w-20 rounded-full' />
              <Skeleton className='h-7 w-7 rounded-full absolute -bottom-2 -right-2' />
            </div>

            {/* Info */}
            <div className='flex-1 space-y-4'>
              <div className='space-y-1.5'>
                <Skeleton className='h-6 w-48' />
                <Skeleton className='h-4 w-24' />
              </div>
              <div className='flex flex-wrap gap-3'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-24' />
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex gap-2'>
              <Skeleton className='h-9 w-32' />
              <Skeleton className='h-9 w-28' />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notice Box */}
      <Skeleton className='h-14 w-full rounded-lg' />

      {/* Stats Dashboard Skeleton */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-6'>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className='border-none shadow-sm overflow-hidden'>
            <CardContent className='p-4 bg-gradient-to-b from-gray-50/80 to-gray-50'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div>
                  <Skeleton className='h-6 w-12 mb-1' />
                  <Skeleton className='h-3 w-16' />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs and Courses Skeleton */}
      <div className='mt-8 space-y-4'>
        <div className='flex justify-between'>
          <Skeleton className='h-6 w-48' />
          <Skeleton className='h-10 w-64' />
        </div>
        <div className='space-y-4'>
          {[1, 2].map((i) => (
            <Card key={i} className='overflow-hidden border-gray-50 shadow-sm'>
              <div className='flex flex-col md:flex-row'>
                {/* Course Image Skeleton */}
                <Skeleton className='h-44 md:h-auto md:w-64' />

                {/* Course Content Skeleton */}
                <div className='p-5 flex-1'>
                  <div className='flex flex-col h-full'>
                    {/* Title and Icons */}
                    <div className='space-y-3'>
                      <Skeleton className='h-5 w-3/4' />
                      <div className='flex gap-3'>
                        <Skeleton className='h-4 w-20' />
                        <Skeleton className='h-4 w-16' />
                      </div>
                    </div>

                    {/* Progress */}
                    <div className='mt-auto pt-3 space-y-2'>
                      <div className='flex justify-between'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-4 w-12' />
                      </div>
                      <Skeleton className='h-2 w-full' />
                      <div className='flex justify-end'>
                        <Skeleton className='h-6 w-24' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
