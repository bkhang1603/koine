import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { formatPercentage } from '@/lib/utils'

interface RefundStatusData {
  name: string
  value: number
  color: string
}

interface RefundStatusChartProps {
  data: RefundStatusData[]
  title: string
  description: string
}

// Only the three main statuses
const DEFAULT_STATUSES = [
  { name: 'Chờ duyệt', value: 0, color: '#f59e0b' },
  { name: 'Đã duyệt', value: 0, color: '#22c55e' },
  { name: 'Từ chối', value: 0, color: '#ef4444' }
]

export function RefundStatusChart({ data, title, description }: RefundStatusChartProps) {
  // Ensure all default statuses are included even if count is zero
  let mergedData = [...DEFAULT_STATUSES]

  // Map the incoming data by name for easy lookup
  const dataMap = new Map(data.map((item) => [item.name, item]))

  // Update values for existing statuses in our merged data
  mergedData = mergedData.map((item) => ({
    ...item,
    value: dataMap.has(item.name) ? dataMap.get(item.name)!.value : 0,
    color: dataMap.has(item.name) ? dataMap.get(item.name)!.color : item.color
  }))

  // Calculate total for percentage
  const total = mergedData.reduce((sum, item) => sum + item.value, 0)

  // Prepare data with percentages for display
  const displayData = mergedData.map((item) => ({
    ...item,
    percentage: total > 0 ? (item.value / total) * 100 : 0
  }))

  // Empty state message
  const hasData = total > 0
  const emptyStateData = [{ name: 'Không có dữ liệu', value: 1, color: '#e5e7eb', percentage: 100 }]

  return (
    <Card className='h-full'>
      <CardHeader className='pb-2'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Left side: Pie chart */}
          <div className='flex items-center justify-center h-[250px] relative'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={hasData ? displayData : emptyStateData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  nameKey='name'
                  dataKey='value'
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  stroke='#fff'
                  strokeWidth={2}
                >
                  {(hasData ? displayData : emptyStateData).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))' }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className='bg-white p-3 border rounded-md shadow-sm'>
                          <p className='font-medium'>{data.name}</p>
                          <p className='text-sm'>
                            {data.value} ({formatPercentage(data.percentage / 100)})
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {!hasData && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <p className='text-sm text-gray-400'>Không có dữ liệu</p>
              </div>
            )}
          </div>

          {/* Right side: Status cards */}
          <div className='flex flex-col justify-center space-y-4'>
            {displayData.map((item, index) => (
              <div
                key={index}
                className='flex justify-between items-center p-4 rounded-md'
                style={{ backgroundColor: `${item.color}10` }}
              >
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 rounded-full' style={{ backgroundColor: item.color }}></div>
                  <span className='font-medium'>{item.name}</span>
                </div>
                <div className='flex items-center gap-4'>
                  <span className='text-lg font-bold'>{item.value}</span>
                  <span className='text-sm text-gray-500'>{formatPercentage(item.percentage / 100)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
