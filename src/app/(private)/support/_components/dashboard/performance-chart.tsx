import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface PerformanceChartProps {
  data: any[]
  title: string
  description: string
  period: string
}

export function PerformanceChart({ data, title, description, period }: PerformanceChartProps) {
  return (
    <Card>
      <CardHeader className='pb-0'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button variant='outline' size='sm'>
            {period}
            <ChevronDown className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='h-[300px] mt-4'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={data}>
              <defs>
                <linearGradient id='colorTickets' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#2563eb' stopOpacity={0.1} />
                  <stop offset='95%' stopColor='#2563eb' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' className='stroke-muted/30' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))'
                }}
              />
              <Line
                type='monotone'
                dataKey='tickets'
                name='Tickets'
                stroke='#2563eb'
                strokeWidth={2}
                dot={false}
                fill='url(#colorTickets)'
              />
              <Line type='monotone' dataKey='resolved' name='Đã xử lý' stroke='#16a34a' strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
