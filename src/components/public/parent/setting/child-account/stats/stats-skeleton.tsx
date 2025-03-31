import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function StatsSkeleton() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className='border-none shadow-sm overflow-hidden'>
          <CardContent className='p-4 bg-gradient-to-b from-gray-50/80 to-gray-50'>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-10 w-10 rounded-full' />
              <div>
                <Skeleton className='h-6 w-12 mb-1' />
                <Skeleton className='h-3 w-14' />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
