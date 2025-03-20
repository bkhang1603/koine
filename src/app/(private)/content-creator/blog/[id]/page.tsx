'use client'
import { use } from 'react'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import Image from 'next/image'

export default function BlogPostDetail(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for Learning a New Language',
      content: 'Learning a new language can be challenging, but with these tips...',
      image: '/images/language-learning.jpg',
      status: 'Published',
      date: '2023-06-15',
      category: 'Language Learning',
      author: 'John Doe'
    },
    {
      id: 2,
      title: 'The Benefits of Bilingualism',
      content: 'Being bilingual has numerous cognitive and social benefits...',
      image: '/images/bilingualism.jpg',
      status: 'Draft',
      date: '2023-06-10',
      category: 'Language Science',
      author: 'Jane Smith'
    },
    {
      id: 3,
      title: 'Common Mistakes in English Grammar',
      content: 'Even native speakers make these common grammar mistakes...',
      image: '/images/english-grammar.jpg',
      status: 'Published',
      date: '2023-06-05',
      category: 'Grammar',
      author: 'Emily Brown'
    },
    {
      id: 4,
      title: 'How to Improve Your Listening Skills',
      content: "Effective listening is crucial for language learning. Here's how to improve...",
      image: '/images/listening-skills.jpg',
      status: 'Draft',
      date: '2023-06-01',
      category: 'Language Skills',
      author: 'Michael Wilson'
    },
    {
      id: 5,
      title: 'The Best Language Learning Apps',
      content: 'These language learning apps are perfect for beginners and advanced learners...',
      image: '/images/language-learning-apps.jpg',
      status: 'Published',
      date: '2023-05-25',
      category: 'Language Learning',
      author: 'Sarah Johnson'
    }
  ]

  const post = blogPosts.find((post) => post.id === parseInt(params.id, 10))

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className='max-w-5xl mx-auto space-y-6'>
      <div className='flex justify-between items-center'>
        <Button variant='outline' asChild>
          <Link href='/content-creator/blog'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Blog
          </Link>
        </Button>
        <Button variant='outline' asChild>
          <Link href={`/content-creator/blog/${post.id}/edit`}>Edit Post</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <Image
            src={`https://picsum.photos/seed/${post.id}/800/400`}
            width={800}
            height={400}
            alt={post.title}
            className='w-full h-64 object-cover rounded-t-lg'
          />
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex justify-between items-center'>
            <Badge variant='outline'>{post.category}</Badge>
            <Badge variant={post.status === 'Published' ? 'default' : 'secondary'}>{post.status}</Badge>
          </div>
          <CardTitle className='text-3xl'>{post.title}</CardTitle>
          <div className='flex items-center text-sm text-muted-foreground'>
            <User className='mr-2 h-4 w-4' />
            {post.author}
            <Calendar className='ml-4 mr-2 h-4 w-4' />
            {post.date}
          </div>
          <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: post.content }} />
        </CardContent>
      </Card>
    </div>
  )
}
