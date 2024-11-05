'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAppStore } from '@/components/app-provider'
import { ChevronRight, ShoppingCart } from 'lucide-react'

export default function Checkout() {
  const checkoutData = useAppStore((state) => state.checkoutData)

  const [showQRModal, setShowQRModal] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [shippingMethod, setShippingMethod] = useState('standard')

  const handleGenerateQRCode = () => {
    setQrCodeUrl('/placeholder.svg?height=200&width=200')
    setShowQRModal(true)
  }

  return (
    <div className='pt-4 pb-40'>
      <h1 className='text-2xl font-bold mb-4'>THANH TOÁN</h1>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
        <div className='lg:col-span-3'>
          <Card className='mb-4 p-4'>
            <h2 className='font-semibold mb-4'>Sản phẩm</h2>
            {checkoutData?.cartDetails.map((item, index) => (
              <CardContent
                className={`p-0 pb-4 ${index !== checkoutData.cartDetails.length - 1 ? 'border-b mb-4' : ''}`}
                key={index}
              >
                {item.product !== null && (
                  <div className='flex items-start'>
                    <Image
                      src={item.product.imageUrls[0].imageUrl}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className='w-20 h-20 object-cover rounded-md'
                    />
                    <div className='flex-grow ml-4'>
                      <h3 className='font-medium'>{item.product.name}</h3>

                      <p className='text-sm text-gray-500'>Số lượng: {item.quantity}</p>
                    </div>
                    <span className='font-medium'>{item.totalPrice.toLocaleString()}đ</span>
                  </div>
                )}

                {item.course !== null && (
                  <div className='flex items-start'>
                    <Image
                      src={item.course.imageUrl}
                      alt={item.course.title}
                      width={80}
                      height={80}
                      className='w-20 h-20 object-cover rounded-md'
                    />
                    <div className='flex-grow ml-4'>
                      <h3 className='font-medium'>{item.course.title}</h3>
                      <p className='text-sm text-gray-500'>Số lượng: {item.quantity}</p>
                    </div>
                    <span className='font-medium'>{item.totalPrice.toLocaleString()}đ</span>
                  </div>
                )}
              </CardContent>
            ))}
          </Card>

          <Card className='mb-4'>
            <CardContent className='p-4'>
              <h2 className='font-medium mb-4'>Phương thức vận chuyển</h2>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                <div className='flex items-center space-x-2 mb-2'>
                  <RadioGroupItem value='standard' id='standard' />
                  <Label htmlFor='standard'>Giao hàng tiêu chuẩn</Label>
                </div>
                <div className='flex items-center space-x-2 mb-2'>
                  <RadioGroupItem value='express' id='express' />
                  <Label htmlFor='express'>Giao hàng hỏa tốc (Chỉ áp dụng cho TP.HCM)</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4'>
              <h2 className='font-medium mb-4'>Phương thức thanh toán</h2>
              <RadioGroup defaultValue='qr'>
                <div className='flex items-center space-x-2 mb-2'>
                  <RadioGroupItem value='qr' id='qr' />
                  <Label htmlFor='qr'>Thanh toán qua mã QR</Label>
                </div>

                <div className='flex items-center space-x-2 mb-2'>
                  <RadioGroupItem value='cod' id='cod' disabled />
                  <Label htmlFor='cod' className='text-gray-400'>
                    Thanh toán khi nhận hàng (Hiện không hỗ trợ)
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className='bg-blue-50 p-4 rounded-lg flex items-center mt-4'>
            <ShoppingCart className='text-blue-500 mr-2' />
            <span className='text-sm text-blue-700'>Mua thêm các sản phẩm khác</span>
            <ChevronRight className='text-blue-500 ml-auto' />
          </div>
        </div>

        <div className='lg:col-span-1'>
          <Card className='mb-4'>
            <CardContent className='p-4'>
              <h2 className='font-semibold mb-2'>Giao tới</h2>
              <p className='font-medium'>bảo khang 0934600600</p>
              <p className='text-sm text-gray-600'>
                <span className='text-green-500 font-medium'>Nhà</span> 66 nguyễn ngọc phương (sảnh A), Phường 19, Quận
                Bình Thạnh, Hồ Chí Minh
              </p>
              <Button variant='link' className='p-0 h-auto text-blue-600'>
                Thay đổi
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4'>
              <h2 className='font-semibold mb-4'>Thông tin đơn hàng</h2>
              <div className='space-y-2 mb-2 border-b border-gray-300 pb-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Tạm tính</span>
                  <span>{checkoutData?.totalAmount.toLocaleString()}đ</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Phí vận chuyển</span>
                  <span>{shippingMethod === 'express' ? '50.000đ' : '26.000đ'}</span>
                </div>
                <div className='flex justify-between text-sm text-green-600'>
                  <span>Giảm giá vận chuyển</span>
                  <span>0.000đ</span>
                </div>
              </div>
              <div className='flex justify-between font-medium'>
                <span>Tổng tiền</span>
                <span className='text-xl text-red-600'>
                  {shippingMethod === 'express'
                    ? ((checkoutData?.totalAmount ?? 0) + 50000).toLocaleString()
                    : ((checkoutData?.totalAmount ?? 0) + 26000).toLocaleString()}
                  đ
                </span>
              </div>
              <p className='text-right text-xs text-gray-500 mt-1'>(Đã bao gồm VAT nếu có)</p>

              <Button className='w-full mt-4 font-medium' onClick={handleGenerateQRCode}>
                Đặt hàng
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className='sm:max-w-[400px]'>
          <DialogHeader>
            <DialogTitle>Quét mã QR để thanh toán</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col items-center space-y-4'>
            {qrCodeUrl && <Image src={qrCodeUrl} alt='QR Code' width={200} height={200} />}
            <p className='text-center'>Vui lòng quét mã QR để hoàn tất thanh toán</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
