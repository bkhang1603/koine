'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Brain, Timer, Trophy, Star, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePlusGamePointMutation } from '@/queries/useAccount'
import { toast } from '@/components/ui/use-toast'

// Định nghĩa kiểu cho thẻ bài
type Card = {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

// Mảng emoji cho thẻ bài
const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [moves, setMoves] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [bestTime, setBestTime] = useState<number | null>(null)
  const [bestScore, setBestScore] = useState(0)
  const [round, setRound] = useState(1)
  const [gameCompleted, setGameCompleted] = useState(false)

  const plusGamePointMutation = usePlusGamePointMutation()

  // Khởi tạo game
  const initializeGame = () => {
    const cardValues = [...emojis, ...emojis]
    const shuffledCards = cardValues
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }))

    setCards(shuffledCards)
    setFlippedCards([])
    setMatches(0)
    setMoves(0)
    setTimer(0)
    setIsPlaying(true)
    setGameCompleted(false)
  }

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && matches < emojis.length) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, matches])

  // Xử lý khi click vào thẻ
  const handleCardClick = (id: number) => {
    if (!isPlaying || flippedCards.length === 2 || cards[id].isMatched || cards[id].isFlipped) return

    const newCards = [...cards]
    newCards[id].isFlipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1)
      const [firstId, secondId] = newFlippedCards

      if (cards[firstId].value === cards[secondId].value) {
        newCards[firstId].isMatched = true
        newCards[secondId].isMatched = true
        setCards(newCards)
        setMatches((prev) => prev + 1)
        setFlippedCards([])

        // Kiểm tra kết thúc game
        if (matches + 1 === emojis.length) {
          handleGameComplete()
        }
      } else {
        setTimeout(() => {
          newCards[firstId].isFlipped = false
          newCards[secondId].isFlipped = false
          setCards(newCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // Xử lý khi hoàn thành game
  const handleGameComplete = () => {
    setIsPlaying(false)
    setGameCompleted(true)
    const score = calculateScore()

    if (score > bestScore) {
      setBestScore(score)
    }

    if (!bestTime || timer < bestTime) {
      setBestTime(timer)
    }

    setRound((prev) => prev + 1)

    // Cập nhật điểm vào hệ thống
    plusGamePointMutation.mutate(
      { point: score },
      {
        onSuccess: () => {
          toast({
            title: 'Cập nhật điểm thành công',
            description: `Bạn đã nhận được ${score} điểm!`
          })
        },
        onError: () => {
          toast({
            title: 'Không thể cập nhật điểm',
            description: 'Đã xảy ra lỗi khi cập nhật điểm',
            variant: 'destructive'
          })
        }
      }
    )
  }

  // Tính điểm - giảm điểm để phù hợp với hệ thống level
  const calculateScore = () => {
    // Điểm cơ bản thấp hơn (từ 250 xuống 100)
    const baseScore = 100

    // Tính toán độ chính xác (%)
    const accuracy = moves > 0 ? (matches * 2 * 100) / moves : 0

    // Bonus cho độ chính xác (giảm xuống)
    const accuracyBonus = Math.round(accuracy / 4)

    // Điểm thưởng nếu hoàn thành nhanh (giảm xuống)
    const timeBonus = timer < 60 ? 20 : timer < 90 ? 10 : 0

    // Tăng điểm trừ theo thời gian
    const timePenalty = Math.round(timer / 3)

    // Kết hợp và đảm bảo điểm không âm
    const finalScore = Math.max(5, Math.round(baseScore * (accuracy / 100) - timePenalty + accuracyBonus + timeBonus))

    // Giới hạn điểm tối đa là 100
    return Math.min(100, finalScore)
  }

  // Format thời gian
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Khởi tạo game khi component mount
  useEffect(() => {
    initializeGame()
  }, [])

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Game Header */}
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center'>
            <Brain className='w-6 h-6 text-white' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-slate-800'>Memory Game</h2>
            <p className='text-slate-600'>Rèn luyện trí nhớ với trò chơi lật thẻ</p>
          </div>
        </div>

        <Link href='/kid/game'>
          <Button variant='ghost' className='text-slate-600 hover:text-blue-600'>
            <ArrowLeft className='h-5 w-5 mr-2' />
            Quay lại
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Game Area */}
        <div className='lg:col-span-3 space-y-6'>
          {/* Game Stats */}
          <div className='grid grid-cols-3 gap-4'>
            <Card className='p-4 bg-gradient-to-br from-blue-50 to-indigo-50'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-lg bg-blue-100'>
                  <Trophy className='w-5 h-5 text-blue-600' />
                </div>
                <div>
                  <div className='text-2xl font-bold text-slate-800'>{bestScore}</div>
                  <div className='text-sm text-slate-600'>Điểm cao nhất</div>
                </div>
              </div>
            </Card>

            <Card className='p-4 bg-gradient-to-br from-amber-50 to-orange-50'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-lg bg-amber-100'>
                  <Timer className='w-5 h-5 text-amber-600' />
                </div>
                <div>
                  <div className='text-2xl font-bold text-slate-800'>{bestTime ? formatTime(bestTime) : '00:00'}</div>
                  <div className='text-sm text-slate-600'>Thời gian tốt nhất</div>
                </div>
              </div>
            </Card>

            <Card className='p-4 bg-gradient-to-br from-emerald-50 to-green-50'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-lg bg-emerald-100'>
                  <Star className='w-5 h-5 text-emerald-600' />
                </div>
                <div>
                  <div className='text-2xl font-bold text-slate-800'>
                    {moves > 0 ? Math.round((matches * 2 * 100) / moves) : 0}%
                  </div>
                  <div className='text-sm text-slate-600'>Tỷ lệ chính xác</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Game Board */}
          <Card className='border-0 shadow-md overflow-hidden'>
            <div className='bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <Brain className='h-5 w-5' />
                  <h2 className='font-bold'>Vòng {round}</h2>
                </div>
                <div className='flex items-center gap-2'>
                  <Timer className='h-4 w-4' />
                  <span>{formatTime(timer)}</span>
                </div>
              </div>
              <Progress value={(matches / emojis.length) * 100} className='h-2 mt-4 bg-white/20' />
            </div>

            <div className='p-6'>
              <div className='grid grid-cols-4 gap-4'>
                {cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`
                      aspect-square rounded-lg cursor-pointer
                      flex items-center justify-center text-4xl
                      transition-all duration-300
                      ${
                        card.isFlipped || card.isMatched
                          ? 'bg-white border-2 border-blue-300'
                          : 'bg-gradient-to-br from-indigo-100 to-blue-100'
                      }
                      ${card.isMatched ? 'border-green-500' : ''}
                      hover:shadow-md
                    `}
                  >
                    {(card.isFlipped || card.isMatched) && card.value}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Game Info & Controls */}
        <div className='space-y-6'>
          {/* Current Game Info */}
          <Card className='border-0 shadow-md overflow-hidden'>
            <div className='bg-gradient-to-r from-slate-700 to-slate-800 p-4 text-white'>
              <h2 className='font-bold flex items-center'>
                <Trophy className='h-5 w-5 mr-2' />
                Thông tin trận đấu
              </h2>
            </div>

            <div className='p-6 space-y-6'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-blue-600 mb-1'>{calculateScore()}</div>
                <div className='text-sm text-slate-600'>Điểm hiện tại</div>
              </div>

              <div>
                <div className='flex justify-between mb-1 text-sm'>
                  <span className='text-slate-600'>Cặp thẻ đã tìm thấy</span>
                  <span className='font-medium text-blue-600'>
                    {matches}/{emojis.length}
                  </span>
                </div>
                <Progress value={(matches / emojis.length) * 100} className='h-2' />
              </div>

              <div>
                <div className='flex justify-between mb-1 text-sm'>
                  <span className='text-slate-600'>Độ chính xác</span>
                  <span className='font-medium text-blue-600'>
                    {moves > 0 ? Math.round((matches * 2 * 100) / moves) : 0}%
                  </span>
                </div>
                <Progress value={moves > 0 ? (matches * 2 * 100) / moves : 0} className='h-2' />
              </div>

              {gameCompleted && (
                <div className='p-3 bg-blue-50 rounded-lg border border-blue-100 text-center'>
                  <p className='text-blue-600 font-medium'>Hoàn thành! Bạn đã nhận được {calculateScore()} điểm</p>
                </div>
              )}
            </div>
          </Card>

          {/* Game Controls */}
          <Card className='p-6 border-0 shadow-md'>
            <div className='space-y-3'>
              <Button onClick={() => initializeGame()} className='w-full bg-blue-500 hover:bg-blue-600 text-white'>
                Bắt đầu mới
              </Button>
              <Button onClick={() => initializeGame()} variant='outline' className='w-full'>
                Chơi lại vòng này
              </Button>
            </div>
          </Card>

          {/* Game Rules */}
          <Card className='border-0 shadow-md overflow-hidden'>
            <div className='p-6'>
              <h3 className='font-bold text-slate-800 mb-3'>Luật chơi</h3>
              <ul className='space-y-2 text-sm text-slate-600'>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    1
                  </div>
                  <span>Lật hai thẻ trong mỗi lượt để tìm cặp thẻ giống nhau.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    2
                  </div>
                  <span>Hoàn thành càng nhanh, điểm càng cao.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    3
                  </div>
                  <span>Tìm tất cả các cặp thẻ để hoàn thành vòng chơi.</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MemoryGame
