import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const LoadingSkeletonForKid = () => {
  return (
    <div className='pt-6 pb-14'>
      {/* Breadcrumb Skeleton */}
      <div className='mb-6 flex items-center gap-1 text-sm'>
        <div className='flex items-center gap-1'>
          <Skeleton className='h-4 w-4' />
          <Skeleton className='h-4 w-20' />
        </div>
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-16' />
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-32' />
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-16' />
      </div>

      <div className='grid lg:grid-cols-[340px_1fr] gap-8'>
        {/* Sidebar Skeleton */}
        <div className='space-y-5'>
          {/* Back Button */}
          <Skeleton className='h-12 w-full rounded-xl' />

          {/* Course Progress Card */}
          <Card className='bg-white/50 backdrop-blur-sm border-none shadow-lg'>
            <div className='p-5 border-b'>
              <Skeleton className='h-6 w-3/4 mb-4' />
              <div className='space-y-3'>
                <Skeleton className='h-2 w-full rounded-full' />
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-32' />
                  </div>
                  <Skeleton className='h-4 w-12' />
                </div>
              </div>
            </div>

            {/* Chapters List */}
            <div className='max-h-[calc(100vh-280px)] overflow-y-auto'>
              {[1, 2].map((chapter) => (
                <div key={chapter} className='border-b last:border-none'>
                  <div className='p-4 bg-gray-50/50'>
                    <div className='flex items-center gap-3'>
                      <Skeleton className='h-6 w-6 rounded-lg' />
                      <Skeleton className='h-5 w-40' />
                    </div>
                  </div>

                  <div className='divide-y'>
                    {[1, 2, 3].map((lesson) => (
                      <div key={lesson} className='p-4'>
                        <div className='flex items-center gap-3'>
                          <Skeleton className='h-8 w-8 rounded-full' />
                          <div className='flex-1'>
                            <Skeleton className='h-4 w-full mb-2' />
                            <div className='flex items-center gap-2'>
                              <Skeleton className='h-3 w-3' />
                              <Skeleton className='h-3 w-16' />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Card className='bg-white backdrop-blur-sm border-none shadow-lg min-h-[calc(100vh-12rem)] flex flex-col'>
          <div className='flex-1 overflow-y-auto'>
            <div className='p-8'>
              <div className='max-w-4xl mx-auto space-y-8'>
                {/* Lesson Header */}
                <div>
                  <div className='flex items-center gap-3 text-sm mb-2'>
                    <Skeleton className='h-5 w-20' />
                    <Skeleton className='h-5 w-2 rounded-full' />
                    <div className='flex items-center gap-1'>
                      <Skeleton className='h-4 w-4' />
                      <Skeleton className='h-4 w-16' />
                    </div>
                  </div>
                  <Skeleton className='h-8 w-2/3' />
                </div>

                {/* Video Player */}
                <div className='aspect-video'>
                  <Skeleton className='h-full w-full rounded-2xl' />
                </div>

                {/* Description */}
                <div className='space-y-3'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-5/6' />
                  <Skeleton className='h-4 w-4/6' />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className='flex-shrink-0 border-t bg-white p-6'>
            <div className='max-w-2xl mx-auto'>
              <div className='flex flex-col sm:flex-row items-center gap-4'>
                <Skeleton className='h-12 w-full sm:w-[160px] rounded-xl' />
                <Skeleton className='h-12 w-full sm:flex-1 rounded-xl' />
                <Skeleton className='h-12 w-full sm:w-[160px] rounded-xl' />
              </div>
              <div className='mt-6 flex items-center justify-center gap-2'>
                <div className='flex items-center gap-1.5'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-20' />
                </div>
                <Skeleton className='h-4 w-2 rounded-full' />
                <div className='flex items-center gap-1.5'>
                  <Skeleton className='h-4 w-4' />
                  <Skeleton className='h-4 w-24' />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
