'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, User, Award, BookOpen, Clock, CheckCircle, Phone, Mail, MapPin, Calendar, Trophy } from 'lucide-react'
import Image from 'next/image'
import { useAppStore } from '@/components/app-provider'

export default function EnhancedCourseProfile() {
  const user = useAppStore((state) => state.user)

  const courses = [
    {
      id: 1,
      name: 'Hiểu về cơ thể của mình',
      progress: 100,
      totalLessons: 10,
      completedLessons: 10,
      image: 'https://koine-bucket.s3.ap-southeast-2.amazonaws.com/image_97d6bb06-9a3c-47ff-8371-25cbd2487532_png_s3',
      status: 'Hoàn thành',
      estimatedTime: '5 giờ',
      color: 'bg-pink-100 text-pink-800'
    },
    {
      id: 2,
      name: 'Tôn trọng ranh giới cá nhân',
      progress: 80,
      totalLessons: 8,
      completedLessons: 6,
      image: 'https://koine-bucket.s3.ap-southeast-2.amazonaws.com/image_2deb32f4-f42e-409c-b0cc-d71a5a78471c_png_s3',
      status: 'Đang học',
      estimatedTime: '4 giờ',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 3,
      name: 'Cảm xúc và mối quan hệ',
      progress: 50,
      totalLessons: 12,
      completedLessons: 6,
      image: 'https://koine-bucket.s3.ap-southeast-2.amazonaws.com/image_97d6bb06-9a3c-47ff-8371-25cbd2487532_png_s3',
      status: 'Đang học',
      estimatedTime: '6 giờ',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 4,
      name: 'An toàn trên mạng',
      progress: 25,
      totalLessons: 8,
      completedLessons: 2,
      image: 'https://koine-bucket.s3.ap-southeast-2.amazonaws.com/image_2deb32f4-f42e-409c-b0cc-d71a5a78471c_png_s3',
      status: 'Mới bắt đầu',
      estimatedTime: '4 giờ',
      color: 'bg-green-100 text-green-800'
    }
  ]

  const achievements = [
    {
      id: 1,
      title: 'Nhà thám hiểm cơ thể',
      description: 'Hoàn thành khóa học "Hiểu về cơ thể của mình"',
      icon: Heart,
      color: 'bg-pink-500',
      progress: 100
    },
    {
      id: 2,
      title: 'Người bạn tôn trọng',
      description: 'Đạt điểm tuyệt đối trong bài kiểm tra về ranh giới cá nhân',
      icon: User,
      color: 'bg-purple-500',
      progress: 80
    },
    {
      id: 3,
      title: 'Chuyên gia cảm xúc',
      description: 'Hoàn thành 50% khóa học về cảm xúc và mối quan hệ',
      icon: Award,
      color: 'bg-blue-500',
      progress: 50
    }
  ]

  return (
    <main className='mb-56'>
      {/* Header Section */}
      <section className='p-8 flex items-center justify-between rounded-b-xl overflow-hidden border-b-2 border-gray-200 bg-gradient-to-br from-green-100 to-blue-100'>
        <div className='flex items-center'>
          <Avatar className='h-24 w-24 rounded-full border-4 border-blue-200 transition-transform duration-300 hover:scale-110 cursor-pointer'>
            <AvatarImage src={user?.avatarUrl} alt={user?.username || user?.email} />
            <AvatarFallback>{(user?.username || user?.email)?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='ml-6'>
            <h1 className='text-3xl font-bold text-gray-900 mb-1'>{user?.username}</h1>
            <div className='flex items-center text-gray-600'>
              <Mail className='h-4 w-4 mr-2' />
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
        <Button variant='outline' className='flex items-center transition-colors duration-300 hover:bg-gray-100'>
          <User className='mr-2 h-4 w-4' /> Chỉnh sửa hồ sơ
        </Button>
      </section>

      {/* Main Content */}
      <div className='p-8'>
        {/* Personal Information */}
        <section className='mb-12'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Thông tin cá nhân</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex items-center'>
              <Phone className='h-5 w-5 text-gray-400 mr-3' />
              <div>
                <div className='text-sm text-gray-500'>Số điện thoại</div>
                <div className='font-medium'>{user?.phone ?? '0934600600'}</div>
              </div>
            </div>
            <div className='flex items-center'>
              <MapPin className='h-5 w-5 text-gray-400 mr-3' />
              <div>
                <div className='text-sm text-gray-500'>Địa chỉ</div>
                <div className='font-medium'>???</div>
              </div>
            </div>
            <div className='flex items-center'>
              <Calendar className='h-5 w-5 text-gray-400 mr-3' />
              <div>
                <div className='text-sm text-gray-500'>Ngày sinh</div>
                <div className='font-medium'>{user?.dob}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Progress Overview */}
        <section className='mb-12'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Tổng quan tiến độ học tập</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <Card className='border-none shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer select-none'>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-lg font-medium text-gray-700'>Tổng tiến trình</CardTitle>
                <Heart className='h-6 w-6 text-pink-500' />
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold text-gray-900'>???%</div>
                <Progress value={0} className='mt-2' />
              </CardContent>
            </Card>
            <Card className='border-none shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer select-none'>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-lg font-medium text-gray-700'>Khóa học đã đăng ký</CardTitle>
                <BookOpen className='h-6 w-6 text-purple-500' />
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold text-gray-900'>???</div>
                <p className='text-sm text-gray-600 mt-1'>Khám phá và học hỏi</p>
              </CardContent>
            </Card>
            <Card className='border-none shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer select-none'>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-lg font-medium text-gray-700'>Khóa học đã hoàn thành</CardTitle>
                <CheckCircle className='h-6 w-6 text-green-500' />
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold text-gray-900'>???</div>
                <p className='text-sm text-gray-600 mt-1'>Tiếp tục cố gắng nhé!</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Courses */}
        <section className='mb-12'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Khóa học của bạn</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {courses.map((course) => (
              <Card
                key={course.id}
                className='overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer select-none'
              >
                <CardContent className='p-0'>
                  <div className='flex items-center'>
                    <div className='w-1/4'>
                      <Image
                        src={course.image}
                        alt={course.name}
                        width={500}
                        height={500}
                        className='w-full h-full object-cover aspect-square'
                      />
                    </div>
                    <div className='w-3/4 p-4'>
                      <h3 className='text-lg font-semibold text-gray-900 mb-2'>{course.name}</h3>
                      <div className='flex items-center mb-2'>
                        <Badge
                          className='mr-2'
                          variant={
                            course.status === 'Hoàn thành' ? 'green' : course.status === 'Đang học' ? 'blue' : 'yellow'
                          }
                        >
                          {course.status}
                        </Badge>
                        <div className='text-sm text-gray-500 flex items-center'>
                          <Clock className='h-3 w-3 mr-1' />
                          {course.estimatedTime}
                        </div>
                      </div>
                      <div className='flex items-center justify-between mb-2'>
                        <div className='flex items-center'>
                          <BookOpen className='h-4 w-4 text-gray-400 mr-1' />
                          <span className='text-sm text-gray-500'>
                            {course.completedLessons} / {course.totalLessons} bài học
                          </span>
                        </div>
                        <span className='text-lg font-bold' style={{ color: course.color.split(' ')[1] }}>
                          {course.progress}%
                        </span>
                      </div>
                      <Progress value={course.progress} className='mt-2' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Thành tựu</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className='overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer select-none'
              >
                <CardContent className='p-6 relative'>
                  <div className='flex items-center justify-center mb-4'>
                    <div className={`p-3 rounded-full ${achievement.color}`}>
                      <achievement.icon className='h-8 w-8 text-white' />
                    </div>
                  </div>
                  <h3 className='font-semibold text-lg mb-2 text-gray-900'>{achievement.title}</h3>
                  <p className='text-sm text-gray-600 mb-4'>{achievement.description}</p>
                  <div className='relative pt-1'>
                    <div className='flex mb-2 items-center justify-between'>
                      <Badge variant={'blue'}>Tiến độ</Badge>
                      <div className='text-right'>
                        <span className='font-semibold inline-block text-pink-600'>{achievement.progress}%</span>
                      </div>
                    </div>
                    <Progress value={achievement.progress} />
                  </div>
                  {achievement.progress === 100 && (
                    <div className='absolute top-5 right-5'>
                      <Trophy className='h-8 w-8 text-yellow-500' />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
