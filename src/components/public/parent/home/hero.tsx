'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, ShieldCheck, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import images from '@/assets/images'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: <Heart className='w-6 h-6' />,
    title: 'An toàn & Tin cậy',
    description: 'Môi trường học tập được kiểm duyệt chặt chẽ'
  },
  {
    icon: <ShieldCheck className='w-6 h-6' />,
    title: 'Chuyên gia tận tâm',
    description: 'Đội ngũ giảng viên giàu kinh nghiệm'
  },
  {
    icon: <Sparkles className='w-6 h-6' />,
    title: 'Nội dung phù hợp',
    description: 'Được thiết kế riêng cho từng độ tuổi'
  }
]

export default function Hero() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)

  return (
    <section className='relative min-h-[100vh] flex items-center pt-16'>
      <div className='container relative'>
        <div className='flex flex-col lg:flex-row items-center gap-12'>
          {/* Content */}
          <div className='flex-1 relative'>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold'>
                Khám phá
                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#FF597D] to-secondary leading-[1.4] pb-1'>
                  giáo dục giới tính
                </span>
                <span className='block'>cùng con bạn</span>
              </h1>

              <p className='mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl'>
                Nền tảng giáo dục giới tính toàn diện đầu tiên tại Việt Nam, giúp trẻ phát triển một cách tự nhiên và
                lành mạnh.
              </p>

              <div className='mt-8 flex flex-col sm:flex-row gap-4'>
                <Button asChild size='lg' className='h-12 px-6 text-base rounded-full group'>
                  <Link href='/course'>
                    Bắt đầu ngay
                    <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>
                <Button
                  asChild
                  size='lg'
                  variant='outline'
                  className='h-12 px-6 text-base rounded-full border-2 hover:bg-primary/5'
                >
                  <Link href='/about'>Tìm hiểu thêm</Link>
                </Button>
              </div>

              {/* Features */}
              <div className='mt-12 flex items-start gap-8'>
                <div className='flex gap-4'>
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div
                        className='relative'
                        onMouseEnter={() => setActiveFeature(index)}
                        onMouseLeave={() => setActiveFeature(null)}
                      >
                        {/* Icon Container */}
                        <div
                          className={cn(
                            'relative w-16 h-16 rounded-2xl flex items-center justify-center cursor-pointer',
                            'bg-white/60 backdrop-blur-sm',
                            'transition-all duration-300 ease-out',
                            'before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-transparent',
                            'before:transition-all before:duration-300',
                            activeFeature === index
                              ? [
                                  'scale-105',
                                  'bg-gradient-to-b from-white to-primary/5',
                                  'shadow-[0_0_0_2px_rgba(255,89,125,0.2),0_8px_20px_-4px_rgba(255,89,125,0.1)]',
                                  'text-primary',
                                  'before:border-primary/30 before:scale-110 before:opacity-0'
                                ].join(' ')
                              : [
                                  'text-gray-500',
                                  'shadow-[0_0_0_1.5px_rgba(0,0,0,0.08)]',
                                  'hover:text-primary hover:shadow-[0_0_0_2px_rgba(255,89,125,0.15)]',
                                  'hover:bg-gradient-to-b hover:from-white hover:to-primary/[0.02]',
                                  'before:scale-100 before:opacity-100'
                                ].join(' ')
                          )}
                        >
                          <div
                            className='relative z-10 transition-transform duration-300 ease-out
                            group-hover:scale-105'
                          >
                            {feature.icon}
                          </div>

                          {/* Pulse Effect */}
                          {activeFeature === index && (
                            <div className='absolute -inset-1 rounded-2xl animate-pulse-ring' />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Common Expanding Card */}
                <div className='relative h-16'>
                  <AnimatePresence>
                    {activeFeature !== null && (
                      <motion.div
                        key={activeFeature}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 320, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className='absolute left-0 top-1/2 -translate-y-1/2
                        bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden
                        border border-primary/10 shadow-lg shadow-primary/5'
                      >
                        <div className='relative w-[320px]'>
                          <div className='p-5'>
                            {/* Title with Decorative Line */}
                            <div className='flex items-center gap-3 mb-3'>
                              <div
                                className='flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 
                                flex items-center justify-center text-primary'
                              >
                                {features[activeFeature].icon}
                              </div>
                              <div className='flex-grow h-[2px] bg-gradient-to-r from-primary/20 to-transparent' />
                            </div>

                            {/* Content */}
                            <div>
                              <h3 className='text-base font-semibold text-gray-900 mb-2'>
                                {features[activeFeature].title}
                              </h3>
                              <p className='text-sm text-gray-600 leading-relaxed line-clamp-1'>
                                {features[activeFeature].description}
                              </p>
                            </div>

                            {/* Bottom Decoration */}
                            <div
                              className='absolute bottom-0 right-0 w-32 h-32 
                              bg-gradient-to-tl from-primary/5 to-transparent 
                              rounded-tl-full -z-10'
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Section */}
          <div className='flex-1 relative lg:max-w-[45%] hidden lg:block'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className='relative'
            >
              <div className='relative aspect-[4/3] rounded-[2rem] overflow-hidden transform hover:scale-[1.02] transition-transform duration-500'>
                <Image src={images.heroImage} alt='Hero' fill className='object-cover' priority />
                <div className='absolute inset-0 bg-gradient-to-tr from-black/20 via-black/5 to-transparent' />
              </div>

              {/* Floating Elements */}
              <div className='absolute -bottom-8 -right-8 flex gap-4'>
                {/* Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className='bg-white rounded-2xl shadow-xl p-4 border border-gray-100/50
                    backdrop-blur-sm relative overflow-hidden'
                >
                  <div className='flex items-center gap-4 relative z-10'>
                    <div
                      className='w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 
                      flex items-center justify-center group cursor-pointer
                      transition-transform duration-300 hover:scale-110'
                    >
                      <Sparkles
                        className='w-6 h-6 text-primary transform transition-transform 
                        duration-300 group-hover:rotate-12'
                      />
                    </div>
                    <div>
                      <div className='flex items-baseline gap-1'>
                        <div
                          className='font-bold text-xl bg-gradient-to-r from-primary to-secondary 
                          bg-clip-text text-transparent'
                        >
                          1000+
                        </div>
                        <div className='text-xs font-medium text-gray-400'>học viên</div>
                      </div>
                      <div className='text-sm text-gray-600 font-medium'>đang tin tưởng sử dụng</div>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div
                    className='absolute top-0 right-0 w-24 h-24 bg-gradient-to-b 
                    from-primary/5 to-transparent rounded-full blur-xl'
                  />
                  <div
                    className='absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-t 
                    from-secondary/5 to-transparent rounded-full blur-xl'
                  />
                </motion.div>

                {/* Rating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-3
                    border border-gray-100/50 self-start'
                >
                  <div className='flex gap-0.5'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                    ))}
                  </div>
                  <div className='text-xs font-medium text-gray-500 mt-1'>Đánh giá trung bình</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
