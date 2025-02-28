'use client'

import images from '@/assets/images'
import Image from 'next/image'
import { motion } from 'framer-motion'

const viewData = [
  {
    id: 1,
    image: images.about1,
    title: 'Khởi Đầu Hành Trình',
    description: 'Những bước đi đầu tiên của Koine trên con đường mang giáo dục giới tính đến gần hơn với mọi người',
    position: 'center'
  },
  {
    id: 2,
    image: images.about2,
    title: 'Gặp Gỡ & Giao Lưu',
    description: 'Kết nối và chia sẻ với cộng đồng, lan tỏa những giá trị tích cực',
    position: 'left'
  },
  {
    id: 3,
    image: images.about3,
    title: 'Không Gian Sáng Tạo',
    description: 'Môi trường làm việc năng động, nơi những ý tưởng được ươm mầm và phát triển',
    position: 'right'
  }
]

function View() {
  return (
    <section className='py-10 relative overflow-hidden'>
      <div className='container'>
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-20'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-6'>
            Hành Trình <span className='text-primary'>Phát Triển</span>
          </h2>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            Những khoảnh khắc đáng nhớ trong chặng đường xây dựng Koine
          </p>
        </motion.div> */}

        <div className='space-y-32'>
          {viewData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
            >
              <div
                className={`flex flex-col ${
                  item.position === 'left'
                    ? 'md:flex-row'
                    : item.position === 'right'
                      ? 'md:flex-row-reverse'
                      : 'items-center'
                } gap-8 md:gap-12`}
              >
                {/* Image */}
                <div className='flex-1'>
                  <div
                    className='relative aspect-[4/3] md:aspect-[16/9] rounded-[2rem] 
                    overflow-hidden group'
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className='object-cover transition-transform duration-700
                        group-hover:scale-105'
                    />
                    {/* Gradient Overlay */}
                    <div
                      className='absolute inset-0 bg-gradient-to-tr 
                      from-black/40 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500'
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${item.position === 'center' ? 'text-center max-w-2xl mx-auto' : ''}`}>
                  <div className='space-y-6'>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '3rem' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className='h-1 bg-gradient-to-r from-primary to-secondary rounded-full' />
                    </motion.div>
                    <h3 className='text-2xl md:text-3xl font-bold text-gray-900'>{item.title}</h3>
                    <p className='text-gray-600 text-lg leading-relaxed'>{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default View
