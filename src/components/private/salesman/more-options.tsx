'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Edit, MoreHorizontal, Tags, Trash, Eye } from 'lucide-react'

interface MoreOptionsProps {
  type: 'product' | 'course' | 'promotion' | 'order' | 'customer'
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function MoreOptions({ type, onView, onEdit, onDelete }: MoreOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {onView && (
          <DropdownMenuItem onClick={onView}>
            <Eye className='w-4 h-4 mr-2' />
            Xem chi tiết
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Edit className='w-4 h-4 mr-2' />
            Chỉnh sửa
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem onClick={onDelete} className='text-red-600'>
            <Trash className='w-4 h-4 mr-2' />
            Xóa
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
