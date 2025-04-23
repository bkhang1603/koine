'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import { Users } from 'lucide-react'

interface AgeGroup {
  group: string
  percentage: number
  count: number
}

interface AgeGroupsCardProps {
  data: AgeGroup[]
  title: string
  description?: string
}

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white p-3 border rounded shadow-sm'>
        <p className='font-medium'>{payload[0].payload.group}</p>
        <p className='text-sm'>{`${payload[0].value}% (${payload[0].payload.count} nội dung)`}</p>
      </div>
    )
  }
  return null
}

export function AgeGroupsCard({ data, title, description }: AgeGroupsCardProps) {
  // Sort data by percentage in descending order
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage)

  // Transform data for the chart
  const chartData = sortedData.map((item) => ({
    name: item.group,
    percentage: item.percentage,
    group: item.group,
    count: item.count
  }))

  return (
    <Card className='h-full'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Users className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent className='h-[380px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={chartData} margin={{ left: 10, right: 10, top: 20, bottom: 25 }} barGap={5}>
            <CartesianGrid vertical={false} stroke='#eee' />
            <XAxis dataKey='name' axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: '500' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey='percentage' fill='#8b5cf6' barSize={40} radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey='percentage'
                position='top'
                formatter={(value: number) => `${value}%`}
                style={{ fontSize: '12px', fontWeight: 'bold', fill: '#333' }}
                offset={5}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
