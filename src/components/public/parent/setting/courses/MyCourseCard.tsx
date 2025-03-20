import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Clock, PlayCircle, Star, BookmarkPlus, BookmarkCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface MyCourseCardProps {
  course: any
}

export function MyCourseCard({ course }: MyCourseCardProps) {
  const [saved, setSaved] = useState(course?.saved === true)
  const [imageError, setImageError] = useState(false)

  return (
    <Card className='overflow-hidden border-gray-50 hover:border-primary/10 shadow-sm hover:shadow transition-all duration-300 group'>
      <div className='flex flex-col md:flex-row'>
        {/* Course Image */}
        <div className='relative h-44 md:h-auto md:w-64 overflow-hidden'>
          {imageError ? (
            <div className='flex items-center justify-center h-full bg-slate-50'>
              <BookOpen className='h-10 w-10 text-slate-200' />
            </div>
          ) : (
            <Image
              src={course.imageUrl}
              alt={course.title}
              layout='fill'
              objectFit='cover'
              onError={() => setImageError(true)}
              className='group-hover:scale-105 transition-transform duration-700'
            />
          )}
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4'>
            <div className='flex items-center gap-2 text-white/90 mb-2 text-xs backdrop-blur-sm w-fit px-2 py-0.5 rounded-full bg-black/20'>
              <Clock className='h-3 w-3' />
              <span>{course.durationDisplay}</span>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <CardContent className='flex-1 p-5'>
          <div className='flex flex-col h-full'>
            {/* Categories and header area */}
            <div className='space-y-2'>
              <div className='flex flex-wrap gap-1.5 mb-1'>
                {course.categories.slice(0, 3).map((category: any) => (
                  <Badge
                    key={category.id}
                    variant='outline'
                    className='text-[10px] px-1.5 py-0 text-gray-500 border-gray-200 font-normal rounded-sm'
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>

              <div className='flex justify-between items-start gap-4'>
                <h3 className='text-base font-medium group-hover:text-primary transition-colors line-clamp-1'>
                  {course.title}
                </h3>
                <Button
                  size='icon'
                  variant='ghost'
                  className='h-7 w-7 text-gray-400 hover:text-primary mt-[-2px]'
                  onClick={() => setSaved(!saved)}
                >
                  {saved ? <BookmarkCheck className='h-4 w-4 text-primary' /> : <BookmarkPlus className='h-4 w-4' />}
                  <span className='sr-only'>{saved ? 'Remove bookmark' : 'Bookmark course'}</span>
                </Button>
              </div>

              <div className='flex items-center gap-3 text-xs text-gray-500'>
                {course.author && (
                  <div className='flex items-center gap-1'>
                    <BookOpen className='h-3 w-3' />
                    <span>{course.author}</span>
                  </div>
                )}
                {course.level && (
                  <div className='flex items-center gap-1'>
                    <Star className='h-3 w-3 text-amber-400' />
                    <span>{course.level}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Section */}
            <div className='mt-auto pt-4 space-y-3'>
              {/* Progress Bar */}
              <div className='space-y-1.5'>
                <div className='flex justify-between text-xs'>
                  <span className='text-gray-500'>Tiến độ học tập</span>
                  <div className='flex items-center gap-1'>
                    <span
                      className={
                        course.completionRate === 100 ? 'text-green-600 font-medium' : 'text-primary/90 font-medium'
                      }
                    >
                      {course.completionRate}%
                    </span>
                  </div>
                </div>
                {course.completionRate === 100 ? (
                  <Progress
                    value={course.completionRate}
                    className='h-1.5 bg-primary/5'
                    style={
                      {
                        '--tw-progress-fill': 'linear-gradient(to right, rgb(34, 197, 94), rgb(22, 163, 74))'
                      } as React.CSSProperties
                    }
                  />
                ) : (
                  <Progress value={course.completionRate} className='h-1.5 bg-primary/5' />
                )}
              </div>

              {/* Action Button */}
              <div className='flex justify-end'>
                <Button
                  size='sm'
                  className='bg-primary/90 hover:bg-primary shadow-sm transition-all hover:shadow'
                  asChild
                >
                  <Link href={`/learn/${course.id}`}>
                    <PlayCircle className='w-3.5 h-3.5 mr-1.5' />
                    {course.completionRate === 0 ? 'Bắt đầu học' : 'Tiếp tục học'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
