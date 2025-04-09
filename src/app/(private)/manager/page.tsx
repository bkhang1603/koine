'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  formatCurrency,
  formatPercentage,
  getFilledDataStats,
  formatApiRevenueData,
  getDateRangeFromType,
  parseUrlDate,
  getValidRangeType,
  formatDateForApi,
  RangeType,
  RevenueDataItem
} from '@/lib/utils'
import { DollarSign, ShoppingBag, MapPin, UserRound, CheckCircle } from 'lucide-react'
import { DateRangePicker } from '@/components/private/common/dashboard/date-range-picker'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { StatsCard } from '@/components/private/admin/dashboard/stats-card'
import { RevenueChart } from '@/components/private/admin/dashboard/revenue-chart'
import { OrderStatusChart } from '@/components/private/admin/dashboard/order-status-chart'
import { DistributionChart } from '@/components/private/admin/dashboard/distribution-chart'
import {
  BestSellingPhysicalProducts,
  BestSellingCourses
} from '@/components/private/admin/dashboard/best-selling-products'
import { DataNote } from '@/components/private/admin/dashboard/data-note'
import { DashboardSkeleton } from '@/components/private/admin/dashboard/dashboard-skeleton'
import { useDashboardStatisticsQuery } from '@/queries/useDashboard'
import { useRouter, useSearchParams } from 'next/navigation'

// Chart colors and settings
const chartColors = {
  revenue: '#2563eb', // Blue
  orders: '#16a34a', // Green
  locationDistribution: '#3b82f6', // Blue
  ageDistribution: '#8b5cf6' // Purple
}

const orderStatusColors = {
  PROCESSING: '#f59e0b', // Amber
  DELIVERING: '#3b82f6', // Blue
  COMPLETED: '#22c55e', // Green
  CANCELLED: '#ef4444' // Red
}

