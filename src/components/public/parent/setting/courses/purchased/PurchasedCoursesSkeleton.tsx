import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function PurchasedCoursesSkeleton() {
  return (
    <div className='space-y-4'>
      {[1, 2, 3].map((i) => (
        <Card key={i} className='overflow-hidden border-gray-100 shadow-sm'>
          <CardContent className='p-0'>
            <div className='flex flex-col md:flex-row'>
              {/* Course Image Skeleton */}
              <Skeleton className='h-48 md:h-auto md:w-64 flex-shrink-0' />

              {/* Course Info Skeleton */}
              <div className='flex-1 p-5 flex flex-col'>
                <div className='flex flex-wrap justify-between gap-6 pb-4'>
                  {/* Category, Purchase Date, Status skeletons */}
                  {[1, 2, 3].map((j) => (
                    <div key={j} className='space-y-1'>
                      <Skeleton className='h-3.5 w-20' />
                      <Skeleton className='h-5 w-24' />
                    </div>
                  ))}
                </div>

                <div className='py-4'>
                  {/* Assignment Info */}
                  <div className='flex justify-between mb-3'>
                    <Skeleton className='h-5 w-20' />
                    <Skeleton className='h-5 w-20' />
                  </div>

                  {/* Course Actions */}
                  <Skeleton className='h-5 w-full my-4' />
                  <Skeleton className='h-10 w-full rounded-md' />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
