'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter()

  return (
    <main className='min-h-screen flex flex-col justify-center items-center px-6 py-24 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background/80 -z-10' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl -z-10' />

      <div className='container max-w-3xl mx-auto text-center'>
        {/* Error illustration */}
        <div className='relative w-64 h-64 mx-auto mb-8'>
          <Image
            src='/error-illustration.svg'
            alt='Error Illustration'
            width={300}
            height={300}
            className='w-full h-full'
            priority
          />
        </div>

        {/* Error code - design element */}
        <div className='inline-block mb-4 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium'>
          {error.digest ? `Error ${error.digest.substring(0, 6)}` : 'Something went wrong'}
        </div>

        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Oops! Đã xảy ra lỗi</h1>

        <p className='text-muted-foreground text-lg mb-8 max-w-xl mx-auto'>
          Hệ thống đã gặp sự cố không mong muốn. Vui lòng thử lại sau hoặc quay lại trang chủ.
        </p>

        {/* Action buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button variant='default' size='lg' className='gap-2' onClick={() => reset()}>
            <RefreshCw className='w-4 h-4' />
            Thử lại
          </Button>

          <Button variant='outline' size='lg' className='gap-2' onClick={() => router.back()}>
            <ArrowLeft className='w-4 h-4' />
            Quay lại
          </Button>

          <Button variant='secondary' size='lg' asChild className='gap-2'>
            <Link href='/'>
              <Home className='w-4 h-4' />
              Về trang chủ
            </Link>
          </Button>
        </div>

        {/* Technical details (optional) */}
        <div className='mt-12 text-sm text-muted-foreground'>
          <p>Mã lỗi: {error.digest || 'Unknown'}</p>
          <p className='mt-1'>{error.message || 'An unexpected error occurred'}</p>
        </div>
      </div>
    </main>
  )
}
