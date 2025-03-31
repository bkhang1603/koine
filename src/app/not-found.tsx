'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Component hiệu ứng chỉ chạy ở client
function StarryBackground() {
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

export default function NotFoundPage() {
  const [clientLoaded, setClientLoaded] = useState(false)

  useEffect(() => {
    setClientLoaded(true)
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center overflow-hidden relative bg-gradient-to-b from-gray-900 via-purple-900 to-violet-950'>
      {/* Chỉ render hiệu ứng sao ở client-side */}
      <StarryBackground />

      {/* Content - phần tĩnh sẽ giống nhau giữa server và client */}
      <div className='relative z-10 max-w-2xl mx-auto text-center'>
        <div className='p-8 md:p-12 rounded-2xl relative overflow-hidden border border-white/10 shadow-lg backdrop-blur-xl'>
          <div className='absolute inset-0 bg-gradient-to-br from-pink-500/10 to-blue-500/10'></div>

          <div className='relative z-10'>
            <div className='mb-8 relative'>
              <div className='text-[120px] md:text-[160px] font-bold leading-none select-none'>
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300'>4</span>
                <span className='inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400'>
                  0
                </span>
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-300'>4</span>
              </div>

              <div className='absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl'></div>
              <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl'></div>
            </div>

            <h1 className='text-2xl md:text-3xl font-semibold text-white mb-4'>Không tìm thấy trang</h1>

            <div className='w-20 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto mb-6'></div>

            <p className='text-gray-300 mb-8 max-w-md mx-auto'>
              Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đi nơi khác.
            </p>

            {/* AnimatePresence đảm bảo animation chỉ chạy ở client */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <AnimatePresence>
                {clientLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href='/' className='relative group px-6 py-3 overflow-hidden rounded-lg flex'>
                      <div className='absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:from-pink-600 group-hover:to-blue-600'></div>
                      <div className='absolute -inset-0 w-full h-full border-2 border-white/30 rounded-lg'></div>
                      <div className='relative flex items-center justify-center text-white font-medium'>
                        Về trang chủ
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {clientLoaded && (
                  <motion.button
                    onClick={() => window.history.back()}
                    className='relative group px-6 py-3 overflow-hidden rounded-lg'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className='absolute inset-0 w-full h-full bg-white/10 transition-all duration-300 group-hover:bg-white/20'></div>
                    <div className='absolute -inset-0 w-full h-full border-2 border-white/30 rounded-lg'></div>
                    <div className='relative flex items-center justify-center text-white font-medium'>Quay lại</div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
