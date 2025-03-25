import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function OrderDetailSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Back button skeleton */}
      <Skeleton className='h-9 w-36' />

      {/* Header skeleton */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <Skeleton className='h-8 w-64' />
        </div>
        <div className='flex items-center gap-6'>
          <Skeleton className='h-5 w-40' />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2 space-y-6'>
          {/* Product card skeleton */}
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5 rounded-full' />
                <Skeleton className='h-5 w-32' />
              </div>
            </CardHeader>
            <CardContent className='space-y-6'>
              {Array(2)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className='flex gap-4'>
                    <Skeleton className='h-16 w-16 rounded-lg' />
                    <div className='flex-1 space-y-2'>
                      <Skeleton className='h-5 w-48' />
                      <div className='flex justify-between'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-4 w-16' />
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Course card skeleton */}
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5 rounded-full' />
                <Skeleton className='h-5 w-28' />
              </div>
            </CardHeader>
            <CardContent className='space-y-6'>
              {Array(2)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className='flex gap-4'>
                    <Skeleton className='h-16 w-16 rounded-lg' />
                    <div className='flex-1 space-y-2'>
                      <Skeleton className='h-5 w-56' />
                      <div className='flex justify-between'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-4 w-16' />
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        {/* Order summary skeleton */}
        <div>
          <Card>
            <CardHeader>
              <Skeleton className='h-5 w-36' />
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-16' />
                </div>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-28' />
                  <Skeleton className='h-4 w-20' />
                </div>
              </div>

              <Separator />

              <div className='space-y-3'>
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className='flex justify-between'>
                      <Skeleton className='h-4 w-28' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
