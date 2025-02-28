'use client'

import { Button } from '@/components/ui/button'
import { Plus, Settings } from 'lucide-react'
import { courses } from '../_mock/data'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CourseFilters } from '@/components/private/content-creator/course/course-filters'
import { EmptyCourses } from '@/components/private/content-creator/course/empty-courses'
import { DeleteCourseDialog } from '@/components/private/content-creator/course/delete-course-dialog'
import { CourseCard } from '@/components/private/content-creator/course/course-card'

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [ageFilter, setAgeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const router = useRouter()

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.categories.includes(selectedCategory)
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAge = ageFilter === 'all' || course.ageGroup === ageFilter
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter
    return matchesCategory && matchesSearch && matchesAge && matchesStatus
  })

  const handleDelete = (courseId: number) => {
    setSelectedCourse(courseId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    console.log('Deleting course:', selectedCourse)
    setDeleteDialogOpen(false)
    setSelectedCourse(null)
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold'>Khóa học của bạn</h1>
          <p className='text-sm text-muted-foreground mt-1'>Quản lý và tạo mới các khóa học</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='outline' asChild>
            <Link href='/content-creator/course/categories'>
              <Settings className='w-4 h-4 mr-2' />
              Quản lý danh mục
            </Link>
          </Button>
          <Button asChild>
            <Link href='/content-creator/course/new'>
              <Plus className='w-4 h-4 mr-2' />
              Tạo khóa học
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className='mb-6'>
        <CourseFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          ageFilter={ageFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onAgeFilterChange={setAgeFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>

      {/* Course List */}
      <div className='grid grid-cols-3 gap-6'>
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} onDelete={handleDelete} onNavigate={router.push} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && <EmptyCourses />}

      {/* Delete Dialog */}
      <DeleteCourseDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} />
    </div>
  )
}
