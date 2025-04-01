'use client'

import icons from '@/assets/icons'
import LoginForm from '@/components/form/login-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import configRoute from '@/config/route'
import envConfig from '@/config'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface LoginModalProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  onRegisterClick?: () => void
}

export default function LoginModal({ open, onOpenChange, onSuccess, onRegisterClick }: LoginModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[650px] p-0 overflow-hidden border-none'>
        <DialogTitle className='sr-only'>Đăng nhập</DialogTitle>
        <div className='relative overflow-hidden bg-white rounded-lg shadow-xl'>
          {/* Logo header */}
          <div className='p-6 flex justify-center relative z-10'>
            <Link href={configRoute.home} className='inline-block'>
              <Image src={icons.logo} alt='Koine logo' width={100} height={100} />
            </Link>
          </div>

          {/* Main content */}
          <div className='px-6 pb-8 flex justify-center items-center flex-col relative z-10'>
            <h1
              className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
                inline-block text-transparent bg-clip-text text-2xl sm:text-3xl font-bold'
            >
              Đăng nhập
            </h1>

            <LoginForm className='mt-7 w-full' onSuccess={onSuccess} />

            <div className='my-6 flex items-center w-full'>
              <div className='border-t border-sixth/80 w-full' />
              <span className='text-sixth text-sm font-medium px-4'>Hoặc</span>
              <div className='border-t border-sixth/80 w-full' />
            </div>

            <Button variant='outline' className='w-full text-base h-10' disabled>
              <Image src={icons.facebook} alt='Facebook' width={24} height={24} className='mr-3' />
              Đăng nhập với Facebook
            </Button>

            <Button variant='outline' className='w-full text-base h-10 mt-4'>
              <Link href={envConfig.NEXT_PUBLIC_GOOGLE_URL_LOCAL} className='flex items-center justify-center w-full'>
                <Image src={icons.google} alt='Google' width={24} height={24} className='mr-3' />
                Đăng nhập với Google
              </Link>
            </Button>

            <p className='text-secondary font-medium mt-4 text-center text-sm'>
              Bạn chưa có tài khoản? {''}
              <Link
                href={configRoute.register}
                className='text-sixth hover:text-sixth/80'
                onClick={(e) => {
                  e.preventDefault()
                  if (onRegisterClick) onRegisterClick()
                }}
              >
                Đăng ký
              </Link>
            </p>
          </div>

          {/* Animated background shapes */}
          <div className='absolute inset-0 -z-0 overflow-hidden opacity-30'>
            <motion.div
              className='absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-3xl'
              animate={{
                x: [-50, 50],
                y: [-30, 30],
                scale: [0.8, 1.2]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{
                top: '10%',
                left: '10%'
              }}
            />

            <motion.div
              className='absolute w-[250px] h-[250px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-3xl'
              animate={{
                x: [50, -50],
                y: [30, -30],
                scale: [1.2, 0.8]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{
                top: '30%',
                right: '10%'
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
