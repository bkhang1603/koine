import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div className='space-y-5'>
      {/* Date Range Picker Skeleton */}
      <div className='flex justify-between items-center'>
        <Skeleton className='h-9 w-52' />
      </div>

      {/* Stats Cards Skeleton */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={`stat-${i}`}>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-[120px]' />
                  <Skeleton className='h-8 w-[80px]' />
                  <Skeleton className='h-3 w-[160px]' />
                </div>
                <Skeleton className='h-12 w-12 rounded-full' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Chart Skeleton */}
      <Card className='h-[380px]'>
        <CardHeader>
          <Skeleton className='h-5 w-[200px]' />
          <Skeleton className='h-4 w-[300px]' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[280px] w-full' />
        </CardContent>
      </Card>

      {/* Course and Event Charts Skeleton */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={`chart-${i}`} className='h-[380px]'>
            <CardHeader>
              <Skeleton className='h-5 w-[200px]' />
              <Skeleton className='h-4 w-[300px]' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-[280px] w-full' />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
