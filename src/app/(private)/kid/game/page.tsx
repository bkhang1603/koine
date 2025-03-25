'use client'

import { useAppStore } from '@/components/app-provider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import { Brain, Target, Gamepad2, Trophy, Crown, Star, Medal } from 'lucide-react'
import Link from 'next/link'
import { PageBanner } from '@/components/shared/PageBanner'

// Game data
const games = [
  {
    id: 'memory',
    title: 'Memory Game',
    description: 'Rèn luyện trí nhớ với trò chơi lật thẻ',
    icon: '🧩',
    level: 'Dễ',
    category: 'Trí nhớ',
    color: 'from-sky-100 via-blue-200 to-indigo-200',
    stats: {
      highScore: 850,
      gamesPlayed: 12,
      accuracy: '85%'
    },
    link: '/kid/game/memory'
  },
  {
    id: 'quiz',
    title: 'Quiz Challenge',
    description: 'Thử thách kiến thức với câu đố thú vị',
    icon: '🎯',
    level: 'Trung bình',
    category: 'Kiến thức',
    color: 'from-emerald-100 via-green-200 to-teal-200',
    stats: {
      highScore: 920,
      gamesPlayed: 8,
      accuracy: '92%'
    },
    link: '/kid/game/quiz'
  },
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    description: 'Rèn luyện tư duy với cờ ca rô',
    icon: '⭕',
    level: 'Dễ',
    category: 'Chiến thuật',
    color: 'from-rose-100 via-pink-200 to-purple-200',
    stats: {
      highScore: 750,
      gamesPlayed: 15,
      accuracy: '78%'
    },
    link: '/kid/game/tictactoe'
  },
  {
    id: 'rocket',
    title: 'Space Adventure',
    description: 'Khám phá không gian với tên lửa toán học',
    icon: '🚀',
    level: 'Khó',
    category: 'Toán học',
    color: 'from-amber-100 via-orange-200 to-red-200',
    stats: {
      highScore: 680,
      gamesPlayed: 6,
      accuracy: '72%'
    },
    link: '/kid/game/rocket'
  }
]

// Game Overview Component
const GameOverview = () => {
  const childProfile = useAppStore((state) => state.childProfile)
  const totalGamesPlayed = games.reduce((acc, game) => acc + game.stats.gamesPlayed, 0)
  const averageAccuracy = Math.round(games.reduce((acc, game) => acc + parseInt(game.stats.accuracy), 0) / games.length)
  const totalPoints = childProfile?.totalPoints || 0
  const weeklyGames = 15 // Số game chơi trong tuần
  const weeklyGoal = 20 // Mục tiêu số game trong tuần

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className='mb-8'
    >
      {/* Header */}
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center'>
          <Gamepad2 className='w-6 h-6 text-white' />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-slate-800'>Tổng quan trò chơi</h2>
          <p className='text-slate-600'>Theo dõi thành tích chơi game của bạn</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        <Card className='p-4 bg-gradient-to-br from-purple-50 to-indigo-50'>
          <div className='flex items-start gap-3'>
            <div className='p-2 rounded-lg bg-purple-100'>
              <Gamepad2 className='w-5 h-5 text-purple-600' />
            </div>
            <div>
              <div className='text-2xl font-bold text-slate-800'>{totalGamesPlayed}</div>
              <div className='text-sm text-slate-600'>Số game đã chơi</div>
            </div>
          </div>
        </Card>

        <Card className='p-4 bg-gradient-to-br from-emerald-50 to-green-50'>
          <div className='flex items-start gap-3'>
            <div className='p-2 rounded-lg bg-emerald-100'>
              <Target className='w-5 h-5 text-emerald-600' />
            </div>
            <div>
              <div className='text-2xl font-bold text-slate-800'>{averageAccuracy}%</div>
              <div className='text-sm text-slate-600'>Độ chính xác</div>
            </div>
          </div>
        </Card>

        <Card className='p-4 bg-gradient-to-br from-amber-50 to-orange-50'>
          <div className='flex items-start gap-3'>
            <div className='p-2 rounded-lg bg-amber-100'>
              <Trophy className='w-5 h-5 text-amber-600' />
            </div>
            <div>
              <div className='text-2xl font-bold text-slate-800'>{totalPoints}</div>
              <div className='text-sm text-slate-600'>Tổng điểm</div>
            </div>
          </div>
        </Card>

        <Card className='p-4 bg-gradient-to-br from-blue-50 to-sky-50'>
          <div className='flex items-start gap-3'>
            <div className='p-2 rounded-lg bg-blue-100'>
              <Medal className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <div className='text-2xl font-bold text-slate-800'>3</div>
              <div className='text-sm text-slate-600'>Huy hiệu đạt được</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card className='p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <Crown className='w-5 h-5 text-purple-500' />
              <h3 className='font-semibold text-slate-800'>Mục tiêu tuần</h3>
            </div>
            <div className='text-2xl font-bold text-purple-500'>{weeklyGames} games</div>
          </div>
          <p className='text-sm text-slate-600 mb-3'>Hoàn thành mục tiêu để nhận thưởng</p>
          <Progress value={(weeklyGames / weeklyGoal) * 100} className='h-2' />
          <div className='mt-2 text-xs text-slate-500 text-right'>
            {weeklyGames}/{weeklyGoal} games
          </div>
        </Card>

        <Card className='p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <Star className='w-5 h-5 text-amber-500' />
              <h3 className='font-semibold text-slate-800'>Xếp hạng</h3>
            </div>
            <div className='text-2xl font-bold text-amber-500'>#12</div>
          </div>
          <p className='text-sm text-slate-600 mb-3'>Top người chơi trong tuần</p>
          <Progress value={80} className='h-2' />
          <div className='mt-2 text-xs text-slate-500 text-right'>Top 20%</div>
        </Card>
      </div>
    </motion.section>
  )
}

