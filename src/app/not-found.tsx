'use client'

import images from '@/assets/images'
import { Button } from '@/components/ui/button'
import configRoute from '@/config/route'
import { Home, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function NotFoundPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className='min-h-screen overflow-hidden relative bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30'>
      {/* Floating background elements */}
      <div className='absolute inset-0 overflow-hidden z-0'>
        <motion.div
          className='absolute top-[10%] left-[10%] w-32 h-32 rounded-full bg-primary/5'
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className='absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-secondary/5'
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.95, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className='absolute top-[35%] right-[25%] w-24 h-24 rounded-full bg-amber-400/5'
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: 'easeInOut'
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.015]" />
      </div>

      <div className='container max-w-6xl mx-auto relative z-10 pt-12 sm:pt-20 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]'>
        <div className='flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16'>
          <div className='flex-1 max-w-md'>
            {/* 404 image with floating animation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='relative'
            >
              <motion.div
                animate={{
                  y: [0, -15, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: 'easeInOut'
                }}
              >
                <Image src={images.notFound404} alt='404' width={350} height={350} quality={100} className='mx-auto' />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className='flex-1 max-w-md text-center lg:text-left'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-primary/80'>
              Không tìm thấy trang
            </h1>

            <motion.p
              className='mt-4 text-lg text-gray-600 sm:text-xl'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến một vị trí khác.
            </motion.p>

            <div className='mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild variant='default' size='lg' className='h-12 px-6 w-full sm:w-auto gap-2'>
                  <Link href={configRoute.home}>
                    <Home className='w-4 h-4 mr-1' />
                    Quay về trang chủ
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='h-12 px-6 w-full sm:w-auto border-gray-300'
                  onClick={() => window.history.back()}
                >
                  <button>
                    <RefreshCw className='w-4 h-4 mr-1' />
                    Quay lại trang trước
                  </button>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <motion.div
        className='absolute bottom-0 left-0 right-0 z-10 w-full'
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 160'
          className='w-full h-auto transform scale-110'
          preserveAspectRatio='none'
        >
          <path
            fill='#f0fbff'
            fillOpacity='0.8'
            d='M0,64L48,74.7C96,85,192,107,288,106.7C384,107,480,85,576,74.7C672,64,768,64,864,85.3C960,107,1056,149,1152,149.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          />
          <path
            fill='#dff6ff'
            fillOpacity='0.6'
            d='M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,160C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          />
        </svg>
      </motion.div>
    </section>
  )
}

export default NotFoundPage
