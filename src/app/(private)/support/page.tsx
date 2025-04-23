'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { MessageSquare, DollarSign, ShoppingCart, BookText, Star, Sparkles } from 'lucide-react'

import { ticketData, refundData, orderData } from './_data/mock'
import { activityTrendData, contentDistributionData, contentSummaryData } from './_data/content-mock'
import { DateRangePicker } from '@/components/private/common/dashboard/date-range-picker'
import { getDateRangeFromType, parseUrlDate, getValidRangeType, RangeType } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardSkeleton } from '@/components/private/support/dashboard/dashboard-skeleton'

// Components import - direct import without relative paths
import { StatsCard } from '@/components/private/support/dashboard/stats-card'
import { ActivityTrendChart } from '@/components/private/support/dashboard/activity-trend-chart'
import { ContentDistributionChart } from '@/components/private/support/dashboard/content-distribution-chart'
import { RefundStatusChart } from '@/components/private/support/dashboard/refund-status-chart'

// Chart colors for consistency
const chartColors = {
  ticket: {
    pending: '#f59e0b', // Amber
    inProgress: '#3b82f6', // Blue
    resolved: '#22c55e' // Green
  },
  refund: {
    pending: '#f59e0b', // Amber
    processing: '#3b82f6', // Blue
    completed: '#22c55e', // Green
    rejected: '#ef4444' // Red
  },
  order: {
    PROCESSING: '#f59e0b', // Amber
    DELIVERING: '#3b82f6', // Blue
    COMPLETED: '#22c55e', // Green
    CANCELLED: '#ef4444' // Red
  }
}

export default function SupportDashboard() {
  // State for client-side rendering
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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

    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
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

  // Prepare enhanced refund status data with proper colors
  const enhancedRefundStatus = refundData.refundStatus.map((item) => ({
    ...item,
    color:
      item.name === 'Chờ duyệt'
        ? chartColors.refund.pending
        : item.name === 'Đang xử lý'
          ? chartColors.refund.processing
          : chartColors.refund.completed
  }))

  // Return a loading state until client-side rendering is ready
  if (!isClient || isLoading) {
    return (
      <div className='p-6'>
        <DashboardSkeleton />
      </div>
    )
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
          value={ticketData.totalTickets}
          icon={MessageSquare}
          iconColor='text-blue-600'
          iconBgColor='bg-blue-100'
        />

        <StatsCard
          title='Yêu cầu hoàn tiền'
          value={refundData.totalRefunds}
          icon={DollarSign}
          iconColor='text-red-600'
          iconBgColor='bg-red-100'
        />

        <StatsCard
          title='Đơn hàng'
          value={orderData.totalOrders}
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
                <h3 className='text-2xl font-bold mt-1'>{contentSummaryData.totalComments}</h3>
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
                <h3 className='text-2xl font-bold mt-1'>{contentSummaryData.courseComments}</h3>
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
                <h3 className='text-2xl font-bold mt-1'>{contentSummaryData.blogComments}</h3>
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
                <h3 className='text-2xl font-bold mt-1'>{contentSummaryData.productReviews}</h3>
              </div>
              <div className='p-2 bg-green-50 rounded-full'>
                <Star className='h-5 w-5 text-green-600' />
              </div>
            </div>
            <div className='text-xs text-muted-foreground mt-2'>
              <div className='flex items-center gap-1'>
                <div className='w-2 h-2 rounded-full bg-green-600'></div>
                <span>Điểm đánh giá trung bình: {contentSummaryData.averageRating}</span>
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

      {/* Content Distribution and Refund Status Charts */}
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        <ContentDistributionChart
          data={contentDistributionData}
          title='Phân bố bình luận và đánh giá'
          description='Thống kê số lượng theo từng loại nội dung'
        />

        <RefundStatusChart
          data={enhancedRefundStatus}
          title='Trạng thái hoàn tiền'
          description='Thống kê các yêu cầu hoàn tiền theo trạng thái'
        />
      </div>
    </div>
  )
}
