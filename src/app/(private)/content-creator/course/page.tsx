'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PlusCircle, Edit, Trash, Eye, MoreHorizontal, Search, Clock, Calendar, BookOpen, FileText } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import configRoute from '@/config/route'

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
      { id: 1, title: 'Email Writing', lessons: [{ id: 1, title: 'Formal Greetings', type: 'text', content: '...' }] },
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

export default function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('all')

  const filteredCourses = courses.filter(
    (course) =>
      (filterLevel === 'all' || course.level === filterLevel) &&
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const levels = ['Beginner', 'Intermediate', 'Advanced']

  const getTotalLessons = (chapters: any) => {
    return chapters.reduce((total: any, chapter: any) => total + chapter.lessons.length, 0)
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Course Management</h1>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex space-x-4 items-center'>
          <div className='relative'>
            <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Search courses...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-8 w-[350px]'
            />
          </div>
          <Select value={filterLevel} onValueChange={setFilterLevel}>
            <SelectTrigger className='w-full sm:w-[180px]'>
              <SelectValue placeholder='Filter by level' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Levels</SelectItem>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button asChild>
          <Link href='/content-creator/course/add'>
            <PlusCircle className='mr-2 h-4 w-4' />
            New Course
          </Link>
        </Button>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {filteredCourses.map((course) => (
          <Card key={course.id} className='overflow-hidden hover:shadow-lg transition-shadow duration-300'>
            <CardHeader className='p-0'>
              <Image
                src={`https://picsum.photos/seed/${course.id}/400/200`}
                alt={course.title}
                width={500}
                height={500}
                className='w-full h-48 object-cover'
              />
            </CardHeader>
            <CardContent className='p-4'>
              <div className='flex justify-between items-start mb-4'>
                <CardTitle className='text-xl'>{course.title}</CardTitle>
                <Badge variant={course.status === 'Active' ? 'default' : 'secondary'}>{course.status}</Badge>
              </div>
              <p className='text-sm text-muted-foreground mb-4'>{course.description}</p>
              <div className='flex justify-between text-sm text-muted-foreground mb-4'>
                <div className='flex items-center'>
                  <BookOpen className='mr-1 h-4 w-4' />
                  {course.chapters.length} chapters
                </div>
                <div className='flex items-center'>
                  <FileText className='mr-1 h-4 w-4' />
                  {getTotalLessons(course.chapters)} lessons
                </div>
              </div>
              <div className='flex justify-between text-sm text-muted-foreground'>
                <div className='flex items-center'>
                  <Clock className='mr-1 h-4 w-4' />
                  {course.duration}
                </div>
                <div className='flex items-center'>
                  <Calendar className='mr-1 h-4 w-4' />
                  {course.lastUpdated}
                </div>
              </div>
            </CardContent>
            <CardFooter className='p-4 border-t flex justify-between items-center'>
              <Badge variant='outline'>{course.level}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon' className='focus-visible:ring-0'>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Link
                      href={`${configRoute.contentCreator.course}/${course.id}`}
                      className='flex items-center w-full'
                    >
                      <Eye className='mr-2 h-4 w-4' />
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={`${configRoute.contentCreator.editCourse}/${course.id}`}
                      className='flex items-center w-full'
                    >
                      <Edit className='mr-2 h-4 w-4' />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='text-red-600'>
                    <Trash className='mr-2 h-4 w-4' />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
