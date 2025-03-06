import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export function AddressSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Skeleton cho các địa chỉ */}
      <div className='grid gap-6 md:grid-cols-2'>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className='p-6'>
            {/* Header với tag và default badge */}
            <div className='flex items-start justify-between mb-6'>
              <div className='flex items-center gap-2'>
                <Skeleton className='w-5 h-5 rounded-full' />
                <Skeleton className='h-5 w-20' />
              </div>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-8 w-24 rounded-md' />
                <Skeleton className='h-8 w-8 rounded-md' />
                <Skeleton className='h-8 w-8 rounded-md' />
              </div>
            </div>

            {/* Grid layout cho thông tin địa chỉ */}
            <div className='grid md:grid-cols-2 gap-8'>
              {/* Cột trái - Thông tin liên hệ */}
              <div className='space-y-4'>
                <div>
                  <Skeleton className='h-4 w-24 mb-1' />
                  <Skeleton className='h-6 w-40' />
                </div>
                <div>
                  <Skeleton className='h-4 w-24 mb-1' />
                  <Skeleton className='h-6 w-32' />
                </div>
              </div>

              {/* Cột phải - Thông tin địa chỉ */}
              <div className='space-y-4'>
                <div>
                  <Skeleton className='h-4 w-24 mb-1' />
                  <Skeleton className='h-6 w-full' />
                </div>
                <div>
                  <Skeleton className='h-4 w-24 mb-1' />
                  <Skeleton className='h-6 w-20' />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
