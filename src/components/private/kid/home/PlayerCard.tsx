'use client'

import { motion } from 'framer-motion'
import { Star, Crown, BookOpen, Sparkles, Target } from 'lucide-react'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import images from '@/assets/images'
import { Badge } from './Badge'
import { ActionButton } from './ActionButton'
import { formatLevelForKid } from '@/lib/utils'

interface PlayerCardProps {
  playerName: string
  loading: boolean
  childProfile: any
  totalPoints: number
}

export const PlayerCard = ({ playerName, loading, childProfile, totalPoints }: PlayerCardProps) => (
  <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='relative mb-8'>
    {/* Decorative Elements */}
    <div className='absolute -top-10 -right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl' />
    <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl' />

    <div className='relative bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden shadow-lg border border-blue-100/30'>
      {/* Main Content */}
      <div className='p-8 md:p-10'>
        <div className='flex flex-col md:flex-row items-center gap-8'>
          {/* Left Section: Avatar & Level */}
          <div className='relative'>
            {loading ? (
              <div className='w-28 h-28 md:w-32 md:h-32 rounded-full bg-blue-100/50 flex items-center justify-center'>
                <Skeleton className='w-[90%] h-[90%] rounded-full' />
              </div>
            ) : (
              <div className='relative'>
                <div className='w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-1'>
                  <div className='w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner'>
                    <Image
                      src={childProfile?.avatarUrl || images.avatar}
                      alt='Avatar'
                      width={128}
                      height={128}
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>
                {/* Level Badge */}
                <div className='absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center gap-1'>
                  <Sparkles className='w-4 h-4' />
                  <span>Cấp {childProfile?.level || 1}</span>
                </div>
              </div>
            )}
          </div>

          {/* Middle Section: Player Info */}
          <div className='flex-1 text-center md:text-left'>
            <div className='space-y-2 mb-4'>
              <h1 className='text-2xl md:text-3xl font-bold text-slate-800'>Xin chào, {playerName}!</h1>
              <p className='text-slate-600 flex items-center gap-2 justify-center md:justify-start'>
                <Target className='w-4 h-4 text-blue-500' />
                <span>{formatLevelForKid(childProfile?.level || 1)}</span>
              </p>
            </div>

            {/* Progress Info */}
            <div className='flex flex-wrap gap-6 justify-center md:justify-start'>
              <div className='flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full'>
                <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
                  <Star className='w-4 h-4 text-blue-600' />
                </div>
                <span className='text-sm font-medium text-blue-700'>{totalPoints} điểm</span>
              </div>
              {/* <div className='flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full'>
                <div className='w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center'>
                  <Crown className='w-4 h-4 text-purple-600' />
                </div>
                <span className='text-sm font-medium text-purple-700'>{childProfile?.streak || 0} ngày liên tiếp</span>
              </div> */}
            </div>
          </div>

          {/* Right Section: Stats */}
          {loading ? (
            <div className='hidden md:grid grid-cols-3 gap-3'>
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className='w-[100px] h-[100px] rounded-xl' />
              ))}
            </div>
          ) : (
            <div className='hidden md:grid grid-cols-3 gap-3 shrink-0'>
              <Badge
                icon={<BookOpen className='h-5 w-5' />}
                value={childProfile?.totalCourses || 0}
                label='Khóa học'
                color='bg-gradient-to-br from-blue-500 to-indigo-500'
              />
              <Badge
                icon={<Target className='h-5 w-5' />}
                value={childProfile?.completedCourses || 0}
                label='Hoàn thành'
                color='bg-gradient-to-br from-green-500 to-emerald-500'
              />
              <Badge
                icon={<Star className='h-5 w-5' />}
                value={childProfile?.achievements || 0}
                label='Thành tích'
                color='bg-gradient-to-br from-amber-500 to-orange-500'
              />
            </div>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className='bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-t border-blue-100/20 backdrop-blur-sm'>
        <div className='px-6 py-4 flex items-center'>
          <div className='flex items-center gap-2 md:gap-4'>
            <ActionButton href='/kid/course' label='Khóa học' icon={<BookOpen className='w-4 h-4' />} />
            <ActionButton href='/kid/knowledge' label='Kiến thức' icon={<Target className='w-4 h-4' />} />
            <ActionButton href='/kid/game' label='Trò chơi' icon={<Crown className='w-4 h-4' />} />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)
