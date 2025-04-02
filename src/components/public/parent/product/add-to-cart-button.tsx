'use client'

import { useAppStore } from '@/components/app-provider'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import configRoute from '@/config/route'
import { useCartDetailCreateMutation } from '@/queries/useCartDetail'
import { AddCartDetailReq, AddCartDetailReqType } from '@/schemaValidations/cart-detail.schema'
import { ProductResType } from '@/schemaValidations/product.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Minus, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthModal } from '@/components/auth/auth-modal-provider'
import { handleErrorApi } from '@/lib/utils'

function AddToCartButton({ product }: { product: ProductResType['data'] }) {
  const isAuth = useAppStore((state) => state.isAuth)
  const setCheckoutBuyNow = useAppStore((state) => state.setCheckoutBuyNow)
  const router = useRouter()
  const { showLoginModal } = useAuthModal()

  const addToCartMutation = useCartDetailCreateMutation()
  const [quantity, setQuantity] = useState(1)
  const form = useForm<AddCartDetailReqType>({
    resolver: zodResolver(AddCartDetailReq),
    defaultValues: {
      productId: product.id,
      quantity: 1,
      courseId: null
    }
  })

  const onSubmit = async (data: AddCartDetailReqType) => {
    try {
      if (!isAuth) {
        showLoginModal()
        return
      }

      if (addToCartMutation.isPending) {
        return
      }

      const value = {
        productId: product.id,
        courseId: null, // Add courseId property
        quantity: data.quantity
      }

      await addToCartMutation.mutateAsync({
        data: value
      })

      toast({
        title: 'Thành công',
        description: 'Sản phẩm đã được thêm vào giỏ hàng'
      })
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
      form.setValue('quantity', newQuantity)
    }
  }

  const handleCheckoutBuyNow = () => {
    if (!isAuth) {
      showLoginModal()
      return
    }

    setCheckoutBuyNow({
      id: product.id,
      productId: product.id,
      quantity: quantity,
      unitPrice: product.price,
      totalPrice: quantity * (product.price - product.price * product.discount),
      discount: 0,
      isDeleted: false,
      product: {
        name: product.name,
        description: product.description,
        imageUrl: product.images[0].imageUrl,
        stockQuantity: product.stockQuantity
      },
      createdAt: '',
      updatedAt: '',
      comboId: null,
      courseId: null,
      course: null,
      combo: null,
      status: 'PROCESSING',
      payMethod: 'COD',
      note: null
    })

    router.push(configRoute.checkout)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FormField
          control={form.control}
          name='quantity'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex items-center space-x-4 mb-6'>
                  <span>Số lượng:</span>
                  <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>

                  <Input
                    {...field}
                    type='text'
                    className='w-16 text-center'
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10)
                      if (!isNaN(value) && value >= 1 && value <= product.stockQuantity) {
                        handleQuantityChange(value)
                      } else if (value > product.stockQuantity) {
                        handleQuantityChange(product.stockQuantity)
                      }
                    }}
                    value={quantity}
                    min={1}
                    max={100}
                  />

                  <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    onClick={() => {
                      if (quantity < 100) {
                        handleQuantityChange(quantity + 1)
                      }
                    }}
                    disabled={quantity >= product.stockQuantity}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className='flex justify-between gap-4'>
          <Button
            type='submit'
            variant={'outlineSecondary'}
            className='w-full mb-6'
            disabled={addToCartMutation.isPending}
          >
            {addToCartMutation.isPending ? <Loading color='bg-secondary' /> : 'Thêm vào giỏ hàng'}
          </Button>

          <Button type='button' variant={'secondary'} className='w-full mb-6' onClick={handleCheckoutBuyNow}>
            Mua ngay
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AddToCartButton
