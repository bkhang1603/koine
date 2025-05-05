import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { formatPercentage, formatOrderStatus } from '@/lib/utils'

interface OrderStatusData {
  status: string
  count: number | string
}

interface OrderStatusChartProps {
  data: OrderStatusData[]
  colors: {
    PROCESSING: string
    DELIVERING: string
    COMPLETED: string
    CANCELLED: string
    [key: string]: string // Allow other status types
  }
}

// Default status values to ensure we always display all statuses even if they're zero
const DEFAULT_STATUSES = [
  { status: 'PENDING', count: 0 },
  { status: 'PROCESSING', count: 0 },
  { status: 'DELIVERING', count: 0 },
  { status: 'DELIVERED', count: 0 },
  { status: 'COMPLETED', count: 0 },
  { status: 'CANCELLED', count: 0 },
  { status: 'FAILED', count: 0 },
  { status: 'FAILED_PAYMENT', count: 0 },
  { status: 'REFUND_REQUEST', count: 0 },
  { status: 'REFUNDING', count: 0 },
  { status: 'REFUNDED', count: 0 },
  { status: 'REFUND_FAILED', count: 0 },
  { status: 'EXCHANGE_REQUEST', count: 0 },
  { status: 'EXCHANGING', count: 0 },
  { status: 'EXCHANGED', count: 0 },
  { status: 'EXCHANGE_FAILED', count: 0 }
]

export function OrderStatusChart({ data, colors }: OrderStatusChartProps) {
  // Ensure all default statuses are included even if count is zero
  let mergedData = [...DEFAULT_STATUSES]

  // Map the incoming data by status for easy lookup
  const dataMap = new Map(
    data.map((item) => [
      item.status,
      typeof item.count === 'number' ? item.count : parseInt(item.count as string, 10) || 0
    ])
  )

  // Update counts for existing statuses in our merged data
  mergedData = mergedData.map((item) => ({
    ...item,
    count: dataMap.has(item.status) ? dataMap.get(item.status)! : 0
  }))

  // Add any additional statuses from the data that aren't in our defaults
  data.forEach((item) => {
    if (!mergedData.some((d) => d.status === item.status)) {
      mergedData.push({
        status: item.status,
        count: typeof item.count === 'number' ? item.count : parseInt(item.count as string, 10) || 0
      })
    }
  })

  // Calculate total for percentage
  const total = mergedData.reduce((sum, item) => sum + (typeof item.count === 'number' ? item.count : 0), 0)

  // Prepare data with Vietnamese status names for display
  const displayData = mergedData.map((item) => ({
    ...item,
    name: formatOrderStatus(item.status),
    value: typeof item.count === 'number' ? item.count : parseInt(item.count as string, 10) || 0,
    percentage:
      total > 0
        ? ((typeof item.count === 'number' ? item.count : parseInt(item.count as string, 10) || 0) / total) * 100
        : 0
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

  // Get a default color for status that don't have a predefined color
  const getStatusColor = (status: string) => {
    // Check if the status has a predefined color
    if (colors[status]) {
      return colors[status]
    }

    // Default colors for unknown statuses
    const defaultColors = ['#6366f1', '#f59e0b', '#06b6d4', '#ec4899', '#84cc16', '#8b5cf6']
    // Hash the status string to consistently get the same color for the same status
    const hash = status.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0)
    return defaultColors[hash % defaultColors.length]
  }

  return (
    <Card className='h-full'>
      <CardHeader className='pb-2'>
        <CardTitle>Trạng Thái Đơn Hàng</CardTitle>
        <CardDescription>Phân bố theo trạng thái đơn hàng</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col h-[400px]'>
          {/* Status counts summary */}
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mb-5 mx-auto w-full'>
            {displayData.slice(0, 6).map((item, index) => {
              // Only show the first 6 statuses
              const statusColor = getStatusColor(item.status)
              return (
                <div
                  key={index}
                  className='flex flex-col rounded-md p-1.5 transition-all hover:shadow-sm w-full'
                  style={{
                    backgroundColor: `${statusColor}10`,
                    borderLeft: `3px solid ${statusColor}`
                  }}
                >
                  <div className='flex items-center gap-1.5'>
                    <div className='min-w-2 h-2 rounded-full' style={{ backgroundColor: statusColor }} />
                    <span className='text-xs font-medium truncate' title={item.name}>
                      {item.name}
                    </span>
                  </div>
                  <div className='flex justify-between items-center mt-0.5 px-1'>
                    <span className='text-lg font-bold'>{item.value}</span>
                    <span className='text-xs text-gray-500'>{formatPercentage(item.percentage / 100)}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pie chart - always displayed */}
          <div className='flex-1 min-h-0'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={
                    displayData.filter((item) => item.value > 0).length > 0
                      ? displayData.filter((item) => item.value > 0)
                      : [{ name: 'Không có dữ liệu', value: 1, status: 'NO_DATA', percentage: 100 }]
                  } // Show placeholder if no data
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
                    : [{ name: 'Không có dữ liệu', value: 1, status: 'NO_DATA', percentage: 100 }]
                  ).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.status === 'NO_DATA' ? '#e5e7eb' : getStatusColor(entry.status)}
                      style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))' }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieChartTooltip />} />
                <Legend
                  layout='horizontal'
                  verticalAlign='bottom'
                  align='center'
                  // eslint-disable-next-line no-unused-vars
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
