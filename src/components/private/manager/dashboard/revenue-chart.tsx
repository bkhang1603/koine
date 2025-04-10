import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import { formatCurrency, formatShortCurrency } from '@/lib/utils'

interface RevenueDataItem {
  date: string
  amount: number
  ordersCount: number
  isFilled?: boolean
}

interface RevenueChartProps {
  data: RevenueDataItem[]
  chartColors: {
    revenue: string
    orders: string
  }
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // Check if the label is a formatted date (YYYY-MM-DD), a week number, or a month name
    let formattedLabel = label

    if (/^\d{4}-\d{2}-\d{2}$/.test(label)) {
      // If it's a date in YYYY-MM-DD format, format it as DD/MM/YYYY
      const date = new Date(label)
      formattedLabel = format(date, 'dd/MM/yyyy')
    } else if (label.startsWith('Week ')) {
      // If it's a week, convert to Vietnamese
      formattedLabel = `Tuần ${label.replace('Week ', '')}`
    } else {
      // Map English month names to Vietnamese
      const monthMap: Record<string, string> = {
        JANUARY: 'Tháng 1',
        FEBRUARY: 'Tháng 2',
        MARCH: 'Tháng 3',
        APRIL: 'Tháng 4',
        MAY: 'Tháng 5',
        JUNE: 'Tháng 6',
        JULY: 'Tháng 7',
        AUGUST: 'Tháng 8',
        SEPTEMBER: 'Tháng 9',
        OCTOBER: 'Tháng 10',
        NOVEMBER: 'Tháng 11',
        DECEMBER: 'Tháng 12'
      }

      formattedLabel = monthMap[label] || label
    }

    return (
      <div className='custom-tooltip bg-white p-3 border border-gray-200 shadow-sm rounded-md'>
        <p className='font-medium text-gray-900 mb-1'>{formattedLabel}</p>
        <p className='text-sm text-gray-700 mb-1'>
          <span className='inline-block w-3 h-3 rounded-full mr-1' style={{ backgroundColor: payload[0].color }}></span>
          Doanh thu: {formatCurrency(payload[0].value)}
        </p>
        <p className='text-sm text-gray-700'>
          <span className='inline-block w-3 h-3 rounded-full mr-1' style={{ backgroundColor: payload[1].color }}></span>
          Số đơn: {payload[1].value}
        </p>
      </div>
    )
  }

  return null
}

export function RevenueChart({ data, chartColors }: RevenueChartProps) {
  // Determine data type (day, week, month) based on the format of the dates
  const determineDataType = () => {
    if (!data || data.length === 0) return 'day'

    const firstItem = data[0].date

    if (/^\d{4}-\d{2}-\d{2}$/.test(firstItem)) {
      return 'day'
    } else if (firstItem.startsWith('Week ')) {
      return 'week'
    } else if (
      [
        'JANUARY',
        'FEBRUARY',
        'MARCH',
        'APRIL',
        'MAY',
        'JUNE',
        'JULY',
        'AUGUST',
        'SEPTEMBER',
        'OCTOBER',
        'NOVEMBER',
        'DECEMBER'
      ].includes(firstItem)
    ) {
      return 'month'
    }

    return 'day' // default
  }

  const dataType = determineDataType()

  const getXAxisTickFormatter = () => {
    if (dataType === 'day') {
      return (dateStr: string) => {
        try {
          const date = new Date(dateStr)
          return format(date, 'dd/MM')
        } catch (e) {
          return dateStr
        }
      }
    } else if (dataType === 'week') {
      return (weekStr: string) => weekStr.replace('Week ', 'Tuần ')
    } else if (dataType === 'month') {
      // Map English month names to Vietnamese
      const monthMap: Record<string, string> = {
        JANUARY: 'Tháng 1',
        FEBRUARY: 'Tháng 2',
        MARCH: 'Tháng 3',
        APRIL: 'Tháng 4',
        MAY: 'Tháng 5',
        JUNE: 'Tháng 6',
        JULY: 'Tháng 7',
        AUGUST: 'Tháng 8',
        SEPTEMBER: 'Tháng 9',
        OCTOBER: 'Tháng 10',
        NOVEMBER: 'Tháng 11',
        DECEMBER: 'Tháng 12'
      }

      return (monthStr: string) => monthMap[monthStr] || monthStr
    }

    // Default formatter
    return (value: string) => value
  }

  const getXAxisTickInterval = () => {
    // For daily data, show every nth day based on date count
    if (dataType === 'day') {
      if (data.length <= 7) return 0
      if (data.length <= 14) return 1
      if (data.length <= 30) return 2
      return 6 // For longer periods
    }

    // For weekly data, show each week
    else if (dataType === 'week') {
      if (data.length <= 10) return 0
      if (data.length <= 20) return 1
      return 2
    }

    // For monthly data, show each month
    else if (dataType === 'month') {
      return 0 // Show all months
    }

    return 'preserveStart'
  }

  return (
    <Card className='lg:col-span-2 h-full'>
      <CardHeader>
        <CardTitle>Doanh Thu</CardTitle>
        <CardDescription>Biểu đồ doanh thu và số đơn hàng theo thời gian</CardDescription>
      </CardHeader>

      <CardContent className='h-[400px]'>
        <ResponsiveContainer width='100%' height={350}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray='3 3' stroke='#eee' vertical={false} />
            <XAxis
              dataKey='date'
              tickFormatter={getXAxisTickFormatter()}
              interval={getXAxisTickInterval()}
              minTickGap={5}
              height={60}
              tickMargin={25}
              angle={-45}
              textAnchor='end'
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
            />
            <YAxis
              yAxisId='left'
              tickFormatter={(value) => formatShortCurrency(value)}
              domain={['auto', 'auto']}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId='right'
              orientation='right'
              tickFormatter={(value) => `${value}`}
              domain={['auto', 'auto']}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign='bottom'
              height={40}
              wrapperStyle={{ bottom: 10, left: 25, paddingTop: '15px' }}
              formatter={(value) => {
                if (value === 'amount') return 'Doanh thu'
                if (value === 'ordersCount') return 'Số đơn'
                return value
              }}
            />

            <Line
              yAxisId='left'
              type='monotone'
              dataKey='amount'
              stroke={chartColors.revenue}
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 0, fill: chartColors.revenue }}
              dot={false}
              name='amount'
              connectNulls={true}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='ordersCount'
              stroke={chartColors.orders}
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 0, fill: chartColors.orders }}
              dot={false}
              name='ordersCount'
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
