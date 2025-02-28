'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, BookOpen, Clock, AlertCircle, Check, Award } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface ActivatedCourse {
  id: number
  title: string
  thumbnail: string
  progress: number
  totalLessons: number
  completedLessons: number
  lastAccessed: string
  isVisible: boolean
  category: string
  activatedDate: string
  expiryDate: string
}

interface LearningActivity {
  id: number
  type: 'course_start' | 'course_complete' | 'lesson_complete' | 'quiz_complete'
  title: string
  courseName?: string
  timestamp: string
  score?: number
}

export default function ChildAccountDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [hideAllCourses, setHideAllCourses] = useState(false)

  // State cho danh sách khóa học
  const [activatedCourses, setActivatedCourses] = useState<ActivatedCourse[]>([
    {
      id: 1,
      title: 'Khóa học lập trình Python cơ bản',
      thumbnail: '/placeholder.svg',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      lastAccessed: '2 giờ trước',
      isVisible: true,
      category: 'Lập trình',
      activatedDate: '15/03/2024',
      expiryDate: '15/03/2025'
    },
    {
      id: 2,
      title: 'Khóa học tiếng Anh giao tiếp',
      thumbnail: '/placeholder.svg',
      progress: 45,
      totalLessons: 30,
      completedLessons: 14,
      lastAccessed: '1 ngày trước',
      isVisible: false,
      category: 'Ngoại ngữ',
      activatedDate: '10/03/2024',
      expiryDate: '10/03/2025'
    }
  ])

  // Thêm state cho learning history
  const [learningHistory] = useState<LearningActivity[]>([
    {
      id: 1,
      type: 'course_start',
      title: 'Bắt đầu khóa học',
      courseName: 'Khóa học lập trình Python cơ bản',
      timestamp: '20/03/2024 09:30'
    },
    {
      id: 2,
      type: 'lesson_complete',
      title: 'Hoàn thành bài học: Biến và kiểu dữ liệu',
      courseName: 'Khóa học lập trình Python cơ bản',
      timestamp: '20/03/2024 10:15'
    },
    {
      id: 3,
      type: 'quiz_complete',
      title: 'Hoàn thành bài kiểm tra',
      courseName: 'Khóa học lập trình Python cơ bản',
      timestamp: '20/03/2024 10:45',
      score: 85
    }
  ])

  // Add account state after other states
  const [account] = useState({
    id: params.id,
    username: 'anna2024',
    avatar: '/avatars/01.png',
    lastActive: '5 phút trước'
  })

  // Handler để toggle visibility của một khóa học
  const toggleCourseVisibility = (courseId: number) => {
    setActivatedCourses((courses) =>
      courses.map((course) => (course.id === courseId ? { ...course, isVisible: !course.isVisible } : course))
    )

    toast({
      title: 'Đã cập nhật trạng thái',
      description: 'Thay đổi sẽ được áp dụng cho tài khoản con của bạn'
    })
  }

  // Handler để ẩn/hiện tất cả khóa học
  const toggleAllCourses = (hide: boolean) => {
    setHideAllCourses(hide)
    setActivatedCourses((courses) => courses.map((course) => ({ ...course, isVisible: !hide })))

    toast({
      title: hide ? 'Đã ẩn tất cả khóa học' : 'Đã hiện tất cả khóa học',
      description: 'Thay đổi sẽ được áp dụng cho tài khoản con của bạn'
    })
  }

  // Handler để gửi báo cáo
  const handleSubmitReport = () => {
    if (!reportReason.trim()) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập lý do báo cáo',
        variant: 'destructive'
      })
      return
    }

    // Gửi báo cáo lên server
    toast({
      title: 'Đã gửi báo cáo',
      description: 'Chúng tôi sẽ xem xét và phản hồi sớm nhất'
    })
    setShowReportDialog(false)
    setReportReason('')
  }

  return (
    <div className='space-y-6'>
      {/* Back Button */}
      <div>
        <Button variant='ghost' size='sm' asChild className='mb-6'>
          <Link href='/setting/child-account' className='flex items-center gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Quay lại danh sách
          </Link>
        </Button>

        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-10 w-10 border-2 border-primary/10'>
              <AvatarImage src={account.avatar} alt={account.username} />
              <AvatarFallback>{account.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className='text-lg font-semibold'>{account.username}</h3>
              <p className='text-sm text-gray-500'>Hoạt động: {account.lastActive}</p>
            </div>
          </div>
          <Button
            variant='outline'
            size='sm'
            className='text-red-500 hover:text-red-600 hover:bg-red-50'
            onClick={() => setShowReportDialog(true)}
          >
            <AlertCircle className='w-4 h-4 mr-2' />
            Báo cáo vấn đề
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue='activated-courses' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='activated-courses'>Khóa học đã kích hoạt</TabsTrigger>
          <TabsTrigger value='learning-history'>Lịch sử học tập</TabsTrigger>
          <TabsTrigger value='settings'>Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value='activated-courses'>
          <div className='space-y-6'>
            {/* Course Management */}
            {activatedCourses.map((course) => (
              <Card key={course.id} className='overflow-hidden border-none shadow-md'>
                <CardContent className='p-6'>
                  <div className='flex gap-6'>
                    {/* Course Thumbnail */}
                    <div className='relative w-48 h-32 rounded-lg overflow-hidden shrink-0'>
                      <Image src={course.thumbnail} alt={course.title} fill className='object-cover' />
                    </div>

                    {/* Course Info */}
                    <div className='flex-1 min-w-0 space-y-4'>
                      <div className='flex items-start justify-between'>
                        <div>
                          <h4 className='font-medium text-gray-900'>{course.title}</h4>
                          <div className='flex items-center gap-3 mt-1'>
                            <Badge variant='secondary' className='bg-primary/5 text-primary'>
                              {course.category}
                            </Badge>
                            <span className='text-sm text-gray-500'>Kích hoạt: {course.activatedDate}</span>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Switch
                            checked={course.isVisible}
                            onCheckedChange={() => toggleCourseVisibility(course.id)}
                            className='data-[state=checked]:bg-primary'
                          />
                          <span className='text-sm text-gray-600'>{course.isVisible ? 'Hiện' : 'Ẩn'}</span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className='space-y-2'>
                        <div className='flex items-center justify-between text-sm'>
                          <div className='flex items-center gap-4'>
                            <span className='text-gray-600'>Tiến độ học tập</span>
                            <span className='text-primary font-medium'>{course.progress}%</span>
                          </div>
                          <span className='text-gray-500'>
                            {course.completedLessons}/{course.totalLessons} bài học
                          </span>
                        </div>
                        <Progress value={course.progress} className='h-2' />
                      </div>

                      {/* Stats */}
                      <div className='flex items-center gap-6 pt-2'>
                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                          <Clock className='w-4 h-4' />
                          <span>Học gần nhất: {course.lastAccessed}</span>
                        </div>
                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                          <BookOpen className='w-4 h-4' />
                          <span>Hết hạn: {course.expiryDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value='learning-history'>
          <Card className='border-none shadow-md'>
            <CardHeader>
              <CardTitle>Lịch sử học tập</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                {learningHistory.map((activity) => (
                  <div key={activity.id} className='flex gap-4 items-start'>
                    <div className='w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0'>
                      {activity.type === 'course_start' && <BookOpen className='w-4 h-4 text-primary' />}
                      {activity.type === 'lesson_complete' && <Check className='w-4 h-4 text-green-600' />}
                      {activity.type === 'quiz_complete' && <Award className='w-4 h-4 text-yellow-600' />}
                    </div>
                    <div className='flex-1 space-y-1'>
                      <p className='text-sm font-medium text-gray-900'>{activity.title}</p>
                      {activity.courseName && <p className='text-sm text-gray-500'>{activity.courseName}</p>}
                      {activity.score && <p className='text-sm text-gray-500'>Điểm số: {activity.score}/100</p>}
                      <p className='text-xs text-gray-400'>{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='settings'>
          <Card className='border-none shadow-md'>
            <CardHeader>
              <CardTitle>Cài đặt tài khoản</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <h4 className='font-medium'>Quyền truy cập khóa học</h4>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between py-3 border-b'>
                    <div className='space-y-0.5'>
                      <p className='text-sm font-medium'>Ẩn tất cả khóa học</p>
                      <p className='text-sm text-gray-500'>Tạm thời ẩn tất cả khóa học đã kích hoạt</p>
                    </div>
                    <Switch
                      checked={hideAllCourses}
                      onCheckedChange={toggleAllCourses}
                      className='data-[state=checked]:bg-primary'
                    />
                  </div>
                  <div className='flex items-center justify-between py-3 border-b'>
                    <div className='space-y-0.5'>
                      <p className='text-sm font-medium'>Tự động ẩn khóa học đã hoàn thành</p>
                      <p className='text-sm text-gray-500'>Ẩn khóa học sau khi hoàn thành tất cả bài học</p>
                    </div>
                    <Switch className='data-[state=checked]:bg-primary' />
                  </div>
                  <div className='flex items-center justify-between py-3 border-b'>
                    <div className='space-y-0.5'>
                      <p className='text-sm font-medium'>Giới hạn thời gian học</p>
                      <p className='text-sm text-gray-500'>Chỉ cho phép truy cập trong khung giờ quy định</p>
                    </div>
                    <Switch className='data-[state=checked]:bg-primary' />
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h4 className='font-medium'>Thông báo</h4>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between py-3 border-b'>
                    <div className='space-y-0.5'>
                      <p className='text-sm font-medium'>Thông báo tiến độ học tập</p>
                      <p className='text-sm text-gray-500'>Nhận thông báo khi con hoàn thành bài học</p>
                    </div>
                    <Switch className='data-[state=checked]:bg-primary' defaultChecked />
                  </div>
                  <div className='flex items-center justify-between py-3 border-b'>
                    <div className='space-y-0.5'>
                      <p className='text-sm font-medium'>Cảnh báo không hoạt động</p>
                      <p className='text-sm text-gray-500'>Thông báo khi tài khoản không hoạt động trong 7 ngày</p>
                    </div>
                    <Switch className='data-[state=checked]:bg-primary' defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Báo cáo vấn đề</DialogTitle>
            <DialogDescription>Vui lòng mô tả chi tiết vấn đề bạn gặp phải với tài khoản này</DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <textarea
              className='w-full min-h-[100px] p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20'
              placeholder='Mô tả vấn đề...'
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setShowReportDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleSubmitReport}>Gửi báo cáo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
