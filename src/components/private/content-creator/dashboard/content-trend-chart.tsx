'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'

interface ContentTrendChartProps {
  data: Array<{
    date: string
    enrollments: number
  }>
  title: string
  description: string
}

export function ContentTrendChart({ data, title, description }: ContentTrendChartProps) {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='px-2'>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={data}
              margin={{
                top: 15,
                right: 25,
                bottom: 30,
                left: 20
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' tick={{ fontSize: 12 }} tickMargin={10} />
              <YAxis tickFormatter={(value) => `${value}`} />
              <Tooltip formatter={(value) => [`${value}`, 'Đăng ký']} labelFormatter={(label) => `Ngày: ${label}`} />
              <Line type='monotone' dataKey='enrollments' name='Đăng ký' stroke='#8b5cf6' strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
