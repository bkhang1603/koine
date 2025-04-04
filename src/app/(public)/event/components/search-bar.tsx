'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchBarProps {
  initialValue?: string
}

export function SearchBar({ initialValue = '' }: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(initialValue)
  const debouncedValue = useDebounce(searchValue, 500) // 500ms debounce

  // Cập nhật URL khi giá trị tìm kiếm thay đổi (sau debounce)
  useEffect(() => {
    // Tạo searchParams mới từ các params hiện tại
    const params = new URLSearchParams(searchParams.toString())

    // Cập nhật hoặc xóa param q dựa trên giá trị tìm kiếm
    if (debouncedValue) {
      params.set('q', debouncedValue)
    } else {
      params.delete('q')
    }

    // Tạo URL mới và điều hướng
    const newUrl = `${pathname}?${params.toString()}`
    router.push(newUrl, { scroll: false })
  }, [debouncedValue, router, pathname, searchParams])

  return (
    <div className='flex-1 relative'>
      <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder='Tìm kiếm sự kiện...'
        className='pl-10'
      />
    </div>
  )
}
