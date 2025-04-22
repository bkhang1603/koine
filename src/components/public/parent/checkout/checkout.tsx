'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAppStore } from '@/components/app-provider'
import { ChevronRight, MapPin, Plus, ShoppingCart, Loader2, BookOpen, PackageOpen, Package } from 'lucide-react'
import Link from 'next/link'
import configRoute from '@/config/route'
import { useGetAccountAddress } from '@/queries/useAccount'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCreateOrderMutation } from '@/queries/useOrder'
import { DeliveryMethod, PaymentMethod } from '@/constants/type'
import { useRouter } from 'next/navigation'
import { getCheckoutBuyNowFromLocalStorage, getCheckoutDataFromLocalStorage, handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import AddressForm from '@/components/public/parent/setting/address-form'
import { OrderBody } from '@/schemaValidations/order.schema'
import { OrderType } from '@/constants/type'
import { Breadcrumb } from '@/components/public/parent/setting/Breadcrumb'
import CheckoutSkeleton from '@/components/public/parent/checkout/checkout-skeleton'

export default function Checkout() {
  const setOrderId = useAppStore((state) => state.setOrderId)
  const checkoutData = useAppStore((state) => state.checkoutData)
  const checkoutBuyNow = useAppStore((state) => state.checkoutBuyNow)
  const pickAddress = useAppStore((state) => state.pickAddress)
  const setPickAddress = useAppStore((state) => state.setPickAddress)
  const setCheckoutData = useAppStore((state) => state.setCheckoutData)
  const [type, setType] = useState<'checkoutData' | 'checkoutBuyNow'>('checkoutData')
  const checkoutBuyNowFromLocalStorage = getCheckoutBuyNowFromLocalStorage()
  const checkoutFormLocalStorage = getCheckoutDataFromLocalStorage()

  console.log('checkoutBuyNow', checkoutBuyNow)
  console.log('checkoutData', checkoutData)
  console.log('type', type)

  useEffect(() => {
    if (checkoutFormLocalStorage) {
      setType('checkoutData')
    } else if (checkoutBuyNowFromLocalStorage) {
      setType('checkoutBuyNow')
    }
  }, [checkoutBuyNow, checkoutBuyNowFromLocalStorage, checkoutFormLocalStorage])

  const { data, isLoading: isAddressLoading } = useGetAccountAddress()
  const createOrderMutation = useCreateOrderMutation()
  const router = useRouter()

  const addresses = useMemo(() => data?.payload.data ?? [], [data?.payload.data])

  const [showAddressModal, setShowAddressModal] = useState(false)
  const [shippingMethod, setShippingMethod] = useState<(typeof DeliveryMethod)[keyof typeof DeliveryMethod]>(
    DeliveryMethod.STANDARD
  )
  const [payMethod, setPayMethod] = useState<(typeof PaymentMethod)[keyof typeof PaymentMethod]>(PaymentMethod.BANKING)
  const [showAddAddressForm, setShowAddAddressForm] = useState(false)

  // Set selectedAddressId after addresses are loaded
  useEffect(() => {
    if (addresses.length > 0 && !pickAddress) {
      // Find default address or use first address
      const defaultAddress = addresses.find((addr) => addr.isDefault) || addresses[0]
      setPickAddress(defaultAddress)
    }
  }, [addresses, pickAddress, setPickAddress])

  // Determine if checkout has both products and courses
  const hasMixedItemTypes = useMemo(() => {
    if (type === 'checkoutData') {
      const hasProducts = checkoutData?.cartDetails.some((item) => item.product !== null) || false
      const hasCourses = checkoutData?.cartDetails.some((item) => item.course !== null) || false
      const hasCombos = checkoutData?.cartDetails.some((item) => item.combo !== null) || false

      // Consider true if any two or more different types exist
      return (hasProducts && hasCourses) || (hasProducts && hasCombos) || (hasCourses && hasCombos)
    } else if (type === 'checkoutBuyNow' && checkoutBuyNow) {
      // Buy now can only be one type at a time
      return false
    }
    return false
  }, [type, checkoutData, checkoutBuyNow])

  // Group checkout items by type
  const { productItems, courseItems, comboItems } = useMemo(() => {
    if (type === 'checkoutData' && checkoutData?.cartDetails) {
      return {
        productItems: checkoutData.cartDetails.filter((item) => item.product !== null),
        courseItems: checkoutData.cartDetails.filter((item) => item.course !== null),
        comboItems: checkoutData.cartDetails.filter((item) => item.combo !== null)
      }
    }
    return {
      productItems: [],
      courseItems: [],
      comboItems: []
    }
  }, [type, checkoutData])

  const hasPhysicalItems = useMemo(() => {
    if (type === 'checkoutData') {
      // Only consider actual physical products, not combos
      return checkoutData?.cartDetails.some((item) => item.product !== null)
    }
    // For buy now, only consider physical if it's a product
    return checkoutBuyNow?.product !== null
  }, [type, checkoutData, checkoutBuyNow])

  // Determine if the order contains only digital items (courses or combos)
  const hasOnlyDigitalItems = useMemo(() => {
    if (type === 'checkoutData') {
      return checkoutData?.cartDetails.every(
        (item) => item.product === null && (item.course !== null || item.combo !== null)
      )
    }
    return checkoutBuyNow?.product === null && (checkoutBuyNow?.course !== null || checkoutBuyNow?.combo !== null)
  }, [type, checkoutData, checkoutBuyNow])

  // Tính tổng tiền dựa trên loại đơn hàng
  const calculateTotal = useMemo(() => {
    const baseAmount = type === 'checkoutData' ? checkoutData?.totalAmount : checkoutBuyNow?.totalPrice
    if (!hasPhysicalItems) return baseAmount || 0 // Không có phí ship cho đơn chỉ có khóa học
    return (baseAmount || 0) + (shippingMethod === DeliveryMethod.EXPEDITED ? 50000 : 26000)
  }, [type, checkoutData, checkoutBuyNow, hasPhysicalItems, shippingMethod])

  // Set BANKING as the only payment method for digital items (courses and combos)
  useEffect(() => {
    if (hasOnlyDigitalItems) {
      setPayMethod(PaymentMethod.BANKING)
    }
  }, [hasOnlyDigitalItems])

  // Đảm bảo có dữ liệu mới nhất khi component mount
  useEffect(() => {
    // Reset state nếu không có dữ liệu checkout
    if (!checkoutData?.cartDetails?.length && !checkoutBuyNow && type === 'checkoutData') {
      router.push(configRoute.cart)
      return
    }

    // Đảm bảo thông tin đơn hàng là mới nhất
    if (type === 'checkoutData' && checkoutData) {
      const currentCartDetails = checkoutData.cartDetails || []
      // Lọc ra các cartDetail còn tồn tại (không bị xóa)
      const validCartDetails = currentCartDetails.filter((item) => !item.isDeleted)

      if (validCartDetails.length !== currentCartDetails.length) {
        // Cập nhật lại state nếu có sự thay đổi
        setCheckoutData({
          ...checkoutData,
          cartDetails: validCartDetails,
          totalAmount: validCartDetails.reduce((sum, item) => sum + item.totalPrice, 0)
        })
      }
    }
  }, [checkoutData, checkoutBuyNow, type, router, setCheckoutData])

  const handleCreateOrder = async () => {
    if (createOrderMutation.isPending) return

    // Only require an address if there are physical items
    if (hasPhysicalItems && !pickAddress) return

    // Đảm bảo lấy data mới nhất
    const currentCartDetailIds =
      checkoutData?.cartDetails?.filter((item) => !item.isDeleted).map((item) => item.id) || []

    const orderData: OrderBody = {
      arrayCartDetailIds: currentCartDetailIds,
      // For digital items, use a default value that the API accepts for deliveryInfoId
      deliveryInfoId: hasPhysicalItems ? pickAddress!.id : null,
      deliMethod: hasPhysicalItems ? shippingMethod : DeliveryMethod.NONESHIP,
      itemId: null,
      quantity: null,
      itemType: null,
      payMethod: payMethod
    }

    // Nếu là mua ngay (checkoutBuyNow)
    if (checkoutBuyNow) {
      if (checkoutBuyNow.product !== null) {
        orderData.arrayCartDetailIds = [checkoutBuyNow.productId ?? '']
        orderData.itemId = checkoutBuyNow.productId
        orderData.quantity = checkoutBuyNow.quantity
        orderData.itemType = OrderType.PRODUCT
      } else if (checkoutBuyNow.course !== null) {
        orderData.arrayCartDetailIds = [checkoutBuyNow.courseId ?? '']
        orderData.itemId = checkoutBuyNow.courseId
        orderData.quantity = checkoutBuyNow.quantity
        orderData.itemType = OrderType.COURSE
      } else if (checkoutBuyNow.combo !== null) {
        orderData.arrayCartDetailIds = [checkoutBuyNow.comboId ?? '']
        orderData.itemId = checkoutBuyNow.comboId
        orderData.quantity = checkoutBuyNow.quantity
        orderData.itemType = OrderType.COMBO
      }
    }

    try {
      const res = await createOrderMutation.mutateAsync(orderData)

      if (res && res.payload.data && typeof res.payload.data.paymentLink === 'string') {
        // Xử lý trường hợp paymentLink có thể là null hoặc không phải string
        if (res.payload.data.paymentLink) {
          setOrderId(res.payload.data.orderId)

          router.push(res.payload.data.paymentLink)
          toast({
            description: 'Đơn hàng của bạn đã được tạo'
          })
        } else {
          // Nếu không có link thanh toán, chuyển hướng đến trang lịch sử đơn hàng
          router.push(`${configRoute.setting.order}/${res.payload.data.orderId}`)
          toast({
            description: 'Đơn hàng của bạn đã được tạo'
          })
        }
      } else {
        // Xử lý khi không có res hoặc data không đúng format
        toast({
          description: 'Đơn hàng của bạn đã được tạo',
          variant: 'success'
        })
        router.push(configRoute.setting.order)
      }
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  return (
    <div className='pt-4 pb-40'>
      {isAddressLoading ? (
        <CheckoutSkeleton />
      ) : (
        <>
          {/* Breadcrumb */}
          <div className='mb-4'>
            {type === 'checkoutBuyNow' ? (
              <Breadcrumb
                items={[
                  { title: 'Cửa hàng', href: configRoute.product },
                  { title: 'Khóa học', href: configRoute.course },
                  { title: 'Mua ngay', href: configRoute.checkout }
                ]}
              />
            ) : (
              <Breadcrumb
                items={[
                  { title: 'Giỏ hàng', href: configRoute.cart },
                  { title: 'Thanh toán', href: configRoute.checkout }
                ]}
              />
            )}
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
            <div className='lg:col-span-3'>
              <Card className='mb-4 p-4'>
                <h2 className='font-semibold mb-4'>Sản phẩm</h2>

                {/* Buy Now checkout */}
                {type === 'checkoutBuyNow' && (
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

                    {checkoutBuyNow?.combo !== null && (
                      <div className='flex items-start'>
                        <Image
                          src={checkoutBuyNow?.combo.imageUrl ?? ''}
                          alt={checkoutBuyNow?.combo.name ?? ''}
                          width={80}
                          height={80}
                          className='w-20 h-20 object-cover rounded-md'
                        />
                        <div className='flex-grow ml-4'>
                          <div className='flex items-center gap-2'>
                            <h3 className='font-medium'>{checkoutBuyNow?.combo.name}</h3>
                            <div className='flex items-center'>
                              <span className='text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full'>
                                Combo
                              </span>
                            </div>
                          </div>
                          <p className='text-sm text-gray-500 mt-1'>Số lượng: {checkoutBuyNow?.quantity}</p>
                        </div>
                        <span className='font-medium'>{checkoutBuyNow?.totalPrice.toLocaleString()}đ</span>
                      </div>
                    )}
                  </CardContent>
                )}

                {/* Cart checkout with mixed item types */}
                {type === 'checkoutData' && hasMixedItemTypes && (
                  <CardContent className='p-0 pb-0'>
                    {/* Products section */}
                    {productItems.length > 0 && (
                      <>
                        <div className='p-3 pl-4 bg-gray-50 border-b flex items-center'>
                          <PackageOpen className='w-4 h-4 mr-2 text-gray-500' />
                          <h3 className='font-medium text-sm text-gray-700'>Sản phẩm</h3>
                        </div>
                        {productItems.map((item, index) => (
                          <div
                            key={index}
                            className={`p-4 pb-4 ${index !== productItems.length - 1 ? 'border-b mb-4' : courseItems.length > 0 || comboItems.length > 0 ? 'border-b mb-4' : ''}`}
                          >
                            <div className='flex items-start'>
                              <Image
                                src={item.product?.imageUrl || ''}
                                alt={item.product?.name || ''}
                                width={80}
                                height={80}
                                className='w-20 h-20 object-cover rounded-md'
                              />
                              <div className='flex-grow ml-4'>
                                <h3 className='font-medium'>{item.product?.name}</h3>
                                <p className='text-sm text-gray-500'>Số lượng: {item.quantity}</p>
                              </div>
                              <span className='font-medium'>{item.totalPrice.toLocaleString()}đ</span>
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Combo section */}
                    {comboItems.length > 0 && (
                      <>
                        <div className='p-3 pl-4 bg-gray-50 border-b flex items-center'>
                          <Package className='w-4 h-4 mr-2 text-indigo-500' />
                          <h3 className='font-medium text-sm text-indigo-700'>Combo</h3>
                        </div>
                        {comboItems.map((item, index) => (
                          <div
                            key={index}
                            className={`p-4 pb-4 ${index !== comboItems.length - 1 ? 'border-b mb-4' : courseItems.length > 0 ? 'border-b mb-4' : ''}`}
                          >
                            <div className='flex items-start'>
                              <Image
                                src={item.combo?.imageUrl ?? '/placeholder.png'}
                                alt={item.combo?.name ?? ''}
                                width={80}
                                height={80}
                                className='w-20 h-20 object-cover rounded-md'
                              />
                              <div className='flex-grow ml-4'>
                                <div className='flex items-center gap-2'>
                                  <h3 className='font-medium'>{item.combo?.name}</h3>
                                  <div className='flex items-center'>
                                    <span className='text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full'>
                                      Combo
                                    </span>
                                  </div>
                                </div>
                                <p className='text-sm text-gray-500 mt-1'>Số lượng: {item.quantity}</p>
                              </div>
                              <span className='font-medium'>{item.totalPrice.toLocaleString()}đ</span>
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Courses section */}
                    {courseItems.length > 0 && (
                      <>
                        <div className='p-3 pl-4 bg-gray-50 border-b flex items-center'>
                          <BookOpen className='w-4 h-4 mr-2 text-gray-500' />
                          <h3 className='font-medium text-sm text-gray-700'>Khóa học</h3>
                        </div>
                        {courseItems.map((item, index) => (
                          <div
                            key={index}
                            className={`p-4 pb-4 ${index !== courseItems.length - 1 ? 'border-b mb-4' : ''}`}
                          >
                            <div className='flex items-start'>
                              <Image
                                src={item.course?.imageUrl ?? ''}
                                alt={item.course?.title ?? ''}
                                width={80}
                                height={80}
                                className='w-20 h-20 object-cover rounded-md'
                              />
                              <div className='flex-grow ml-4'>
                                <h3 className='font-medium'>{item.course?.title}</h3>
                                <p className='text-sm text-gray-500'>Số lượng: {item.quantity}</p>
                              </div>
                              <span className='font-medium'>{item.totalPrice.toLocaleString()}đ</span>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </CardContent>
                )}

                {/* Regular cart checkout with single item type */}
                {type === 'checkoutData' &&
                  !hasMixedItemTypes &&
                  checkoutData?.cartDetails.map((item, index) => (
                    <CardContent
                      className={`p-0 pb-4 ${index !== checkoutData.cartDetails.length - 1 ? 'border-b mb-4' : ''}`}
                      key={index}
                    >
                      {item.product !== null && (
                        <div className='flex items-start'>
                          <Image
                            src={item.product.imageUrl ?? ''}
                            alt={item.product.name ?? ''}
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
                            src={item.course.imageUrl ?? ''}
                            alt={item.course.title ?? ''}
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

                      {item.combo !== null && (
                        <div className='flex items-start'>
                          <Image
                            src={item.combo.imageUrl ?? '/placeholder.png'}
                            alt={item.combo.name ?? ''}
                            width={80}
                            height={80}
                            className='w-20 h-20 object-cover rounded-md'
                          />
                          <div className='flex-grow ml-4'>
                            <div className='flex items-center gap-2'>
                              <h3 className='font-medium'>{item.combo.name}</h3>
                              <div className='flex items-center'>
                                <span className='text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full'>
                                  Combo
                                </span>
                              </div>
                            </div>
                            <p className='text-sm text-gray-500 mt-1'>Số lượng: {item.quantity}</p>
                          </div>
                          <span className='font-medium'>{item.totalPrice.toLocaleString()}đ</span>
                        </div>
                      )}
                    </CardContent>
                  ))}
              </Card>

              {/* Chỉ hiện shipping method khi có sản phẩm vật lý */}
              {hasPhysicalItems && (
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
              )}

              <Card>
                <CardContent className='p-4'>
                  <h2 className='font-medium mb-4'>Phương thức thanh toán</h2>
                  <RadioGroup
                    value={payMethod}
                    onValueChange={(value: (typeof PaymentMethod)[keyof typeof PaymentMethod]) => setPayMethod(value)}
                  >
                    <div className='flex items-center space-x-2 mb-2'>
                      <RadioGroupItem value='BANKING' id='BANKING' />
                      <Label htmlFor='BANKING'>Thanh toán qua ngân hàng</Label>
                    </div>

                    {/* Chỉ hiện COD khi có sản phẩm vật lý (không phải course hoặc combo) */}
                    {hasPhysicalItems && !hasOnlyDigitalItems && (
                      <div className='flex items-center space-x-2 mb-2'>
                        <RadioGroupItem value='COD' id='COD' />
                        <Label htmlFor='COD'>Thanh toán khi nhận hàng</Label>
                      </div>
                    )}
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
              {/* Chỉ hiện địa chỉ giao hàng khi có sản phẩm vật lý */}
              {hasPhysicalItems && (
                <Card className='mb-4'>
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between mb-2'>
                      <h2 className='font-semibold'>Giao tới</h2>
                      <Button
                        variant='link'
                        className='p-0 h-auto text-blue-600'
                        onClick={() => setShowAddressModal(true)}
                      >
                        Thay đổi
                      </Button>
                    </div>

                    {addresses.length === 0 ? (
                      <div className='space-y-3 mt-4'>
                        <div className='flex items-center gap-2'>
                          <MapPin className='w-6 h-6 text-yellow-500' />
                          <p className='text-gray-500 text-sm'>Chưa có địa chỉ giao hàng</p>
                        </div>

                        <Button variant='outline' className='w-full' onClick={() => setShowAddAddressForm(true)}>
                          <Plus className='w-4 h-4 mr-2' />
                          Thêm địa chỉ giao hàng
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
              )}

              <Card>
                <CardContent className='p-4'>
                  <h2 className='font-semibold mb-4'>Thông tin đơn hàng</h2>
                  <div className='space-y-2 mb-2 border-b border-gray-300 pb-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-600'>Tạm tính</span>
                      <span>
                        {(type === 'checkoutData'
                          ? checkoutData?.totalAmount
                          : checkoutBuyNow?.totalPrice
                        )?.toLocaleString()}
                        đ
                      </span>
                    </div>

                    {/* Chỉ hiện phí ship khi có sản phẩm vật lý */}
                    {hasPhysicalItems && (
                      <>
                        <div className='flex justify-between text-sm'>
                          <span className='text-gray-600'>Phí vận chuyển</span>
                          <span>{shippingMethod === DeliveryMethod.EXPEDITED ? '50,000đ' : '26,000đ'}</span>
                        </div>
                        <div className='flex justify-between text-sm text-green-600'>
                          <span>Giảm giá vận chuyển</span>
                          <span>0,000đ</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className='flex justify-between font-medium'>
                    <span>Tổng tiền</span>
                    <span className='text-xl text-red-600'>{calculateTotal.toLocaleString()}đ</span>
                  </div>

                  <Button
                    className='w-full mt-4 font-medium'
                    onClick={handleCreateOrder}
                    disabled={
                      (hasPhysicalItems && !pickAddress) || // Yêu cầu địa chỉ nếu có sản phẩm vật lý
                      createOrderMutation.isPending
                    }
                  >
                    {createOrderMutation.isPending && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
                    {hasPhysicalItems && !pickAddress && 'Vui lòng thêm địa chỉ giao hàng'}
                    {(!hasPhysicalItems || pickAddress) && !createOrderMutation.isPending && 'Đặt hàng'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      <AddressForm
        open={showAddAddressForm}
        onOpenChange={setShowAddAddressForm}
        mode='add'
        onSuccess={(newAddress) => {
          setPickAddress(newAddress)
          setShowAddAddressForm(false)
        }}
      />

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
            <Button
              variant='outline'
              size='sm'
              onClick={() => {
                setShowAddressModal(false)
                setShowAddAddressForm(true)
              }}
            >
              <Plus className='w-4 h-4 mr-2' />
              Thêm địa chỉ mới
            </Button>
            <Button variant='ghost' size='sm' onClick={() => setShowAddressModal(false)}>
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
