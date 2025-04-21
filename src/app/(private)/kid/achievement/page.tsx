'use client'

import { Card } from '@/components/ui/card'
import { Trophy, Star, Timer, Book, Gamepad, Award, Shield, Medal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageBanner } from '@/components/shared/PageBanner'
import { useGetMyCertificate, useGetChildProfileQuery } from '@/queries/useAccount'
import { format, formatDistance } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'
import { vi } from 'date-fns/locale'

// Helper functions for date formatting
const formatDateString = (dateString: string): string => {
  try {
    return format(new Date(dateString), 'dd/MM/yyyy')
  } catch (e) {
    return dateString
  }
}

const formatRelativeDate = (dateString: string): string => {
  try {
    return formatDistance(new Date(dateString), new Date(), {
      addSuffix: true,
      locale: vi
    })
  } catch (e) {
    return dateString
  }
}

export default function AchievementPage() {
  const { data: certificateData, isLoading: certificateLoading } = useGetMyCertificate()
  const { data: profileData, isLoading: profileLoading } = useGetChildProfileQuery({ enabled: true })

  // Lấy thông tin từ profile
  const profile = profileData?.payload?.data
  const totalPoints = profile?.totalPoints || 0
  const totalLearningTime = profile?.totalLearningTimes || 0
  const level = profile?.level || 'Beginner'

  // Lấy danh sách chứng chỉ
  const certificates = certificateData?.payload?.data || []

  // Tạo danh sách khóa học đã hoàn thành
  const completedCourses = certificates.slice(0, 3).map((cert: any, index: number) => {
    const colors = ['amber', 'blue', 'purple', 'emerald']
    return {
      title: cert.courseTitle,
      date: formatRelativeDate(cert.completedDate),
      icon: Award,
      color: colors[index % colors.length]
    }
  })

  // Thống kê hiển thị
  const stats = [
    {
      title: 'Tổng điểm',
      value: totalPoints.toLocaleString(),
      icon: Star,
      color: 'amber'
    },
    {
      title: 'Chứng chỉ đã đạt',
      value: `${certificates.length}`,
      icon: Trophy,
      color: 'purple'
    },
    {
      title: 'Thời gian học tập',
      value: `${Math.round(totalLearningTime)}h`,
      icon: Timer,
      color: 'blue'
    },
    {
      title: 'Cấp độ',
      value: level,
      icon: Gamepad,
      color: 'emerald'
    }
  ]

  if (profileLoading) {
    return <AchievementSkeleton />
  }

  return (
    <div className='py-8'>
      <PageBanner
        icon={Trophy}
        badge='Bằng cấp và chứng chỉ'
        title='Thành tựu học tập'
        highlightText='Hành trình phát triển'
        description='Theo dõi các chứng chỉ khóa học và kết quả học tập của bạn'
        gradient={{
          background: 'from-yellow-100 via-amber-100 to-orange-100',
          blur1: 'bg-yellow-200/50',
          blur2: 'bg-orange-200/50'
        }}
      />

      <div className='min-h-screen pb-20'>
        {/* Stats Overview */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'>
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className='border-none bg-white/60 backdrop-blur hover:bg-white/80 transition-all'>
                <div className='p-6 flex items-center gap-4'>
                  <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <div>
                    <div className='text-2xl font-bold text-slate-700'>{stat.value}</div>
                    <div className='text-sm text-slate-500'>{stat.title}</div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-8 space-y-8'>
            {/* Certificates */}
            <section>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-slate-800'>Chứng Chỉ & Bằng Cấp</h2>
                <Button variant='ghost' size='sm' className='text-slate-600 hover:text-slate-900'>
                  Xem tất cả
                </Button>
              </div>

              {certificateLoading ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <CertificateSkeleton count={4} />
                </div>
              ) : certificates.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {certificates.map((cert: any, index: number) => (
                    <Card
                      key={cert.courseId}
                      className='group border-none bg-white/60 backdrop-blur hover:bg-white/80 transition-all'
                    >
                      <div className='p-5'>
                        <div className='flex items-start gap-4'>
                          <div
                            className={`w-16 h-16 rounded-2xl bg-${
                              ['amber', 'blue', 'purple', 'emerald'][index % 4]
                            }-50 
                              flex items-center justify-center group-hover:scale-110 transition-transform`}
                          >
                            <Award
                              className={`w-8 h-8 text-${['amber', 'blue', 'purple', 'emerald'][index % 4]}-400`}
                            />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h3 className='font-medium text-slate-800 truncate'>{cert.courseTitle}</h3>
                              <Shield className='w-4 h-4 text-emerald-400 flex-shrink-0' />
                            </div>
                            <p className='text-sm text-slate-500 mb-2'>Điểm số: {cert.score}</p>
                            <div className='text-xs text-slate-400'>
                              Hoàn thành: {formatDateString(cert.completedDate)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className='p-10 text-center bg-slate-50 rounded-lg'>
                  <Trophy className='w-12 h-12 text-slate-300 mx-auto mb-4' />
                  <h3 className='text-lg font-medium text-slate-600 mb-2'>Chưa có chứng chỉ</h3>
                  <p className='text-slate-500 mb-4'>Hoàn thành các khóa học để nhận chứng chỉ của bạn</p>
                </div>
              )}
            </section>

            {/* How To Earn Certificates */}
            <section>
              <Card className='border-none bg-white/60 backdrop-blur p-6'>
                <div className='flex items-start gap-4 mb-4'>
                  <div className='p-3 rounded-xl bg-blue-50'>
                    <Book className='w-6 h-6 text-blue-400' />
                  </div>
                  <div>
                    <h3 className='font-medium text-slate-800 mb-2'>Làm thế nào để có được chứng chỉ?</h3>
                    <p className='text-sm text-slate-600 mb-4'>
                      Hoàn thành các khóa học và đạt được điểm số tốt để nhận chứng chỉ. Mỗi chứng chỉ là minh chứng cho
                      trình độ và kỹ năng của bạn trong lĩnh vực tương ứng.
                    </p>
                    <ul className='text-sm text-slate-600 space-y-2'>
                      <li className='flex items-start gap-2'>
                        <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                          1
                        </div>
                        <span>Hoàn thành tất cả các bài học trong khóa học.</span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                          2
                        </div>
                        <span>Vượt qua các bài kiểm tra và đạt điểm số tối thiểu.</span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                          3
                        </div>
                        <span>Khi hoàn thành, chứng chỉ sẽ tự động được cấp cho bạn.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-4 space-y-6'>
            {/* Completed Courses */}
            <Card className='border-none bg-white/60 backdrop-blur'>
              <div className='p-5 border-b border-slate-100'>
                <h3 className='font-medium text-slate-800 flex items-center gap-2'>
                  <Medal className='w-5 h-5 text-amber-400' />
                  Khóa Học Đã Hoàn Thành
                </h3>
              </div>
              <div>
                {certificateLoading ? (
                  <MedalSkeleton count={3} />
                ) : completedCourses.length > 0 ? (
                  completedCourses.map((course: any, index: number) => {
                    const Icon = course.icon
                    return (
                      <div key={index} className='p-4 border-b border-slate-50 last:border-none hover:bg-slate-50/50'>
                        <div className='flex items-center gap-3'>
                          <div className={`p-2 rounded-lg bg-${course.color}-50`}>
                            <Icon className={`w-5 h-5 text-${course.color}-400`} />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='font-medium text-slate-700 truncate'>{course.title}</div>
                            <div className='text-xs text-slate-400'>{course.date}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className='p-8 text-center'>
                    <p className='text-slate-500'>Chưa có khóa học nào hoàn thành</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className='border-none bg-white/60 backdrop-blur p-6 space-y-6'>
              <div className='text-center'>
                <div
                  className='inline-flex items-center justify-center w-16 h-16 rounded-full 
                    bg-gradient-to-r from-violet-100 to-purple-100 mb-4'
                >
                  <Star className='w-8 h-8 text-purple-400' />
                </div>
                <div className='text-3xl font-bold text-slate-800 mb-1'>{totalPoints.toLocaleString()}</div>
                <div className='text-sm text-slate-500'>Tổng điểm thành tích</div>
              </div>
              <div className='grid grid-cols-2 gap-4 text-center'>
                <div className='p-4 rounded-lg bg-slate-50'>
                  <div className='text-xl font-bold text-slate-700'>{certificates.length}</div>
                  <div className='text-sm text-slate-500'>Chứng chỉ</div>
                </div>
                <div className='p-4 rounded-lg bg-slate-50'>
                  <div className='text-xl font-bold text-slate-700'>{level}</div>
                  <div className='text-sm text-slate-500'>Cấp độ</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Components for loading states
function AchievementSkeleton() {
  return (
    <div className='py-8'>
      <div className='h-48 bg-gradient-to-r from-yellow-50 to-orange-50 mb-12'></div>
      <div className='min-h-screen pb-20'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className='h-24 rounded-lg' />
          ))}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          <div className='lg:col-span-8 space-y-8'>
            <section>
              <Skeleton className='h-8 w-48 mb-6' />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className='h-28 rounded-lg' />
                ))}
              </div>
            </section>
          </div>
          <div className='lg:col-span-4'>
            <Skeleton className='h-64 rounded-lg' />
          </div>
        </div>
      </div>
    </div>
  )
}

function CertificateSkeleton({ count = 2 }) {
  return Array(count)
    .fill(0)
    .map((_, i) => <Skeleton key={i} className='h-24 rounded-lg' />)
}

function MedalSkeleton({ count = 3 }) {
  return Array(count)
    .fill(0)
    .map((_, i) => (
      <div key={i} className='p-4 border-b border-slate-50'>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-9 w-9 rounded-lg' />
          <div className='flex-1'>
            <Skeleton className='h-5 w-32 mb-1' />
            <Skeleton className='h-3 w-20' />
          </div>
        </div>
      </div>
    ))
}
