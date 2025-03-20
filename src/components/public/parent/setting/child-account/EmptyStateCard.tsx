import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'

interface EmptyStateCardProps {
  onAddAccount: () => void
}

export function EmptyStateCard({ onAddAccount }: EmptyStateCardProps) {
  return (
    <Card className='border-dashed border-2 shadow-sm hover:border-primary/30 transition-all duration-300'>
      <CardContent className='p-8 flex flex-col items-center justify-center text-center'>
        <div className='h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center mb-4'>
          <Plus className='h-8 w-8 text-primary' />
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>Thêm tài khoản con</h3>
        <p className='text-gray-500 max-w-md mb-6'>
          Tạo tài khoản con để theo dõi và quản lý việc học tập của trẻ trên nền tảng của chúng tôi.
        </p>
        <Button onClick={onAddAccount} className='bg-gradient-to-r from-primary to-primary/90'>
          <Plus className='h-4 w-4 mr-2' />
          Thêm tài khoản con
        </Button>
      </CardContent>
    </Card>
  )
}
