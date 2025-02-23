'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { FileText, Target, BookOpen, Star, Clock } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts'
import { MOCK_ACCOUNT } from '../page'
import { Badge } from '@/components/ui/badge'

export default function ReportsPage() {
  const [account] = useState(MOCK_ACCOUNT)

  return (
    <div className='space-y-6'>
      {/* Report Controls */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Select defaultValue='week'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Khoảng thời gian' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='week'>Tuần này</SelectItem>
              <SelectItem value='month'>Tháng này</SelectItem>
              <SelectItem value='quarter'>3 tháng gần đây</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue='all'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Khóa học' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả khóa học</SelectItem>
              {account.currentCourses.map((course) => (
                <SelectItem key={course.id} value={course.id.toString()}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant='outline'>
          <FileText className='w-4 h-4 mr-2' />
          Tải báo cáo PDF
        </Button>
      </div>

      {/* Learning Progress Overview */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardContent className='pt-4'>
            <div className='flex justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Tổng thời gian học</p>
                <p className='text-2xl font-bold mt-1'>36h 45m</p>
                <p className='text-xs text-green-600 mt-1'>↑ 15% so với kỳ trước</p>
              </div>
              <div className='p-2 bg-primary/10 rounded-lg'>
                <Clock className='w-5 h-5 text-primary' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-4'>
            <div className='flex justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Bài học đã hoàn thành</p>
                <p className='text-2xl font-bold mt-1'>32/45</p>
                <p className='text-xs text-green-600 mt-1'>71% hoàn thành</p>
              </div>
              <div className='p-2 bg-green-500/10 rounded-lg'>
                <BookOpen className='w-5 h-5 text-green-600' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-4'>
            <div className='flex justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Điểm trung bình</p>
                <p className='text-2xl font-bold mt-1'>8.5/10</p>
                <p className='text-xs text-orange-600 mt-1'>Top 15% học viên</p>
              </div>
              <div className='p-2 bg-orange-500/10 rounded-lg'>
                <Star className='w-5 h-5 text-orange-600' fill='currentColor' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-4'>
            <div className='flex justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Độ tập trung</p>
                <p className='text-2xl font-bold mt-1'>85%</p>
                <p className='text-xs text-blue-600 mt-1'>Rất tốt</p>
              </div>
              <div className='p-2 bg-blue-500/10 rounded-lg'>
                <Target className='w-5 h-5 text-blue-600' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Learning Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố thời gian học</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Bài giảng video', value: 45, color: '#2563eb' },
                      { name: 'Bài tập thực hành', value: 30, color: '#16a34a' },
                      { name: 'Kiểm tra', value: 15, color: '#ea580c' },
                      { name: 'Tài liệu', value: 10, color: '#6366f1' }
                    ]}
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey='value'
                  >
                    {[
                      { name: 'Bài giảng video', value: 45, color: '#2563eb' },
                      { name: 'Bài tập thực hành', value: 30, color: '#16a34a' },
                      { name: 'Kiểm tra', value: 15, color: '#ea580c' },
                      { name: 'Tài liệu', value: 10, color: '#6366f1' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign='bottom' height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Xu hướng điểm số</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart
                  data={[
                    { name: 'T2', score: 7.5 },
                    { name: 'T3', score: 8.0 },
                    { name: 'T4', score: 7.8 },
                    { name: 'T5', score: 8.5 },
                    { name: 'T6', score: 9.0 },
                    { name: 'T7', score: 8.7 },
                    { name: 'CN', score: 9.2 }
                  ]}
                >
                  <CartesianGrid strokeDasharray='3 3' vertical={false} />
                  <XAxis dataKey='name' />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line type='monotone' dataKey='score' stroke='#2563eb' strokeWidth={2} dot={{ fill: '#2563eb' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress Details */}
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết tiến độ khóa học</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {account.currentCourses.map((course) => (
              <div key={course.id} className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='font-medium'>{course.title}</h4>
                    <p className='text-sm text-gray-500'>
                      {course.completedLessons}/{course.totalLessons} bài học • Cập nhật{' '}
                      {course.lastAccessed.toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={course.progress >= 70 ? 'green' : 'default'}>{course.progress}% hoàn thành</Badge>
                </div>
                <Progress value={course.progress} className='h-2' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
