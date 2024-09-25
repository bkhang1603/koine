import CartPopover from '@/components/cart-popover'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ShoppingBag } from 'lucide-react'

function CartNotification() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='rounded-full bg-gray-50 w-10 h-10 flex justify-center items-center text-primary cursor-pointer relative'>
          <ShoppingBag />

          <div className='absolute -top-2 -right-2 bg-secondary text-white w-5 h-5 flex justify-center items-center rounded-full text-sm'>
            2
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <CartPopover />
      </PopoverContent>
    </Popover>
  )
}

export default CartNotification
