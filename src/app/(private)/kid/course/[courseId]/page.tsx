'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'

const courseDetails = {
  id: 1,
  title: 'Toán học vui vẻ 🔢',
  description: 'Khám phá thế giới số học qua các trò chơi thú vị và bài tập tương tác. Phù hợp cho trẻ từ 6-8 tuổi.',
  level: 'Dễ',
  progress: 60,
  totalLessons: 20,
  completedLessons: 12,
  image: '/images/math-course.png',
  category: 'Toán học',
  lessons: [
    {
      id: 1,
      title: 'Phép cộng vui vẻ',
      description: 'Học cách cộng số qua trò chơi thú vị',
      duration: '15 phút',
      stars: 50,
      isCompleted: true
    },
    {
      id: 2,
      title: 'Phép trừ thần kỳ',
      description: 'Khám phá phép trừ qua các ví dụ sinh động',
      duration: '20 phút',
      stars: 40,
      isCompleted: true
    }
    // Thêm các bài học khác...
  ],
  games: [
    {
      id: 1,
      title: 'Giải cứu số học',
      description: 'Giải các câu đố để cứu các con số',
      image: '/images/game-1.png',
      stars: 100
    },
    {
      id: 2,
      title: 'Đua xe số học',
      description: 'Đua xe bằng cách giải toán nhanh',
      image: '/images/game-2.png',
      stars: 80
    }
  ],
  achievements: [
    {
      id: 1,
      title: 'Nhà vô địch Cộng',
      description: 'Hoàn thành tất cả bài tập phép cộng',
      icon: '🏆',
      isUnlocked: true
    },
    {
      id: 2,
      title: 'Cao thủ Trừ',
      description: 'Đạt điểm tuyệt đối trong phép trừ',
      icon: '🌟',
      isUnlocked: false
    }
  ]
}

function CourseDetailPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Course Header */}
      <div className='flex flex-col md:flex-row gap-8 mb-12'>
        <div className='relative w-full md:w-1/2 h-[300px] rounded-2xl overflow-hidden'>
          <Image src={courseDetails.image} alt={courseDetails.title} fill className='object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
          <div className='absolute bottom-6 left-6 text-white'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='bg-white/20 px-3 py-1 rounded-full text-sm'>{courseDetails.category}</span>
              <span className='bg-white/20 px-3 py-1 rounded-full text-sm'>Cấp độ: {courseDetails.level}</span>
            </div>
            <h1 className='text-3xl font-bold mb-2'>{courseDetails.title}</h1>
            <p className='text-lg opacity-90'>{courseDetails.description}</p>
          </div>
        </div>
        <div className='w-full md:w-1/2 bg-white rounded-2xl p-6 shadow-lg'>
          <div className='mb-6'>
            <h3 className='text-xl font-bold mb-2'>Tiến độ của bạn</h3>
            <Progress value={courseDetails.progress} className='h-3' />
            <p className='text-sm text-gray-600 mt-2'>
              {courseDetails.completedLessons}/{courseDetails.totalLessons} bài học đã hoàn thành
            </p>
          </div>
          <div className='grid grid-cols-3 gap-4 mb-6'>
            <div className='bg-primary/10 rounded-xl p-4 text-center'>
              <p className='text-3xl font-bold text-primary'>⭐️</p>
              <p className='text-sm text-gray-600'>250 sao</p>
            </div>
            <div className='bg-secondary/10 rounded-xl p-4 text-center'>
              <p className='text-3xl font-bold text-secondary'>🏆</p>
              <p className='text-sm text-gray-600'>3 huy hiệu</p>
            </div>
            <div className='bg-green-100 rounded-xl p-4 text-center'>
              <p className='text-3xl font-bold text-green-600'>⏱️</p>
              <p className='text-sm text-gray-600'>4 giờ</p>
            </div>
          </div>
          <Button size='lg' className='w-full rounded-full'>
            Tiếp tục học 🚀
          </Button>
        </div>
      </div>

      {/* Course Content */}
      <Tabs defaultValue='lessons' className='space-y-6'>
        <TabsList className='grid w-full grid-cols-3 gap-4 bg-transparent'>
          <TabsTrigger
            value='lessons'
            className='data-[state=active]:bg-primary data-[state=active]:text-white rounded-full'
          >
            Bài học 📚
          </TabsTrigger>
          <TabsTrigger
            value='games'
            className='data-[state=active]:bg-primary data-[state=active]:text-white rounded-full'
          >
            Trò chơi 🎮
          </TabsTrigger>
          <TabsTrigger
            value='achievements'
            className='data-[state=active]:bg-primary data-[state=active]:text-white rounded-full'
          >
            Thành tích 🏆
          </TabsTrigger>
        </TabsList>

        <TabsContent value='lessons' className='space-y-6'>
          {courseDetails.lessons.map((lesson) => (
            <Card key={lesson.id} className='p-6 hover:shadow-lg transition-shadow'>
              <div className='flex items-center gap-6'>
                <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center'>
                  {lesson.isCompleted ? <span className='text-2xl'>✅</span> : <span className='text-2xl'>📝</span>}
                </div>
                <div className='flex-1'>
                  <h3 className='text-xl font-bold mb-2'>
                    Bài {lesson.id}: {lesson.title}
                  </h3>
                  <p className='text-gray-600 mb-2'>{lesson.description}</p>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                      <span>⭐️</span>
                      <span className='text-sm text-gray-600'>{lesson.stars} sao</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span>⏱️</span>
                      <span className='text-sm text-gray-600'>{lesson.duration}</span>
                    </div>
                  </div>
                </div>
                <Button variant={lesson.isCompleted ? 'outline' : 'default'} className='rounded-full'>
                  {lesson.isCompleted ? 'Học lại 🔄' : 'Bắt đầu ▶️'}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value='games' className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {courseDetails.games.map((game) => (
            <Card key={game.id} className='p-6 hover:shadow-lg transition-shadow'>
              <div className='relative h-48 mb-4 rounded-xl overflow-hidden'>
                <Image src={game.image} alt={game.title} fill className='object-cover' />
              </div>
              <h3 className='text-xl font-bold mb-2'>{game.title}</h3>
              <p className='text-gray-600 mb-4'>{game.description}</p>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <span>⭐️</span>
                  <span className='text-sm text-gray-600'>{game.stars} sao</span>
                </div>
                <Button className='rounded-full'>Chơi ngay 🎮</Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value='achievements' className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {courseDetails.achievements.map((achievement) => (
            <Card key={achievement.id} className={`p-6 text-center ${!achievement.isUnlocked ? 'opacity-50' : ''}`}>
              <div className='w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center'>
                <span className='text-3xl'>{achievement.icon}</span>
              </div>
              <h3 className='font-bold mb-2'>{achievement.title}</h3>
              <p className='text-sm text-gray-600'>{achievement.description}</p>
              {!achievement.isUnlocked && <div className='mt-2 text-sm text-primary'>🔒 Chưa mở khóa</div>}
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CourseDetailPage
