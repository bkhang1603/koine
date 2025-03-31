'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Edit, MoreHorizontal, Trash, Eye, MessageSquare, Globe } from 'lucide-react'
import { useState } from 'react'

interface ItemType {
  id: string
  title: string
  status: string
  slug: string
  // other properties...
}

interface MoreOptionsProps {
  item: ItemType
  itemType: 'blog' | 'category' | 'course' | 'order' | 'user' // Loại item để hiển thị đúng text
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onManageComments?: () => void
  onPreview?: () => void
}

export function MoreOptions({
  item,
  itemType,
  onView,
  onEdit,
  onDelete,
  onManageComments,
  onPreview
}: MoreOptionsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDelete = () => {
    setIsDropdownOpen(false)
    setShowDeleteAlert(true)
  }

  // Map hiển thị text tương ứng với từng loại
  const deleteTexts = {
    blog: 'Bài viết',
    category: 'Danh mục',
    course: 'Khóa học',
    order: 'Đơn hàng',
    user: 'Người dùng'
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button className='focus-visible:ring-0' variant='ghost' size='icon'>
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
          {onPreview && item.status === 'VISIBLE' && (
            <DropdownMenuItem onClick={onPreview}>
              <Globe className='w-4 h-4 mr-2' />
              Xem trên trang
            </DropdownMenuItem>
          )}

          {onManageComments && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onManageComments}>
                <MessageSquare className='w-4 h-4 mr-2' />
                Quản lý bình luận
              </DropdownMenuItem>
            </>
          )}

          {onDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDelete}
                className='text-red-600'
                onSelect={(event) => {
                  event.preventDefault()
                }}
              >
                <Trash className='w-4 h-4 mr-2' />
                Xóa
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. {deleteTexts[itemType]} sẽ bị xóa vĩnh viễn khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='focus-visible:ring-0'>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete?.()
                setShowDeleteAlert(false)
              }}
              className='bg-destructive hover:bg-destructive/90'
            >
              <Trash className='w-4 h-4 mr-2' />
              Xóa {deleteTexts[itemType]}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
