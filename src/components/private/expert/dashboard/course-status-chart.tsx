import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { formatPercentage } from '@/lib/utils'

interface CourseStatusData {
  status: string
  count: number | string
}

interface CourseStatusChartProps {
  data: CourseStatusData[]
  title: string
  description: string
  colors: Record<string, string>
}

export function CourseStatusChart({ data, title, description, colors }: CourseStatusChartProps) {
  // Total count for percentage calculation
  const total = data.reduce((sum, item) => sum + Number(item.count), 0)

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }: {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return percent > 0.05 ? (
      <text x={x} y={y} fill='white' textAnchor='middle' dominantBaseline='central'>
        {formatPercentage(percent)}
      </text>
    ) : null
  }

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className='text-base'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='px-2'>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill='#8884d8'
                dataKey='count'
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.status] || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} (${formatPercentage(value / total)})`, 'Số lượng']} />
              <Legend
                formatter={(value) => <span className='text-sm'>{value}</span>}
                layout='horizontal'
                verticalAlign='bottom'
                align='center'
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
