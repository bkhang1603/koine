'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Download, TrendingUp, TrendingDown } from 'lucide-react'
import { mockData } from '../_data/mock'

export default function ReportsPage() {
  const { performance } = mockData.stats
  const { tickets: ticketStats, refunds: refundStats } = mockData.stats

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Báo cáo thống kê</h1>
          <p className='text-sm text-muted-foreground mt-1'>Thống kê hoạt động hỗ trợ</p>
        </div>
        <div className='flex gap-4'>
          <Select defaultValue='this-month'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Chọn thời gian' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='this-month'>Tháng này</SelectItem>
              <SelectItem value='last-month'>Tháng trước</SelectItem>
              <SelectItem value='last-3-months'>3 tháng gần đây</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className='w-4 h-4 mr-2' />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Tổng tickets</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{ticketStats.total}</div>
            <p className='text-xs text-muted-foreground'>+20.1% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Tỷ lệ giải quyết</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{Math.round((ticketStats.resolved / ticketStats.total) * 100)}%</div>
            <p className='text-xs text-muted-foreground'>+5% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Tổng hoàn tiền</CardTitle>
            <TrendingDown className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{refundStats.total.amount.toLocaleString('vi-VN')}đ</div>
            <p className='text-xs text-muted-foreground'>-5% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='overview' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='overview'>Tổng quan</TabsTrigger>
          <TabsTrigger value='satisfaction'>Đánh giá</TabsTrigger>
        </TabsList>

        <TabsContent value='overview'>
          <Card>
            <CardHeader>
              <CardTitle>Hiệu suất xử lý</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[400px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={performance}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis />
                    <Tooltip />
                    <Line type='monotone' dataKey='tickets' stroke='#8884d8' name='Tickets' />
                    <Line type='monotone' dataKey='resolved' stroke='#82ca9d' name='Đã xử lý' />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='satisfaction'>
          <Card>
            <CardHeader>
              <CardTitle>Mức độ hài lòng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='h-[200px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={performance}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey='satisfaction' fill='#8884d8' name='Điểm đánh giá' />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>5 sao</span>
                  <span className='font-medium'>40%</span>
                </div>
                <Progress value={40} />
              </div>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>4 sao</span>
                  <span className='font-medium'>35%</span>
                </div>
                <Progress value={35} />
              </div>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>3 sao</span>
                  <span className='font-medium'>20%</span>
                </div>
                <Progress value={20} />
              </div>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>2 sao</span>
                  <span className='font-medium'>5%</span>
                </div>
                <Progress value={5} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
