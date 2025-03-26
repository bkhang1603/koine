'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Brain, CheckCircle2, Lightbulb, Timer, XCircle, Trophy, Star } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { quizQuestions } from '@/data/quiz-questions'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'

export default function QuizGamePage() {
  // Lấy 10 câu hỏi ngẫu nhiên khi bắt đầu game
  const [gameQuestions, setGameQuestions] = useState(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 10)
  })

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [gameComplete, setGameComplete] = useState(false)
  const [consecutive, setConsecutive] = useState(0)
  const [showCompleteDialog, setShowCompleteDialog] = useState(false)

  const handleNextQuestion = useCallback(() => {
    setShowResult(false)
    setSelectedOption(null)
    setTimeLeft(15)
    setConsecutive(0)

    if (currentQuestion < gameQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setGameComplete(true)
      setShowCompleteDialog(true)
    }
  }, [currentQuestion, gameQuestions.length])

  useEffect(() => {
    if (showResult || gameComplete) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (selectedOption === null) {
            handleNextQuestion()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [selectedOption, showResult, gameComplete, handleNextQuestion])

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return // Đã chọn đáp án

    setSelectedOption(optionIndex)

    if (optionIndex === gameQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      setConsecutive(consecutive + 1)
    } else {
      setConsecutive(0)
    }

    setShowResult(true)

    setTimeout(() => {
      handleNextQuestion()
    }, 1500)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setScore(0)
    setShowResult(false)
    setTimeLeft(15)
    setGameComplete(false)
    setConsecutive(0)
    setShowCompleteDialog(false)
    // Random lại câu hỏi mới
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5)
    setGameQuestions(shuffled.slice(0, 10))
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Game Header */}
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center'>
            <Lightbulb className='w-6 h-6 text-white' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-slate-800'>Quiz Challenge</h2>
            <p className='text-slate-600'>Thử thách kiến thức với câu đố thú vị</p>
          </div>
        </div>

        <Link href='/kid/game'>
          <Button variant='ghost' className='text-slate-600 hover:text-emerald-600'>
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
            <Card className='p-4 bg-gradient-to-br from-emerald-50 to-teal-50'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-lg bg-emerald-100'>
                  <Trophy className='w-5 h-5 text-emerald-600' />
                </div>
                <div>
                  <div className='text-2xl font-bold text-slate-800'>{score}</div>
                  <div className='text-sm text-slate-600'>Điểm hiện tại</div>
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
                  <div className='text-sm text-slate-600'>Thời gian còn lại</div>
                </div>
              </div>
            </Card>

            <Card className='p-4 bg-gradient-to-br from-blue-50 to-indigo-50'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-lg bg-blue-100'>
                  <Star className='w-5 h-5 text-blue-600' />
                </div>
                <div>
                  <div className='text-2xl font-bold text-slate-800'>{consecutive}</div>
                  <div className='text-sm text-slate-600'>Chuỗi đúng</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quiz Board */}
          <Card className='border-0 shadow-md overflow-hidden'>
            <div className='bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <Brain className='h-5 w-5' />
                  <h2 className='font-bold'>
                    Câu hỏi {currentQuestion + 1}/{gameQuestions.length}
                  </h2>
                </div>
                <div className='flex items-center gap-2'>
                  <Timer className='h-4 w-4' />
                  <span>{timeLeft}s</span>
                </div>
              </div>
              <Progress value={(timeLeft / 15) * 100} className='h-2 mt-4 bg-white/20' />
            </div>

            <div className='p-6'>
              <h3 className='text-xl font-semibold text-slate-800 mb-6'>{gameQuestions[currentQuestion].question}</h3>

              <div className='space-y-3'>
                {gameQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200
                      ${
                        selectedOption === index
                          ? index === gameQuestions[currentQuestion].correctAnswer
                            ? 'bg-green-100 border-green-300 text-green-800'
                            : 'bg-red-100 border-red-300 text-red-800'
                          : showResult && index === gameQuestions[currentQuestion].correctAnswer
                            ? 'bg-green-100 border-green-300 text-green-800'
                            : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
                      }
                    `}
                    onClick={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                  >
                    <div className='flex items-center'>
                      <div className='mr-3 h-6 w-6 flex-shrink-0'>
                        {selectedOption === index ? (
                          index === gameQuestions[currentQuestion].correctAnswer ? (
                            <CheckCircle2 className='h-6 w-6 text-green-500' />
                          ) : (
                            <XCircle className='h-6 w-6 text-red-500' />
                          )
                        ) : showResult && index === gameQuestions[currentQuestion].correctAnswer ? (
                          <CheckCircle2 className='h-6 w-6 text-green-500' />
                        ) : (
                          <div className='w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center'>
                            {String.fromCharCode(65 + index)}
                          </div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
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
                <div className='text-3xl font-bold text-emerald-600 mb-1'>{score}</div>
                <div className='text-sm text-slate-600'>Điểm số</div>
              </div>

              <div>
                <div className='flex justify-between mb-1 text-sm'>
                  <span className='text-slate-600'>Tiến độ</span>
                  <span className='font-medium text-emerald-600'>
                    {currentQuestion + 1}/{gameQuestions.length}
                  </span>
                </div>
                <Progress value={((currentQuestion + 1) / gameQuestions.length) * 100} className='h-2' />
              </div>

              <div>
                <div className='flex justify-between mb-1 text-sm'>
                  <span className='text-slate-600'>Độ chính xác</span>
                  <span className='font-medium text-emerald-600'>
                    {Math.round((score / (currentQuestion + 1)) * 100)}%
                  </span>
                </div>
                <Progress value={(score / (currentQuestion + 1)) * 100} className='h-2' />
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
                  <span>Chọn đáp án đúng trong thời gian cho phép.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    2
                  </div>
                  <span>Trả lời càng nhanh, điểm càng cao.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    3
                  </div>
                  <span>Trả lời đúng liên tiếp để nhận thêm điểm thưởng.</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Chúc mừng hoàn thành!</DialogTitle>
            <DialogDescription>Bạn đã hoàn thành bài kiểm tra với thành tích:</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='flex items-center justify-between'>
              <span className='font-medium'>Tổng điểm:</span>
              <span className='text-xl font-bold text-emerald-600'>{score}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='font-medium'>Độ chính xác:</span>
              <span className='text-emerald-600'>{Math.round((score / gameQuestions.length) * 100)}%</span>
            </div>
          </div>
          <DialogFooter className='flex space-x-2 sm:space-x-4'>
            <Button variant='outline' onClick={() => setShowCompleteDialog(false)}>
              Đóng
            </Button>
            <Button onClick={handleRestart}>Chơi lại</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
