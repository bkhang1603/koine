'use client'

import { MobileFilter } from '@/components/public/parent/product/mobile-filter'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import React from 'react'

function ProductSort() {
  const router = useRouter()

  const handleSortChange = (value: string) => {
    const currentParams = new URLSearchParams(window.location.search)
    currentParams.set('sort', value)
    router.push(`${window.location.pathname}?${currentParams.toString()}`)
  }

  return (
    <div className='flex items-center gap-2 w-full md:w-auto'>
      <Select onValueChange={handleSortChange}>
        <SelectTrigger className='w-[150px] focus:ring-0'>
          <SelectValue placeholder='Sắp xếp theo' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='pa'>Giá thấp đến cao</SelectItem>
          <SelectItem value='pd'>Giá cao đến thấp</SelectItem>
          <SelectItem value='na'>Từ A đến Z</SelectItem>
          <SelectItem value='nd'>Từ Z đến A</SelectItem>
        </SelectContent>
      </Select>

      <div className='md:hidden'>
        <MobileFilter />
      </div>
    </div>
  )
}

export default ProductSort
