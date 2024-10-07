'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, CreditCard, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { useCartDetailDeleteMutation, useCartDetailQuery, useCartDetailUpdateMutation } from '@/queries/useCartDetail'
import { handleErrorApi } from '@/lib/utils'
import Link from 'next/link'
import configRoute from '@/config/route'
import Loading from '@/components/loading'

export default function ModernShoppingCart() {
  const { data, isPending } = useCartDetailQuery()
  const updateMutation = useCartDetailUpdateMutation()
  const deleteMutation = useCartDetailDeleteMutation()
  const cartData = data?.payload?.data || { cartDetails: [], totalAmount: 0 }
  const cartDetails = cartData['cartDetails']

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const debounceTimeout = useRef<{ [key: string]: NodeJS.Timeout }>({})

  const subtotal = cartDetails.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
  const shipping = 30000
  const total = subtotal + shipping

  const handleQuantityChange = (id: string, value: number) => {
    const newQuantity = (quantities[id] ?? cartDetails.find((item) => item.id === id)?.quantity) + value

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

  const updateQuantity = async (id: string, value: number) => {
    if (updateMutation.isPending) return

    try {
      await updateMutation.mutateAsync({
        id,
        data: {
          quantity: value
        }
      })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const removeItem = (id: string) => {
    if (deleteMutation.isPending) return

    try {
      deleteMutation.mutateAsync({ id })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  return (
    <section className='mb-40'>
      <h1 className='text-2xl font-bold my-4'>Giỏ hàng của bạn</h1>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='lg:w-2/3'>
          {isPending && (
            <div className='flex justify-center items-center'>
              <Loading />
            </div>
          )}

          {cartDetails &&
            cartDetails.map((cartDetail) => (
              <motion.div
                key={cartDetail?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200'
              >
                <Link href={`${configRoute.product}/${cartDetail.productId}`}>
                  <div className='w-24 h-24 overflow-hidden rounded-md'>
                    <Image
                      src={cartDetail?.product?.imageUrls[0].imageUrl!}
                      alt={cartDetail?.product?.imageUrls[0].name!}
                      width={500}
                      height={500}
                      className='w-full h-full object-cover'
                    />
                  </div>
                </Link>
                <div className='flex-grow'>
                  <Link href={`${configRoute.product}/${cartDetail.productId}`}>
                    <h3 className='font-semibold text-lg'>{cartDetail?.product?.name}</h3>
                    <p className='text-gray-600'>Thể loại: sản phẩm</p>
                  </Link>
                  <div className='flex items-center mt-2'>
                    <Button
                      variant={'icon'}
                      disabled={cartDetail?.quantity === 1}
                      onClick={() => handleQuantityChange(cartDetail?.id, -1)}
                      className='p-1 h-full rounded-full hover:bg-gray-100 transition duration-200'
                    >
                      <Minus className='w-4 h-4' />
                    </Button>
                    <span className='mx-2 w-8 text-center'>{quantities[cartDetail?.id] ?? cartDetail?.quantity}</span>
                    <Button
                      variant={'icon'}
                      disabled={cartDetail?.quantity === cartDetail?.product?.stockQuantity}
                      onClick={() => handleQuantityChange(cartDetail?.id, 1)}
                      className='p-1 h-full rounded-full hover:bg-gray-100 transition duration-200'
                    >
                      <Plus className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium text-lg'>
                    {(cartDetail?.unitPrice * cartDetail?.quantity).toLocaleString()} đ
                  </p>
                  <button
                    onClick={() => removeItem(cartDetail?.id)}
                    className='text-red-500 hover:text-red-700 transition duration-200 mt-2'
                  >
                    <Trash2 className='w-5 h-5' />
                  </button>
                </div>
              </motion.div>
            ))}

          {!isPending && cartDetails.length === 0 && <p className='text-gray-500'>Giỏ hàng của bạn đang trống</p>}
        </div>
        <div className='lg:w-1/3'>
          <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
            <h2 className='text-xl font-semibold mb-4'>Tóm tắt đơn hàng</h2>
            <div className='space-y-2 mb-4'>
              <div className='flex justify-between'>
                <span>Tổng đơn hàng</span>
                <span>{subtotal.toLocaleString()} đ</span>
              </div>
              <div className='flex justify-between'>
                <span>Giao hàng</span>
                <span>{shipping.toLocaleString()} đ</span>
              </div>
              <Separator />
              <div className='flex justify-between font-semibold text-lg'>
                <span>Tổng cộng</span>
                <span>{total.toLocaleString()} đ</span>
              </div>
            </div>

            <Button variant={'default'} className='w-full mb-4' disabled={cartDetails.length === 0 ? true : false}>
              <CreditCard className='w-4 h-4 mr-2' />
              Thanh toán
            </Button>

            <p className='text-sm text-gray-600 flex items-center justify-center'>
              <Truck className='w-4 h-4 mr-2' />
              Đơn hàng sẽ được giao trong vòng 3-5 ngày
            </p>
          </div>
          <div className='mt-6'>
            <Input
              type='text'
              placeholder='Nhập mã giảm giá'
              className='mb-2'
              disabled={cartDetails.length === 0 ? true : false}
            />
            <Button variant='outline' className='w-full' disabled={cartDetails.length === 0 ? true : false}>
              Áp dụng mã giảm giá
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
