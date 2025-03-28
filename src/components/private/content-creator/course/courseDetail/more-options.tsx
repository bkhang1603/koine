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
import { Edit, MoreHorizontal, Trash, Eye, MessageSquare, Globe, Plus } from 'lucide-react'
import { useState } from 'react'

interface BlogType {
  id: string
  title: string
  status: string
  slug: string
  // other properties...
}

interface MoreOptionsProps {
  blog: BlogType
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onManageComments?: () => void
  onPreview?: () => void
  onAddChapter?: () => void
  buttonVariant?: 'default' | 'dropdownLight'
}

export function MoreOptions({
  blog,
  onView,
  onEdit,
  onDelete,
  onManageComments,
  onPreview,
  onAddChapter,
  buttonVariant = 'default'
}: MoreOptionsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDelete = () => {
    setIsDropdownOpen(false)
    setShowDeleteAlert(true)
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          {buttonVariant === 'dropdownLight' ? (
            <Button
              className='focus-visible:ring-0 text-white bg-white/20 hover:bg-white/30 border-white/30'
              variant='outline'
              size='sm'
            >
              <MoreHorizontal className='w-4 h-4' />
            </Button>
          ) : (
            <Button className='focus-visible:ring-0' variant='ghost' size='icon'>
              <MoreHorizontal className='w-4 h-4' />
            </Button>
          )}
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
          {onPreview && (
            <DropdownMenuItem onClick={onPreview}>
              <Globe className='w-4 h-4 mr-2' />
              Xem trước
            </DropdownMenuItem>
          )}
          {onAddChapter && (
            <DropdownMenuItem onClick={onAddChapter}>
              <Plus className='w-4 h-4 mr-2' />
              Thêm chương mới
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
                  // Ngăn chặn đóng dropdown menu tự động
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
              Hành động này không thể hoàn tác. Khóa học sẽ bị xóa vĩnh viễn khỏi hệ thống.
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
              Xóa khóa học
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
