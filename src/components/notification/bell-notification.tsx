import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Bell } from 'lucide-react'

function BellNotification() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className='rounded-full bg-gray-50 w-10 h-10 flex justify-center
    items-center text-primary cursor-pointer'
        >
          <Bell />
        </div>
      </PopoverTrigger>
      <PopoverContent>Thông báo</PopoverContent>
    </Popover>
  )
}

export default BellNotification
