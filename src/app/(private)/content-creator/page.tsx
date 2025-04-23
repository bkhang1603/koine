'use client'

import { useEffect, useMemo, useState } from 'react'
import { getDateRangeFromType, parseUrlDate, getValidRangeType, RangeType } from '@/lib/utils'
import { BookOpen, Star, Eye, Users } from 'lucide-react'
import { DateRangePicker } from '@/components/private/common/dashboard/date-range-picker'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { StatsCard } from '@/components/private/content-creator/dashboard/stats-card'
import { ContentTrendChart } from '@/components/private/content-creator/dashboard/content-trend-chart'
import { ContentStatusChart } from '@/components/private/content-creator/dashboard/content-status-chart'
import { PopularContentCard } from '@/components/private/content-creator/dashboard/popular-content-card'
import { AgeGroupsCard } from '@/components/private/content-creator/dashboard/age-groups-card'
import { DashboardSkeleton } from '@/components/private/content-creator/dashboard/dashboard-skeleton'
import { useRouter, useSearchParams } from 'next/navigation'

// Import mock data
import { statsData, contentTrendData, contentStatusData, popularContentData, ageGroupData } from './dashboard-mock-data'

export default function ContentCreatorDashboard() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Loading state
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
    }, 1000)

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

  // Add enrollment data for popular courses
  const popularCourses = popularContentData.map((course, index) => ({
    ...course,
    // Add simulated enrollment numbers using index to make values different
    views: 300 - index * 50 // 300, 250, 200 enrollments based on position
  }))

  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-6'>
        <h1 className='text-2xl font-bold mb-6'>Quản lý khóa học</h1>
        <DashboardSkeleton />
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header with Date Range Picker */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý khóa học</h1>
          <p className='text-muted-foreground'>Trang tổng quan khóa học của bạn</p>
        </div>
        <DateRangePicker
          value={dateRange}
          onChange={onDateRangeChange}
          onRangeTypeChange={onRangeTypeChange}
          initialSelectedOption={validRangeType}
          className='w-full md:w-auto'
        />
      </div>

      {/* Course Stats */}
      <div>
        <h2 className='text-lg font-semibold mb-3'>Thống kê khóa học</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <StatsCard
            title='Tổng khóa học'
            value={statsData.totalCourses}
            description='Tổng số khóa học của bạn'
            icon={BookOpen}
            iconColor='text-purple-600'
            iconBgColor='bg-purple-100'
          />
          <StatsCard
            title='Tổng lượt xem'
            value={statsData.totalCourseViews.toLocaleString()}
            description='Trên tất cả khóa học'
            icon={Eye}
            iconColor='text-indigo-600'
            iconBgColor='bg-indigo-100'
          />
          <StatsCard
            title='Tổng lượt đăng ký'
            value={statsData.totalCourseEnrollments.toLocaleString()}
            description='Học viên đã đăng ký'
            icon={Users}
            iconColor='text-green-600'
            iconBgColor='bg-green-100'
          />
          <StatsCard
            title='Đánh giá trung bình'
            value={statsData.averageCourseRating}
            description='Trên tất cả khóa học'
            icon={Star}
            iconColor='text-amber-600'
            iconBgColor='bg-amber-100'
          />
        </div>
      </div>

      {/* Course Charts */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <ContentTrendChart
          data={contentTrendData}
          title='Xu hướng lượt đăng ký khóa học'
          description='Thống kê lượt đăng ký theo thời gian'
        />
        <ContentStatusChart
          data={contentStatusData}
          title='Trạng thái khóa học'
          description='Phân bố trạng thái các khóa học'
        />
      </div>

      {/* Popular Courses & Age Groups */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <PopularContentCard
          data={popularCourses}
          title='Khóa học nổi bật'
          description='Khóa học có nhiều học viên đăng ký nhất'
        />
        <AgeGroupsCard data={ageGroupData} title='Phân bố độ tuổi' description='Thống kê khóa học theo độ tuổi' />
      </div>
    </div>
  )
}
