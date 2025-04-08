import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function CheckoutSkeleton() {
  return (
    <div className='pt-4 pb-40'>
      {/* Breadcrumb skeleton */}
      <div className='mb-4'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-4' />
          <Skeleton className='h-4 w-24' />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
        <div className='lg:col-span-3'>
          {/* Products card */}
          <Card className='mb-4 p-4'>
            <Skeleton className='h-6 w-32 mb-4' />

            <CardContent className='p-0 pb-0'>
              {/* Products section header */}
              <div className='p-3 pl-4 bg-gray-50 border-b flex items-center'>
                <Skeleton className='h-4 w-4 mr-2 rounded-sm' />
                <Skeleton className='h-4 w-20' />
              </div>

              {/* Product items */}
              {[1, 2].map((item) => (
                <div key={`product-${item}`} className='p-4 border-b'>
                  <div className='flex items-start'>
                    <Skeleton className='w-20 h-20 rounded-md' />
                    <div className='flex-grow ml-4 space-y-2'>
                      <Skeleton className='h-5 w-40' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                    <Skeleton className='h-5 w-24' />
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
                <div key={`course-${item}`} className='p-4 border-b'>
                  <div className='flex items-start'>
                    <Skeleton className='w-20 h-20 rounded-md' />
                    <div className='flex-grow ml-4 space-y-2'>
                      <Skeleton className='h-5 w-40' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                    <Skeleton className='h-5 w-24' />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Shipping method card */}
          <Card className='mb-4'>
            <CardContent className='p-4'>
              <Skeleton className='h-5 w-56 mb-4' />
              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-4 w-4 rounded-full' />
                  <Skeleton className='h-4 w-40' />
                </div>
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-4 w-4 rounded-full' />
                  <Skeleton className='h-4 w-64' />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment method card */}
          <Card>
            <CardContent className='p-4'>
              <Skeleton className='h-5 w-56 mb-4' />
              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-4 w-4 rounded-full' />
                  <Skeleton className='h-4 w-48' />
                </div>
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-4 w-4 rounded-full' />
                  <Skeleton className='h-4 w-56' />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue shopping button */}
          <Skeleton className='h-12 w-full rounded-lg mt-4' />
        </div>

        <div className='lg:col-span-1'>
          {/* Delivery address card */}
          <Card className='mb-4'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between mb-4'>
                <Skeleton className='h-5 w-32' />
                <Skeleton className='h-5 w-16' />
              </div>
              <div className='space-y-3'>
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
            <CardContent className='p-4'>
              <Skeleton className='h-6 w-40 mb-4' />
              <div className='space-y-2 mb-4 border-b border-gray-300 pb-4'>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-4 w-20' />
                </div>
                <div className='flex justify-between'>
                  <Skeleton className='h-4 w-40' />
                  <Skeleton className='h-4 w-16' />
                </div>
              </div>
              <div className='flex justify-between mb-4'>
                <Skeleton className='h-6 w-24' />
                <Skeleton className='h-6 w-32' />
              </div>
              <Skeleton className='h-10 w-full rounded-md' />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSkeleton
