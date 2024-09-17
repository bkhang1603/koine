import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

function CustomInput({ className, placeholder }: { className?: string; placeholder?: string }) {
  return (
    <div
      className={cn(
        'w-full flex items-center text-sm rounded-full ring-[1.5px] ring-gray-300 px-2 overflow-hidden',
        className
      )}
    >
      <Search className='h-5 w-5 text-gray-300' />
      <input type='text' placeholder={placeholder ?? 'Tìm kiếm...'} className='w-full p-2 outline-none' />
    </div>
  )
}

export default CustomInput
