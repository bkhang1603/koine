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

const formSchema = z.object({
  categories: z.array(z.string()),
  target: z.array(z.string()),
  price: z.number().min(0).max(1000000)
})

function Filter() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
      target: [],
      price: 100000
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          <div className='flex items-center gap-3'>
                            <Checkbox
                              {...field}
                              id='course'
                              value={'course'}
                              checked={Array.isArray(field.value) && field.value.includes('course')}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, 'course']
                                  : field.value.filter((val) => val !== 'course')
                                field.onChange(newValue)
                              }}
                            />
                            <label htmlFor='course'>Khóa học</label>
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
                              id='parent'
                              value={'parent'}
                              checked={Array.isArray(field.value) && field.value.includes('parent')}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, 'parent']
                                  : field.value.filter((val) => val !== 'parent')
                                field.onChange(newValue)
                              }}
                            />
                            <label htmlFor='parent'>Phụ huynh</label>
                          </div>

                          <div className='flex items-center gap-3'>
                            <Checkbox
                              {...field}
                              id='student'
                              value={'student'}
                              checked={Array.isArray(field.value) && field.value.includes('student')}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, 'student']
                                  : field.value.filter((val) => val !== 'student')
                                field.onChange(newValue)
                              }}
                            />
                            <label htmlFor='student'>Học sinh</label>
                          </div>

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
                            <label htmlFor='girl'>Con gái</label>
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
                            <label htmlFor='boy'>Con trai</label>
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
                  <Slider min={0} max={1000000} step={1000} defaultValue={[value]} onValueChange={onChange} />
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

export default Filter
