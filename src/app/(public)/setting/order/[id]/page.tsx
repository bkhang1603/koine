'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, ArrowLeft, Clock, BookOpen, AlertCircle, Package2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useGetOrder } from '@/queries/useOrder'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import Loading from '@/components/loading'

export default function OrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { isLoading, error, data } = useGetOrder({ id: params.id })
  const order = data?.payload.data

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loading />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <AlertCircle className='w-12 h-12 text-red-500' />
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>Không tìm thấy đơn hàng</h3>
          <p className='text-gray-500'>Đơn hàng không tồn tại hoặc đã bị xóa</p>
        </div>
        <Button variant='outline' asChild>
          <Link href='/setting/order'>Quay lại danh sách đơn hàng</Link>
        </Button>
      </div>
    )
  }

  // Group order details by type
  const courseItems = order.orderDetails.filter(
    (item) => item.courseId && item.course
  ) as ((typeof order.orderDetails)[0] & { course: NonNullable<(typeof order.orderDetails)[0]['course']> })[]

  const productItems = order.orderDetails.filter(
    (item) => item.productId && item.product
  ) as ((typeof order.orderDetails)[0] & { product: NonNullable<(typeof order.orderDetails)[0]['product']> })[]

  const comboItems = order.orderDetails.filter(
    (item) => item.comboId && item.combo
  ) as ((typeof order.orderDetails)[0] & { combo: NonNullable<(typeof order.orderDetails)[0]['combo']> })[]

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Back button */}
      <Button variant='ghost' asChild className='gap-2 hover:bg-gray-100'>
        <Link href='/setting/order'>
          <ArrowLeft className='h-4 w-4' />
          Quay lại danh sách đơn hàng
        </Link>
      </Button>

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>Chi tiết đơn hàng #{order.orderCode}</h1>
        </div>
        <div className='flex items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            {format(new Date(order.orderDate), 'HH:mm - dd/MM/yyyy', { locale: vi })}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2 space-y-6'>
          {/* Products */}
          {productItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Package className='w-5 h-5' />
                  Sản phẩm
                </CardTitle>
              </CardHeader>
              <CardContent className='divide-y'>
                {productItems.map((item) => (
                  <div key={item.id} className='py-4 first:pt-0 last:pb-0'>
                    <div className='flex gap-4'>
                      <div className='relative w-16 h-16'>
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className='object-cover rounded-lg'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-medium'>{item.product.name}</h3>
                        <div className='flex items-center justify-between mt-2'>
                          <div className='text-sm text-muted-foreground'>
                            Số lượng: <span className='font-medium'>{item.quantity}</span>
                          </div>
                          <div className='font-medium'>{item.totalPrice.toLocaleString()}đ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Courses */}
          {courseItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <BookOpen className='w-5 h-5' />
                  Khóa học
                </CardTitle>
              </CardHeader>
              <CardContent className='divide-y'>
                {courseItems.map((item) => (
                  <div key={item.id} className='py-4 first:pt-0 last:pb-0'>
                    <div className='flex gap-4'>
                      <div className='relative w-16 h-16'>
                        <Image
                          src={item.course.imageUrl}
                          alt={item.course.title}
                          fill
                          className='object-cover rounded-lg'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-medium'>{item.course.title}</h3>
                        <div className='flex items-center justify-between mt-2'>
                          <div className='text-sm text-muted-foreground'>
                            Số lượng: <span className='font-medium'>{item.quantity}</span>
                          </div>
                          <div className='font-medium'>{item.totalPrice.toLocaleString()}đ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Combos */}
          {comboItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Package2 className='w-5 h-5' />
                  Combo
                </CardTitle>
              </CardHeader>
              <CardContent className='divide-y'>
                {comboItems.map((item) => (
                  <div key={item.id} className='py-4 first:pt-0 last:pb-0'>
                    <div className='flex gap-4'>
                      <div className='flex-1'>
                        <h3 className='font-medium'>{item.combo.name}</h3>
                        <div className='flex items-center justify-between mt-2'>
                          <div className='text-sm text-muted-foreground'>
                            Số lượng: <span className='font-medium'>{item.quantity}</span>
                          </div>
                          <div className='font-medium'>{item.totalPrice.toLocaleString()}đ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Tổng tiền hàng</span>
                  <span>{order.totalAmount.toLocaleString()}đ</span>
                </div>
                <div className='flex justify-between text-sm font-medium'>
                  <span>Tổng thanh toán</span>
                  <span className='text-red-600'>{order.totalAmount.toLocaleString()}đ</span>
                </div>
              </div>

              <Separator />

              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Mã đơn hàng</span>
                  <span className='font-medium'>#{order.orderCode}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày đặt hàng</span>
                  <span>{format(new Date(order.orderDate), 'dd/MM/yyyy HH:mm', { locale: vi })}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày tạo</span>
                  <span>{order.createdAtFormatted}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Cập nhật lần cuối</span>
                  <span>{order.updatedAtFormatted}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
