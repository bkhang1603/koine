'use client'

import { useState, use } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, AlertCircle, BookOpen, Settings, LayoutDashboard, Users } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useGetChildAccountById } from '@/queries/useAccount'
import { CourseCard } from '@/components/child-account/CourseCard'
import { EmptyCourses } from '@/components/child-account/EmptyCourses'
import Loading from '@/components/loading'
import { ProfileSection } from '@/components/child-account/sections/ProfileSection'
import { ProgressBar } from '@/components/child-account/stats/ProgressBar'
import { SidebarItem } from '@/components/child-account/sidebar/SidebarItem'
import { DashboardStats } from '@/components/child-account/stats/DashboardStats'
import { AccountHeader } from '@/components/child-account/AccountHeader'
import { SettingsSection } from '@/components/child-account/sections/SettingsSection'

export default function ChildAccountDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { data, isLoading, error } = useGetChildAccountById(params.id)
  const childData = data?.payload?.data

  const { toast } = useToast()
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [hideAllCourses, setHideAllCourses] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')

  // Các courses dùng để hiển thị
  const courses = childData?.courses || []

  // Handler để toggle visibility của một khóa học
  // eslint-disable-next-line no-unused-vars
  const toggleCourseVisibility = (courseId: string) => {
    toast({
      title: 'Đã cập nhật trạng thái',
      description: 'Thay đổi sẽ được áp dụng cho tài khoản con của bạn'
    })
  }

  // Handler để ẩn/hiện tất cả khóa học
  const toggleAllCourses = (hide: boolean) => {
    setHideAllCourses(hide)
    toast({
      title: hide ? 'Đã ẩn tất cả khóa học' : 'Đã hiện tất cả khóa học',
      description: 'Thay đổi sẽ được áp dụng cho tài khoản con của bạn'
    })
  }

  // Handler để báo cáo vấn đề
  const handleSubmitReport = () => {
    if (!reportReason.trim()) {
      toast({
        title: 'Chưa nhập nội dung',
        description: 'Vui lòng mô tả vấn đề bạn gặp phải',
        variant: 'destructive'
      })
      return
    }

    toast({
      title: 'Đã gửi báo cáo',
      description: 'Chúng tôi sẽ xem xét vấn đề của bạn trong thời gian sớm nhất'
    })
    setShowReportDialog(false)
    setReportReason('')
  }

  // Tính toán số liệu thống kê
  const getStats = () => {
    const totalCourses = courses.length
    const completedCourses = courses.filter((c) => (c.completionRate || 0) === 100).length
    const inProgressCourses = courses.filter((c) => (c.completionRate || 0) < 100 && (c.completionRate || 0) > 0).length
    const notStartedCourses = courses.filter((c) => (c.completionRate || 0) === 0).length

    const overallProgress = totalCourses
      ? Math.round(courses.reduce((acc, c) => acc + (c.completionRate || 0), 0) / totalCourses)
      : 0

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      notStartedCourses,
      overallProgress,
      completionPercentage: totalCourses ? Math.round((completedCourses / totalCourses) * 100) : 0
    }
  }

  // Hiển thị loading khi đang tải dữ liệu
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <Loading />
      </div>
    )
  }

  // Hiển thị lỗi nếu có
  if (error || !childData) {
    return (
      <div className='p-8 text-center'>
        <AlertCircle className='h-12 w-12 text-red-500 mx-auto mb-4' />
        <h3 className='text-lg font-medium text-gray-900 mb-2'>Không thể tải thông tin</h3>
        <p className='text-gray-500 mb-4'>Đã có lỗi xảy ra khi tải thông tin tài khoản con.</p>
        <Button asChild>
          <Link href='/setting/child-account'>Quay lại danh sách</Link>
        </Button>
      </div>
    )
  }

  const stats = getStats()

  return (
    <div className='bg-gray-50'>
      {/* Header with back button */}
      <div className='bg-white border-b border-gray-200 sticky top-0'>
        <div className='container mx-auto px-4 py-3 flex items-center'>
          <Button variant='ghost' className='mr-2' asChild>
            <Link href='/setting/child-account'>
              <ArrowLeft className='h-4 w-4 mr-1' />
              Quay lại
            </Link>
          </Button>
          <h1 className='text-xl font-semibold'>Quản lý tài khoản con</h1>
        </div>
      </div>

      <main className='container mx-auto px-4 py-6'>
        {/* Account Header */}
        <AccountHeader childData={childData} onReportClick={() => setShowReportDialog(true)} />

        {/* Main Content */}
        <div className='mt-6 flex flex-col md:flex-row gap-6'>
          {/* Sidebar */}
          <div className='w-full md:w-64 bg-white p-4 rounded-lg shadow-sm'>
            <div className='space-y-1'>
              <SidebarItem
                icon={LayoutDashboard}
                label='Tổng quan'
                active={activeView === 'dashboard'}
                onClick={() => setActiveView('dashboard')}
              />
              <SidebarItem
                icon={BookOpen}
                label='Khóa học'
                active={activeView === 'courses'}
                onClick={() => setActiveView('courses')}
              />
              <SidebarItem
                icon={Users}
                label='Thông tin cá nhân'
                active={activeView === 'profile'}
                onClick={() => setActiveView('profile')}
              />
              <SidebarItem
                icon={Settings}
                label='Cài đặt'
                active={activeView === 'settings'}
                onClick={() => setActiveView('settings')}
              />
            </div>
          </div>

          {/* Content Area */}
          <div className='flex-1'>
            {/* Dashboard View */}
            {activeView === 'dashboard' && (
              <div className='space-y-6'>
                <DashboardStats stats={stats} />

                <Card className='border-none shadow-sm'>
                  <CardHeader className='pb-2'>
                    <CardTitle>Tổng quan khóa học</CardTitle>
                    <CardDescription>Tiến độ học tập của {childData.firstName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-8'>
                      <div className='flex flex-col space-y-3'>
                        <ProgressBar
                          value={stats.overallProgress}
                          label='Tiến độ học tập tổng thể'
                          color='bg-primary'
                        />
                        <ProgressBar value={stats.completionPercentage} label='Tỉ lệ hoàn thành' color='bg-green-500' />
                      </div>

                      {courses.length === 0 ? (
                        <div className='text-center py-6'>
                          <BookOpen className='h-12 w-12 text-gray-300 mx-auto mb-3' />
                          <h3 className='text-lg font-medium text-gray-700 mb-1'>Chưa có khóa học nào</h3>
                          <p className='text-gray-500'>Tài khoản này chưa được đăng ký khóa học nào</p>
                        </div>
                      ) : (
                        <div className='space-y-4'>
                          <h3 className='font-medium text-gray-800'>Khóa học gần đây</h3>
                          <div className='grid gap-4'>
                            {courses.slice(0, 2).map((course) => (
                              <CourseCard
                                key={course.id}
                                courses={course}
                                onToggleVisibility={toggleCourseVisibility}
                              />
                            ))}
                            {courses.length > 2 && (
                              <div className='text-center pt-2'>
                                <Button variant='outline' onClick={() => setActiveView('courses')}>
                                  Xem tất cả {courses.length} khóa học
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Courses View */}
            {activeView === 'courses' && (
              <div className='space-y-6'>
                <Card className='border-none shadow-sm'>
                  <CardHeader className='pb-2'>
                    <CardTitle>Danh sách khóa học</CardTitle>
                    <CardDescription>
                      {courses.length ? `${courses.length} khóa học đã đăng ký` : 'Chưa có khóa học nào được đăng ký'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {courses.length === 0 ? (
                        <EmptyCourses />
                      ) : (
                        courses.map((course) => (
                          <CourseCard key={course.id} courses={course} onToggleVisibility={toggleCourseVisibility} />
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Profile View */}
            {activeView === 'profile' && <ProfileSection childData={childData} />}

            {/* Settings View */}
            {activeView === 'settings' && (
              <SettingsSection
                hideAllCourses={hideAllCourses}
                toggleAllCourses={toggleAllCourses}
                childName={childData.firstName}
              />
            )}
          </div>
        </div>
      </main>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Báo cáo vấn đề</DialogTitle>
            <DialogDescription>Vui lòng mô tả chi tiết vấn đề bạn gặp phải với tài khoản này</DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <Textarea
              placeholder='Mô tả vấn đề...'
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className='min-h-[120px]'
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
