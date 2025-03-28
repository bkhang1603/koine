'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-background py-12 px-4'>
      <motion.div
        className='text-center mb-8'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-5xl md:text-6xl font-bold mb-2 text-gray-500'>Oops!</h1>
        <p className='text-muted-foreground text-lg max-w-md mx-auto'>
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
      </motion.div>

      {/* 404 Animation Container */}
      <div className='text-center text-[106px] font-extrabold my-8 mx-[15px]'>
        {/* Number 4 */}
        <span className='inline-block relative w-[136px] h-[43px] rounded-full bg-gradient-to-r from-[#d89ca4] via-[#e27b7e] to-[#e27b7e] shadow-md'>
          <span className='sr-only'>4</span>

          {/* Vertical bar of 4 */}
          <span className='block absolute w-[43px] h-[156px] left-[60px] bottom-[-43px] rounded-full bg-gradient-to-t from-[#99749D] via-[#CC9AA6] to-[#E0787F]'></span>

          {/* Horizontal bar of 4 */}
          <span
            className='block absolute w-[137px] h-[43px] left-[-18px] bottom-[36px] rounded-full bg-gradient-to-r from-[#99749D] via-[#CC9AA6] to-[#E0787F]'
            style={{ transform: 'rotate(-49.5deg)' }}
          ></span>
        </span>

        {/* Number 0 with animation */}
        <span
          className='inline-block align-top relative w-[156px] h-[156px] rounded-full bg-gradient-to-tr from-[#99749D] via-[#CC9AA6] to-[#ED8687] overflow-hidden mx-2'
          style={{ animation: 'bgshadow 5s infinite' }}
        >
          <span className='sr-only'>0</span>

          {/* Inner designs of 0 */}
          <span
            className='block absolute w-[90px] h-[90px] left-0 bottom-0'
            style={{ transform: 'rotate(45deg)' }}
          ></span>

          {/* White circle in the middle of 0 */}
          <span className='block absolute w-[70px] h-[70px] left-[43px] bottom-[43px] rounded-full bg-background dark:bg-gray-900 shadow-[-2px_2px_2px_0px_rgba(0,0,0,0.1)]'></span>
        </span>

        {/* Number 4 */}
        <span className='inline-block relative w-[136px] h-[43px] rounded-full bg-gradient-to-r from-[#d89ca4] via-[#e27b7e] to-[#e27b7e] shadow-md'>
          <span className='sr-only'>4</span>

          {/* Vertical bar of 4 */}
          <span className='block absolute w-[43px] h-[156px] left-[60px] bottom-[-43px] rounded-full bg-gradient-to-t from-[#99749D] via-[#CC9AA6] to-[#E0787F]'></span>

          {/* Horizontal bar of 4 */}
          <span
            className='block absolute w-[137px] h-[43px] left-[-18px] bottom-[36px] rounded-full bg-gradient-to-r from-[#99749D] via-[#CC9AA6] to-[#E0787F]'
            style={{ transform: 'rotate(-49.5deg)' }}
          ></span>
        </span>
      </div>

      {/* Action Buttons - Equal size and matching colors with 404 */}
      <motion.div
        className='flex flex-wrap gap-4 justify-center mt-8 w-full max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          asChild
          size='lg'
          className='gap-2 flex-1 bg-[#d89ca4] hover:bg-[#e27b7e] border-none text-white ease-linear duration-300'
        >
          <Link href='/'>Trang chủ</Link>
        </Button>

        <Button
          variant='outline'
          size='lg'
          onClick={() => window.history.back()}
          className='gap-2 flex-1 border-[#d89ca4] text-[#d89ca4] hover:bg-[#d89ca4]/10 hover:text-[#e27b7e] hover:border-[#e27b7e] ease-linear duration-300'
        >
          Quay lại
        </Button>
      </motion.div>

      {/* CSS for custom animations */}
      <style jsx global>{`
        @keyframes bgshadow {
          0% {
            box-shadow: inset -160px 160px 0px 5px rgba(0, 0, 0, 0.4);
          }
          45% {
            box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
          }
          55% {
            box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
          }
          100% {
            box-shadow: inset 160px -160px 0px 5px rgba(0, 0, 0, 0.4);
          }
        }
      `}</style>
    </div>
  )
}
