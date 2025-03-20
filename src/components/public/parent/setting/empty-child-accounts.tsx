import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Users } from 'lucide-react'

interface EmptyChildAccountsProps {
  onAddAccount: () => void
}

export function EmptyChildAccounts({ onAddAccount }: EmptyChildAccountsProps) {
  return (
    <Card className='border-dashed border-2 shadow-sm'>
      <CardContent className='p-12 flex flex-col items-center justify-center text-center'>
        <div className='h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6'>
          <Users className='h-10 w-10 text-primary' />
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-3'>Bạn chưa có tài khoản con nào</h3>
        <p className='text-gray-500 max-w-md mb-8'>
          Tạo tài khoản con để quản lý việc học tập và theo dõi sự tiến bộ của con bạn trong hành trình học tập.
        </p>
        <Button
          onClick={onAddAccount}
          size='lg'
          className='bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/25'
        >
          <Plus className='mr-2 h-5 w-5' />
          Tạo tài khoản con
        </Button>
      </CardContent>
    </Card>
  )
}
