'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, CheckCircle, AlertCircle, RefreshCw, Mail, Clock, MoveRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import icons from '@/assets/icons'
import { useSendOTPMutation } from '@/queries/useAuth'

// Tạo schema cho form OTP
const otpSchema = z.object({
  otp: z.string().length(6, 'Vui lòng nhập đủ 6 chữ số')
})

type OtpFormValues = z.infer<typeof otpSchema>
type ValidationStatus = 'input' | 'loading' | 'success' | 'error'

export default function OTPPage() {
  const [status, setStatus] = useState<ValidationStatus>('input')
  const [message, setMessage] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState(120) // Mặc định 2 phút
  const searchParams = useSearchParams()

  // Lấy ID từ URL params (được truyền từ email)
  const id = searchParams.get('id')

  // Lấy timestamp từ URL params (khi nào OTP được tạo)
  const timeParam = searchParams.get('time')

  const email = searchParams.get('email') || 'email của bạn'
  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3')

  const sendOTPMutation = useSendOTPMutation()

  // Khởi tạo form
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ''
    }
  })

  // Tính toán thời gian còn lại dựa trên tham số time
  useEffect(() => {
    // Nếu có tham số time từ URL, tính thời gian còn lại
    if (timeParam) {
      try {
        const codeCreationTime = new Date(decodeURIComponent(timeParam)).getTime()
        const expiryTime = codeCreationTime + 5 * 60 * 1000 // 5 phút tính bằng milliseconds

        const updateTimeLeft = () => {
          const now = new Date().getTime()
          const remaining = Math.max(0, Math.floor((expiryTime - now) / 1000))
          setTimeLeft(remaining)

          if (remaining <= 0) {
            clearInterval(timer)
          }
        }

        updateTimeLeft() // Cập nhật ngay lần đầu
        const timer = setInterval(updateTimeLeft, 1000)
        return () => clearInterval(timer)
      } catch (error) {
        console.error('Lỗi khi phân tích tham số time:', error)
      }
    } else {
      // Nếu không có tham số time, sử dụng countdown mặc định 120s
      if (timeLeft <= 0 || status !== 'input') return

      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeParam, timeLeft, status])

  // Xử lý gửi form
  const onSubmit = async (values: OtpFormValues) => {
    setStatus('loading')

    try {
      if (id) {
        // Nếu có ID từ URL, gọi API với ID và code
        await sendOTPMutation.mutateAsync({
          id,
          code: values.otp
        })

        setStatus('success')
        setMessage('Tài khoản đã được xác thực thành công!')
      } else {
        // Mô phỏng xác thực khi không có ID (giữ lại code demo cũ)
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Demo: OTP "123456" luôn thành công, OTP khác kết quả ngẫu nhiên
        if (values.otp === '123456') {
          setStatus('success')
          setMessage('Tài khoản đã được xác thực thành công!')
        } else {
          const isSuccess = Math.random() > 0.5
          if (isSuccess) {
            setStatus('success')
            setMessage('Tài khoản đã được xác thực thành công!')
          } else {
            setStatus('error')
            setMessage('Mã OTP không đúng hoặc đã hết hạn. Vui lòng thử lại.')
          }
        }
      }
    } catch (error: any) {
      setStatus('error')
      setMessage(error.message || 'Mã OTP không đúng hoặc đã hết hạn. Vui lòng thử lại.')
    }
  }

  // Xử lý gửi lại OTP
  const handleResendOtp = async () => {
    // Reset OTP input và countdown
    form.reset({ otp: '' })

    try {
      if (id) {
        // Nếu có ID, gọi API gửi lại OTP với ID

        // Đặt lại thời gian mới (5 phút = 300 giây)
        setTimeLeft(300)
      } else {
        // Xử lý case khi không có ID (giữ nguyên code cũ)
        setTimeLeft(120)
      }

      // Thông báo
      alert('Mã OTP mới đã được gửi đến ' + maskedEmail)
    } catch (error: any) {
      alert('Không thể gửi lại OTP: ' + (error.message || 'Lỗi không xác định'))
    }
  }

  // Reset form
  const handleReset = () => {
    form.reset({ otp: '' })
    setStatus('input')
  }

  // Format thời gian
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' + secs : secs}`
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-primary/5 via-background to-background flex items-center justify-center relative overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none'>
        <div className='absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute top-1/3 right-1/4 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl'></div>
      </div>

      <div className='container relative flex justify-center items-center min-h-screen'>
        {/* Logo ở góc trên bên trái */}
        <div className='absolute top-6 left-6'>
          <Link href='/'>
            <Image src={icons.logo} alt='logo' width={100} height={36} className='object-contain' />
          </Link>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className='w-full max-w-md z-10'
          >
            <Card className='shadow-xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden'>
              {/* Header shown only in input and loading states */}
              {(status === 'input' || status === 'loading') && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='p-6 text-center space-y-3'
                >
                  <div className='relative mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2'>
                    <Mail className='h-7 w-7 text-primary' />
                    <div className='absolute inset-0 rounded-full bg-primary/5 animate-pulse'></div>
                  </div>

                  <h2 className='text-2xl font-bold text-gray-800'>Xác thực OTP</h2>
                  <p className='text-gray-500 max-w-xs mx-auto'>
                    Vui lòng nhập mã OTP đã được gửi đến <span className='font-medium text-primary'>{maskedEmail}</span>{' '}
                    để xác thực tài khoản của bạn
                  </p>
                </motion.div>
              )}

              <div className='p-6'>
                {status === 'input' && (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                      <FormField
                        control={form.control}
                        name='otp'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className='flex flex-col items-center space-y-6'>
                                <div className='w-full flex justify-center py-4'>
                                  <InputOTP
                                    maxLength={6}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    className='gap-2 md:gap-3'
                                  >
                                    <InputOTPGroup>
                                      {Array.from({ length: 6 }).map((_, index) => (
                                        <InputOTPSlot
                                          key={index}
                                          index={index}
                                          className='w-10 h-12 md:w-12 md:h-14 rounded-xl border-gray-200 shadow-sm text-lg ring-primary/50'
                                        />
                                      ))}
                                    </InputOTPGroup>
                                  </InputOTP>
                                </div>

                                <div className='text-center text-red-500 min-h-5'>
                                  <FormMessage />
                                </div>

                                <Button
                                  type='submit'
                                  disabled={form.formState.isSubmitting || field.value.length !== 6 || timeLeft <= 0}
                                  className='w-full md:w-auto md:min-w-[180px] rounded-full h-12 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all duration-300 font-medium'
                                >
                                  {form.formState.isSubmitting ? (
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                  ) : (
                                    <>
                                      Xác nhận
                                      <MoveRight className='ml-2 h-4 w-4' />
                                    </>
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className='text-sm text-center mt-4 space-y-3 pt-2 border-t border-gray-100'>
                        <div className='flex items-center justify-center gap-1 text-gray-500'>
                          <Clock className='h-3.5 w-3.5' />
                          <span>
                            {timeLeft > 0 ? (
                              <>
                                Mã OTP có hiệu lực trong{' '}
                                <span className='font-medium text-primary'>{formatTime(timeLeft)}</span>
                              </>
                            ) : (
                              <span className='text-red-500'>Mã OTP đã hết hạn</span>
                            )}
                          </span>
                        </div>

                        <div>
                          <span className='text-gray-500'>Không nhận được mã?</span>{' '}
                          {timeLeft > 0 ? (
                            <span className='text-gray-400'>Gửi lại sau {formatTime(Math.min(timeLeft, 60))}</span>
                          ) : (
                            <button
                              type='button'
                              onClick={handleResendOtp}
                              className='text-primary font-medium hover:underline focus:outline-none transition-colors'
                            >
                              Gửi lại mã
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </Form>
                )}

                {status === 'loading' && (
                  <div className='flex flex-col items-center gap-6 py-8'>
                    <div className='relative'>
                      <div className='w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center'>
                        <div className='absolute inset-0 rounded-full bg-primary/5 animate-ping'></div>
                        <Loader2 className='h-10 w-10 text-primary animate-spin relative z-10' />
                      </div>
                    </div>
                    <p className='text-center text-gray-600 animate-pulse'>Đang xác thực mã OTP của bạn...</p>
                  </div>
                )}

                {status === 'success' && (
                  <div className='flex flex-col items-center text-center px-4 py-12'>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className='relative mb-8'
                    >
                      <div className='absolute -inset-6 rounded-full bg-green-50/80 animate-pulse opacity-70'></div>
                      <div className='absolute -inset-2 rounded-full bg-green-100/80 animate-pulse'></div>
                      <div className='relative z-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-5 shadow-lg shadow-green-200'>
                        <CheckCircle className='h-16 w-16 text-white' />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className='max-w-xs space-y-10'
                    >
                      <div className='space-y-2'>
                        <h3 className='text-2xl font-bold text-gray-800'>Xác thực thành công!</h3>
                        <p className='text-gray-600'>{message}</p>
                        <p className='text-gray-500 text-sm'>
                          Bạn có thể tiếp tục sử dụng tài khoản của mình ngay bây giờ
                        </p>
                      </div>

                      <Button
                        asChild
                        className='w-full h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-200/50 transition-all duration-300 font-medium'
                      >
                        <Link href='/'>Trở về trang chủ</Link>
                      </Button>
                    </motion.div>
                  </div>
                )}

                {status === 'error' && (
                  <div className='flex flex-col items-center text-center px-4 py-12'>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className='relative mb-8'
                    >
                      <div className='absolute -inset-6 rounded-full bg-red-50/80 animate-pulse opacity-70'></div>
                      <div className='absolute -inset-2 rounded-full bg-red-100/80 animate-pulse'></div>
                      <div className='relative z-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-full p-5 shadow-lg shadow-red-200'>
                        <AlertCircle className='h-16 w-16 text-white' />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className='max-w-xs space-y-4'
                    >
                      <h3 className='text-2xl font-bold text-gray-800'>Xác thực thất bại</h3>
                      <p className='text-gray-600'>{message}</p>

                      <div className='pt-4 flex flex-col gap-3 w-full'>
                        <Button
                          onClick={handleReset}
                          className='w-full h-12 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 shadow-md transition-all duration-300 font-medium'
                        >
                          <RefreshCw className='mr-2 h-4 w-4' />
                          Nhập lại mã OTP
                        </Button>

                        <Button
                          asChild
                          className='w-full h-12 rounded-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg shadow-red-200/50 transition-all duration-300 font-medium'
                        >
                          <Link href='/contact'>Liên hệ hỗ trợ</Link>
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
