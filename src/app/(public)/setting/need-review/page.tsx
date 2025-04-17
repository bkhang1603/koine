'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { NeedReviewSkeleton } from '@/components/public/parent/setting/need-review/NeedReviewSkeleton'
import { EmptyReview } from '@/components/public/parent/setting/need-review/EmptyReview'
import { BookOpen, CalendarIcon, Package2, SearchIcon, Star } from 'lucide-react'
import Image from 'next/image'
import { ReviewProductDialog } from '@/components/public/parent/setting/need-review/ReviewProductDialog'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { useGetListOrderNeedReview, useGetMyOrdersReviews } from '@/queries/useAccount'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface BaseReviewItem {
  orderDetailId: string
  itemId: string
  itemType: 'COURSE' | 'PRODUCT' | 'COMBO'
  itemTitle: string
  imageUrl: string | null
  description?: string
  orderId: string
  orderCode: string
  orderDate: string
}

interface NeedReviewItem extends BaseReviewItem {
  type: 'need-review'
  unitPrice: number
  quantity: number
  discount: number
  totalPrice: number
}

interface ReviewedItem extends BaseReviewItem {
  type: 'reviewed'
  rating: number
  review: string
  comment?: string
  createdAt: string | boolean
  updatedAt: string
  createdAtFormatted: string
}

