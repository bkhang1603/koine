'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, RefreshCw } from 'lucide-react'
import configRoute from '@/config/route'

export default function PublicError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex flex-col min-h-[70vh] items-center justify-center text-center py-20'>
      <div className='w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-8'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-12 h-12 text-destructive'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
          />
        </svg>
      </div>

      <h1 className='text-4xl font-bold mb-3'>Đã xảy ra lỗi</h1>
      <p className='text-muted-foreground text-lg max-w-md mb-8'>
        Chúng tôi không thể xử lý yêu cầu của bạn. Vui lòng thử lại hoặc quay lại trang chủ.
      </p>

      <div className='flex flex-wrap gap-4 justify-center'>
        <Button onClick={reset} className='gap-2' size='lg'>
          <RefreshCw className='w-4 h-4' />
          Thử lại
        </Button>
        <Button variant='outline' asChild size='lg' className='gap-2'>
          <Link href={configRoute.home}>
            <Home className='w-4 h-4' />
            Về trang chủ
          </Link>
        </Button>
      </div>

      {/* Chỉ hiển thị thông tin kỹ thuật trong môi trường development */}
      {process.env.NODE_ENV === 'development' && (
        <div className='mt-12 p-4 bg-muted rounded-lg max-w-2xl mx-auto'>
          <p className='text-sm font-medium mb-2'>Chi tiết lỗi:</p>
          <p className='text-sm text-muted-foreground overflow-auto text-left whitespace-pre-wrap'>{error.message}</p>
        </div>
      )}
    </div>
  )
}
