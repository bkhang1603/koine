'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, ShieldCheck, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import images from '@/assets/images'

const features = [
  {
    icon: <Heart className='w-5 h-5' />,
    title: 'An toàn & Tin cậy',
    description: 'Môi trường học tập được kiểm duyệt chặt chẽ'
  },
  {
    icon: <ShieldCheck className='w-5 h-5' />,
    title: 'Chuyên gia tận tâm',
    description: 'Đội ngũ giảng viên giàu kinh nghiệm'
  }
  // {
  //   icon: <Sparkles className='w-5 h-5' />,
  //   title: 'Nội dung phù hợp',
  //   description: 'Được thiết kế riêng cho từng độ tuổi'
  // }
]

export default function Hero() {
  return (
    <section className='relative min-h-[100vh] flex items-center py-16 overflow-hidden bg-[#FAFAFA]'>
      {/* Animated Background */}
      <div className='absolute inset-0 bg-grid-pattern opacity-[0.03] animate-grid' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,89,125,0.1),transparent_70%)]' />

      {/* Star Background */}
      <div className='absolute inset-0'>
        {/* Large Stars */}
        <div className='absolute top-[20%] left-[15%] animate-twinkle'>
          <Star className='w-8 h-8 text-primary/20' fill='currentColor' />
        </div>
        <div className='absolute bottom-32 right-[10%] animate-twinkle delay-300'>
          <Star className='w-10 h-10 text-secondary/20' fill='currentColor' />
        </div>

        {/* Medium Stars */}
        <div className='absolute top-1/3 right-[25%] animate-twinkle delay-150'>
          <Star className='w-6 h-6 text-primary/15' fill='currentColor' />
        </div>
        <div className='absolute bottom-[20%] left-[12%] animate-twinkle delay-500'>
          <Star className='w-7 h-7 text-secondary/15' fill='currentColor' />
        </div>

        {/* Small Stars */}
        <div className='absolute top-1/2 left-[40%] animate-twinkle delay-700'>
          <Star className='w-4 h-4 text-primary/10' fill='currentColor' />
        </div>
        <div className='absolute bottom-40 right-[35%] animate-twinkle delay-1000'>
          <Star className='w-5 h-5 text-secondary/10' fill='currentColor' />
        </div>
        <div className='absolute top-40 right-[45%] animate-twinkle delay-200'>
          <Star className='w-3 h-3 text-primary/10' fill='currentColor' />
        </div>
      </div>

      <div className='container relative'>
        <div className='flex flex-col lg:flex-row items-center gap-12'>
          {/* Content */}
          <div className='flex-1 relative'>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold'>
                Khám phá
                <span className='block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#FF597D] to-secondary h-14'>
                  Giáo dục giới tính
                </span>
                <span className='block mt-0'>cùng con bạn</span>
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
              <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className='group'
                  >
                    <div className='flex items-center gap-4 p-4 rounded-2xl bg-white/50 hover:bg-white/80 transition-colors border-2 border-gray-100 hover:border-primary/20'>
                      <div className='w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform'>
                        {feature.icon}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-medium text-base mb-1'>{feature.title}</h3>
                        <p className='text-sm text-muted-foreground line-clamp-1'>{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className='absolute -bottom-5 -right-5 bg-white p-3 rounded-2xl shadow-lg'
              >
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center'>
                    <Sparkles className='w-6 h-6 text-primary' />
                  </div>
                  <div>
                    <div className='font-semibold text-base'>1000+</div>
                    <div className='text-sm text-muted-foreground'>Học viên tin tưởng</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Background Decorations */}
            <div className='absolute -top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl' />
            <div className='absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl' />
          </div>
        </div>
      </div>
    </section>
  )
}
