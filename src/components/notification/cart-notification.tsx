import CartPopover from '@/components/cart-popover'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCartDetailQuery } from '@/queries/useCartDetail'
import { ShoppingBag } from 'lucide-react'

function CartNotification() {
  const { data } = useCartDetailQuery()
  const cartData = data?.payload?.data || {
    cartDetails: [],
    totalAmount: 0,
    id: '',
    isDeleted: false,
    createdAt: '',
    updatedAt: '',
    userId: '',
    totalItems: 0
  }
  const cartTotal = data?.payload?.data.totalItems || 0

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='rounded-full bg-gray-50 w-10 h-10 flex justify-center items-center text-primary cursor-pointer relative'>
          <ShoppingBag className='w-5 h-5' />

          {cartTotal > 0 && (
            <div className='absolute -top-2 -right-2 bg-secondary text-white w-5 h-5 flex justify-center items-center rounded-full text-sm cursor-pointer select-none'>
              {cartTotal}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-80 p-0 rounded-lg border shadow-lg overflow-hidden'>
        <CartPopover data={cartData} />
      </PopoverContent>
    </Popover>
  )
}

export default CartNotification
