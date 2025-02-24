'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { salesData, productData } from '../_mock/data'

export default function ReportsPage() {
  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Báo cáo doanh số</h1>
          <p className='text-muted-foreground mt-1'>Phân tích và thống kê chi tiết</p>
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
              <SelectItem value='this-year'>Năm nay</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className='w-4 h-4 mr-2' />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Doanh số theo thời gian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-[400px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Line type='monotone' dataKey='amount' stroke='#8884d8' />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-[400px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='sales' fill='#8884d8' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
