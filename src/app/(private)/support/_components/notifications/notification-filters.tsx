/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface NotificationFiltersProps {
  onSearch: (value: string) => void
  onTypeChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export function NotificationFilters({ onSearch, onTypeChange, onStatusChange }: NotificationFiltersProps) {
  return (
    <div className='flex gap-4 items-center'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
        <Input placeholder='Tìm kiếm thông báo...' className='pl-9' onChange={(e) => onSearch(e.target.value)} />
      </div>
      <Select onValueChange={onTypeChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Loại thông báo' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả</SelectItem>
          <SelectItem value='ticket'>Tickets</SelectItem>
          <SelectItem value='refund'>Hoàn tiền</SelectItem>
          <SelectItem value='review'>Đánh giá</SelectItem>
          <SelectItem value='alert'>Cảnh báo</SelectItem>
          <SelectItem value='success'>Thành công</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={onStatusChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Trạng thái' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Tất cả</SelectItem>
          <SelectItem value='unread'>Chưa đọc</SelectItem>
          <SelectItem value='read'>Đã đọc</SelectItem>
        </SelectContent>
      </Select>
      <Button variant='outline'>Đánh dấu tất cả đã đọc</Button>
    </div>
  )
}
