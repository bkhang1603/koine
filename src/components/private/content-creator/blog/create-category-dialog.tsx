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
import { useState, useEffect } from 'react'

interface CategoryFormData {
  name: string
  description: string
}

interface CreateCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: {
    id: string
    name: string
    description: string
  }
  onSubmit: (data: CategoryFormData) => Promise<void>
  isLoading: boolean
}

export function CreateCategoryDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isLoading
}: CreateCategoryDialogProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description
      })
    } else {
      setFormData({
        name: '',
        description: ''
      })
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</DialogTitle>
          <DialogDescription>
            {initialData ? 'Cập nhật thông tin danh mục' : 'Thêm danh mục mới cho blog'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label>Tên danh mục</Label>
              <Input
                placeholder='Nhập tên danh mục'
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label>Mô tả</Label>
              <Textarea
                placeholder='Nhập mô tả cho danh mục'
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Đang xử lý...' : initialData ? 'Cập nhật' : 'Thêm danh mục'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
