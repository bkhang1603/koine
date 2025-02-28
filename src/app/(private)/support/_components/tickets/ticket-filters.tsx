/* eslint-disable no-unused-vars */
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface TicketFiltersProps {
  onSearch: (value: string) => void
  onStatusChange: (value: string) => void
  onPriorityChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

export function TicketFilters({ onSearch, onStatusChange, onPriorityChange, onCategoryChange }: TicketFiltersProps) {
  return (
    <div className='flex gap-4 items-center'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
        <Input placeholder='Tìm kiếm ticket...' className='pl-9' onChange={(e) => onSearch(e.target.value)} />
      </div>
      <Select onValueChange={onStatusChange}>
        <SelectTrigger className='w-[160px]'>
          <SelectValue placeholder='Trạng thái' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả</SelectItem>
          <SelectItem value='pending'>Chờ xử lý</SelectItem>
          <SelectItem value='processing'>Đang xử lý</SelectItem>
          <SelectItem value='resolved'>Đã giải quyết</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={onPriorityChange}>
        <SelectTrigger className='w-[160px]'>
          <SelectValue placeholder='Độ ưu tiên' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả</SelectItem>
          <SelectItem value='high'>Cao</SelectItem>
          <SelectItem value='medium'>Trung bình</SelectItem>
          <SelectItem value='low'>Thấp</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className='w-[160px]'>
          <SelectValue placeholder='Danh mục' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả</SelectItem>
          <SelectItem value='technical'>Kỹ thuật</SelectItem>
          <SelectItem value='content'>Nội dung</SelectItem>
          <SelectItem value='billing'>Thanh toán</SelectItem>
          <SelectItem value='other'>Khác</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
