'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Settings, AlertCircle, FileText, Clock, Star, Trophy, ChevronRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data
export const MOCK_ACCOUNT = {
  id: '1',
  name: 'Nguyễn Văn An',
  email: 'nguyenvanan@gmail.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  totalStudyTime: 2160, // 36 hours
  totalCourses: 5,
  averageScore: 8.5,
  completedCourses: 3,
  currentCourses: [
    {
      id: 1,
      title: 'Khóa học lập trình Python cơ bản',
      progress: 75,
      lastAccessed: new Date('2024-01-15'),
      thumbnail: '/python-course.jpg',
      totalLessons: 24,
      completedLessons: 18
    },
    {
      id: 2,
      title: 'Khóa học tiếng Anh giao tiếp',
      progress: 45,
      lastAccessed: new Date('2024-01-20'),
      thumbnail: '/english-course.jpg',
      totalLessons: 30,
      completedLessons: 14
    }
  ],
  recentActivities: [
    {
      id: 1,
      type: 'lesson_completed',
      description: 'Hoàn thành bài học "Biến và kiểu dữ liệu" trong khóa Python',
      date: new Date('2024-01-21'),
      course: 'Khóa học lập trình Python cơ bản'
    },
    {
      id: 2,
      type: 'quiz_completed',
      description: 'Đạt điểm 9/10 trong bài kiểm tra "Present Simple"',
      date: new Date('2024-01-20'),
      course: 'Khóa học tiếng Anh giao tiếp'
    }
  ],
  achievements: [
    {
      id: 1,
      title: 'Siêu sao học tập',
      description: 'Hoàn thành 3 khóa học',
      icon: '🌟',
      date: new Date('2024-01-15')
    },
    {
      id: 2,
      title: 'Chăm chỉ',
      description: 'Học tập 30 ngày liên tiếp',
      icon: '🔥',
      date: new Date('2024-01-10')
    }
  ],
  weeklyStudyTime: [
    { day: 'T2', hours: 2 },
    { day: 'T3', hours: 1.5 },
    { day: 'T4', hours: 3 },
    { day: 'T5', hours: 2 },
    { day: 'T6', hours: 2.5 },
    { day: 'T7', hours: 4 },
    { day: 'CN', hours: 1 }
  ]
}

