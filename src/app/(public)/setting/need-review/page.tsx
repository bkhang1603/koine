'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { NeedReviewSkeleton } from '@/components/public/parent/setting/need-review/NeedReviewSkeleton'
import { EmptyReview } from '@/components/public/parent/setting/need-review/EmptyReview'
import { BookOpen, CalendarIcon, ChevronDownIcon, ChevronUpIcon, Package2, SearchIcon, Star } from 'lucide-react'
import Image from 'next/image'
import { ReviewProductDialog } from '@/components/public/parent/setting/need-review/ReviewProductDialog'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { useGetListOrderNeedReview } from '@/queries/useAccount'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'

// Helper function để xác định icon và màu sắc dựa trên item type
const getItemTypeConfig = (itemType: string) => {
  switch (itemType.toUpperCase()) {
    case 'COURSE':
      return {
        icon: <BookOpen className='h-4 w-4' />,
        label: 'Khóa học',
        color: 'bg-blue-100 text-blue-800 border-blue-200'
      }
    case 'PRODUCT':
      return {
        icon: <Package2 className='h-4 w-4' />,
        label: 'Sản phẩm',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-200'
      }
    default:
      return {
        icon: <Package2 className='h-4 w-4' />,
        label: 'Sản phẩm',
        color: 'bg-gray-100 text-gray-800 border-gray-200'
      }
  }
}

