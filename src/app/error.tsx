'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// Component hiệu ứng chỉ chạy ở client
function StarryBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Hiệu ứng mưa sao - chỉ render ở client */}
      <div className='absolute inset-0 overflow-hidden'>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className='w-0.5 h-0.5 bg-white'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: 45,
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff)',
              position: 'absolute'
            }}
            initial={{ y: -10, opacity: 0, scale: 0 }}
            animate={{
              y: 200,
              opacity: [0, 1, 0],
              scale: [0, 1, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              delay: Math.random() * 8,
              repeat: Infinity
            }}
          />
        ))}
      </div>

      {/* Ngôi sao lấp lánh - chỉ render ở client */}
      <div className='absolute inset-0 overflow-hidden'>
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i + 100}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              borderRadius: '50%',
              backgroundColor: '#fff',
              position: 'absolute'
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 1, 0.2]
            }}
            transition={{
              duration: 1 + Math.random() * 5,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </>
  )
}

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [clientLoaded, setClientLoaded] = useState(false)

  // Log the error to an error reporting service
  useEffect(() => {
    console.error(error)
    setClientLoaded(true)
  }, [error])

  return (
    <div className='min-h-screen flex items-center justify-center overflow-hidden relative bg-gradient-to-b from-gray-900 via-red-900 to-purple-950'>
      {/* Chỉ render hiệu ứng sao ở client-side */}
      <StarryBackground />

      {/* Content - phần tĩnh sẽ giống nhau giữa server và client */}
      <div className='relative z-10 max-w-2xl mx-auto text-center'>
        <div className='p-8 md:p-12 rounded-2xl relative overflow-hidden border border-white/10 shadow-lg backdrop-blur-xl'>
          <div className='absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10'></div>

          <div className='relative z-10'>
            <div className='mb-8 relative'>
              <div className='relative w-28 h-28 mx-auto'>
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-purple-500'></div>
                <div className='absolute inset-1 rounded-full bg-gradient-to-b from-gray-900 via-red-900/50 to-purple-950/80 flex items-center justify-center'>
                  <span className='text-6xl font-bold text-white'>!</span>
                </div>
              </div>

              <div className='absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-2xl'></div>
              <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl'></div>
            </div>

            <h1 className='text-2xl md:text-3xl font-semibold text-white mb-4'>Đã xảy ra lỗi</h1>

            <div className='w-20 h-0.5 bg-gradient-to-r from-red-500 to-purple-500 mx-auto mb-6'></div>

            <p className='text-gray-300 mb-8 max-w-md mx-auto'>
              Hệ thống đã gặp sự cố. Bạn có thể thử làm mới trang hoặc quay lại trang chủ.
            </p>

            {/* AnimatePresence đảm bảo animation chỉ chạy ở client */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <AnimatePresence>
                {clientLoaded && (
                  <motion.button
                    onClick={reset}
                    className='relative group px-6 py-3 overflow-hidden rounded-lg'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className='absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-red-500 to-purple-500 group-hover:from-red-600 group-hover:to-purple-600'></div>
                    <div className='absolute -inset-0 w-full h-full border-2 border-white/30 rounded-lg'></div>
                    <div className='relative flex items-center justify-center text-white font-medium'>
                      <svg
                        className='w-5 h-5 mr-2'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                        ></path>
                      </svg>
                      Thử lại
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {clientLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href='/' className='relative group px-6 py-3 overflow-hidden rounded-lg flex'>
                      <div className='absolute inset-0 w-full h-full bg-white/10 transition-all duration-300 group-hover:bg-white/20'></div>
                      <div className='absolute -inset-0 w-full h-full border-2 border-white/30 rounded-lg'></div>
                      <div className='relative flex items-center justify-center text-white font-medium'>
                        <svg
                          className='w-5 h-5 mr-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                          ></path>
                        </svg>
                        Về trang chủ
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
