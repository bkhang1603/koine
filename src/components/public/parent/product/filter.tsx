'use client'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Accordion } from '@radix-ui/react-accordion'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { FilterIcon } from 'lucide-react'
import { CategoryProductsResType } from '@/schemaValidations/product.schema'

const formSchema = z.object({
  categories: z.array(z.string()),
  target: z.array(z.string()),
  range: z.coerce.number().min(0).max(1000000)
})

function Filter({ categories }: { categories: CategoryProductsResType['data'] }) {
  const router = useRouter()

  const [isFilterActive, setIsFilterActive] = useState(false)
  const [activeFilters, setActiveFilters] = useState(0)

  // Lấy các giá trị từ URL để set giá trị mặc định
  const getDefaultValues = () => {
    if (typeof window === 'undefined') {
      // Trên server-side, trả về giá trị mặc định
      return {
        categories: [],
        target: [],
        range: 500000
      }
    }

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

  // Sử dụng useWatch để theo dõi các giá trị form
  const watchedValues = useWatch({
    control: form.control,
    defaultValue: getDefaultValues()
  })

  // Tính toán số lượng bộ lọc đang được áp dụng
  useEffect(() => {
    let count = 0
    if (watchedValues.categories && watchedValues.categories.length > 0) count++
    if (watchedValues.target && watchedValues.target.length > 0) count++
    if (watchedValues.range !== 500000) count++

    setActiveFilters(count)

    // Nếu không có bộ lọc nào được áp dụng, hãy cập nhật trạng thái
    if (count === 0) {
      setIsFilterActive(false)
    }
  }, [watchedValues])

  // Thiết lập trạng thái filter dựa vào URL khi component được tải
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('category') || params.has('target') || params.has('range')) {
      setIsFilterActive(true)

      // Tính toán số lượng bộ lọc khi component được tải
      let count = 0
      if (params.has('category')) count++
      if (params.has('target')) count++
      if (params.has('range')) count++
      setActiveFilters(count)
    }
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const currentParams = new URLSearchParams(window.location.search)

    // Gán các giá trị từ form vào params nếu chúng có giá trị
    // Luôn set lại page_index = 1
    currentParams.set('page_index', '1')

    if (values.range && values.range !== 500000) {
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

    // Kiểm tra xem có bộ lọc nào được áp dụng không
    const hasFilters = values.categories.length > 0 || values.target.length > 0 || values.range !== 500000

    setIsFilterActive(hasFilters)

    // Cập nhật URL với các params mới
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
    setActiveFilters(0)
    router.push(window.location.pathname)
  }

  return (
    <div className='col-span-1'>
      <Form {...form}>
        <form className='border-2 border-gray-200 p-4 rounded-lg sticky top-28'>
          {/* Filter Status Banner */}
          {isFilterActive && (
            <div className='bg-primary/10 p-3 rounded-lg mb-4 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <FilterIcon className='w-4 h-4 text-primary' />
                <span className='text-sm font-medium'>Bộ lọc đã được áp dụng</span>
              </div>
              <Badge variant='outline' className='bg-white'>
                {activeFilters}
              </Badge>
            </div>
          )}

          <Accordion type='multiple' className='w-full' defaultValue={['item-1', 'item-2']}>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='hover:no-underline'>Thể loại</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name='categories'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='flex flex-col justify-center gap-3'>
                          {categories?.map((category) => (
                            <div key={category.id} className='flex items-center gap-3'>
                              <Checkbox
                                {...field}
                                id={category.id}
                                value={category.id}
                                checked={Array.isArray(field.value) && field.value.includes(category.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, category.id]
                                    : field.value.filter((val) => val !== category.id)
                                  field.onChange(newValue)
                                }}
                              />
                              <label htmlFor={category.id} className='cursor-pointer'>
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger className='hover:no-underline'>Đối tượng</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name='target'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='flex flex-col justify-center gap-3'>
                          <div className='flex items-center gap-3'>
                            <Checkbox
                              {...field}
                              id='girl'
                              value={'girl'}
                              checked={Array.isArray(field.value) && field.value.includes('girl')}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, 'girl']
                                  : field.value.filter((val) => val !== 'girl')
                                field.onChange(newValue)
                              }}
                            />
                            <label htmlFor='girl' className='cursor-pointer'>
                              Bé gái
                            </label>
                          </div>

                          <div className='flex items-center gap-3'>
                            <Checkbox
                              {...field}
                              id='boy'
                              value={'boy'}
                              checked={Array.isArray(field.value) && field.value.includes('boy')}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, 'boy']
                                  : field.value.filter((val) => val !== 'boy')
                                field.onChange(newValue)
                              }}
                            />
                            <label htmlFor='boy' className='cursor-pointer'>
                              Bé trai
                            </label>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <FormField
            control={form.control}
            name='range'
            render={({ field: { value, onChange } }) => (
              <FormItem className='mt-3'>
                <FormLabel>Giá tiền</FormLabel>
                <FormControl>
                  <Slider
                    className='cursor-pointer'
                    min={0}
                    max={1000000}
                    step={1000}
                    value={[value]}
                    onValueChange={(vals) => onChange(vals[0])}
                  />
                </FormControl>
                <FormDescription>Sản phẩm có giá từ 0 đến {value.toLocaleString('vi-VN')} VNĐ</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thêm nút "Bắt đầu lọc" - Giống MobileFilter */}
          <Button
            type='button'
            className='mt-6 w-full bg-primary hover:bg-primary/90 text-white'
            onClick={handleStartFiltering}
          >
            Bắt đầu lọc
          </Button>

          {/* Thêm nút "Đặt lại" - Giống MobileFilter */}
          {isFilterActive && (
            <Button variant='outline' className='mt-2 w-full' onClick={resetFilters} type='button'>
              Đặt lại
            </Button>
          )}
        </form>
      </Form>
    </div>
  )
}

export default Filter
