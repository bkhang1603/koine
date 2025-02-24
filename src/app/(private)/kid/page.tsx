'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import Link from 'next/link'

const recentCourses = [
  {
    id: 1,
    title: 'Toán học vui vẻ 🔢',
    description: 'Khám phá thế giới số học qua các trò chơi thú vị',
    progress: 60,
    totalLessons: 20,
    completedLessons: 12,
    image: '/images/math-course.png',
    category: 'Toán học',
    level: 'Dễ'
  },
  {
    id: 2,
    title: 'Tiếng Anh cho bé 🌎',
    description: 'Học tiếng Anh qua các bài hát và trò chơi',
    progress: 30,
    totalLessons: 25,
    completedLessons: 8,
    image: '/images/english-course.png',
    category: 'Ngoại ngữ',
    level: 'Dễ'
  }
]

const recommendedCourses = [
  {
    id: 3,
    title: 'Khoa học tự nhiên 🔬',
    description: 'Khám phá thế giới tự nhiên kỳ thú',
    image: '/images/science-course.png',
    category: 'Khoa học',
    level: 'Dễ',
    totalLessons: 15
  },
  {
    id: 4,
    title: 'Nghệ thuật sáng tạo 🎨',
    description: 'Phát triển óc sáng tạo qua hội họa',
    image: '/images/art-course.png',
    category: 'Nghệ thuật',
    level: 'Dễ',
    totalLessons: 18
  }
]

const achievements = [
  { icon: '⭐️', value: '750', label: 'Tổng số sao' },
  { icon: '📚', value: '20', label: 'Bài học đã hoàn thành' },
  { icon: '🏆', value: '8', label: 'Huy hiệu đạt được' },
  { icon: '⏱️', value: '10', label: 'Giờ học tập' }
]

function KidHomePage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Hero Section */}
      <div className='relative h-[400px] rounded-3xl overflow-hidden mb-12'>
        <Image src='/images/kid-hero.png' alt='Hero banner' fill className='object-cover' />
        <div className='absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent' />
        <div className='absolute bottom-12 left-12 text-white max-w-xl'>
          <h1 className='text-4xl font-bold mb-4'>Chào mừng quay trở lại! 👋</h1>
          <p className='text-xl mb-6 opacity-90'>Hôm nay bạn muốn học gì? Hãy cùng khám phá những điều thú vị nhé!</p>
          <Button size='lg' className='rounded-full'>
            Tiếp tục học tập 🚀
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'>
        {achievements.map((item, index) => (
          <Card key={index} className='p-6 text-center'>
            <p className='text-3xl mb-2'>{item.icon}</p>
            <p className='text-2xl font-bold text-primary mb-1'>{item.value}</p>
            <p className='text-sm text-gray-600'>{item.label}</p>
          </Card>
        ))}
      </div>

      {/* Continue Learning Section */}
      <section className='mb-12'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold'>Tiếp tục học tập 📚</h2>
          <Button variant='ghost' className='rounded-full'>
            Xem tất cả ➜
          </Button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {recentCourses.map((course) => (
            <Link href={`/kid/course/${course.id}`} key={course.id}>
              <Card className='h-full hover:shadow-lg transition-shadow overflow-hidden'>
                <div className='flex gap-6 p-6'>
                  <div className='relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0'>
                    <Image src={course.image} alt={course.title} fill className='object-cover' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='bg-primary/10 text-primary text-sm px-3 py-1 rounded-full'>
                        {course.category}
                      </span>
                      <span className='bg-secondary/10 text-secondary text-sm px-3 py-1 rounded-full'>
                        {course.level}
                      </span>
                    </div>
                    <h3 className='text-xl font-bold mb-2'>{course.title}</h3>
                    <div className='space-y-2'>
                      <Progress value={course.progress} className='h-2' />
                      <div className='flex justify-between text-sm text-gray-600'>
                        <span>
                          {course.completedLessons}/{course.totalLessons} bài học
                        </span>
                        <span>{course.progress}% hoàn thành</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended Courses */}
      <section className='mb-12'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold'>Khóa học gợi ý 🎯</h2>
          <Button variant='ghost' className='rounded-full'>
            Xem tất cả ➜
          </Button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {recommendedCourses.map((course) => (
            <Link href={`/kid/course/${course.id}`} key={course.id}>
              <Card className='h-full hover:shadow-lg transition-shadow overflow-hidden'>
                <div className='relative h-48'>
                  <Image src={course.image} alt={course.title} fill className='object-cover' />
                  <div className='absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium'>
                    {course.level}
                  </div>
                </div>
                <div className='p-6'>
                  <div className='flex items-center gap-2 mb-3'>
                    <span className='bg-primary/10 text-primary text-sm px-3 py-1 rounded-full'>{course.category}</span>
                  </div>
                  <h3 className='text-xl font-bold mb-2'>{course.title}</h3>
                  <p className='text-gray-600 mb-4'>{course.description}</p>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>{course.totalLessons} bài học</span>
                    <Button variant='outline' className='rounded-full'>
                      Bắt đầu học ▶️
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card className='p-6 bg-gradient-to-r from-primary/10 to-secondary/10'>
          <div className='flex items-center gap-6'>
            <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center'>
              <span className='text-3xl'>🎮</span>
            </div>
            <div className='flex-1'>
              <h3 className='text-xl font-bold mb-2'>Trò chơi học tập</h3>
              <p className='text-gray-600 mb-4'>Học thông qua các trò chơi thú vị</p>
              <Button variant='outline' className='rounded-full'>
                Chơi ngay 🎮
              </Button>
            </div>
          </div>
        </Card>
        <Card className='p-6 bg-gradient-to-r from-green-100 to-blue-100'>
          <div className='flex items-center gap-6'>
            <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center'>
              <span className='text-3xl'>🏆</span>
            </div>
            <div className='flex-1'>
              <h3 className='text-xl font-bold mb-2'>Thành tích của bạn</h3>
              <p className='text-gray-600 mb-4'>Xem các huy hiệu và phần thưởng</p>
              <Button variant='outline' className='rounded-full'>
                Xem thành tích 🌟
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}

export default KidHomePage
