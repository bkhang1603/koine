import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FileText, Video, HelpCircle } from 'lucide-react'

interface Chapter {
  id: string
  title: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  type: 'text' | 'video' | 'quiz'
  content: string
  videoUrl?: string
  videoFile?: File
  videoSource: 'url' | 'file'
  videoContent?: string
  quizQuestions?: QuizQuestion[]
}

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

interface ContentPreviewProps {
  chapters: Chapter[]
}

export function ContentPreview({ chapters }: ContentPreviewProps) {
  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className='h-4 w-4 text-blue-500' />
      case 'video':
        return <Video className='h-4 w-4 text-green-500' />
      case 'quiz':
        return <HelpCircle className='h-4 w-4 text-yellow-500' />
      default:
        return null
    }
  }

  return (
    <div className='space-y-4'>
      {chapters.map((chapter, chapterIndex) => (
        <Card key={chapter.id}>
          <CardHeader>
            <CardTitle>{chapter.title || `Chapter ${chapterIndex + 1}`}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type='single' collapsible className='w-full'>
              {chapter.lessons.map((lesson, lessonIndex) => (
                <AccordionItem value={lesson.id} key={lesson.id}>
                  <AccordionTrigger>
                    <div className='flex items-center space-x-2'>
                      {getLessonTypeIcon(lesson.type)}
                      <span>{lesson.title || `Lesson ${lessonIndex + 1}`}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {lesson.type === 'text' && (
                      <div className='bg-gray-50 p-4 rounded-md'>
                        <p className='text-sm'>{lesson.content || 'No content added yet.'}</p>
                      </div>
                    )}
                    {lesson.type === 'video' && (
                      <div className='bg-gray-50 p-4 rounded-md space-y-4'>
                        {lesson.videoSource === 'url' && lesson.videoUrl ? (
                          <div className='aspect-video'>
                            <iframe src={lesson.videoUrl} className='w-full h-full' allowFullScreen></iframe>
                          </div>
                        ) : lesson.videoSource === 'file' && lesson.videoFile ? (
                          <div className='aspect-video'>
                            <video controls className='w-full h-full'>
                              <source src={URL.createObjectURL(lesson.videoFile)} type={lesson.videoFile.type} />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ) : (
                          <p className='text-sm text-muted-foreground'>
                            No video {lesson.videoSource === 'url' ? 'URL provided' : 'file uploaded'}.
                          </p>
                        )}
                        {lesson.videoContent && (
                          <div className='mt-4'>
                            <h5 className='font-semibold mb-2'>Video Description:</h5>
                            <p className='text-sm'>{lesson.videoContent}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {lesson.type === 'quiz' && (
                      <div className='space-y-4'>
                        {lesson.quizQuestions?.map((question, qIndex) => (
                          <div key={qIndex} className='bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200'>
                            <h4 className='font-semibold mb-2'>
                              Question {qIndex + 1}: {question.question}
                            </h4>
                            <ul className='list-disc list-inside space-y-1'>
                              {question.options.map((option, oIndex) => (
                                <li
                                  key={oIndex}
                                  className={oIndex === question.correctAnswer ? 'text-green-600 font-semibold' : ''}
                                >
                                  {option}
                                  {oIndex === question.correctAnswer && (
                                    <span className='ml-2 text-xs bg-green-100 text-green-800 py-0.5 px-1 rounded'>
                                      Correct
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {(!lesson.quizQuestions || lesson.quizQuestions.length === 0) && (
                          <p className='text-sm text-muted-foreground'>No quiz questions added yet.</p>
                        )}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
