import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface FAQFiltersProps {
  onSearch: (value: string) => void
  onCategoryChange: (value: string) => void
}

export function FAQFilters({ onSearch, onCategoryChange }: FAQFiltersProps) {
  return (
    <div className='flex gap-4 items-center'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
        <Input placeholder='Tìm kiếm câu hỏi...' className='pl-9' onChange={(e) => onSearch(e.target.value)} />
      </div>
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Danh mục' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả</SelectItem>
          <SelectItem value='account'>Tài khoản</SelectItem>
          <SelectItem value='billing'>Thanh toán</SelectItem>
          <SelectItem value='courses'>Khóa học</SelectItem>
          <SelectItem value='technical'>Kỹ thuật</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 