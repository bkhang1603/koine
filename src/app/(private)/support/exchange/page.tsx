'use client'

import { use, useMemo } from 'react'
import { useGetExchangeRequestsQuery } from '@/queries/useOrder'
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
import { GetExchangeRequestsResType } from '@/schemaValidations/admin.schema'
import { formatOrderStatus } from '@/lib/utils'

function ExchangeRequestsPage(props: { searchParams: SearchParams }) {
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
  } = useGetExchangeRequestsQuery({
    page_size: currentPageSize,
    page_index: currentPageIndex,
    status: currentStatus !== 'ALL' ? currentStatus : undefined
  })

  // Access through the payload structure with type assertion for type safety
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const exchangeRequests = (responseData as any)?.payload?.data || []
  const pagination = (responseData as any)?.payload?.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const message = (responseData as any)?.payload?.message || ''

  // Exchange status configuration for badge variants
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const exchangeStatusVariants = {
    EXCHANGE_REQUEST: 'default',
    EXCHANGING: 'warning',
    EXCHANGED: 'success',
    EXCHANGE_FAILED: 'destructive'
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
    { id: 3, name: 'Sản phẩm' },
    { id: 4, name: 'Phương thức TT' },
    { id: 5, name: 'Trạng thái' },
    { id: 6, name: '' }
  ]

  // Define a type for the exchange request item
  type ExchangeRequestItem = GetExchangeRequestsResType['payload']['data'][0]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (request: ExchangeRequestItem) => <span>{request.orderCode}</span>
      },
      {
        id: 2,
        render: (request: ExchangeRequestItem) => {
          const requestDate = request.exchangeRequestDate ? new Date(request.exchangeRequestDate) : new Date()
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
        render: (request: ExchangeRequestItem) => (
          <div className='space-y-0.5'>
            {request.orderDetails.map((detail) => (
              <div key={detail.id} className='text-sm'>
                {detail.itemName} ({detail.quantity})
              </div>
            ))}
          </div>
        )
      },
      {
        id: 4,
        render: (request: ExchangeRequestItem) => {
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
        render: (request: ExchangeRequestItem) => {
          const status = request.status
          const variant = exchangeStatusVariants[status as keyof typeof exchangeStatusVariants] || 'default'

          return <Badge variant={variant as any}>{formatOrderStatus(status)}</Badge>
        }
      },
      {
        id: 6,
        render: (request: ExchangeRequestItem) => (
          <MoreOptions
            item={{
              id: request.id,
              title: `Đơn đổi trả #${request.orderCode}`,
              status: request.status,
              slug: request.id
            }}
            itemType='order'
            onView={() => router.push(`/support/exchange/${request.id}`)}
          />
        )
      }
    ],
    [exchangeStatusVariants, paymentMethodConfig, router]
  )

  const tableData: dataListType = {
    data: exchangeRequests,
    message,
    pagination
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold'>Quản lý đổi trả</h1>
        <p className='text-muted-foreground mt-1'>Theo dõi và quản lý tất cả yêu cầu đổi trả sản phẩm</p>
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={configRoute.support.exchange}
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
              <SelectItem value='EXCHANGE_REQUEST'>Yêu cầu đổi trả</SelectItem>
              <SelectItem value='EXCHANGING'>Đang xử lý</SelectItem>
              <SelectItem value='EXCHANGED'>Đã đổi trả</SelectItem>
              <SelectItem value='EXCHANGE_FAILED'>Đổi trả thất bại</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  )
}

export default ExchangeRequestsPage
