'use client'

import { useCourseByAccount, useSuggestCoursesFree } from '@/queries/useAccount'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Target, Brain, Gamepad2 } from 'lucide-react'
import images from '@/assets/images'
import { motion } from 'framer-motion'
import { Clock, Medal } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { translateLevel } from '@/lib/utils'

// Thêm component Overview
const CourseOverview = ({ courses }: { courses: any[] }) => {
  // Tính toán các thống kê từ data thực
  const totalActiveCourses = courses.length
  const completedCourses = courses.filter((c) => c.completionRate === 100).length
  const totalCompletionRate =
    courses.length > 0 ? Math.round(courses.reduce((acc, c) => acc + (c.completionRate || 0), 0) / courses.length) : 0

  // Tính tổng thời gian học (giả sử mỗi bài học mất 30 phút)
  const totalLessonsCompleted = courses.reduce((acc, c) => acc + (c.totalLessonFinished || 0), 0)
  const totalHours = Math.round(totalLessonsCompleted * 0.5)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
      <Card className='p-4 bg-gradient-to-br from-sky-50 to-blue-50'>
        <div className='flex items-start gap-3'>
          <div className='p-2 rounded-lg bg-blue-100'>
            <BookOpen className='w-5 h-5 text-blue-600' />
          </div>
          <div>
            <div className='text-2xl font-bold text-slate-800'>{totalActiveCourses}</div>
            <div className='text-sm text-slate-600'>Khóa học đang học</div>
          </div>
        </div>
      </Card>

      <Card className='p-4 bg-gradient-to-br from-emerald-50 to-green-50'>
        <div className='flex items-start gap-3'>
          <div className='p-2 rounded-lg bg-emerald-100'>
            <Target className='w-5 h-5 text-emerald-600' />
          </div>
          <div>
            <div className='text-2xl font-bold text-slate-800'>{totalCompletionRate}%</div>
            <div className='text-sm text-slate-600'>Tỷ lệ hoàn thành</div>
          </div>
        </div>
      </Card>

      <Card className='p-4 bg-gradient-to-br from-amber-50 to-orange-50'>
        <div className='flex items-start gap-3'>
          <div className='p-2 rounded-lg bg-amber-100'>
            <Clock className='w-5 h-5 text-amber-600' />
          </div>
          <div>
            <div className='text-2xl font-bold text-slate-800'>{totalHours}h</div>
            <div className='text-sm text-slate-600'>Thời gian học</div>
          </div>
        </div>
      </Card>

      <Card className='p-4 bg-gradient-to-br from-purple-50 to-pink-50'>
        <div className='flex items-start gap-3'>
          <div className='p-2 rounded-lg bg-purple-100'>
            <Medal className='w-5 h-5 text-purple-600' />
          </div>
          <div>
            <div className='text-2xl font-bold text-slate-800'>{completedCourses}</div>
            <div className='text-sm text-slate-600'>Khóa học hoàn thành</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

const OverviewCardSkeleton = () => (
  <Card className='p-4'>
    <div className='flex items-start gap-3'>
      <Skeleton className='w-9 h-9 rounded-lg' />
      <div>
        <Skeleton className='h-7 w-16 mb-1' />
        <Skeleton className='h-4 w-32' />
      </div>
    </div>
  </Card>
)

const ProgressCardSkeleton = () => (
  <Card className='p-6'>
    <div className='flex items-center justify-between mb-4'>
      <div className='flex items-center gap-2'>
        <Skeleton className='w-5 h-5 rounded-full' />
        <Skeleton className='h-6 w-32' />
      </div>
      <Skeleton className='h-8 w-16' />
    </div>
    <Skeleton className='h-4 w-full mb-3' />
    <Skeleton className='h-2 w-full mb-2' />
    <div className='flex justify-end'>
      <Skeleton className='h-4 w-24' />
    </div>
  </Card>
)

const CourseCardSkeleton = () => (
  <Card className='overflow-hidden border-none bg-white/80 backdrop-blur'>
    <div className='relative h-48'>
      <Skeleton className='h-full w-full' />
    </div>
    <div className='p-6'>
      <div className='flex items-center gap-2 mb-4'>
        <Skeleton className='h-8 w-8 rounded-full' />
        <Skeleton className='h-6 w-32' />
      </div>
      <Skeleton className='h-6 w-3/4 mb-2' />
      <Skeleton className='h-4 w-full mb-2' />
      <Skeleton className='h-4 w-2/3 mb-4' />
      <div className='flex items-center justify-between'>
        <Skeleton className='h-6 w-24 rounded-lg' />
        <Skeleton className='h-8 w-20 rounded-xl' />
      </div>
    </div>
  </Card>
)

function CoursePage() {
  const { data: courseData, isLoading: coursesLoading } = useCourseByAccount({ page_size: 10, page_index: 1 })
  const courses = courseData?.payload.data ?? []

  const { data: suggestCoursesData, isLoading: suggestionsLoading } = useSuggestCoursesFree()
  const suggestCourses = suggestCoursesData?.payload.data ?? []

  return (
    <div className='py-8'>
      {/* Pastel Banner */}
      <div className='relative overflow-hidden rounded-3xl mb-12'>
        <div className='absolute inset-0 bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100'></div>

        {/* Soft Decorative Elements */}
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-0 w-full h-full bg-white/40'></div>
          <div className='absolute -top-20 -left-20 w-72 h-72 bg-amber-200/50 rounded-full mix-blend-multiply filter blur-3xl'></div>
          <div className='absolute -bottom-20 -right-20 w-72 h-72 bg-rose-200/50 rounded-full mix-blend-multiply filter blur-3xl'></div>
        </div>

        <div className='relative px-8 py-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className='inline-flex items-center bg-white/70 rounded-full px-4 py-2 mb-6 backdrop-blur-sm shadow-sm'
            >
              <BookOpen className='w-5 h-5 text-amber-400 mr-2' />
              <span className='text-slate-700 font-medium'>Hành trình học tập của bạn</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='text-4xl md:text-5xl font-bold text-slate-800 mb-6'
            >
              Khám Phá và Học Hỏi
              <br />
              <span className='text-amber-500'>Cùng Những Khóa Học Thú Vị</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='text-lg text-slate-600 max-w-2xl mx-auto'
            >
              Bắt đầu hành trình chinh phục tri thức với những khóa học được thiết kế đặc biệt dành cho bạn
            </motion.p>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      {coursesLoading ? (
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='mb-8'>
          <div className='flex items-center gap-3 mb-6'>
            <Skeleton className='w-12 h-12 rounded-2xl' />
            <div>
              <Skeleton className='h-8 w-48 mb-1' />
              <Skeleton className='h-5 w-64' />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <OverviewCardSkeleton key={`overview-${i}`} />
              ))}
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <ProgressCardSkeleton key={`progress-${i}`} />
              ))}
          </div>
        </motion.section>
      ) : (
        <motion.section initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='mb-8'>
          <div className='flex items-center mb-6'>
            <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform'>
              <Brain className='h-6 w-6 text-white' />
            </div>
            <h2 className='text-2xl font-bold ml-4 text-slate-700 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent'>
              Tổng quan học tập
            </h2>
          </div>
          <CourseOverview courses={courses} />
        </motion.section>
      )}

      <div className='min-h-screen'>
        {/* Background effect */}
        <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
          <div className='absolute top-0 -left-10 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
          <div className='absolute top-0 -right-10 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
          <div className='absolute -bottom-8 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
        </div>

        <div className='min-h-screen pt-4 pb-16'>
          {/* Quest Journal - Khóa học đang học */}
          <section className='mb-12 relative'>
            <div className='absolute -left-4 -top-4 w-20 h-20 bg-amber-100 rounded-full opacity-20 blur-xl'></div>
            <div className='flex items-center mb-6'>
              <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform'>
                <BookOpen className='h-6 w-6 text-white' />
              </div>
              <h2 className='text-2xl font-bold ml-4 text-slate-700 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent'>
                Nhiệm vụ đang thực hiện
              </h2>
            </div>

            {coursesLoading ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <CourseCardSkeleton key={`current-${i}`} />
                  ))}
              </div>
            ) : courses.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {courses.map((course) => (
                  <Link href={`/kid/course/${course.id}?isEnrolled=true`} key={course.id}>
                    <Card className='border-0 overflow-hidden bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-md hover:shadow-lg group'>
                      <div className='relative p-5'>
                        {/* Quest decorator */}
                        <div className='absolute top-0 left-5 w-0.5 h-full bg-amber-200'></div>
                        <div className='absolute top-5 left-5 w-4 h-4 rounded-full bg-amber-400 border-4 border-amber-50 -ml-2 shadow-sm'></div>

                        <div className='ml-6 pl-4'>
                          <div className='flex items-start justify-between'>
                            <div>
                              <div className='flex flex-wrap gap-2 mb-2'>
                                {course.categories?.slice(0, 1).map((category) => (
                                  <span
                                    key={category.id}
                                    className='px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-lg font-medium'
                                  >
                                    {category.name}
                                  </span>
                                ))}
                                <span className='px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded-lg font-medium'>
                                  {course.level}
                                </span>
                              </div>

                              <h3 className='text-xl font-bold text-slate-700 group-hover:text-amber-500 transition-colors mb-2 line-clamp-1'>
                                {course.title}
                              </h3>

                              <p className='text-slate-600 text-sm mb-4 line-clamp-2'>{course.description}</p>
                            </div>

                            <div className='w-16 h-16 shrink-0 ml-4'>
                              <div className='w-full h-full rounded-xl overflow-hidden shadow-md'>
                                <Image
                                  src={course.imageUrl || images.toy}
                                  alt={course.title}
                                  width={64}
                                  height={64}
                                  className='w-full h-full object-cover'
                                />
                              </div>
                            </div>
                          </div>

                          <div className='mb-3'>
                            <Progress value={course.completionRate} className='h-3 bg-slate-200' />
                          </div>

                          <div className='flex justify-between text-xs text-slate-600'>
                            <span>
                              {course.totalLessonFinished}/{course.totalLesson} bài học
                            </span>
                            <span>{course.completionRate}% hoàn thành</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className='p-8 text-center bg-white/80 backdrop-blur'>
                <BookOpen className='w-12 h-12 text-slate-300 mx-auto mb-4' />
                <h3 className='text-xl font-bold text-slate-800 mb-2'>Chưa có khóa học nào</h3>
                <p className='text-slate-600 mb-4'>Hãy bắt đầu với các khóa học miễn phí của chúng tôi</p>
                <Button variant='outline'>Khám phá ngay</Button>
              </Card>
            )}
          </section>

          {/* New Adventures - Khóa học đề xuất */}
          <section className='mb-12'>
            <div className='flex items-center mb-6'>
              <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform'>
                <Target className='h-6 w-6 text-white' />
              </div>
              <h2 className='text-2xl font-bold ml-4 text-slate-700 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent'>
                Cuộc phiêu lưu mới
              </h2>
            </div>

            {suggestionsLoading ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <CourseCardSkeleton key={`suggest-${i}`} />
                  ))}
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {suggestCourses.map((course) => (
                  <Link href={`/kid/course/${course.id}?isEnrolled=false`} key={course.id}>
                    <Card className='border-0 overflow-hidden h-full bg-gradient-to-b from-white to-slate-50/90 backdrop-blur-sm hover:shadow-lg transition-all shadow-md group'>
                      <div className='relative w-full h-40 overflow-hidden'>
                        <Image
                          src={course.imageUrl || images.toy}
                          alt={course.title}
                          fill
                          className='object-cover group-hover:scale-105 transition-all duration-500'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-slate-800/60 via-slate-800/30 to-transparent'></div>

                        <div className='absolute bottom-3 left-3 flex flex-wrap gap-2'>
                          {course.categories?.slice(0, 1).map((category) => (
                            <span
                              key={category.id}
                              className='px-2 py-1 bg-purple-400/80 text-white text-xs rounded-lg backdrop-blur-sm font-medium'
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>

                        <div className='absolute top-3 right-3'>
                          <span className='px-2 py-1 bg-white/80 text-slate-700 text-xs rounded-lg backdrop-blur-sm font-medium'>
                            {translateLevel(course.level)}
                          </span>
                        </div>
                      </div>

                      <div className='p-5'>
                        <h3 className='text-lg font-bold text-slate-700 group-hover:text-purple-500 transition-colors mb-2 line-clamp-1'>
                          {course.title}
                        </h3>

                        <p className='text-slate-600 text-sm mb-5 line-clamp-2 min-h-[40px]'>{course.description}</p>

                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-2 text-slate-500 text-xs'>
                            <div className='px-2 py-1 rounded-lg bg-slate-100 flex items-center gap-1'>
                              <BookOpen className='h-3.5 w-3.5' />
                              <span>{course.totalLesson} bài học</span>
                            </div>
                          </div>

                          <Button
                            size='sm'
                            className='bg-purple-400 hover:bg-purple-500 text-white rounded-xl px-3 py-1 h-8'
                          >
                            Bắt đầu
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Entertainment Section */}
          <section className='mb-12'>
            <div className='flex items-center mb-6'>
              <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform'>
                <Gamepad2 className='h-6 w-6 text-white' />
              </div>
              <h2 className='text-2xl font-bold ml-4 text-slate-700 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent'>
                Khu vực giải trí
              </h2>
            </div>

            {/* Entertainment content */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <Link href='/kid/game/memory'>
                <Card className='p-6 bg-gradient-to-r from-primary/10 to-secondary/10 hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
                      <span className='text-2xl'>🧩</span>
                    </div>
                    <div>
                      <h3 className='font-bold mb-1'>Memory Game</h3>
                      <p className='text-sm text-gray-600'>Rèn luyện trí nhớ</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href='/kid/game/tictactoe'>
                <Card className='p-6 bg-gradient-to-r from-green-100 to-blue-100 hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
                      <span className='text-2xl'>⭕</span>
                    </div>
                    <div>
                      <h3 className='font-bold mb-1'>Tic Tac Toe</h3>
                      <p className='text-sm text-gray-600'>Trò chơi cờ ca rô</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href='/kid/game/rocket'>
                <Card className='p-6 bg-gradient-to-r from-yellow-100 to-red-100 hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
                      <span className='text-2xl'>🚀</span>
                    </div>
                    <div>
                      <h3 className='font-bold mb-1'>Rocket Game</h3>
                      <p className='text-sm text-gray-600'>Phiêu lưu trong không gian</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CoursePage
