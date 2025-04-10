import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DollarSign, ShoppingBag, MapPin, UserRound, CheckCircle } from 'lucide-react'

export function DashboardSkeleton() {
  return (
    <div className='p-6 space-y-6'>
      <div className='flex flex-col gap-4 md:flex-row md:justify-between'>
        <div className='h-9 w-40 bg-primary/10 rounded-md animate-pulse'></div>
      </div>

      {/* Stats cards skeleton */}
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {/* Card 1: Tổng Doanh Thu */}
        <Card>
          <CardHeader className='pb-2 flex justify-between items-center'>
            <div className='h-5 w-28 bg-primary/10 rounded-md animate-pulse'></div>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='h-8 w-28 bg-primary/15 rounded-md animate-pulse mb-3'></div>
            <div className='h-4 w-full bg-primary/5 rounded-md animate-pulse'></div>
          </CardContent>
        </Card>

        {/* Card 2: Đơn Hàng */}
        <Card>
          <CardHeader className='pb-2 flex justify-between items-center'>
            <div className='h-5 w-28 bg-primary/10 rounded-md animate-pulse'></div>
            <ShoppingBag className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='h-8 w-28 bg-primary/15 rounded-md animate-pulse mb-3'></div>
            <div className='h-4 w-full bg-primary/5 rounded-md animate-pulse'></div>
          </CardContent>
        </Card>

        {/* Card 3: Hoàn Thành */}
        <Card>
          <CardHeader className='pb-2 flex justify-between items-center'>
            <div className='h-5 w-28 bg-primary/10 rounded-md animate-pulse'></div>
            <CheckCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='h-8 w-28 bg-primary/15 rounded-md animate-pulse mb-3'></div>
            <div className='h-4 w-full bg-primary/5 rounded-md animate-pulse'></div>
          </CardContent>
        </Card>

        {/* Card 4: Khách Hàng */}
        <Card>
          <CardHeader className='pb-2 flex justify-between items-center'>
            <div className='h-5 w-28 bg-primary/10 rounded-md animate-pulse'></div>
            <UserRound className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='h-8 w-28 bg-primary/15 rounded-md animate-pulse mb-3'></div>
            <div className='h-4 w-full bg-primary/5 rounded-md animate-pulse'></div>
          </CardContent>
        </Card>
      </div>

      {/* Charts skeleton */}
      <div className='grid gap-4 grid-cols-1 lg:grid-cols-3'>
        {/* Revenue chart skeleton - spans 2 columns */}
        <Card className='lg:col-span-2'>
          <CardHeader>
            <div className='h-6 w-32 bg-primary/10 rounded-md animate-pulse'></div>
            <div className='h-4 w-48 bg-primary/5 rounded-md animate-pulse mt-1'></div>
          </CardHeader>
          <CardContent>
            <div className='h-[360px] w-full bg-primary/5 rounded-lg flex items-center justify-center'>
              <div className='flex flex-col items-center gap-2'>
                <div className='h-10 w-10 border-4 border-t-primary border-primary/10 rounded-full animate-spin'></div>
                <div className='text-sm text-muted-foreground'>Đang tải dữ liệu...</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order status skeleton - 1 column */}
        <Card>
          <CardHeader>
            <div className='h-6 w-40 bg-primary/10 rounded-md animate-pulse'></div>
            <div className='h-4 w-52 bg-primary/5 rounded-md animate-pulse mt-1'></div>
          </CardHeader>
          <CardContent>
            <div className='h-[350px] w-full bg-primary/5 rounded-lg flex items-center justify-center'>
              <div className='flex flex-col items-center gap-2'>
                <div className='h-32 w-32 rounded-full border-4 border-primary/10 border-t-primary animate-spin'></div>
                <div className='text-sm text-muted-foreground mt-4'>Đang tải biểu đồ...</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution & Products Section skeleton */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {/* Location Distribution skeleton */}
        <Card className='lg:col-span-1'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <div className='h-6 w-32 bg-primary/10 rounded-md animate-pulse'></div>
              <div className='h-4 w-28 bg-primary/5 rounded-md animate-pulse mt-1'></div>
            </div>
            <MapPin className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='h-[350px] w-full bg-primary/5 rounded-lg flex justify-center'>
              <div className='w-full px-10 py-4'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={`location-${i}`} className='flex items-center justify-between mb-4'>
                    <div className='h-5 w-20 bg-primary/10 rounded-md animate-pulse'></div>
                    <div className='h-4 w-[60%] bg-primary/5 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-primary/20 animate-pulse'
                        style={{ width: `${Math.min(i * 10, 90)}%` }}
                      ></div>
                    </div>
                    <div className='h-5 w-10 bg-primary/10 rounded-md animate-pulse'></div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Age Distribution skeleton */}
        <Card className='lg:col-span-1'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <div className='h-6 w-36 bg-primary/10 rounded-md animate-pulse'></div>
              <div className='h-4 w-32 bg-primary/5 rounded-md animate-pulse mt-1'></div>
            </div>
            <UserRound className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='h-[350px] w-full bg-primary/5 rounded-lg flex items-center justify-center'>
              <div className='w-full px-8 pt-8'>
                <div className='flex items-end justify-around h-[200px]'>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={`age-bar-${i}`} className='w-12 flex flex-col items-center'>
                      <div
                        className='w-full bg-primary/20 rounded-t-md animate-pulse'
                        style={{ height: `${50 + i * 20}px` }}
                      ></div>
                      <div className='h-4 w-full bg-primary/10 rounded-md animate-pulse mt-2'></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Selling Products skeleton */}
        <Card className='lg:col-span-1'>
          <CardHeader>
            <div className='h-6 w-40 bg-primary/10 rounded-md animate-pulse'></div>
          </CardHeader>
          <CardContent>
            <div className='h-8 flex space-x-2 mb-6'>
              <div className='h-full w-1/2 bg-primary/10 rounded-md animate-pulse'></div>
              <div className='h-full w-1/2 bg-primary/5 rounded-md animate-pulse'></div>
            </div>
            <div className='space-y-4'>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={`product-${i}`} className='flex justify-between items-center border-b pb-2'>
                  <div className='space-y-2'>
                    <div className='h-5 w-40 md:w-56 bg-primary/10 rounded-md animate-pulse'></div>
                    <div className='h-4 w-24 bg-primary/5 rounded-md animate-pulse'></div>
                  </div>
                  <div className='h-5 w-20 bg-primary/10 rounded-md animate-pulse'></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
