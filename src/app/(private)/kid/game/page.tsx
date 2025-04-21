'use client'

import { useAppStore } from '@/components/app-provider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Brain, Gamepad2, Trophy, Medal, Star } from 'lucide-react'
import Link from 'next/link'
import { PageBanner } from '@/components/shared/PageBanner'
import { useGetTopRanking } from '@/queries/useAccount'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { cn } from '@/lib/utils'

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
    benefits: [
      { icon: '🧠', text: 'Phát triển trí nhớ' },
      { icon: '👁️', text: 'Rèn tập trung' },
      { icon: '⏱️', text: 'Phản xạ nhanh' }
    ],
    link: '/kid/game/memory'
  },
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    description: 'Rèn luyện tư duy với cờ ca rô',
    icon: '⭕',
    level: 'Dễ',
    category: 'Chiến thuật',
    color: 'from-rose-100 via-pink-200 to-purple-200',
    benefits: [
      { icon: '🧩', text: 'Tư duy chiến thuật' },
      { icon: '🔄', text: 'Tính toán trước' },
      { icon: '🤔', text: 'Phân tích đối thủ' }
    ],
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
    benefits: [
      { icon: '🔢', text: 'Tính toán nhanh' },
      { icon: '📊', text: 'Giải quyết vấn đề' },
      { icon: '🎯', text: 'Tập trung cao' }
    ],
    link: '/kid/game/rocket'
  },
  {
    id: 'colorpattern',
    title: 'Mẫu Màu Sắc',
    description: 'Ghi nhớ và tái tạo các mẫu màu sắc xuất hiện',
    icon: '🎨',
    level: 'Dễ',
    category: 'Quan sát',
    color: 'from-red-100 via-rose-200 to-pink-200',
    benefits: [
      { icon: '👁️', text: 'Nhận biết màu sắc' },
      { icon: '🧠', text: 'Nhớ mẫu hình' },
      { icon: '⚡', text: 'Phản xạ nhanh' }
    ],
    link: '/kid/game/colorpattern'
  }
]

