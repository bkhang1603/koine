'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Palette, Heart, Trophy } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

const COLORS = [
  { name: 'Đỏ', value: '#ef4444', bgClass: 'bg-red-500' },
  { name: 'Xanh dương', value: '#3b82f6', bgClass: 'bg-blue-500' },
  { name: 'Xanh lá', value: '#22c55e', bgClass: 'bg-green-500' },
  { name: 'Vàng', value: '#eab308', bgClass: 'bg-yellow-500' }
]

// Khó hơn: nhiều màu hơn và tốc độ nhanh hơn
const LEVELS = [
  { patternLength: 3, speed: 900 },
  { patternLength: 4, speed: 800 },
  { patternLength: 5, speed: 700 },
  { patternLength: 6, speed: 600 },
  { patternLength: 7, speed: 500 },
  { patternLength: 8, speed: 400 },
  { patternLength: 9, speed: 350 },
  { patternLength: 10, speed: 300 }
]

export default function ColorPatternGame() {
  const [gameState, setGameState] = useState<'intro' | 'watch' | 'play' | 'correct' | 'wrong' | 'levelup' | 'gameover'>(
    'intro'
  )
  const [level, setLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [pattern, setPattern] = useState<number[]>([])
  const [playerPattern, setPlayerPattern] = useState<number[]>([])
  const [activeColor, setActiveColor] = useState<number | null>(null)
  const [showingPattern, setShowingPattern] = useState(false)
  const [progress, setProgress] = useState(0)
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0)
  const [activePatternIndex, setActivePatternIndex] = useState(-1)
  const [statusMessage, setStatusMessage] = useState('')

  // Generate a random pattern based on the current level
  const generatePattern = useCallback(() => {
    const patternLength = LEVELS[level].patternLength
    const newPattern = Array.from({ length: patternLength }, () => Math.floor(Math.random() * COLORS.length))
    setPattern(newPattern)
    return newPattern
  }, [level])

  // Show the pattern to the player in a clearer way
  const showPattern = useCallback(
    async (patternToShow: number[]) => {
      setShowingPattern(true)
      setPlayerPattern([])
      setProgress(0)
      setActivePatternIndex(-1)
      setStatusMessage('Đang hiển thị mẫu màu...')

      const animationTime = patternToShow.length * LEVELS[level].speed * 1.5
      const progressInterval = 30 // Update progress every 30ms for smooth animation
      const progressIncrement = 100 / (animationTime / progressInterval)

      let currentProgress = 0
      const progressTimer = setInterval(() => {
        currentProgress += progressIncrement
        setProgress(Math.min(currentProgress, 100))
        if (currentProgress >= 100) {
          clearInterval(progressTimer)
        }
      }, progressInterval)

      // Initial pause before showing the pattern
      await new Promise((resolve) => setTimeout(resolve, 500))

      for (let i = 0; i < patternToShow.length; i++) {
        if (gameState === 'gameover') {
          clearInterval(progressTimer)
          break
        }

        // Show which position we're on
        setActivePatternIndex(i)

        // Highlight the active color
        setActiveColor(patternToShow[i])

        // Wait for a moment with the color highlighted
        await new Promise((resolve) => setTimeout(resolve, LEVELS[level].speed))

        // Turn off the highlight
        setActiveColor(null)

        // Gap between colors
        await new Promise((resolve) => setTimeout(resolve, LEVELS[level].speed / 3))
      }

      // Reset
      setActivePatternIndex(-1)
      clearInterval(progressTimer)
      setProgress(100)
      setShowingPattern(false)
      setGameState('play')
      setStatusMessage('Hãy tái tạo mẫu màu bạn vừa thấy')
    },
    [gameState, level]
  )

  // Start watching the pattern
  const startWatching = useCallback(() => {
    setGameState('watch')
    setStatusMessage('Chuẩn bị xem mẫu màu...')
    const newPattern = generatePattern()
    setTimeout(() => {
      showPattern(newPattern)
    }, 1000)
  }, [generatePattern, showPattern])

  // Start game - completely reset everything
  const startGame = useCallback(() => {
    // Reset all game state
    setScore(0)
    setLevel(0)
    setLives(3)
    setConsecutiveCorrect(0)
    setStatusMessage('')
    setPlayerPattern([])
    setPattern([])
    setActiveColor(null)
    setActivePatternIndex(-1)
    setProgress(0)
    setShowingPattern(false)

    // Start with a delay to ensure UI is reset
    setTimeout(() => {
      startWatching()
    }, 100)
  }, [startWatching])

  // Handle player color selection
  const handleColorClick = useCallback(
    (colorIndex: number) => {
      if (gameState !== 'play' || showingPattern) return

      setActiveColor(colorIndex)
      setTimeout(() => setActiveColor(null), 300)

      const newPlayerPattern = [...playerPattern, colorIndex]
      setPlayerPattern(newPlayerPattern)

      // Check if the player's choice is correct
      const currentIndex = playerPattern.length
      if (colorIndex !== pattern[currentIndex]) {
        // Wrong choice
        setLives(lives - 1)
        setConsecutiveCorrect(0)
        setStatusMessage('Sai rồi! Bạn mất 1 mạng')

        if (lives <= 1) {
          // Game over if no lives left
          setGameState('gameover')
          setStatusMessage('Trò chơi kết thúc! Bạn đã hết mạng')
        } else {
          // Try again - show the pattern again
          setGameState('wrong')
          setTimeout(() => {
            startWatching() // Show the pattern again
          }, 1500)
        }
        return
      }

      // Check if the pattern is complete
      if (newPlayerPattern.length === pattern.length) {
        // Complete!
        setConsecutiveCorrect((prev) => prev + 1)
        const basePoints = 10 * pattern.length
        const speedBonus = Math.round(5 * (level + 1))
        const consecutiveBonus = Math.round(consecutiveCorrect * 5)
        const totalPoints = basePoints + speedBonus + consecutiveBonus

        setScore((prev) => prev + totalPoints)
        setGameState('correct')
        setStatusMessage(`Tuyệt vời! +${totalPoints} điểm`)

        // Level up after correct pattern
        setTimeout(() => {
          if (level < LEVELS.length - 1) {
            setLevel(level + 1)
            setGameState('levelup')
            setStatusMessage(`Bạn đã lên cấp độ ${level + 2}! Chuẩn bị...`)
            setTimeout(() => {
              startWatching()
            }, 1500)
          } else {
            // Thắng toàn bộ trò chơi
            setGameState('gameover')
            setStatusMessage(`Chúc mừng! Bạn đã hoàn thành tất cả ${LEVELS.length} cấp độ!`)
          }
        }, 1500)
      }
    },
    [gameState, showingPattern, playerPattern, pattern, lives, consecutiveCorrect, level, startWatching]
  )

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Game Header */}
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center'>
            <Palette className='w-6 h-6 text-white' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-slate-800'>Color Pattern</h2>
            <p className='text-slate-600'>Ghi nhớ và tái tạo mẫu màu sắc</p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <Card className='px-4 py-2 flex items-center gap-2'>
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart key={i} className={`h-5 w-5 ${i < lives ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
            ))}
          </Card>

          <Link href='/kid/game'>
            <Button variant='ghost' className='text-slate-600 hover:text-rose-600'>
              <ArrowLeft className='h-5 w-5 mr-2' />
              Quay lại
            </Button>
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Game Area */}
        <div className='lg:col-span-2'>
          <Card className='border-0 shadow-lg overflow-hidden h-full'>
            <div className='bg-gradient-to-br from-rose-50 to-pink-50 p-8 h-full'>
              {/* Intro Screen */}
              {gameState === 'intro' && (
                <div className='flex flex-col items-center justify-center text-center'>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className='w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mx-auto mb-6'>
                      <Palette className='w-10 h-10 text-white' />
                    </div>
                    <h3 className='text-2xl font-bold text-slate-800 mb-3'>Color Pattern</h3>
                    <p className='text-slate-600 mb-6 max-w-md'>
                      Ghi nhớ các mẫu màu sắc xuất hiện theo thứ tự, sau đó nhấp vào chúng để tái tạo mẫu. Mỗi cấp độ sẽ
                      tăng số lượng màu và tốc độ hiển thị!
                    </p>
                    <Button onClick={startGame} className='bg-rose-500 hover:bg-rose-600 mb-4'>
                      Bắt đầu chơi
                    </Button>
                  </motion.div>
                </div>
              )}

              {/* Game Over Screen */}
              {gameState === 'gameover' && (
                <div className='flex flex-col items-center justify-center text-center h-full'>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className='w-20 h-20 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center mx-auto mb-6'>
                      <Trophy className='w-10 h-10 text-white' />
                    </div>
                    <h3 className='text-2xl font-bold text-slate-800 mb-2'>Kết thúc trò chơi!</h3>
                    <div className='text-rose-600 text-4xl font-bold mb-4'>{score} điểm</div>
                    <p className='text-slate-600 mb-6 max-w-md'>
                      {statusMessage || 'Bạn đã hoàn thành trò chơi với số điểm trên!'}
                    </p>
                    <p className='text-slate-500 mb-8'>Đạt tới cấp độ: {level + 1}</p>
                    <div className='flex gap-4 justify-center'>
                      <Link href='/kid/game'>
                        <Button variant='outline' className='flex items-center gap-1'>
                          <ArrowLeft className='h-4 w-4' />
                          Quay lại
                        </Button>
                      </Link>
                      <Button onClick={startGame} className='bg-rose-500 hover:bg-rose-600'>
                        Chơi lại
                      </Button>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Game Play Screens */}
              {(gameState === 'watch' ||
                gameState === 'play' ||
                gameState === 'correct' ||
                gameState === 'wrong' ||
                gameState === 'levelup') && (
                <div>
                  {/* Game Content */}
                  <div className='mb-6'>
                    {/* Progress Bar - Always visible */}
                    <div className='mb-2 flex justify-between text-sm'>
                      <span className='font-medium text-rose-600'>
                        {gameState === 'watch' ? 'Đang hiển thị mẫu...' : 'Lượt chơi của bạn'}
                      </span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className='h-2' />
                  </div>

                  <div className='min-h-[400px]'>
                    <div className='mb-8'>
                      {/* Pattern Display - Show all circles based on pattern length */}
                      <div
                        className={`mb-8 bg-gray-800 rounded-xl p-6 ${gameState === 'watch' ? 'ring-2 ring-rose-500' : ''}`}
                      >
                        <div className='flex flex-wrap justify-center items-center gap-4'>
                          {pattern.map((colorIndex, index) => (
                            <div key={index} className=''>
                              <div>
                                <div
                                  className={`w-14 h-14 rounded-full transition-all duration-300 flex items-center justify-center
                                  ${activePatternIndex === index ? 'ring-4 ring-white' : 'ring-1 ring-gray-600'}`}
                                  style={{
                                    backgroundColor:
                                      activePatternIndex === index ? COLORS[colorIndex].value : '#374151',
                                    boxShadow:
                                      activePatternIndex === index ? `0 0 20px 5px ${COLORS[colorIndex].value}` : 'none'
                                  }}
                                >
                                  {activePatternIndex === index && (
                                    <span className='font-bold text-white text-xl'>{index + 1}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Color Selection Buttons - Always show them */}
                      <div className='grid grid-cols-2 gap-4 mb-6'>
                        {COLORS.map((color, index) => (
                          <div key={index} className='relative'>
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              animate={{
                                scale: activeColor === index ? 1.05 : 1,
                                boxShadow: activeColor === index ? `0px 0px 12px ${color.value}` : 'none'
                              }}
                              transition={{ duration: 0.2 }}
                              onClick={() => handleColorClick(index)}
                              disabled={gameState !== 'play' || showingPattern}
                              className={`w-full py-6 rounded-xl flex items-center justify-center transition-all 
                                ${gameState === 'play' ? 'hover:brightness-110' : 'opacity-90'}
                              `}
                              style={{
                                backgroundColor: color.value
                              }}
                            >
                              <span className='text-white font-bold text-xl drop-shadow-md'>{color.name}</span>
                            </motion.button>
                          </div>
                        ))}
                      </div>

                      {/* Pattern Progress Indicators */}
                      <div className='flex flex-wrap justify-center gap-3 mt-6 min-h-[40px]'>
                        {pattern.map((colorIndex, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                              ${
                                index < playerPattern.length
                                  ? playerPattern[index] === pattern[index]
                                    ? 'border-green-500 bg-green-100'
                                    : 'border-red-500 bg-red-100'
                                  : index === playerPattern.length && gameState === 'play'
                                    ? 'border-blue-500 bg-blue-100 animate-pulse'
                                    : 'border-gray-300 bg-gray-100'
                              }`}
                          >
                            {index < playerPattern.length ? (
                              <div
                                className='w-6 h-6 rounded-full'
                                style={{
                                  backgroundColor: COLORS[playerPattern[index]].value
                                }}
                              />
                            ) : (
                              <span className='text-gray-400 font-medium'>{index + 1}</span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Status Message - Fixed position at bottom */}
                      <div className='h-12 flex items-center justify-center mt-6'>
                        {gameState === 'watch' && activePatternIndex >= 0 ? (
                          <span className='font-medium text-rose-600'>
                            Ghi nhớ: {COLORS[pattern[activePatternIndex]].name} ({activePatternIndex + 1}/
                            {pattern.length})
                          </span>
                        ) : (
                          <span className='font-medium text-slate-700'>{statusMessage}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Game Info Panel */}
        <div className='space-y-6'>
          {/* Game Stats */}
          <Card className='border-0 shadow-md overflow-hidden'>
            <div className='bg-gradient-to-r from-slate-700 to-slate-800 p-4 text-white'>
              <h2 className='font-bold flex items-center'>
                <Trophy className='h-5 w-5 mr-2' />
                Thông tin trận đấu
              </h2>
            </div>

            <div className='p-6 space-y-6'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-rose-600 mb-1'>{score}</div>
                <div className='text-sm text-slate-600'>Điểm số</div>
              </div>

              <div>
                <div className='flex justify-between mb-1 text-sm'>
                  <span className='text-slate-600'>Cấp độ</span>
                  <span className='font-medium text-rose-600'>
                    {level + 1}/{LEVELS.length}
                  </span>
                </div>
                <Progress value={((level + 1) / LEVELS.length) * 100} className='h-2' />
              </div>

              <div>
                <div className='flex justify-between mb-1 text-sm'>
                  <span className='text-slate-600'>Số lượng màu</span>
                  <span className='font-medium text-rose-600'>{LEVELS[level].patternLength}</span>
                </div>
                <Progress
                  value={(LEVELS[level].patternLength / LEVELS[LEVELS.length - 1].patternLength) * 100}
                  className='h-2'
                />
              </div>

              <div>
                <div className='flex justify-between mb-1 text-sm'>
                  <span className='text-slate-600'>Tốc độ</span>
                  <span className='font-medium text-rose-600'>
                    {Math.round((1000 / LEVELS[level].speed) * 100) / 100}x
                  </span>
                </div>
                <Progress
                  value={((1000 - LEVELS[level].speed) / (1000 - LEVELS[LEVELS.length - 1].speed)) * 100}
                  className='h-2'
                />
              </div>
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
                  <span>Quan sát kỹ mẫu màu xuất hiện theo thứ tự.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    2
                  </div>
                  <span>Nhấp vào các màu theo đúng thứ tự đã xem.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    3
                  </div>
                  <span>Cấp độ càng cao, số lượng màu càng nhiều và tốc độ càng nhanh.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    4
                  </div>
                  <span>Đạt đúng liên tiếp sẽ nhận thêm điểm thưởng.</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
