import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { BookText, MessageSquare, Star } from 'lucide-react'

interface ContentDistributionProps {
  data: {
    name: string
    value: number
    color: string
  }[]
  title: string
  description: string
}

// Custom label for pie chart
const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      className='text-xs font-medium'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function ContentDistributionChart({ data, title, description }: ContentDistributionProps) {
  // Get total value of all items
  const totalCount = data.reduce((sum, item) => sum + item.value, 0)

  // Get individual values
  const courseComments = data.find((item) => item.name === 'Khóa học')?.value || 0
  const blogComments = data.find((item) => item.name === 'Bài viết')?.value || 0
  const productReviews = data.find((item) => item.name === 'Sản phẩm')?.value || 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Pie Chart */}
          <div className='lg:col-span-2'>
            <div className='h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={data}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={110}
                    fill='#8884d8'
                    dataKey='value'
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value} bình luận`, null]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Cards - Now in a grid with 2 columns for better layout */}
          <div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-5'>
            <div className='flex items-center space-x-4'>
              <div className='p-3 rounded-full' style={{ backgroundColor: data[0].color + '20' }}>
                <BookText className='h-5 w-5' style={{ color: data[0].color }} />
              </div>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Khóa học</p>
                <div className='flex items-baseline gap-2'>
                  <p className='text-2xl font-bold'>{courseComments}</p>
                  <p className='text-sm text-muted-foreground'>({Math.round((courseComments / totalCount) * 100)}%)</p>
                </div>
              </div>
            </div>

            <div className='flex items-center space-x-4'>
              <div className='p-3 rounded-full' style={{ backgroundColor: data[1].color + '20' }}>
                <MessageSquare className='h-5 w-5' style={{ color: data[1].color }} />
              </div>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Bài viết</p>
                <div className='flex items-baseline gap-2'>
                  <p className='text-2xl font-bold'>{blogComments}</p>
                  <p className='text-sm text-muted-foreground'>({Math.round((blogComments / totalCount) * 100)}%)</p>
                </div>
              </div>
            </div>

            <div className='flex items-center space-x-4'>
              <div className='p-3 rounded-full' style={{ backgroundColor: data[2].color + '20' }}>
                <Star className='h-5 w-5' style={{ color: data[2].color }} />
              </div>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Sản phẩm</p>
                <div className='flex items-baseline gap-2'>
                  <p className='text-2xl font-bold'>{productReviews}</p>
                  <p className='text-sm text-muted-foreground'>({Math.round((productReviews / totalCount) * 100)}%)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
