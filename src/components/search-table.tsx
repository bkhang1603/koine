'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounceCallback } from 'usehooks-ts'

import { Input } from '@/components/ui/input'

function SearchTable({ className, type }: { className?: string; type?: 'debounce' | 'enter' }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  // I want to hold 5 seconds before sending the request
  const handleChange = useDebounceCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page_index', '1')
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 500)

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      const params = new URLSearchParams(searchParams)
      params.set('page_index', '1')
      if (event.currentTarget.value) {
        params.set('search', event.currentTarget.value)
      } else {
        params.delete('search')
      }
      replace(`${pathname}?${params.toString()}`)
    }
  }

  if (type === 'debounce') {
    return (
      <div className={`w-[400px] ${className}`}>
        <Input
          type='search'
          placeholder='Tìm kiếm...'
          className='rounded-lg'
          defaultValue={searchParams.get('search')?.toString()}
          onChange={(e) => {
            handleChange(e.target.value)
          }}
          name='search'
        />
      </div>
    )
  } else if (type === 'enter') {
    return (
      <div className={`w-[400px] ${className}`}>
        <Input
          type='search'
          placeholder='Tìm kiếm...'
          className='rounded-lg'
          onKeyDown={handleKeyDown}
          defaultValue={searchParams.get('search')?.toString()}
          name='search'
        />
      </div>
    )
  } else {
    return (
      <div className={`w-[400px] ${className}`}>
        <Input
          type='search'
          placeholder='Tìm kiếm...'
          className='rounded-lg'
          defaultValue={searchParams.get('search')?.toString()}
          onChange={(e) => {
            handleChange(e.target.value)
          }}
          name='search'
        />
      </div>
    )
  }
}

export default SearchTable
