'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Brain, Target, Rocket, Book, Trophy } from 'lucide-react'
import Link from 'next/link'

type PathCardProps = {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  href: string
  stats?: {
    label: string
    value: string | number
  }[]
}

const PathCard = ({ icon, title, description, color, href, stats }: PathCardProps) => (
  <Link href={href}>
    <Card className='group relative overflow-hidden border-0 hover:shadow-lg transition-all duration-300'>
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />

      <div className='p-6 relative'>
        {/* Header */}
        <div className='flex items-start gap-4 mb-4'>
          <div className={`${color} bg-opacity-10 p-3 rounded-xl`}>{icon}</div>
          <div>
            <h3 className='font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors'>{title}</h3>
            <p className='text-slate-600 text-sm'>{description}</p>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className='grid grid-cols-2 gap-4 mt-6'>
            {stats.map((stat, index) => (
              <div key={index} className='bg-slate-50 rounded-lg p-3'>
                <div className='text-lg font-semibold text-slate-700'>{stat.value}</div>
                <div className='text-xs text-slate-500'>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  </Link>
)

export const LearningPathSection = () => {
  const paths = [
    {
      icon: <Brain className='w-6 h-6 text-blue-500' />,
      title: 'Luyện tập kỹ năng',
      description: 'Rèn luyện và phát triển các kỹ năng cần thiết',
      color: 'bg-blue-500',
      href: '/kid/skills',
      stats: [
        { label: 'Kỹ năng', value: '12' },
        { label: 'Hoàn thành', value: '45%' }
      ]
    },
    {
      icon: <Target className='w-6 h-6 text-emerald-500' />,
      title: 'Thử thách hàng ngày',
      description: 'Hoàn thành các thử thách để nhận phần thưởng',
      color: 'bg-emerald-500',
      href: '/kid/challenges',
      stats: [
        { label: 'Thử thách', value: '3' },
        { label: 'Phần thưởng', value: '150' }
      ]
    },
    {
      icon: <Rocket className='w-6 h-6 text-purple-500' />,
      title: 'Dự án sáng tạo',
      description: 'Thực hiện các dự án thú vị và bổ ích',
      color: 'bg-purple-500',
      href: '/kid/projects',
      stats: [
        { label: 'Dự án', value: '5' },
        { label: 'Đã hoàn thành', value: '2' }
      ]
    },
    {
      icon: <Trophy className='w-6 h-6 text-amber-500' />,
      title: 'Bảng xếp hạng',
      description: 'Thi đua cùng bạn bè trên bảng xếp hạng',
      color: 'bg-amber-500',
      href: '/kid/leaderboard',
      stats: [
        { label: 'Hạng', value: '#12' },
        { label: 'Điểm số', value: '850' }
      ]
    }
  ]

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className='mb-12'
    >
      {/* Section Header */}
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg'>
          <Book className='w-6 h-6 text-white' />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-slate-800'>Lộ trình học tập</h2>
          <p className='text-slate-600'>Khám phá và phát triển bản thân</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {paths.map((path, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 * index }}
          >
            <PathCard {...path} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
