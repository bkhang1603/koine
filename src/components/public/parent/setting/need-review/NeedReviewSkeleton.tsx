import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function NeedReviewSkeleton() {
  return (
    <div className='container max-w-6xl mx-auto py-6 space-y-8'>
      {/* Header Skeleton */}
      <div>
        <Skeleton className='h-8 w-64 mb-2' />
        <Skeleton className='h-4 w-96' />
      </div>

      {/* Tabs Skeleton */}
      <div className='mb-4'>
        <Skeleton className='h-10 w-48 rounded-md' />
      </div>

      {/* Items List Skeleton */}
      <div className='space-y-6'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Card key={index} className='border border-gray-100 rounded-xl overflow-hidden'>
              <CardContent className='p-0'>
                <div className='flex flex-col sm:flex-row h-full'>
                  {/* Image Skeleton */}
                  <div className='relative w-full sm:w-[180px] h-[180px] sm:h-auto flex-shrink-0 border-b sm:border-b-0 sm:border-r border-gray-100 sm:flex-[0_0_180px]'>
                    <Skeleton className='absolute inset-0' />
                    <div className='absolute top-3 left-3 z-10'>
                      <Skeleton className='h-6 w-24 rounded-full' />
                    </div>
                  </div>

                  {/* Content Skeleton */}
                  <div className='flex-1 p-5 space-y-4'>
                    <div>
                      <Skeleton className='h-6 w-4/5 mb-2' />
                      <Skeleton className='h-4 w-3/5 mb-2' />
                      <Skeleton className='h-4 w-3/4' />
                    </div>

                    <div className='flex items-center gap-1 py-2'>
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Skeleton key={i} className='h-5 w-5 rounded-full' />
                        ))}
                      <Skeleton className='h-4 w-32 ml-2' />
                    </div>

                    {/* Footer Skeleton */}
                    <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                      <Skeleton className='h-4 w-32' />
                      <Skeleton className='h-9 w-32 rounded-md' />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
