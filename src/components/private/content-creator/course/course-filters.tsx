/* eslint-disable no-unused-vars */
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface CourseFiltersProps {
  searchQuery: string
  selectedCategory: string
  ageFilter: string
  statusFilter: string
  priceFilter: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onAgeFilterChange: (value: string) => void
  onStatusFilterChange: (value: string) => void
  onPriceFilterChange: (value: string) => void
}

export function CourseFilters({
  searchQuery,
  selectedCategory,
  ageFilter,
  statusFilter,
  priceFilter,
  onSearchChange,
  onCategoryChange,
  onAgeFilterChange,
  onStatusFilterChange,
  onPriceFilterChange
}: CourseFiltersProps) {
  return (
    <div className='grid grid-cols-5 gap-4'>
      <div className='relative flex-1 col-span-2'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Tìm kiếm khóa học...'
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
          {/* {courseCategories.map((category: any) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))} */}
        </SelectContent>
      </Select>

      <Select value={ageFilter} onValueChange={onAgeFilterChange}>
        <SelectTrigger>
          <SelectValue placeholder='Độ tuổi' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả độ tuổi</SelectItem>
          <SelectItem value='6-8 tuổi'>6-8 tuổi</SelectItem>
          <SelectItem value='9-11 tuổi'>9-11 tuổi</SelectItem>
          <SelectItem value='12-14 tuổi'>12-14 tuổi</SelectItem>
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

      <Select value={priceFilter} onValueChange={onPriceFilterChange}>
        <SelectTrigger>
          <SelectValue placeholder='Giá' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả giá</SelectItem>
          <SelectItem value='free'>Miễn phí</SelectItem>
          <SelectItem value='paid'>Có giá</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
