'use client'

import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetCategoryCoursesQuery } from '@/queries/useCourse'
import { CategoriesTable } from '@/components/private/admin/course/categories-table'

export default function CourseCategoriesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get values from searchParams or use default values
  const currentKeyword = searchParams.get('keyword') || ''
  const currentPageSize = Number(searchParams.get('page_size')) || 10
  const currentPageIndex = Number(searchParams.get('page_index')) || 1

  // Function to update URL when values change
  const updateSearchParams = (newParams: { keyword?: string; page_size?: number; page_index?: number }) => {
    const params = new URLSearchParams(searchParams.toString())

    if (newParams.keyword !== undefined) {
      if (newParams.keyword === '') {
        params.delete('keyword')
      } else {
        params.set('keyword', newParams.keyword)
      }
    }

    if (newParams.page_size !== undefined) {
      params.set('page_size', newParams.page_size.toString())
    }

    if (newParams.page_index !== undefined) {
      params.set('page_index', newParams.page_index.toString())
    }

    router.push(`?${params.toString()}`)
  }

  const { data: categoriesResponse, isLoading } = useGetCategoryCoursesQuery({
    page_index: currentPageIndex,
    page_size: currentPageSize,
    keyword: currentKeyword
  })

  const categories = categoriesResponse?.payload?.data || []
  const pagination = categoriesResponse?.payload?.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý danh mục khóa học</h1>
          <p className='text-muted-foreground mt-1'>Quản lý và theo dõi tất cả danh mục khóa học trong hệ thống</p>
        </div>
      </div>

      {/* Search */}
      <div className='flex items-center gap-4'>
        <Input
          placeholder='Tìm kiếm danh mục...'
          value={currentKeyword}
          onChange={(e) => updateSearchParams({ keyword: e.target.value, page_index: 1 })}
          className='max-w-sm'
        />
      </div>

      {/* Table */}
      <CategoriesTable data={categories} pagination={pagination} isLoading={isLoading} />
    </div>
  )
}
