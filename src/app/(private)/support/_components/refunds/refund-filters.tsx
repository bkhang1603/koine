/* eslint-disable no-unused-vars */
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface RefundFiltersProps {
  onSearch: (value: string) => void
  onStatusChange: (value: string) => void
  onTypeChange: (value: string) => void
}

export function RefundFilters({ onSearch, onStatusChange, onTypeChange }: RefundFiltersProps) {
  return (
    <div className='flex gap-4 items-center'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
        <Input placeholder='Tìm kiếm yêu cầu...' className='pl-9' onChange={(e) => onSearch(e.target.value)} />
      </div>
      <Select onValueChange={onStatusChange}>
        <SelectTrigger className='w-[160px]'>
          <SelectValue placeholder='Trạng thái' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả</SelectItem>
          <SelectItem value='pending'>Chờ duyệt</SelectItem>
          <SelectItem value='approved'>Đã duyệt</SelectItem>
          <SelectItem value='rejected'>Từ chối</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={onTypeChange}>
        <SelectTrigger className='w-[160px]'>
          <SelectValue placeholder='Loại hoàn tiền' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả</SelectItem>
          <SelectItem value='course'>Khóa học</SelectItem>
          <SelectItem value='product'>Sản phẩm</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
