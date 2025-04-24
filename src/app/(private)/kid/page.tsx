'use client'

import images from '@/assets/images'
import { useAppStore } from '@/components/app-provider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { useCourseByAccount, useSuggestCoursesFree, useGetChildProfileQuery } from '@/queries/useAccount'
import { BookOpen, Target, Scroll } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedBackground } from '@/components/private/kid/home/AnimatedBackground'
import { PlayerCard } from '@/components/private/kid/home/PlayerCard'
import { AchievementSection } from '@/components/private/kid/home/AchievementSection'
import { formatLevel } from '@/lib/utils'

const KidAdventureDashboard = () => {
  const username = useAppStore((state) => state.username)
  const { data: courseData, isLoading: coursesLoading } = useCourseByAccount({ page_size: 10, page_index: 1 })
  const courses = courseData?.payload.data ?? []
  const { data: suggestCoursesData, isLoading: suggestionsLoading } = useSuggestCoursesFree()
  const suggestCourses = suggestCoursesData?.payload.data ?? []
  const { data: childProfileData, isLoading: profileLoading } = useGetChildProfileQuery({ enabled: true })
  const childProfile = childProfileData?.payload.data

  const playerName = username?.split(' ')[0] || 'Nhà thám hiểm'
  const totalPoints = childProfile?.totalPoints || 0

  return (
    <div className='min-h-screen'>
      <AnimatedBackground />

      <div className='min-h-screen pt-4 pb-16'>
        <PlayerCard
          playerName={playerName}
          loading={coursesLoading || profileLoading}
          childProfile={childProfile}
          totalPoints={totalPoints}
        />

        {/* Quest Journal - Enhanced Animation */}
        <motion.section
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='mb-12 relative'
        >
          <div className='absolute -left-4 -top-4 w-20 h-20 bg-amber-100 rounded-full opacity-20 blur-xl'></div>
          <div className='flex items-center mb-6'>
            <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform'>
              <Scroll className='h-6 w-6 text-white' />
            </div>
            <h2 className='text-2xl font-bold ml-4 text-slate-700 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent'>
              Nhiệm vụ phiêu lưu
            </h2>
            <Link href='/kid/course' className='ml-auto'>
              <Button variant='ghost' className='text-slate-600 hover:text-amber-500'>
                Xem tất cả nhiệm vụ
              </Button>
            </Link>
          </div>

          {coursesLoading ? (
            <div className='grid gap-6'>
              {[...Array(2)].map((_, index) => (
                <Card key={index} className='border-0 overflow-hidden bg-white/80 backdrop-blur-sm shadow-md'>
                  <div className='relative p-5'>
                    {/* Quest decorator skeleton */}
                    <div className='absolute top-0 left-5 w-0.5 h-full bg-amber-100'></div>
                    <div className='absolute top-5 left-5 w-4 h-4 rounded-full bg-amber-200 border-4 border-amber-50 -ml-2'></div>

                    <div className='ml-6 pl-4'>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <div className='flex flex-wrap gap-2 mb-3'>
                            <Skeleton className='h-6 w-20 bg-indigo-100' />
                            <Skeleton className='h-6 w-16 bg-amber-100' />
                          </div>

                          <Skeleton className='h-8 w-4/5 mb-3 bg-gray-200' />
                          <Skeleton className='h-5 w-full mb-2 bg-gray-200' />
                          <Skeleton className='h-5 w-2/3 mb-5 bg-gray-200' />

                          <Skeleton className='h-3 w-full mb-2 bg-amber-100' />

                          <div className='flex justify-between'>
                            <Skeleton className='h-5 w-1/3 bg-gray-200' />
                            <Skeleton className='h-5 w-1/3 bg-gray-200' />
                          </div>
                        </div>

                        <Skeleton className='h-16 w-16 rounded-xl ml-4 flex-shrink-0 bg-gray-200' />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className='grid gap-6'>
              {courses.slice(0, 2).map((course) => (
                <Link href={`/kid/course/${course.id}?isEnrolled=true`} key={course.id}>
                  <Card className='border-0 overflow-hidden bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-md hover:shadow-lg group'>
                    <div className='relative p-5'>
                      {/* Quest decorator */}
                      <div className='absolute top-0 left-5 w-0.5 h-full bg-amber-200'></div>
                      <div className='absolute top-5 left-5 w-4 h-4 rounded-full bg-amber-400 border-4 border-amber-50 -ml-2 shadow-sm'></div>

                      <div className='ml-6 pl-4'>
                        {/* Quest title & info */}
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
                                {course.level || 'Dễ'}
                              </span>
                            </div>

                            <h3 className='text-xl font-bold text-slate-700 group-hover:text-amber-500 transition-colors mb-2'>
                              {course.title}
                            </h3>

                            <p className='text-slate-600 text-sm mb-4 line-clamp-2'>
                              {course.description || 'Hoàn thành nhiệm vụ này để nhận phần thưởng giá trị!'}
                            </p>
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

                        {/* Progress */}
                        <div className='mb-3'>
                          <Progress value={course.completionRate || 0} className='h-3 bg-slate-200' />
                        </div>

                        <div className='flex justify-between text-xs text-slate-600'>
                          <span>
                            {course.totalLessonFinished}/{course.totalLesson}
                          </span>
                          <span>{course.completionRate || 0}% hoàn thành</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className='p-8 text-center bg-white/80 border-0 shadow-md'>
              <div className='flex flex-col items-center'>
                <div className='p-3 bg-amber-50 rounded-full mb-4'>
                  <BookOpen className='h-6 w-6 text-amber-400' />
                </div>
                <h3 className='text-lg font-semibold text-slate-700 mb-2'>Chưa có nhiệm vụ nào</h3>
                <p className='text-slate-600 mb-6'>Bắt đầu cuộc phiêu lưu bằng cách chọn một khóa học</p>
                <Link href='/kid/course'>
                  <Button className='bg-amber-400 hover:bg-amber-500 text-white'>Khám phá khóa học</Button>
                </Link>
              </div>
            </Card>
          )}
        </motion.section>

        {/* New Adventures - With Animations */}
        <motion.section
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='mb-12'
        >
          <div className='flex items-center mb-6'>
            <div className='flex items-center'>
              <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform'>
                <Target className='h-6 w-6 text-white' />
              </div>
              <h2 className='text-2xl font-bold ml-4 text-slate-700 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent'>
                Cuộc phiêu lưu mới
              </h2>
            </div>
            <Link href='/kid/course' className='ml-auto'>
              <Button variant='ghost' className='text-slate-600 hover:text-purple-500'>
                Khám phá thêm
              </Button>
            </Link>
          </div>

          {suggestionsLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[...Array(3)].map((_, i) => (
                <Card key={i} className='border-0 overflow-hidden h-full shadow-md'>
                  {/* Course banner skeleton */}
                  <div className='relative w-full h-40 bg-purple-100/50'>
                    <Skeleton className='absolute inset-0' />

                    {/* Category badge skeleton */}
                    <div className='absolute bottom-3 left-3'>
                      <Skeleton className='h-6 w-16 bg-purple-200' />
                    </div>

                    {/* Difficulty level skeleton */}
                    <div className='absolute top-3 right-3'>
                      <Skeleton className='h-6 w-14 bg-gray-200' />
                    </div>
                  </div>

                  {/* Course content skeleton */}
                  <div className='p-5'>
                    <Skeleton className='h-7 w-3/4 mb-3 bg-gray-200' />
                    <Skeleton className='h-4 w-full mb-2 bg-gray-200' />
                    <Skeleton className='h-4 w-5/6 mb-6 bg-gray-200' />

                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-6 w-24 rounded-lg bg-gray-200' />
                      <Skeleton className='h-8 w-20 rounded-xl bg-purple-200' />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : suggestCourses.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {suggestCourses.slice(0, 3).map((course) => (
                <Link href={`/kid/course/${course.id}`} key={course.id}>
                  <Card className='border-0 overflow-hidden h-full bg-gradient-to-b from-white to-slate-50/90 backdrop-blur-sm hover:shadow-lg transition-all shadow-md group'>
                    {/* Course banner */}
                    <div className='relative w-full h-40 overflow-hidden'>
                      <Image
                        src={course.imageUrl || images.toy}
                        alt={course.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-all duration-500'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-slate-800/60 via-slate-800/30 to-transparent'></div>

                      {/* Category badges */}
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

                      {/* Difficulty level */}
                      <div className='absolute top-3 right-3'>
                        <span className='px-2 py-1 bg-white/80 text-slate-700 text-xs rounded-lg backdrop-blur-sm font-medium'>
                          {formatLevel(course.level || 'BEGINNER')}
                        </span>
                      </div>
                    </div>

                    {/* Course content */}
                    <div className='p-5'>
                      <h3 className='text-lg font-bold text-slate-700 group-hover:text-purple-500 transition-colors mb-2 line-clamp-1'>
                        {course.title}
                      </h3>

                      <p className='text-slate-600 text-sm mb-5 line-clamp-2 min-h-[40px]'>
                        {course.description || 'Một cuộc phiêu lưu thú vị đang chờ đón bạn!'}
                      </p>

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2 text-slate-500 text-xs'>
                          <div className='px-2 py-1 rounded-lg bg-slate-100 flex items-center gap-1'>
                            <BookOpen className='h-3.5 w-3.5' />
                            <span>{course.totalLesson || 10} bài học</span>
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
          ) : (
            <Card className='p-8 text-center bg-white/80 border-0 shadow-md'>
              <div className='flex flex-col items-center'>
                <div className='p-3 bg-purple-50 rounded-full mb-4'>
                  <Target className='h-6 w-6 text-purple-400' />
                </div>
                <h3 className='text-lg font-semibold text-slate-700 mb-2'>Chưa có khóa học mới</h3>
                <p className='text-slate-600 mb-6'>Chúng tôi sẽ sớm cập nhật các cuộc phiêu lưu mới cho bạn</p>
              </div>
            </Card>
          )}
        </motion.section>

        {/* AchievementSection */}
        <AchievementSection childProfile={childProfile} courses={courses} loading={profileLoading} />
      </div>
    </div>
  )
}

export default KidAdventureDashboard
