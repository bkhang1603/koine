import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface EventTrendData {
  date: string
  created: number
  completed: number
}

interface EventTrendChartProps {
  data: EventTrendData[]
  title: string
  description: string
}

export function EventTrendChart({ data, title, description }: EventTrendChartProps) {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className='text-base'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='px-2'>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' tick={{ fontSize: 12 }} tickMargin={10} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='created'
                name='Sự kiện tạo mới'
                stroke='#8b5cf6'
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type='monotone'
                dataKey='completed'
                name='Sự kiện đã kết thúc'
                stroke='#f59e0b'
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
