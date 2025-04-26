'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  formatPercentage,
  getDateRangeFromType,
  parseUrlDate,
  getValidRangeType,
  RangeType,
  formatDateForApi
} from '@/lib/utils'
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
import { useDashboardExpertStatisticsQuery } from '@/queries/useDashboard'

function ExpertDashboard() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // State to control client-side rendering
  const [isClient, setIsClient] = useState(false)

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

  // Initialize on client-side
  useEffect(() => {
    setIsClient(true)

    // If there are no URL parameters, set defaults and update URL
    if (!searchParams.has('range_type')) {
      const defaultRange = getDateRangeFromType('3_MONTH')
      setDateRange(defaultRange)
      updateUrlParams({
        range_type: '3_MONTH'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Function to update URL with new params
  const updateUrlParams = (params: { range_type?: RangeType; start_date?: string; end_date?: string }) => {
    const urlParams = new URLSearchParams(searchParams.toString())

    if (params.range_type) {
      urlParams.set('range_type', params.range_type)
    }

    if (params.start_date) {
      urlParams.set('start_date', params.start_date)
    } else if (params.range_type !== 'DAY') {
      urlParams.delete('start_date')
    }

    if (params.end_date) {
      urlParams.set('end_date', params.end_date)
    } else if (params.range_type !== 'DAY') {
      urlParams.delete('end_date')
    }

    router.push(`?${urlParams.toString()}`)
  }

  // Get formatted start and end dates for API
  const start_date = useMemo(() => formatDateForApi(dateRange?.from), [dateRange?.from])
  const end_date = useMemo(() => formatDateForApi(dateRange?.to), [dateRange?.to])

  // Fetch dashboard data from API
  const { data: dashboardData, isLoading } = useDashboardExpertStatisticsQuery({
    range_type: validRangeType,
    start_date,
    end_date
  })

  // Handler for date range changes
  const handleDateRangeChange = (newRange: DateRange | undefined) => {
    if (newRange?.from && newRange?.to) {
      setDateRange(newRange)

      // Update URL params for custom date range
      updateUrlParams({
        range_type: 'DAY',
        start_date: format(newRange.from, 'dd/MM/yyyy'),
        end_date: format(newRange.to, 'dd/MM/yyyy')
      })
    }
  }

  // Handler for range type changes
  const handleRangeTypeChange = (newRangeType: RangeType) => {
    // Update URL with new range type
    updateUrlParams({ range_type: newRangeType })

    // Also update date range state to match the new range type
    if (newRangeType !== 'DAY') {
      setDateRange(getDateRangeFromType(newRangeType))
    }
  }

  // Return a loading state until client-side rendering is ready or data is loading
  if (!isClient || isLoading) {
    return <DashboardSkeleton />
  }

  // Get statistics data from API response
  const { courseStatistic, eventStatistic, courseTrendData, eventTrendData, courseStatusData, eventStatusData } =
    dashboardData?.payload?.data || {
      courseStatistic: {
        totalCourses: 0,
        activeCourses: 0,
        coursesEnrollments: 0,
        courseAverageRating: 0
      },
      eventStatistic: {
        totalEvents: 0,
        activeEvents: 0,
        eventParticipants: 0,
        eventAverageRating: 0
      },
      courseTrendData: [],
      eventTrendData: [],
      courseStatusData: [],
      eventStatusData: []
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
          onChange={handleDateRangeChange}
          onRangeTypeChange={handleRangeTypeChange}
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
            value={courseStatistic.totalCourses}
            description='Khóa học đã tạo'
            icon={BookOpen}
            iconColor='text-blue-600'
            iconBgColor='bg-blue-100'
          />
          <StatsCard
            title='Khóa học đang hoạt động'
            value={courseStatistic.activeCourses}
            description={`${formatPercentage(courseStatistic.activeCourses / courseStatistic.totalCourses)} khóa học`}
            icon={GraduationCap}
            iconColor='text-green-600'
            iconBgColor='bg-green-100'
          />
          <StatsCard
            title='Tổng số học viên'
            value={courseStatistic.coursesEnrollments}
            description='Đã đăng ký khóa học'
            icon={Users}
            iconColor='text-indigo-600'
            iconBgColor='bg-indigo-100'
          />
          <StatsCard
            title='Đánh giá trung bình'
            value={courseStatistic.courseAverageRating}
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
          data={courseTrendData || []}
          title='Xu hướng khóa học'
          description='Số lượng khóa học tạo mới và lượt đăng ký theo thời gian'
        />
        <CourseStatusChart
          data={courseStatusData || []}
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
            value={eventStatistic.totalEvents}
            description='Sự kiện đã tạo'
            icon={Calendar}
            iconColor='text-purple-600'
            iconBgColor='bg-purple-100'
          />
          <StatsCard
            title='Sự kiện sắp tới'
            value={eventStatistic.activeEvents}
            description={`Sự kiện`}
            icon={Video}
            iconColor='text-amber-600'
            iconBgColor='bg-amber-100'
          />
          <StatsCard
            title='Tổng số người tham gia'
            value={eventStatistic.eventParticipants}
            description='Đã tham gia sự kiện'
            icon={Users}
            iconColor='text-indigo-600'
            iconBgColor='bg-indigo-100'
          />
          <StatsCard
            title='Đánh giá trung bình'
            value={eventStatistic.eventAverageRating}
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
          data={eventTrendData || []}
          title='Xu hướng sự kiện'
          description='Số lượng sự kiện diễn ra và người tham gia theo thời gian'
        />
        <EventStatusChart
          data={eventStatusData || []}
          title='Trạng thái sự kiện'
          description='Phân bố trạng thái các sự kiện'
        />
      </div>
    </div>
  )
}

export default ExpertDashboard
