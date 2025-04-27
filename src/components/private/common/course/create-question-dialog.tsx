'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createQuestionBody } from '@/schemaValidations/admin.schema'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2 } from 'lucide-react'
import { FormField, FormItem, FormControl, FormMessage, Form } from '@/components/ui/form'
import { z } from 'zod'

interface CreateQuestionDialogProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: z.infer<typeof createQuestionBody>) => void
  isLoading: boolean
}

export function CreateQuestionDialog({ open, onOpenChange, onSubmit, isLoading }: CreateQuestionDialogProps) {
  const form = useForm<z.infer<typeof createQuestionBody>>({
    resolver: zodResolver(createQuestionBody),
    defaultValues: {
      content: '',
      options: [
        { optionData: '', isCorrect: false },
        { optionData: '', isCorrect: false }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options'
  })

  const addOption = () => {
    append({ optionData: '', isCorrect: false })
  }

  const removeOption = (index: number) => {
    if (fields.length > 2) {
      remove(index)
    }
  }

  const handleSubmit = form.handleSubmit((data) => {
    const hasAtLeastOneCorrect = data.options.some((option) => option.isCorrect)

    if (!hasAtLeastOneCorrect) {
      form.setError('options', {
        type: 'manual',
        message: 'Phải có ít nhất một đáp án đúng'
      })
      return
    }

    onSubmit(data)
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Tạo câu hỏi mới</DialogTitle>
          <DialogDescription>Thêm câu hỏi trắc nghiệm mới vào hệ thống</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='content'>Nội dung câu hỏi</Label>
                <Textarea id='content' placeholder='Nhập nội dung câu hỏi...' {...form.register('content')} rows={3} />
                {form.formState.errors.content && (
                  <p className='text-sm text-red-500'>{form.formState.errors.content.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label>Các lựa chọn</Label>
                {form.formState.errors.options && (
                  <p className='text-sm text-red-500'>{form.formState.errors.options.message as string}</p>
                )}
                <div className='space-y-3'>
                  {fields.map((field, index) => (
                    <div key={field.id} className='flex items-start gap-2'>
                      <FormField
                        control={form.control}
                        name={`options.${index}.isCorrect`}
                        render={({ field }) => (
                          <FormItem className='flex items-center space-x-2 space-y-0 mt-2'>
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`options.${index}.optionData`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormControl>
                              <Input placeholder={`Lựa chọn ${index + 1}`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        onClick={() => removeOption(index)}
                        disabled={fields.length <= 2}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button type='button' variant='outline' size='sm' onClick={addOption}>
                  Thêm lựa chọn
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Đang tạo...' : 'Tạo câu hỏi'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
