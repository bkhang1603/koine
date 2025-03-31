/* eslint-disable no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { X, Plus } from 'lucide-react'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizLessonContentProps {
  lesson: {
    quizQuestions?: QuizQuestion[]
  }
  chapterIndex: number
  lessonIndex: number
  handleLessonChange: (chapterIndex: number, lessonIndex: number, field: string, value: QuizQuestion[]) => void
}

export function QuizLessonContent({ lesson, chapterIndex, lessonIndex, handleLessonChange }: QuizLessonContentProps) {
  const updateQuizQuestions = (updatedQuestions: QuizQuestion[]) => {
    handleLessonChange(chapterIndex, lessonIndex, 'quizQuestions', updatedQuestions)
  }

  const addQuestion = () => {
    const newQuestions = [...(lesson.quizQuestions || []), { question: '', options: ['', ''], correctAnswer: 0 }]
    updateQuizQuestions(newQuestions)
  }

  const removeQuestion = (qIndex: number) => {
    const newQuestions = [...(lesson.quizQuestions || [])]
    newQuestions.splice(qIndex, 1)
    updateQuizQuestions(newQuestions)
  }

  const updateQuestion = (qIndex: number, field: string, value: string | number) => {
    const newQuestions = [...(lesson.quizQuestions || [])]
    newQuestions[qIndex] = { ...newQuestions[qIndex], [field]: value }
    updateQuizQuestions(newQuestions)
  }

  const addOption = (qIndex: number) => {
    const newQuestions = [...(lesson.quizQuestions || [])]
    newQuestions[qIndex].options.push('')
    updateQuizQuestions(newQuestions)
  }

  const removeOption = (qIndex: number, oIndex: number) => {
    const newQuestions = [...(lesson.quizQuestions || [])]
    newQuestions[qIndex].options.splice(oIndex, 1)
    if (newQuestions[qIndex].correctAnswer === oIndex) {
      newQuestions[qIndex].correctAnswer = 0
    } else if (newQuestions[qIndex].correctAnswer > oIndex) {
      newQuestions[qIndex].correctAnswer--
    }
    updateQuizQuestions(newQuestions)
  }

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...(lesson.quizQuestions || [])]
    newQuestions[qIndex].options[oIndex] = value
    updateQuizQuestions(newQuestions)
  }

  return (
    <div className='mt-4 space-y-6'>
      {lesson.quizQuestions?.map((question, qIndex) => (
        <Card key={qIndex} className='bg-white'>
          <CardHeader className='pb-2'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg font-semibold'>Question {qIndex + 1}</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='ghost' size='icon' onClick={() => removeQuestion(qIndex)}>
                      <X className='h-4 w-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove question</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor={`question-${qIndex}`}>Question</Label>
              <Input
                id={`question-${qIndex}`}
                placeholder='Enter your question'
                value={question.question}
                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label>Options</Label>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className='flex items-center space-x-2'>
                  <Input
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                    className='flex-grow'
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className='flex items-center'>
                          <Switch
                            checked={question.correctAnswer === oIndex}
                            onCheckedChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Set as correct answer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant='ghost' size='icon' onClick={() => removeOption(qIndex, oIndex)}>
                          <X className='h-4 w-4' />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove option</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
              <Button variant='outline' size='sm' onClick={() => addOption(qIndex)} className='mt-2'>
                Add Option
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant='outline' onClick={addQuestion} className='w-full mt-4'>
        <Plus className='h-4 w-4 mr-2' />
        Add New Question
      </Button>
    </div>
  )
}
