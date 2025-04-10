'use client'

import { Textarea } from '@/components/ui/textarea'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { CreateProductBodyType } from '@/schemaValidations/product.schema'
import RichTextEditor from '@/components/rich-text-editor'

interface ContentFieldProps {
  form: UseFormReturn<CreateProductBodyType>
  name: 'detail' | 'guide'
  label: string
  useRichText?: boolean
}

export function ContentField({ form, name, label, useRichText = false }: ContentFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {useRichText ? (
              <RichTextEditor
                content={field.value}
                onChange={field.onChange}
                placeholder={`Nhập ${label.toLowerCase()}...`}
              />
            ) : (
              <Textarea {...field} className='min-h-[200px]' placeholder={`Nhập ${label.toLowerCase()}...`} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
