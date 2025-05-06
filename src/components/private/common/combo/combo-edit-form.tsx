'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useComboUpdateMutation } from '@/queries/useCombo'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { updateComboBodySchema, UpdateComboBodyType } from '@/schemaValidations/admin.schema'
import { handleErrorApi } from '@/lib/utils'

interface ComboEditFormProps {
  comboId: string
  defaultValues: UpdateComboBodyType
  baseUrl: string
}

export function ComboEditForm({ comboId, defaultValues, baseUrl }: ComboEditFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const updateComboMutation = useComboUpdateMutation(comboId)

  const form = useForm<UpdateComboBodyType>({
    resolver: zodResolver(updateComboBodySchema),
    defaultValues
  })

  const onSubmit = async (values: UpdateComboBodyType) => {
    try {
      setIsSubmitting(true)
      await updateComboMutation.mutateAsync(values)

      toast({
        description: 'Combo đã được cập nhật thành công'
      })

      router.push(`${baseUrl}/${comboId}`)
    } catch (error) {
      handleErrorApi({ error, setError: form.setError })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên combo</FormLabel>
              <FormControl>
                <Input placeholder='Nhập tên combo' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả combo</FormLabel>
              <FormControl>
                <Textarea placeholder='Nhập mô tả combo' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá combo</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Nhập giá combo'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end gap-3 mt-8'>
          <Button type='button' variant='outline' onClick={() => router.push(`${baseUrl}/${comboId}`)}>
            Hủy
          </Button>
          <Button type='submit' disabled={isSubmitting || updateComboMutation.isPending}>
            {(isSubmitting || updateComboMutation.isPending) && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Cập nhật combo
          </Button>
        </div>
      </form>
    </Form>
  )
}
