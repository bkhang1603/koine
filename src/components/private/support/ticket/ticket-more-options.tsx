'use client'

import { MoreHorizontal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useCallback, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import userApiRequest from '@/apiRequests/user'

interface TicketMoreOptionsProps {
  ticket: {
    id: string
    content: string
    isResolve: boolean
  }
}

export function TicketMoreOptions({ ticket }: TicketMoreOptionsProps) {
  const [open, setOpen] = useState(false)
  const [resolveContent, setResolveContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const queryClient = useQueryClient()

  const handleResolveClick = useCallback(() => {
    setIsDropdownOpen(false) // Close dropdown first
    setOpen(true)
  }, [])

  const handleConfirm = useCallback(async () => {
    if (!resolveContent.trim()) return

    try {
      setIsLoading(true)
      await userApiRequest.updateRequestSupport(ticket.id, {
        isResolve: true,
        resolveContent: resolveContent
      })

      // Invalidate query to refresh data
      queryClient.invalidateQueries({
        queryKey: ['request-support-list']
      })

      toast({
        description: 'Yêu cầu hỗ trợ đã được xử lý'
      })

      setResolveContent('')
      setOpen(false)
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setIsLoading(false)
    }
  }, [ticket.id, resolveContent, queryClient])

  const handleDialogChange = useCallback(
    (newState: boolean) => {
      // Don't allow closing the dialog while loading
      if (isLoading && !newState) return
      setOpen(newState)

      // Reset the form if dialog is closed
      if (!newState) {
        setResolveContent('')
      }
    },
    [isLoading]
  )

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0 focus-visible:ring-0'>
            <span className='sr-only'>Mở menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={handleResolveClick}
            onSelect={(event) => {
              event.preventDefault()
            }}
          >
            Xử lý yêu cầu
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Xử lý yêu cầu hỗ trợ</DialogTitle>
            <DialogDescription>Điền nội dung phản hồi để xử lý yêu cầu hỗ trợ này.</DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='ticket-content'>Nội dung yêu cầu</Label>
              <div className='p-3 bg-gray-50 dark:bg-gray-900 rounded-md text-sm'>{ticket.content}</div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='resolve-content'>Nội dung phản hồi</Label>
              <Textarea
                id='resolve-content'
                placeholder='Nhập nội dung phản hồi...'
                value={resolveContent}
                onChange={(e) => setResolveContent(e.target.value)}
                className='min-h-[100px]'
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => !isLoading && handleDialogChange(false)} disabled={isLoading}>
              Hủy
            </Button>
            <Button type='submit' onClick={handleConfirm} disabled={isLoading || !resolveContent.trim()}>
              {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
