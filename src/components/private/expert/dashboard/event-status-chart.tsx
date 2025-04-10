import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'

interface EventStatusData {
  name: string
  count: number
  percentage: number
}

interface EventStatusChartProps {
  data: EventStatusData[]
  title: string
  description: string
}

export function EventStatusChart({ data, title, description }: EventStatusChartProps) {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className='text-base'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='px-2'>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={data} layout='vertical' margin={{ top: 15, right: 25, bottom: 5, left: 20 }}>
              <CartesianGrid strokeDasharray='3 3' horizontal={true} vertical={false} />
              <XAxis type='number' tickFormatter={(value) => `${value}`} />
              <YAxis type='category' dataKey='name' tick={{ fontSize: 12 }} width={100} />
              <Tooltip
                // eslint-disable-next-line no-unused-vars
                formatter={(value: number, name) => [value, 'Số lượng']}
                labelFormatter={(label) => `${label}`}
              />
              <Bar dataKey='count' fill='#8884d8' barSize={30} radius={[0, 4, 4, 0]}>
                <LabelList dataKey='count' position='right' style={{ fill: '#666', fontSize: 12 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
