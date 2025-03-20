import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Plus } from 'lucide-react'

interface EmptyAddressProps {
  onAddAddress: () => void
}

export function EmptyAddress({ onAddAddress }: EmptyAddressProps) {
  return (
    <Card className='border-dashed border border-gray-200 shadow-none bg-gradient-to-b from-gray-50/80 to-white'>
      <CardContent className='p-8 sm:p-12 flex flex-col items-center justify-center text-center'>
        <div className='h-16 w-16 rounded-full bg-gradient-to-br from-blue-50 to-primary/5 flex items-center justify-center mb-5 shadow-sm'>
          <MapPin className='h-7 w-7 text-primary/80' />
        </div>
        <h3 className='text-lg font-medium text-gray-800 mb-2'>Chưa có địa chỉ nào</h3>
        <p className='text-sm text-gray-500 max-w-md mb-6'>
          Thêm địa chỉ giao hàng và thanh toán để thuận tiện cho việc mua sắm và nhận hàng tại nhà.
        </p>
        <Button onClick={onAddAddress} className='bg-gradient-to-r from-primary to-primary/90 shadow-md'>
          <Plus className='h-4 w-4 mr-2' />
          Thêm địa chỉ mới
        </Button>
      </CardContent>
    </Card>
  )
}
