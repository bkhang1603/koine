'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, RefreshCw, Rocket, Star, Trophy, Brain, Timer } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { usePlusGamePointMutation } from '@/queries/useAccount'
import { toast } from '@/components/ui/use-toast'
import configRoute from '@/config/route'

// Tạo câu hỏi toán học
const generateQuestion = (level: number) => {
  let a: number, b: number, answer: number, operator: string

  switch (level) {
    case 1: // Cộng trừ cơ bản
      a = Math.floor(Math.random() * 10) + 1
      b = Math.floor(Math.random() * 10) + 1
      operator = Math.random() > 0.5 ? '+' : '-'
      answer = operator === '+' ? a + b : a - b

      // Đảm bảo không có kết quả âm
      if (operator === '-' && a < b) {
        ;[a, b] = [b, a]
        answer = a - b
      }
      break

    case 2: // Cộng trừ phức tạp hơn
      a = Math.floor(Math.random() * 20) + 10
      b = Math.floor(Math.random() * 20) + 1
      operator = Math.random() > 0.5 ? '+' : '-'
      answer = operator === '+' ? a + b : a - b

      // Đảm bảo không có kết quả âm
      if (operator === '-' && a < b) {
        ;[a, b] = [b, a]
        answer = a - b
      }
      break

    case 3: // Nhân chia đơn giản
      if (Math.random() > 0.5) {
        a = Math.floor(Math.random() * 10) + 1
        b = Math.floor(Math.random() * 10) + 1
        operator = 'x'
        answer = a * b
      } else {
        b = Math.floor(Math.random() * 9) + 1 // Số chia
        answer = Math.floor(Math.random() * 10) + 1 // Kết quả
        a = answer * b // Số bị chia
        operator = '÷'
      }
      break

    default:
      a = Math.floor(Math.random() * 10) + 1
      b = Math.floor(Math.random() * 10) + 1
      operator = '+'
      answer = a + b
  }

  // Tạo đáp án nhiễu
  const options = [answer]
  while (options.length < 4) {
    const wrongAnswer = answer + Math.floor(Math.random() * 10) - 5
    if (wrongAnswer >= 0 && !options.includes(wrongAnswer)) {
      options.push(wrongAnswer)
    }
  }

  // Xáo trộn đáp án
  const shuffledOptions = options.sort(() => Math.random() - 0.5)

  return {
    question: `${a} ${operator} ${b} = ?`,
    options: shuffledOptions,
    answer
  }
}

