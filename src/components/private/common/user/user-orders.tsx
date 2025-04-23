'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, DollarSign } from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useGetAdminOrdersQuery } from '@/queries/useOrder'
import { TableCustom, dataListType } from '@/components/table-custom'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { MoreOptions } from '@/components/private/common/more-options'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMemo } from 'react'

interface UserOrdersProps {
  userId: string
  pageSize?: number
  href: string
  containerClassName?: string
  title?: string
  initialPage?: number
  showFilter?: boolean
}

export function UserOrders({
  userId,
  pageSize = 5,
  href = '/admin/order',
  containerClassName = 'mt-8',
  title = 'Lịch sử đơn hàng',
  initialPage = 1,
  showFilter = true
}: UserOrdersProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentStatus = (searchParams.get('status') as string) || 'ALL'
  const currentKeyword = (searchParams.get('keyword') as string) || ''
  const currentPageSize = Number(searchParams.get('page_size')) || pageSize
  const currentPageIndex = Number(searchParams.get('page_index')) || initialPage

  const { data: responseData, isLoading } = useGetAdminOrdersQuery(
    currentPageSize,
    currentPageIndex,
    currentKeyword,
    currentStatus === 'ALL' ? undefined : currentStatus,
    userId
  )

  const orders = responseData?.payload.data.orders || []
  const pagination = responseData?.payload.pagination || {
    pageSize: 0,
    totalItem: 0,
    currentPage: 0,
    totalPage: 0,
    maxPageSize: 0
  }
  const message = responseData?.payload.message || ''

  // Cấu hình màu sắc và nhãn cho trạng thái
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const orderStatusConfig = {
    PROCESSING: { label: 'Đang xử lý', variant: 'default' },
    DELIVERING: { label: 'Đang giao', variant: 'primary' },
    COMPLETED: { label: 'Hoàn thành', variant: 'secondary' },
    CANCELLED: { label: 'Đã hủy', variant: 'destructive' },
    REFUND_REQUEST: { label: 'Hoàn tiền', variant: 'destructive' }
  } as const

  // Cấu hình phương thức thanh toán
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const paymentMethodConfig = {
    COD: { label: 'Thanh toán khi nhận hàng', icon: DollarSign },
    BANKING: { label: 'Chuyển khoản', icon: DollarSign }
  } as const

  // Cấu hình cột cho bảng
  const headerColumn = [
    { id: 1, name: 'Mã đơn hàng' },
    { id: 2, name: 'Thời gian' },
    { id: 3, name: 'Tổng tiền' },
    { id: 4, name: 'Phương thức TT' },
    { id: 5, name: 'Trạng thái' },
    { id: 6, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (order: any) => <span>{order.orderCode}</span>
      },
      {
        id: 2,
        render: (order: any) => {
          const orderDate = new Date(order.orderDate)
          return (
            <div className='space-y-0.5'>
              <div className='text-sm font-medium'>{format(orderDate, 'dd/MM/yyyy', { locale: vi })}</div>
              <div className='text-xs text-muted-foreground'>{format(orderDate, 'HH:mm', { locale: vi })}</div>
            </div>
          )
        }
      },
      {
        id: 3,
        render: (order: any) => (
          <div className='space-y-0.5'>
            <div>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
            </div>
            {order.deliAmount > 0 && (
              <div className='text-xs text-muted-foreground'>
                Phí ship:{' '}
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.deliAmount)}
              </div>
            )}
          </div>
        )
      },
      {
        id: 4,
        render: (order: any) => {
          const method = order.paymentMethod
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
        render: (order: any) => {
          const status = order.status
          const config = orderStatusConfig[status as keyof typeof orderStatusConfig] || {
            label: status,
            variant: 'default'
          }

          return <Badge variant={config.variant as any}>{config.label}</Badge>
        }
      },
      {
        id: 6,
        render: (order: any) => {
          // Extract the role from the current pathname
          const role = pathname.split('/')[1]
          const orderDetailUrl = `/${role}/order/${order.id}`

          return (
            <MoreOptions
              item={{
                id: order.id,
                title: order.orderCode,
                status: order.status,
                slug: order.id
              }}
              itemType='order'
              onView={() => router.push(orderDetailUrl)}
            />
          )
        }
      }
    ],
    [orderStatusConfig, paymentMethodConfig, router, pathname]
  )

  const tableData: dataListType = {
    data: orders,
    message,
    pagination
  }

  return (
    <div className={containerClassName}>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Package className='w-5 h-5' />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <TableCustom
            data={tableData}
            headerColumn={headerColumn}
            bodyColumn={bodyColumn}
            href={href}
            loading={isLoading}
            showSearch={false}
            filterComponent={
              showFilter ? (
                <Select
                  value={currentStatus}
                  onValueChange={(value) => {
                    const params = new URLSearchParams(searchParams.toString())
                    if (value === 'ALL') {
                      params.delete('status')
                    } else {
                      params.set('status', value)
                    }
                    params.set('page_index', '1')
                    router.replace(`${pathname}?${params.toString()}`)
                  }}
                >
                  <SelectTrigger className='w-full sm:w-[180px]'>
                    <SelectValue placeholder='Trạng thái' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='ALL'>Tất cả</SelectItem>
                    <SelectItem value='PENDING'>Chờ xử lý</SelectItem>
                    <SelectItem value='PROCESSING'>Đang xử lý</SelectItem>
                    <SelectItem value='DELIVERING'>Đang giao</SelectItem>
                    <SelectItem value='COMPLETED'>Hoàn thành</SelectItem>
                    <SelectItem value='CANCELLED'>Đã hủy</SelectItem>
                    <SelectItem value='FAILED_PAYMENT'>Thanh toán thất bại</SelectItem>
                    <SelectItem value='RETURN_REQUEST'>Yêu cầu trả hàng</SelectItem>
                  </SelectContent>
                </Select>
              ) : undefined
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
