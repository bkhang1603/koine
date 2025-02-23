import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface UserFiltersProps {
  onSearch: (value: string) => void
  onStatusChange: (value: string) => void
  onRoleChange: (value: string) => void
}

export function UserFilters({ onSearch, onStatusChange, onRoleChange }: UserFiltersProps) {
  return (
    <div className='flex gap-4 items-center'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
        <Input placeholder='Tìm kiếm người dùng...' className='pl-9' onChange={(e) => onSearch(e.target.value)} />
      </div>
      <Select onValueChange={onStatusChange}>
        <SelectTrigger className='w-[160px]'>
          <SelectValue placeholder='Trạng thái' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả</SelectItem>
          <SelectItem value='active'>Đang hoạt động</SelectItem>
          <SelectItem value='inactive'>Không hoạt động</SelectItem>
          <SelectItem value='blocked'>Đã khóa</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={onRoleChange}>
        <SelectTrigger className='w-[160px]'>
          <SelectValue placeholder='Vai trò' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả</SelectItem>
          <SelectItem value='parent'>Phụ huynh</SelectItem>
          <SelectItem value='student'>Học sinh</SelectItem>
          <SelectItem value='teacher'>Giáo viên</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 