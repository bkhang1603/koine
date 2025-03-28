'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function TestErrorPage() {
  const [errorType, setErrorType] = useState<string>('none')

  const triggerError = (type: string) => {
    if (type === 'sync') {
      throw new Error('Đây là lỗi đồng bộ từ component')
    } else if (type === 'async') {
      setErrorType('async')
      // Set timeout để tạo hiệu ứng async
      setTimeout(() => {
        throw new Error('Đây là lỗi bất đồng bộ')
      }, 500)
    } else if (type === 'fetch') {
      setErrorType('fetch')
      // Gọi một API không tồn tại
      fetch('/api/endpoint-khong-ton-tai')
        .then((res) => {
          if (!res.ok) throw new Error('Lỗi API: ' + res.status)
          return res.json()
        })
        .catch((err) => {
          throw new Error('Lỗi fetch: ' + err.message)
        })
    }
  }

  return (
    <div className='container py-20 max-w-3xl mx-auto'>
      <div className='bg-card rounded-lg shadow-lg p-8 mb-8'>
        <h1 className='text-3xl font-bold mb-6'>Trang Test Màn Hình Error</h1>
        <p className='text-muted-foreground mb-8'>
          Trang này cho phép bạn kích hoạt các loại lỗi khác nhau để kiểm tra màn hình error hoạt động như thế nào.
        </p>

        <div className='grid gap-4 md:grid-cols-3'>
          <Button
            variant='destructive'
            onClick={() => triggerError('sync')}
            disabled={errorType !== 'none'}
            className='w-full'
          >
            Lỗi Đồng Bộ
          </Button>

          <Button
            variant='destructive'
            onClick={() => triggerError('async')}
            disabled={errorType !== 'none'}
            className='w-full'
          >
            Lỗi Bất Đồng Bộ
          </Button>

          <Button
            variant='destructive'
            onClick={() => triggerError('fetch')}
            disabled={errorType !== 'none'}
            className='w-full'
          >
            Lỗi Fetch API
          </Button>
        </div>

        {errorType !== 'none' && (
          <div className='mt-6 text-center'>
            <div className='animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4'></div>
            <p>Đang tạo lỗi {errorType}...</p>
          </div>
        )}
      </div>

      <div className='bg-amber-50 border border-amber-200 rounded-lg p-6'>
        <h2 className='text-lg font-medium text-amber-800 mb-2'>Lưu ý quan trọng</h2>
        <p className='text-amber-700'>
          Sau khi xem màn hình lỗi, bạn có thể phải tải lại trang để tiếp tục test. Các lỗi này sẽ làm crash component
          và kích hoạt Error Boundary của Next.js để hiển thị màn hình error.
        </p>
      </div>
    </div>
  )
}
