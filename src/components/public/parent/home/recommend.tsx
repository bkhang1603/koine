'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import images from '@/assets/images'
import icons from '@/assets/icons'

const courses = [
  {
    id: 1,
    title: 'Khóa học về Sức khỏe Sinh lý',
    description: 'Hiểu về những thay đổi của cơ thể trong giai đoạn dậy thì',
    image: images.course1,
    lessons: 12,
    duration: '6 tuần',
    level: 'Cơ bản'
  },
  {
    id: 2,
    title: 'Kỹ năng Quản lý Cảm xúc',
    description: 'Phát triển khả năng kiểm soát và thấu hiểu cảm xúc bản thân',
    image: images.course2,
    lessons: 10,
    duration: '5 tuần',
    level: 'Trung bình'
  },
  {
    id: 3,
    title: 'Giao tiếp Hiệu quả',
    description: 'Rèn luyện kỹ năng giao tiếp và xây dựng mối quan hệ tốt đẹp',
    image: images.course3,
    lessons: 8,
    duration: '4 tuần',
    level: 'Nâng cao'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function Recommend() {
  return (
    <section className='relative py-24 overflow-hidden'>
      {/* Background Decoration */}
      <div className='absolute inset-0'>
        {/* Wave Pattern */}
        <div className='absolute inset-0 opacity-[0.15]'>
          <svg width='100%' height='100%' className='absolute inset-0'>
            <pattern id='recommendGrid' width='60' height='60' patternUnits='userSpaceOnUse'>
              <path
                d='M 60 0 L 0 0 0 60'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
                className='text-primary/40'
              />
            </pattern>
            <rect width='100%' height='100%' fill='url(#recommendGrid)' />
          </svg>
        </div>

        {/* Floating Elements */}
        <div className='absolute inset-0'>
          {/* Circles */}
          <div className='absolute top-[10%] left-[25%] w-40 h-40 border-[12px] border-primary/20 rounded-full animate-float-slow' />
          <div className='absolute bottom-[15%] right-[20%] w-28 h-28 border-[8px] border-secondary/20 rounded-full animate-float-slow delay-500' />
          <div className='absolute top-[60%] left-[10%] w-20 h-20 border-[6px] border-primary/15 rounded-full animate-float-slow delay-700' />

          {/* Squares */}
          <div className='absolute top-[30%] right-[15%] w-24 h-24 border-[8px] border-primary/20 rotate-[30deg] animate-float-slow delay-200' />
          <div className='absolute bottom-[40%] left-[30%] w-32 h-32 border-[10px] border-secondary/20 rotate-[60deg] animate-float-slow delay-300' />
          <div className='absolute top-[45%] right-[25%] w-16 h-16 border-[6px] border-secondary/15 -rotate-12 animate-float-slow delay-600' />
        </div>

        {/* Animated Lines */}
        <div className='absolute inset-0'>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className='absolute h-[1px] w-full'
              style={{
                background: `linear-gradient(90deg, transparent, ${
                  i % 2 ? 'rgba(var(--primary), 0.15)' : 'rgba(var(--secondary), 0.15)'
                }, transparent)`,
                top: `${25 + i * 18}%`,
                transform: `rotate(${-20 + i * 12}deg) translateY(${i * 25}px)`,
                animation: 'moveLeftRight 18s linear infinite',
                animationDelay: `${i * 1.5}s`
              }}
            />
          ))}
        </div>

        {/* Gradient Circles - Adjusted Positions */}
        <div className='absolute -top-1/4 -left-1/4 w-2/3 h-2/3'>
          <div className='w-full h-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl' />
        </div>
        <div className='absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3'>
          <div className='w-full h-full bg-gradient-to-tl from-secondary/15 via-secondary/5 to-transparent rounded-full blur-3xl' />
        </div>

        {/* Overlay - Adjusted Opacity */}
        <div className='absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60' />
      </div>

      {/* Content Container */}
      <div className='container relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold'>Khóa học nổi bật</h2>
          <p className='mt-4 text-muted-foreground max-w-2xl mx-auto'>
            Khám phá các khóa học được thiết kế đặc biệt để hỗ trợ sự phát triển toàn diện của trẻ
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {courses.map((course) => (
            <motion.div key={course.id} variants={itemVariants}>
              <Card className='overflow-hidden group hover:shadow-lg transition-shadow duration-300'>
                <div className='relative h-48 overflow-hidden'>
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className='object-cover group-hover:scale-110 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                  <div className='absolute bottom-4 left-4 right-4 text-white'>
                    <div className='flex items-center gap-2 text-sm'>
                      <span>{course.lessons} bài học</span>
                      <span>•</span>
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold mb-2 line-clamp-1'>{course.title}</h3>
                  <p className='text-muted-foreground line-clamp-2 mb-4'>{course.description}</p>
                  <Button variant='outline' className='w-full group/btn' asChild>
                    <Link href={`/course`}>
                      Xem chi tiết
                      <ArrowRight className='w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform' />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className='text-center mt-12'
        >
          <Button size='lg' asChild>
            <Link href='/course'>
              Xem tất cả khóa học
              <ArrowRight className='w-4 h-4 ml-2' />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
