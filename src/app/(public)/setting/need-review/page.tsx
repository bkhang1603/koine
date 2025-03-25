'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { NeedReviewSkeleton } from '@/components/public/parent/setting/need-review/NeedReviewSkeleton'
import { EmptyReview } from '@/components/public/parent/setting/need-review/EmptyReview'
import { BookOpen, Calendar, Clock, DollarSign, Package2, Percent, ShoppingBag, Star } from 'lucide-react'
import Image from 'next/image'
import { ReviewProductDialog } from '@/components/public/parent/setting/need-review/ReviewProductDialog'
import { Separator } from '@/components/ui/separator'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useGetListOrderNeedReview } from '@/queries/useAccount'

// Helper function để xác định icon và màu sắc dựa trên item type
const getItemTypeConfig = (itemType: string) => {
  switch (itemType.toUpperCase()) {
    case 'COURSE':
      return {
        icon: <BookOpen className='h-4 w-4' />,
        label: 'Khóa học',
        color: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
      }
    case 'PRODUCT':
      return {
        icon: <Package2 className='h-4 w-4' />,
        label: 'Sản phẩm',
        color: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'
      }
    default:
      return {
        icon: <Package2 className='h-4 w-4' />,
        label: 'Sản phẩm',
        color: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
      }
  }
}

