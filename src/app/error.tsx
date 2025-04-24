'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowLeft, Home } from 'lucide-react'
import configRoute from '@/config/route'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='min-h-screen bg-white relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.05),transparent_70%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.95))]' />
      </div>

      {/* Animated Grid */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#fff_70%,transparent_100%)]' />

      {/* Animated Glow */}
      <div className='absolute inset-0'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[128px] animate-pulse' />
      </div>

      <div className='container relative flex items-center justify-center min-h-screen py-8'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-4xl'
        >
          <div className='relative'>
            {/* Decorative Elements */}
            <div className='absolute -inset-4 border border-red-500/10 rounded-[2rem]' />
            <div className='absolute -inset-8 border border-red-500/5 rounded-[2rem]' />
            <div className='absolute -inset-12 border border-red-500/5 rounded-[2rem]' />

            {/* Main Content */}
            <div className='relative p-12 rounded-[2rem] bg-white/95 backdrop-blur-xl border border-red-500/10 shadow-xl'>
              <div className='text-center space-y-12'>
                {/* Icon Container */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
                  className='relative mx-auto w-40 h-40'
                >
                  <div className='absolute inset-0 bg-red-500/10 rounded-full animate-pulse' />
                  <div className='absolute inset-2 bg-red-500/5 rounded-full' />
                  <div className='absolute inset-4 bg-white rounded-full flex items-center justify-center border border-red-500/10'>
                    <AlertCircle className='w-20 h-20 text-red-500' />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className='relative inline-block'>
                    <h1 className='text-5xl md:text-6xl font-bold mb-6 h-16 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-300'>
                      Đã xảy ra lỗi
                    </h1>
                  </div>
                  <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                    Hệ thống đã gặp sự cố. Bạn có thể thử làm mới trang hoặc quay lại trang chủ.
                  </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className='flex flex-col sm:flex-row gap-6 justify-center pt-4'
                >
                  <Button
                    onClick={reset}
                    size='lg'
                    className='h-16 px-10 text-lg rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300 group'
                  >
                    <ArrowLeft className='w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform' />
                    Thử lại
                  </Button>
                  <Button
                    asChild
                    size='lg'
                    variant='outline'
                    className='h-16 px-10 text-lg rounded-full border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300'
                  >
                    <Link href={configRoute.home}>
                      <Home className='w-6 h-6 mr-2' />
                      Về trang chủ
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
