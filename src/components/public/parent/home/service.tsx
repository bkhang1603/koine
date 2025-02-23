'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import icons from '@/assets/icons'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: icons.user,
    title: 'Hướng dẫn 1-1',
    description: 'Kết nối trực tiếp với các chuyên gia hàng đầu trong lĩnh vực giáo dục giới tính',
    color: 'bg-[#FFF0F0]',
    iconColor: 'bg-[#FF9898]',
    position: 'lg:translate-y-12'
  },
  {
    icon: icons.clock,
    title: 'Sẵn sàng 24/7',
    description: 'Hệ thống học trực tuyến và đội ngũ chuyên gia luôn sẵn sàng hỗ trợ mọi lúc',
    color: 'bg-[#F0F7FF]',
    iconColor: 'bg-[#98CAFF]',
    position: 'lg:-translate-y-12'
  },
  {
    icon: icons.calendar,
    title: 'Lộ trình cá nhân hóa',
    description: 'Trải nghiệm học tập được thiết kế riêng phù hợp với từng độ tuổi và nhu cầu',
    color: 'bg-[#FFF0FA]',
    iconColor: 'bg-[#FF98D6]',
    position: 'lg:translate-y-12'
  },
  {
    icon: icons.dollar,
    title: 'Chi phí hợp lý',
    description: 'Mức học phí phù hợp với chất lượng đào tạo từ các chuyên gia hàng đầu',
    color: 'bg-[#F0FFF4]',
    iconColor: 'bg-[#98FFB0]',
    position: 'lg:-translate-y-12'
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

export default function Service() {
  return (
    <section className='overflow-hidden'>
      <div className='container py-24'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-center max-w-2xl mx-auto'
        >
          <span className='bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium'>
            Tại sao chọn chúng tôi
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mt-6'>
            Trải nghiệm học tập
            <span
              className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE] 
              text-transparent bg-clip-text'
            >
              {' '}
              tuyệt vời nhất
            </span>
          </h2>
          <p className='mt-4 text-muted-foreground'>
            Chúng tôi cung cấp môi trường học tập tốt nhất cho con bạn với đội ngũ chuyên gia hàng đầu
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16'
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn('transition-all duration-500', service.position)}
            >
              <Card
                className={cn(
                  'group relative overflow-hidden border-none rounded-xl h-full transition-all duration-500',
                  service.color,
                  'hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
                )}
              >
                <div className='p-6'>
                  {/* Icon */}
                  <div
                    className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center mb-6',
                      service.iconColor,
                      'group-hover:scale-110 transition-transform duration-500'
                    )}
                  >
                    <Image src={service.icon} alt={service.title} width={28} height={28} className='w-7 h-7' />
                  </div>

                  {/* Content */}
                  <h3 className='text-xl font-semibold mb-2'>{service.title}</h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>{service.description}</p>
                </div>

                {/* Decorative Corner */}
                <div
                  className='absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-bl-[100px] 
                  -translate-y-12 translate-x-12 group-hover:translate-y-0 group-hover:translate-x-0 
                  transition-transform duration-500'
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
