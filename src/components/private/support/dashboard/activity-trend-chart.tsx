import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface ActivityTrendData {
  date: string
  courseComments: number
  blogComments: number
  productReviews: number
}

interface ActivityTrendChartProps {
  data: ActivityTrendData[]
  title: string
  description: string
}

// Custom tooltip to show all values
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white p-3 border rounded-md shadow-md'>
        <p className='font-medium text-sm'>{label}</p>
        <div className='space-y-1 mt-1.5'>
          {payload.map((entry: any, index: number) => (
            <div key={index} className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full' style={{ backgroundColor: entry.color }} />
              <span className='text-xs'>
                {entry.name}: <span className='font-semibold'>{entry.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function ActivityTrendChart({ data, title, description }: ActivityTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[350px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 30
              }}
            >
              <CartesianGrid strokeDasharray='3 3' className='stroke-muted/30' />
              <XAxis dataKey='date' tick={{ fontSize: 12 }} tickMargin={10} angle={-45} textAnchor='end' height={60} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend layout='horizontal' verticalAlign='top' align='center' wrapperStyle={{ paddingBottom: '15px' }} />
              <Line
                type='monotone'
                dataKey='courseComments'
                name='Bình luận khóa học'
                stroke='#3b82f6'
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type='monotone'
                dataKey='blogComments'
                name='Bình luận bài viết'
                stroke='#8b5cf6'
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type='monotone'
                dataKey='productReviews'
                name='Đánh giá sản phẩm'
                stroke='#22c55e'
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
