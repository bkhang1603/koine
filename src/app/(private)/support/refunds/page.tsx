'use client'

import { use, useMemo } from 'react'
import { useGetRefundRequestsQuery } from '@/queries/useOrder'
import { TableCustom, dataListType } from '@/components/table-custom'
import configRoute from '@/config/route'
import { SearchParams } from '@/types/query'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { MoreOptions } from '@/components/private/common/more-options'
import { DollarSign } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GetRefundRequestsResType } from '@/schemaValidations/admin.schema'
import { formatOrderStatus } from '@/lib/utils'

function RefundRequestsPage(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const router = useRouter()

  const currentStatus = (searchParams.status as string) || 'ALL'
  const currentPageSize = Number(searchParams.page_size) || 10
  const currentPageIndex = Number(searchParams.page_index) || 1

  const {
    data: responseData,
    isLoading,
    // eslint-disable-next-line no-unused-vars
    error
  } = useGetRefundRequestsQuery({
    page_size: currentPageSize,
    page_index: currentPageIndex,
    status: currentStatus !== 'ALL' ? currentStatus : undefined
  })

  // Access through the payload structure with type assertion for type safety
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refundRequests = (responseData as any)?.payload?.data || []
  const pagination = (responseData as any)?.payload?.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const message = (responseData as any)?.payload?.message || ''

  // Refund status configuration for badge variants
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refundStatusVariants = {
    REFUND_REQUEST: 'default',
    REFUNDING: 'warning',
    REFUNDED: 'success',
    REFUND_FAILED: 'destructive'
  } as const

  // Payment method configuration
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const paymentMethodConfig = {
    COD: { label: 'Thanh toán khi nhận hàng', icon: DollarSign },
    BANKING: { label: 'Chuyển khoản', icon: DollarSign }
  } as const

  // Table column configuration
  const headerColumn = [
    { id: 1, name: 'Mã đơn hàng' },
    { id: 2, name: 'Ngày yêu cầu' },
    { id: 3, name: 'Số tiền hoàn' },
    { id: 4, name: 'Phương thức TT' },
    { id: 5, name: 'Trạng thái' },
    { id: 6, name: '' }
  ]

  // Define a type for the refund request item
  type RefundRequestItem = GetRefundRequestsResType['payload']['data'][0]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (request: RefundRequestItem) => <span>{request.orderCode}</span>
      },
      {
        id: 2,
        render: (request: RefundRequestItem) => {
          const requestDate = request.refundRequestDate ? new Date(request.refundRequestDate) : new Date()
          return (
            <div className='space-y-0.5'>
              <div className='text-sm font-medium'>{format(requestDate, 'dd/MM/yyyy', { locale: vi })}</div>
              <div className='text-xs text-muted-foreground'>{format(requestDate, 'HH:mm', { locale: vi })}</div>
            </div>
          )
        }
      },
      {
        id: 3,
        render: (request: RefundRequestItem) => (
          <div className='space-y-0.5'>
            <div>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(request.totalAmount)}
            </div>
          </div>
        )
      },
      {
        id: 4,
        render: (request: RefundRequestItem) => {
          const method = request.payment.payMethod
          const config = paymentMethodConfig[method as keyof typeof paymentMethodConfig] || {
            label: method,
            icon: DollarSign
          }
          const Icon = config.icon

          return (
            <div className='flex items-center gap-1.5'>
              <Icon className='w-4 h-4 text-muted-foreground' />
              <span className='text-sm'>{config.label}</span>
            </div>
          )
        }
      },
      {
        id: 5,
        render: (request: RefundRequestItem) => {
          const status = request.status
          const variant = refundStatusVariants[status as keyof typeof refundStatusVariants] || 'default'

          return <Badge variant={variant as any}>{formatOrderStatus(status)}</Badge>
        }
      },
      {
        id: 6,
        render: (request: RefundRequestItem) => (
          <MoreOptions
            item={{
              id: request.id,
              title: `Đơn hoàn tiền #${request.orderCode}`,
              status: request.status,
              slug: request.id
            }}
            itemType='order'
            onView={() => router.push(`/support/refunds/${request.id}`)}
          />
        )
      }
    ],
    [refundStatusVariants, paymentMethodConfig, router]
  )

  const tableData: dataListType = {
    data: refundRequests,
    message,
    pagination
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold'>Quản lý hoàn tiền</h1>
        <p className='text-muted-foreground mt-1'>Theo dõi và quản lý tất cả yêu cầu hoàn tiền</p>
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.support.refund}
        loading={isLoading}
        showSearch={false}
        filterComponent={
          <Select
            value={currentStatus}
            onValueChange={(value) => {
              const params = new URLSearchParams(searchParams as Record<string, string>)
              if (value === 'ALL') {
                params.delete('status')
              } else {
                params.set('status', value)
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
              <SelectItem value='REFUND_REQUEST'>Yêu cầu hoàn tiền</SelectItem>
              <SelectItem value='REFUNDING'>Đang xử lý</SelectItem>
              <SelectItem value='REFUNDED'>Đã hoàn tiền</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  )
}

export default RefundRequestsPage
