'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Trophy, Star, Target, Brain, Timer, Book, Gamepad, Zap, Award, Crown, Shield, Medal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageBanner } from '@/components/shared/PageBanner'

const achievements = [
  {
    id: 1,
    title: 'Nhà Vô Địch Trí Nhớ',
    description: 'Hoàn thành 10 vòng Memory Game với độ chính xác trên 90%',
    icon: Brain,
    progress: 80,
    total: 10,
    current: 8,
    color: 'blue'
  },
  {
    id: 2,
    title: 'Bậc Thầy Cờ Vua',
    description: 'Chiến thắng AI trong Tic Tac Toe 20 lần',
    icon: Trophy,
    progress: 65,
    total: 20,
    current: 13,
    color: 'purple'
  },
  {
    id: 3,
    title: 'Phi Công Tài Ba',
    description: 'Đạt điểm cao trên 1000 trong Rocket Game',
    icon: Target,
    progress: 100,
    total: 1000,
    current: 1250,
    color: 'amber'
  },
  {
    id: 4,
    title: 'Nhà Thông Thái',
    description: 'Hoàn thành 50 câu hỏi Quiz với độ chính xác trên 80%',
    icon: Book,
    progress: 40,
    total: 50,
    current: 20,
    color: 'emerald'
  }
]

const stats = [
  {
    title: 'Tổng điểm',
    value: '2,584',
    icon: Star,
    color: 'amber'
  },
  {
    title: 'Thành tựu đã mở khóa',
    value: '8/20',
    icon: Trophy,
    color: 'purple'
  },
  {
    title: 'Thời gian học tập',
    value: '45h',
    icon: Timer,
    color: 'blue'
  },
  {
    title: 'Trò chơi đã chơi',
    value: '124',
    icon: Gamepad,
    color: 'emerald'
  }
]

const medals = [
  {
    title: 'Vô Địch Memory',
    date: '20/03/2024',
    icon: Crown,
    color: 'amber'
  },
  {
    title: 'Chuyên Gia Quiz',
    date: '15/03/2024',
    icon: Award,
    color: 'blue'
  },
  {
    title: 'Siêu Sao Rocket',
    date: '10/03/2024',
    icon: Zap,
    color: 'purple'
  }
]

const certificates = [
  {
    id: 1,
    title: 'Chứng Nhận Xuất Sắc',
    description: 'Hoàn thành 100 câu hỏi Quiz với độ chính xác trên 90%',
    issueDate: '15/03/2024',
    type: 'Quiz Master',
    image: '/certificates/quiz-master.png',
    color: 'amber'
  },
  {
    id: 2,
    title: 'Chứng Chỉ Memory Expert',
    description: 'Đạt thành tích 20 vòng Memory Game liên tiếp',
    issueDate: '10/03/2024',
    type: 'Memory Expert',
    image: '/certificates/memory-expert.png',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Bằng Cao Thủ Game',
    description: 'Đạt điểm cao nhất trong tất cả các trò chơi',
    issueDate: '05/03/2024',
    type: 'Game Master',
    image: '/certificates/game-master.png',
    color: 'purple'
  }
]

