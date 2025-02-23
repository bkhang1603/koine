'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Star, Plus, MessageSquare, Eye, Clock, FileText, Users } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const quickStats = [
  {
    title: 'Tổng bài viết',
    value: '24',
    trend: '+4 tuần này',
    icon: FileText,
    color: 'blue'
  },
  {
    title: 'Tổng khóa học',
    value: '8',
    trend: '+1 tuần này',
    icon: BookOpen,
    color: 'purple'
  },
  {
    title: 'Bình luận mới',
    value: '18',
    trend: '12 chưa đọc',
    icon: MessageSquare,
    color: 'green'
  },
  {
    title: 'Đánh giá trung bình',
    value: '4.8',
    trend: '142 đánh giá',
    icon: Star,
    color: 'yellow'
  }
]

const contentPerformance = [
  { name: 'T2', blog: 240, course: 180 },
  { name: 'T3', blog: 300, course: 200 },
  { name: 'T4', blog: 280, course: 250 },
  { name: 'T5', blog: 350, course: 280 },
  { name: 'T6', blog: 400, course: 300 },
  { name: 'T7', blog: 380, course: 320 },
  { name: 'CN', blog: 420, course: 380 }
]

const popularContent = [
  {
    title: 'Kỹ năng tự bảo vệ bản thân',
    type: 'Khóa học',
    views: 1234,
    engagement: 85,
    ageGroup: '9-11 tuổi'
  },
  {
    title: 'An toàn trên mạng xã hội',
    type: 'Blog',
    views: 856,
    engagement: 92,
    ageGroup: '12-14 tuổi'
  },
  {
    title: 'Giới tính và sự phát triển',
    type: 'Khóa học',
    views: 654,
    engagement: 78,
    ageGroup: '12-14 tuổi'
  }
]

const recentActivities = [
  {
    type: 'comment',
    title: 'Bình luận mới',
    message: 'Phụ huynh Nguyễn Văn A đã bình luận về bài viết "An toàn trên mạng"',
    time: '5 phút trước'
  },
  {
    type: 'review',
    title: 'Đánh giá khóa học',
    message: 'Khóa học "Giới tính và sự phát triển" nhận được đánh giá 5 sao',
    time: '30 phút trước'
  },
  {
    type: 'alert',
    title: 'Nội dung cần duyệt',
    message: 'Có 3 bình luận mới đang chờ được duyệt',
    time: '1 giờ trước'
  }
]

export default function DashboardPage() {
  return (
    <div className='container mx-auto px-4 py-6 space-y-8'>
      {/* Quick Actions */}
      <div className='flex flex-wrap gap-4'>
        <Button className='flex items-center gap-2' asChild>
          <a href='/content-creator/blog/new'>
            <FileText className='w-4 h-4' />
            Tạo bài viết
          </a>
        </Button>
        <Button className='flex items-center gap-2' asChild>
          <a href='/content-creator/course/new'>
            <BookOpen className='w-4 h-4' />
            Tạo khóa học
          </a>
        </Button>
        <Button variant='outline' className='flex items-center gap-2' asChild>
          <a href='/content-creator/comments'>
            <MessageSquare className='w-4 h-4' />
            Quản lý bình luận
          </a>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>{stat.title}</p>
                  <h3 className='text-2xl font-bold mt-2'>{stat.value}</h3>
                  <p className='text-xs text-muted-foreground mt-1'>{stat.trend}</p>
                </div>
                <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Performance */}
      <div className='grid gap-4 md:grid-cols-7'>
        <Card className='md:col-span-4'>
          <CardHeader>
            <CardTitle>Lượt xem theo thời gian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={contentPerformance}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Line type='monotone' dataKey='blog' stroke='#2563eb' strokeWidth={2} name='Blog' />
                  <Line type='monotone' dataKey='course' stroke='#7c3aed' strokeWidth={2} name='Khóa học' />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className='md:col-span-3'>
          <CardHeader>
            <CardTitle>Nội dung nổi bật</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              {popularContent.map((content, i) => (
                <div key={i} className='space-y-2'>
                  <div className='flex items-start justify-between'>
                    <div className='space-y-1'>
                      <p className='font-medium line-clamp-1'>{content.title}</p>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <span className='bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs'>
                          {content.type}
                        </span>
                        <span className='text-xs'>{content.ageGroup}</span>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <Eye className='w-4 h-4' />
                      {content.views}
                    </div>
                  </div>
                  <Progress value={content.engagement} className='h-2' />
                  <p className='text-xs text-muted-foreground text-right'>{content.engagement}% tương tác</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Age Groups */}
      <div className='grid gap-4 md:grid-cols-7'>
        <Card className='md:col-span-4'>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentActivities.map((activity, i) => (
                <div key={i} className='flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors'>
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === 'comment'
                        ? 'bg-blue-100 text-blue-500'
                        : activity.type === 'review'
                          ? 'bg-yellow-100 text-yellow-500'
                          : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {activity.type === 'comment' ? (
                      <MessageSquare className='w-4 h-4' />
                    ) : activity.type === 'review' ? (
                      <Star className='w-4 h-4' />
                    ) : (
                      <Clock className='w-4 h-4' />
                    )}
                  </div>
                  <div>
                    <p className='font-medium'>{activity.title}</p>
                    <p className='text-sm text-muted-foreground mt-1'>{activity.message}</p>
                    <p className='text-xs text-muted-foreground mt-1'>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className='md:col-span-3'>
          <CardHeader>
            <CardTitle>Phân bố độ tuổi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              {[
                { age: '6-8 tuổi', percentage: 25, count: 1250 },
                { age: '9-11 tuổi', percentage: 45, count: 2250 },
                { age: '12-14 tuổi', percentage: 30, count: 1500 }
              ].map((group, i) => (
                <div key={i} className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='flex items-center gap-2'>
                      <Users className='w-4 h-4' />
                      {group.age}
                    </span>
                    <span className='font-medium'>{group.count} người xem</span>
                  </div>
                  <Progress value={group.percentage} className='h-2' />
                  <p className='text-xs text-muted-foreground text-right'>{group.percentage}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
