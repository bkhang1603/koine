'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { XCircle, Home, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import configRoute from '@/config/route'

function CancelPurchasePage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const code = searchParams.get('code')
  const id = searchParams.get('id')
  const status = searchParams.get('status')
  const orderCode = searchParams.get('orderCode')
  const isCancel = searchParams.get('cancel') === 'true'

  useEffect(() => {
    // Validate required params
    if (!code || !id || !status || !orderCode) {
      router.push('/404')
      return
    }

    // Handle cancel payment logic here
    console.log({
      code,
      id,
      status,
      orderCode,
      isCancel
    })
  }, [code, id, status, orderCode, router, isCancel])

  return (
    <div className='min-h-[100vh] flex items-center justify-center py-32'>
      <div className='max-w-md w-full mx-auto text-center px-4'>
        <div className='mb-6 flex justify-center'>
          <div className='h-24 w-24 rounded-full bg-red-50 flex items-center justify-center'>
            <XCircle className='h-12 w-12 text-red-500' />
          </div>
        </div>

        <h1 className='text-2xl font-semibold text-gray-900 mb-3'>Thanh toán không thành công</h1>

        <div className='bg-white rounded-lg border border-gray-200 p-4 mb-6'>
          <p className='text-gray-600 mb-3'>
            Đơn hàng <span className='font-medium text-gray-900'>#{orderCode}</span> đã bị hủy
          </p>
          <p className='text-sm text-gray-500'>
            Rất tiếc giao dịch của bạn không thể hoàn thành. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
          </p>
        </div>

        <div className='space-y-3'>
          <Button variant='default' className='w-full gap-2' onClick={() => (window.location.href = '/checkout')}>
            <RotateCcw className='h-4 w-4' />
            Thử lại thanh toán
          </Button>

          <Button variant='outline' className='w-full gap-2' asChild>
            <Link href={configRoute.home}>
              <Home className='h-4 w-4' />
              Về trang chủ
            </Link>
          </Button>
        </div>

        <p className='mt-6 text-sm text-gray-500'>
          Nếu bạn cần hỗ trợ, vui lòng liên hệ{' '}
          <a href='tel:0934600600' className='text-primary hover:underline'>
            0934 600 600
          </a>
        </p>
      </div>
    </div>
  )
}

export default CancelPurchasePage
