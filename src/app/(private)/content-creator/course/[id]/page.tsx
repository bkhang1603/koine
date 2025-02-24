'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Clock, Edit, FileText, GraduationCap, LayoutList, BookOpen } from 'lucide-react'
import { courses } from '../../_mock/data'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id)

  if (!course) return null

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4'>
        {/* Back Button */}
        <div className='mb-6'>
          <Link href='/content-creator/course'>
            <Button variant='ghost'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Quay lại
            </Button>
          </Link>
        </div>

        {/* Course Banner */}
        <div className='relative aspect-[21/9] rounded-xl overflow-hidden mb-8'>
          <Image src={course.banner} alt={course.title} fill className='object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
          <div className='absolute bottom-0 left-0 right-0 p-8'>
            <div className='flex items-center justify-between'>
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <Badge
                    variant={course.status === 'published' ? 'default' : 'secondary'}
                    className='uppercase text-xs'
                  >
                    {course.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                  </Badge>
                  <Badge variant='outline' className='font-normal bg-white/10 backdrop-blur-sm'>
                    {course.level}
                  </Badge>
                  <Badge variant='outline' className='font-normal bg-white/10 backdrop-blur-sm'>
                    {course.ageGroup}
                  </Badge>
                </div>
                <h1 className='text-3xl font-bold text-white'>{course.title}</h1>
                <p className='text-white/90 max-w-2xl text-lg'>{course.description}</p>
              </div>
              <Link href={`/content-creator/course/${params.id}/edit`}>
                <Button size='lg' className='shadow-lg'>
                  <Edit className='w-4 h-4 mr-2' />
                  Chỉnh sửa khóa học
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='col-span-2 space-y-8'>
            {/* Course Content */}
            <Card className='shadow-sm'>
              <div className='border-b p-6'>
                <div className='flex items-center gap-2 text-lg font-semibold'>
                  <LayoutList className='w-5 h-5 text-primary' />
                  Nội dung khóa học
                </div>
              </div>
              <CardContent className='p-0'>
                {course.chapters.map((chapter, index) => (
                  <div key={chapter.id} className='border-b last:border-0'>
                    <div className='p-6 bg-muted/50'>
                      <div className='flex items-center gap-4'>
                        <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-medium text-primary'>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className='font-medium text-lg'>{chapter.title}</h3>
                          <p className='text-sm text-muted-foreground mt-1'>{chapter.description}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className='p-4 pl-20 hover:bg-muted/50 transition-colors border-b last:border-0'
                        >
                          <div className='flex items-center gap-4'>
                            <div
                              className={cn(
                                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                                lesson.type === 'video' && 'bg-blue-500/10 text-blue-500',
                                lesson.type === 'quiz' && 'bg-orange-500/10 text-orange-500',
                                lesson.type === 'text' && 'bg-green-500/10 text-green-500'
                              )}
                            >
                              {lessonIndex + 1}
                            </div>
                            <div className='flex-1'>
                              <div className='flex items-center gap-2'>
                                <span className='font-medium'>{lesson.title}</span>
                                <Badge
                                  variant='outline'
                                  className={cn(
                                    'font-normal',
                                    lesson.type === 'video' && 'border-blue-500/50 text-blue-500',
                                    lesson.type === 'quiz' && 'border-orange-500/50 text-orange-500',
                                    lesson.type === 'text' && 'border-green-500/50 text-green-500'
                                  )}
                                >
                                  {lesson.type === 'video' ? 'Video' : lesson.type === 'quiz' ? 'Bài tập' : 'Bài đọc'}
                                </Badge>
                              </div>
                              <div className='flex items-center gap-2 mt-1 text-sm text-muted-foreground'>
                                <Clock className='w-3.5 h-3.5' />
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Requirements & Outcomes */}
            <div className='grid grid-cols-2 gap-6'>
              <Card className='shadow-sm'>
                <div className='border-b p-6'>
                  <div className='flex items-center gap-2 text-lg font-semibold'>
                    <FileText className='w-5 h-5 text-primary' />
                    Yêu cầu khóa học
                  </div>
                </div>
                <CardContent className='pt-6'>
                  <ul className='space-y-3 text-sm pl-4'>
                    <li className='flex gap-3 items-start'>
                      <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0' />
                      <span>Học viên có thể tự động kiểm tra kiến thức của mình sau khi học xong bài học.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='shadow-sm'>
                <div className='border-b p-6'>
                  <div className='flex items-center gap-2 text-lg font-semibold'>
                    <GraduationCap className='w-5 h-5 text-primary' />
                    Kết quả đạt được
                  </div>
                </div>
                <CardContent className='pt-6'>
                  <ul className='space-y-3 text-sm pl-4'>
                    <li className='flex gap-3 items-start'>
                      <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0' />
                      <span>Học viên có thể tự động kiểm tra kiến thức của mình sau khi học xong bài học.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            <Card className='shadow-sm'>
              <CardContent className='p-6'>
                <div className='grid grid-cols-2 gap-6'>
                  <div className='p-4 rounded-lg bg-muted/50 space-y-1'>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <BookOpen className='w-4 h-4' />
                      Tổng số chương
                    </div>
                    <div className='text-2xl font-semibold'>{course.chapters.length}</div>
                  </div>
                  <div className='p-4 rounded-lg bg-muted/50 space-y-1'>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <FileText className='w-4 h-4' />
                      Tổng số bài học
                    </div>
                    <div className='text-2xl font-semibold'>{course.totalLessons}</div>
                  </div>
                  <div className='p-4 rounded-lg bg-muted/50 space-y-1'>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <Clock className='w-4 h-4' />
                      Thời lượng
                    </div>
                    <div className='text-2xl font-semibold'>{course.duration}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
