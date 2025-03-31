'use client'

import { useState, useMemo } from 'react'
import { useGetAccountStore, useGetListChildAccount } from '@/queries/useAccount'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingBag, Search } from 'lucide-react'
import { PurchasedCourseCard } from '@/components/public/parent/setting/courses/PurchasedCourseCard'
import { CoursesSkeleton } from '@/components/public/parent/setting/courses/CoursesSkeleton'
import { EmptyCourses } from '@/components/public/parent/setting/courses/EmptyCourses'
import { PurchasedCourseStatsHeader } from '@/components/public/parent/setting/courses/PurchasedCourseStatsHeader'
import { PurchasedCourseStatsHeaderSkeleton } from '@/components/public/parent/setting/courses/PurchasedCourseStatsHeaderSkeleton'
import { useActiveCourseMutation } from '@/queries/useCourse'

// Tabs constant
const courseTabs = [
  { value: 'all', label: 'Tất cả' },
  { value: 'available', label: 'Còn chỗ' },
  { value: 'full', label: 'Đã gán hết' }
]

export default function PurchasedCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  // Fetch data
  const { data, isLoading } = useGetAccountStore()
  const { data: listChildAccount } = useGetListChildAccount()
  const activeAccountMutation = useActiveCourseMutation()

  // Memoize purchasedCourses
  const purchasedCourses = useMemo(() => data?.payload.data?.details || [], [data])

  // Lọc courses theo tab
  const filteredCourses = useMemo(() => {
    let filtered = [...purchasedCourses]

    // Filter by tab (all, available, full)
    if (activeTab === 'available') {
      filtered = filtered.filter((item) => item.unusedQuantity > 0)
    } else if (activeTab === 'full') {
      filtered = filtered.filter((item) => item.unusedQuantity === 0)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((item) => item.course.title.toLowerCase().includes(query))
    }

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter((item) => item.course.categories.some((c) => c.id === category))
    }

    return filtered
  }, [purchasedCourses, activeTab, searchQuery, category])

  // Calculate stats
  const stats = useMemo(() => {
    const totalCourses = purchasedCourses.length
    const totalQuantity = purchasedCourses.reduce((sum, item) => sum + item.quantityAtPurchase, 0)
    const totalAssigned = purchasedCourses.reduce(
      (sum, item) => sum + (item.quantityAtPurchase - item.unusedQuantity),
      0
    )
    const totalUnused = purchasedCourses.reduce((sum, item) => sum + item.unusedQuantity, 0)

    return {
      totalCourses,
      totalQuantity,
      totalAssigned,
      totalUnused
    }
  }, [purchasedCourses])

  const handleActivateCourse = (courseId: string, childId: string | null) => {
    activeAccountMutation.mutate({ courseId, childId })
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <div className='flex items-center gap-2'>
          <ShoppingBag className='h-5 w-5 text-primary' />
          <h2 className='text-xl font-medium text-gray-900'>Khóa học đã mua</h2>
        </div>
        <p className='text-sm text-gray-500 mt-1 md:ml-7'>Quản lý các khóa học bạn đã mua và phân công học viên</p>
      </div>

      {isLoading ? (
        <>
          <PurchasedCourseStatsHeaderSkeleton />
          <CoursesSkeleton />
        </>
      ) : (
        <>
          <PurchasedCourseStatsHeader stats={stats} />
          <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
              <TabsList className='bg-gray-100/80'>
                {courseTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className='data-[state=active]:bg-white'>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className='flex flex-col sm:flex-row gap-3'>
                <div className='relative w-full sm:w-64'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                  <Input
                    placeholder='Tìm kiếm khóa học...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='pl-9 border-gray-200'
                  />
                </div>

                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className='w-full sm:w-48 border-gray-200'>
                    <SelectValue placeholder='Tất cả danh mục' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Tất cả danh mục</SelectItem>
                    {/* Populate with your categories */}
                    <SelectItem value='1'>Tên A-Z</SelectItem>
                    <SelectItem value='2'>Tên Z-A</SelectItem>
                    <SelectItem value='3'>Ngày mua từ gần đây nhất</SelectItem>
                    <SelectItem value='4'>Ngày mua từ xa nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredCourses.length > 0 ? (
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {filteredCourses.map((item) => (
                  <PurchasedCourseCard
                    key={item.course.id}
                    courseData={item}
                    listChildAccount={listChildAccount?.payload.data?.map((account) => ({
                      id: account.id,
                      name: account.userDetail.firstName,
                      imageUrl: account.userDetail.avatarUrl
                    }))}
                    onActivate={handleActivateCourse}
                  />
                ))}
              </div>
            ) : (
              <EmptyCourses
                title={`Không tìm thấy khóa học nào ${searchQuery ? 'phù hợp với tìm kiếm' : 'trong danh mục này'}`}
                description='Hãy thử tìm kiếm với từ khóa khác hoặc khám phá thêm các khóa học mới.'
              />
            )}
          </Tabs>
        </>
      )}
    </div>
  )
}
