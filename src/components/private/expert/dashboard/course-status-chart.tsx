import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import { formatPercentage } from '@/lib/utils'

interface CourseStatusData {
  status: string
  count: number | string
}

interface CourseStatusChartProps {
  data: CourseStatusData[]
  title: string
  description: string
}

// Status translations
const statusTranslations: Record<string, string> = {
  ACTIVE: 'Đang hoạt động',
  PENDINGREVIEW: 'Chờ duyệt',
  PENDINGPRICING: 'Chờ định giá',
  REJECTED: 'Đã từ chối'
}

export function CourseStatusChart({ data, title, description }: CourseStatusChartProps) {
  // Total count for percentage calculation
  const total = data.reduce((sum, item) => sum + Number(item.count), 0)

  // Transform data for the bar chart with translations
  const transformedData = data.map((item) => ({
    name: statusTranslations[item.status] || item.status,
    count: Number(item.count)
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
                formatter={(value: number) => [`${value} (${formatPercentage(value / total)})`, 'Số lượng']}
                labelFormatter={(label) => `${label}`}
              />
              <Bar dataKey='count' name='' barSize={40} radius={[4, 4, 0, 0]} fill='#3b82f6'>
                <LabelList dataKey='count' position='top' style={{ fill: '#666', fontSize: 12 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
