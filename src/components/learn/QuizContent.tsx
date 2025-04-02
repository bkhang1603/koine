import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface QuizContentProps {
  chapter: any
  // eslint-disable-next-line no-unused-vars
  onComplete: (score: number) => void
  onRetry: () => void
}

export function QuizContent({ chapter, onComplete, onRetry }: QuizContentProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const totalQuestions = chapter.questions.length

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
    chapter.questions.forEach((question: any) => {
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

  const handleSubmit = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setShowResults(true)
    onComplete(finalScore)
  }

  const handleRetry = () => {
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
    onRetry()
  }

  if (showResults) {
    return (
      <Card className='overflow-hidden'>
        <div className='p-8 text-center'>
          <div className='mb-6'>
            {score >= 70 ? (
              <div className='bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto'>
                <CheckCircle2 className='w-12 h-12 text-green-500' />
              </div>
            ) : (
              <div className='bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto'>
                <XCircle className='w-12 h-12 text-red-500' />
              </div>
            )}
          </div>
          <h2 className='text-2xl font-bold mb-3'>{score >= 70 ? 'Chúc mừng!' : 'Chưa đạt yêu cầu'}</h2>
          <p className='text-lg mb-2'>Bạn đạt được {score.toFixed(1)}%</p>
          <p className='text-muted-foreground mb-6'>
            {Math.round((score / 100) * totalQuestions)}/{totalQuestions} câu đúng
          </p>
          {score >= 70 ? (
            <p className='text-green-600 font-medium'>Bạn đã hoàn thành bài kiểm tra thành công!</p>
          ) : (
            <>
              <p className='text-red-600 mb-6'>Bạn cần đạt ít nhất 70% để qua bài kiểm tra này.</p>
              <Button onClick={handleRetry} className='w-full sm:w-auto'>
                Làm lại bài kiểm tra
              </Button>
            </>
          )}
        </div>
      </Card>
    )
  }

  return (
    <div className='space-y-8'>
      <Card className='p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-xl font-semibold mb-1'>Kiểm tra: {chapter.title}</h2>
            <p className='text-sm text-muted-foreground'>Hoàn thành bài kiểm tra để mở khóa chương tiếp theo</p>
          </div>
          <div className='text-right'>
            <div className='text-2xl font-semibold mb-1'>{totalQuestions}</div>
            <div className='text-sm text-muted-foreground'>Câu hỏi</div>
          </div>
        </div>
      </Card>

      <div className='space-y-6'>
        {chapter.questions.map((question: any, index: number) => {
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

      <div className='flex items-center justify-between bg-white sticky bottom-0 py-4'>
        <div className='text-sm text-muted-foreground'>
          {Object.keys(selectedAnswers).length}/{totalQuestions} câu đã trả lời
        </div>
        <Button onClick={handleSubmit} disabled={Object.keys(selectedAnswers).length !== totalQuestions}>
          Nộp bài
        </Button>
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
    </div>
  )
}