export default function RocketMathGamePage() {
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<{
    question: string
    options: number[]
    answer: number
  } | null>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [rocketProgress, setRocketProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameOver, setGameOver] = useState(false)
  const [consecutive, setConsecutive] = useState(0)
  const [pointsUpdated, setPointsUpdated] = useState(false)

  const plusGamePointMutation = usePlusGamePointMutation()

  // Khởi tạo câu hỏi đầu tiên trong useEffect
  useEffect(() => {
    setCurrentQuestion(generateQuestion(level))
  }, [level])

  const handleGameOver = useCallback(() => {
    setGameOver(true)

    // Cập nhật điểm khi game kết thúc
    if (!pointsUpdated) {
      // Giới hạn điểm tối đa là 30 (giảm từ 100)
      const gamePoints = Math.min(30, Math.floor(score / 5))
      plusGamePointMutation.mutate(
        { point: gamePoints },
        {
          onSuccess: () => {
            toast({
              title: 'Cập nhật điểm thành công',
              description: `Bạn đã nhận được ${gamePoints} điểm!`
            })
            setPointsUpdated(true)
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
  }, [score, pointsUpdated, plusGamePointMutation])

  // Timer countdown
  useEffect(() => {
    if (gameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleGameOver()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameOver, handleGameOver])

  const handleAnswerSelect = (selectedValue: number) => {
    if (selectedOption !== null) return // Đã chọn đáp án

    setSelectedOption(selectedValue)
    const correct = selectedValue === currentQuestion?.answer

    if (correct) {
      // Tính điểm dựa trên độ khó và thời gian còn lại
      const timeBonus = Math.floor(timeLeft / 2)
      const levelBonus = level * 5
      const newScore = score + 10 + timeBonus + levelBonus
      setScore(newScore)

      // Tăng tiến độ tên lửa
      const progress = Math.min(100, rocketProgress + 10)
      setRocketProgress(progress)

      // Tăng số câu đúng liên tiếp
      const newConsecutive = consecutive + 1
      setConsecutive(newConsecutive)

      // Nếu đạt đủ 5 câu đúng liên tiếp và level < 3, tăng level
      if (newConsecutive >= 5 && level < 3) {
        setLevel((prev) => prev + 1)
        setConsecutive(0)
      }

      // Kiểm tra kết thúc game
      if (progress >= 100) {
        setTimeout(() => {
          setGameOver(true)
        }, 1500)
      } else {
        // Tiếp tục với câu hỏi mới
        setTimeout(() => {
          setSelectedOption(null)
          setTimeLeft(10)
          setCurrentQuestion(generateQuestion(level))
        }, 1500)
      }
    } else {
      // Trả lời sai
      setConsecutive(0)

      setTimeout(() => {
        setSelectedOption(null)
        setTimeLeft(10)
        setCurrentQuestion(generateQuestion(level))
      }, 1500)
    }
  }

  const resetGame = () => {
    setLevel(1)
    setScore(0)
    setCurrentQuestion(generateQuestion(1))
    setSelectedOption(null)
    setRocketProgress(0)
    setTimeLeft(10)
    setGameOver(false)
    setConsecutive(0)
    setPointsUpdated(false)
  }

  // Kiểm tra currentQuestion trước khi render
  if (!currentQuestion) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-center min-h-[60vh]'>
          <div className='text-center'>
            <Rocket className='w-12 h-12 text-teal-500 animate-bounce mx-auto mb-4' />
            <p className='text-slate-600'>Đang chuẩn bị câu hỏi...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Game Header */}
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center'>
            <Rocket className='w-6 h-6 text-white' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-slate-800'>Rocket Math</h2>
            <p className='text-slate-600'>Du hành vũ trụ với toán học</p>
          </div>
        </div>

        <Link href={configRoute.kid.game}>
          <Button variant='ghost' className='text-slate-600 hover:text-teal-600'>
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
            <Card className='p-4 bg-gradient-to-br from-teal-50 to-emerald-50'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-lg bg-teal-100'>
                  <Trophy className='w-5 h-5 text-teal-600' />
                </div>
                <div>
                  <div className='text-2xl font-bold text-slate-800'>{score}</div>
                  <div className='text-sm text-slate-600'>Điểm số</div>
                </div>
              </div>
            </Card>

            <Card className='p-4 bg-gradient-to-br from-amber-50 to-orange-50'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-lg bg-amber-100'>
                  <Timer className='w-5 h-5 text-amber-600' />
                </div>
                <div>
                  <div className='text-2xl font-bold text-slate-800'>{timeLeft}s</div>
                  <div className='text-sm text-slate-600'>Thời gian</div>
                </div>
              </div>
            </Card>

            <Card className='p-4 bg-gradient-to-br from-blue-50 to-indigo-50'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-lg bg-blue-100'>
                  <Star className='w-5 h-5 text-blue-600' />
                </div>
                <div>
                  <div className='text-2xl font-bold text-slate-800'>{level}</div>
                  <div className='text-sm text-slate-600'>Cấp độ</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Game Board */}
          <Card className='border-0 shadow-md overflow-hidden'>
            <div className='bg-gradient-to-r from-teal-500 to-emerald-600 p-4 text-white'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <Brain className='h-5 w-5' />
                  <h2 className='font-bold'>Câu hỏi toán học</h2>
                </div>
                <div className='flex items-center gap-2'>
                  <Timer className='h-4 w-4' />
                  <span>{timeLeft}s</span>
                </div>
              </div>
              <Progress value={(timeLeft / 30) * 100} className='h-2 mt-4 bg-white/20' />
            </div>

            <div className='p-6'>
              {!gameOver ? (
                <div className='space-y-6'>
                  <div className='text-center'>
                    <h3 className='text-2xl font-bold text-slate-800 mb-2'>{currentQuestion.question}</h3>
                    <p className='text-sm text-slate-600'>Chọn đáp án đúng để tên lửa bay cao hơn</p>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={`${option}-${index}`}
                        onClick={() => handleAnswerSelect(option)}
                        className={`
                          relative p-4 rounded-lg border text-center transition-all duration-200
                          ${
                            selectedOption === option
                              ? option === currentQuestion.answer
                                ? 'bg-green-100 border-green-300 text-green-800'
                                : 'bg-red-100 border-red-300 text-red-800'
                              : 'bg-white border-slate-200 hover:border-teal-300 hover:bg-teal-50'
                          }
                        `}
                        disabled={selectedOption !== null}
                      >
                        <span className='text-xl font-semibold'>{option}</span>
                        {selectedOption === option && option === currentQuestion.answer && (
                          <div className='absolute -top-8 left-1/2 -translate-x-1/2'>
                            <Rocket className='w-6 h-6 text-teal-500 animate-bounce' />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='text-center p-8'>
                  <div className='h-20 w-20 bg-teal-100 text-teal-600 rounded-full mx-auto flex items-center justify-center mb-6'>
                    <Trophy className='h-10 w-10' />
                  </div>
                  <h2 className='text-2xl font-bold text-slate-800 mb-2'>Hoàn thành!</h2>
                  <p className='text-slate-600 mb-2'>Tên lửa của bạn đã bay được {rocketProgress}m</p>
                  {pointsUpdated && (
                    <p className='text-teal-600 font-medium mb-6'>
                      Bạn đã nhận được {Math.min(30, Math.floor(score / 5))} điểm
                    </p>
                  )}
                  <Button onClick={resetGame} className='bg-teal-500 hover:bg-teal-600 text-white'>
                    <RefreshCw className='w-4 h-4 mr-2' />
                    Chơi lại
                  </Button>
                </div>
              )}
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
                <div className='text-3xl font-bold text-teal-600 mb-1'>{rocketProgress}m</div>
                <div className='text-sm text-slate-600'>Độ cao tên lửa</div>
              </div>

              <div>
                <div className='flex justify-between mb-1 text-sm'>
                  <span className='text-slate-600'>Tiến độ</span>
                  <span className='font-medium text-teal-600'>{rocketProgress}%</span>
                </div>
                <Progress value={rocketProgress} className='h-2' />
              </div>

              <div>
                <div className='flex justify-between mb-1 text-sm'>
                  <span className='text-slate-600'>Chuỗi đúng</span>
                  <span className='font-medium text-teal-600'>{consecutive}/5</span>
                </div>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4, 5].map((c) => (
                    <div
                      key={c}
                      className={`h-2 flex-1 rounded-full ${c <= consecutive ? 'bg-green-500' : 'bg-slate-200'}`}
                    />
                  ))}
                </div>
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
                  <span>Giải các phép tính để tên lửa bay cao hơn.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    2
                  </div>
                  <span>Trả lời đúng liên tiếp để nhận thêm điểm thưởng.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    3
                  </div>
                  <span>Đạt đủ độ cao để hoàn thành nhiệm vụ.</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
