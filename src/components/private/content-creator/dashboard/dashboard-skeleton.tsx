'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Stats Cards Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-[100px]' />
                  <Skeleton className='h-7 w-[70px]' />
                  <Skeleton className='h-3 w-[120px]' />
                </div>
                <Skeleton className='h-10 w-10 rounded-full' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Skeletons */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-[150px]' />
            <Skeleton className='h-4 w-[250px]' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-[300px] w-full' />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-[150px]' />
            <Skeleton className='h-4 w-[250px]' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-[300px] w-full' />
          </CardContent>
        </Card>
      </div>

      {/* Popular Content Skeleton */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <Card className='lg:col-span-2'>
          <CardHeader>
            <Skeleton className='h-6 w-[150px]' />
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <Skeleton className='h-5 w-[200px]' />
                    <Skeleton className='h-5 w-[80px]' />
                  </div>
                  <Skeleton className='h-2 w-full' />
                  <div className='flex justify-end'>
                    <Skeleton className='h-3 w-[60px]' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-[150px]' />
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='space-y-2'>
                  <div className='flex justify-between'>
                    <Skeleton className='h-5 w-[120px]' />
                    <Skeleton className='h-5 w-[80px]' />
                  </div>
                  <Skeleton className='h-2 w-full' />
                  <div className='flex justify-end'>
                    <Skeleton className='h-3 w-[40px]' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