// Game Overview Component with Top 10 Ranking
const GameOverview = () => {
  const childProfile = useAppStore((state) => state.childProfile)
  const { data: topRankingData, isLoading: isLoadingRanking } = useGetTopRanking()
  const topRankings = topRankingData?.payload.data || []

  // // Dữ liệu giả cho bảng xếp hạng
  // const mockRankingData = [
  //   { userId: '1', username: 'Minh Anh', avatarUrl: 'https://i.pravatar.cc/150?img=32', gamePoints: 1250 },
  //   { userId: '2', username: 'Hải Nam', avatarUrl: 'https://i.pravatar.cc/150?img=52', gamePoints: 1180 },
  //   { userId: '3', username: 'Thu Hương', avatarUrl: 'https://i.pravatar.cc/150?img=48', gamePoints: 1050 },
  //   { userId: '4', username: 'Duy Khang', avatarUrl: 'https://i.pravatar.cc/150?img=41', gamePoints: 980 },
  //   { userId: '5', username: 'Thu Trang', avatarUrl: 'https://i.pravatar.cc/150?img=24', gamePoints: 915 },
  //   { userId: '6', username: 'Văn Minh', avatarUrl: 'https://i.pravatar.cc/150?img=54', gamePoints: 880 },
  //   { userId: '7', username: 'Nhật Minh', avatarUrl: 'https://i.pravatar.cc/150?img=60', gamePoints: 820 },
  //   { userId: '8', username: 'Khánh Linh', avatarUrl: 'https://i.pravatar.cc/150?img=34', gamePoints: 780 },
  //   { userId: '9', username: 'Anh Tú', avatarUrl: 'https://i.pravatar.cc/150?img=14', gamePoints: 720 },
  //   { userId: '10', username: 'Lan Anh', avatarUrl: 'https://i.pravatar.cc/150?img=25', gamePoints: 680 }
  // ]

  // // Nếu có id của user hiện tại, thêm vào danh sách để hiển thị highlight
  // if (childProfile?.id) {
  //   // Tìm xem user hiện tại đã có trong danh sách chưa
  //   const userExists = mockRankingData.some((player) => player.userId === childProfile.id)

  //   // Nếu chưa có, thêm vào ở vị trí thứ 5
  //   if (!userExists) {
  //     mockRankingData.splice(4, 0, {
  //       userId: childProfile.id,
  //       username: `${childProfile.firstName} ${childProfile.lastName}`.trim(),
  //       avatarUrl: childProfile.avatarUrl,
  //       gamePoints: 905
  //     })
  //   }
  // }

  // // Sử dụng dữ liệu giả nếu không có dữ liệu thật
  // const topRankings =
  //   topRankingData?.payload?.data && topRankingData.payload.data.length > 0
  //     ? topRankingData.payload.data
  //     : mockRankingData

  // Find current user's ranking - using userId from top rankings data
  const currentUserRanking = topRankings.findIndex((user) => user.userId === childProfile?.id) + 1
  const isInTopRanking = currentUserRanking > 0

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
          <Trophy className='w-6 h-6 text-white' />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-slate-800'>Bảng xếp hạng</h2>
          <p className='text-slate-600'>Top 10 người chơi có điểm cao nhất</p>
        </div>
      </div>

      {/* Ranking Table Card */}
      <Card className='overflow-hidden border-0 shadow-md'>
        {isLoadingRanking ? (
          <div className='p-8 space-y-6'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='flex items-center gap-4'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <Skeleton className='h-6 flex-1' />
                <Skeleton className='h-8 w-20' />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className='bg-gradient-to-br from-indigo-100 via-indigo-50 to-white px-6 py-5 flex items-center border-b border-indigo-100 sticky top-0 z-10 shadow-sm'>
              <div className='w-14 text-center'>
                <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 text-white font-semibold text-sm shadow-sm'>
                  #
                </span>
              </div>
              <div className='flex-1 font-semibold text-indigo-800 flex items-center gap-2'>
                <span>Người chơi</span>
                <Trophy className='h-4 w-4 text-indigo-400' />
              </div>
              <div className='w-28 text-right font-semibold text-indigo-800 flex items-center justify-end gap-1'>
                <Star className='h-4 w-4 text-indigo-400' />
                <span>Điểm số</span>
              </div>
            </div>

            <div className='divide-y divide-indigo-50'>
              {topRankings.slice(0, 10).map((player, index) => {
                const isCurrentUser = player.userId === childProfile?.id
                const rankColors = [
                  'bg-gradient-to-r from-amber-500 to-yellow-500 text-white', // 1st
                  'bg-gradient-to-r from-slate-400 to-slate-500 text-white', // 2nd
                  'bg-gradient-to-r from-amber-700 to-yellow-700 text-white' // 3rd
                ]

                return (
                  <motion.div
                    key={player.userId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      'px-6 py-5 flex items-center hover:bg-indigo-50/50 transition-colors',
                      isCurrentUser
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500'
                        : index < 3
                          ? `bg-gradient-to-r from-white to-indigo-50/30 ${index === 0 ? 'border-b border-amber-100' : ''}`
                          : index % 2 === 0
                            ? 'bg-white'
                            : 'bg-indigo-50/20'
                    )}
                  >
                    <div className='w-14 flex justify-center'>
                      {index < 3 ? (
                        <div
                          className={`w-9 h-9 flex items-center justify-center rounded-full ${rankColors[index]} font-bold shadow-md`}
                        >
                          {index + 1}
                        </div>
                      ) : (
                        <div className='w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-800 font-medium'>
                          {index + 1}
                        </div>
                      )}
                    </div>

                    <div className='flex-1 flex items-center gap-4'>
                      <div className='relative'>
                        {index < 3 && (
                          <div
                            className={`absolute -top-2 -right-2 z-10 p-1 rounded-full shadow-sm ${index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-slate-400' : 'bg-amber-700'}`}
                          >
                            {index === 0 ? (
                              <Trophy className='h-3 w-3 text-white' />
                            ) : (
                              <Medal className='h-3 w-3 text-white' />
                            )}
                          </div>
                        )}
                        <div
                          className={`w-12 h-12 rounded-full overflow-hidden ${index < 3 ? 'ring-2 ring-offset-2' : 'border-2 border-white'} ${index === 0 ? 'ring-amber-400' : index === 1 ? 'ring-slate-400' : index === 2 ? 'ring-amber-700' : ''} shadow-md`}
                        >
                          {player.avatarUrl ? (
                            <Image
                              src={player.avatarUrl}
                              alt={player.username || 'Player'}
                              width={48}
                              height={48}
                              className='w-full h-full object-cover'
                            />
                          ) : (
                            <div className='w-full h-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-lg font-semibold text-white'>
                              {(player.username || 'P')[0].toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className='font-medium text-slate-800 flex items-center gap-1.5'>
                          {player.username || 'Người chơi'}
                          {isCurrentUser && (
                            <span className='text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold'>
                              Bạn
                            </span>
                          )}
                        </div>
                        {index < 3 && (
                          <div className='text-xs text-slate-500 flex items-center gap-1 mt-0.5'>
                            {index === 0 ? 'Vô địch 👑' : index === 1 ? 'Á quân ✨' : 'Hạng ba 🏅'}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='w-28 text-right'>
                      <span
                        className={`text-lg font-bold ${index < 3 ? 'bg-clip-text text-transparent bg-gradient-to-r' : 'text-slate-700'} ${index === 0 ? 'from-amber-500 to-yellow-600' : index === 1 ? 'from-slate-500 to-slate-700' : index === 2 ? 'from-amber-700 to-amber-900' : ''}`}
                      >
                        {player.gamePoints.toLocaleString()}
                      </span>
                      <span className='text-xs text-slate-500 ml-1'>điểm</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {!isInTopRanking && childProfile && (
              <div className='px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-indigo-100'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md'>
                      {childProfile.avatarUrl ? (
                        <Image
                          src={childProfile.avatarUrl}
                          alt={`${childProfile.firstName || ''} ${childProfile.lastName || ''}`.trim()}
                          width={40}
                          height={40}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <div className='w-full h-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white'>
                          {(childProfile.firstName || 'U')[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className='font-medium text-slate-800'>
                        {`${childProfile.firstName || ''} ${childProfile.lastName || ''}`.trim()}
                        <span className='text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold ml-2'>
                          Bạn
                        </span>
                      </div>
                      <div className='text-sm text-slate-500'>Chưa có trong bảng xếp hạng</div>
                    </div>
                  </div>
                  <Button size='sm' className='bg-indigo-500 hover:bg-indigo-600'>
                    Chơi ngay
                  </Button>
                </div>
              </div>
            )}

            {topRankings.length === 0 && (
              <div className='py-16 px-6 text-center'>
                <div className='w-20 h-20 bg-indigo-100 flex items-center justify-center rounded-full mx-auto mb-4'>
                  <Trophy className='w-10 h-10 text-indigo-400' />
                </div>
                <h3 className='text-xl font-semibold text-slate-800 mb-2'>Chưa có dữ liệu xếp hạng</h3>
                <p className='text-slate-500 max-w-md mx-auto mb-6'>
                  Hãy là người đầu tiên tham gia bảng xếp hạng bằng cách chơi các trò chơi và tích lũy điểm
                </p>
                <Button className='bg-indigo-500 hover:bg-indigo-600'>Khám phá trò chơi</Button>
              </div>
            )}
          </div>
        )}
      </Card>
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
                        <div className='space-y-2 mb-4'>
                          {game.benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className='flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors'
                            >
                              <div className='text-lg'>{benefit.icon}</div>
                              <div className='text-sm font-medium text-slate-700'>{benefit.text}</div>
                            </div>
                          ))}
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
