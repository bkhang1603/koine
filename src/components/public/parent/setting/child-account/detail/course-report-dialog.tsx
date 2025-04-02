import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClipboardList, Clock, CalendarDays, BookOpen, BookOpenCheck, BarChart } from 'lucide-react'

interface CourseReportProps {
  courseId: string
  courseTitle: string
  childName: string
  completionRate: number
  stats: {
    lessonsCompleted: number
    totalLessons: number
    timeSpent: string
    lastAccessed: string
    startDate: string
  }
}

export function CourseReportDialog({ courseTitle, childName, completionRate, stats }: CourseReportProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='sm' className='w-full'>
          <BarChart className='h-4 w-4 mr-2' />
          Xem báo cáo học tập
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[700px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Báo cáo học tập: {courseTitle}</DialogTitle>
          <DialogDescription>
            Theo dõi tiến độ học tập của <span className='font-medium'>{childName}</span> trong khóa học này
          </DialogDescription>
        </DialogHeader>

        <div className='mt-4 space-y-6'>
          {/* Progress Overview */}
          <Card className='p-5'>
            <h3 className='font-medium text-lg mb-3 flex items-center'>
              <ClipboardList className='h-5 w-5 mr-2 text-primary' />
              Tổng quan tiến độ
            </h3>

            <div className='mt-4 space-y-2'>
              <div className='flex justify-between mb-1'>
                <span className='text-sm'>Tiến độ hoàn thành</span>
                <span className='font-medium'>{completionRate}%</span>
              </div>
              <Progress value={completionRate} className='h-2' />
            </div>

            <div className='grid grid-cols-2 gap-4 mt-6'>
              <div className='flex items-start'>
                <BookOpen className='h-5 w-5 mr-2 text-gray-500' />
                <div>
                  <p className='text-sm font-medium'>Hoàn thành</p>
                  <p className='text-lg font-bold text-primary'>
                    {stats.lessonsCompleted}/{stats.totalLessons}
                  </p>
                  <p className='text-xs text-gray-500'>bài học</p>
                </div>
              </div>

              <div className='flex items-start'>
                <Clock className='h-5 w-5 mr-2 text-gray-500' />
                <div>
                  <p className='text-sm font-medium'>Thời gian học</p>
                  <p className='text-lg font-bold text-primary'>{stats.timeSpent}</p>
                  <p className='text-xs text-gray-500'>tổng thời gian</p>
                </div>
              </div>

              <div className='flex items-start'>
                <CalendarDays className='h-5 w-5 mr-2 text-gray-500' />
                <div>
                  <p className='text-sm font-medium'>Bắt đầu học</p>
                  <p className='text-base font-medium'>{stats.startDate}</p>
                </div>
              </div>

              <div className='flex items-start'>
                <BookOpenCheck className='h-5 w-5 mr-2 text-gray-500' />
                <div>
                  <p className='text-sm font-medium'>Truy cập gần nhất</p>
                  <p className='text-base font-medium'>{stats.lastAccessed}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Detailed Report */}
          <Tabs defaultValue='lessons'>
            <TabsList className='w-full grid grid-cols-2'>
              <TabsTrigger value='lessons'>Chi tiết bài học</TabsTrigger>
              <TabsTrigger value='activity'>Hoạt động gần đây</TabsTrigger>
            </TabsList>

            <TabsContent value='lessons' className='mt-4'>
              <Card className='p-5'>
                <h3 className='font-medium text-lg mb-3'>Danh sách bài học</h3>
                <div className='space-y-3'>
                  {/* Placeholder for lesson list - will be populated from API */}
                  {[1, 2, 3].map((index) => (
                    <div key={index} className='border-b pb-3 last:border-0'>
                      <div className='flex justify-between'>
                        <div>
                          <h4 className='font-medium'>Bài {index}: Tên bài học</h4>
                          <p className='text-sm text-gray-500'>Thời lượng: 20 phút</p>
                        </div>
                        <div className='text-right'>
                          <span className='inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800'>
                            Đã hoàn thành
                          </span>
                          <p className='text-xs text-gray-500 mt-1'>02/05/2023</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value='activity' className='mt-4'>
              <Card className='p-5'>
                <h3 className='font-medium text-lg mb-3'>Lịch sử học tập</h3>
                <div className='space-y-4'>
                  {/* Placeholder for activity list - will be populated from API */}
                  {[1, 2, 3].map((index) => (
                    <div key={index} className='flex gap-3 border-b pb-4 last:border-0'>
                      <div className='h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0'>
                        <BookOpen className='h-4 w-4 text-blue-500' />
                      </div>
                      <div>
                        <p className='font-medium'>Học bài {index}: Tên bài học</p>
                        <p className='text-sm text-gray-500'>3 ngày trước • 15 phút</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
