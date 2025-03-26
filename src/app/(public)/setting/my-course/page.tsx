'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GraduationCap, Search } from 'lucide-react'
import { useCourseByAccount } from '@/queries/useAccount'
import { CourseStatsHeader } from '@/components/public/parent/setting/courses/CourseStatsHeader'
import { CoursesList } from '@/components/public/parent/setting/courses/CoursesList'
import { EmptyCourses } from '@/components/public/parent/setting/courses/EmptyCourses'
import { CoursesSkeleton } from '@/components/public/parent/setting/courses/CoursesSkeleton'
import { CourseStatsHeaderSkeleton } from '@/components/public/parent/setting/courses/CourseStatsHeaderSkeleton'

// Tạo constant cho tabs
const courseTabs = [
  { value: 'all', label: 'Tất cả khóa học' },
  { value: 'in-progress', label: 'Đang học' },
  { value: 'completed', label: 'Đã hoàn thành' },
  { value: 'saved', label: 'Đã lưu' }
]

export default function MyCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  // Fetch data
  const { data, isLoading } = useCourseByAccount({ page_size: 100, page_index: 1 })
  const allCourses = data?.payload.data || []

  // Tính toán các khóa học theo tab
  const getCoursesByTab = () => {
    switch (activeTab) {
      case 'completed':
        return allCourses.filter((course) => course.completionRate === 100)
      case 'in-progress':
        return allCourses.filter((course) => course.completionRate > 0 && course.completionRate < 100)
      default:
        return allCourses
    }
  }

  // Lọc courses dựa vào tìm kiếm và danh mục
  const filterCourses = (courses: any) => {
    return courses.filter((course: any) => {
      const matchesSearch =
        searchQuery.trim() === '' ? true : course.title.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = category === 'all' ? true : course.categories.some((c: any) => c.id === category)

      return matchesSearch && matchesCategory
    })
  }

  // Các khóa học đã được lọc
  const filteredCourses = filterCourses(getCoursesByTab())

  // Tính toán số liệu thống kê
  const calculateStats = () => {
    if (allCourses.length === 0)
      return {
        totalCourses: 0,
        completedCourses: 0,
        inProgressCourses: 0,
        averageProgress: 0,
        totalHours: 0
      }

    const completedCourses = allCourses.filter((c) => c.completionRate === 100).length
    const inProgressCourses = allCourses.filter((c) => c.completionRate > 0 && c.completionRate < 100).length

    const averageProgress = Math.round(allCourses.reduce((total, c) => total + c.completionRate, 0) / allCourses.length)

    // Tính tổng số giờ học
    const totalHours = allCourses.reduce((total, c) => {
      const hours = parseInt(c.durationDisplay.split('h')[0]) || 0
      const mins = parseInt(c.durationDisplay.split('m')[0].split(' ').pop() || '0') || 0
      return total + hours + mins / 60
    }, 0)

    return {
      totalCourses: allCourses.length,
      completedCourses,
      inProgressCourses,
      averageProgress,
      totalHours: Math.round(totalHours)
    }
  }

  const stats = calculateStats()

  return (
    <div className='space-y-8'>
      {isLoading ? (
        <>
          {/* Header */}
          <div>
            <div className='flex items-center gap-2'>
              <GraduationCap className='h-5 w-5 text-primary' />
              <h2 className='text-xl font-medium text-gray-900'>Khóa học của tôi</h2>
            </div>
            <p className='text-sm text-gray-500 mt-1 md:ml-7'>Quản lý và theo dõi tiến độ học tập của bạn</p>
          </div>

          <CourseStatsHeaderSkeleton />
          <CoursesSkeleton />
        </>
      ) : (
        <>
          {/* Header */}
          <div>
            <div className='flex items-center gap-2'>
              <GraduationCap className='h-5 w-5 text-primary' />
              <h2 className='text-xl font-medium text-gray-900'>Khóa học của tôi</h2>
            </div>
            <p className='text-sm text-gray-500 mt-1 md:ml-7'>Quản lý và theo dõi tiến độ học tập của bạn</p>
          </div>

          {/* Stats Cards */}
          <CourseStatsHeader stats={stats} />

          {/* Tabs & Filters */}
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
                    <SelectItem value='1'>Ngoại ngữ</SelectItem>
                    <SelectItem value='2'>Khoa học</SelectItem>
                    <SelectItem value='3'>Kỹ năng mềm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Content area */}
            {filteredCourses.length > 0 ? (
              <CoursesList courses={filteredCourses} />
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
