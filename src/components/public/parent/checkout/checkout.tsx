'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAppStore } from '@/components/app-provider'
import { ChevronRight, MapPin, Plus, ShoppingCart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import configRoute from '@/config/route'
import { useGetAccountAddress } from '@/queries/useAccount'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCreateOrderMutation } from '@/queries/useOrder'
import { DeliveryMethod } from '@/constants/type'
import { useRouter } from 'next/navigation'
import { getCheckoutBuyNowFromLocalStorage, getCheckoutDataFromLocalStorage } from '@/lib/utils'

export default function Checkout() {
  const checkoutData = useAppStore((state) => state.checkoutData)
  const checkoutBuyNow = useAppStore((state) => state.checkoutBuyNow)
  const pickAddress = useAppStore((state) => state.pickAddress)
  const setPickAddress = useAppStore((state) => state.setPickAddress)
  const [type, setType] = useState<'cart' | 'buyNow'>('cart')
  const checkoutBuyNowFromLocalStorage = getCheckoutBuyNowFromLocalStorage()
  const checkoutFormLocalStorage = getCheckoutDataFromLocalStorage()

  useEffect(() => {
    if (checkoutFormLocalStorage) {
      setType('cart')
    } else if (checkoutBuyNowFromLocalStorage) {
      setType('buyNow')
    }
  }, [checkoutBuyNow, checkoutBuyNowFromLocalStorage, checkoutFormLocalStorage])

  const { data } = useGetAccountAddress()
  const createOrderMutation = useCreateOrderMutation()
  const router = useRouter()

  const addresses = useMemo(() => data?.payload.data ?? [], [data?.payload.data])

  const [showAddressModal, setShowAddressModal] = useState(false)
  const [shippingMethod, setShippingMethod] = useState<(typeof DeliveryMethod)[keyof typeof DeliveryMethod]>(
    DeliveryMethod.STANDARD
  )

  // Set selectedAddressId after addresses are loaded
  useEffect(() => {
    if (addresses.length > 0 && !pickAddress) {
      // Find default address or use first address
      const defaultAddress = addresses.find((addr) => addr.isDefault) || addresses[0]
      setPickAddress(defaultAddress)
    }
  }, [addresses, pickAddress, setPickAddress])

  const handleCreateOrder = async () => {
    if (createOrderMutation.isPending) return

    if (!pickAddress) return

    const orderData = {
      arrayCartDetailIds: checkoutData?.cartDetails?.map((item) => item.id) ?? [],
      deliveryInfoId: pickAddress.id,
      deliMethod: shippingMethod,
      itemId: checkoutBuyNow?.id ?? null,
      quantity: checkoutBuyNow?.quantity ?? null,
      itemType: (checkoutBuyNow?.product !== null
        ? 'PRODUCT'
        : checkoutBuyNow?.course !== null
          ? 'COURSE'
          : checkoutBuyNow?.combo !== null
            ? 'COMBO'
            : null) as 'PRODUCT' | 'COURSE' | 'COMBO' | null
    }

    try {
      const res = await createOrderMutation.mutateAsync(orderData)

      if (res) {
        router.push(res.payload.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='pt-4 pb-40'>
      <div className='flex items-center gap-4 mb-6'>
        <Button variant='ghost' size='icon' onClick={() => router.back()} className='hover:bg-primary/5'>
          <ArrowLeft className='h-5 w-5' />
        </Button>
        <h1 className='text-2xl font-bold'>THANH TOÁN</h1>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
        <div className='lg:col-span-3'>
          <Card className='mb-4 p-4'>
            <h2 className='font-semibold mb-4'>Sản phẩm</h2>
            {type === 'cart' &&
              checkoutData?.cartDetails.map((item, index) => (
                <CardContent
                  className={`p-0 pb-4 ${index !== checkoutData.cartDetails.length - 1 ? 'border-b mb-4' : ''}`}
                  key={index}
                >
                  {item.product !== null && (
                    <div className='flex items-start'>
                      <Image
                        src={item.product.imageUrl}
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

            {type === 'buyNow' && (
              <CardContent className='p-0 pb-4'>
                {checkoutBuyNow?.product !== null && (
                  <div className='flex items-start'>
                    <Image
                      src={checkoutBuyNow?.product.imageUrl ?? ''}
                      alt={checkoutBuyNow?.product.name ?? ''}
                      width={80}
                      height={80}
                      className='w-20 h-20 object-cover rounded-md'
                    />
                    <div className='flex-grow ml-4'>
                      <h3 className='font-medium'>{checkoutBuyNow?.product.name}</h3>

                      <p className='text-sm text-gray-500'>Số lượng: {checkoutBuyNow?.quantity}</p>
                    </div>
                    <span className='font-medium'>{checkoutBuyNow?.totalPrice.toLocaleString()}đ</span>
                  </div>
                )}

                {checkoutBuyNow?.course !== null && (
                  <div className='flex items-start'>
                    <Image
                      src={checkoutBuyNow?.course.imageUrl ?? ''}
                      alt={checkoutBuyNow?.course.title ?? ''}
                      width={80}
                      height={80}
                      className='w-20 h-20 object-cover rounded-md'
                    />
                    <div className='flex-grow ml-4'>
                      <h3 className='font-medium'>{checkoutBuyNow?.course.title}</h3>
                      <p className='text-sm text-gray-500'>Số lượng: {checkoutBuyNow?.quantity}</p>
                    </div>
                    <span className='font-medium'>{checkoutBuyNow?.totalPrice.toLocaleString()}đ</span>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          <Card className='mb-4'>
            <CardContent className='p-4'>
              <h2 className='font-medium mb-4'>Phương thức vận chuyển</h2>
              <RadioGroup
                value={shippingMethod}
                onValueChange={(value: (typeof DeliveryMethod)[keyof typeof DeliveryMethod]) =>
                  setShippingMethod(value)
                }
              >
                <div className='flex items-center space-x-2 mb-2'>
                  <RadioGroupItem value={DeliveryMethod.STANDARD} id='standard' />
                  <Label htmlFor='standard'>Giao hàng tiêu chuẩn</Label>
                </div>
                <div className='flex items-center space-x-2 mb-2'>
                  <RadioGroupItem value={DeliveryMethod.EXPEDITED} id='express' />
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

          <Link href={configRoute.product} className='bg-blue-50 p-4 rounded-lg flex items-center mt-4'>
            <ShoppingCart className='text-blue-500 mr-2' />
            <span className='text-sm text-blue-700'>Mua thêm các sản phẩm khác</span>
            <ChevronRight className='text-blue-500 ml-auto' />
          </Link>
        </div>

        <div className='lg:col-span-1'>
          <Card className='mb-4'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between mb-2'>
                <h2 className='font-semibold'>Giao tới</h2>
                <Button variant='link' className='p-0 h-auto text-blue-600' onClick={() => setShowAddressModal(true)}>
                  Thay đổi
                </Button>
              </div>

              {addresses.length === 0 ? (
                <div className='space-y-3 mt-4'>
                  <div className='flex items-center gap-2'>
                    <MapPin className='w-6 h-6 text-yellow-500' />
                    <p className='text-gray-500 text-sm'>Chưa có địa chỉ giao hàng</p>
                  </div>

                  <Button variant='outline' className='w-full' asChild>
                    <Link href={configRoute.setting.address}>
                      <Plus className='w-4 h-4 mr-2' />
                      Thêm địa chỉ giao hàng
                    </Link>
                  </Button>
                </div>
              ) : pickAddress ? (
                <div>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium'>{pickAddress.name}</span>
                    <span className='text-muted-foreground'>|</span>
                    <span>{pickAddress.phone}</span>
                    {pickAddress.isDefault && (
                      <>
                        <span className='text-muted-foreground'>|</span>
                        <span className='text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium'>
                          Mặc định
                        </span>
                      </>
                    )}
                  </div>
                  <div className='text-muted-foreground'>
                    <p className='text-green-500 font-medium text-sm'>{pickAddress.tag}</p>
                    <p className='text-sm'>{pickAddress.address}</p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4'>
              <h2 className='font-semibold mb-4'>Thông tin đơn hàng</h2>
              <div className='space-y-2 mb-2 border-b border-gray-300 pb-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Tạm tính</span>
                  {type === 'cart' && <span>{checkoutData?.totalAmount.toLocaleString()}đ</span>}
                  {type === 'buyNow' && <span>{checkoutBuyNow?.totalPrice.toLocaleString()}đ</span>}
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Phí vận chuyển</span>
                  <span>{shippingMethod === DeliveryMethod.EXPEDITED ? '50,000đ' : '26,000đ'}</span>
                </div>
                <div className='flex justify-between text-sm text-green-600'>
                  <span>Giảm giá vận chuyển</span>
                  <span>0,000đ</span>
                </div>
              </div>
              <div className='flex justify-between font-medium'>
                <span>Tổng tiền</span>
                <span className='text-xl text-red-600'>
                  {shippingMethod === DeliveryMethod.EXPEDITED
                    ? (
                        ((type === 'cart' ? checkoutData?.totalAmount : checkoutBuyNow?.totalPrice) ?? 0) + 50000
                      ).toLocaleString()
                    : (
                        ((type === 'cart' ? checkoutData?.totalAmount : checkoutBuyNow?.totalPrice) ?? 0) + 26000
                      ).toLocaleString()}
                  đ
                </span>
              </div>
              <p className='text-right text-xs text-gray-500 mt-1'>(Đã bao gồm VAT nếu có)</p>

              <Button className='w-full mt-4 font-medium' onClick={handleCreateOrder} disabled={!pickAddress}>
                {!pickAddress ? 'Vui lòng thêm địa chỉ giao hàng' : 'Đặt hàng'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showAddressModal} onOpenChange={setShowAddressModal}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>Địa chỉ giao hàng</DialogTitle>
            <p className='text-sm text-muted-foreground mt-1'>Chọn địa chỉ bạn muốn giao hàng đến</p>
          </DialogHeader>

          <div className='relative'>
            <ScrollArea className='max-h-[400px]'>
              <div className='space-y-4'>
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => {
                      setPickAddress(address)
                      setShowAddressModal(false)
                    }}
                    className={`p-4 rounded-lg border-2 cursor-pointer group transition-all
                      ${
                        pickAddress?.id === address.id
                          ? 'border-primary shadow-sm bg-primary/5'
                          : 'hover:border-primary/50 hover:shadow-sm'
                      }`}
                  >
                    <div className='flex items-center gap-3'>
                      <MapPin
                        className={`w-6 h-6 ${pickAddress?.id === address.id ? 'text-primary' : 'text-muted-foreground'}`}
                      />
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2'>
                          <span className='text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium'>
                            {address.tag}
                          </span>
                          <span className='text-muted-foreground'>|</span>
                          <span>{address.name}</span>
                          <span className='text-muted-foreground'>|</span>
                          <span>{address.phone}</span>
                        </div>
                      </div>
                      {address.isDefault && (
                        <span className='text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium'>
                          Mặc định
                        </span>
                      )}
                    </div>
                    <div>
                      <p className='text-sm text-muted-foreground mt-1.5'>{address.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className='flex items-center justify-between pt-4 mt-4 border-t'>
            <Link
              href={configRoute.setting.address}
              className='text-sm text-muted-foreground hover:text-primary transition-colors'
            >
              <Button variant='outline' size='sm'>
                <Plus className='w-4 h-4 mr-2' />
                Thêm địa chỉ mới
              </Button>
            </Link>
            <Button variant='ghost' size='sm' onClick={() => setShowAddressModal(false)}>
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
