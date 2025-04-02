/* eslint-disable no-unused-vars */
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCategoryBlogQuery } from '@/queries/useBlog'
import { Search } from 'lucide-react'

interface BlogFiltersProps {
  searchQuery: string
  selectedCategory: string
  statusFilter: string
  onSearchChange: (query: string) => void
  onCategoryChange: (category: string) => void
  onStatusFilterChange: (status: string) => void
}

export function BlogFilters({
  searchQuery,
  selectedCategory,
  statusFilter,
  onSearchChange,
  onCategoryChange,
  onStatusFilterChange
}: BlogFiltersProps) {
  const { data: categoriesResponse } = useCategoryBlogQuery({
    page_index: 1,
    page_size: 99
  })
  const categories = categoriesResponse?.payload?.data || []

  return (
    <div className='grid grid-cols-4 gap-4'>
      <div className='relative flex-1 col-span-2'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Tìm kiếm bài viết...'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className='pl-9'
        />
      </div>

      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder='Danh mục' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả danh mục</SelectItem>
          {categories.map((category: any) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger>
          <SelectValue placeholder='Trạng thái' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả trạng thái</SelectItem>
          <SelectItem value='draft'>Bản nháp</SelectItem>
          <SelectItem value='published'>Đã xuất bản</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
