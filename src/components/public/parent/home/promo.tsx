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
            className='relative'
          >
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
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='relative'
          >
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden'>
              <Image src={images.product} alt='Promo' fill className='object-cover' />
              {/* Overlay Gradient */}
              <div className='absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent' />

              {/* Floating Elements */}
              <div className='absolute top-6 left-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                    <Image src={icons.user} alt='Users' width={20} height={20} />
                  </div>
                  <div>
                    <div className='font-semibold'>Học viên mới</div>
                    <div className='text-sm text-muted-foreground'>+100 tuần này</div>
                  </div>
                </div>
              </div>

              <div className='absolute bottom-6 right-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                    <Image src={icons.pinkStar} alt='Rating' width={20} height={20} />
                  </div>
                  <div>
                    <div className='font-semibold'>Đánh giá</div>
                    <div className='text-sm text-muted-foreground'>4.9/5 sao</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className='absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl' />
            <div className='absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/5 rounded-full blur-2xl' />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
