'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Calendar, BookOpen, Clock, PlayCircle, FileText, HelpCircle } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import configRoute from '@/config/route'

const VideoPlayer: React.FC<{ url: string }> = ({ url }) => (
  <div className='aspect-video'>
    <iframe
      src={url}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      className='w-full h-full rounded-lg'
    />
  </div>
)

const LessonPreview: React.FC<{ lesson: any }> = ({ lesson }) => {
  switch (lesson.type) {
    case 'text':
      return (
        <div className='flex items-center'>
          <span>{lesson.content.substring(0, 50)}...</span>
        </div>
      )
    case 'video':
      return (
        <div className='flex items-center'>
          <span>Video Lesson</span>
        </div>
      )
    case 'quiz':
      return (
        <div className='flex items-center'>
          <span>{lesson.quizQuestions?.length || 0} questions</span>
        </div>
      )
    default:
      return null
  }
}

export default function CourseDetail({ params }: { params: { id: string } }) {
  const courses = [
    {
      id: 1,
      title: "Beginner's Spanish",
      description: 'Learn the basics of Spanish language and culture',
      level: 'Beginner',
      status: 'Active',
      students: 150,
      duration: '10 weeks',
      image: '/placeholder.svg?height=400&width=800',
      chapters: [
        {
          id: 'ch1',
          title: 'Introduction to Spanish',
          lessons: [
            {
              id: 'l1',
              title: 'Basic Greetings',
              type: 'text',
              content: "In this lesson, we'll learn basic Spanish greetings..."
            },
            {
              id: 'l2',
              title: 'The Benefits of Learning a New Language',
              type: 'video',
              content: 'Watch this video to learn about the cognitive benefits of learning a new language.',
              videoUrl: 'https://www.youtube.com/embed/MMmOLN5zBLY'
            }
          ]
        },
        {
          id: 'ch2',
          title: 'Essential Vocabulary',
          lessons: [
            {
              id: 'l3',
              title: 'Numbers 1-10',
              type: 'text',
              content: 'Learn to count from one to ten in Spanish...'
            },
            {
              id: 'l4',
              title: 'Vocabulary Quiz',
              type: 'quiz',
              content: 'Test your knowledge of basic Spanish vocabulary',
              quizQuestions: [
                {
                  question: "What is 'hello' in Spanish?",
                  options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
                  correctAnswer: 0
                },
                {
                  question: "How do you say 'goodbye' in Spanish?",
                  options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
                  correctAnswer: 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Intermediate French',
      description: 'Improve your French language skills',
      level: 'Intermediate',
      status: 'Active',
      image: '/placeholder.svg?height=400&width=600',
      lastUpdated: '2023-07-10',
      duration: '12 weeks',
      chapters: [
        {
          id: 1,
          title: 'Advanced Grammar',
          lessons: [{ id: 1, title: 'Subjunctive Mood', type: 'text', content: '...' }]
        },
        {
          id: 2,
          title: 'French Literature',
          lessons: [{ id: 2, title: 'Introduction to Victor Hugo', type: 'text', content: '...' }]
        }
      ]
    },
    {
      id: 3,
      title: 'Advanced German Grammar',
      description: 'Master complex German grammar structures',
      level: 'Advanced',
      status: 'Draft',
      image: '/placeholder.svg?height=400&width=600',
      lastUpdated: '2023-07-05',
      duration: '8 weeks',
      chapters: [
        {
          id: 1,
          title: 'Complex Sentence Structures',
          lessons: [{ id: 1, title: 'Nested Clauses', type: 'text', content: '...' }]
        }
      ]
    },
    {
      id: 4,
      title: 'Business English',
      description: 'English for professional settings',
      level: 'Intermediate',
      status: 'Active',
      image: '/placeholder.svg?height=400&width=600',
      lastUpdated: '2023-07-12',
      duration: '6 weeks',
      chapters: [
        {
          id: 1,
          title: 'Email Writing',
          lessons: [{ id: 1, title: 'Formal Greetings', type: 'text', content: '...' }]
        },
        {
          id: 2,
          title: 'Presentation Skills',
          lessons: [{ id: 2, title: 'Opening a Presentation', type: 'video', content: '...' }]
        }
      ]
    },
    {
      id: 5,
      title: 'Italian for Travelers',
      description: 'Essential Italian for your next trip',
      level: 'Beginner',
      status: 'Active',
      image: '/placeholder.svg?height=400&width=600',
      lastUpdated: '2023-07-08',
      duration: '4 weeks',
      chapters: [
        {
          id: 1,
          title: 'Basic Phrases',
          lessons: [{ id: 1, title: 'Greetings and Introductions', type: 'text', content: '...' }]
        }
      ]
    },
    {
      id: 6,
      title: 'Japanese Kanji Mastery',
      description: 'Advanced study of Japanese Kanji characters',
      level: 'Advanced',
      status: 'Draft',
      image: '/placeholder.svg?height=400&width=600',
      lastUpdated: '2023-07-03',
      duration: '16 weeks',
      chapters: [
        { id: 1, title: 'JLPT N2 Kanji', lessons: [{ id: 1, title: 'Kanji Group 1', type: 'text', content: '...' }] },
        { id: 2, title: 'JLPT N1 Kanji', lessons: [{ id: 2, title: 'Kanji Group 1', type: 'text', content: '...' }] }
      ]
    }
  ]

  const course = courses.find((course) => course.id === parseInt(params.id, 10))

  const [selectedLesson, setSelectedLesson] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('content')

  const handleLessonSelect = (lesson: any) => {
    setSelectedLesson(lesson)
    setActiveTab('content')
  }

  if (!course) {
    return <div>Loading...</div>
  }

  return (
    <div className='max-w-5xl mx-auto space-y-6'>
      <div className='flex justify-between items-center'>
        <Button variant='outline' asChild>
          <Link href={configRoute.contentCreator.course}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Courses
          </Link>
        </Button>
        <Button variant='outline' asChild>
          <Link href={`${configRoute.contentCreator.editCourse}/${course.id}`}>Edit Course</Link>
        </Button>
      </div>

      <div className='grid md:grid-cols-3 gap-6'>
        <Card className='md:col-span-2'>
          <CardHeader>
            <Image
              src={course.image}
              alt={course.title}
              width={500}
              height={500}
              className='w-full h-64 object-cover rounded-t-lg'
            />
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex flex-wrap gap-2'>
              <Badge variant='outline'>{course.level}</Badge>
              <Badge variant={course.status === 'Active' ? 'default' : 'secondary'}>{course.status}</Badge>
            </div>
            <CardTitle className='text-3xl'>{course.title}</CardTitle>
            <p className='text-muted-foreground'>{course.description}</p>
            <div className='grid grid-cols-2 gap-4 py-4'>
              <div className='flex items-center'>
                <BookOpen className='mr-2 h-4 w-4 text-muted-foreground' />
                <span>{course.chapters.length} chapters</span>
              </div>
              <div className='flex items-center'>
                <BookOpen className='mr-2 h-4 w-4 text-muted-foreground' />
                <span>{course.chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0)} lessons</span>
              </div>
              <div className='flex items-center'>
                <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
                <span>{course.duration}</span>
              </div>
              <div className='flex items-center'>
                <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Curriculum</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type='single' collapsible className='w-full'>
              {course.chapters.map((chapter) => (
                <AccordionItem key={chapter.id} value={chapter.id.toString()}>
                  <AccordionTrigger>{chapter.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className='space-y-2'>
                      {chapter.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className='border-b pb-2 last:border-b-0 cursor-pointer hover:bg-muted p-2 rounded-md transition-colors'
                          onClick={() => handleLessonSelect(lesson)}
                        >
                          <div className='flex justify-between items-center'>
                            <h4 className='font-semibold'>{lesson.title}</h4>
                            {lesson.type === 'text' && (
                              <FileText className='w-5 h-5 text-blue-500' aria-label='Text lesson' />
                            )}
                            {lesson.type === 'video' && (
                              <PlayCircle className='w-5 h-5 text-red-500' aria-label='Video lesson' />
                            )}
                            {lesson.type === 'quiz' && (
                              <HelpCircle className='w-5 h-5 text-green-500' aria-label='Quiz' />
                            )}
                          </div>
                          <LessonPreview lesson={lesson} />
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {selectedLesson && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedLesson.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
              <TabsList>
                <TabsTrigger value='content'>Content</TabsTrigger>
                {selectedLesson.type === 'quiz' && <TabsTrigger value='quiz'>Quiz</TabsTrigger>}
              </TabsList>
              <TabsContent value='content'>
                {selectedLesson.type === 'video' ? (
                  <div className='space-y-4'>
                    <VideoPlayer url={selectedLesson.videoUrl || ''} />
                    <div className='prose max-w-none'>
                      <h3>Video Description</h3>
                      <p>{selectedLesson.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className='prose max-w-none'>
                    <p>{selectedLesson.content}</p>
                  </div>
                )}
              </TabsContent>
              {selectedLesson.type === 'quiz' && (
                <TabsContent value='quiz'>
                  <div className='space-y-4'>
                    {selectedLesson.quizQuestions?.map((question: any, index: number) => (
                      <div key={index} className='border p-4 rounded-lg'>
                        <h3 className='font-medium mb-2'>
                          Question {index + 1}: {question.question}
                        </h3>
                        {/* <ul className='space-y-2'>
                          {question.options.map((option: any, optionIndex: number) => (
                            <li key={optionIndex} className='flex items-center space-x-2'>
                              <input
                                type='radio'
                                id={`q${index}-o${optionIndex}`}
                                name={`question-${index}`}
                                className='w-4 h-4 text-blue-600'
                              />
                              <label htmlFor={`q${index}-o${optionIndex}`}>{option}</label>
                            </li>
                          ))}
                        </ul> */}

                        <RadioGroup>
                          {question.options.map((option: any, optionIndex: number) => (
                            <div key={optionIndex} className='flex items-center space-x-2'>
                              <RadioGroupItem value={optionIndex.toString()} id={`q${index}-o${optionIndex}`} />
                              <Label htmlFor={`q${index}-o${optionIndex}`} className='font-normal text-base'>
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                    <Button>Submit Quiz</Button>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
