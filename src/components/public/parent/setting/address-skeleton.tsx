import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function AddressSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className='overflow-hidden border-gray-100 shadow-sm'>
          <CardContent className='p-0'>
            {/* Tag badge */}
            <div className='pt-4 px-4 flex'>
              <Skeleton className='h-5 w-16 rounded-full' />
              {i % 3 === 0 && <Skeleton className='h-5 w-16 rounded-full ml-2' />}
            </div>

            {/* Main content */}
            <div className='p-4 pb-3'>
              <div className='flex items-start gap-3'>
                <Skeleton className='flex-shrink-0 h-8 w-8 rounded-full' />

                <div className='flex-1 space-y-3'>
                  <div>
                    <Skeleton className='h-4 w-32 mb-1.5' />
                    <Skeleton className='h-3.5 w-24' />
                  </div>

                  <div className='space-y-1.5'>
                    <Skeleton className='h-3.5 w-full' />
                    <Skeleton className='h-3.5 w-5/6' />
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex border-t border-gray-100'>
              <Skeleton className='h-10 flex-1' />
              <Skeleton className='h-10 flex-1' />
              <Skeleton className='h-10 w-10' />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
