import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const EmptyCourses = () => {
  return (
    <Card className='border-none shadow-md'>
      <CardContent className='p-8 flex flex-col items-center justify-center min-h-[300px] text-center'>
        <div className='w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6'>
          <BookOpen className='h-8 w-8 text-primary' />
        </div>

        <h3 className='text-lg font-medium text-gray-800 mb-2'>Chưa có khóa học nào được kích hoạt</h3>
        <p className='text-gray-500 text-sm max-w-md mb-6'>
          Tài khoản này chưa được đăng ký khóa học nào. Bạn có thể đăng ký khóa học mới để bắt đầu hành trình học tập.
        </p>

        <Button variant='outline' className='border-primary/20 text-primary hover:bg-primary/5'>
          <Plus className='mr-2 h-4 w-4' />
          Đăng ký khóa học mới
        </Button>

        <Button variant='ghost' className='text-gray-600 hover:text-gray-800'>
          Xem danh sách khóa học
        </Button>

        <div className='mt-8 w-full flex justify-center'>
          <div className='w-full max-w-sm h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent'></div>
        </div>

        <p className='text-xs text-gray-400 mt-6'>
          Các khóa học sẽ tự động được hiển thị tại đây khi tài khoản được đăng ký
        </p>
      </CardContent>
    </Card>
  )
}
