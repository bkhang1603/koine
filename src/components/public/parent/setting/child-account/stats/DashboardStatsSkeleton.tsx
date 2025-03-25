import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardStatsSkeleton() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Card key={index} className='border-none shadow-sm overflow-hidden'>
            <CardContent className='p-4 bg-gray-50/80'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-11 w-11 rounded-full' />
                <div>
                  <div className='flex items-baseline gap-0.5'>
                    <Skeleton className='h-6 w-12 rounded-md' />
                  </div>
                  <Skeleton className='h-3 w-16 mt-1.5 rounded-md' />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
