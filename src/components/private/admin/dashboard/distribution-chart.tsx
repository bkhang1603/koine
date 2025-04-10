import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import { formatPercentage } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface DistributionData {
  name: string
  percentage: number
  count?: number
}

interface DistributionChartProps {
  title: string
  description: string
  data: DistributionData[]
  color: string
  icon: LucideIcon
  isVertical?: boolean
}

// Custom tooltip component for better display
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, percentage, count } = payload[0].payload

    return (
      <div className='bg-white p-3 border rounded shadow-sm'>
        <p className='font-medium mb-1'>{name}</p>
        <p className='text-sm text-gray-600'>
          <span className='font-medium'>Tỷ lệ:</span> {formatPercentage(percentage / 100, 0)}
        </p>
        {count !== undefined && (
          <p className='text-sm text-gray-600'>
            <span className='font-medium'>Số lượng:</span> {count.toLocaleString()}
          </p>
        )}
      </div>
    )
  }
  return null
}

// Custom formatter to ensure we don't pass NaN values
const safeNumberFormatter = (value: any) => {
  const numValue = Number(value)
  if (isNaN(numValue)) {
    return '0%'
  }
  return `${numValue}%`
}

// Safe formatter for label lists

export function DistributionChart({
  title,
  description,
  data,
  icon: Icon,
  isVertical = false
}: DistributionChartProps) {
  // Validate and clean data to prevent NaN errors
  const safeData = [...data].map((item) => ({
    ...item,
    percentage: typeof item.percentage === 'number' && !isNaN(item.percentage) ? item.percentage : 0,
    count:
      item.count !== undefined ? (typeof item.count === 'number' && !isNaN(item.count) ? item.count : 0) : undefined
  }))

  // Sort data by percentage in descending order for better visualization
  const sortedData = safeData.sort((a, b) => b.percentage - a.percentage)

  // Generate gradient ID using title to ensure uniqueness

  // Set chart colors based on isVertical
  const chartColor = isVertical
    ? '#3b82f6' // Blue for vertical bars
    : '#E67C44FF' // Amber for horizontal bars

  return (
    <Card className='h-full'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Icon className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent className='h-[380px]'>
        <ResponsiveContainer width='100%' height='100%'>
          {isVertical ? (
            // Vertical bar chart (Age distribution)
            <BarChart data={sortedData} margin={{ left: 10, right: 10, top: 20, bottom: 25 }} barGap={5}>
              <CartesianGrid vertical={false} stroke='#eee' />
              <XAxis dataKey='name' axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: '500' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey='percentage' fill='#2C7979' barSize={40} radius={[4, 4, 0, 0]}>
                <LabelList
                  dataKey='percentage'
                  position='top'
                  formatter={(value: number) => `${value}%`}
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#333' }}
                  offset={5}
                />
              </Bar>
            </BarChart>
          ) : (
            // Horizontal bar chart (Geographic distribution)
            <BarChart
              data={sortedData}
              layout='vertical'
              margin={{ left: 10, right: 40, top: 5, bottom: 5 }}
              barGap={5}
            >
              <CartesianGrid horizontal={false} stroke='#eee' />
              <XAxis
                type='number'
                tickFormatter={safeNumberFormatter}
                domain={[0, 36]}
                ticks={[0, 9, 18, 27, 36]}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type='category'
                dataKey='name'
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: '500' }}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey='percentage' fill={chartColor} barSize={20} radius={[0, 4, 4, 0]}>
                <LabelList
                  dataKey='percentage'
                  position='right'
                  formatter={(value: number) => `${value}%`}
                  style={{ fontSize: '12px', fontWeight: 'bold', fill: '#333' }}
                  offset={5}
                />
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
