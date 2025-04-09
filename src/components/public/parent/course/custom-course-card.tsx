'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Sparkles } from 'lucide-react'
import configRoute from '@/config/route'
import { useAppStore } from '@/components/app-provider'
import { useAuthModal } from '@/components/auth/auth-modal-provider'
import { useRouter } from 'next/navigation'

interface CustomCourseCardProps {
  variant?: 'mobile' | 'desktop'
}

export function CustomCourseCard({ variant = 'desktop' }: CustomCourseCardProps) {
  const isAuth = useAppStore((state) => state.isAuth)
  const { showLoginModal } = useAuthModal()
  const router = useRouter()

  const handleClick = () => {
    if (!isAuth) {
      showLoginModal()
      return
    }

    router.push(configRoute.customCourse)
  }

  if (variant === 'mobile') {
    return (
      <div className='flex items-center justify-between bg-white p-4 rounded-lg border'>
        <div className='flex items-center gap-3'>
          <div className='bg-primary/10 p-2 rounded-full'>
            <Sparkles className='w-5 h-5 text-primary' />
          </div>
          <div>
            <h3 className='font-medium text-sm'>Tạo khóa học riêng</h3>
            <p className='text-xs text-muted-foreground mt-0.5'>Tùy chỉnh nội dung theo nhu cầu</p>
          </div>
        </div>
        <Button size='sm' variant='outline' className='whitespace-nowrap' onClick={handleClick}>
          <Plus className='w-3 h-3 mr-1' />
          Bắt đầu
        </Button>
      </div>
    )
  }

  return (
    <Card className='p-4 mt-6'>
      <div className='flex items-center gap-2 text-primary mb-2'>
        <Sparkles className='w-5 h-5' />
        <h3 className='font-medium'>Tạo khóa học riêng</h3>
      </div>
      <p className='text-sm text-muted-foreground mb-4'>Tự do thiết kế nội dung học tập theo nhu cầu của bạn</p>
      <Button className='w-full' onClick={handleClick}>
        <Plus className='w-4 h-4 mr-2' />
        Bắt đầu ngay
      </Button>
    </Card>
  )
}
