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
import { updateQuestionBody } from '@/schemaValidations/admin.schema'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2, AlertCircle } from 'lucide-react'
import { FormField, FormItem, FormControl, FormMessage, Form, FormLabel } from '@/components/ui/form'
import { z } from 'zod'
import { useEffect } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Question {
  id: string
  content: string
  options: {
    id?: string
    optionData: string
    isCorrect: boolean
  }[]
}

interface EditQuestionDialogProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: z.infer<typeof updateQuestionBody>, id: string) => void
  question: Question | null
  isLoading: boolean
}

export function EditQuestionDialog({ open, onOpenChange, onSubmit, question, isLoading }: EditQuestionDialogProps) {
  const form = useForm<z.infer<typeof updateQuestionBody>>({
    resolver: zodResolver(updateQuestionBody),
    defaultValues: {
      content: '',
      options: [
        { optionData: '', isCorrect: false },
        { optionData: '', isCorrect: false }
      ]
    },
    mode: 'onChange'
  })

  // eslint-disable-next-line no-unused-vars
  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'options'
  })

  useEffect(() => {
    if (question) {
      try {
        form.reset({
          content: question.content,
          options: Array.isArray(question.options)
            ? question.options.map((option) => ({
                optionData: option.optionData || '',
                isCorrect: !!option.isCorrect
              }))
            : [
                { optionData: '', isCorrect: false },
                { optionData: '', isCorrect: false }
              ]
        })
      } catch (error) {
        console.error('Error resetting form:', error)
        // Set default values if there's an error
        form.reset({
          content: question.content || '',
          options: [
            { optionData: '', isCorrect: false },
            { optionData: '', isCorrect: false }
          ]
        })
      }
    }
  }, [question, form])

  const addOption = () => {
    append({ optionData: '', isCorrect: false })
  }

  const removeOption = (index: number) => {
    if (fields.length > 2) {
      remove(index)
    }
  }

  const handleSubmit = form.handleSubmit((data) => {
    if (question) {
      onSubmit(data, question.id)
    }
  })

  const formErrors = form.formState.errors

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa câu hỏi</DialogTitle>
          <DialogDescription>Chỉnh sửa nội dung và đáp án của câu hỏi</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nội dung câu hỏi</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Nhập nội dung câu hỏi...' {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {formErrors.options && formErrors.options.message && (
                <Alert variant='destructive' className='mt-2'>
                  <AlertCircle className='h-4 w-4' />
                  <AlertDescription>{formErrors.options.message as string}</AlertDescription>
                </Alert>
              )}

              <div className='space-y-2'>
                <Label>Các lựa chọn</Label>
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
                <Button type='button' variant='outline' size='sm' onClick={addOption} disabled={fields.length >= 10}>
                  Thêm lựa chọn
                </Button>
                {fields.length >= 10 && (
                  <p className='text-sm text-muted-foreground mt-1'>Đã đạt số lượng lựa chọn tối đa (10)</p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
