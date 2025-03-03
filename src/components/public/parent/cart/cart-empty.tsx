import { Button } from '@/components/ui/button'
import configRoute from '@/config/route'
import { ShoppingCart, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CartEmpty() {
  return (
    <div className='flex flex-col items-center justify-center py-16'>
      <div className='w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6'>
        <ShoppingCartIcon className='w-12 h-12 text-gray-400' />
      </div>
      <h2 className='text-xl font-semibold mb-2'>Giỏ hàng của bạn đang trống</h2>
      <p className='text-gray-500 text-center max-w-md mb-8'>
        Có vẻ như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng. Hãy tiếp tục mua sắm để tìm sản phẩm bạn yêu thích.
      </p>
      <Button asChild size='lg'>
        <Link href={configRoute.product}>
          <ShoppingCart className='mr-2 h-5 w-5' />
          Tiếp tục mua sắm
        </Link>
      </Button>
    </div>
  )
}

export default CartEmpty
