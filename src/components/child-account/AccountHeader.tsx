import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { AlertCircle, Edit, User, Clock, Award, Settings } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface AccountHeaderProps {
  childData: {
    avatarUrl?: string
    username: string
    firstName?: string
    lastName?: string
  }
  onReportClick: () => void
}

export const AccountHeader = ({ childData, onReportClick }: AccountHeaderProps) => {
  return (
    <div className='w-full bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2'></div>
      <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-50 to-transparent rounded-full transform -translate-x-1/2 translate-y-1/2'></div>

      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10'>
        <div className='flex items-center gap-5'>
          <div className='relative'>
            <Avatar className='h-20 w-20 border-4 border-primary/10 shadow-sm'>
              <AvatarImage src={childData.avatarUrl} alt={childData.username} />
              <AvatarFallback className='bg-gradient-to-br from-primary/20 to-primary/40 text-primary text-xl font-medium'>
                {`${childData.firstName?.[0] || ''}${childData.lastName?.[0] || ''}`}
              </AvatarFallback>
            </Avatar>
            <span className='absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white shadow-sm flex items-center justify-center'>
              <span className='sr-only'>Online</span>
            </span>
          </div>

          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <h3 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700'>
                {`${childData.firstName || ''} ${childData.lastName || ''}`}
              </h3>
              <span className='inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10'>
                <Clock className='mr-1 h-3 w-3' /> Hoạt động
              </span>
            </div>

            <div className='flex flex-wrap items-center gap-3'>
              <p className='text-sm text-gray-500 flex items-center gap-1'>
                <User className='h-3 w-3' />
                {childData.username}
              </p>

              <span className='inline-flex items-center text-xs text-gray-500'>
                <Award className='mr-1 h-3 w-3' /> 4 khóa học đã đăng ký
              </span>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='border-primary/20 text-primary hover:bg-primary/5 transition-colors'
          >
            <Settings className='w-4 h-4 mr-1' />
            Chỉnh sửa
          </Button>

          <Button
            variant='outline'
            size='sm'
            className='text-red-500 border-red-200 hover:text-red-600 hover:bg-red-50 transition-colors'
            onClick={onReportClick}
          >
            <AlertCircle className='w-4 h-4 mr-1' />
            Báo cáo
          </Button>
        </div>
      </div>
    </div>
  )
}
