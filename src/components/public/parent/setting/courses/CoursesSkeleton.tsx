import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export function CoursesSkeleton() {
  return (
    <div className='space-y-4'>
      {[1, 2, 3].map((i) => (
        <Card key={i} className='overflow-hidden border-gray-50 shadow-sm'>
          <div className='flex flex-col md:flex-row'>
            {/* Course Image Skeleton */}
            <Skeleton className='h-44 md:h-auto md:w-64' />

            {/* Course Content Skeleton */}
            <div className='p-5 flex-1'>
              <div className='flex flex-col h-full'>
                {/* Categories Skeleton */}
                <div className='flex gap-1.5 mb-3'>
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className='h-4 w-12 rounded-sm' />
                  ))}
                </div>

                {/* Title and Actions Skeleton */}
                <div className='flex justify-between items-start gap-4 mb-2'>
                  <Skeleton className='h-5 w-3/4' />
                  <Skeleton className='h-6 w-6 rounded-full' />
                </div>

                {/* Metadata Skeleton */}
                <div className='flex gap-3 mb-8'>
                  <Skeleton className='h-3.5 w-20' />
                  <Skeleton className='h-3.5 w-16' />
                </div>

                {/* Progress Section Skeleton */}
                <div className='mt-auto space-y-3'>
                  {/* Labels */}
                  <div className='flex justify-between'>
                    <Skeleton className='h-3.5 w-24' />
                    <Skeleton className='h-3.5 w-10' />
                  </div>

                  {/* Progress Bar */}
                  <Skeleton className='h-1.5 w-full' />

                  {/* Action Button */}
                  <div className='flex justify-end pt-2'>
                    <Skeleton className='h-8 w-28 rounded-md' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
