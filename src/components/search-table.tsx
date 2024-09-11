'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useDebounceCallback } from 'usehooks-ts'

import { Input } from '@/components/ui/input'

function SearchTable() {
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

  return (
    <div className='w-[400px]'>
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

export default SearchTable
