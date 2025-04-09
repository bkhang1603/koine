import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, XCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { UserCourseProgressResType } from '@/schemaValidations/course.schema'
import { useUpdateScoreQuizMutation } from '@/queries/useCourse'
import { handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import Loading from '@/components/loading'

interface QuizContentProps {
  chapter: UserCourseProgressResType['data']['chapters'][0]
  onPrevClick?: () => void
  onNextClick?: () => void
  canAccessNext?: boolean
  prevLesson?: any
  nextLesson?: any
}

export function QuizContent({
  chapter,
  onPrevClick,
  onNextClick,
  canAccessNext = false,
  prevLesson,
  nextLesson
}: QuizContentProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const totalQuestions = chapter.questions?.length || 0

  const updateScoreQuizMutation = useUpdateScoreQuizMutation()

  // Tự động scroll lên đầu trang khi hiển thị kết quả
  useEffect(() => {
    if (showResults) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [showResults])

  const handleSingleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: [optionId]
    }))
  }

  const handleMultiAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => {
      const currentAnswers = prev[questionId] || []
      const isSelected = currentAnswers.includes(optionId)

      return {
        ...prev,
        [questionId]: isSelected ? currentAnswers.filter((id) => id !== optionId) : [...currentAnswers, optionId]
      }
    })
  }

  const calculateScore = () => {
    let correct = 0
    chapter.questions?.forEach((question: any) => {
      const selectedAnswer = selectedAnswers[question.id] || []
      const correctOptions = question.questionOptions.filter((opt: any) => opt.isCorrect)
      const correctOptionIds = correctOptions.map((opt: any) => opt.id)

      if (
        correctOptionIds.length === selectedAnswer.length &&
        correctOptionIds.every((id: any) => selectedAnswer.includes(id))
      ) {
        correct++
      }
    })
    return (correct / totalQuestions) * 100
  }

  const handleSubmit = async () => {
    try {
      if (updateScoreQuizMutation.isPending) return

      const finalScore = calculateScore()
      setScore(finalScore)
      setShowResults(true)

      if (finalScore >= 70) {
        await updateScoreQuizMutation.mutateAsync({
          chapterId: chapter.id,
          score: finalScore
        })

        toast({
          description: `Bạn đã đạt được ${Math.round(finalScore)}%`
        })
      }
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const handleRetry = () => {
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
  }

  if (showResults) {
    return (
      <div className='flex flex-col min-h-[calc(100vh-10rem)]'>
        <div className='flex-1'>
          <Card className='overflow-hidden border-0'>
            {/* Background with gradient */}
            <div
              className={`relative h-32 ${
                score >= 70
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                  : 'bg-gradient-to-r from-red-500 to-rose-600'
              }`}
            >
              <div className='absolute -bottom-16 left-1/2 -translate-x-1/2'>
                <div
                  className={`w-32 h-32 rounded-2xl shadow-xl flex items-center justify-center ${
                    score >= 70 ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  {score >= 70 ? (
                    <CheckCircle2 className='w-16 h-16 text-green-500' />
                  ) : (
                    <XCircle className='w-16 h-16 text-red-500' />
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className='px-6 pt-24 pb-8'>
              <div className='text-center max-w-2xl mx-auto'>
                {/* Score display */}
                <div className='mb-6'>
                  <div className='text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent'>
                    {Math.round(score)}%
                  </div>
                  <div className='mt-1 text-slate-500 font-medium'>Kết quả của bạn</div>
                </div>

                {/* Stats */}
                <div className='flex items-center justify-center gap-8 mb-8'>
                  <div className='text-center px-6 py-3 bg-slate-50 rounded-xl'>
                    <div className='text-2xl font-bold text-slate-800'>
                      {Math.round((score / 100) * totalQuestions)}
                    </div>
                    <div className='text-sm text-slate-500 font-medium'>Câu đúng</div>
                  </div>
                  <div className='text-center px-6 py-3 bg-slate-50 rounded-xl'>
                    <div className='text-2xl font-bold text-slate-800'>{totalQuestions}</div>
                    <div className='text-sm text-slate-500 font-medium'>Tổng số câu</div>
                  </div>
                </div>

                {/* Message */}
                <div className='space-y-4'>
                  <h2 className='text-2xl font-bold'>{score >= 70 ? 'Chúc mừng bạn!' : 'Cố gắng lần sau nhé!'}</h2>
                  {score >= 70 ? (
                    <div className='space-y-2'>
                      <p className='text-green-600 font-medium text-lg'>Bạn đã hoàn thành xuất sắc bài kiểm tra!</p>
                      <p className='text-slate-500'>
                        Kết quả này cho thấy bạn đã nắm vững kiến thức trong bài học. Hãy tiếp tục phát huy trong các
                        bài học tiếp theo nhé!
                      </p>
                    </div>
                  ) : (
                    <div className='space-y-2'>
                      <p className='text-red-600 font-medium text-lg'>
                        Bạn cần đạt ít nhất 70% để vượt qua bài kiểm tra
                      </p>
                      <p className='text-slate-500'>
                        Đừng nản lòng! Hãy xem lại bài học và thử lại. Mỗi lần thử là một cơ hội để học hỏi và tiến bộ
                        hơn.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Action buttons */}
        <div className='sticky bottom-0 bg-white border-t py-6'>
          <div className='flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto'>
            {prevLesson ? (
              <Button
                variant='outline'
                className='w-full sm:w-[160px] h-12 rounded-xl'
                onClick={onPrevClick}
                disabled={updateScoreQuizMutation.isPending}
              >
                <ChevronLeft className='w-5 h-5 mr-2' />
                <span className='font-medium'>Bài trước</span>
              </Button>
            ) : (
              <div className='w-full sm:w-[160px] h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400'>
                <ChevronLeft className='w-5 h-5 mr-2' />
                <span className='font-medium'>Bài trước</span>
              </div>
            )}

            {score < 70 && (
              <Button
                className='w-full sm:flex-1 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all duration-200'
                onClick={handleRetry}
                disabled={updateScoreQuizMutation.isPending}
              >
                <div className='flex items-center gap-2'>
                  <CheckCircle2 className='w-5 h-5' />
                  <span className='font-medium'>Làm lại bài kiểm tra</span>
                </div>
              </Button>
            )}

            {score >= 70 && (
              <Button
                className='w-full sm:flex-1 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all duration-200'
                disabled
              >
                <span className='font-medium'>Đã hoàn thành</span>
              </Button>
            )}

            {nextLesson ? (
              <Button
                variant='outline'
                className='w-full sm:w-[160px] h-12 rounded-xl'
                onClick={onNextClick}
                disabled={!canAccessNext || updateScoreQuizMutation.isPending}
              >
                <span className='font-medium'>Bài tiếp theo</span>
                <ChevronRight className='w-5 h-5 ml-2' />
              </Button>
            ) : (
              <div className='w-full sm:w-[160px] h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400'>
                <span className='font-medium'>Bài tiếp theo</span>
                <ChevronRight className='w-5 h-5 ml-2' />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      <Card className='p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <div className='flex items-center gap-2 mb-1'>
              <h2 className='text-xl font-semibold'>Kiểm tra: {chapter.title}</h2>
              {chapter.isTakeQuiz && (
                <div className='flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full'>
                  <CheckCircle2 className='w-4 h-4 text-green-500' />
                  <span className='text-sm font-medium text-green-600'>Đã hoàn thành</span>
                </div>
              )}
            </div>
            <p className='text-sm text-muted-foreground'>
              {chapter.isTakeQuiz
                ? 'Bạn đã hoàn thành bài kiểm tra này. Bạn có thể xem lại hoặc tiếp tục với bài học tiếp theo.'
                : 'Hoàn thành bài kiểm tra để mở khóa chương tiếp theo'}
            </p>
          </div>
          <div className='text-right'>
            <div className='text-2xl font-semibold mb-1'>{totalQuestions}</div>
            <div className='text-sm text-muted-foreground'>Câu hỏi</div>
          </div>
        </div>
      </Card>

      <div className='space-y-6'>
        {chapter.questions?.map((question: any, index: number) => {
          const correctOptions = question.questionOptions.filter((opt: any) => opt.isCorrect)
          const isMultipleChoice = correctOptions.length > 1
          const currentAnswers = selectedAnswers[question.id] || []

          return (
            <Card key={question.id} className='overflow-hidden'>
              <div className='p-6 border-b bg-slate-50/50'>
                <div className='flex items-start gap-4'>
                  <div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 font-medium'>
                    {index + 1}
                  </div>
                  <p className='font-medium pt-1.5'>{question.content}</p>
                </div>
              </div>
              <div className='p-6'>
                {isMultipleChoice ? (
                  <div className='space-y-3'>
                    {question.questionOptions.map((option: any) => (
                      <div key={option.id} className='flex items-start space-x-3'>
                        <Checkbox
                          id={option.id}
                          checked={currentAnswers.includes(option.id)}
                          onCheckedChange={() => handleMultiAnswerSelect(question.id, option.id)}
                        />
                        <Label htmlFor={option.id} className='text-sm leading-relaxed cursor-pointer'>
                          {option.optionData}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <RadioGroup
                    value={currentAnswers[0]}
                    onValueChange={(value) => handleSingleAnswerSelect(question.id, value)}
                    className='space-y-3'
                  >
                    {question.questionOptions.map((option: any) => (
                      <div key={option.id} className='flex items-center space-x-3'>
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className='text-sm leading-relaxed cursor-pointer'>
                          {option.optionData}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      <Card className='p-4 bg-amber-50 border-amber-200'>
        <div className='flex items-start gap-3'>
          <AlertCircle className='text-amber-500 h-5 w-5 mt-0.5 flex-shrink-0' />
          <div className='text-sm text-amber-700'>
            <p className='font-medium mb-1'>Lưu ý:</p>
            <p>Bạn cần đạt ít nhất 70% số câu đúng để hoàn thành bài kiểm tra này.</p>
          </div>
        </div>
      </Card>

      <div className='pt-6 border-t'>
        <div className='flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto'>
          {prevLesson ? (
            <Button
              variant='outline'
              className='w-full sm:w-[160px] h-12 rounded-xl'
              onClick={onPrevClick}
              disabled={updateScoreQuizMutation.isPending}
            >
              <ChevronLeft className='w-5 h-5 mr-2' />
              <span className='font-medium'>Bài trước</span>
            </Button>
          ) : (
            <div className='w-full sm:w-[160px] h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400'>
              <ChevronLeft className='w-5 h-5 mr-2' />
              <span className='font-medium'>Bài trước</span>
            </div>
          )}

          <Button
            className='w-full sm:flex-1 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all duration-200'
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length !== totalQuestions || updateScoreQuizMutation.isPending}
          >
            {updateScoreQuizMutation.isPending ? (
              <div className='flex items-center'>
                <Loading color='bg-white' />
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <CheckCircle2 className='w-5 h-5' />
                <span className='font-medium'>{chapter.isTakeQuiz ? 'Xem lại kết quả' : 'Nộp bài'}</span>
              </div>
            )}
          </Button>

          {nextLesson ? (
            <Button
              variant='outline'
              className='w-full sm:w-[160px] h-12 rounded-xl'
              onClick={onNextClick}
              disabled={!canAccessNext || updateScoreQuizMutation.isPending}
            >
              <span className='font-medium'>Bài tiếp theo</span>
              <ChevronRight className='w-5 h-5 ml-2' />
            </Button>
          ) : (
            <div className='w-full sm:w-[160px] h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400'>
              <span className='font-medium'>Bài tiếp theo</span>
              <ChevronRight className='w-5 h-5 ml-2' />
            </div>
          )}
        </div>

        <div className='mt-6 flex items-center justify-center gap-2 text-sm text-gray-500'>
          <div className='flex items-center gap-1.5'>
            <CheckCircle2 className='w-4 h-4 text-green-500' />
            <span>
              {Object.keys(selectedAnswers).length}/{totalQuestions} câu đã trả lời
            </span>
          </div>
          {chapter.isTakeQuiz && (
            <>
              <span>•</span>
              <div className='flex items-center gap-1.5'>
                <CheckCircle2 className='w-4 h-4 text-green-500' />
                <span>Đã hoàn thành bài kiểm tra</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
