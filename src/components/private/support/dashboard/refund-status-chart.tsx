import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
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

// Default status values to ensure we always display all statuses even if they're zero
const DEFAULT_STATUSES = [
  { name: 'Chờ duyệt', value: 0, color: '#f59e0b' },
  { name: 'Đang xử lý', value: 0, color: '#3b82f6' },
  { name: 'Đã hoàn tiền', value: 0, color: '#22c55e' },
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

  // Add any additional statuses from the data that aren't in our defaults
  data.forEach((item) => {
    if (!mergedData.some((d) => d.name === item.name)) {
      mergedData.push(item)
    }
  })

  // Calculate total for percentage
  const total = mergedData.reduce((sum, item) => sum + item.value, 0)

  // Prepare data with percentages for display
  const displayData = mergedData.map((item) => ({
    ...item,
    percentage: total > 0 ? (item.value / total) * 100 : 0
  }))

  const PieChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value, percentage } = payload[0].payload
      return (
        <div className='bg-white p-3 border rounded-md shadow-sm'>
          <p className='mb-1 font-medium text-gray-900'>{name}</p>
          <p className='text-sm text-gray-700'>
            <span className='font-medium'>Số lượng:</span> {value}
          </p>
          <p className='text-sm text-gray-700'>
            <span className='font-medium'>Tỷ lệ:</span> {formatPercentage(percentage / 100)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className='h-full'>
      <CardHeader className='pb-2'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col h-[400px]'>
          {/* Status counts summary */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 mx-auto w-full'>
            {displayData.map((item, index) => (
              <div
                key={index}
                className='flex flex-col rounded-md p-1.5 transition-all hover:shadow-sm w-full'
                style={{
                  backgroundColor: `${item.color}10`,
                  borderLeft: `3px solid ${item.color}`
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <div className='min-w-2 h-2 rounded-full' style={{ backgroundColor: item.color }} />
                  <span className='text-xs font-medium truncate' title={item.name}>
                    {item.name}
                  </span>
                </div>
                <div className='flex justify-between items-center mt-0.5 px-1'>
                  <span className='text-lg font-bold'>{item.value}</span>
                  <span className='text-xs text-gray-500'>{formatPercentage(item.percentage / 100)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pie chart */}
          <div className='flex-1 min-h-0'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={
                    displayData.filter((item) => item.value > 0).length > 0
                      ? displayData.filter((item) => item.value > 0)
                      : [{ name: 'Không có dữ liệu', value: 1, color: '#e5e7eb', percentage: 100 }]
                  }
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  nameKey='name'
                  dataKey='value'
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  stroke='#fff'
                  strokeWidth={2}
                >
                  {(displayData.filter((item) => item.value > 0).length > 0
                    ? displayData.filter((item) => item.value > 0)
                    : [{ name: 'Không có dữ liệu', value: 1, color: '#e5e7eb', percentage: 100 }]
                  ).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))' }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieChartTooltip />} />
                <Legend
                  layout='horizontal'
                  verticalAlign='bottom'
                  align='center'
                  formatter={(value, entry, index) => <span className='text-xs font-medium'>{value}</span>}
                  wrapperStyle={{ paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
