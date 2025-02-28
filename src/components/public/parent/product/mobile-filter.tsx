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
import { SheetClose } from '@/components/ui/sheet'

const formSchema = z.object({
  categories: z.array(z.string()),
  target: z.array(z.string()),
  range: z.coerce.number().min(0).max(1000000)
})

function MobileFilter() {
  const router = useRouter()
  const { data } = useGetCategoryProductsQuery()
  const categories = data?.payload.data

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
      target: [],
      range: 500000
    }
  })

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

    router.push(`${window.location.pathname}?${currentParams.toString()}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='h-full flex flex-col'>
        <ScrollArea className='flex-1'>
          <div className='space-y-6 p-4'>
            {/* Categories */}
            <FormField
              control={form.control}
              name='categories'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-semibold'>Thể loại</FormLabel>
                  <FormControl>
                    <div className='grid grid-cols-2 gap-2 mt-2'>
                      {categories?.map((category) => (
                        <div key={category.id} className='relative'>
                          <input
                            type='checkbox'
                            id={category.id}
                            value={category.id}
                            checked={field.value?.includes(category.id)}
                            onChange={(e) => {
                              const checked = e.target.checked
                              const value = e.target.value
                              const newValue = checked
                                ? [...(field.value || []), value]
                                : (field.value || []).filter((val) => val !== value)
                              field.onChange(newValue)
                            }}
                            className='peer sr-only'
                          />
                          <label
                            htmlFor={category.id}
                            className='flex items-center justify-center px-3 py-2 text-sm border rounded-lg cursor-pointer
                              peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary
                              hover:bg-muted transition-colors'
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator />

            {/* Target */}
            <FormField
              control={form.control}
              name='target'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-semibold'>Đối tượng</FormLabel>
                  <FormControl>
                    <div className='grid grid-cols-2 gap-2 mt-2'>
                      {[
                        { id: 'girl', label: 'Bé gái' },
                        { id: 'boy', label: 'Bé trai' }
                      ].map((item) => (
                        <div key={item.id} className='relative'>
                          <input
                            type='checkbox'
                            id={item.id}
                            value={item.id}
                            checked={field.value?.includes(item.id)}
                            onChange={(e) => {
                              const checked = e.target.checked
                              const value = e.target.value
                              const newValue = checked
                                ? [...(field.value || []), value]
                                : (field.value || []).filter((val) => val !== value)
                              field.onChange(newValue)
                            }}
                            className='peer sr-only'
                          />
                          <label
                            htmlFor={item.id}
                            className='flex items-center justify-center px-3 py-2 text-sm border rounded-lg cursor-pointer
                              peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary
                              hover:bg-muted transition-colors'
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator />

            {/* Price Range */}
            <FormField
              control={form.control}
              name='range'
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel className='text-base font-semibold'>Giá tiền</FormLabel>
                  <FormControl>
                    <div className='space-y-4 mt-2'>
                      <Slider min={0} max={1000000} step={1000} defaultValue={[value]} onValueChange={onChange} />
                      <div className='text-sm text-muted-foreground text-center'>0đ - {value.toLocaleString()}đ</div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>

        <div className='p-4 border-t bg-background'>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              className='flex-1'
              onClick={() => {
                form.reset()
                router.push(window.location.pathname)
              }}
            >
              Đặt lại
            </Button>
            <SheetClose asChild>
              <Button type='submit' className='flex-1'>
                Áp dụng
              </Button>
            </SheetClose>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default MobileFilter