export default function AdminDashboard() {
  // State to control client-side rendering
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

  // Get formatted start and end dates for API
  const start_date = useMemo(() => formatDateForApi(dateRange?.from), [dateRange?.from])
  const end_date = useMemo(() => formatDateForApi(dateRange?.to), [dateRange?.to])

  // Fetch dashboard data from API
  const { data: dashboardData, isLoading } = useDashboardStatisticsQuery({
    range_type: currentRangeType,
    start_date,
    end_date
  })

  // Process API data
  const processedData = useMemo(() => {
    if (!dashboardData?.payload?.data)
      return {
        revenueData: [],
        orderStatusData: [],
        bestSellingProducts: [],
        bestSellingCourses: [],
        locationDistribution: [],
        ageDistribution: []
      }

    const { data } = dashboardData.payload

    // Format revenue data
    const revenueData = formatApiRevenueData(data.revenueData || [])

    // Format order status data
    const orderStatusData = (data.orderStatusData || []).map((status: { status: string; count: string | number }) => ({
      status: status.status,
      count: Number(status.count)
    }))

    // Format best selling products
    const bestSellingProducts = (data.bestSellingProducts || []).map(
      (product: { name?: string; quantity: string | number; revenue: number }) => ({
        name: product.name || 'Unnamed Product',
        quantity: Number(product.quantity),
        revenue: Number(product.revenue)
      })
    )

    // Format best selling courses
    const bestSellingCourses = (data.bestSellingCourses || []).map(
      (course: { name?: string; quantity: string | number; revenue: number }) => ({
        name: course.name || 'Unnamed Course',
        quantity: Number(course.quantity),
        revenue: Number(course.revenue)
      })
    )

    // Format location distribution
    const locationDistribution = (data.locationDistribution || []).map(
      (location: { name?: string | null; count: string | number; percentage: number }) => ({
        name: location.name || 'Các tỉnh/ thành phố khác',
        count: Number(location.count),
        percentage: Number(location.percentage)
      })
    )

    // Format age distribution
    const ageDistribution = (data.ageDistribution || []).map(
      (age: { name: string; count: string | number; percentage: number }) => ({
        name: age.name,
        count: Number(age.count),
        percentage: Number(age.percentage)
      })
    )

    return {
      revenueData,
      orderStatusData,
      bestSellingProducts,
      bestSellingCourses,
      locationDistribution,
      ageDistribution,
      statistics: data.statistics
    }
  }, [dashboardData])

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

  // Update the filtered revenue data state
  const [filteredRevenueData, setFilteredRevenueData] = useState<RevenueDataItem[]>([])

  // Filter revenue data when it comes from API
  useEffect(() => {
    if (processedData.revenueData && processedData.revenueData.length > 0) {
      setFilteredRevenueData(processedData.revenueData)
    }
  }, [processedData.revenueData])

  // Calculate statistics from filtered data - now memoized to avoid recalculations
  const periodStats = useMemo(() => {
    if (!processedData.statistics) {
      return {
        totalRevenue: 0,
        totalOrders: 0,
        avgRevenue: 0,
        avgPerOrder: 0,
        daysWithRevenue: 0,
        filledStats: { filledDays: 0, totalDays: 0, filledPercentage: 0, originalDays: 0 }
      }
    }

    const { statistics } = processedData

    // Count days with non-zero revenue in the filtered data
    const daysWithRevenue = filteredRevenueData.filter((item) => item.amount > 0).length

    // Get filled data statistics
    const filledStats = getFilledDataStats(filteredRevenueData)

    return {
      totalRevenue: statistics.totalRevenue,
      totalOrders: statistics.totalOrders,
      avgRevenue: statistics.averageRevenuePerDay,
      avgPerOrder: statistics.averageOrderValue,
      daysWithRevenue,
      completedOrders: statistics.completedOrders,
      completionRate: statistics.completionRate,
      uniqueCustomers: statistics.uniqueCustomers,
      filledStats
    }
  }, [processedData, filteredRevenueData])

  // Return a loading state until client-side rendering is ready or data is loading
  if (!isClient || isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <h1 className='text-3xl font-bold'>Tổng Quan</h1>
        <div className='w-full md:w-[300px]'>
          <DateRangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            onRangeTypeChange={handleRangeTypeChange}
            initialSelectedOption={currentRangeType}
          />
        </div>
      </div>

      {/* Stats cards */}
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        <StatsCard
          title='Tổng Doanh Thu'
          value={formatCurrency(processedData.statistics?.totalRevenue || 0)}
          description={`Trung bình: ${formatCurrency(processedData.statistics?.averageRevenuePerDay || 0)}/ngày`}
          icon={DollarSign}
        />
        <StatsCard
          title='Đơn Hàng'
          value={(processedData.statistics?.totalOrders || 0).toLocaleString()}
          description={`Trung bình: ${processedData.statistics?.averageOrdersPerDay?.toFixed(2) || '0.00'} đơn/ngày`}
          icon={ShoppingBag}
        />
        <StatsCard
          title='Hoàn Thành'
          value={(processedData.statistics?.completedOrders || 0).toLocaleString()}
          description={`Tỷ lệ: ${formatPercentage((processedData.statistics?.completionRate || 0) / 100)}`}
          icon={CheckCircle}
        />
        <StatsCard
          title='Khách Hàng'
          value={(processedData.statistics?.uniqueCustomers || 0).toLocaleString()}
          description={`Giá trị TB: ${formatCurrency(processedData.statistics?.averageOrderValue || 0)}/đơn`}
          icon={UserRound}
        />
      </div>

      {/* Charts */}
      <div className='grid gap-4 grid-cols-1 lg:grid-cols-3'>
        <RevenueChart data={filteredRevenueData} chartColors={chartColors} />
        {processedData.orderStatusData.length > 0 && (
          <OrderStatusChart data={processedData.orderStatusData} colors={orderStatusColors} />
        )}
      </div>

      {/* Distribution Chart and Best Selling Product sections */}
      {/* First row - Distribution Charts (Geographic and Age) */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Geographic distribution */}
        {processedData.locationDistribution.length > 0 && (
          <div>
            <DistributionChart
              title='Phân Bố Địa Lý'
              description='Vị trí khách hàng'
              data={processedData.locationDistribution}
              color={chartColors.locationDistribution}
              icon={MapPin}
              isVertical={false}
            />
          </div>
        )}

        {/* Age distribution */}
        {processedData.ageDistribution.length > 0 && (
          <div>
            <DistributionChart
              title='Phân Bố Độ Tuổi'
              description='Độ tuổi khách hàng'
              data={processedData.ageDistribution}
              color={chartColors.ageDistribution}
              icon={UserRound}
              isVertical={true}
            />
          </div>
        )}
      </div>

      {/* Second row - Best Selling Products and Courses */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Best selling physical products */}
        {processedData.bestSellingProducts.length > 0 && (
          <div>
            <BestSellingPhysicalProducts products={processedData.bestSellingProducts} />
          </div>
        )}

        {/* Best selling courses */}
        {processedData.bestSellingCourses.length > 0 && (
          <div>
            <BestSellingCourses courses={processedData.bestSellingCourses} />
          </div>
        )}
      </div>

      <DataNote filledStats={periodStats.filledStats} daysWithRevenue={periodStats.daysWithRevenue} />
    </div>
  )
}
