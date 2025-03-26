import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function PurchasedCourseStatsHeaderSkeleton() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Card key={index} className='border-none shadow-sm overflow-hidden'>
            <CardContent className='p-4 bg-gradient-to-b from-gray-50/80 to-gray-50'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-11 w-11 rounded-full' />
                <div>
                  <Skeleton className='h-6 w-12 mb-1' />
                  <Skeleton className='h-3 w-16' />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
