import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { MyChildAccountByIdResType } from '@/schemaValidations/account.schema'
import { BookOpen, Clock, Star, Eye } from 'lucide-react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

export interface CourseCardProps {
  courses: MyChildAccountByIdResType['data']['courses'][0]
}

export function CourseCard({ courses }: CourseCardProps) {
  const [visible, setVisible] = useState(true)
  const [imageError, setImageError] = useState(false)

  return (
    <Card className='overflow-hidden border-gray-100 hover:shadow-md transition-all duration-300 group'>
      <div className='flex flex-col md:flex-row'>
        {/* Course Image */}
        <div className='relative h-48 md:h-auto md:w-72 overflow-hidden'>
          {imageError ? (
            <div className='flex items-center justify-center h-full bg-gray-50'>
              <Eye className='h-12 w-12 text-gray-300' />
            </div>
          ) : (
            <div className='w-full h-full'>
              <Image
                src={courses.imageUrl || '/placeholder-course.jpg'}
                alt={courses.title}
                layout='fill'
                objectFit='cover'
                onError={() => setImageError(true)}
              />
            </div>
          )}
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4'>
            <div className='flex items-center gap-2 text-white mb-2'>
              <Clock className='h-4 w-4' />
              <span className='text-sm'>{courses.durationDisplay}</span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {courses.categories.map((category) => (
                <Badge
                  key={category.id}
                  variant='outline'
                  className='bg-black/30 backdrop-blur-sm text-white border-none'
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Course Content */}
        <CardContent className='flex-1 p-5'>
          <div className='flex flex-col h-full'>
            {/* Header */}
            <div className='mb-3'>
              <div className='flex items-start justify-between gap-2'>
                <h3 className='text-lg font-medium group-hover:text-primary transition-colors'>{courses.title}</h3>
                <Badge variant={courses.completionRate === 100 ? 'green' : 'default'} className='shrink-0'>
                  {courses.completionRate === 100 ? 'Hoàn thành' : `${courses.completionRate}%`}
                </Badge>
              </div>
              <p className='text-sm text-gray-500 line-clamp-2 mt-1'>{courses.description}</p>
            </div>

            {/* Progress Section */}
            <div className='mt-auto space-y-4'>
              {/* Stats Row */}
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div className='flex items-center gap-2'>
                  <BookOpen className='h-4 w-4 text-gray-400' />
                  <span className='text-gray-700'>
                    {courses.totalLessonFinished}/{courses.totalLesson} bài học
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Star className='h-4 w-4 text-amber-400' />
                  <span className='text-gray-700'>{courses.level}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className='space-y-1.5'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-500'>Tiến độ</span>
                  <span className='font-medium'>{courses.completionRate}%</span>
                </div>
                <Progress value={courses.completionRate} className='h-1.5' />
              </div>

              {/* Visibility Toggle */}
              <div className='flex justify-end items-center pt-3'>
                <div className='flex items-center gap-3'>
                  <Switch id={`enable-${courses.id}`} checked={visible} onCheckedChange={setVisible} />
                  <label htmlFor={`enable-${courses.id}`} className='text-xs text-gray-500 cursor-pointer'>
                    {visible ? 'Hiển thị cho con' : 'Đang ẩn'}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