export default function AchievementPage() {
  return (
    <div className='py-8'>
      <PageBanner
        icon={Trophy}
        badge='Thành tích của bạn'
        title='Hành trình chinh phục'
        highlightText='Những thành tựu mới'
        description='Theo dõi và đạt được những thành tích ấn tượng trong quá trình học tập'
        gradient={{
          background: 'from-yellow-100 via-amber-100 to-orange-100',
          blur1: 'bg-yellow-200/50',
          blur2: 'bg-orange-200/50'
        }}
      />
      {/* Header Section */}
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
            {/* Current Achievements */}
            <section>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-slate-800'>Thành Tựu Đang Thực Hiện</h2>
                <Button variant='ghost' size='sm' className='text-slate-600 hover:text-slate-900'>
                  Xem tất cả
                </Button>
              </div>
              <div className='grid gap-4'>
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <Card
                      key={achievement.id}
                      className='group border-none bg-white/60 backdrop-blur hover:bg-white/80 transition-all'
                    >
                      <div className='p-6'>
                        <div className='flex items-start gap-4 mb-4'>
                          <div
                            className={`p-3 rounded-xl bg-${achievement.color}-50 
                              group-hover:scale-110 transition-transform`}
                          >
                            <Icon className={`w-6 h-6 text-${achievement.color}-400`} />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <h3 className='font-medium text-slate-800 mb-1'>{achievement.title}</h3>
                            <p className='text-sm text-slate-500 truncate'>{achievement.description}</p>
                          </div>
                          <div className='flex flex-col items-end'>
                            <div className={`text-lg font-medium text-${achievement.color}-500`}>
                              {achievement.current}/{achievement.total}
                            </div>
                            <div className='text-xs text-slate-400'>{achievement.progress}% hoàn thành</div>
                          </div>
                        </div>
                        <Progress value={achievement.progress} className={`h-1.5 bg-${achievement.color}-100`} />
                      </div>
                    </Card>
                  )
                })}
              </div>
            </section>

            {/* Certificates */}
            <section>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-slate-800'>Chứng Chỉ & Bằng Cấp</h2>
                <Button variant='ghost' size='sm' className='text-slate-600 hover:text-slate-900'>
                  Xem tất cả
                </Button>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {certificates.map((cert) => (
                  <Card
                    key={cert.id}
                    className='group border-none bg-white/60 backdrop-blur hover:bg-white/80 transition-all'
                  >
                    <div className='p-5'>
                      <div className='flex items-start gap-4'>
                        <div
                          className={`w-16 h-16 rounded-2xl bg-${cert.color}-50 
                            flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <Award className={`w-8 h-8 text-${cert.color}-400`} />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-1'>
                            <h3 className='font-medium text-slate-800 truncate'>{cert.title}</h3>
                            <Shield className='w-4 h-4 text-emerald-400 flex-shrink-0' />
                          </div>
                          <p className='text-sm text-slate-500 mb-2'>{cert.type}</p>
                          <div className='text-xs text-slate-400'>Cấp ngày: {cert.issueDate}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-4 space-y-6'>
            {/* Recent Medals */}
            <Card className='border-none bg-white/60 backdrop-blur'>
              <div className='p-5 border-b border-slate-100'>
                <h3 className='font-medium text-slate-800 flex items-center gap-2'>
                  <Medal className='w-5 h-5 text-amber-400' />
                  Huy Chương Gần Đây
                </h3>
              </div>
              <div>
                {medals.map((medal, index) => {
                  const Icon = medal.icon
                  return (
                    <div key={index} className='p-4 border-b border-slate-50 last:border-none hover:bg-slate-50/50'>
                      <div className='flex items-center gap-3'>
                        <div className={`p-2 rounded-lg bg-${medal.color}-50`}>
                          <Icon className={`w-5 h-5 text-${medal.color}-400`} />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='font-medium text-slate-700 truncate'>{medal.title}</div>
                          <div className='text-xs text-slate-400'>{medal.date}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
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
                <div className='text-3xl font-bold text-slate-800 mb-1'>1,234</div>
                <div className='text-sm text-slate-500'>Tổng điểm thành tích</div>
              </div>
              <div className='grid grid-cols-2 gap-4 text-center'>
                <div className='p-4 rounded-lg bg-slate-50'>
                  <div className='text-xl font-bold text-slate-700'>20</div>
                  <div className='text-sm text-slate-500'>Tổng thành tựu</div>
                </div>
                <div className='p-4 rounded-lg bg-slate-50'>
                  <div className='text-xl font-bold text-slate-700'>8</div>
                  <div className='text-sm text-slate-500'>Đã mở khóa</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
