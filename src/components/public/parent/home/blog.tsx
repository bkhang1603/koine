'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import icons from '@/assets/icons'

const blogs = [
  {
    id: 1,
    title: 'Làm thế nào để nói chuyện với con về giới tính?',
    excerpt:
      'Hướng dẫn cha mẹ cách tiếp cận và trò chuyện với con về các vấn đề nhạy cảm một cách tự nhiên và hiệu quả',
    image: '/images/blog1.jpg',
    category: 'Tâm lý',
    readingTime: '5 phút đọc'
  },
  {
    id: 2,
    title: 'Những thay đổi tâm sinh lý ở tuổi dậy thì',
    excerpt: 'Tìm hiểu về những thay đổi phổ biến về tâm sinh lý ở trẻ trong giai đoạn dậy thì và cách hỗ trợ con',
    image: '/images/blog2.jpg',
    category: 'Sức khỏe',
    readingTime: '7 phút đọc'
  },
  {
    id: 3,
    title: 'Xây dựng lòng tự tin cho con trong giai đoạn dậy thì',
    excerpt: 'Các phương pháp và hoạt động giúp trẻ phát triển sự tự tin và hình ảnh tích cực về bản thân',
    image: '/images/blog3.jpg',
    category: 'Kỹ năng sống',
    readingTime: '6 phút đọc'
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

export default function Blog() {
  return (
    <section className='relative py-24 overflow-hidden'>
      {/* Background Decoration */}
      <div className='absolute inset-0'>
        {/* Wave Pattern */}
        <div className='absolute inset-0 opacity-[0.15]'>
          <svg width='100%' height='100%' className='absolute inset-0'>
            <pattern id='smallGrid' width='60' height='60' patternUnits='userSpaceOnUse'>
              <path
                d='M 60 0 L 0 0 0 60'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
                className='text-primary/40'
              />
            </pattern>
            <rect width='100%' height='100%' fill='url(#smallGrid)' />
          </svg>
        </div>

        {/* Gradient Circles */}
        <div className='absolute top-0 -left-1/4 w-1/2 h-1/2'>
          <div className='w-full h-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl' />
        </div>
        <div className='absolute bottom-0 -right-1/4 w-1/2 h-1/2'>
          <div className='w-full h-full bg-gradient-to-tl from-secondary/20 via-secondary/5 to-transparent rounded-full blur-3xl' />
        </div>

        {/* Floating Elements */}
        <div className='absolute inset-0'>
          {/* Circles */}
          <div className='absolute top-1/4 left-[15%] w-32 h-32 border-8 border-primary/20 rounded-full animate-float-slow' />
          <div className='absolute bottom-1/4 right-[15%] w-24 h-24 border-8 border-secondary/20 rounded-full animate-float-slow delay-300' />

          {/* Squares */}
          <div className='absolute top-[40%] right-[10%] w-16 h-16 border-4 border-primary/20 rotate-45 animate-float-slow delay-150' />
          <div className='absolute bottom-[35%] left-[10%] w-20 h-20 border-4 border-secondary/20 rotate-12 animate-float-slow delay-500' />
        </div>

        {/* Animated Lines */}
        <div className='absolute inset-0'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='absolute h-[1px] w-full'
              style={{
                background: `linear-gradient(90deg, transparent, ${
                  i % 2 ? 'rgba(var(--primary), 0.2)' : 'rgba(var(--secondary), 0.2)'
                }, transparent)`,
                top: `${30 + i * 20}%`,
                transform: `rotate(${-15 + i * 15}deg) translateY(${i * 30}px)`,
                animation: 'moveLeftRight 15s linear infinite',
                animationDelay: `${i * 2}s`
              }}
            />
          ))}
        </div>

        {/* Overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50' />
      </div>

      <div className='container relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-center max-w-2xl mx-auto mb-16'
        >
          <span
            className='inline-flex items-center justify-center px-4 py-1.5 rounded-full
            text-sm font-medium bg-primary/10 text-primary mb-4'
          >
            Blog & Tin tức
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold'>
            Kiến thức bổ ích từ
            <span
              className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE] 
              text-transparent bg-clip-text'
            >
              {' '}
              chuyên gia
            </span>
          </h2>
          <p className='mt-4 text-muted-foreground'>
            Cập nhật những bài viết mới nhất về giáo dục giới tính và phát triển kỹ năng sống cho trẻ
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {blogs.map((blog) => (
            <motion.div key={blog.id} variants={itemVariants}>
              <Link href={`/knowledge`} className='group block'>
                <Card
                  className='overflow-hidden border-none bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                  transition-all duration-500 relative'
                >
                  {/* Card Shine Effect */}
                  <div
                    className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent 
                    -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000'
                  />

                  <div className='relative h-56 overflow-hidden'>
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

                    {/* Category & Reading Time */}
                    <div className='absolute bottom-4 left-4 right-4 flex items-center justify-between text-white'>
                      <Badge className='bg-white/20 hover:bg-white/30 text-white border-none'>{blog.category}</Badge>
                      <span className='text-sm'>{blog.readingTime}</span>
                    </div>
                  </div>

                  <div className='p-6'>
                    <h3 className='text-xl font-semibold group-hover:text-primary transition-colors line-clamp-1 mb-3'>
                      {blog.title}
                    </h3>
                    <p className='text-muted-foreground text-sm line-clamp-2 mb-4'>{blog.excerpt}</p>
                    <div className='flex items-center text-primary font-medium text-sm'>
                      Đọc thêm
                      <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                    </div>
                  </div>
                </Card>
              </Link>
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
          <Button size='lg' className='bg-white hover:bg-white/90 text-primary' asChild>
            <Link href='/knowledge' className='group'>
              Xem tất cả bài viết
              <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
