'use client'

import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounceCallback } from 'usehooks-ts'

function CustomInput({ className, placeholder }: { className?: string; placeholder?: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChange = useDebounceCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page_index', '1')
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 200)

  return (
    <div
      className={cn(
        'w-full flex items-center text-sm rounded-full ring-[1.5px] ring-gray-300 px-2 overflow-hidden',
        className
      )}
    >
      <Search className='h-5 w-5 text-gray-300' />
      <input
        type='text'
        placeholder={placeholder ?? 'Tìm kiếm...'}
        className='w-full p-2 outline-none bg-white'
        defaultValue={searchParams.get('search')?.toString()}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}

export default CustomInput
