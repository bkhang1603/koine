'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useCartDetailCreateMutation } from '@/queries/useCartDetail'
import { AddCartDetailReq, AddCartDetailReqType } from '@/schemaValidations/cart-detail.schema'
import { ProductResType } from '@/schemaValidations/product.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

function AddToCartButton({ product }: { product: ProductResType['data'] }) {
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
      console.log(error)
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
      form.setValue('quantity', newQuantity)
    }
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
          <Button variant={'outlineSecondary'} className='w-full mb-6' type='submit'>
            Thêm vào giỏ hàng
          </Button>

          <Button type='button' variant={'secondary'} className='w-full mb-6'>
            Mua ngay
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AddToCartButton
