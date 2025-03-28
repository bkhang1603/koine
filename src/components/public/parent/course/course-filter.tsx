'use client'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Accordion } from '@radix-ui/react-accordion'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useGetCategoryCoursesQuery } from '@/queries/useCourse'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  categories: z.array(z.string()),
  target: z.array(z.string()),
  price: z.coerce.number().min(0).max(1000000)
})

function CourseFilter() {
  const router = useRouter()

  const { data } = useGetCategoryCoursesQuery({
    page_index: 1,
    page_size: 99
  })
  const category = data?.payload.data ?? []

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
      target: [],
      price: 500000
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const currentParams = new URLSearchParams(window.location.search)

    // Gán các giá trị từ form vào params nếu chúng có giá trị
    if (values.price) {
      currentParams.set('range', values.price.toString())
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

    // Cập nhật URL với các params mới
    router.push(`${window.location.pathname}?${currentParams.toString()}`)
  }

  return (
    <div className='col-span-1'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='border-2 border-gray-200 p-4 rounded-lg sticky top-28'>
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
                          {category?.map((category) => (
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
                              <label htmlFor={category.id}>{category.name}</label>
                            </div>
                          ))}

                          {/* <div className='flex items-center gap-3'>
                            <Checkbox
                              {...field}
                              id='bestSeller'
                              value={'bestSeller'}
                              checked={Array.isArray(field.value) && field.value.includes('bestSeller')}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, 'bestSeller']
                                  : field.value.filter((val) => val !== 'bestSeller')
                                field.onChange(newValue)
                              }}
                            />
                            <label htmlFor='bestSeller'>Sản phẩm chạy nhất</label>
                          </div>

                          <div className='flex items-center gap-3'>
                            <Checkbox
                              {...field}
                              id='gift'
                              value={'gift'}
                              checked={Array.isArray(field.value) && field.value.includes('gift')}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, 'gift']
                                  : field.value.filter((val) => val !== 'gift')
                                field.onChange(newValue)
                              }}
                            />
                            <label htmlFor='gift'>Quà tặng</label>
                          </div>

                          <div className='flex items-center gap-3'>
                            <Checkbox
                              {...field}
                              id='souvenir'
                              value={'souvenir'}
                              checked={Array.isArray(field.value) && field.value.includes('souvenir')}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, 'souvenir']
                                  : field.value.filter((val) => val !== 'souvenir')
                                field.onChange(newValue)
                              }}
                            />
                            <label htmlFor='souvenir'>Quà lưu niệm</label>
                          </div>

                          <div className='flex items-center gap-3'>
                            <Checkbox
                              {...field}
                              id='retail'
                              value={'retail'}
                              checked={Array.isArray(field.value) && field.value.includes('retail')}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, 'retail']
                                  : field.value.filter((val) => val !== 'retail')
                                field.onChange(newValue)
                              }}
                            />
                            <label htmlFor='retail'>Sản phẩm lẻ</label>
                          </div>

                          <div className='flex items-center gap-3'>
                            <Checkbox
                              {...field}
                              id='wholesale'
                              value={'wholesale'}
                              checked={Array.isArray(field.value) && field.value.includes('wholesale')}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, 'wholesale']
                                  : field.value.filter((val) => val !== 'wholesale')
                                field.onChange(newValue)
                              }}
                            />
                            <label htmlFor='wholesale'>Sản phẩm theo &quot;Côm bồ&quot;</label>
                          </div> */}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
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
                            <label htmlFor='girl'>Bé gái</label>
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
                            <label htmlFor='boy'>Bé trai</label>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <FormField
            control={form.control}
            name='price'
            render={({ field: { value, onChange } }) => (
              <FormItem className='mt-3'>
                <FormLabel>Giá tiền</FormLabel>
                <FormControl>
                  <Slider
                    className='cursor-pointer'
                    min={0}
                    max={1000000}
                    step={1000}
                    defaultValue={[value]}
                    onValueChange={onChange}
                  />
                </FormControl>
                <FormDescription>Sản phẩm có giá từ 0 đến {value.toLocaleString()} VNĐ</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mt-10 w-full'>
            Tìm kiếm
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CourseFilter
