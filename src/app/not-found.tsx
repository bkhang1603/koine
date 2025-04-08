'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, SearchX } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className='min-h-screen bg-white relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.95))]' />
      </div>

      {/* Animated Grid */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#fff_70%,transparent_100%)]' />

      {/* Animated Glow */}
      <div className='absolute inset-0'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[128px] animate-pulse' />
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
            <div className='absolute -inset-4 border border-indigo-500/10 rounded-[2rem]' />
            <div className='absolute -inset-8 border border-indigo-500/5 rounded-[2rem]' />
            <div className='absolute -inset-12 border border-indigo-500/5 rounded-[2rem]' />

            {/* Main Content */}
            <div className='relative p-12 rounded-[2rem] bg-white/95 backdrop-blur-xl border border-indigo-500/10 shadow-xl'>
              <div className='text-center space-y-12'>
                {/* Icon Container */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
                  className='relative mx-auto w-40 h-40'
                >
                  <div className='absolute inset-0 bg-indigo-500/10 rounded-full animate-pulse' />
                  <div className='absolute inset-2 bg-indigo-500/5 rounded-full' />
                  <div className='absolute inset-4 bg-white rounded-full flex items-center justify-center border border-indigo-500/10'>
                    <SearchX className='w-20 h-20 text-indigo-500' />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className='relative inline-block'>
                    <h1 className='text-5xl md:text-6xl font-bold mb-6 h-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300'>
                      Không tìm thấy trang
                    </h1>
                  </div>
                  <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                    Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đi nơi khác.
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
                    onClick={() => window.history.back()}
                    size='lg'
                    variant='outline'
                    className='h-16 px-10 text-lg rounded-full border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300'
                  >
                    <ArrowLeft className='w-6 h-6 mr-2' />
                    Quay lại
                  </Button>
                  <Button
                    asChild
                    size='lg'
                    className='h-16 px-10 text-lg rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 group'
                  >
                    <Link href='/'>
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
