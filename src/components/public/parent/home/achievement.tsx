'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Users, BookOpen, Award, Star } from 'lucide-react'
import Image from 'next/image'
import icons from '@/assets/icons'

const achievements = [
  {
    icon: <Users className='w-8 h-8' />,
    title: '10K+',
    label: 'Học viên',
    description: 'Tin tưởng và theo học',
    color: 'bg-[#FFF0F0] group-hover:bg-[#FFE0E0]',
    iconColor: 'text-[#FF4D4D]'
  },
  {
    icon: <BookOpen className='w-8 h-8' />,
    title: '100+',
    label: 'Khóa học',
    description: 'Đa dạng chủ đề',
    color: 'bg-[#F0F7FF] group-hover:bg-[#E0F0FF]',
    iconColor: 'text-[#4D94FF]'
  },
  {
    icon: <Award className='w-8 h-8' />,
    title: '50+',
    label: 'Chuyên gia',
    description: 'Giàu kinh nghiệm',
    color: 'bg-[#FFF0FA] group-hover:bg-[#FFE0F5]',
    iconColor: 'text-[#FF4DA6]'
  },
  {
    icon: <Star className='w-8 h-8' />,
    title: '98%',
    label: 'Đánh giá',
    description: 'Phản hồi tích cực',
    color: 'bg-[#F0FFF4] group-hover:bg-[#E0FFE8]',
    iconColor: 'text-[#4DFF77]'
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

export default function Achievement() {
  return (
    <section className='relative py-24 overflow-hidden'>
      <div className='container relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-center max-w-2xl mx-auto mb-16'
        >
          <span className='bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium'>
            Con số ấn tượng
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mt-6'>
            Thành tựu của chúng tôi
            <span className='block mt-2 bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE] text-transparent bg-clip-text h-14'>
              trong hành trình giáo dục
            </span>
          </h2>
          <p className='mt-4 text-muted-foreground'>
            Những con số biết nói thể hiện sự tin tưởng và hiệu quả của phương pháp giáo dục của chúng tôi
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
        >
          {achievements.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={`group p-6 border-none transition-all duration-500 ${item.color} 
                hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden relative h-full`}
              >
                {/* Icon Container */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6
                  bg-white/80 backdrop-blur group-hover:scale-110 transition-all duration-500 ${item.iconColor}`}
                >
                  {item.icon}
                </div>

                {/* Content */}
                <div className='relative z-0'>
                  <h3 className='text-4xl font-bold mb-1'>{item.title}</h3>
                  <p className='text-lg font-semibold mb-2'>{item.label}</p>
                  <p className='text-muted-foreground text-sm'>{item.description}</p>
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

        {/* Decorative Elements */}
        <Image
          src={icons.pinkStar}
          alt='Decoration'
          width={40}
          height={40}
          className='absolute bottom-10 -right-10 animate-pulse'
        />
        <Image
          src={icons.blueStar}
          alt='Decoration'
          width={60}
          height={60}
          className='absolute top-5 -left-10 animate-pulse'
        />
      </div>
    </section>
  )
}
