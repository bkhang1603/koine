'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Clock, Calendar, AlertTriangle, Wallet, Banknote, RefreshCw, XCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useGetRefundOrders } from '@/queries/useOrder'
import { Skeleton } from '@/components/ui/skeleton'
import { format, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

// Map trạng thái đơn hàng sang style và text
const statusColorMap: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  COMPLETED: 'bg-emerald-100 text-emerald-800',
  CANCELLED: 'bg-gray-100 text-gray-800'
}

const statusTextMap: Record<string, string> = {
  PENDING: 'Chờ xử lý',
  PROCESSING: 'Đang xử lý',
  APPROVED: 'Đã duyệt',
  REJECTED: 'Đã từ chối',
  COMPLETED: 'Hoàn thành',
  CANCELLED: 'Đã hủy'
}

const statusIconMap: Record<string, React.ReactNode> = {
  PENDING: <Clock className='h-4 w-4' />,
  PROCESSING: <RefreshCw className='h-4 w-4' />,
  APPROVED: <Wallet className='h-4 w-4' />,
  REJECTED: <XCircle className='h-4 w-4' />,
  COMPLETED: <Banknote className='h-4 w-4' />,
  CANCELLED: <AlertTriangle className='h-4 w-4' />
}

export default function RefundPage() {
  // Trạng thái cho tìm kiếm và lọc
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  // Trạng thái cho phân trang
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Lấy dữ liệu từ API
  const { data, isLoading, error } = useGetRefundOrders({ page_size: 50, page_index: 1 })

  // Xử lý dữ liệu và lọc
  const refundOrders = useMemo(() => {
    if (!data?.payload?.data) return []

    let filteredData = [...data.payload.data]

    // Lọc theo từ khóa tìm kiếm
    if (search.trim()) {
      filteredData = filteredData.filter((order) => order.orderCode.toLowerCase().includes(search.toLowerCase()))
    }

    // Lọc theo trạng thái
    if (status !== 'all') {
      filteredData = filteredData.filter((order) => order.orderStatus === status)
    }

    return filteredData
  }, [data?.payload?.data, search, status])

  // Tính toán dữ liệu cho phân trang
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return refundOrders.slice(startIndex, startIndex + pageSize)
  }, [refundOrders, currentPage])

  // Tính tổng số trang
  const totalPages = useMemo(() => {
    return Math.ceil(refundOrders.length / pageSize)
  }, [refundOrders])

  // Tạo mảng số trang cho phân trang
  const pageNumbers = useMemo(() => {
    let pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Hiển thị tất cả các trang nếu tổng số trang ít
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Hiển thị một phần các trang nếu có nhiều trang
      if (currentPage <= 3) {
        // Đang ở những trang đầu
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
      } else if (currentPage >= totalPages - 2) {
        // Đang ở những trang cuối
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Đang ở giữa
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i)
        }
      }
    }

    return pages
  }, [currentPage, totalPages])

  // Xử lý chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Format ngày tháng
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy', { locale: vi })
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold'>Hoàn tiền & Đổi trả</h1>
        <p className='text-muted-foreground mt-1'>Quản lý yêu cầu hoàn tiền và đổi trả của bạn</p>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Tìm kiếm theo mã đơn hàng...'
            className='pl-9'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1) // Reset về trang 1 khi thay đổi tìm kiếm
            }}
          />
        </div>
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value)
            setCurrentPage(1) // Reset về trang 1 khi thay đổi bộ lọc
          }}
        >
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả trạng thái</SelectItem>
            <SelectItem value='PENDING'>Chờ xử lý</SelectItem>
            <SelectItem value='PROCESSING'>Đang xử lý</SelectItem>
            <SelectItem value='APPROVED'>Đã duyệt</SelectItem>
            <SelectItem value='REJECTED'>Đã từ chối</SelectItem>
            <SelectItem value='COMPLETED'>Hoàn thành</SelectItem>
            <SelectItem value='CANCELLED'>Đã hủy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Refund Orders List */}
      <div className='space-y-4'>
        {isLoading ? (
          // Skeleton loader khi đang tải
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className='overflow-hidden'>
              <CardContent className='p-6'>
                <div className='flex flex-col gap-6'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-2'>
                      <Skeleton className='h-5 w-40' />
                      <Skeleton className='h-4 w-64' />
                    </div>
                    <Skeleton className='h-10 w-10 rounded-full' />
                  </div>
                  <Separator />
                  <div className='space-y-3'>
                    <Skeleton className='h-4 w-32' />
                    <div className='flex gap-4 p-4 rounded-lg bg-muted/30'>
                      <Skeleton className='w-16 h-16 rounded-lg' />
                      <div className='flex-1'>
                        <Skeleton className='h-4 w-24 mb-2' />
                        <Skeleton className='h-5 w-48 mb-2' />
                        <Skeleton className='h-4 w-16' />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <Skeleton className='h-4 w-56' />
                    <Skeleton className='h-6 w-24' />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : error ? (
          // Hiển thị lỗi nếu có
          <div className='text-center py-14 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-dashed border-gray-200'>
            <div className='flex flex-col items-center'>
              <AlertTriangle className='h-12 w-12 text-red-400 mb-3' />
              <h3 className='text-lg font-medium text-gray-800 mb-2'>Có lỗi xảy ra</h3>
              <p className='text-sm text-gray-500 max-w-md'>Không thể tải dữ liệu hoàn tiền. Vui lòng thử lại sau.</p>
              <Button variant='outline' className='mt-4' onClick={() => window.location.reload()}>
                <RefreshCw className='h-4 w-4 mr-2' />
                Tải lại
              </Button>
            </div>
          </div>
        ) : paginatedData.length === 0 ? (
          // Hiển thị trạng thái không có dữ liệu
          <div className='text-center py-14 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-dashed border-gray-200'>
            <div className='flex flex-col items-center'>
              {search ? (
                <>
                  <Search className='h-12 w-12 text-gray-300 mb-3' />
                  <h3 className='text-lg font-medium text-gray-800 mb-2'>Không tìm thấy kết quả</h3>
                  <p className='text-sm text-gray-500 max-w-md'>
                    Không tìm thấy yêu cầu hoàn tiền nào phù hợp với từ khóa &quot;{search}&quot;.
                  </p>
                </>
              ) : (
                <>
                  <Wallet className='h-12 w-12 text-gray-300 mb-3' />
                  <h3 className='text-lg font-medium text-gray-800 mb-2'>Chưa có yêu cầu hoàn tiền</h3>
                  <p className='text-sm text-gray-500 max-w-md'>Bạn chưa có yêu cầu hoàn tiền hoặc đổi trả nào.</p>
                </>
              )}
            </div>
          </div>
        ) : (
          // Hiển thị danh sách hoàn tiền
          paginatedData.map((order) => (
            <Card key={order.orderId} className='overflow-hidden border hover:border-primary/40 transition-colors'>
              <CardContent className='p-6'>
                <div className='flex flex-col gap-6'>
                  {/* Header */}
                  <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-medium'>Đơn hàng #{order.orderCode}</h3>
                        <Badge className={statusColorMap[order.orderStatus] || 'bg-gray-100 text-gray-800'}>
                          <span className='flex items-center gap-1'>
                            {statusIconMap[order.orderStatus]}
                            <span>{statusTextMap[order.orderStatus] || order.orderStatus}</span>
                          </span>
                        </Badge>
                      </div>
                      <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          <span>Ngày đặt: {formatDate(order.orderDate)}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='h-4 w-4' />
                          <span>Yêu cầu: {formatDate(order.requestDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Thông tin yêu cầu */}
                  <div className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <div className='text-sm font-medium text-muted-foreground mb-1'>Người yêu cầu</div>
                        <p className='font-medium text-slate-800'>{order.customerName}</p>
                      </div>
                      <div>
                        <div className='text-sm font-medium text-muted-foreground mb-1'>Mã thanh toán</div>
                        <p className='font-medium text-slate-800'>#{order.paymentId}</p>
                      </div>
                    </div>

                    <div>
                      <div className='text-sm font-medium text-muted-foreground mb-1'>Lý do hoàn tiền</div>
                      <div className='p-3 bg-muted/40 rounded-md border border-muted'>
                        <p className='text-slate-700'>{order.refundReason}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Footer */}
                  <div className='flex items-center justify-between'>
                    <div>
                      <div className='text-sm text-muted-foreground mb-1'>Trạng thái</div>
                      <div className='flex items-center gap-1.5'>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            order.orderStatus === 'COMPLETED' || order.orderStatus === 'REFUNDED'
                              ? 'bg-green-500'
                              : order.orderStatus === 'CANCELLED' || order.orderStatus === 'FAILED'
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                          }`}
                        />
                        <span className='font-medium'>{statusTextMap[order.orderStatus] || order.orderStatus}</span>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-sm text-muted-foreground mb-1'>Số tiền hoàn trả</div>
                      <div className='text-lg font-bold text-primary'>{formatPrice(order.amount)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center'>
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} className='cursor-pointer' />
                </PaginationItem>
              )}

              {/* First page if not visible */}
              {!pageNumbers.includes(1) && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(1)} className='cursor-pointer'>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </>
              )}

              {/* Page numbers */}
              {pageNumbers.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={page === currentPage}
                    className='cursor-pointer'
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Last page if not visible */}
              {!pageNumbers.includes(totalPages) && totalPages > 1 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(totalPages)} className='cursor-pointer'>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(currentPage + 1)} className='cursor-pointer' />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
