import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function CartSkeleton() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
      <div className='lg:col-span-3'>
        <Card className='mb-4'>
          <CardContent className='p-0'>
            {/* Cart header with "Select All" and column labels */}
            <div className='flex items-center p-4 border-b'>
              <div className='flex items-center w-1/2'>
                <Skeleton className='h-5 w-5 rounded-sm' />
                <Skeleton className='h-5 w-40 ml-2' />
              </div>
              <div className='grid grid-cols-4 gap-4 w-1/2 text-sm'>
                <Skeleton className='h-4 w-16 mx-auto' />
                <Skeleton className='h-4 w-16 mx-auto' />
                <Skeleton className='h-4 w-16 mx-auto' />
                <Skeleton className='h-4 w-4 mx-auto' />
              </div>
            </div>

            {/* Products section header */}
            <div className='p-3 pl-4 bg-gray-50 border-b flex items-center'>
              <Skeleton className='h-4 w-4 mr-2 rounded-sm' />
              <Skeleton className='h-4 w-20' />
            </div>

            {/* Product items */}
            {[1, 2].map((item) => (
              <div key={`product-${item}`} className='p-4 border-b'>
                <div className='flex items-start'>
                  <div className='flex w-1/2'>
                    <div className='flex items-center'>
                      <Skeleton className='h-5 w-5 rounded-sm' />
                      <Skeleton className='ml-4 w-20 h-20 rounded-md' />
                    </div>
                    <div className='ml-4 flex-grow h-full space-y-2'>
                      <Skeleton className='h-4 w-40' />
                      <Skeleton className='h-3 w-24' />
                    </div>
                  </div>
                  <div className='grid grid-cols-4 gap-4 w-1/2 items-center'>
                    <Skeleton className='h-4 w-20 mx-auto' />
                    <div className='flex items-center justify-center'>
                      <Skeleton className='h-8 w-8 rounded-full' />
                      <Skeleton className='mx-2 h-5 w-5' />
                      <Skeleton className='h-8 w-8 rounded-full' />
                    </div>
                    <Skeleton className='h-4 w-24 mx-auto' />
                    <Skeleton className='h-8 w-8 mx-auto rounded-full' />
                  </div>
                </div>
              </div>
            ))}

            {/* Courses section header */}
            <div className='p-3 pl-4 bg-gray-50 border-b flex items-center'>
              <Skeleton className='h-4 w-4 mr-2 rounded-sm' />
              <Skeleton className='h-4 w-20' />
            </div>

            {/* Course items */}
            {[1, 2].map((item) => (
              <div key={`course-${item}`} className={`p-4 ${item !== 2 ? 'border-b' : ''}`}>
                <div className='flex items-start'>
                  <div className='flex w-1/2'>
                    <div className='flex items-center'>
                      <Skeleton className='h-5 w-5 rounded-sm' />
                      <Skeleton className='ml-4 w-20 h-20 rounded-md' />
                    </div>
                    <div className='ml-4 flex-grow h-full space-y-2'>
                      <Skeleton className='h-4 w-40' />
                      <Skeleton className='h-3 w-24' />
                    </div>
                  </div>
                  <div className='grid grid-cols-4 gap-4 w-1/2 items-center'>
                    <Skeleton className='h-4 w-20 mx-auto' />
                    <div className='flex items-center justify-center'>
                      <Skeleton className='h-8 w-8 rounded-full' />
                      <Skeleton className='mx-2 h-5 w-5' />
                      <Skeleton className='h-8 w-8 rounded-full' />
                    </div>
                    <Skeleton className='h-4 w-24 mx-auto' />
                    <Skeleton className='h-8 w-8 mx-auto rounded-full' />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Button to continue shopping */}
        <Skeleton className='h-12 w-full rounded-lg' />
      </div>

      <div className='lg:col-span-1'>
        {/* Delivery address card */}
        <Card className='mb-4'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between mb-4'>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-5 w-16' />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-32' />
                <Skeleton className='h-5 w-5' />
                <Skeleton className='h-5 w-24' />
              </div>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-full' />
            </div>
          </CardContent>
        </Card>

        {/* Order summary card */}
        <Card>
          <CardContent className='p-4 space-y-4'>
            <div className='space-y-2 border-b pb-3'>
              <div className='flex justify-between'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-24' />
              </div>
            </div>
            <div className='flex justify-between'>
              <Skeleton className='h-6 w-24' />
              <Skeleton className='h-6 w-32' />
            </div>
            <Skeleton className='h-4 w-full mx-auto' />
            <Skeleton className='h-10 w-full rounded-md' />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CartSkeleton
