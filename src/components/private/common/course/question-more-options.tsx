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
import { Edit, MoreHorizontal, Trash, Eye } from 'lucide-react'
import { useState, useRef } from 'react'

interface QuestionType {
  id: string
  content: string
  numCorrect: number
  questionOptions: any[]
  createdAt: string
}

interface QuestionMoreOptionsProps {
  question: QuestionType
  onView?: () => void
  onUpdate?: () => void
  onDelete?: () => void
}

// eslint-disable-next-line no-unused-vars
export function QuestionMoreOptions({ question, onView, onUpdate, onDelete }: QuestionMoreOptionsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  // Reference to the button for restoring focus
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleDelete = () => {
    setIsDropdownOpen(false)
    // Use setTimeout to ensure dropdown closes properly before showing alert
    setTimeout(() => setShowDeleteAlert(true), 100)
  }

  const handleCloseAlert = () => {
    setShowDeleteAlert(false)
    // Return focus to the button after closing
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.focus()
      }
    }, 200)
  }

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete()
    }
    handleCloseAlert()
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            ref={buttonRef}
            className='focus-visible:ring-0'
            variant='ghost'
            size='icon'
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' onClick={(e) => e.stopPropagation()}>
          {onView && (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsDropdownOpen(false)
                onView()
              }}
            >
              <Eye className='w-4 h-4 mr-2' />
              Xem chi tiết
            </DropdownMenuItem>
          )}

          {onUpdate && (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsDropdownOpen(false)
                onUpdate()
              }}
            >
              <Edit className='w-4 h-4 mr-2' />
              Cập nhật
            </DropdownMenuItem>
          )}

          {onDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleDelete()
                }}
                className='text-red-600'
                onSelect={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                }}
              >
                <Trash className='w-4 h-4 mr-2' />
                Xóa
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={showDeleteAlert}
        onOpenChange={(open) => {
          if (!open) handleCloseAlert()
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Câu hỏi sẽ bị xóa vĩnh viễn khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className='focus-visible:ring-0'
              onClick={(e) => {
                e.stopPropagation()
                handleCloseAlert()
              }}
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.stopPropagation()
                handleConfirmDelete()
              }}
              className='bg-destructive hover:bg-destructive/90'
            >
              <Trash className='w-4 h-4 mr-2' />
              Xóa câu hỏi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
