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
import { Loader2, Trash } from 'lucide-react'

type DeleteCategoryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isLoading: boolean
}

export function DeleteCategoryDialog({ open, onOpenChange, onConfirm, isLoading }: DeleteCategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Xác nhận xóa danh mục</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa danh mục này không? Hành động này không thể hoàn tác và có thể ảnh hưởng đến các
            khóa học đang sử dụng danh mục này.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type='button' variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading}>
            Hủy
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={onConfirm}
            disabled={isLoading}
            className='bg-destructive hover:bg-destructive/90'
          >
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            <Trash className='w-4 h-4 mr-2' />
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
