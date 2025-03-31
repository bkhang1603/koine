'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SlidersHorizontal } from 'lucide-react'
import Filter from './filter'

function MobileFilter() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='sm' className='w-full gap-2 bg-white'>
          <SlidersHorizontal className='w-4 h-4' />
          Bộ lọc
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-[300px] p-0'>
        <SheetHeader className='p-4 border-b'>
          <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
        </SheetHeader>
        <div className='p-4 overflow-y-auto max-h-[calc(100vh-80px)]'>
          <Filter />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileFilter
