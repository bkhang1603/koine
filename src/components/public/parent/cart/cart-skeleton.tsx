import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function CartSkeleton() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
      <div className='lg:col-span-3'>
        <Card className='mb-4'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between mb-6'>
              <Skeleton className='h-5 w-40' />
              <div className='flex space-x-20'>
                <Skeleton className='h-5 w-16' />
                <Skeleton className='h-5 w-16' />
                <Skeleton className='h-5 w-16' />
                <Skeleton className='h-5 w-5' />
              </div>
            </div>

            {[1, 2, 3].map((item) => (
              <div key={item} className='py-4 border-t'>
                <div className='flex items-start'>
                  <div className='flex w-1/2'>
                    <Skeleton className='h-5 w-5 rounded-sm' />
                    <Skeleton className='ml-4 w-20 h-20 rounded-md' />
                    <div className='ml-4 space-y-2'>
                      <Skeleton className='h-4 w-40' />
                      <Skeleton className='h-3 w-24' />
                    </div>
                  </div>
                  <div className='grid grid-cols-4 gap-4 w-1/2'>
                    <Skeleton className='h-4 w-20 mx-auto' />
                    <div className='flex items-center justify-center'>
                      <div className='flex items-center'>
                        <Skeleton className='h-8 w-8 rounded-full' />
                        <Skeleton className='mx-2 h-5 w-5' />
                        <Skeleton className='h-8 w-8 rounded-full' />
                      </div>
                    </div>
                    <Skeleton className='h-4 w-24 mx-auto' />
                    <Skeleton className='h-8 w-8 mx-auto rounded-full' />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className='lg:col-span-1'>
        <Card className='mb-4'>
          <CardContent className='p-4'>
            <Skeleton className='h-5 w-32 mb-4' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4 space-y-4'>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-24' />
              </div>
              <Skeleton className='h-px w-full' />
            </div>
            <div className='flex justify-between'>
              <Skeleton className='h-6 w-24' />
              <Skeleton className='h-6 w-32' />
            </div>
            <Skeleton className='h-10 w-full rounded-md' />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CartSkeleton