function KidGamePage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <PageBanner
        icon={Gamepad2}
        badge='Khu vực giải trí'
        title='Học tập qua'
        highlightText='Trò chơi thú vị'
        description='Khám phá các trò chơi giáo dục vừa học vừa chơi'
        gradient={{
          background: 'from-purple-100 via-pink-100 to-red-100',
          blur1: 'bg-purple-200/50',
          blur2: 'bg-red-200/50'
        }}
      />
      {/* Game Overview */}
      <GameOverview />

      <div className='min-h-screen'>
        {/* Background effect */}
        <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
          <div className='absolute top-0 -left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
          <div className='absolute top-0 -right-10 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
          <div className='absolute -bottom-8 left-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
        </div>

        {/* Game Grid */}
        <section className='mb-12'>
          <div className='flex items-center mb-6'>
            <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center shadow-lg'>
              <Brain className='h-6 w-6 text-white' />
            </div>
            <h2 className='text-2xl font-bold ml-4 text-slate-800'>Khu vực trò chơi</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {games.map((game) => (
              <Link href={game.link} key={game.id}>
                <Card className='group h-full hover:shadow-lg transition-all duration-300'>
                  <div className='flex flex-col h-full'>
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${game.color} p-4 rounded-t-lg`}>
                      <div className='flex items-center justify-between'>
                        <div className='bg-white/30 p-2 rounded-lg backdrop-blur-sm'>
                          <span className='text-2xl'>{game.icon}</span>
                        </div>
                        <span className='bg-white/30 text-slate-700 text-xs px-3 py-1 rounded-full backdrop-blur-sm'>
                          {game.level}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='p-4 flex-1 flex flex-col'>
                      <div className='mb-4'>
                        <h3 className='font-semibold text-slate-800 mb-1'>{game.title}</h3>
                        <p className='text-sm text-slate-500 line-clamp-2'>{game.description}</p>
                      </div>

                      <div className='mt-auto'>
                        <div className='grid grid-cols-3 gap-2 mb-4'>
                          <div className='bg-slate-50 p-2 rounded-lg text-center'>
                            <div className='text-sm font-semibold text-slate-700'>{game.stats.highScore}</div>
                            <div className='text-xs text-slate-500'>Điểm cao</div>
                          </div>
                          <div className='bg-slate-50 p-2 rounded-lg text-center'>
                            <div className='text-sm font-semibold text-slate-700'>{game.stats.gamesPlayed}</div>
                            <div className='text-xs text-slate-500'>Đã chơi</div>
                          </div>
                          <div className='bg-slate-50 p-2 rounded-lg text-center'>
                            <div className='text-sm font-semibold text-slate-700'>{game.stats.accuracy}</div>
                            <div className='text-xs text-slate-500'>Chính xác</div>
                          </div>
                        </div>

                        <Button className='w-full bg-slate-100 hover:bg-slate-200 text-slate-700'>Chơi ngay</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default KidGamePage
