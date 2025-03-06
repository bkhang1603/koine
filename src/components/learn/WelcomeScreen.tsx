import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'

export const WelcomeScreen = () => {
  return (
    <div className='text-center py-12'>
      <div className='w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6'>
        <BookOpen className='w-10 h-10 text-primary' />
      </div>
      <h2 className='text-2xl font-bold mb-3'>Chào mừng bạn đến với khóa học!</h2>
      <p className='text-gray-600 max-w-md mx-auto mb-8'>
        Hãy bắt đầu hành trình học tập của bạn bằng cách chọn một bài học từ danh sách bên trái.
      </p>
      <Button className='rounded-full'>Bắt đầu học ngay</Button>
    </div>
  )
}
