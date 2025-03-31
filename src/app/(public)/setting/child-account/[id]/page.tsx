'use client'

import { use, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetChildAccountById } from '@/queries/useAccount'
import { courseByChildTabs } from '@/lib/constants'
import { ArrowLeft, CalendarDays, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { ProfileHeader } from '@/components/public/parent/setting/child-account/detail/profile-header'
import { DashboardStats } from '@/components/public/parent/setting/child-account/stats/dashboard-stats'
import { CourseCardList } from '@/components/public/parent/setting/child-account/detail/course-card-list'
import { EmptyCourses } from '@/components/public/parent/setting/child-account/detail/empty-courses'
import { ProfileSkeleton } from '@/components/public/parent/setting/child-account/detail/profile-skeleton'
import { SettingBreadcrumb } from '@/components/public/parent/setting/SettingBreadcrumb'
import configRoute from '@/config/route'

export default function ChildAccountDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const childId = params.id as string
  const [activeTab, setActiveTab] = useState('all')

  const { data, isLoading } = useGetChildAccountById(childId)
  const childAccount = data?.payload.data

  // Tính toán các thống kê cho dashboard
  const calculateStats = () => {
    if (!childAccount)
      return {
        totalCourses: 0,
        completedCourses: 0,
        inProgressCourses: 0,
        notStartedCourses: 0,
        overallProgress: 0,
        completionPercentage: 0
      }

    const totalCourses = childAccount.courses.length
    const completedCourses = childAccount.courses.filter((c) => c.completionRate === 100).length
    const inProgressCourses = childAccount.courses.filter((c) => c.completionRate > 0 && c.completionRate < 100).length
    const notStartedCourses = childAccount.courses.filter((c) => c.completionRate === 0).length

    const overallProgress =
      totalCourses > 0
        ? Math.round(childAccount.courses.reduce((sum, course) => sum + course.completionRate, 0) / totalCourses)
        : 0

    const completionPercentage = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      notStartedCourses,
      overallProgress,
      completionPercentage
    }
  }

  // Lọc khóa học dựa vào tab đang active
  const getFilteredCourses = () => {
    if (!childAccount) return []

    switch (activeTab) {
      case 'completed':
        return childAccount.courses.filter((course) => course.completionRate === 100)
      case 'in-progress':
        return childAccount.courses.filter((course) => course.completionRate > 0 && course.completionRate < 100)
      case 'not-started':
        return childAccount.courses.filter((course) => course.completionRate === 0)
      default:
        return childAccount.courses
    }
  }

  const childAccountBreadcrumbItems = [
    { label: 'Tài khoản con', href: configRoute.setting.childAccount },
    { label: childAccount?.firstName + ' ' + childAccount?.lastName, isCurrent: true }
  ]

  return (
    <div className='space-y-8'>
      {/* Back Button và Page Header */}
      {/* <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
        <Link href='/setting/child-account'>
          <Button variant='outline' size='sm' className='gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Quay lại danh sách
          </Button>
        </Link>
      </div> */}
      <SettingBreadcrumb
        isLoading={isLoading}
        items={childAccountBreadcrumbItems}
        backButton={
          <Link href={configRoute.setting.childAccount}>
            <Button variant='outline' size='sm' className='gap-2'>
              <ArrowLeft className='h-4 w-4' />
              Quay lại danh sách
            </Button>
          </Link>
        }
      />

      {/* Loading State */}
      {isLoading ? (
        <ProfileSkeleton />
      ) : childAccount ? (
        <>
          {/* Phần thông tin profile với thiết kế mới */}
          <ProfileHeader
            profile={{
              userId: childAccount.userId,
              username: childAccount.username,
              fullName: `${childAccount.firstName} ${childAccount.lastName}`,
              avatarUrl: childAccount.avatarUrl,
              metadata: [
                {
                  icon: <UserCircle className='h-4 w-4 text-gray-500' />,
                  label: childAccount.gender === 'MALE' ? 'Nam' : 'Nữ'
                },
                {
                  icon: <CalendarDays className='h-4 w-4 text-gray-500' />,
                  label: childAccount.dob
                }
              ]
            }}
          />

          {/* Dashboard Stats */}
          <div className='mt-8'>
            <h3 className='text-lg font-medium mb-4'>Tổng quan tiến độ học tập</h3>
            <DashboardStats stats={calculateStats()} />
          </div>

          {/* Tabs Khóa học */}
          <div className='mt-8'>
            <Tabs defaultValue='all' value={activeTab} onValueChange={setActiveTab} className='w-full'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-medium'>Khóa học đã đăng ký</h3>
                <TabsList className='bg-gray-100/80'>
                  {courseByChildTabs.map((tab: any) => (
                    <TabsTrigger key={tab.value} value={tab.value} className='data-[state=active]:bg-white'>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {courseByChildTabs.map((tab: any) => (
                <TabsContent key={tab.value} value={tab.value} className='mt-0'>
                  <CourseCardList
                    courses={getFilteredCourses()}
                    emptyState={
                      <EmptyCourses
                        title={`Không có khóa học nào ${tab.emptyText}`}
                        description='Hãy khám phá các khóa học phù hợp và thêm vào danh sách học tập của trẻ.'
                      />
                    }
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className='p-8 flex flex-col items-center justify-center text-center'>
            <div className='h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center mb-4'>
              <UserCircle className='h-8 w-8 text-amber-500' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Không tìm thấy tài khoản con</h3>
            <p className='text-gray-500 max-w-md mb-6'>
              Không thể tìm thấy thông tin tài khoản con này. Tài khoản có thể đã bị xóa hoặc bạn không có quyền truy
              cập.
            </p>
            <Button asChild>
              <Link href='/setting/child-account'>Quay lại danh sách tài khoản</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
