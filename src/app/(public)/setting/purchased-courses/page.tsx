'use client'

import { useState, useMemo } from 'react'
import { useGetAccountStore } from '@/queries/useAccount'
import { PurchasedCoursesHeader } from '@/components/public/parent/setting/courses/purchased/PurchasedCoursesHeader'
import { PurchasedCoursesFilter } from '@/components/public/parent/setting/courses/purchased/PurchasedCoursesFilter'
import { PurchasedCourseCard } from '@/components/public/parent/setting/courses/purchased/PurchasedCourseCard'
import { PurchasedCoursesSkeleton } from '@/components/public/parent/setting/courses/purchased/PurchasedCoursesSkeleton'
import { EmptyPurchasedCourses } from '@/components/public/parent/setting/courses/purchased/EmptyPurchasedCourses'
import { StatsHeaderSkeleton } from '@/components/public/parent/setting/courses/StatsHeaderSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function PurchasedCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('all')

  const { data: coursesData, isLoading } = useGetAccountStore()

  // Dữ liệu khóa học theo schema
  const courseItems = useMemo(() => coursesData?.payload.data.details || [], [coursesData])
  const totalItems = useMemo(() => coursesData?.payload.data.totalItem || 0, [coursesData])
  const mockChildAccounts = useMemo(
    () => [
      { id: 'child1', name: 'Nguyễn Minh An' },
      { id: 'child2', name: 'Nguyễn Thảo Vy' }
    ],
    []
  )

  // Tính toán các thông số thống kê
  const totalValue = courseItems.reduce((sum, item) => sum + item.course.price, 0)
  const activatedCount = courseItems.filter((item) => item.assignedTo.length > 0).length
  const nonActivatedCount = courseItems.filter((item) => item.unusedQuantity > 0).length

  // Lọc khóa học theo điều kiện
  const filteredCourses = useMemo(() => {
    let filtered = [...courseItems]

    // Lọc theo tab hiện tại
    if (viewMode === 'activated') {
      filtered = filtered.filter((item) => item.assignedTo.length > 0)
    } else if (viewMode === 'not_activated') {
      filtered = filtered.filter((item) => item.unusedQuantity > 0)
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery.trim()) {
      const search = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.course.title.toLowerCase().includes(search) ||
          item.course.categories.some((cat) => cat.name.toLowerCase().includes(search))
      )
    }

    return filtered
  }, [courseItems, viewMode, searchQuery])

  return (
    <div className='space-y-6'>
      {/* Header thống kê */}
      {isLoading ? (
        <div className='space-y-6'>
          <div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-5 w-5' />
              <Skeleton className='h-5 w-20' />
            </div>
            <Skeleton className='h-4 w-40 mt-1' />
          </div>

          {/* Skeleton cho Stats */}
          <StatsHeaderSkeleton />
        </div>
      ) : (
        <PurchasedCoursesHeader
          totalItems={totalItems}
          totalValue={totalValue}
          activatedCount={activatedCount}
          nonActivatedCount={nonActivatedCount}
        />
      )}

      {/* Bộ lọc và tìm kiếm */}
      {isLoading ? (
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
          <Skeleton className='h-10 w-64' />
          <div className='flex flex-col sm:flex-row gap-3'>
            <Skeleton className='h-10 w-64' />
            <Skeleton className='h-10 w-48' />
          </div>
        </div>
      ) : (
        <PurchasedCoursesFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      )}

      {/* Danh sách khóa học */}
      <div className='space-y-4'>
        {isLoading ? (
          <PurchasedCoursesSkeleton />
        ) : filteredCourses.length === 0 ? (
          <EmptyPurchasedCourses isEmpty={courseItems.length === 0} searchTerm={searchQuery} filterMode={viewMode} />
        ) : (
          filteredCourses.map((item) => (
            <PurchasedCourseCard
              key={`${item.course.id}_${item.quantityAtPurchase}`}
              courseItem={item}
              childAccounts={mockChildAccounts}
            />
          ))
        )}
      </div>
    </div>
  )
}
