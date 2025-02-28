'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'
import Image from 'next/image'
import icons from '@/assets/icons'
import images from '@/assets/images'

const testimonials = [
  {
    content:
      'Con tôi đã tiến bộ rõ rệt trong việc giao tiếp và thể hiện cảm xúc sau khi tham gia các khóa học. Đội ngũ giảng viên rất tận tâm và chuyên nghiệp.',
    author: {
      name: 'Nguyễn Thị Hương',
      role: 'Phụ huynh học sinh lớp 7',
      avatar: images.teamDao
    },
    rating: 5
  },
  {
    content:
      'Phương pháp giảng dạy rất phù hợp với lứa tuổi của con, giúp con dễ dàng tiếp thu và học hỏi. Môi trường học tập an toàn và thân thiện.',
    author: {
      name: 'Trần Văn Nam',
      role: 'Phụ huynh học sinh lớp 5',
      avatar: images.teamHuyen
    },
    rating: 5
  },
  {
    content:
      'Tôi rất hài lòng với sự tiến bộ của con. Các bài học không chỉ giúp con hiểu về giới tính mà còn phát triển kỹ năng sống tốt hơn.',
    author: {
      name: 'Lê Thị Minh',
      role: 'Phụ huynh học sinh lớp 6',
      avatar: images.teamKhang
    },
    rating: 5
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

export default function Sharing() {
  return (
    <section className='py-24 overflow-hidden'>
      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='text-center max-w-2xl mx-auto mb-16'
        >
          <span className='bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium'>
            Chia sẻ từ phụ huynh
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mt-6'>
            Phụ huynh nói gì về
            <span className='block mt-2 bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE] text-transparent bg-clip-text leading-[1.4] pb-1'>
              chương trình học của chúng tôi
            </span>
          </h2>
          <p className='mt-4 text-muted-foreground'>
            Những phản hồi chân thực từ các phụ huynh đã tin tưởng và đồng hành cùng chúng tôi
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className='p-6 h-full group hover:shadow-lg transition-shadow duration-300 relative overflow-hidden'>
                {/* Quote Icon */}
                <div className='absolute -top-6 -right-6 w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center'>
                  <Image src={icons.quote} alt='Quote' width={24} height={24} className='text-primary/20' />
                </div>

                {/* Rating */}
                <div className='flex gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='w-5 h-5 fill-primary text-primary' />
                  ))}
                </div>

                {/* Content */}
                <blockquote className='text-lg text-muted-foreground mb-6 relative line-clamp-3'>
                  &quot;{testimonial.content}&quot;
                </blockquote>

                {/* Author */}
                <div className='flex items-center gap-4 mt-auto'>
                  <Avatar className='h-12 w-12 border-2 border-primary/10'>
                    <AvatarImage
                      src={testimonial.author.avatar.src}
                      alt={testimonial.author.name}
                      className='object-cover'
                    />
                    <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='font-semibold'>{testimonial.author.name}</div>
                    <div className='text-sm text-muted-foreground'>{testimonial.author.role}</div>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div
                  className='absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent 
                  rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
