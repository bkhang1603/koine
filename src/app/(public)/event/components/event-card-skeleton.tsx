import { Skeleton } from '@/components/ui/skeleton'

export function EventCardSkeleton() {
  return (
    <div className='group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full'>
      <div className='relative h-48'>
        <Skeleton className='h-full w-full' />
      </div>

      <div className='p-6 flex flex-col flex-1'>
        <div className='flex items-center gap-2 mb-3'>
          <Skeleton className='h-8 w-8 rounded-full' />
          <div className='space-y-1'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-3 w-32' />
          </div>
        </div>

        <Skeleton className='h-6 w-3/4 mb-2' />
        <Skeleton className='h-4 w-full mb-4 flex-1' />

        <div className='border-t pt-4 mt-auto'>
          <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-4'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-4 w-20' />
            </div>
            <Skeleton className='h-4 w-16' />
          </div>
        </div>
      </div>
    </div>
  )
}
