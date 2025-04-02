'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sliders, BookOpen, Users, Target, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: <Sliders className='w-6 h-6' />,
    title: 'Tùy chỉnh lộ trình học',
    description: 'Xây dựng lộ trình học tập phù hợp với mục tiêu và thời gian của bạn'
  },
  {
    icon: <BookOpen className='w-6 h-6' />,
    title: 'Chọn nội dung yêu thích',
    description: 'Tự do lựa chọn các bài học và chủ đề bạn muốn học'
  },
  {
    icon: <Users className='w-6 h-6' />,
    title: 'Học theo nhóm',
    description: 'Tạo nhóm học tập và chia sẻ kiến thức với bạn bè'
  },
  {
    icon: <Target className='w-6 h-6' />,
    title: 'Đặt mục tiêu học tập',
    description: 'Thiết lập và theo dõi tiến độ học tập của bạn'
  },
  {
    icon: <Clock className='w-6 h-6' />,
    title: 'Linh hoạt thời gian',
    description: 'Học mọi lúc, mọi nơi theo lịch trình của bạn'
  }
]

export default function CustomCourse() {
  return (
    <section className='relative py-24 overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-background' />
      <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]' />

      <div className='container relative'>
        {/* Header */}
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Tùy chỉnh khóa học
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2'>
                theo ý thích của bạn
              </span>
            </h2>
            <p className='text-muted-foreground text-lg'>
              Xây dựng lộ trình học tập phù hợp với mục tiêu và thời gian của bạn. Tự do lựa chọn nội dung và phương
              pháp học tập hiệu quả nhất.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className='group relative overflow-hidden border-none bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm
                hover:from-white/10 hover:to-white/20 transition-all duration-300'
              >
                <div className='p-6'>
                  <div className='flex items-start gap-4'>
                    <div className='relative'>
                      <div
                        className='w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 
                        flex items-center justify-center group-hover:scale-110 transition-transform duration-300'
                      >
                        <div className='text-primary'>{feature.icon}</div>
                      </div>
                      {/* Decorative Elements */}
                      <div
                        className='absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl'
                      />
                    </div>
                    <div>
                      <h3 className='font-semibold text-lg mb-2'>{feature.title}</h3>
                      <p className='text-muted-foreground text-sm'>{feature.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center'
          >
            <div className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2'>
              500+
            </div>
            <div className='text-muted-foreground'>Lộ trình đã được tùy chỉnh</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-center'
          >
            <div className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2'>
              98%
            </div>
            <div className='text-muted-foreground'>Học viên hài lòng</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-center'
          >
            <div className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2'>
              100+
            </div>
            <div className='text-muted-foreground'>Chủ đề học tập</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-center'
          >
            <div className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2'>
              24/7
            </div>
            <div className='text-muted-foreground'>Hỗ trợ tùy chỉnh</div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center'
        >
          <Button asChild size='lg' className='h-12 px-6 text-base rounded-full group'>
            <Link href='/course'>
              Bắt đầu tùy chỉnh
              <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
