'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Clock, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import images from '@/assets/images'

const courses = [
  {
    id: 1,
    title: 'Giới tính và Sự phát triển',
    description: 'Khám phá sự phát triển cơ thể và tâm lý theo độ tuổi',
    image: images.course1,
    duration: '8 tuần',
    students: '250+',
    lessons: '24 bài học'
  },
  {
    id: 2,
    title: 'An toàn và Ranh giới',
    description: 'Kỹ năng tự bảo vệ và nhận biết ranh giới cá nhân',
    image: images.course2,
    duration: '6 tuần',
    students: '180+',
    lessons: '18 bài học'
  },
  {
    id: 3,
    title: 'Mối quan hệ Lành mạnh',
    description: 'Xây dựng các mối quan hệ tích cực và tôn trọng',
    image: images.course3,
    duration: '7 tuần',
    students: '200+',
    lessons: '21 bài học'
  }
]

export default function Recommend() {
  return (
    <section className='py-20 relative overflow-hidden'>
      <div className='container'>
        {/* Section Header */}
        <div className='relative max-w-3xl mx-auto mb-20'>
          {/* Decorative Elements */}
          <div className='absolute -top-8 left-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl' />
          <div className='absolute -top-4 left-20 w-12 h-12 bg-secondary/5 rounded-full blur-xl' />

          <div className='relative text-center'>
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='inline-block mb-4'
            >
              <span className='px-4 py-2 rounded-full bg-primary/5 text-primary font-medium text-sm'>
                Chương trình học
              </span>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='relative'
            >
              <h2 className='text-4xl font-bold mb-6 leading-tight'>
                Khóa học tiêu biểu
                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary'>
                  được thiết kế cho con bạn
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='relative'
            >
              <p className='text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed'>
                Được xây dựng bởi các chuyên gia hàng đầu, mỗi khóa học là một hành trình
                <span className='text-primary font-medium'> khám phá và phát triển </span>
                phù hợp với từng độ tuổi của trẻ
              </p>
            </motion.div>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='absolute left-1/2 bottom-0 w-20 h-1 -translate-x-1/2
                bg-gradient-to-r from-transparent via-primary/30 to-transparent'
            />
          </div>
        </div>

        {/* Course Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='group bg-white rounded-2xl border border-gray-100/50 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300'>
                {/* Course Image */}
                <div className='relative h-48 overflow-hidden'>
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className='object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                </div>

                {/* Course Content */}
                <div className='p-6'>
                  <h3 className='text-xl font-semibold mb-2 group-hover:text-primary transition-colors'>
                    {course.title}
                  </h3>
                  <p className='text-muted-foreground text-sm mb-4'>{course.description}</p>

                  {/* Course Meta */}
                  <div className='grid grid-cols-3 gap-4 py-4 border-y border-gray-100'>
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <Clock className='w-4 h-4 text-primary/60' />
                      <span>{course.duration}</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <Users className='w-4 h-4 text-primary/60' />
                      <span>{course.students}</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <BookOpen className='w-4 h-4 text-primary/60' />
                      <span>{course.lessons}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className='mt-6'>
                    <Button
                      asChild
                      variant='outline'
                      className='w-full rounded-xl border-primary/20 hover:bg-primary/5 group/btn'
                    >
                      <Link href={`/course`}>
                        Xem chi tiết
                        <ArrowRight className='w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform' />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='text-center mt-12'
        >
          <Button asChild size='lg' className='rounded-full px-8 group'>
            <Link href='/course'>
              Xem tất cả khóa học
              <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
        <div className='absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl' />
        <div className='absolute bottom-20 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl' />
      </div>
    </section>
  )
}
