'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { DollarSign, Users, TrendingUp, Package, Star } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { performanceData } from './_mock/data'

export default function DashboardPage() {
  return (
    <div className='container mx-auto px-4 py-6 space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold'>Tổng quan kinh doanh</h1>
        <p className='text-muted-foreground mt-1'>Thống kê và báo cáo doanh số</p>
      </div>

      {/* Quick Stats */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-green-50 rounded-full'>
                <DollarSign className='w-6 h-6 text-green-500' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Doanh số tháng</p>
                <p className='text-2xl font-bold'>45.6M</p>
                <p className='text-xs text-green-500 flex items-center gap-1'>
                  <TrendingUp className='w-3 h-3' />
                  +12% so với tháng trước
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-blue-50 rounded-full'>
                <Users className='w-6 h-6 text-blue-500' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Khách hàng mới</p>
                <p className='text-2xl font-bold'>156</p>
                <p className='text-xs text-blue-500'>Tháng này</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-purple-50 rounded-full'>
                <Package className='w-6 h-6 text-purple-500' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Đơn hàng</p>
                <p className='text-2xl font-bold'>284</p>
                <p className='text-xs text-purple-500'>85% thành công</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-yellow-50 rounded-full'>
                <Star className='w-6 h-6 text-yellow-500' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Đánh giá</p>
                <p className='text-2xl font-bold'>4.8</p>
                <p className='text-xs text-yellow-500'>142 đánh giá</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hiệu suất bán hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[400px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Line type='monotone' dataKey='sales' stroke='#8884d8' name='Doanh số' />
                <Line type='monotone' dataKey='target' stroke='#82ca9d' name='Mục tiêu' />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Mục tiêu tháng</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Doanh số</span>
                <span className='font-medium'>45.6M/50M</span>
              </div>
              <Progress value={91.2} />
            </div>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Khách hàng mới</span>
                <span className='font-medium'>156/200</span>
              </div>
              <Progress value={78} />
            </div>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Tỷ lệ chuyển đổi</span>
                <span className='font-medium'>85%/90%</span>
              </div>
              <Progress value={94.4} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              {[
                { name: 'Khóa học IELTS', sales: '12.5M', growth: '+15%' },
                { name: 'Khóa học TOEIC', sales: '10.2M', growth: '+8%' },
                { name: 'Tiếng Anh cho bé', sales: '8.4M', growth: '+12%' }
              ].map((product, i) => (
                <div key={i} className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <p className='font-medium'>{product.name}</p>
                    <p className='text-sm text-muted-foreground'>{product.sales}</p>
                  </div>
                  <Badge variant='secondary'>{product.growth}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
