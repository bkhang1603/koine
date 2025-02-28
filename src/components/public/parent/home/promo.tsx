'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import icons from '@/assets/icons'
import images from '@/assets/images'

export default function Promo() {
  return (
    <section className='py-24 overflow-hidden'>
      <div className='container'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-24 items-center'>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className='relative'>
              <span className='bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium'>
                Ưu đãi đặc biệt
              </span>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-6'>
                Bắt đầu hành trình với
                <span
                  className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE] 
                  text-transparent bg-clip-text'
                >
                  {' '}
                  khóa học miễn phí
                </span>
              </h2>
              <p className='text-muted-foreground mb-8 text-lg'>
                Trải nghiệm ngay các khóa học chất lượng từ đội ngũ chuyên gia hàng đầu. Đăng ký ngay hôm nay để nhận ưu
                đãi đặc biệt dành cho người mới bắt đầu.
              </p>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Button size='lg' asChild>
                  <Link href='/course' className='group'>
                    Khám phá khóa học
                    <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>
                <Button size='lg' variant='outline' asChild>
                  <Link href='/contact'>Tư vấn miễn phí</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className='relative'>
              <div className='relative aspect-[4/3] rounded-2xl overflow-hidden'>
                <Image src={images.product} alt='Promo' fill className='object-cover' />
                {/* Overlay Gradient */}
                <div className='absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent' />

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className='absolute top-6 left-6'>
                    <div
                      className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg
                      border border-gray-100/20 p-4 hover:shadow-xl hover:scale-105
                      transition-all duration-300'
                    >
                      <div className='flex items-center gap-4'>
                        <div className='relative'>
                          <div
                            className='w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 
                            flex items-center justify-center'
                          >
                            <Image src={icons.user} alt='Users' width={24} height={24} />
                          </div>
                          {/* Animated Ring */}
                          <div
                            className='absolute -inset-1 rounded-xl border border-primary/20 
                            animate-pulse-slow opacity-70'
                          />
                        </div>
                        <div>
                          <div className='flex items-baseline gap-2'>
                            <div className='font-semibold text-gray-900'>Học viên mới</div>
                            <div className='px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-medium'>
                              +100
                            </div>
                          </div>
                          <div className='text-sm text-gray-500 mt-0.5'>Tuần này</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className='absolute bottom-6 right-6'>
                    <div
                      className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg
                      border border-gray-100/20 p-4 hover:shadow-xl hover:scale-105
                      transition-all duration-300'
                    >
                      <div className='flex items-center gap-4'>
                        <div className='relative'>
                          <div
                            className='w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10
                            flex items-center justify-center group'
                          >
                            <Image
                              src={icons.pinkStar}
                              alt='Rating'
                              width={24}
                              height={24}
                              className='group-hover:rotate-12 transition-transform duration-300'
                            />
                          </div>
                          {/* Star Decoration */}
                          <div className='absolute -top-1 -right-1'>
                            <div className='w-3 h-3 bg-yellow-400 rounded-full animate-ping-slow opacity-70' />
                          </div>
                        </div>
                        <div>
                          <div className='font-semibold text-gray-900 mb-0.5'>Đánh giá</div>
                          <div className='flex items-center gap-1.5'>
                            <div className='flex'>
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className='w-4 h-4 text-yellow-400 fill-current' viewBox='0 0 20 20'>
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>
                              ))}
                            </div>
                            <span className='text-sm font-medium text-gray-600'>4.9/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className='absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl' />
              <div className='absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/5 rounded-full blur-2xl' />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