function NeedReviewPage() {
  const { data, isLoading, refetch } = useGetListOrderNeedReview()
  const reviewList = data?.payload.data || []

  const [activeTab, setActiveTab] = useState('all')

  // Lọc danh sách theo tab
  const getFilteredList = () => {
    if (activeTab === 'all') return reviewList
    return reviewList.filter((item) => item.itemType.toUpperCase() === activeTab.toUpperCase())
  }

  // Xử lý sau khi đánh giá thành công
  const handleReviewSuccess = () => {
    refetch()
  }

  const filteredList = getFilteredList()

  if (isLoading) {
    return <NeedReviewSkeleton />
  }

  // Thống kê số lượng từng loại
  const courseCount = reviewList.filter((item) => item.itemType.toUpperCase() === 'COURSE').length
  const productCount = reviewList.filter((item) => item.itemType.toUpperCase() === 'PRODUCT').length

  return (
    <div className='container max-w-6xl mx-auto py-6 space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Đánh giá sản phẩm</h1>
        <p className='text-gray-500'>Chia sẻ trải nghiệm của bạn về các sản phẩm và khóa học đã mua</p>
      </div>

      {/* Stats Cards */}
      {reviewList.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Card className='bg-gradient-to-br from-amber-50 to-amber-50/30 border-amber-100'>
            <CardContent className='p-4 flex items-center gap-4'>
              <div className='h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center'>
                <Star className='h-6 w-6 text-amber-500' />
              </div>
              <div>
                <p className='text-sm text-amber-700'>Chờ đánh giá</p>
                <h3 className='text-2xl font-bold text-amber-900'>{reviewList.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gradient-to-br from-blue-50 to-blue-50/30 border-blue-100'>
            <CardContent className='p-4 flex items-center gap-4'>
              <div className='h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center'>
                <BookOpen className='h-6 w-6 text-blue-500' />
              </div>
              <div>
                <p className='text-sm text-blue-700'>Khóa học</p>
                <h3 className='text-2xl font-bold text-blue-900'>{courseCount}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gradient-to-br from-green-50 to-green-50/30 border-green-100'>
            <CardContent className='p-4 flex items-center gap-4'>
              <div className='h-12 w-12 rounded-full bg-green-100 flex items-center justify-center'>
                <Package2 className='h-6 w-6 text-green-500' />
              </div>
              <div>
                <p className='text-sm text-green-700'>Sản phẩm</p>
                <h3 className='text-2xl font-bold text-green-900'>{productCount}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue='all' value={activeTab} onValueChange={setActiveTab}>
        <div className='flex justify-between items-center mb-6'>
          <TabsList className='bg-gray-100/80'>
            <TabsTrigger value='all' className='data-[state=active]:bg-white'>
              Tất cả <span className='ml-2 text-xs font-medium text-gray-500'>({reviewList.length})</span>
            </TabsTrigger>
            <TabsTrigger value='course' className='data-[state=active]:bg-white'>
              Khóa học <span className='ml-2 text-xs font-medium text-gray-500'>({courseCount})</span>
            </TabsTrigger>
            <TabsTrigger value='product' className='data-[state=active]:bg-white'>
              Sản phẩm <span className='ml-2 text-xs font-medium text-gray-500'>({productCount})</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className='mt-0'>
          {filteredList.length > 0 ? (
            <div className='space-y-6'>
              {filteredList.map((item, index) => {
                const typeConfig = getItemTypeConfig(item.itemType)
                const hasDiscount = item.discount > 0

                return (
                  <Card
                    key={`${item.itemId}-${index}`}
                    className='border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md rounded-xl overflow-hidden transition-all duration-200'
                  >
                    <CardContent className='p-0'>
                      <div className='flex flex-col md:flex-row h-full'>
                        {/* Image - sửa để chiếm full height */}
                        <div className='relative w-full md:w-[220px] h-[220px] md:h-auto flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-100'>
                          {item.imageUrl ? (
                            <div className='absolute inset-0 overflow-hidden'>
                              <Image
                                src={item.imageUrl}
                                alt={item.itemTitle}
                                fill
                                sizes='(max-width: 768px) 100vw, 220px'
                                className='object-cover hover:scale-105 transition-transform duration-300'
                              />
                            </div>
                          ) : (
                            <div className='flex items-center justify-center h-full w-full bg-gray-50'>
                              <div className='rounded-full bg-gray-100 p-6'>
                                {typeConfig.icon && (
                                  <span className='h-10 w-10 flex items-center justify-center text-gray-500'>
                                    {typeConfig.icon}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          <div className='absolute top-3 left-3'>
                            <Badge className={`${typeConfig.color} font-medium px-2.5 py-1 border`}>
                              {typeConfig.icon}
                              <span className='ml-1'>{typeConfig.label}</span>
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className='flex-1 p-5 flex flex-col'>
                          <div className='flex-1'>
                            <h3 className='font-semibold text-lg line-clamp-2 mb-2 text-gray-900 group-hover:text-primary transition-colors'>
                              {item.itemTitle}
                            </h3>
                            <p className='text-sm text-gray-600 line-clamp-2 mb-4'>{item.description}</p>

                            {/* Item details */}
                            <div className='flex items-center flex-wrap justify-between gap-y-3 gap-x-6 mb-4 text-sm'>
                              <div className='flex items-center gap-1 text-gray-600'>
                                <DollarSign className='h-4 w-4 text-gray-400' />
                                <span>Đơn giá:</span>
                                <span className='font-medium text-gray-900 ml-auto'>
                                  {formatCurrency(item.unitPrice)}
                                </span>
                              </div>

                              <div className='flex items-center gap-1 text-gray-600'>
                                <ShoppingBag className='h-4 w-4 text-gray-400' />
                                <span>Số lượng:</span>
                                <span className='font-medium text-gray-900 ml-auto'>{item.quantity}</span>
                              </div>

                              <div className='flex items-center gap-1 text-gray-600'>
                                <Percent className='h-4 w-4 text-gray-400' />
                                <span>Giảm giá:</span>
                                <span
                                  className={`font-medium ml-auto ${hasDiscount ? 'text-green-600' : 'text-gray-600'}`}
                                >
                                  {hasDiscount ? formatCurrency(item.discount) : '0 ₫'}
                                </span>
                              </div>

                              <div className='flex items-center gap-1 text-gray-600'>
                                <Clock className='h-4 w-4 text-gray-400' />
                                <span>Ngày đặt:</span>
                                <span className='font-medium text-gray-900 ml-auto'>{formatDate(item.orderDate)}</span>
                              </div>
                            </div>

                            {/* Rating stars */}
                            <div className='flex items-center gap-1 mb-4'>
                              <div className='flex'>
                                {Array(5)
                                  .fill(0)
                                  .map((_, index) => (
                                    <Star
                                      key={index}
                                      className='h-5 w-5 fill-gray-200 text-gray-200'
                                      strokeWidth={1.5}
                                    />
                                  ))}
                              </div>
                              <span className='text-sm text-gray-500 ml-2 italic'>Chưa có đánh giá</span>
                            </div>
                          </div>

                          {/* Footer with order info and button */}
                          <Separator className='my-4' />
                          <div className='flex flex-wrap items-center justify-between gap-3'>
                            <div className='space-y-1'>
                              <div className='flex items-center gap-1 text-sm text-gray-500'>
                                <Calendar className='h-4 w-4' />
                                <span>Thuộc đơn hàng:</span>
                                <span className='font-medium text-gray-700'>#{item.orderCode}</span>
                              </div>
                              <div className='flex items-center gap-1 text-gray-700'>
                                <DollarSign className='h-4 w-4' />
                                <span className='text-sm'>Tổng tiền:</span>
                                <span className='font-semibold text-primary'>{formatCurrency(item.totalPrice)}</span>
                              </div>
                            </div>
                            <ReviewProductDialog
                              itemId={item.itemId}
                              itemTitle={item.itemTitle}
                              itemType={item.itemType}
                              onReviewSuccess={handleReviewSuccess}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <EmptyReview />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default NeedReviewPage
