'use client'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useRouter } from 'next/navigation'
import { useGetCategoryProductsQuery } from '@/queries/useProduct'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { FilterIcon, SlidersHorizontal } from 'lucide-react'
import Filter from './filter'

const formSchema = z.object({
  categories: z.array(z.string()).default([]),
  target: z.array(z.string()).default([]),
  range: z.coerce.number().min(0).max(1000000).default(500000)
})

function MobileFilter() {
  const router = useRouter()
  const { data } = useGetCategoryProductsQuery()
  const categories = data?.payload.data
  const [isFilterActive, setIsFilterActive] = useState(false)

  // Lấy các giá trị từ URL để set giá trị mặc định
  const getDefaultValues = () => {
    if (typeof window === 'undefined') return { categories: [], target: [], range: 500000 }

    const params = new URLSearchParams(window.location.search)
    const categoryParam = params.get('category')
    const targetParam = params.get('target')
    const rangeParam = params.get('range')

    return {
      categories: categoryParam ? categoryParam.split(',') : [],
      target: targetParam ? targetParam.split(',') : [],
      range: rangeParam ? parseInt(rangeParam) : 500000
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues()
  })

  // Tính toán số lượng bộ lọc đang được áp dụng
  const activeFilterCount = () => {
    const values = form.getValues()
    let count = 0
    if (values.categories && values.categories.length > 0) count++
    if (values.target && values.target.length > 0) count++
    if (values.range !== 500000) count++
    return count
  }

  // Thiết lập trạng thái filter dựa vào URL khi component được tải
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('category') || params.has('target') || params.has('range')) {
      setIsFilterActive(true)
    }
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const currentParams = new URLSearchParams(window.location.search)

    if (values.range) {
      currentParams.set('range', values.range.toString())
    } else {
      currentParams.delete('range')
    }
    if (values.categories && values.categories.length > 0) {
      currentParams.set('category', values.categories.join(','))
    } else {
      currentParams.delete('category')
    }
    if (values.target && values.target.length > 0) {
      currentParams.set('target', values.target.join(','))
    } else {
      currentParams.delete('target')
    }

    setIsFilterActive(true)
    router.push(`${window.location.pathname}?${currentParams.toString()}`)
  }

  const handleStartFiltering = () => {
    form.handleSubmit(onSubmit)()
  }

  const resetFilters = () => {
    form.reset({
      categories: [],
      target: [],
      range: 500000
    })
    setIsFilterActive(false)
    router.push(window.location.pathname)
  }

  // Hàm kiểm tra xem một giá trị có trong mảng không
  const isValueInArray = (array: string[] | undefined, value: string) => {
    if (!array) return false
    return array.includes(value)
  }

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
