'use client'

import { useEffect, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Slider } from '@/components/ui/slider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Badge } from '@/components/ui/badge'
import { FilterIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const formSchema = z.object({
  categories: z.array(z.string()).default([]),
  target: z.array(z.string()).default([]),
  price: z.coerce.number().min(0).max(1000000).default(500000)
})

// Dữ liệu demo cho danh mục khóa học
const courseCategories = [
  { id: 'featured', name: 'Khóa học nổi bật' },
  { id: 'beginners', name: 'Dành cho người mới' },
  { id: 'intermediate', name: 'Trung cấp' },
  { id: 'advanced', name: 'Nâng cao' },
  { id: 'parents', name: 'Dành cho phụ huynh' }
]

// Dữ liệu demo cho đối tượng
const targetAudience = [
  { id: 'children', name: 'Trẻ em' },
  { id: 'teens', name: 'Thiếu niên' },
  { id: 'parents', name: 'Phụ huynh' },
  { id: 'educators', name: 'Nhà giáo dục' }
]

export function CourseMobileFilter() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isFilterActive, setIsFilterActive] = useState(false)

  // Lấy các giá trị từ URL để set giá trị mặc định
  const getDefaultValues = () => {
    if (typeof window === 'undefined') return { categories: [], target: [], price: 500000 }

    const params = new URLSearchParams(window.location.search)
    const categoryParam = params.get('categories')
    const targetParam = params.get('target')
    const priceParam = params.get('price')

    return {
      categories: categoryParam ? categoryParam.split(',') : [],
      target: targetParam ? targetParam.split(',') : [],
      price: priceParam ? parseInt(priceParam) : 500000
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
    if (values.price !== 500000) count++
    return count
  }

  // Thiết lập trạng thái filter dựa vào URL khi component được tải
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('categories') || params.has('target') || params.has('price')) {
      setIsFilterActive(true)
    }
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const currentParams = new URLSearchParams(window.location.search)

    if (values.price && values.price !== 500000) {
      currentParams.set('price', values.price.toString())
    } else {
      currentParams.delete('price')
    }

    if (values.categories && values.categories.length > 0) {
      currentParams.set('categories', values.categories.join(','))
    } else {
      currentParams.delete('categories')
    }

    if (values.target && values.target.length > 0) {
      currentParams.set('target', values.target.join(','))
    } else {
      currentParams.delete('target')
    }

    setIsFilterActive(true)
    setIsOpen(false)
    router.push(`${window.location.pathname}?${currentParams.toString()}`)
  }

  const handleStartFiltering = () => {
    form.handleSubmit(onSubmit)()
  }

  const resetFilters = () => {
    form.reset({
      categories: [],
      target: [],
      price: 500000
    })
    setIsFilterActive(false)
    router.push(window.location.pathname)
    setIsOpen(false)
  }

  // Hàm kiểm tra xem một giá trị có trong mảng không
  const isValueInArray = (array: string[] | undefined, value: string) => {
    if (!array) return false
    return array.includes(value)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          className='flex items-center justify-center w-full gap-2 py-5 border-dashed border-primary/30 hover:border-primary/70 hover:bg-primary/5 transition-all shadow-sm'
        >
          <FilterIcon className='h-4 w-4 text-primary' />
          <span className='font-medium'>Lọc khóa học</span>
        </Button>
      </SheetTrigger>

      <SheetContent side='bottom' className='p-0 h-[85vh] pb-12'>
        <SheetHeader className='px-4 pt-4'>
          <SheetTitle>Bộ lọc khóa học</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='h-full flex flex-col'>
            <ScrollArea className='flex-1'>
              <div className='space-y-6 p-4'>
                {/* Filter Status Banner */}
                {isFilterActive && (
                  <div className='bg-primary/10 p-3 rounded-lg mb-4 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <FilterIcon className='w-4 h-4 text-primary' />
                      <span className='text-sm font-medium'>Bộ lọc đã được áp dụng</span>
                    </div>
                    <Badge variant='outline' className='bg-white'>
                      {activeFilterCount()}
                    </Badge>
                  </div>
                )}

                {/* Categories */}
                <FormField
                  control={form.control}
                  name='categories'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-semibold'>Thể loại</FormLabel>
                      <FormControl>
                        <div className='grid grid-cols-2 gap-2 mt-2'>
                          {courseCategories.map((category) => {
                            const isChecked = isValueInArray(field.value, category.id)

                            return (
                              <div key={`category-${category.id}`} className='relative'>
                                <button
                                  type='button'
                                  onClick={() => {
                                    const currentValue = [...(field.value || [])]
                                    const index = currentValue.indexOf(category.id)

                                    if (index === -1) {
                                      // Thêm vào nếu chưa có
                                      field.onChange([...currentValue, category.id])
                                    } else {
                                      // Loại bỏ nếu đã có
                                      currentValue.splice(index, 1)
                                      field.onChange(currentValue)
                                    }
                                  }}
                                  className={`w-full px-3 py-2 text-sm border rounded-lg cursor-pointer transition-colors
                                    ${
                                      isChecked
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-transparent text-gray-700 hover:bg-muted'
                                    }`}
                                >
                                  {category.name}
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Target Audience */}
                <FormField
                  control={form.control}
                  name='target'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-semibold'>Đối tượng</FormLabel>
                      <FormControl>
                        <div className='grid grid-cols-2 gap-2 mt-2'>
                          {targetAudience.map((item) => {
                            const isChecked = isValueInArray(field.value, item.id)

                            return (
                              <div key={`target-${item.id}`} className='relative'>
                                <button
                                  type='button'
                                  onClick={() => {
                                    const currentValue = [...(field.value || [])]
                                    const index = currentValue.indexOf(item.id)

                                    if (index === -1) {
                                      // Thêm vào nếu chưa có
                                      field.onChange([...currentValue, item.id])
                                    } else {
                                      // Loại bỏ nếu đã có
                                      currentValue.splice(index, 1)
                                      field.onChange(currentValue)
                                    }
                                  }}
                                  className={`w-full px-3 py-2 text-sm border rounded-lg cursor-pointer transition-colors
                                    ${
                                      isChecked
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-transparent text-gray-700 hover:bg-muted'
                                    }`}
                                >
                                  {item.name}
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Price Range */}
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel className='text-base font-semibold'>Giá khóa học</FormLabel>
                      <FormControl>
                        <div className='space-y-4 mt-2'>
                          <Slider
                            min={0}
                            max={1000000}
                            step={10000}
                            value={[value]}
                            onValueChange={(vals) => onChange(vals[0])}
                          />
                          <div className='text-sm text-muted-foreground text-center'>
                            0đ - {value.toLocaleString()}đ
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>Hiển thị khóa học có giá tối đa {value.toLocaleString()}đ</FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <div className='p-4 border-t bg-background'>
              {/* Nút "Bắt đầu lọc" */}
              <Button
                type='button'
                className='w-full mb-3 bg-primary hover:bg-primary/90 text-white'
                onClick={handleStartFiltering}
              >
                Bắt đầu lọc
              </Button>

              <div className='flex gap-2'>
                <Button variant='outline' className='flex-1' onClick={resetFilters} type='button'>
                  Đặt lại
                </Button>
                <SheetClose asChild>
                  <Button className='flex-1'>Đóng</Button>
                </SheetClose>
              </div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