export default function OverviewPage() {
  const [account] = useState(MOCK_ACCOUNT)

  return (
    <div className='grid gap-6'>
      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card className='bg-gradient-to-br from-primary/5 to-primary/10'>
          <CardContent className='pt-4'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm text-gray-500'>Khóa học đang học</p>
                <p className='text-2xl font-bold mt-1'>{account.currentCourses.length}</p>
                <p className='text-xs text-gray-500 mt-1'>+2 khóa học mới trong tháng</p>
              </div>
              <div className='p-2 bg-primary/10 rounded-lg'>
                <BookOpen className='w-5 h-5 text-primary' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-gradient-to-br from-green-50 to-green-100/50'>
          <CardContent className='pt-4'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm text-gray-500'>Thời gian học</p>
                <p className='text-2xl font-bold mt-1'>36h</p>
                <p className='text-xs text-green-600 mt-1'>↑ 12% so với tuần trước</p>
              </div>
              <div className='p-2 bg-green-500/10 rounded-lg'>
                <Clock className='w-5 h-5 text-green-600' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-gradient-to-br from-orange-50 to-orange-100/50'>
          <CardContent className='pt-4'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm text-gray-500'>Điểm trung bình</p>
                <p className='text-2xl font-bold mt-1'>{account.averageScore}</p>
                <p className='text-xs text-orange-600 mt-1'>Top 10% học viên</p>
              </div>
              <div className='p-2 bg-orange-500/10 rounded-lg'>
                <Star className='w-5 h-5 text-orange-500' fill='currentColor' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-gradient-to-br from-blue-50 to-blue-100/50'>
          <CardContent className='pt-4'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm text-gray-500'>Thành tích</p>
                <p className='text-2xl font-bold mt-1'>{account.achievements.length}</p>
                <p className='text-xs text-blue-600 mt-1'>Đạt được trong tháng</p>
              </div>
              <div className='p-2 bg-blue-500/10 rounded-lg'>
                <Trophy className='w-5 h-5 text-blue-600' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column - Course Progress */}
        <div className='lg:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Khóa học đang theo dõi</CardTitle>
                <Select defaultValue='all'>
                  <SelectTrigger className='w-[150px]'>
                    <SelectValue placeholder='Sắp xếp theo' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Tất cả</SelectItem>
                    <SelectItem value='progress'>Tiến độ</SelectItem>
                    <SelectItem value='recent'>Gần đây</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              {account.currentCourses.map((course) => (
                <div key={course.id} className='p-4 bg-gray-50 rounded-lg space-y-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center'>
                        <BookOpen className='w-6 h-6 text-primary' />
                      </div>
                      <div>
                        <h3 className='font-medium'>{course.title}</h3>
                        <p className='text-sm text-gray-500'>
                          {course.completedLessons} / {course.totalLessons} bài học
                        </p>
                      </div>
                    </div>
                    <Badge variant={course.progress >= 70 ? 'green' : 'default'}>{course.progress}% hoàn thành</Badge>
                  </div>
                  <Progress value={course.progress} className='h-2' />
                  <div className='flex items-center justify-between text-sm text-gray-500'>
                    <span>Cập nhật {course.lastAccessed.toLocaleDateString()}</span>
                    <Button variant='ghost' size='sm'>
                      Chi tiết
                      <ChevronRight className='w-4 h-4 ml-1' />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Learning Chart */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Thời gian học tập</CardTitle>
                <Select defaultValue='week'>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Khoảng thời gian' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='week'>7 ngày qua</SelectItem>
                    <SelectItem value='month'>30 ngày qua</SelectItem>
                    <SelectItem value='year'>Năm nay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className='h-[300px] mt-4'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={account.weeklyStudyTime}>
                    <CartesianGrid strokeDasharray='3 3' vertical={false} />
                    <XAxis dataKey='day' />
                    <YAxis unit='h' />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className='rounded-lg border bg-background p-2 shadow-sm'>
                              <div className='grid grid-cols-2 gap-2'>
                                <div className='flex flex-col'>
                                  <span className='text-[0.70rem] uppercase text-muted-foreground'>Thời gian học</span>
                                  <span className='font-bold text-muted-foreground'>{payload[0].value}h</span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey='hours' fill='currentColor' className='fill-primary/60' radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activities & Achievements */}
        <div className='space-y-6'>
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Hoạt động gần đây</CardTitle>
                <Select defaultValue='all'>
                  <SelectTrigger className='w-[150px]'>
                    <SelectValue placeholder='Loại hoạt động' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Tất cả</SelectItem>
                    <SelectItem value='lesson'>Bài học</SelectItem>
                    <SelectItem value='quiz'>Kiểm tra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                {account.recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className='flex gap-4 items-start rounded-lg p-3 transition-colors hover:bg-muted/50'
                  >
                    <div className='rounded-full p-2 bg-primary/10'>
                      {activity.type === 'lesson_completed' ? (
                        <BookOpen className='w-4 h-4 text-primary' />
                      ) : (
                        <Star className='w-4 h-4 text-primary' fill='currentColor' />
                      )}
                    </div>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center justify-between'>
                        <p className='text-sm font-medium leading-none'>{activity.course}</p>
                        <time className='text-xs text-muted-foreground'>{formatTimeAgo(activity.date)}</time>
                      </div>
                      <p className='text-sm text-muted-foreground'>{activity.description}</p>
                      {activity.type === 'quiz_completed' && (
                        <div className='flex items-center gap-2 mt-2'>
                          <div className='text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full'>
                            Điểm số: 9/10
                          </div>
                          <div className='text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full'>Top 5%</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant='outline' className='w-full' size='sm'>
                  Xem tất cả hoạt động
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Thành tích</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {account.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className='flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg'
                  >
                    <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl'>
                      {achievement.icon}
                    </div>
                    <div>
                      <p className='font-medium'>{achievement.title}</p>
                      <p className='text-sm text-gray-500'>{achievement.description}</p>
                      <time className='text-xs text-gray-400 mt-1 block'>{achievement.date.toLocaleDateString()}</time>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <Button variant='outline' className='w-full justify-start'>
                  <FileText className='w-4 h-4 mr-2' />
                  Xuất báo cáo học tập
                </Button>
                <Button variant='outline' className='w-full justify-start'>
                  <Settings className='w-4 h-4 mr-2' />
                  Cài đặt tài khoản
                </Button>
                <Button variant='outline' className='w-full justify-start text-red-500 hover:text-red-600'>
                  <AlertCircle className='w-4 h-4 mr-2' />
                  Báo cáo vấn đề
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Thêm helper function để format thời gian
const formatTimeAgo = (date: Date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours} giờ trước`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `${days} ngày trước`
  }
}
