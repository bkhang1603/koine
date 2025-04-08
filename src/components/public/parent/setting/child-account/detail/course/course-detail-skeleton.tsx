import { Skeleton } from '@/components/ui/skeleton'

export function CoursesDetailSkeleton() {
  return (
    <div className='max-w-6xl mx-auto py-6 space-y-6'>
      {/* Header với breadcrumb và toolbar */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2'>
        <div className='flex items-center gap-2 text-sm'>
          <Skeleton className='h-5 w-20' />
          <Skeleton className='h-5 w-4 rounded-full' />
          <Skeleton className='h-5 w-20' />
          <Skeleton className='h-5 w-4 rounded-full' />
          <Skeleton className='h-5 w-40' />
        </div>

        <Skeleton className='h-9 w-32 rounded-md' />
      </div>

      {/* Banner khóa học */}
      <div className='relative w-full h-48 md:h-64 overflow-hidden rounded-lg'>
        <Skeleton className='absolute inset-0' />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/60'></div>

        <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
          <Skeleton className='h-8 w-2/3 max-w-xl bg-white/20' />
          <div className='flex flex-wrap items-center gap-3 mt-3'>
            <Skeleton className='h-6 w-24 rounded-full bg-white/20' />
            <Skeleton className='h-6 w-20 rounded-full bg-white/20' />
            <Skeleton className='h-6 w-28 rounded-full bg-white/20' />
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className='w-full'>
        <div className='flex px-1 gap-2 border-b'>
          <div className='px-4 py-2.5 rounded-t flex items-center gap-2 bg-primary text-white'>
            <Skeleton className='h-4 w-4 rounded-full bg-white/30' />
            <Skeleton className='h-5 w-24 bg-white/30' />
          </div>
          <div className='px-4 py-2.5 flex items-center gap-2'>
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-5 w-32' />
          </div>
        </div>
      </div>

      {/* Tab Content - Tổng quan */}
      <div className='space-y-6'>
        {/* Tiến độ học tập */}
        <div className='border rounded-lg shadow-sm overflow-hidden'>
          <div className='p-5 border-b bg-white'>
            <Skeleton className='h-7 w-48 mb-1' />
            <Skeleton className='h-4 w-64' />
          </div>

          <div className='p-6 space-y-6 bg-white'>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <Skeleton className='h-5 w-32' />
                <Skeleton className='h-5 w-12' />
              </div>
              <Skeleton className='h-2.5 w-full rounded-full' />
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='flex gap-3 items-center p-4 bg-blue-50 border border-blue-100 rounded-lg'>
                <div className='h-10 w-10 rounded-full bg-blue-100 flex-shrink-0'></div>
                <div>
                  <Skeleton className='h-4 w-24 bg-blue-200' />
                  <Skeleton className='h-6 w-16 bg-blue-200 mt-1' />
                </div>
              </div>

              <div className='flex gap-3 items-center p-4 bg-green-50 border border-green-100 rounded-lg'>
                <div className='h-10 w-10 rounded-full bg-green-100 flex-shrink-0'></div>
                <div>
                  <Skeleton className='h-4 w-24 bg-green-200' />
                  <Skeleton className='h-6 w-16 bg-green-200 mt-1' />
                </div>
              </div>

              <div className='flex gap-3 items-center p-4 bg-amber-50 border border-amber-100 rounded-lg'>
                <div className='h-10 w-10 rounded-full bg-amber-100 flex-shrink-0'></div>
                <div>
                  <Skeleton className='h-4 w-24 bg-amber-200' />
                  <Skeleton className='h-6 w-16 bg-amber-200 mt-1' />
                </div>
              </div>

              <div className='flex gap-3 items-center p-4 bg-purple-50 border border-purple-100 rounded-lg'>
                <div className='h-10 w-10 rounded-full bg-purple-100 flex-shrink-0'></div>
                <div>
                  <Skeleton className='h-4 w-24 bg-purple-200' />
                  <Skeleton className='h-6 w-16 bg-purple-200 mt-1' />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kiểm soát truy cập */}
        <div className='border rounded-lg shadow-sm overflow-hidden'>
          <div className='p-5 border-b bg-white'>
            <Skeleton className='h-7 w-48 mb-1' />
            <Skeleton className='h-4 w-64' />
          </div>

          <div className='p-6 space-y-5 bg-white'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <Skeleton className='h-5 w-36' />
                <Skeleton className='h-4 w-64' />
              </div>
              <Skeleton className='h-6 w-12 rounded-full' />
            </div>

            <div className='p-4 border rounded-lg bg-yellow-50 border-yellow-100'>
              <div className='flex gap-2'>
                <div className='flex-shrink-0 mt-0.5'>
                  <Skeleton className='h-5 w-5 rounded-full bg-yellow-200' />
                </div>
                <div>
                  <Skeleton className='h-5 w-16 bg-yellow-100 mb-1' />
                  <Skeleton className='h-4 w-full max-w-md bg-yellow-100' />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hoạt động gần đây */}
        <div className='border rounded-lg shadow-sm overflow-hidden'>
          <div className='p-5 border-b bg-white'>
            <Skeleton className='h-7 w-48 mb-1' />
            <Skeleton className='h-4 w-64' />
          </div>

          <div className='p-6 space-y-4 bg-white'>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className='flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0'>
                  <div className='h-8 w-8 rounded-full bg-green-100 flex-shrink-0'></div>
                  <div className='flex-1 space-y-1'>
                    <Skeleton className='h-5 w-3/4' />
                    <Skeleton className='h-4 w-1/2 bg-gray-100' />
                  </div>
                  <Skeleton className='h-6 w-24 rounded-md bg-green-50' />
                </div>
              ))}
          </div>
        </div>

        {/* Tab Content - Nội dung khóa học (ẩn mặc định) */}
        <div className='hidden'>
          <div className='border rounded-lg shadow-sm overflow-hidden mb-4 bg-white'>
            <div className='p-5 border-b'>
              <Skeleton className='h-7 w-48 mb-1' />
              <Skeleton className='h-4 w-72' />
            </div>
          </div>

          <div className='space-y-3'>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className='border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white'>
                  <div className='px-6 py-4'>
                    <div className='flex items-start gap-3'>
                      <div className='h-8 w-8 rounded-full bg-primary/10 flex-shrink-0'></div>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <Skeleton className='h-5 w-64' />
                          <Skeleton className='h-5 w-20 rounded-full bg-gray-100' />
                        </div>
                        <div className='flex items-center gap-3 text-sm text-gray-500'>
                          <Skeleton className='h-4 w-20' />
                          <Skeleton className='h-4 w-16' />
                          <Skeleton className='h-4 w-28' />
                        </div>
                      </div>
                      <Skeleton className='h-5 w-5 rounded-full' />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
