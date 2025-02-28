'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Brain, Heart, Target, Users, Sparkles, Trophy } from 'lucide-react'

const features = [
  {
    icon: <Brain className='w-8 h-8' />,
    title: 'Phát triển trí tuệ',
    description: 'Phương pháp học tập khoa học giúp trẻ phát triển tư duy logic và sáng tạo',
    color: 'bg-[#FFF0F0] group-hover:bg-[#FFE0E0]',
    iconColor: 'text-[#FF4D4D]'
  },
  {
    icon: <Heart className='w-8 h-8' />,
    title: 'Phát triển cảm xúc',
    description: 'Rèn luyện kỹ năng quản lý cảm xúc và xây dựng sự tự tin với bản thân',
    color: 'bg-[#F0F7FF] group-hover:bg-[#E0F0FF]',
    iconColor: 'text-[#4D94FF]'
  },
  {
    icon: <Target className='w-8 h-8' />,
    title: 'Mục tiêu rõ ràng',
    description: 'Lộ trình học tập được thiết kế phù hợp với từng độ tuổi và năng lực',
    color: 'bg-[#FFF0FA] group-hover:bg-[#FFE0F5]',
    iconColor: 'text-[#FF4DA6]'
  },
  {
    icon: <Users className='w-8 h-8' />,
    title: 'Tương tác đa chiều',
    description: 'Môi trường học tập tương tác giúp trẻ phát triển kỹ năng giao tiếp',
    color: 'bg-[#F0FFF4] group-hover:bg-[#E0FFE8]',
    iconColor: 'text-[#4DFF77]'
  },
  {
    icon: <Sparkles className='w-8 h-8' />,
    title: 'Nội dung sáng tạo',
    description: 'Bài học được thiết kế sinh động, kích thích sự tò mò và ham học hỏi',
    color: 'bg-[#FFF7F0] group-hover:bg-[#FFEDD6]',
    iconColor: 'text-[#FFB84D]'
  },
  {
    icon: <Trophy className='w-8 h-8' />,
    title: 'Thành tích xuất sắc',
    description: 'Hệ thống đánh giá và khen thưởng khuyến khích tinh thần học tập',
    color: 'bg-[#F0F0FF] group-hover:bg-[#E6E6FF]',
    iconColor: 'text-[#6B4DFF]'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

export default function Feature() {
  return (
    <section className='py-24 overflow-hidden'>
      <div className='container relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className='text-center max-w-2xl mx-auto mb-16'>
            <span className='bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium'>
              Tính năng nổi bật
            </span>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mt-6'>
              Giải pháp toàn diện cho
              <span
                className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE] 
                text-transparent bg-clip-text'
              >
                {' '}
                sự phát triển của trẻ
              </span>
            </h2>
            <p className='mt-4 text-muted-foreground'>
              Chúng tôi cung cấp các tính năng đặc biệt giúp trẻ phát triển toàn diện về thể chất và tinh thần
            </p>
          </div>
        </motion.div>

        <motion.div variants={containerVariants} initial='hidden' whileInView='visible' viewport={{ once: true }}>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`group p-6 border-none transition-all duration-500 ${feature.color} 
                  hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden relative`}
                >
                  {/* Icon Container */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6
                    bg-white/80 backdrop-blur group-hover:scale-110 transition-all duration-500 ${feature.iconColor}`}
                  >
                    {feature.icon}
                  </div>
  
                  {/* Content */}
                  <h3 className='text-xl font-semibold mb-3'>{feature.title}</h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>{feature.description}</p>
  
                  {/* Decorative Corner */}
                  <div
                    className='absolute top-0 right-0 w-24 h-24 bg-white/70 rounded-bl-[100px] 
                    -translate-y-12 translate-x-12 group-hover:translate-y-0 group-hover:translate-x-0 
                    transition-transform duration-500'
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
