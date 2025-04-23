import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'

interface EventStatusData {
  status: string
  count: number
}

interface EventStatusChartProps {
  data: EventStatusData[]
  title: string
  description: string
}

// Status translations
const statusTranslations: Record<string, string> = {
  COMPLETED: 'Đã kết thúc',
  ACTIVE: 'Đang diễn ra',
  UPCOMING: 'Sắp diễn ra',
  CANCELLED: 'Đã hủy'
}

export function EventStatusChart({ data, title, description }: EventStatusChartProps) {
  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + Number(item.count), 0)

  // Transform data for the bar chart with translations
  const transformedData = data.map((item) => ({
    name: statusTranslations[item.status] || item.status,
    count: Number(item.count),
    percentage: Number(((Number(item.count) / total) * 100).toFixed(1))
  }))

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className='text-base'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='px-2'>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={transformedData} margin={{ top: 15, right: 25, bottom: 30, left: 20 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' tick={{ fontSize: 12 }} tickMargin={10} />
              <YAxis tickFormatter={(value) => `${value}`} />
              <Tooltip
                formatter={(value: number, name) => [
                  name === 'count' ? value : `${value}%`,
                  name === 'count' ? 'Số lượng' : 'Phần trăm'
                ]}
                labelFormatter={(label) => `${label}`}
              />
              <Bar dataKey='count' name='' barSize={40} radius={[4, 4, 0, 0]} fill='#8b5cf6'>
                <LabelList dataKey='count' position='top' style={{ fill: '#666', fontSize: 12 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
