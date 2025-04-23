'use client'

import { useEffect, useMemo, useState } from 'react'
import { formatPercentage, getDateRangeFromType, parseUrlDate, getValidRangeType, RangeType } from '@/lib/utils'
import { BookOpen, Users, Calendar, Video, GraduationCap, Award } from 'lucide-react'
import { DateRangePicker } from '@/components/private/common/dashboard/date-range-picker'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { StatsCard } from '@/components/private/expert/dashboard/stats-card'
import { CourseStatusChart } from '@/components/private/expert/dashboard/course-status-chart'
import { EventStatusChart } from '@/components/private/expert/dashboard/event-status-chart'
import { CourseTrendChart } from '@/components/private/expert/dashboard/course-trend-chart'
import { EventTrendChart } from '@/components/private/expert/dashboard/event-trend-chart'
import { DashboardSkeleton } from '@/components/private/expert/dashboard/dashboard-skeleton'
import { useRouter, useSearchParams } from 'next/navigation'

// Import mock data
import { statsData, courseTrendData, eventTrendData, courseStatusData, eventStatusData } from './dashboard-mock-data'

function ExpertDashboard() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Initial data states (simulate loading data)
  const [isLoading, setIsLoading] = useState(true)

  // Get from/to dates from URL or use default 3-month range
  const fromParam = searchParams.get('from')
  const toParam = searchParams.get('to')
  const rangeTypeParam = searchParams.get('range_type') as RangeType | null

  // Validate range type from URL or use default
  const validRangeType = useMemo(() => getValidRangeType(rangeTypeParam || '3_MONTH'), [rangeTypeParam])

  // Parse URL date params or get default date range
  const parsedDateRange = useMemo(() => {
    if (fromParam && toParam) {
      const fromDate = parseUrlDate(fromParam)
      const toDate = parseUrlDate(toParam)

      if (fromDate && toDate) {
        return { from: fromDate, to: toDate }
      }
    }

    return getDateRangeFromType(validRangeType)
  }, [fromParam, toParam, validRangeType])

  // Local state for the date range
  const [dateRange, setDateRange] = useState<DateRange | undefined>(parsedDateRange)

  useEffect(() => {
    // Simulate API call loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Update URL when date range changes
  const handleDateRangeChange = (range: DateRange | undefined, rangeType: RangeType) => {
    if (!range?.from || !range?.to) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('from', format(range.from, 'yyyy-MM-dd'))
    params.set('to', format(range.to, 'yyyy-MM-dd'))
    params.set('range_type', rangeType)

    router.push(`?${params.toString()}`)
  }

  // Handle date range change from DateRangePicker
  const onDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range)
  }

  // Handle range type change
  const onRangeTypeChange = (rangeType: RangeType) => {
    if (dateRange?.from && dateRange?.to) {
      handleDateRangeChange(dateRange, rangeType)
    }
  }

  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-6'>
        <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>
        <DashboardSkeleton />
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header with Date Range Picker */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>Thống kê</h1>
          <p className='text-muted-foreground'>Khóa học và sự kiện của bạn</p>
        </div>
        <DateRangePicker
          value={dateRange}
          onChange={onDateRangeChange}
          onRangeTypeChange={onRangeTypeChange}
          initialSelectedOption={validRangeType}
          className='w-full md:w-auto'
        />
      </div>

      {/* Course Stats Cards */}
      <div>
        <h2 className='text-lg font-semibold mb-3'>Khóa học</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <StatsCard
            title='Tổng khóa học'
            value={statsData.totalCourses}
            description='Khóa học đã tạo'
            icon={BookOpen}
            iconColor='text-blue-600'
            iconBgColor='bg-blue-100'
          />
          <StatsCard
            title='Khóa học đang hoạt động'
            value={statsData.activeCourses}
            description={`${formatPercentage(statsData.activeCourses / statsData.totalCourses)} khóa học`}
            icon={GraduationCap}
            iconColor='text-green-600'
            iconBgColor='bg-green-100'
          />
          <StatsCard
            title='Tổng số học viên'
            value={statsData.coursesEnrollments}
            description='Đã đăng ký khóa học'
            icon={Users}
            iconColor='text-indigo-600'
            iconBgColor='bg-indigo-100'
          />
          <StatsCard
            title='Đánh giá trung bình'
            value={statsData.courseAverageRating}
            description='Dựa trên tất cả khóa học'
            icon={Award}
            iconColor='text-amber-600'
            iconBgColor='bg-amber-100'
          />
        </div>
      </div>

      {/* Course Charts */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <CourseTrendChart
          data={courseTrendData}
          title='Xu hướng khóa học'
          description='Số lượng khóa học tạo mới và lượt đăng ký theo thời gian'
        />
        <CourseStatusChart
          data={courseStatusData}
          title='Trạng thái khóa học'
          description='Phân bố trạng thái các khóa học'
        />
      </div>

      {/* Event Stats Cards */}
      <div>
        <h2 className='text-lg font-semibold mb-3'>Sự kiện</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <StatsCard
            title='Tổng sự kiện'
            value={statsData.totalEvents}
            description='Sự kiện đã tạo'
            icon={Calendar}
            iconColor='text-purple-600'
            iconBgColor='bg-purple-100'
          />
          <StatsCard
            title='Sự kiện sắp tới'
            value={statsData.activeEvents}
            description={`Sự kiện`}
            icon={Video}
            iconColor='text-amber-600'
            iconBgColor='bg-amber-100'
          />
          <StatsCard
            title='Tổng số người tham gia'
            value={statsData.eventParticipants}
            description='Đã tham gia sự kiện'
            icon={Users}
            iconColor='text-indigo-600'
            iconBgColor='bg-indigo-100'
          />
          <StatsCard
            title='Đánh giá trung bình'
            value={statsData.eventAverageRating}
            description='Dựa trên tất cả sự kiện'
            icon={Award}
            iconColor='text-amber-600'
            iconBgColor='bg-amber-100'
          />
        </div>
      </div>

      {/* Event Charts */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <EventTrendChart
          data={eventTrendData}
          title='Xu hướng sự kiện'
          description='Số lượng sự kiện diễn ra và người tham gia theo thời gian'
        />
        <EventStatusChart
          data={eventStatusData}
          title='Trạng thái sự kiện'
          description='Phân bố trạng thái các sự kiện'
        />
      </div>
    </div>
  )
}

export default ExpertDashboard