function NeedReviewPage() {
  const { data, isLoading } = useGetListOrderNeedReview()
  const reviewList = data?.payload.data || []

  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)

  // Lọc danh sách theo tab và tìm kiếm
  const getFilteredList = () => {
    let filtered = reviewList

    // Lọc theo tab
    if (activeTab !== 'all') {
      filtered = filtered.filter((item) => item.itemType.toUpperCase() === activeTab.toUpperCase())
    }

    // Lọc theo tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.orderCode.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  const toggleProductExpansion = (productId: string) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null)
    } else {
      setExpandedProduct(productId)
    }
  }

  const filteredList = getFilteredList()

  if (isLoading) {
    return <NeedReviewSkeleton />
  }

  // Thống kê số lượng từng loại
  const courseCount = reviewList.filter((item) => item.itemType.toUpperCase() === 'COURSE').length
  const productCount = reviewList.filter((item) => item.itemType.toUpperCase() === 'PRODUCT').length

  return (
    <div className='container max-w-6xl mx-auto py-6 space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 mb-1'>Đánh giá sản phẩm</h1>
          <p className='text-gray-500'>Chia sẻ trải nghiệm của bạn về các sản phẩm và khóa học đã mua</p>
        </div>
        <div className='mt-4 sm:mt-0 flex items-center gap-2'>
          <div className='flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-100 shadow-sm'>
            <div className='flex items-center justify-center rounded-full bg-amber-100 p-1'>
              <Star className='h-3.5 w-3.5 text-amber-500' fill='currentColor' />
            </div>
            <span className='text-sm font-medium text-amber-700'>Chờ đánh giá: </span>
            <span className='text-sm font-bold text-amber-800'>{reviewList.length}</span>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <SearchIcon className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
          <Input
            placeholder='Tìm kiếm theo tên sản phẩm hoặc mã đơn hàng...'
            className='pl-9'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue='all' value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='grid w-full sm:w-auto grid-cols-3 h-10'>
          <TabsTrigger value='all' className='text-xs sm:text-sm'>
            Tất cả <span className='ml-1 text-xs font-medium text-gray-500'>({reviewList.length})</span>
          </TabsTrigger>
          <TabsTrigger value='course' className='text-xs sm:text-sm'>
            Khóa học <span className='ml-1 text-xs font-medium text-gray-500'>({courseCount})</span>
          </TabsTrigger>
          <TabsTrigger value='product' className='text-xs sm:text-sm'>
            Sản phẩm <span className='ml-1 text-xs font-medium text-gray-500'>({productCount})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className='mt-4 space-y-4'>
          {filteredList.length > 0 ? (
            <>
              {filteredList.map((item, index) => {
                const typeConfig = getItemTypeConfig(item.itemType)
                const hasDiscount = item.discount > 0

                return (
                  <Card
                    key={`${item.itemId}-${index}`}
                    className='overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-200'
                  >
                    <CardContent className='p-6'>
                      <div className='flex flex-col sm:flex-row gap-6'>
                        {/* Product image */}
                        <div className='sm:w-28 flex-shrink-0'>
                          {item.imageUrl ? (
                            <div className='relative h-28 w-28 mx-auto rounded overflow-hidden border border-gray-100'>
                              <Image src={item.imageUrl} alt={item.itemTitle} fill className='object-cover' />
                            </div>
                          ) : (
                            <div className='h-28 w-28 mx-auto rounded bg-gray-50 border border-gray-100 flex items-center justify-center'>
                              <div
                                className={cn(
                                  'h-12 w-12 rounded-full flex items-center justify-center',
                                  item.itemType.toUpperCase() === 'COURSE'
                                    ? 'bg-blue-50 text-blue-500'
                                    : 'bg-emerald-50 text-emerald-500'
                                )}
                              >
                                {typeConfig.icon && <span className='h-6 w-6'>{typeConfig.icon}</span>}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Product details */}
                        <div className='flex-1'>
                          <div className='flex flex-col sm:flex-row sm:items-start justify-between'>
                            <div>
                              <div className='flex items-center gap-4'>
                                <h3 className='font-semibold text-lg text-gray-900'>{item.itemTitle}</h3>
                                <Badge
                                  variant='outline'
                                  className={cn('whitespace-nowrap text-xs font-medium', typeConfig.color)}
                                >
                                  {typeConfig.icon && <span className='mr-1'>{typeConfig.icon}</span>}
                                  {typeConfig.label}
                                </Badge>
                              </div>

                              <div className='flex items-center text-sm text-gray-500 mt-1'>
                                <CalendarIcon className='h-3.5 w-3.5 mr-1.5' />
                                <span>Đặt vào: {formatDate(item.orderDate)}</span>
                                <span className='mx-2 text-gray-300'>•</span>
                                <span>Đơn hàng: #{item.orderCode}</span>
                              </div>
                            </div>

                            <div className='mt-2 sm:mt-0 flex items-end'>
                              <div className='text-right'>
                                <div className='text-lg font-medium text-gray-900'>
                                  {formatCurrency(item.totalPrice)}
                                </div>
                                <div className='text-sm text-gray-500'>
                                  {item.quantity > 1 &&
                                    `${item.quantity} × ${formatCurrency(item.totalPrice / item.quantity)}`}
                                  {hasDiscount && (
                                    <span className='text-emerald-600 ml-1'>
                                      (Giảm {formatCurrency(item.discount)})
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Rating stars section */}
                          <div className='mt-4 bg-gray-50 rounded-lg border border-gray-100 p-4'>
                            <div className='flex items-center gap-3'>
                              <div className='text-sm text-gray-700'>Đánh giá:</div>
                              <div className='flex gap-1'>
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star key={i} className='h-4 w-4 text-gray-200' strokeWidth={1.5} />
                                  ))}
                              </div>
                              <div className='text-xs text-gray-500'>Chưa đánh giá</div>
                            </div>
                          </div>

                          {/* Footer with buttons */}
                          <div className='mt-4 pt-3 border-t border-gray-100 flex justify-between items-center'>
                            <div>
                              <button
                                type='button'
                                onClick={() => toggleProductExpansion(`${item.itemId}-${index}`)}
                                className='text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center group'
                              >
                                {expandedProduct === `${item.itemId}-${index}` ? (
                                  <>
                                    <ChevronUpIcon className='mr-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-600' />
                                    <span className='text-sm'>Ẩn chi tiết</span>
                                  </>
                                ) : (
                                  <>
                                    <ChevronDownIcon className='mr-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-600' />
                                    <span className='text-sm'>Xem chi tiết</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <ReviewProductDialog
                              itemId={item.itemId}
                              itemType={item.itemType}
                              orderDetailId={item.orderDetailId}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Expanded details section */}
                      {expandedProduct === `${item.itemId}-${index}` && (
                        <>
                          <Separator className='my-4' />
                          <div className='bg-gray-50 p-4 rounded-lg'>
                            <h4 className='font-medium mb-2'>Thông tin đơn hàng</h4>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                              <div>
                                <div className='flex justify-between py-1'>
                                  <span className='text-gray-500'>Mã đơn hàng:</span>
                                  <span className='font-medium'>#{item.orderCode}</span>
                                </div>
                                <div className='flex justify-between py-1'>
                                  <span className='text-gray-500'>Ngày đặt:</span>
                                  <span>{formatDate(item.orderDate)}</span>
                                </div>
                              </div>
                              <div>
                                <div className='flex justify-between py-1'>
                                  <span className='text-gray-500'>Đơn giá:</span>
                                  <span>{formatCurrency(item.totalPrice / item.quantity)}</span>
                                </div>
                                <div className='flex justify-between py-1'>
                                  <span className='text-gray-500'>Số lượng:</span>
                                  <span>{item.quantity}</span>
                                </div>
                                {hasDiscount && (
                                  <div className='flex justify-between py-1'>
                                    <span className='text-gray-500'>Giảm giá:</span>
                                    <span className='text-emerald-600'>{formatCurrency(item.discount)}</span>
                                  </div>
                                )}
                                <div className='flex justify-between py-1 font-medium'>
                                  <span>Thành tiền:</span>
                                  <span>{formatCurrency(item.totalPrice)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                )
              })}

              {/* Pagination info */}
              <div className='mt-4 text-sm text-gray-500'>
                Hiển thị {filteredList.length} trên tổng số {reviewList.length} sản phẩm cần đánh giá
              </div>
            </>
          ) : (
            <EmptyReview />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default NeedReviewPage
