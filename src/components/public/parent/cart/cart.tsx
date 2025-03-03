'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2, ChevronRight, ShoppingCart, MapPin } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import configRoute from '@/config/route'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import {
  useCartDetailDeleteListMutation,
  useCartDetailDeleteMutation,
  useCartDetailQuery,
  useCartDetailUpdateMutation
} from '@/queries/useCartDetail'
import { handleErrorApi } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useAppStore } from '@/components/app-provider'
import { useRouter } from 'next/navigation'
import { useGetAccountAddress } from '@/queries/useAccount'
import CartSkeleton from '@/components/public/parent/cart/cart-skeleton'
import CartEmpty from '@/components/public/parent/cart/cart-empty'

export default function Cart() {
  const pickAddress = useAppStore((state) => state.pickAddress)
  const setPickAddress = useAppStore((state) => state.setPickAddress)

  const { data, isLoading } = useCartDetailQuery()
  const updateMutation = useCartDetailUpdateMutation()
  const deleteMutation = useCartDetailDeleteMutation()
  const deleteListMutation = useCartDetailDeleteListMutation()
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const debounceTimeout = useRef<{ [key: string]: NodeJS.Timeout }>({})

  const router = useRouter()

  const { data: addressData } = useGetAccountAddress()
  const addresses = useMemo(() => addressData?.payload.data ?? [], [addressData?.payload.data])
  const [showAddressModal, setShowAddressModal] = useState(false)

  useEffect(() => {
    if (data) {
      const inStockItems = data.payload.data.cartDetails
        .filter((item) => item.product?.stockQuantity! > 0 || item.course !== null)
        .map((item) => item.id)
      setSelectedItems(new Set(inStockItems))
    }
  }, [data])

  useEffect(() => {
    if (addresses.length > 0 && !pickAddress) {
      const defaultAddress = addresses.find((addr) => addr.isDefault) || addresses[0]
      setPickAddress(defaultAddress)
    }
  }, [addresses, pickAddress, setPickAddress])

  const toggleSelectAll = useCallback(() => {
    if (!data) return
    const inStockItems = data.payload.data.cartDetails
      .filter((item) => item.product?.stockQuantity! > 0 || item.course !== null)
      .map((item) => item.id)
    if (selectedItems.size === inStockItems.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(inStockItems))
    }
  }, [data, selectedItems])

  const toggleSelectItem = useCallback((id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }, [])

  const calculateSelectedTotal = useMemo(() => {
    if (!data) return 0
    return data.payload.data.cartDetails
      .filter((item) => selectedItems.has(item.id))
      .reduce((sum, item) => sum + item.totalPrice, 0)
  }, [data, selectedItems])

  const handleQuantityChange = (id: string, value: number) => {
    const newQuantity =
      (quantities[id] ?? data?.payload.data.cartDetails.find((item) => item.id === id)?.quantity) + value

    if (newQuantity >= 1) {
      setQuantities((prev) => ({
        ...prev,
        [id]: newQuantity
      }))

      if (debounceTimeout.current[id]) {
        clearTimeout(debounceTimeout.current[id])
      }

      debounceTimeout.current[id] = setTimeout(() => {
        updateQuantity(id, newQuantity)
      }, 600)
    }
  }

  const updateQuantity = useCallback(
    async (id: string, value: number) => {
      if (updateMutation.isPending) return

      try {
        await updateMutation.mutateAsync({
          data: {
            quantity: value,
            cartDetailId: id
          }
        })
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    },
    [updateMutation]
  )

  const removeItem = useCallback(
    async (id: string) => {
      if (deleteMutation.isPending) return

      try {
        await deleteMutation.mutateAsync({ id })
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    },
    [deleteMutation]
  )

  const removeSelectedItems = useCallback(async () => {
    if (deleteListMutation.isPending) return

    try {
      await deleteListMutation.mutateAsync({
        data: {
          cartDetailIds: Array.from(selectedItems)
        }
      })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }, [deleteListMutation, selectedItems])

  const cartDetails = data?.payload.data.cartDetails || []
  const isCartEmpty = !isLoading && cartDetails.length === 0

  const setCheckoutData = useAppStore((state) => state.setCheckoutData)

  const handleCheckout = () => {
    const selectedItemsData = cartDetails.filter((item) => selectedItems.has(item.id))
    setCheckoutData({
      cartDetails: selectedItemsData,
      totalAmount: selectedItemsData.reduce((sum, item) => sum + item.totalPrice, 0),
      id: '',
      createdAt: null,
      updatedAt: null,
      isDeleted: null,
      totalItems: null,
      userId: null
    })

    router.push('/checkout')
  }

  return (
    <div className='pt-4 pb-40'>
      <h1 className='text-2xl font-bold mb-4'>GIỎ HÀNG</h1>
      {isLoading && <CartSkeleton />}

      {/* Empty Cart State */}
      {isCartEmpty && <CartEmpty />}

      {/* Existing cart UI - Wrap with condition */}
      {!isLoading && !isCartEmpty && (
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
          <div className='lg:col-span-3'>
            <Card className='mb-4'>
              <CardContent className='p-0'>
                <div className='flex items-center p-4 border-b'>
                  <div className='flex items-center w-1/2'>
                    <Checkbox
                      id='select-all'
                      checked={
                        selectedItems.size ===
                        cartDetails.filter((item) => item.product?.stockQuantity! > 0 || item.course !== null).length
                      }
                      onCheckedChange={toggleSelectAll}
                    />
                    <label htmlFor='select-all' className='ml-2 text-sm text-gray-600 cursor-pointer select-none'>
                      Tất cả ({cartDetails.length} sản phẩm)
                    </label>
                  </div>
                  <div className='grid grid-cols-4 gap-4 w-1/2 text-sm text-gray-500'>
                    <span className='text-center'>Đơn giá</span>
                    <span className='text-center'>Số lượng</span>
                    <span className='text-center'>Thành tiền</span>
                    <AlertDialog>
                      <AlertDialogTrigger disabled={selectedItems.size === 0}>
                        <div className='flex justify-center items-center cursor-pointer'>
                          <Trash2 className='h-4 w-4' />
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Xóa các sản phẩm đã chọn</AlertDialogTitle>
                          <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa {selectedItems.size} sản phẩm khỏi giỏ hàng không?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction
                            onClick={removeSelectedItems}
                            className='bg-red-500 hover:bg-red-600 text-white'
                          >
                            Xóa
                          </AlertDialogAction>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                {cartDetails.map((item, index) => (
                  <div key={item.id} className={`p-4 ${index !== cartDetails.length - 1 ? 'border-b' : ''}`}>
                    {item.product !== null && (
                      <div className='flex items-start'>
                        <div className='flex w-1/2'>
                          <div className='flex items-center'>
                            <Checkbox
                              checked={selectedItems.has(item.id)}
                              onCheckedChange={() => toggleSelectItem(item.id)}
                              disabled={item.product?.stockQuantity === 0}
                            />
                            <Image
                              src={item.product?.imageUrl || '/placeholder.svg'}
                              alt={item.product?.name || 'Product image'}
                              width={500}
                              height={500}
                              className='ml-4 w-20 h-20 object-cover rounded-md'
                            />
                          </div>
                          <div className='ml-4 flex-grow h-full'>
                            <h3 className='font-medium text-sm'>{item.product?.name}</h3>

                            <p className='text-sm text-gray-500 mt-1'>{item.product ? 'Sản phẩm' : 'Khóa học'}</p>
                            {item.product?.stockQuantity === 0 && <p className='text-red-500 text-sm mt-1'>Hết hàng</p>}
                          </div>
                        </div>
                        <div className='grid grid-cols-4 gap-4 w-1/2 items-center'>
                          <span className='text-center text-sm'>{item.unitPrice.toLocaleString()}đ</span>
                          <div className='flex items-center justify-center'>
                            {item.product?.stockQuantity! > 0 ? (
                              <>
                                <Button
                                  variant={'icon'}
                                  disabled={item?.quantity === 1}
                                  onClick={() => handleQuantityChange(item?.id, -1)}
                                  className='p-1 h-full rounded-full hover:bg-gray-100 transition duration-200'
                                >
                                  <Minus className='w-4 h-4' />
                                </Button>
                                <span className='mx-2 w-6 text-center text-sm'>
                                  {quantities[item?.id] ?? item?.quantity}
                                </span>
                                <Button
                                  variant={'icon'}
                                  disabled={item?.quantity === item?.product?.stockQuantity}
                                  onClick={() => handleQuantityChange(item?.id, 1)}
                                  className='p-1 h-full rounded-full hover:bg-gray-100 transition duration-200'
                                >
                                  <Plus className='w-4 h-4' />
                                </Button>
                              </>
                            ) : (
                              <span className='text-red-500 text-sm'>Hết hàng</span>
                            )}
                          </div>
                          <span className='text-center text-sm font-medium text-red-600'>
                            {item.totalPrice.toLocaleString()}đ
                          </span>
                          <div className='flex justify-center'>
                            <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => removeItem(item.id)}>
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.course !== null && (
                      <div className='flex items-start'>
                        <div className='flex w-1/2'>
                          <div className='flex items-center'>
                            <Checkbox
                              checked={selectedItems.has(item.id)}
                              onCheckedChange={() => toggleSelectItem(item.id)}
                            />
                            <Image
                              src={item.course?.imageUrl || '/placeholder.svg'}
                              alt={item.course?.title || 'Course image'}
                              width={500}
                              height={500}
                              className='ml-4 w-20 h-20 object-cover rounded-md'
                            />
                          </div>
                          <div className='ml-4 flex-grow h-full'>
                            <h3 className='font-medium text-sm'>{item.course?.title}</h3>

                            <p className='text-sm text-gray-500 mt-1'>{item.product ? 'Sản phẩm' : 'Khóa học'}</p>
                          </div>
                        </div>
                        <div className='grid grid-cols-4 gap-4 w-1/2 items-center'>
                          <span className='text-center text-sm'>{item.unitPrice.toLocaleString()}đ</span>
                          <div className='flex items-center justify-center'>
                            <>
                              <Button
                                variant={'icon'}
                                disabled={item?.quantity === 1}
                                onClick={() => handleQuantityChange(item?.id, -1)}
                                className='p-1 h-full rounded-full hover:bg-gray-100 transition duration-200'
                              >
                                <Minus className='w-4 h-4' />
                              </Button>
                              <span className='mx-2 w-6 text-center text-sm'>
                                {quantities[item?.id] ?? item?.quantity}
                              </span>
                              <Button
                                variant={'icon'}
                                onClick={() => handleQuantityChange(item?.id, 1)}
                                className='p-1 h-full rounded-full hover:bg-gray-100 transition duration-200'
                              >
                                <Plus className='w-4 h-4' />
                              </Button>
                            </>
                          </div>

                          <span className='text-center text-sm font-medium text-red-600'>
                            {item.totalPrice.toLocaleString()}đ
                          </span>

                          <div className='flex justify-center'>
                            <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => removeItem(item.id)}>
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Link href={configRoute.product} className='bg-blue-50 p-4 rounded-lg flex items-center'>
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
            {/* <Card className='mb-4'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between mb-2'>
                <h2 className='font-semibold'>Tiki Khuyến Mãi</h2>
                <span className='text-sm text-gray-500'>
                  Có thể chọn 2 <Info className='inline h-4 w-4' />
                </span>
              </div>
              <Button variant='outline' className='w-full justify-start text-left h-auto py-2'>
                <span className='flex items-center'>
                  <Image src='/placeholder.svg' alt='Promo icon' width={24} height={24} className='mr-2' />
                  Giảm 15k cho đơn từ 350k
                  <ChevronRight className='ml-auto' />
                </span>
              </Button>
            </CardContent>
          </Card> */}
            <Card>
              <CardContent className='p-4'>
                <div className='space-y-2 mb-2 border-b border-gray-300 pb-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Tạm tính</span>
                    <span>{calculateSelectedTotal.toLocaleString()}đ</span>
                  </div>
                  {/* <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Giảm giá</span>
                  <span>0đ</span>
                </div> */}
                </div>
                <div className='flex justify-between font-medium'>
                  <span>Tổng tiền</span>
                  <span className='text-xl text-red-600'>{calculateSelectedTotal.toLocaleString()}đ</span>
                </div>
                <p className='text-right text-xs text-gray-500 mt-1'>(Đã bao gồm VAT nếu có)</p>

                <Button
                  className='w-full mt-4 font-medium'
                  disabled={selectedItems.size === 0}
                  onClick={handleCheckout}
                >
                  Mua hàng ({selectedItems.size})
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

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
