'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Home, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import configRoute from '@/config/route'
import { useAppStore } from '@/components/app-provider'

function SuccessPurchasePage() {
  const orderId = useAppStore((state) => state.orderId)
  const searchParams = useSearchParams()
  const router = useRouter()

  const code = searchParams.get('code')
  const id = searchParams.get('id')
  const status = searchParams.get('status')
  const orderCode = searchParams.get('orderCode')

  useEffect(() => {
    if (!code || !id || !status || !orderCode) {
      router.push('/404')
      return
    }
  }, [code, id, status, orderCode, router])

  return (
    <div className='min-h-[100vh] flex items-center justify-center py-32'>
      <div className='max-w-md w-full mx-auto text-center px-4'>
        <div className='mb-6 flex justify-center'>
          <div className='h-24 w-24 rounded-full bg-green-50 flex items-center justify-center'>
            <CheckCircle2 className='h-12 w-12 text-green-500' />
          </div>
        </div>

        <h1 className='text-2xl font-semibold text-gray-900 mb-3'>Thanh toán thành công!</h1>

        <div className='bg-white rounded-lg border border-gray-200 p-4 mb-6'>
          <div className='flex flex-col gap-2 mb-3'>
            <p className='text-gray-600'>
              Đơn hàng <span className='font-medium text-gray-900'>#{orderCode}</span>
            </p>
            <div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
              <span className='w-2 h-2 rounded-full bg-green-500' />
              Đã thanh toán
            </div>
          </div>

          <div className='border-t border-dashed pt-3'>
            <p className='text-sm text-gray-500'>
              Cảm ơn bạn đã mua hàng! Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
            </p>
          </div>
        </div>

        <div className='space-y-3'>
          <Button variant='default' className='w-full gap-2' asChild>
            <Link href={`${configRoute.setting.order}/${orderId}`}>
              <FileText className='h-4 w-4' />
              Xem chi tiết đơn hàng
            </Link>
          </Button>

          <Button variant='outline' className='w-full gap-2' asChild>
            <Link href={configRoute.home}>
              <Home className='h-4 w-4' />
              Về trang chủ
            </Link>
          </Button>
        </div>

        <div className='mt-6 rounded-lg bg-blue-50 p-4'>
          <p className='text-sm font-medium text-blue-900 mb-1'>Bạn có thể thích</p>
          <Link
            href={configRoute.course}
            className='text-sm text-blue-700 hover:text-blue-900 flex items-center justify-center gap-1'
          >
            Khám phá thêm các khóa học khác
            <ArrowRight className='h-4 w-4' />
          </Link>
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

export default SuccessPurchasePage
