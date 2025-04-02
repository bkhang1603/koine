'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import configRoute from '@/config/route'

interface MoreOptionsProps {
  type: string
  onView: () => void
  productId: string
}

export function MoreOptions({ type, onView, productId }: MoreOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={onView}>
          <Eye className='mr-2 h-4 w-4' />
          Xem chi tiết
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`${configRoute.admin.productEdit}/${productId}`}>
            <Edit className='mr-2 h-4 w-4' />
            Chỉnh sửa
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='text-red-600'>
          <Trash className='mr-2 h-4 w-4' />
          Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
