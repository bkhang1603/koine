'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { InfoIcon } from 'lucide-react'

interface CourseEnrollmentsChartProps {
  data: {
    date: string
    count: number
  }[]
}

// Custom tick configuration with correct typing
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor='end' fill='#666' fontSize={12} transform='rotate(-45)'>
        {payload.value}
      </text>
    </g>
  )
}

export function CourseEnrollmentsChart({ data }: CourseEnrollmentsChartProps) {
  // Calculate total enrollments
  const totalEnrollments = data.reduce((sum, item) => sum + item.count, 0)

  // Calculate average enrollments per day
  const averageEnrollments = data.length > 0 ? (totalEnrollments / data.length).toFixed(1) : '0'

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>Xu hướng đăng ký khóa học</CardTitle>
        <CardDescription>Biểu đồ số lượng đăng ký trong 30 ngày gần đây</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[300px] w-full'>
          {data.length > 0 ? (
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 25 // Increased bottom margin for angled labels
                }}
              >
                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                <XAxis
                  dataKey='date'
                  tickLine={false}
                  axisLine={true}
                  tick={<CustomXAxisTick />}
                  height={60} // Increased height for x-axis to accommodate angled labels
                  interval={data.length > 15 ? 2 : 1} // Show every 3rd label if data has more than 15 points
                />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} width={35} />
                <Tooltip
                  formatter={(value: number) => [`${value} lượt đăng ký`, 'Số lượng']}
                  labelFormatter={(label) => `Ngày: ${label}`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px'
                  }}
                />
                <Line
                  type='monotone'
                  dataKey='count'
                  stroke='#3b82f6'
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className='flex h-full items-center justify-center'>
              <div className='flex flex-col items-center text-center text-muted-foreground'>
                <InfoIcon className='mb-2 h-10 w-10' />
                <h3 className='font-medium'>Không có dữ liệu</h3>
                <p className='text-sm'>Chưa có dữ liệu về lượt đăng ký khóa học này</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className='border-t px-6 py-3'>
        <div className='flex w-full justify-between text-sm text-muted-foreground'>
          <div className='font-medium'>
            Tổng số lượt đăng ký: <span className='text-foreground'>{totalEnrollments}</span>
          </div>
          <div className='font-medium'>
            Trung bình: <span className='text-foreground'>{averageEnrollments}/ngày</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
