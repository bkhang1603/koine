'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

const courses = [
  {
    id: 1,
    title: 'Toán học vui vẻ 🔢',
    description: 'Khám phá thế giới số học qua các trò chơi thú vị',
    level: 'Dễ',
    progress: 60,
    totalLessons: 20,
    completedLessons: 12,
    image: '/images/math-course.png',
    category: 'Toán học'
  },
  {
    id: 2,
    title: 'Tiếng Anh cho bé 🌎',
    description: 'Học tiếng Anh qua các bài hát và trò chơi',
    level: 'Dễ',
    progress: 30,
    totalLessons: 25,
    completedLessons: 8,
    image: '/images/english-course.png',
    category: 'Ngoại ngữ'
  }
  // Thêm các khóa học khác...
]

function KidCoursesPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Header */}
      <div className='mb-12 text-center'>
        <h1 className='text-4xl font-bold mb-4'>Khám phá các khóa học 🚀</h1>
        <p className='text-lg text-gray-600'>Hãy chọn một khóa học thú vị để bắt đầu nhé!</p>
      </div>

      {/* Categories Filter */}
      <div className='flex gap-4 mb-8 overflow-x-auto pb-4'>
        {['Tất cả', 'Toán học', 'Ngoại ngữ', 'Khoa học', 'Nghệ thuật'].map((category) => (
          <Button
            key={category}
            variant={category === 'Tất cả' ? 'default' : 'outline'}
            className='rounded-full whitespace-nowrap'
          >
            {category} {category === 'Tất cả' ? '✨' : ''}
          </Button>
        ))}
      </div>

      {/* Course Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {courses.map((course) => (
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

                {/* Progress Section */}
                <div className='space-y-2'>
                  <div className='w-full bg-gray-200 rounded-full h-2.5'>
                    <div
                      className='bg-primary h-2.5 rounded-full transition-all duration-300'
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className='flex justify-between text-sm text-gray-600'>
                    <span>
                      {course.completedLessons}/{course.totalLessons} bài học
                    </span>
                    <span>{course.progress}% hoàn thành</span>
                  </div>
                </div>

                {/* Stats */}
                <div className='flex items-center gap-4 mt-4 pt-4 border-t'>
                  <div className='flex items-center gap-2'>
                    <span className='text-yellow-500'>⭐</span>
                    <span className='text-sm text-gray-600'>250 sao</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span>⏱️</span>
                    <span className='text-sm text-gray-600'>2-3 giờ</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Access Section */}
      <div className='mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8'>
        <h2 className='text-2xl font-bold mb-6'>Tiếp tục học tập 📚</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {courses.slice(0, 2).map((course) => (
            <Link href={`/kid/course/${course.id}`} key={`quick-${course.id}`}>
              <Card className='flex items-center gap-4 p-4 hover:shadow-md transition-shadow'>
                <div className='relative w-20 h-20 rounded-lg overflow-hidden'>
                  <Image src={course.image} alt={course.title} fill className='object-cover' />
                </div>
                <div className='flex-1'>
                  <h3 className='font-bold mb-1'>{course.title}</h3>
                  <div className='w-full bg-gray-200 rounded-full h-2 mb-2'>
                    <div className='bg-primary h-2 rounded-full' style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <span className='text-sm text-gray-600'>
                    {course.completedLessons}/{course.totalLessons} bài học
                  </span>
                </div>
                <Button variant='ghost' className='rounded-full'>
                  ▶️
                </Button>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default KidCoursesPage
