'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Medal, Star, Trophy, Crown, Target, Zap, Gift, ArrowRight } from 'lucide-react'

interface AchievementCardProps {
  title: string
  description: string
  progress: number
  reward: string
  color: string
  icon: React.ReactNode
  isLocked?: boolean
}

const AchievementCard = ({ title, description, progress, reward, color, icon, isLocked }: AchievementCardProps) => (
  <Card className={`group h-full ${isLocked ? 'opacity-90' : ''}`}>
    <div className='flex flex-col h-full'>
      {/* Header */}
      <div className={`${color} p-4 rounded-t-lg`}>
        <div className='flex items-center justify-between'>
          <div className='bg-white/30 p-2 rounded-lg backdrop-blur-sm'>{icon}</div>
          {isLocked ? (
            <span className='bg-white/30 text-slate-700 text-xs px-2 py-1 rounded-full backdrop-blur-sm'>Khóa</span>
          ) : progress === 100 ? (
            <Trophy className='w-5 h-5 text-slate-700' />
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className='p-4 flex-1 flex flex-col'>
        <div className='mb-4'>
          <h3 className='font-semibold text-slate-800 mb-1'>{title}</h3>
          <p className='text-sm text-slate-500 line-clamp-2'>{description}</p>
        </div>

        <div className='mt-auto space-y-4'>
          {/* Progress */}
          <div>
            <div className='flex justify-between text-sm mb-2'>
              <span className='text-slate-600'>Tiến độ</span>
              <span className='font-medium'>{progress}%</span>
            </div>
            <Progress value={progress} className='h-1.5' />
          </div>

          {/* Reward */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Gift className='w-4 h-4 text-amber-500' />
              <span className='text-sm text-slate-600'>{reward}</span>
            </div>
            <div className='h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors'>
              <ArrowRight className='w-4 h-4 text-slate-600' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
)

export const AchievementSection = () => {
  const achievements = [
    {
      title: 'Nhà thám hiểm',
      description: 'Hoàn thành 5 khóa học trong tuần này',
      progress: 100,
      reward: '500 điểm',
      color: 'bg-gradient-to-r from-sky-100 via-blue-200 to-indigo-200',
      icon: <Star className='w-5 h-5 text-blue-500' />
    },
    {
      title: 'Chiến binh bền bỉ',
      description: 'Duy trì chuỗi học tập 7 ngày',
      progress: 85,
      reward: 'Nhân vật mới',
      color: 'bg-gradient-to-r from-fuchsia-100 via-purple-200 to-pink-200',
      icon: <Crown className='w-5 h-5 text-purple-500' />
    },
    {
      title: 'Thiên tài toán học',
      description: 'Đạt điểm tuyệt đối 3 bài kiểm tra',
      progress: 33,
      reward: '1000 điểm',
      color: 'bg-gradient-to-r from-rose-100 via-amber-200 to-orange-200',
      icon: <Trophy className='w-5 h-5 text-amber-500' />,
      isLocked: true
    },
    {
      title: 'Siêu sao sáng tạo',
      description: 'Hoàn thành 3 dự án cá nhân',
      progress: 45,
      reward: 'Khóa học VIP',
      color: 'bg-gradient-to-r from-teal-100 via-emerald-200 to-green-200',
      icon: <Zap className='w-5 h-5 text-emerald-500' />
    }
  ]

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className='mb-12'
    >
      {/* Header */}
      <div className='bg-gradient-to-br from-rose-100 via-amber-200 to-orange-200 rounded-2xl p-6 mb-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <div className='w-14 h-14 bg-gradient-to-br from-amber-50 to-white rounded-xl flex items-center justify-center'>
                <Medal className='w-7 h-7 text-amber-500' />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className='absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center'
              >
                <span className='text-sm font-bold text-amber-500'>4</span>
              </motion.div>
            </div>
            <div>
              <h2 className='text-2xl font-bold text-slate-800'>Thành tích</h2>
              <p className='text-slate-600'>Hoàn thành thử thách nhận thưởng</p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div className='bg-gradient-to-r from-amber-50 to-white px-4 py-2 rounded-xl'>
              <div className='flex items-center gap-2'>
                <Target className='w-4 h-4 text-amber-500' />
                <span className='text-sm font-medium text-slate-700'>2000 điểm</span>
              </div>
              <div className='text-xs text-slate-600'>Cấp độ tiếp theo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            className='h-full'
          >
            <AchievementCard {...achievement} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
