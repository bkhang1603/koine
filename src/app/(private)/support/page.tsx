'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { MessageSquare, DollarSign, ShoppingCart, BookText, Star, Sparkles } from 'lucide-react'

import { DateRangePicker } from '@/components/private/common/dashboard/date-range-picker'
import { getDateRangeFromType, parseUrlDate, getValidRangeType, RangeType, formatDateForApi } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardSkeleton } from '@/components/private/support/dashboard/dashboard-skeleton'

// Components import - direct import without relative paths
import { StatsCard } from '@/components/private/support/dashboard/stats-card'
import { ActivityTrendChart } from '@/components/private/support/dashboard/activity-trend-chart'
import { RefundStatusChart } from '@/components/private/support/dashboard/refund-status-chart'
import { ExchangeStatusChart } from '@/components/private/support/dashboard/exchange-status-chart'
import { useDashboardSupporterQuery } from '@/queries/useDashboard'

export default function SupportDashboard() {
  // State for client-side rendering
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current range type from URL or use default
  const currentRangeType = getValidRangeType(searchParams.get('range_type'))

  const urlStartDate = parseUrlDate(searchParams.get('start_date'))
  const urlEndDate = parseUrlDate(searchParams.get('end_date'))

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

  // Set up date range state based on URL parameters
  const initialDateRange = useMemo(() => {
    if (currentRangeType === 'DAY' && urlStartDate && urlEndDate) {
      return { from: urlStartDate, to: urlEndDate }
    }
    return getDateRangeFromType(currentRangeType)
  }, [currentRangeType, urlStartDate, urlEndDate])

  const [dateRange, setDateRange] = useState<DateRange>(initialDateRange)

  // Get formatted start and end dates for API
  const start_date = useMemo(() => formatDateForApi(dateRange?.from), [dateRange?.from])
  const end_date = useMemo(() => formatDateForApi(dateRange?.to), [dateRange?.to])

  // Fetch dashboard data from API
  const { data: dashboardData, isLoading } = useDashboardSupporterQuery({
    range_type: currentRangeType,
    start_date,
    end_date
  })

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

  // Process activity trend data
  const activityTrendData = useMemo(() => {
    if (!dashboardData?.payload?.data?.commentAndReviewTrendData) return []

    return dashboardData.payload.data.commentAndReviewTrendData.map((item) => ({
      date: item.date,
      courseComments: item.courseReview,
      blogComments: item.blogComment,
      productReviews: item.productReview
    }))
  }, [dashboardData])

  // Map refund status data to the expected format for the chart
  const refundStatusData = useMemo(() => {
    if (!dashboardData?.payload?.data?.refundOrderStatusData) return []

    return dashboardData.payload.data.refundOrderStatusData.map((item) => ({
      status: item.status,
      count: Number(item.count)
    }))
  }, [dashboardData])

  // Map exchange status data to the expected format for the chart
  const exchangeStatusData = useMemo(() => {
    if (!dashboardData?.payload?.data?.exchangeOrderStatusData) return []

    return dashboardData.payload.data.exchangeOrderStatusData.map((item) => {
      let name = 'Unknown'
      let color = '#6b7280' // Gray default

      switch (item.status) {
        case 'EXCHANGE_REQUEST':
          name = 'Chờ duyệt'
          color = '#f59e0b' // Amber
          break
        case 'EXCHANGING':
          name = 'Đang đổi hàng'
          color = '#3b82f6' // Blue
          break
        case 'EXCHANGED':
          name = 'Đã đổi hàng'
          color = '#22c55e' // Green
          break
        case 'EXCHANGE_FAILED':
          name = 'Đổi hàng thất bại'
          color = '#ef4444' // Red
          break
      }

      return {
        name,
        value: Number(item.count),
        color
      }
    })
  }, [dashboardData])

  // Return a loading state until client-side rendering is ready
  if (!isClient || isLoading) {
    return (
      <div className='p-6'>
        <DashboardSkeleton />
      </div>
    )
  }

  const statistics = dashboardData?.payload?.data?.statistic || {
    totalTickets: 0,
    totalRefunds: 0,
    totalOrders: 0,
    totalCourseReview: 0,
    totalProductReview: 0,
    totalBlogComment: 0,
    totalCommentAndReview: 0
  }

  return (
    <div className='p-6 space-y-6'>
      {/* Header with Date Range Picker */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Tổng Quan Hỗ Trợ</h1>
          <p className='text-muted-foreground'>Thống kê hoạt động hỗ trợ người dùng</p>
        </div>
        <div className='w-full md:w-[300px]'>
          <DateRangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            onRangeTypeChange={handleRangeTypeChange}
            initialSelectedOption={currentRangeType}
          />
        </div>
      </div>

      {/* Support Stats Cards */}
      <div className='grid gap-4 grid-cols-1 md:grid-cols-3'>
        <StatsCard
          title='Yêu cầu hỗ trợ'
          value={statistics.totalTickets}
          icon={MessageSquare}
          iconColor='text-blue-600'
          iconBgColor='bg-blue-100'
        />

        <StatsCard
          title='Yêu cầu hoàn tiền'
          value={statistics.totalRefunds}
          icon={DollarSign}
          iconColor='text-red-600'
          iconBgColor='bg-red-100'
        />

        <StatsCard
          title='Đơn hàng'
          value={statistics.totalOrders}
          icon={ShoppingCart}
          iconColor='text-amber-600'
          iconBgColor='bg-amber-100'
        />
      </div>

      {/* Content Stats Cards */}
      <div className='grid gap-4 grid-cols-1 md:grid-cols-4'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Tổng số bình luận</p>
                <h3 className='text-2xl font-bold mt-1'>{statistics.totalCommentAndReview}</h3>
              </div>
              <div className='p-2 bg-blue-50 rounded-full'>
                <MessageSquare className='h-5 w-5 text-blue-600' />
              </div>
            </div>
            <div className='text-xs text-muted-foreground mt-2'>
              <div className='flex items-center gap-1'>
                <div className='w-2 h-2 rounded-full bg-blue-600'></div>
                <span>Từ tất cả các nguồn</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Bình luận khóa học</p>
                <h3 className='text-2xl font-bold mt-1'>{statistics.totalCourseReview}</h3>
              </div>
              <div className='p-2 bg-indigo-50 rounded-full'>
                <BookText className='h-5 w-5 text-indigo-600' />
              </div>
            </div>
            <div className='text-xs text-muted-foreground mt-2'>
              <div className='flex items-center gap-1'>
                <div className='w-2 h-2 rounded-full bg-indigo-600'></div>
                <span>Trên tất cả các khóa học</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Bình luận bài viết</p>
                <h3 className='text-2xl font-bold mt-1'>{statistics.totalBlogComment}</h3>
              </div>
              <div className='p-2 bg-purple-50 rounded-full'>
                <Sparkles className='h-5 w-5 text-purple-600' />
              </div>
            </div>
            <div className='text-xs text-muted-foreground mt-2'>
              <div className='flex items-center gap-1'>
                <div className='w-2 h-2 rounded-full bg-purple-600'></div>
                <span>Trên tất cả bài viết blog</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Đánh giá sản phẩm</p>
                <h3 className='text-2xl font-bold mt-1'>{statistics.totalProductReview}</h3>
              </div>
              <div className='p-2 bg-green-50 rounded-full'>
                <Star className='h-5 w-5 text-green-600' />
              </div>
            </div>
            <div className='text-xs text-muted-foreground mt-2'>
              <div className='flex items-center gap-1'>
                <div className='w-2 h-2 rounded-full bg-green-600'></div>
                <span>Điểm đánh giá trung bình</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Activity Trend Chart - full width */}
      <ActivityTrendChart
        data={activityTrendData}
        title='Xu hướng bình luận và đánh giá'
        description='Thống kê bình luận khóa học, bài viết và đánh giá sản phẩm theo thời gian'
      />

      {/* Status Charts Grid */}
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2'>
        {/* Refund Status Chart */}
        <RefundStatusChart
          data={refundStatusData}
          title='Trạng thái hoàn tiền'
          description='Thống kê các yêu cầu hoàn tiền theo trạng thái: Chờ duyệt, Đã duyệt, Từ chối'
        />

        {/* Exchange Status Chart */}
        <ExchangeStatusChart
          data={exchangeStatusData}
          title='Trạng thái đổi hàng'
          description='Thống kê các yêu cầu đổi hàng theo trạng thái: Chờ duyệt, Đang đổi hàng, Đã đổi hàng, Đổi hàng thất bại'
        />
      </div>
    </div>
  )
}
