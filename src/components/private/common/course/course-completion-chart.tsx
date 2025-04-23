'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { InfoIcon } from 'lucide-react'

interface CourseCompletionChartProps {
  data: {
    milestone: string
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

export function CourseCompletionChart({ data }: CourseCompletionChartProps) {
  // Calculate total students
  const totalStudents = data.length > 0 ? data[0].count : 0

  // Calculate completion rate
  const completionRate = data.length > 0 ? ((data[data.length - 1].count / totalStudents) * 100).toFixed(1) : '0'

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>Tỷ lệ hoàn thành</CardTitle>
        <CardDescription>Số người hoàn thành theo từng mốc</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[300px] w-full'>
          {data.length > 0 ? (
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
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
                  dataKey='milestone'
                  tickLine={false}
                  axisLine={true}
                  tick={<CustomXAxisTick />}
                  height={60} // Increased height for x-axis
                />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} width={35} />
                <Tooltip
                  formatter={(value: number) => [`${value} người`, 'Số lượng']}
                  labelFormatter={(label) => `Mốc: ${label}`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px'
                  }}
                />
                <Bar dataKey='count' fill='#8b5cf6' radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className='flex h-full items-center justify-center'>
              <div className='flex flex-col items-center text-center text-muted-foreground'>
                <InfoIcon className='mb-2 h-10 w-10' />
                <h3 className='font-medium'>Không có dữ liệu</h3>
                <p className='text-sm'>Chưa có dữ liệu về tỷ lệ hoàn thành khóa học này</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className='border-t px-6 py-3'>
        <div className='flex w-full justify-between text-sm text-muted-foreground'>
          <div className='font-medium'>
            Tổng số học viên: <span className='text-foreground'>{totalStudents}</span>
          </div>
          <div className='font-medium'>
            Tỷ lệ hoàn thành: <span className='text-foreground'>{completionRate}%</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
