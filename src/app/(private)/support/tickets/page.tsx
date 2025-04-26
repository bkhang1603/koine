'use client'

import { use, useMemo, useState } from 'react'
import { Mail, Phone, User } from 'lucide-react'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { MoreOptions } from '@/components/private/common/more-options'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRequestSupportListQuery, useUpdateRequestSupportMutation } from '@/queries/useUser'
import { toast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { handleErrorApi } from '@/lib/utils'

// Dialog component for resolving tickets
function ResolveTicketDialog({
  ticket,
  open,
  onOpenChange
}: {
  ticket: any
  open: boolean
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void
}) {
  const [resolveContent, setResolveContent] = useState('')
  const updateMutation = useUpdateRequestSupportMutation()
  const isLoading = updateMutation.isPending

  const handleResolve = (courseId: string, resolveContent: string) => {
    try {
      if (updateMutation.isPending) return

      updateMutation.mutate(
        {
          id: ticket.id,
          body: {
            isResolve: true,
            resolveContent
          }
        },
        {
          onSuccess: () => {
            toast({
              description: 'Yêu cầu hỗ trợ đã được xử lý'
            })
            setResolveContent('')
            onOpenChange(false)
          },
          onError: (error) => {
            handleErrorApi({ error })
          }
        }
      )
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Xử lý yêu cầu hỗ trợ</DialogTitle>
          <DialogDescription>Điền nội dung phản hồi để xử lý yêu cầu hỗ trợ này.</DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='ticket-content'>Nội dung yêu cầu</Label>
            <div className='p-3 bg-gray-50 dark:bg-gray-900 rounded-md text-sm'>{ticket?.content}</div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='resolve-content'>Nội dung phản hồi</Label>
            <Textarea
              id='resolve-content'
              placeholder='Nhập nội dung phản hồi...'
              value={resolveContent}
              onChange={(e) => setResolveContent(e.target.value)}
              className='min-h-[100px]'
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            type='submit'
            onClick={() => handleResolve(ticket.id, resolveContent)}
            disabled={isLoading || !resolveContent.trim()}
          >
            {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function SupportTickets(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false)

  const currentIsResolve = (searchParams.is_resolve as string) || 'ALL'
  const currentKeyword = (searchParams.keyword as string) || ''
  const currentPageSize = Number(searchParams.page_size) || 10
  const currentPageIndex = Number(searchParams.page_index) || 1

  const {
    data: responseData,
    isLoading,
    // eslint-disable-next-line no-unused-vars
    error
  } = useRequestSupportListQuery({
    page_index: currentPageIndex,
    page_size: currentPageSize,
    keyword: currentKeyword,
    isResolve: currentIsResolve === 'ALL' ? undefined : currentIsResolve === 'RESOLVED'
  })

  const tickets = responseData?.payload.data || []

  const pagination = responseData?.payload.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const message = responseData?.payload.message || ''

  // Cấu hình trạng thái
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resolveStatusConfig = {
    true: { label: 'Đã xử lý', variant: 'secondary' },
    false: { label: 'Chưa xử lý', variant: 'destructive' }
  } as const

  // Handle resolving a ticket
  const handleResolveTicket = (ticket: any) => {
    setSelectedTicket(ticket)
    setResolveDialogOpen(true)
  }

  // Cấu hình cột cho bảng
  const headerColumn = [
    { id: 1, name: 'Tên người gửi' },
    { id: 2, name: 'Email' },
    { id: 3, name: 'Số điện thoại' },
    { id: 4, name: 'Thời gian tạo' },
    { id: 5, name: 'Nội dung' },
    { id: 6, name: 'Trạng thái' },
    { id: 7, name: 'Nội dung phản hồi' },
    { id: 8, name: '' }
  ]

  const bodyColumn = useMemo(
    () =>
      [
        {
          id: 1,
          render: (ticket: any) => (
            <div className='flex items-center gap-1.5'>
              <User className='w-3.5 h-3.5 text-muted-foreground' />
              {ticket.isGuestRequest ? (
                <span className='text-sm font-medium'>{ticket.guestInfo.name}</span>
              ) : (
                <span>User ID: {ticket.objectId || 'N/A'}</span>
              )}
            </div>
          )
        },
        {
          id: 2,
          render: (ticket: any) =>
            ticket.isGuestRequest ? (
              <div className='flex items-center gap-1.5'>
                <Mail className='w-3.5 h-3.5 text-muted-foreground' />
                <span className='text-xs'>{ticket.guestInfo.email}</span>
              </div>
            ) : (
              <span className='text-muted-foreground text-xs'>-</span>
            )
        },
        {
          id: 3,
          render: (ticket: any) =>
            ticket.isGuestRequest ? (
              <div className='flex items-center gap-1.5'>
                <Phone className='w-3.5 h-3.5 text-muted-foreground' />
                <span className='text-xs'>{ticket.guestInfo.phone}</span>
              </div>
            ) : (
              <span className='text-muted-foreground text-xs'>-</span>
            )
        },
        {
          id: 4,
          render: (ticket: any) => {
            const createdDate = new Date(ticket.createdAt)
            return (
              <div className='space-y-0.5'>
                <div className='text-sm font-medium'>{format(createdDate, 'dd/MM/yyyy', { locale: vi })}</div>
                <div className='text-xs text-muted-foreground'>{format(createdDate, 'HH:mm', { locale: vi })}</div>
              </div>
            )
          }
        },
        {
          id: 5,
          render: (ticket: any) => (
            <div className='max-w-xs truncate' title={ticket.content}>
              {ticket.content}
            </div>
          )
        },
        {
          id: 6,
          render: (ticket: any) => {
            const isResolved = ticket.isResolve.toString()
            const config = resolveStatusConfig[isResolved as keyof typeof resolveStatusConfig] || {
              label: isResolved ? 'Đã xử lý' : 'Chưa xử lý',
              variant: 'default'
            }
            return <Badge variant={config.variant as any}>{config.label}</Badge>
          }
        },
        {
          id: 7,
          render: (ticket: any) => (
            <div className='max-w-xs truncate' title={ticket.resolveContent || 'Không có nội dung'}>
              {ticket.resolveContent ? ticket.resolveContent : 'Không có nội dung'}
            </div>
          )
        },
        {
          id: 8,
          render: (ticket: any) =>
            !ticket.isResolve ? (
              <MoreOptions item={ticket} itemType='ticket' onResolve={() => handleResolveTicket(ticket)} />
            ) : null
        }
      ] as any,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resolveStatusConfig, router]
  )

  const tableData: dataListType = {
    data: tickets,
    message,
    pagination
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold'>Quản lý yêu cầu hỗ trợ</h1>
        <p className='text-muted-foreground mt-1'>Theo dõi và xử lý các yêu cầu hỗ trợ từ người dùng</p>
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.support.tickets}
        loading={isLoading}
        showSearch={true}
        searchParamName='keyword'
        searchPlaceholder='Tìm kiếm yêu cầu...'
        filterComponent={
          <Select
            value={currentIsResolve}
            onValueChange={(value) => {
              const params = new URLSearchParams(searchParams as Record<string, string>)
              if (value === 'ALL') {
                params.delete('is_resolve')
              } else {
                params.set('is_resolve', value)
              }
              params.set('page_index', '1')
              router.replace(`${window.location.pathname}?${params.toString()}`)
            }}
          >
            <SelectTrigger className='w-full sm:w-[180px]'>
              <SelectValue placeholder='Trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ALL'>Tất cả</SelectItem>
              <SelectItem value='RESOLVED'>Đã xử lý</SelectItem>
              <SelectItem value='UNRESOLVED'>Chưa xử lý</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      {/* Resolve Dialog */}
      {selectedTicket && (
        <ResolveTicketDialog
          ticket={selectedTicket}
          open={resolveDialogOpen}
          onOpenChange={(open) => {
            setResolveDialogOpen(open)
            if (!open) {
              setTimeout(() => setSelectedTicket(null), 300)
            }
          }}
        />
      )}
    </div>
  )
}

export default SupportTickets
