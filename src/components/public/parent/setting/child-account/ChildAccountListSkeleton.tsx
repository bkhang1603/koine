import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function ChildAccountListSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header và Actions */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <div className='space-y-1'>
          <Skeleton className='h-10 w-72' />
        </div>
        <div className='flex gap-3 w-full sm:w-auto'>
          <Skeleton className='h-10 w-full sm:w-64' />
          <Skeleton className='h-10 w-10 rounded-md' />
        </div>
      </div>

      {/* Child Account Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className='overflow-hidden border-gray-100 shadow-sm hover:shadow transition-all'>
            <CardContent className='p-0'>
              <div className='p-5 flex gap-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-5 w-24' />
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4 rounded-full' />
                    <Skeleton className='h-3.5 w-16' />
                  </div>
                </div>
                <Skeleton className='h-8 w-8 rounded-full' />
              </div>
              <div className='px-5 pb-5 space-y-3'>
                <div className='flex justify-between items-center text-sm'>
                  <Skeleton className='h-4 w-28' />
                  <Skeleton className='h-4 w-12' />
                </div>
                <Skeleton className='h-2 w-full rounded-full' />
                <div className='flex flex-wrap gap-2'>
                  <Skeleton className='h-6 w-20 rounded-full' />
                  <Skeleton className='h-6 w-24 rounded-full' />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Account Dialog Button */}
      <div className='flex justify-center mt-6'>
        <Skeleton className='h-10 w-48 rounded-md' />
      </div>
    </div>
  )
}
