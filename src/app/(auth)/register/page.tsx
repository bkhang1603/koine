'use client'

import icons from '@/assets/icons'
import { Button } from '@/components/ui/button'
import configRoute from '@/config/route'
import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '@/components/form/register-form'
import envConfig from '@/config'
import { motion } from 'framer-motion'

function RegisterPage() {
  return (
    <section className='min-h-screen flex flex-col'>
      {/* Logo header */}
      <div className='container min-h-[80px] flex items-center relative z-10'>
        <Link href={configRoute.home}>
          <Image src={icons.logo} alt='Koine logo' width={100} height={100} />
        </Link>
      </div>

      {/* Main content - centered vertically and horizontally */}
      <div className='flex-1 flex items-center justify-center pb-20'>
        <div className='container flex justify-center items-center flex-col relative z-10'>
          <h1
            className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
              inline-block text-transparent bg-clip-text text-3xl lg:text-5xl font-bold lg:h-14'
          >
            Đăng ký
          </h1>

          <RegisterForm className='mt-7' />

          <div className='my-8 flex items-center w-full md:w-[600px]'>
            <div className='border-t border-sixth/80 w-full' />
            <span className='text-sixth text-sm font-medium px-4'>Hoặc</span>
            <div className='border-t border-sixth/80 w-full' />
          </div>

          <Button variant='outline' className='w-full md:w-[600px] text-base h-10' disabled>
            <Image src={icons.facebook} alt='Google' width={24} height={24} className='mr-3' />
            Đăng ký với Facebook
          </Button>

          <Button variant='outline' className='w-full md:w-[600px] text-base h-10 mt-5'>
            <Link href={envConfig.NEXT_PUBLIC_GOOGLE_URL_LOCAL} className='flex items-center justify-center'>
              <Image src={icons.google} alt='Google' width={24} height={24} className='mr-3' />
              Đăng ký với Google
            </Link>
          </Button>

          <p className='text-secondary font-semibold mt-4 text-center text-sm sm:text-base'>
            Bạn đã có tài khoản? {''}
            <Link href={configRoute.login} className='text-sixth hover:text-sixth/80'>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>

      {/* Animated background shapes */}
      <div className='fixed inset-0 -z-10'>
        <motion.div
          className='absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-3xl'
          animate={{
            x: [-100, 100],
            y: [-50, 50],
            scale: [0.8, 1.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          style={{
            top: '20%',
            left: '10%'
          }}
        />

        <motion.div
          className='absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-3xl'
          animate={{
            x: [100, -100],
            y: [50, -50],
            scale: [1.2, 0.8]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          style={{
            top: '40%',
            right: '10%'
          }}
        />

        <motion.div
          className='absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-3xl'
          animate={{
            x: [-50, 50],
            y: [100, -100],
            scale: [1, 1.5]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          style={{
            bottom: '10%',
            left: '30%'
          }}
        />
      </div>
    </section>
  )
}

export default RegisterPage
