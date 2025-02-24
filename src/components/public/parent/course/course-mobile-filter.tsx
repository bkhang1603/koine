'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Filter } from 'lucide-react'

const formSchema = z.object({
  categories: z.array(z.string()),
  target: z.array(z.string()),
  price: z.coerce.number().min(0).max(1000000)
})

export function CourseMobileFilter() {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
      target: [],
      price: 500000
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2 text-gray-500 hover:text-gray-500'>
          <Filter className='h-4 w-4' />
          Lọc
        </Button>
      </SheetTrigger>
      <SheetContent side='bottom' className='h-[80vh] overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Bộ lọc</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Thể loại</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name='categories'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='space-y-2'>
                            {['bestSeller', 'gift', 'souvenir', 'retail', 'wholesale'].map((category) => (
                              <div key={category} className='flex items-center space-x-2'>
                                <Checkbox
                                  id={category}
                                  checked={field.value?.includes(category)}
                                  onCheckedChange={(checked) => {
                                    const updatedCategories = checked
                                      ? [...field.value, category]
                                      : field.value?.filter((value) => value !== category)
                                    field.onChange(updatedCategories)
                                  }}
                                />
                                <label
                                  htmlFor={category}
                                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                >
                                  {category === 'bestSeller'
                                    ? 'Sản phẩm chạy nhất'
                                    : category === 'gift'
                                      ? 'Quà tặng'
                                      : category === 'souvenir'
                                        ? 'Quà lưu niệm'
                                        : category === 'retail'
                                          ? 'Sản phẩm lẻ'
                                          : 'Sản phẩm theo "Côm bồ"'}
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
                <AccordionTrigger>Đối tượng</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name='target'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='space-y-2'>
                            {['girl', 'boy'].map((target) => (
                              <div key={target} className='flex items-center space-x-2'>
                                <Checkbox
                                  id={target}
                                  checked={field.value?.includes(target)}
                                  onCheckedChange={(checked) => {
                                    const updatedTargets = checked
                                      ? [...field.value, target]
                                      : field.value?.filter((value) => value !== target)
                                    field.onChange(updatedTargets)
                                  }}
                                />
                                <label
                                  htmlFor={target}
                                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                >
                                  {target === 'girl' ? 'Bé gái' : 'Bé trai'}
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
            </Accordion>

            <FormField
              control={form.control}
              name='price'
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Giá tiền</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={1000000}
                      step={1000}
                      value={[value]}
                      onValueChange={(vals) => onChange(vals[0])}
                      className='w-full'
                    />
                  </FormControl>
                  <FormDescription>Sản phẩm có giá từ 0 đến {value.toLocaleString()} VNĐ</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              Áp dụng bộ lọc
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
