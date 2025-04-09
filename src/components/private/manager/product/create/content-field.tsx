'use client'

import { Textarea } from '@/components/ui/textarea'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { CreateProductBodyType } from '@/schemaValidations/product.schema'

interface ContentFieldProps {
  form: UseFormReturn<CreateProductBodyType>
  name: 'detail' | 'guide'
  label: string
}

export function ContentField({ form, name, label }: ContentFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} className='min-h-[200px]' placeholder={`Nhập ${label.toLowerCase()}...`} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
