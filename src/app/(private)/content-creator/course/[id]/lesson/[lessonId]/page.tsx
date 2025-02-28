'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, FileText, Video, ListChecks, Plus, Upload, Trash2 } from 'lucide-react'
import { Lesson } from '../../../types'
import RichTextEditor from '@/components/rich-text-editor'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

interface LessonEditorPageProps {
  params: {
    id: string
    lessonId: string
  }
}

interface Question {
  id: string
  content: string
  options: {
    id: string
    content: string
    isCorrect: boolean
  }[]
}

export default function LessonEditorPage({}: LessonEditorPageProps) {
  const router = useRouter()
  const [lesson, setLesson] = useState<Lesson>({
    id: '',
    chapterId: '',
    type: 'quiz',
    title: '',
    description: '',
    content: null,
    videoUrl: null,
    duration: 0,
    durationDisplay: '',
    sequence: 0,
    status: '',
    creator: {
      id: '',
      username: ''
    }
  })
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [, setShowQuestionForm] = useState(false)

  const handleChange = (field: keyof Lesson, value: any) => {
    setLesson((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const getLessonTypeInfo = () => {
    switch (lesson.type) {
      case 'text':
        return {
          icon: <FileText className='w-5 h-5 text-blue-500' />,
          title: 'Bài học văn bản',
          description: 'Soạn thảo nội dung bài học'
        }
      case 'video':
        return {
          icon: <Video className='w-5 h-5 text-green-500' />,
          title: 'Bài học video',
          description: 'Tải lên video bài giảng'
        }
      case 'quiz':
        return {
          icon: <ListChecks className='w-5 h-5 text-orange-500' />,
          title: 'Bài kiểm tra',
          description: 'Tạo câu hỏi kiểm tra'
        }
      default:
        return null
    }
  }

  const typeInfo = getLessonTypeInfo()

  const handleVideoUpload = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    console.log('Uploading video:', file)
  }

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      content: '',
      options: [
        { id: `option-${Date.now()}-1`, content: '', isCorrect: false },
        { id: `option-${Date.now()}-2`, content: '', isCorrect: false },
        { id: `option-${Date.now()}-3`, content: '', isCorrect: false },
        { id: `option-${Date.now()}-4`, content: '', isCorrect: false }
      ]
    }
    setQuestions([...questions, newQuestion])
    setShowQuestionForm(true)
  }

  const handleQuestionChange = (questionId: string, field: string, value: any) => {
    setQuestions(questions.map((q) => (q.id === questionId ? { ...q, [field]: value } : q)))
  }

  const handleOptionChange = (questionId: string, optionId: string, field: string, value: any) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) => (o.id === optionId ? { ...o, [field]: value } : o))
            }
          : q
      )
    )
  }

  const renderContent = () => {
    switch (lesson.type) {
      case 'text':
        return (
          <div>
            <label className='text-sm font-medium mb-2 block'>Nội dung bài học</label>
            <RichTextEditor
              content={lesson.content || ''}
              onChange={(content: string) => {
                console.log('Content changed:', content)
              }}
            />
          </div>
        )

      case 'video':
        return (
          <div className='space-y-6'>
            <Tabs defaultValue='url' className='w-full'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='url'>Link Video</TabsTrigger>
                <TabsTrigger value='upload'>Tải lên Video</TabsTrigger>
              </TabsList>

              <TabsContent value='url' className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Link Video</Label>
                  <Input
                    placeholder='Nhập link video (YouTube, Vimeo...)'
                    value={lesson.videoUrl || ''}
                    onChange={(e) => handleChange('videoUrl', e.target.value)}
                  />
                  <p className='text-sm text-muted-foreground'>Hỗ trợ các nền tảng: YouTube, Vimeo, Google Drive</p>
                </div>
              </TabsContent>

              <TabsContent value='upload' className='space-y-4'>
                <div className='border-2 border-dashed rounded-lg'>
                  {previewUrl ? (
                    <div className='p-2'>
                      <div className='aspect-video bg-black rounded-md overflow-hidden'>
                        <video
                          src={previewUrl}
                          controls
                          className='w-full h-full'
                          onLoadedMetadata={(e) => {
                            const video = e.target as HTMLVideoElement
                            const duration = Math.round(video.duration)
                            handleChange('duration', duration)
                            handleChange('durationDisplay', `${Math.floor(duration / 60)} phút ${duration % 60} giây`)
                          }}
                        />
                      </div>
                      <div className='p-4 space-y-3'>
                        <div className='flex items-center justify-between'>
                          <div>
                            <p className='font-medium'>Video đã tải lên</p>
                            <p className='text-sm text-muted-foreground'>
                              {lesson.durationDisplay || 'Đang tính thời lượng...'}
                            </p>
                          </div>
                          <Button variant='outline' size='sm' onClick={() => setPreviewUrl('')}>
                            Chọn video khác
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label className='cursor-pointer'>
                      <input
                        type='file'
                        accept='video/*'
                        className='hidden'
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleVideoUpload(file)
                        }}
                      />
                      <div className='p-12 text-center'>
                        <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4'>
                          <Upload className='w-6 h-6 text-primary' />
                        </div>
                        <div className='space-y-2'>
                          <p className='font-medium'>Kéo thả hoặc click để tải video lên</p>
                          <p className='text-sm text-muted-foreground'>Hỗ trợ MP4, WebM. Dung lượng tối đa 500MB</p>
                        </div>
                      </div>
                    </label>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )

      case 'quiz':
        return (
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h3 className='font-medium'>Danh sách câu hỏi ({questions.length})</h3>
              <Button onClick={handleAddQuestion}>
                <Plus className='w-4 h-4 mr-2' />
                Thêm câu hỏi
              </Button>
            </div>

            <div className='space-y-4'>
              {questions.length === 0 ? (
                <div className='p-4 text-center border-2 border-dashed rounded-lg'>
                  <p className='text-muted-foreground'>
                    Chưa có câu hỏi nào. Nhấn &quot;Thêm câu hỏi&quot; để bắt đầu tạo bài kiểm tra.
                  </p>
                </div>
              ) : (
                questions.map((question, index) => (
                  <Card key={question.id}>
                    <CardContent className='pt-6'>
                      <div className='space-y-4'>
                        <div className='flex items-start gap-4'>
                          <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                            <span className='text-sm font-medium'>{index + 1}</span>
                          </div>
                          <div className='flex-1 space-y-4'>
                            <Input
                              value={question.content}
                              onChange={(e) => handleQuestionChange(question.id, 'content', e.target.value)}
                              placeholder='Nhập câu hỏi...'
                            />
                            <div className='grid gap-3'>
                              {question.options.map((option, optionIndex) => (
                                <div key={option.id} className='flex items-center gap-3'>
                                  <div className='flex-1'>
                                    <Input
                                      value={option.content}
                                      onChange={(e) =>
                                        handleOptionChange(question.id, option.id, 'content', e.target.value)
                                      }
                                      placeholder={`Đáp án ${optionIndex + 1}`}
                                    />
                                  </div>
                                  <Button
                                    type='button'
                                    variant={option.isCorrect ? 'default' : 'outline'}
                                    size='sm'
                                    onClick={() =>
                                      handleOptionChange(question.id, option.id, 'isCorrect', !option.isCorrect)
                                    }
                                  >
                                    {option.isCorrect ? 'Đáp án đúng' : 'Đánh dấu đúng'}
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 text-muted-foreground hover:text-destructive'
                            onClick={() => setQuestions(questions.filter((q) => q.id !== question.id))}
                          >
                            <Trash2 className='w-4 h-4' />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-6'>
          <Link href={`/content-creator/course/new`}>
            <Button variant='ghost'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Quay lại khóa học
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className='flex flex-row items-center gap-4'>
            {typeInfo?.icon}
            <div>
              <CardTitle>{typeInfo?.title}</CardTitle>
              <p className='text-sm text-muted-foreground'>{typeInfo?.description}</p>
            </div>
          </CardHeader>

          <CardContent className='space-y-6'>
            <div>
              <label className='text-sm font-medium mb-2 block'>Tiêu đề bài học</label>
              <Input
                value={lesson.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder='Nhập tiêu đề bài học'
              />
            </div>

            <div>
              <label className='text-sm font-medium mb-2 block'>Mô tả ngắn</label>
              <Textarea
                value={lesson.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder='Mô tả ngắn về nội dung bài học'
                className='h-20'
              />
            </div>

            {renderContent()}

            <div className='flex justify-end gap-2 pt-6 border-t'>
              <Button variant='outline' onClick={() => router.back()}>
                Hủy
              </Button>
              <Button>Lưu thay đổi</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