type ReviewItem = NeedReviewItem | ReviewedItem

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
  const reviewList = (data?.payload.data || []).map((item) => ({
    type: 'need-review' as const,
    orderDetailId: item.orderDetailId ?? '',
    itemId: item.itemId ?? '',
    itemType: (item.itemType ?? 'COURSE') as 'COURSE' | 'PRODUCT' | 'COMBO',
    itemTitle: item.itemTitle ?? '',
    imageUrl: item.imageUrl,
    description: item.description,
    orderId: item.orderId ?? '',
    orderCode: item.orderCode ?? '',
    orderDate: item.orderDate ?? '',
    unitPrice: Number(item.unitPrice ?? 0),
    quantity: Number(item.quantity ?? 1),
    discount: Number(item.discount ?? 0),
    totalPrice: Number(item.totalPrice ?? 0)
  })) satisfies NeedReviewItem[]

  const { data: reviews, isLoading: isLoadingReviews } = useGetMyOrdersReviews()
  const reviewedList = (reviews?.payload.data || []).map((item) => ({
    type: 'reviewed' as const,
    orderDetailId: item.orderDetailId ?? '',
    itemId: item.itemId ?? '',
    itemType: (item.itemType ?? 'COURSE') as 'COURSE' | 'PRODUCT' | 'COMBO',
    itemTitle: item.itemTitle ?? '',
    imageUrl: item.imageUrl,
    orderId: item.orderId ?? '',
    orderCode: item.orderCode ?? '',
    orderDate: item.orderDate ?? '',
    rating: Number(item.rating ?? 0),
    review: item.review ?? '',
    createdAt: item.createdAt ?? '',
    updatedAt: item.updatedAt ?? '',
    createdAtFormatted: item.createdAtFormatted ?? ''
  })) satisfies ReviewedItem[]

  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const getFilteredList = () => {
    // Xác định danh sách cần lọc dựa trên tab
    const sourceList = activeTab === 'reviewed' ? reviewedList : reviewList

    // Lọc theo loại item (trừ tab đã đánh giá)
    const filteredByType =
      activeTab === 'all' || activeTab === 'reviewed'
        ? sourceList
        : sourceList.filter((item) => item.itemType.toUpperCase() === activeTab.toUpperCase())

    // Lọc theo từ khóa tìm kiếm
    if (!searchTerm) {
      return filteredByType
    }

    return filteredByType.filter(
      (item) =>
        item.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.orderCode.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const filteredList = getFilteredList()

  if (isLoading || isLoadingReviews) {
    return <NeedReviewSkeleton />
  }

  // Thống kê số lượng từng loại
  const courseCount = reviewList.filter((item) => item.itemType.toUpperCase() === 'COURSE').length
  const productCount = reviewList.filter((item) => item.itemType.toUpperCase() === 'PRODUCT').length
  const reviewedCount = reviewedList.length

  // Trong phần render của item
  const isNeedReview = (item: ReviewItem): item is NeedReviewItem => {
    return item.type === 'need-review'
  }

  const isReviewed = (item: ReviewItem): item is ReviewedItem => {
    return item.type === 'reviewed'
  }

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
        <TabsList className='grid w-full sm:w-auto grid-cols-4 h-10'>
          <TabsTrigger value='all' className='text-xs sm:text-sm'>
            Chưa đánh giá <span className='ml-1 text-xs font-medium text-gray-500'>({reviewList.length})</span>
          </TabsTrigger>
          <TabsTrigger value='course' className='text-xs sm:text-sm'>
            Khóa học <span className='ml-1 text-xs font-medium text-gray-500'>({courseCount})</span>
          </TabsTrigger>
          <TabsTrigger value='product' className='text-xs sm:text-sm'>
            Sản phẩm <span className='ml-1 text-xs font-medium text-gray-500'>({productCount})</span>
          </TabsTrigger>
          <TabsTrigger value='reviewed' className='text-xs sm:text-sm'>
            Đã đánh giá <span className='ml-1 text-xs font-medium text-gray-500'>({reviewedCount})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className='mt-4 space-y-4'>
          {filteredList.length > 0 ? (
            <>
              {filteredList.map((item, index) => {
                const typeConfig = getItemTypeConfig(item.itemType)
                const hasDiscount = isNeedReview(item) && item.discount > 0
                const isReviewedItem = isReviewed(item)

                let displayPrice = 0
                let displayQuantity = 1
                let displayDiscount = 0
                let displayUnitPrice = 0
                let displayRating = 0
                let displayComment = ''

                if (isNeedReview(item)) {
                  displayPrice = item.totalPrice
                  displayQuantity = item.quantity
                  displayDiscount = item.discount
                  displayUnitPrice = item.unitPrice
                } else if (isReviewed(item)) {
                  displayRating = item.rating
                  displayComment = item.review
                }

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
                                <div className='text-lg font-medium text-gray-900'>{formatCurrency(displayPrice)}</div>
                                <div className='text-sm text-gray-500'>
                                  {displayQuantity > 1 && `${displayQuantity} × ${formatCurrency(displayUnitPrice)}`}
                                  {hasDiscount && (
                                    <span className='text-emerald-600 ml-1'>
                                      (Giảm {formatCurrency(displayDiscount)})
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
                              {isReviewedItem ? (
                                <div className='flex items-center gap-2'>
                                  <div className='flex gap-1'>
                                    {Array(5)
                                      .fill(0)
                                      .map((_, i) => (
                                        <Star
                                          key={i}
                                          className={cn(
                                            'h-4 w-4',
                                            i < displayRating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'
                                          )}
                                          strokeWidth={1.5}
                                        />
                                      ))}
                                  </div>
                                  <div className='text-sm text-gray-600'>{displayComment}</div>
                                </div>
                              ) : (
                                <>
                                  <div className='flex gap-1'>
                                    {Array(5)
                                      .fill(0)
                                      .map((_, i) => (
                                        <Star key={i} className='h-4 w-4 text-gray-200' strokeWidth={1.5} />
                                      ))}
                                  </div>
                                  <div className='text-xs text-gray-500'>Chưa đánh giá</div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Footer with buttons */}
                          <div className='mt-4 pt-3 border-t border-gray-100 flex justify-between items-center'>
                            <Button variant='outline' size='sm' asChild>
                              <Link href={`/setting/need-review/${item.orderId}`}>Xem chi tiết</Link>
                            </Button>

                            {!isReviewedItem && (
                              <ReviewProductDialog
                                itemId={item.itemId}
                                itemType={item.itemType}
                                orderDetailId={item.orderDetailId}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {/* Pagination info */}
              <div className='mt-4 text-sm text-gray-500'>
                Hiển thị {filteredList.length} trên tổng số{' '}
                {activeTab === 'reviewed' ? reviewedList.length : reviewList.length} sản phẩm
                {activeTab === 'reviewed' ? ' đã đánh giá' : ' cần đánh giá'}
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
