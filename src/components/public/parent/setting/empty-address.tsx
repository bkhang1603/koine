import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Plus } from 'lucide-react'

interface EmptyAddressProps {
  onAddAddress: () => void
}

export function EmptyAddress({ onAddAddress }: EmptyAddressProps) {
  return (
    <Card className='border-dashed border-2 shadow-sm'>
      <CardContent className='p-12 flex flex-col items-center justify-center text-center'>
        <div className='h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6'>
          <MapPin className='h-10 w-10 text-primary' />
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-3'>Bạn chưa có địa chỉ nào</h3>
        <p className='text-gray-500 max-w-md mb-8'>
          Thêm địa chỉ giao hàng để chúng tôi có thể gửi sách và tài liệu học tập đến tận nơi cho bạn.
        </p>
        <Button
          onClick={onAddAddress}
          size='lg'
          className='bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/25'
        >
          <Plus className='mr-2 h-5 w-5' />
          Thêm địa chỉ mới
        </Button>
      </CardContent>
    </Card>
  )
}
