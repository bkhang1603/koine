import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header with Date Range Picker */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-40' />
          <Skeleton className='h-4 w-64' />
        </div>
        <Skeleton className='h-10 w-full md:w-[300px]' />
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className='p-6'>
              <div className='flex justify-between items-start'>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-[100px]' />
                  <Skeleton className='h-8 w-[80px]' />
                  <Skeleton className='h-3 w-[120px]' />
                </div>
                <Skeleton className='h-12 w-12 rounded-full' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support Request Section */}
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-3'>
        {/* Tickets Overview */}
        <Card className='lg:col-span-2'>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <div className='space-y-2'>
                <Skeleton className='h-5 w-[140px]' />
                <Skeleton className='h-4 w-[200px]' />
              </div>
              <Skeleton className='h-9 w-[100px]' />
            </div>
          </CardHeader>
          <CardContent className='p-6'>
            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='rounded-lg p-6 bg-gray-50'>
                  <Skeleton className='h-4 w-[80px]' />
                  <Skeleton className='h-8 w-[60px] mt-2' />
                  <div className='mt-auto pt-4'>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-2 w-2 rounded-full' />
                      <Skeleton className='h-3 w-[100px]' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-[120px]' />
              <Skeleton className='h-4 w-[180px]' />
            </div>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='divide-y'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='p-4'>
                  <div className='flex items-start gap-3'>
                    <Skeleton className='h-8 w-8 rounded-full' />
                    <div className='min-w-0 flex-1'>
                      <div className='flex flex-wrap items-start justify-between gap-2 mb-1'>
                        <Skeleton className='h-4 w-[180px]' />
                        <Skeleton className='h-4 w-[60px] rounded-full' />
                      </div>
                      <Skeleton className='h-3 w-[150px]' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='p-4 border-t'>
              <Skeleton className='h-9 w-full' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refund Card */}
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-[140px]' />
              <Skeleton className='h-4 w-[200px]' />
            </div>
            <Skeleton className='h-9 w-[100px]' />
          </div>
        </CardHeader>
        <CardContent className='p-6'>
          {/* Summary Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='rounded-lg p-4 bg-gray-50'>
                <div className='flex items-start justify-between'>
                  <div>
                    <Skeleton className='h-4 w-[90px]' />
                    <Skeleton className='h-8 w-[60px] mt-1' />
                  </div>
                  <Skeleton className='h-9 w-9 rounded-full' />
                </div>
                <div className='mt-2 pt-2 border-t'>
                  <Skeleton className='h-3 w-[120px]' />
                </div>
              </div>
            ))}
          </div>

          {/* Status Breakdown */}
          <div className='border rounded-lg p-5'>
            <div className='flex items-center justify-between mb-4'>
              <Skeleton className='h-5 w-[140px]' />
              <Skeleton className='h-4 w-[80px]' />
            </div>

            <div className='space-y-4'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-7 w-7 rounded-full' />
                      <Skeleton className='h-4 w-[100px]' />
                    </div>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-[30px]' />
                      <Skeleton className='h-5 w-[40px] rounded-full' />
                    </div>
                  </div>
                  <Skeleton className='h-2 w-full rounded-full' />
                </div>
              ))}
            </div>

            <div className='grid grid-cols-2 gap-3 mt-6'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='border rounded-lg p-3'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-7 w-7 rounded-lg' />
                    <div>
                      <Skeleton className='h-3 w-[80px]' />
                      <Skeleton className='h-6 w-[50px] mt-1' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
