'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Users, Ticket, DollarSign, Star, CheckCircle2, AlertCircle, ChevronDown, ArrowRight } from 'lucide-react'
import { mockData } from './_data/mock'
import { StatsCard } from './_components/dashboard/stats-card'
import { PriorityCard } from './_components/dashboard/priority-card'
import { PerformanceChart } from './_components/dashboard/performance-chart'
import { RecentActivity } from './_components/dashboard/recent-activity'
import { DashboardHeader } from './_components/dashboard/header'

export default function DashboardPage() {
  const { overview, tickets, refunds, performance } = mockData.stats

  return (
    <div className='container mx-auto px-4 py-6 space-y-8'>
      <DashboardHeader />

      {/* Priority Actions */}
      <div className='grid gap-6 md:grid-cols-3'>
        <PriorityCard
          title='Tickets chờ xử lý'
          value={tickets.pending}
          icon={<Ticket className='w-6 h-6 text-primary' />}
          color='primary'
          action={{ label: 'Xử lý ngay', href: '/support/tickets' }}
        >
          <div className='mt-4'>
            <Progress value={70} className='h-2' />
            <div className='flex justify-between text-xs mt-2'>
              <span className='text-muted-foreground'>Tỷ lệ xử lý</span>
              <span className='font-medium'>{Math.round((tickets.resolved / tickets.total) * 100)}%</span>
            </div>
          </div>
        </PriorityCard>

        <PriorityCard
          title='Yêu cầu hoàn tiền'
          value={refunds.pending.count}
          icon={<DollarSign className='w-6 h-6 text-destructive' />}
          color='destructive'
          action={{ label: 'Duyệt hoàn tiền', href: '/support/refunds' }}
        >
          <div className='mt-4 space-y-2'>
            <div className='flex justify-between items-center'>
              <div className='space-y-1'>
                <p className='text-xs text-muted-foreground'>Tổng tiền chờ duyệt</p>
                <p className='text-sm font-medium'>{refunds.pending.amount.toLocaleString()}đ</p>
              </div>
              <div className='text-right space-y-1'>
                <p className='text-xs text-muted-foreground'>Thời hạn</p>
                <p className='text-sm font-medium text-destructive'>Còn 2 ngày</p>
              </div>
            </div>
          </div>
        </PriorityCard>

        <Card className='relative overflow-hidden'>
          <div className='absolute top-0 left-0 w-full h-1 bg-yellow-500' />
          <CardContent className='pt-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm font-medium text-yellow-600'>Đánh giá dịch vụ</p>
                <div className='flex items-baseline gap-2 mt-2'>
                  <p className='text-3xl font-bold'>4.5</p>
                  <div className='flex text-yellow-500'>
                    <Star className='w-4 h-4 fill-current' />
                    <Star className='w-4 h-4 fill-current' />
                    <Star className='w-4 h-4 fill-current' />
                    <Star className='w-4 h-4 fill-current' />
                    <Star className='w-4 h-4 fill-current opacity-40' />
                  </div>
                </div>
              </div>
              <div className='p-3 bg-yellow-50 rounded-full'>
                <Star className='w-6 h-6 text-yellow-600' />
              </div>
            </div>
            <div className='space-y-3 mt-4'>
              <div>
                <div className='flex justify-between text-sm mb-1'>
                  <span className='text-muted-foreground'>Rất hài lòng</span>
                  <span className='font-medium'>68%</span>
                </div>
                <div className='flex gap-1'>
                  <div className='h-1.5 rounded-full bg-green-500 w-[68%]' />
                  <div className='h-1.5 rounded-full bg-muted flex-1' />
                </div>
              </div>
              <div>
                <div className='flex justify-between text-sm mb-1'>
                  <span className='text-muted-foreground'>Hài lòng</span>
                  <span className='font-medium'>24%</span>
                </div>
                <div className='flex gap-1'>
                  <div className='h-1.5 rounded-full bg-blue-500 w-[24%]' />
                  <div className='h-1.5 rounded-full bg-muted flex-1' />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className='grid gap-4 md:grid-cols-4'>
        <StatsCard
          icon={<Users className='w-6 h-6 text-blue-500' />}
          iconBg='bg-blue-50'
          iconColor='text-blue-500'
          label='Người dùng'
          value={overview.totalUsers.toLocaleString()}
          trend={{ value: `+${overview.newUsers}`, isUp: true }}
          trendText='tháng này'
        />

        <StatsCard
          icon={<CheckCircle2 className='w-6 h-6 text-green-500' />}
          iconBg='bg-green-50'
          iconColor='text-green-500'
          label='Tỷ lệ giải quyết'
          value={Math.round((tickets.resolved / tickets.total) * 100)}
          trend={{ value: 'Trung bình 2.5 giờ', isUp: false }}
        />

        <StatsCard
          icon={<AlertCircle className='w-6 h-6 text-yellow-500' />}
          iconBg='bg-yellow-50'
          iconColor='text-yellow-500'
          label='Thời gian phản hồi'
          value='15 phút'
          trend={{ value: '-23% so với tuần trước', isUp: false }}
        />

        <StatsCard
          icon={<DollarSign className='w-6 h-6 text-red-500' />}
          iconBg='bg-red-50'
          iconColor='text-red-500'
          label='Tổng hoàn tiền'
          value={(refunds.total.amount / 1000000).toFixed(1)}
          trend={{ value: '+12% so với tháng trước', isUp: true }}
          trendText='M'
        />
      </div>

      {/* Charts */}
      <div className='grid gap-6 md:grid-cols-2'>
        <PerformanceChart
          data={performance}
          title='Hiệu suất xử lý'
          description='Số lượng tickets và tỷ lệ giải quyết'
          period='Tháng này'
        />

        <Card>
          <CardHeader className='pb-0'>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>Mức độ hài lòng</CardTitle>
                <CardDescription>Đánh giá của người dùng sau khi được hỗ trợ</CardDescription>
              </div>
              <Button variant='outline' size='sm'>
                7 ngày qua
                <ChevronDown className='w-4 h-4 ml-2' />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='h-[300px] mt-4'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={performance}>
                  <defs>
                    <linearGradient id='colorSatisfaction' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='0%' stopColor='#2563eb' stopOpacity={0.8} />
                      <stop offset='100%' stopColor='#2563eb' stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' className='stroke-muted/30' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                  <Bar
                    dataKey='satisfaction'
                    name='Điểm đánh giá'
                    fill='url(#colorSatisfaction)'
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Hoạt động gần đây</CardTitle>
              <CardDescription>Các yêu cầu mới cần được xử lý</CardDescription>
            </div>
            <Button variant='ghost' size='sm'>
              Xem tất cả
              <ArrowRight className='w-4 h-4 ml-2' />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {tickets.pending > 0 && (
              <RecentActivity
                icon={<Ticket className='w-6 h-6 text-blue-500' />}
                iconBg='bg-blue-50'
                iconColor='text-blue-500'
                title='Tickets mới cần xử lý'
                description={`${tickets.pending} tickets đang chờ phản hồi`}
                progress={40}
                action={{ label: 'Xem ngay', href: '/support/tickets' }}
              />
            )}
            {refunds.pending.count > 0 && (
              <RecentActivity
                icon={<DollarSign className='w-6 h-6 text-red-500' />}
                iconBg='bg-red-50'
                iconColor='text-red-500'
                title='Yêu cầu hoàn tiền mới'
                description={`${refunds.pending.count} yêu cầu với tổng số tiền ${refunds.pending.amount.toLocaleString()}đ`}
                progress={60}
                action={{ label: 'Xem ngay', href: '/support/refunds' }}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
